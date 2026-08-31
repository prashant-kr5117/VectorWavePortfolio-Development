import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/industries";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve | ERP & CRM by Sector | VectorWave Technologies",
  description:
    "VectorWave implements Zoho, Odoo and Microsoft 365 systems built around how each industry actually runs — real estate, manufacturing, healthcare, retail, education and more.",
  path: "/industries",
});

const industriesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/industries#webpage`,
      url: `${SITE_URL}/industries`,
      name: "Industries | VectorWave Technologies",
      description:
        "Zoho, Odoo and Microsoft 365 business systems implemented around the specific processes of each industry VectorWave serves.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    breadcrumbSchema(`${SITE_URL}/industries#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Industries", item: `${SITE_URL}/industries` },
    ]),
  ],
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={industriesJsonLd} />
      <main className="flex-1">
        <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
          <Reveal>
            <span className="section-eyebrow section-eyebrow--light">Industries</span>
            <h1 className="mx-auto mt-5 max-w-2xl text-[26px] font-bold leading-tight text-ink sm:text-3xl">
              Business systems built around how your industry actually runs.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
              Different sectors move through different processes end to end.
              We implement Zoho, Odoo and Microsoft 365 around the specific
              model each one runs on, not a one-size-fits-all setup.
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8">
              <SectionHeading heading="Industries we serve" align="center" />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((item, i) => (
                <Reveal key={item.slug} delay={i * 50}>
                  <Card href={`/industries/${item.slug}`} className="overflow-hidden">
                    {item.heroImage && (
                      <div className="relative -mx-5 -mt-5 mb-4 h-28 w-[calc(100%+2.5rem)]">
                        <Image src={item.heroImage} alt="" fill className="object-cover" />
                      </div>
                    )}
                    <CardIcon tone="inverse">
                      <item.icon size={18} />
                    </CardIcon>
                    <div className="mb-1 text-sm font-bold text-ink">{item.title}</div>
                    <p className="text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
                      Explore {item.title}
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
