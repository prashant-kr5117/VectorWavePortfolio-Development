import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ServicesBannerImage from "@/src/services/banner.jpg";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformLogo from "@/components/PlatformLogo";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServiceBySlug, getPlatform } from "@/lib/services";
import { industries } from "@/lib/industries";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "ERP, CRM & Cloud Solutions | VectorWave Services",
  description:
    "VectorWave helps organizations select, implement, customize, integrate and optimize business technology — Zoho, Odoo, Microsoft 365 and custom development.",
  path: "/services",
});

/**
 * Capability groups, not a technology list — answers "what business problem can
 * VectorWave solve" before "which platform does it run on." Every slug below maps to a
 * real service in lib/services.ts; no group was invented to hit a target count, and no
 * service appears in a group it doesn't genuinely belong to. See
 * ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 1 for the reasoning.
 */
const capabilityGroups = [
  {
    name: "Sales & customer relationships",
    description: "Capture leads, manage the pipeline, and keep every customer interaction in one place.",
    slugs: ["sales", "odoo-sales-ecommerce", "dynamics-365-sales"],
  },
  {
    name: "Finance & operations",
    description: "Invoicing, inventory, manufacturing and reporting that stay accurate in real time.",
    slugs: ["zoho-finance", "odoo-accounting", "odoo-inventory-operations", "business-central-finance"],
  },
  {
    name: "People & workforce",
    description: "Recruitment, attendance, payroll and performance in one connected system.",
    slugs: ["human-resources", "odoo-workforce-hr", "dynamics-365-hr"],
  },
  {
    name: "Support & security",
    description: "Keep the business running for customers, and protected for everyone else.",
    slugs: ["it-support", "microsoft-security-device-management"],
  },
  {
    name: "Automation & custom development",
    description: "The custom work — apps, integrations, AI, messaging — that connects everything else together.",
    slugs: ["mobile-app-development", "web-development", "ai-integration", "whatsapp-automation"],
  },
];

const fullPlatformSlugs = ["zoho-bundled-suite", "odoo-business-suite", "microsoft-365-dynamics-suite"];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: "Services | VectorWave Technologies",
      description:
        "Explore VectorWave Technologies services across Zoho, Odoo, Microsoft Dynamics 365, IT support, web development, AI integration and business automation.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    breadcrumbSchema(`${SITE_URL}/services#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Services", item: `${SITE_URL}/services` },
    ]),
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-24">
          <Image
            src={ServicesBannerImage}
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink-inverse/80" />
          <Reveal className="relative">
            <span className="section-eyebrow section-eyebrow--inverse">Services</span>
            <h1 className="mx-auto mt-5 max-w-2xl text-[26px] font-bold leading-tight text-on-inverse sm:text-3xl">
              VectorWave helps organizations select, implement, customize, integrate and
              optimize business technology.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-on-inverse-muted sm:text-base">
              Zoho, Odoo, Microsoft 365 and custom development — chosen on business
              requirements, not on which platform we&apos;d rather sell.
            </p>
          </Reveal>
        </section>

        {/* Full platform implementation — the flagship, whole-business commitment level */}
        <section className="bg-ink-inverse px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8">
              <SectionHeading
                eyebrow="Full platform implementation"
                heading="Every function, on one connected platform"
                description="For businesses ready to standardize on a single system of record."
                tone="inverse"
                align="center"
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {fullPlatformSlugs.map((slug, i) => {
                const service = getServiceBySlug(slug);
                if (!service) return null;
                const platform = getPlatform(service.platform);
                return (
                  <Reveal key={slug} delay={i * 80}>
                    <Link
                      href={`/services/${slug}`}
                      className="group flex h-full flex-col rounded-xl border border-on-inverse-border bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                    >
                      {platform && <PlatformLogo platform={platform} size={40} iconSize={18} />}
                      <div className="mt-4 text-sm font-bold text-on-inverse">{service.title}</div>
                      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-on-inverse-muted">
                        {service.short}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent">
                        Explore {platform?.name ?? service.title}
                        <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Capability groups — the "what business problem" answer */}
        {capabilityGroups.map((group, gi) => (
          <section
            key={group.name}
            className={`px-4 py-14 sm:px-6 lg:px-10 ${gi % 2 === 1 ? "bg-surface-alt" : ""}`}
          >
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-8">
                <SectionHeading heading={group.name} description={group.description} align="center" />
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.slugs.map((slug, i) => {
                  const service = getServiceBySlug(slug);
                  if (!service) return null;
                  const platform = getPlatform(service.platform);
                  return (
                    <Reveal key={slug} delay={i * 60}>
                      <Card href={`/services/${slug}`} padding="md" className="overflow-hidden">
                        <div className="relative -mx-5 -mt-5 mb-4 h-28 w-[calc(100%+2.5rem)]">
                          <Image src={service.image} alt="" fill className="object-cover" />
                        </div>
                        <div className="mb-3 flex items-center justify-between">
                          <CardIcon>
                            <ServiceIcon icon={service.icon} size={18} />
                          </CardIcon>
                          {platform && (
                            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                              {platform.name}
                            </span>
                          )}
                        </div>
                        <div className="mb-1 text-sm font-bold text-ink">{service.title}</div>
                        <p className="text-xs leading-relaxed text-ink-muted">{service.short}</p>
                      </Card>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8">
              <SectionHeading
                heading="Industries we serve"
                description="Digital solutions built around the specific needs of the sectors we work with."
                align="center"
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <Card id={item.slug} href={`/industries/${item.slug}`} className="scroll-mt-24 overflow-hidden">
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
