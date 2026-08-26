import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import BookConsultationButton from "@/components/BookConsultationButton";
import IndustryJsonLd from "@/components/IndustryJsonLd";
import IndustryFAQ from "@/components/industries/IndustryFAQ";
import IllustrativeDashboardPreview from "@/components/industries/IllustrativeDashboardPreview";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformArchitectureFlow from "@/components/services/PlatformArchitectureFlow";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/industries";
import { getServiceBySlug, getPlatform } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return buildMetadata({
    title: `${industry.title} CRM & ERP Systems | Zoho, Odoo Implementation | VectorWave`,
    description: `VectorWave implements Zoho, Odoo and Microsoft 365 for ${industry.title.toLowerCase()} businesses: ${industry.desc.toLowerCase()}`,
    path: `/industries/${industry.slug}`,
  });
}

/**
 * Shared template for all industry pages, generated from lib/industries.ts — the same
 * data already used in the homepage's IndustryTabs and /services' "Industries we serve"
 * grid, not new/invented content. The "Illustrative Example Architecture" section only
 * renders when relatedServiceSlugs is set on the industry (currently Real Estate only)
 * and is explicitly labeled as illustrative, matching the precedent set on
 * /services/zoho-bundled-suite — see ai-optimization/BUSINESS_FACTS.md
 * ("Existing honest-labeling precedent"). No client names, testimonials, or results are
 * attached to it.
 */
export default async function IndustryDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relatedServices = (industry.relatedServiceSlugs ?? [])
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <IndustryJsonLd industry={industry} />
      <main className="flex-1">
        {/* 1. Hero */}
        {industry.heroImage ? (
          <section className="bg-ink-inverse px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <Reveal>
                <Link
                  href="/industries"
                  className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-on-inverse-muted transition-colors duration-200 hover:text-accent"
                >
                  <ArrowLeft size={14} /> Back to industries
                </Link>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-on-inverse">
                  <industry.icon size={26} />
                </div>
                <span className="section-eyebrow section-eyebrow--inverse mb-3">Industry</span>
                <h1 className="text-[26px] font-bold leading-tight text-on-inverse sm:text-3xl">
                  {industry.title} systems, implemented around how you actually work.
                </h1>
                <p className="mt-4 max-w-lg text-sm text-on-inverse-muted sm:text-base">
                  {industry.desc}
                </p>
                <BookConsultationButton className="btn btn-primary btn--md mt-6">
                  Book free consultation <ArrowRight size={15} />
                </BookConsultationButton>
              </Reveal>
              <Reveal delay={120}>
                <div className="overflow-hidden rounded-2xl border border-on-inverse-border">
                  <Image
                    src={industry.heroImage}
                    alt={`${industry.title} — illustrative, not a specific client's site or property`}
                    className="aspect-[4/5] h-full w-full object-cover sm:aspect-[3/4]"
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </section>
        ) : (
          <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
            <Reveal className="mx-auto max-w-2xl">
              <Link
                href="/industries"
                className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft transition-colors duration-200 hover:text-primary"
              >
                <ArrowLeft size={14} /> Back to industries
              </Link>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-ink-inverse text-on-inverse">
                <industry.icon size={26} />
              </div>
              <span className="section-eyebrow section-eyebrow--light mb-3">Industry</span>
              <h1 className="mx-auto text-[26px] font-bold leading-tight text-ink sm:text-3xl">
                {industry.title} systems, implemented around how you actually work.
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
                {industry.desc}
              </p>
              <BookConsultationButton className="btn btn-primary btn--md mt-6">
                Book free consultation <ArrowRight size={15} />
              </BookConsultationButton>
            </Reveal>
          </section>
        )}

        {/* 2. Business model + capabilities */}
        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="section-eyebrow section-eyebrow--light">How this business runs</span>
              <h2 className="section-heading mt-4 text-ink">{industry.model}</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-wide text-primary">
                What we typically set up
              </div>
              <ul className="flex flex-col gap-2.5">
                {industry.caps.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {cap}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 3. Signature process flow */}
        {industry.flow && (
          <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal className="mb-8">
                <SectionHeading
                  heading="The signature process"
                  description={`How ${industry.title.toLowerCase()} moves from start to finish, stage by stage.`}
                  align="center"
                />
              </Reveal>
              <PlatformArchitectureFlow stages={industry.flow} />
            </div>
          </section>
        )}

        {/* 4. Illustrative example architecture — only where explicitly populated */}
        {relatedServices.length > 0 && (
          <section className="px-4 py-14 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
              <Reveal className="mb-3 text-center">
                <span className="section-eyebrow section-eyebrow--light">
                  Illustrative Example Architecture
                </span>
                <h2 className="section-heading mt-4 text-ink">
                  What a {industry.title.toLowerCase()} system looks like on Zoho/Odoo
                </h2>
                <p className="section-description mx-auto text-ink-muted">
                  An illustrative implementation pattern, not a specific client case
                  study unless separately verified — the real modules and connections
                  we typically configure for this industry.
                </p>
              </Reveal>

              {industry.illustrativeDashboard && (
                <div className="mt-8">
                  <IllustrativeDashboardPreview
                    stats={industry.illustrativeDashboard.stats}
                    pipeline={industry.illustrativeDashboard.pipeline}
                  />
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((service, i) => {
                  const platform = getPlatform(service.platform);
                  return (
                    <Reveal key={service.slug} delay={i * 60}>
                      <Card href={`/services/${service.slug}`}>
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
        )}

        {/* 5. Management visibility */}
        <section className="bg-ink-inverse px-4 py-14 text-center sm:px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl">
            <span className="section-eyebrow section-eyebrow--inverse">Management visibility</span>
            <p className="mt-4 text-lg font-bold leading-snug text-on-inverse sm:text-xl">
              {industry.visibility}
            </p>
          </Reveal>
        </section>

        {/* 6. FAQ */}
        {industry.faqs && industry.faqs.length > 0 && (
          <section className="px-4 py-14 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-3xl">
              <Reveal className="mb-6">
                <SectionHeading heading="Frequently asked questions" align="center" />
              </Reveal>
              <IndustryFAQ faqs={industry.faqs} />
            </div>
          </section>
        )}

        {/* 7. CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <Reveal>
            <HoverGlow className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface-alt px-6 py-14 text-center transition-all duration-300 hover:border-primary/50 sm:px-10">
              <h2 className="text-lg font-bold text-ink sm:text-xl">
                Talk to us about your {industry.title.toLowerCase()} systems
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
                Tell us how you run today and we&apos;ll map out how Zoho, Odoo or
                Microsoft 365 fits your {industry.title.toLowerCase()} operation.
              </p>
              <BookConsultationButton className="btn btn-primary btn--md mt-5">
                Book free consultation <ArrowRight size={15} />
              </BookConsultationButton>
            </HoverGlow>
          </Reveal>
        </section>
      </main>
    </>
  );
}
