import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Footer is now rendered once, in SiteChrome, instead of individually by every
          page (was a confirmed landmine — a new page that forgot the line would silently
          ship with no footer; see ai-optimization/reports/PRIORITY-MATRIX.md P2-4). */}
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
