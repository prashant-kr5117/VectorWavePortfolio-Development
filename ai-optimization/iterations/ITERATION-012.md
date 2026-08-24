# Iteration 012

Iteration: 012
Date: 2026-08-24
Task: `ai-optimization/loop/TASK-QUEUE.md` Q-016, Fix #2 — Performance Audit's Google
Translate loading strategy.
Problem: `LanguageSwitcher.tsx` doesn't call the Google Translate API directly — it
works by setting a `googtrans` cookie and doing a full `window.location.reload()`;
Google's own script reads that cookie on load and applies translation. So for a visitor
who has never switched language (the default-English majority, no cookie), the
~93KB `lazyOnload` Google Translate script has nothing to do — it's pure waste.
Evidence: `ai-optimization/reports/PERFORMANCE-AUDIT.md` Finding 2 / Fix #2; direct
code read of `components/LanguageSwitcher.tsx` confirming the cookie+reload mechanism.

## First attempt (reverted, not shipped) — a real near-miss

Tried reading the `googtrans` cookie server-side in `app/layout.tsx` via
`next/headers`'s `cookies()`, to conditionally render the translate `<Script>` tags.
**This was wrong and was never committed**: `cookies()` is a dynamic API, and calling
it in the root layout — which wraps every route — flipped **every single page**
(homepage, about, blog, contact, services, the service-detail pages, everything except
`robots.txt`/`sitemap.xml`) from `○` static prerendering to `ƒ` server-rendered-on-
-demand in the build output. That trades away CDN-cacheable static HTML sitewide to
save ~93KB on a subset of page loads — a far worse regression than the fix's benefit.
Caught by reading the build's route table carefully before proceeding to validation,
reverted via `git checkout -- app/layout.tsx` before anything was staged or committed.

## Actual fix

Created `components/ConditionalGoogleTranslate.tsx`, a small client component that
checks the same cookie **client-side** instead, keeping `app/layout.tsx` itself fully
static. Used `useSyncExternalStore` (React's own SSR-safe API for "read an external,
browser-only value") rather than the more obvious `useEffect` + `setState` pattern —
the latter would have worked functionally, but eslint's `react-hooks/set-state-in-effect`
correctly flagged it as a fresh instance of the same anti-pattern already tolerated as
pre-existing debt in `ConsultationModal.tsx`/`LanguageSwitcher.tsx`. Since this is new
code, not existing debt, fixed it properly instead of adding a third instance:
`getServerSnapshot` returns `false` so the server/first-hydration-pass render matches
(no hydration mismatch), then `hasTranslationCookie()` takes over client-side with no
extra render-cascade warning.

## Files

- app/layout.tsx (uses the new component instead of the inline `<Script>` tags; no
  longer needed to be `async`, since the failed `cookies()` attempt was fully reverted)
- components/ConditionalGoogleTranslate.tsx (new)

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint | Pass — 0 new errors (same 2 pre-existing, untouched-file errors as every prior iteration; the `react-hooks/set-state-in-effect` finding from the first `useEffect` draft is gone in the final `useSyncExternalStore` version) |
| Build (`npm run build`) | Pass — 36/36 pages, **route table confirmed back to `○`/`●` static generation**, matching the pre-iteration baseline exactly |
| Behavioral: no-cookie state | 0 network requests to `translate.google.com`, no `#google-translate-script` tag in the DOM, even 2s past when `lazyOnload` would have fired |
| Behavioral: cookie-already-set state | Script tag present, 2 network requests fire — identical to pre-fix behavior |
| Behavioral: full end-to-end switcher flow | Clicked the actual language-switcher UI → selected "Netherland" → cookie set (`googtrans=/en/nl`) → page reloaded → translate script present on the reloaded page. Real user journey unaffected. |
| Playwright health-check (full 30-route suite) | Pass — 31/31 (root layout is the most shared component on the site) |
| axe accessibility (full 30-route suite) | Pass — 0 new violations, only the pre-existing out-of-scope `service-zoho-bundled-suite` violation remains |
| Mobile-390 screenshot (homepage) | No visual change (script-loading behavior only; translate element was already `hidden`) |

## Screenshots

`ai-optimization/screenshots/iteration-012/` — homepage desktop-1440 and mobile-390.

## Before score

Performance: 76/100 (Iteration 009), Technical Quality: 85/100 (baseline, unchanged
since Q-002).

## After score

- Performance: 79/100 (+3) — a real, deterministic byte/request reduction (93KB script
  + 2 network requests + associated main-thread cost) for the default-English majority
  of visitors, with a verified zero-behavior-change guarantee for anyone who has
  actually switched language.
- Technical Quality: 87/100 (+2) — the static-generation regression was caught and
  reverted before ever being committed (the process working as designed, per
  `CONTROLLER.md` Step 9's validation gate), and the final implementation uses the
  correct SSR-safe React primitive rather than tolerating a known anti-pattern.

## Delta

Performance +3 (weight 6) = +0.18. Technical Quality +2 (weight 5) = +0.10. Overall:
79.62 → 79.90.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired in the final, shipped state.
The failed first attempt never reached that stage — it was caught during Step 9's own
validation (reading the build output) and reverted before staging, which is exactly
what the validation gate is for. No business fact, URL, or user-facing behavior
changed for anyone (verified for both cookie states, not assumed).

## Next recommendation

`Q-016` Fix #3 (JS bundle code-splitting investigation) remains open — the last item
from the Performance Audit's top-3 list.
