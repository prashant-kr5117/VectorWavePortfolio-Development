import type { Metadata } from "next";

export const SITE_URL = "https://vectorwavetechnologies.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "VectorWave Technologies",
  url: `${SITE_URL}/`,
  description:
    "A business transformation and enterprise technology company providing ERP implementation, CRM automation, Zoho, Odoo, Dynamics 365 and custom technology solutions.",
  email: "admin@vectorwavetechnologies.com",
  telephone: "+91-8791810555",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "GOLDEN-I, Office No 1034-1035, 10th Floor, Tower 3, Plot No 11, Sector-Techzone IV",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201318",
    addressCountry: "IN",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "VectorWave Technologies",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

export type BreadcrumbItem = {
  name: string;
  item: string;
};

export function breadcrumbSchema(id: string, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * Reusable metadata builder — every route's `metadata` / `generateMetadata` export
 * should return `buildMetadata(...)` rather than a hand-rolled object, so title,
 * description, canonical, OpenGraph, and Twitter/X card fields stay consistent and
 * complete across all ~30 routes instead of only ever setting title/description (the
 * gap identified in ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md's SEO review).
 *
 * Deliberately does NOT set `openGraph.images` / `twitter.images` — no real Open Graph
 * preview image exists in this repo yet (see ai-optimization/DESIGN-OPPORTUNITY-MAP.md
 * / BRAND_GUIDELINES.md's Image Strategy: never fabricate one). Once a real 1200x630
 * image is designed and added, wire it in here in one place.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/", "/about", "/services/sales". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "VectorWave Technologies",
      locale: "en_US",
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      // "summary" (not "summary_large_image") because no OG image exists yet — see
      // the note above. Revisit once a real image is added.
      card: "summary",
      title,
      description,
    },
  };
}
