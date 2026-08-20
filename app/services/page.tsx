import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import Footer from "@/components/Footer";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformLogo from "@/components/PlatformLogo";
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
            <span className="inline-block rounded-full bg-surface-chip px-4 py-1.5 text-[11px] font-bold text-primary">
              Services
            </span>
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
            <Reveal className="mb-10 text-center">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                Platforms &amp; services we implement
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Select a category to see the specific tools and what they cover.
              </p>
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
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-chip text-primary transition-transform duration-300 group-hover:scale-110">
                            <ServiceIcon icon={service.icon} size={20} />
                          </div>
                          <span className="text-sm font-bold text-ink">
                            {service.title}
                          </span>
                        </Link>
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
            <Reveal className="mb-8 text-center">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                Comprehensive digital solutions
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                From ERP and CRM to automation and cloud platforms.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coreServices.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="group h-full rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    {s.logo ? (
                      <div className="mb-3 inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-white px-2.5 transition-transform duration-300 group-hover:scale-110">
                        <Image src={s.logo} alt={`${s.title} logo`} style={{ height: 22, width: "auto" }} />
                      </div>
                    ) : (
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-chip text-primary transition-transform duration-300 group-hover:scale-110">
                        <s.icon size={20} />
                      </div>
                    )}
                    <div className="mb-1 text-sm font-bold text-ink">
                      {s.title}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8 text-center">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                Industries we serve
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                Digital solutions built around the specific needs of the
                sectors we work with.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div
                    id={item.slug}
                    className="group h-full scroll-mt-24 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-ink-inverse text-on-inverse transition-transform duration-300 group-hover:scale-110">
                      <item.icon size={18} />
                    </div>
                    <div className="mb-1 text-sm font-bold text-ink">
                      {item.title}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
