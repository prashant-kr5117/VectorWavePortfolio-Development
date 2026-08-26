import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema } from "@/lib/seo";
import type { Industry } from "@/lib/industries";

export default function IndustryJsonLd({ industry }: { industry: Industry }) {
  const pageUrl = `${SITE_URL}/industries/${industry.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${industry.title} Business Systems`,
        url: pageUrl,
        serviceType: `${industry.title} CRM / ERP Implementation`,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "IN",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${industry.title} | VectorWave Technologies`,
        mainEntity: { "@id": `${pageUrl}#service` },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
      },
      breadcrumbSchema(`${pageUrl}#breadcrumb`, [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Industries", item: `${SITE_URL}/industries` },
        { name: industry.title, item: pageUrl },
      ]),
      ...(industry.faqs && industry.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: industry.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  return <JsonLd data={data} />;
}
