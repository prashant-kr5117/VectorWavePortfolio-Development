import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformLogo from "@/components/PlatformLogo";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { platforms, getServicesByPlatform } from "@/lib/services";
import { industries } from "@/lib/industries";
import ZohoLogo from "@/src/zoho.png";
import OdooLogo from "@/src/odoo_logo.png";
import { Network, Users, ShieldCheck, Code2 } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "ERP, CRM & Cloud Solutions | VectorWave Services",
  description:
    "Tailored ERP, CRM, Zoho, and Odoo solutions helping businesses streamline operations and grow with the right technology.",
  path: "/services",
});

const coreServices = [
  {
    icon: Network,
    title: "ERP Implementation",
    desc: "A well implemented ERP system changes how your business operates. We design and deploy scalable ERP systems that connect your departments, improve data visibility, and make day-to-day operations run smoother.",
  },
  {
    icon: Users,
    title: "CRM Implementation",
    desc: "Managing leads, sales pipelines, and customer relationships becomes a lot easier with the right CRM in place. We customise workflows, automate follow-ups, and give your team the insights they need.",
  },
  {
    logo: ZohoLogo,
    title: "Zoho Implementation",
    desc: "Zoho has a tool for almost every part of your business. We implement and configure Zoho platforms so everything works together, giving your team one connected system for sales, finance, HR, and more.",
  },
  {
    logo: OdooLogo,
    title: "Odoo Implementation",
    desc: "Odoo's modular approach means you only use what your business actually needs. We handle end-to-end Odoo implementation covering inventory, finance, sales, and operations.",
  },
  {
    icon: ShieldCheck,
    title: "Annual Maintenance & Support",
    desc: "Our AMC services keep your systems monitored, updated, and running at their best, with ongoing technical support that minimises downtime and disruption.",
  },
  {
    icon: Code2,
    title: "Custom Application Development",
    desc: "We build secure, scalable web and mobile applications designed around your specific business processes, focused on performance, ease of use, and long-term adaptability.",
  },
];

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
        <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
          <Reveal>
            <span className="section-eyebrow section-eyebrow--light">Services</span>
            <h1 className="mx-auto mt-5 max-w-xl text-[26px] font-bold leading-tight text-ink sm:text-3xl">
              We provide a wide range of services
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
              We work with businesses to simplify operations, improve
              productivity, and drive growth using the right cloud tools and
              custom technology built around how you work. Whether your team
              runs on Zoho, Odoo, or Microsoft 365, we implement, connect, and
              support the platform you&apos;ve already chosen or help you
              pick the right one.
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10">
              <SectionHeading
                heading="Platforms & services we implement"
                description="Select a category to see the specific tools and what they cover."
                align="center"
              />
            </Reveal>

            <div className="flex flex-col gap-12">
              {platforms.map((platform) => (
                <div key={platform.slug}>
                  <Reveal className="mb-5 flex items-center gap-3">
                    <PlatformLogo platform={platform} size={40} iconSize={18} />
                    <div>
                      <div className="text-sm font-bold text-ink sm:text-base">
                        {platform.name}
                      </div>
                      <p className="text-xs text-ink-muted sm:text-sm">
                        {platform.short}
                      </p>
                    </div>
                  </Reveal>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {getServicesByPlatform(platform.slug).map((service, i) => (
                      <Reveal key={service.slug} delay={i * 60}>
                        <Card href={`/services/${service.slug}`} align="center" padding="md">
                          <CardIcon>
                            <ServiceIcon icon={service.icon} size={20} />
                          </CardIcon>
                          <span className="text-sm font-bold text-ink">{service.title}</span>
                        </Card>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8">
              <SectionHeading
                heading="Comprehensive digital solutions"
                description="From ERP and CRM to automation and cloud platforms."
                align="center"
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coreServices.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <Card>
                    {s.logo ? (
                      <div className="mb-3 inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-white px-2.5 transition-transform duration-300 group-hover:scale-110">
                        <Image src={s.logo} alt={`${s.title} logo`} style={{ height: 22, width: "auto" }} />
                      </div>
                    ) : (
                      <CardIcon>
                        <s.icon size={20} />
                      </CardIcon>
                    )}
                    <div className="mb-1 text-sm font-bold text-ink">{s.title}</div>
                    <p className="text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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
                  <Card id={item.slug} className="scroll-mt-24">
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
