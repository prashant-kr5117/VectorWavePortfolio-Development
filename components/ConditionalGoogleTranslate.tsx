"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

function hasTranslationCookie(): boolean {
  // Same cookie/pattern LanguageSwitcher.tsx's getCurrentLang() checks.
  return /googtrans=\/en\/\w+/.test(document.cookie);
}

// Cookies have no native change event and this only needs to be read once per
// mount -- the only way the cookie changes is LanguageSwitcher.tsx's own
// window.location.reload(), which remounts everything anyway -- so there's nothing to
// subscribe to.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

/**
 * LanguageSwitcher.tsx doesn't call the Google Translate API directly -- it works by
 * setting a `googtrans` cookie and reloading the page; Google's own script reads that
 * cookie on load and applies translation. So for a visitor who has never switched
 * language (the default-English majority, no cookie), loading this ~93KB script has
 * nothing to do. This component skips it entirely for that majority and loads it
 * exactly as before for anyone who has already switched (see
 * ai-optimization/reports/PERFORMANCE-AUDIT.md Fix #2).
 *
 * Checked client-side, via `useSyncExternalStore`, rather than server-side via
 * `next/headers` `cookies()` -- reading the cookie in the root layout would mark every
 * route as dynamic (`ƒ`) instead of statically prerendered (`○`), a much larger
 * regression than the bytes this saves. `useSyncExternalStore` (not `useEffect` +
 * `setState`, which trips `react-hooks/set-state-in-effect`) is React's own API for
 * exactly this "read an external, browser-only value, SSR-safe" case:
 * `getServerSnapshot` returns `false` so the server/first-hydration-pass render matches
 * (no hydration mismatch), then the real client value takes over.
 */
export default function ConditionalGoogleTranslate() {
  const active = useSyncExternalStore(subscribe, hasTranslationCookie, getServerSnapshot);

  if (!active) return null;

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script id="google-translate-init" strategy="lazyOnload">
        {`function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,nl', autoDisplay: false },
    'google_translate_element'
  );
}`}
      </Script>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
