import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import PlatformArchitectureFlow from "@/components/services/PlatformArchitectureFlow";
import ServiceCTA from "@/components/services/ServiceCTA";
import {
  getServiceBySlug,
  getPlatform,
  getPlatformProfile,
  getRelatedServices,
  serviceCategories,
} from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { ArrowLeft, Check } from "lucide-react";

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

/**
 * Shared architecture for all 18 templated service pages (everything except
 * zoho-bundled-suite, which keeps its own separate design — see
 * ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 15). The sections below are
 * genuinely populated with per-service data (problem/useCases/tools/integrations) and
 * per-platform data (architecture/implementation/ctaLabel), not a fixed template with
 * blanks filled in with filler — see lib/services.ts and
 * ai-optimization/reports/SERVICE-CONTENT-RESEARCH.md for what's real vs. what platform
 * documentation vs. what's a VectorWave-specific statement.
 */
export default async function ServiceDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const platform = getPlatform(service.platform);
  const profile = getPlatformProfile(service.platform);
  const related = getRelatedServices(service);

  return (
    <>
      <ServiceJsonLd service={service} />
      <main className="flex-1">
        {/* 1. Hero — solution overview */}
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

        {/* 2. Business context/problem + use cases */}
        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="section-eyebrow section-eyebrow--light">Where this fits</span>
              <h2 className="section-heading mt-4 text-ink">{service.problem}</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-wide text-primary">
                Common use cases
              </div>
              <ul className="flex flex-col gap-2.5">
                {service.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 3. Capabilities */}
        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <SectionHeading heading="Capabilities" align="center" />
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

        {/* 4. Technology/platform architecture */}
        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal className="mb-8">
              <SectionHeading
                heading="How it fits together"
                description={`${platform?.name ?? "This platform"}'s real architecture — the platform is one stage in the work, not the whole of it.`}
                align="center"
              />
            </Reveal>
            <PlatformArchitectureFlow stages={profile.architecture} />
          </div>
        </section>

        {/* 5. Implementation approach + integrations */}
        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="section-eyebrow section-eyebrow--light">Implementation approach</span>
              <div className="mt-5 flex flex-col gap-4">
                {profile.implementation.map((step, i) => (
                  <div key={step.step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-inverse text-[11px] font-bold text-on-inverse">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-ink">{step.step}</div>
                      <p className="text-xs leading-relaxed text-ink-muted">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <span className="section-eyebrow section-eyebrow--light">Connects with</span>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-bold text-ink-soft"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. Related services */}
        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-6 text-center">
              <h2 className="text-lg font-bold text-ink">Related services</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s, i) => (
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

        {/* 7. Contextual CTA */}
        <ServiceCTA platform={service.platform} serviceTitle={service.title} />
      </main>
    </>
  );
}
