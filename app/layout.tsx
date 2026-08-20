import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import { ConsultationModalProvider } from "@/components/ConsultationModal";
import { SITE_URL, buildMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "VectorWave Technologies Zoho & ERP Solutions for Growth",
    description:
      "VectorWave Technologies offers Zoho & ERP Solutions tailored for growing businesses. Minimize downtime and enhance operational efficiency.",
    path: "/",
  }),
  verification: {
    google: "neRDqdfkU_CIj2CdW_usGd930c9yq8ty_LUSejZkmSo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsultationModalProvider>
          <Header />
          {children}
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
          The chat widget and translate widget are both deferred to "lazyOnload":
          neither has any visible presence until a visitor actively opens them (the
          translate element is CSS/JS-hidden by design, and the chat bubble isn't part
          of any above-the-fold content), so there's no UX cost to letting them load
          once the browser is idle instead of competing with hydration for main-thread
          time. GA4 stays on "afterInteractive" so early-bounce visits are still
          tracked accurately.
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
      </body>
    </html>
  );
}
