"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConsultationModalProvider } from "@/components/ConsultationModal";
import ConditionalGoogleTranslate from "@/components/ConditionalGoogleTranslate";

// The embedded Sanity Studio (app/studio) needs to own the full viewport — no
// marketing header/footer, and no third-party scripts competing with its own
// editor UI. usePathname (unlike headers()/cookies()) doesn't opt the route
// out of static rendering, so the rest of the site keeps being prerendered.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) return <>{children}</>;

  return (
    <>
      <ConsultationModalProvider>
        <Header />
        {children}
        <Footer />
      </ConsultationModalProvider>
      <Script
        id="ga4-lib"
        src="https://www.googletagmanager.com/gtag/js?id=G-2YYH8VS7J8"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2YYH8VS7J8');`}
      </Script>
      {/*
        The chat widget is deferred to "lazyOnload": it has no visible presence until
        a visitor actively opens it (the bubble isn't above-the-fold content), so
        there's no UX cost to letting it load once the browser is idle instead of
        competing with hydration for main-thread time. GA4 stays on "afterInteractive"
        so early-bounce visits are still tracked accurately. The translate widget goes
        further than lazyOnload -- see ConditionalGoogleTranslate.tsx: it isn't
        rendered at all unless a visitor has already switched language, since it has
        nothing to do otherwise (ai-optimization/reports/PERFORMANCE-AUDIT.md Fix #2).
      */}
      <Script id="zsiq-init" strategy="lazyOnload">
        {`window.$zoho = window.$zoho || {};
$zoho.salesiq = $zoho.salesiq || { ready: function () {} };`}
      </Script>
      <Script
        id="zsiqscript"
        src="https://salesiq.zohopublic.in/widget?wc=siq6f8903107a8b817d8ef6172d9f7859f5110c8b5761dd815ba383efcd446c75f420f72f74bd858ff51404ca330c48216c"
        strategy="lazyOnload"
      />
      <ConditionalGoogleTranslate />
    </>
  );
}
