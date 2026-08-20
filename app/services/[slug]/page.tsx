import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getServiceBySlug,
  getServicesByPlatform,
  getPlatform,
  serviceCategories,
} from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  // "zoho-bundled-suite" has its own dedicated static route
  // (app/services/zoho-bundled-suite/page.tsx) with a custom design.
  return serviceCategories
    .filter((service) => service.slug !== "zoho-bundled-suite")
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const platform = getPlatform(service.platform);
  const otherServices = getServicesByPlatform(service.platform).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <>
      <ServiceJsonLd service={service} />
      <main className="flex-1">
        <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
          <Reveal className="mx-auto max-w-2xl">
            <Link
              href="/services"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft transition-colors duration-200 hover:text-primary"
            >
              <ArrowLeft size={14} /> Back to services
            </Link>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-ink-inverse text-on-inverse">
              <ServiceIcon icon={service.icon} size={26} />
            </div>
            {platform && (
              <span className="section-eyebrow section-eyebrow--light mb-3">
                {platform.name}
              </span>
            )}
            <h1 className="mx-auto text-[26px] font-bold leading-tight text-ink sm:text-3xl">
              {service.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
              {service.intro}
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <SectionHeading heading="What's included" align="center" />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.tools.map((tool, i) => (
                <Reveal key={tool.name} delay={i * 60}>
                  <Card>
                    <div className="mb-1 text-sm font-bold text-ink">{tool.name}</div>
                    <p className="text-sm leading-relaxed text-ink-muted">{tool.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-6 text-center">
              <h2 className="text-lg font-bold text-ink">
                Other {platform?.name ?? ""} services we provide
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((s, i) => (
                <Reveal key={s.slug} delay={i * 60}>
                  <Card href={`/services/${s.slug}`} align="center">
                    <CardIcon>
                      <ServiceIcon icon={s.icon} size={20} />
                    </CardIcon>
                    <span className="text-sm font-bold text-ink">{s.title}</span>
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
