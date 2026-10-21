import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Quote,
  X,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import BookConsultationButton from "@/components/BookConsultationButton";
import IndustryJsonLd from "@/components/IndustryJsonLd";
import IndustryFAQ from "@/components/industries/IndustryFAQ";
import IllustrativeDashboardPreview from "@/components/industries/IllustrativeDashboardPreview";
import FeatureSpotlights from "@/components/industries/real-estate/FeatureSpotlights";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/industries";
import { caseStudy, crmExplainer, journey, problems, zohoStack } from "@/lib/real-estate";
import { buildMetadata } from "@/lib/seo";
import RealEstateErpImage from "@/src/Real Estate.png";
import RealEstateTabletImage from "@/src/erp_real_estate_part_2_2.png";

// Static segment: takes precedence over app/industries/[slug] for this one industry,
// which gets a bespoke long-form page instead of the shared template.
const industry = industries.find((i) => i.slug === "real-estate")!;

export const metadata: Metadata = buildMetadata({
  title: "Real Estate CRM & ERP Implementation | Zoho for Developers & Brokers | VectorWave",
  description:
    "VectorWave implements real estate CRM and ERP on Zoho: lead capture, follow-ups, site visits, unit inventory, bookings, collections and live management dashboards in one connected system.",
  path: "/industries/real-estate",
});

export default function RealEstatePage() {
  return (
    <>
      <IndustryJsonLd industry={industry} />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-ink-inverse px-4 pb-16 pt-12 sm:px-6 lg:px-10 lg:pb-24 lg:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-48 -left-32 h-[440px] w-[440px] rounded-full bg-primary/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <Link
                href="/industries"
                className="mb-6 flex w-fit items-center gap-1.5 text-xs font-bold text-on-inverse-muted transition-colors duration-200 hover:text-accent"
              >
                <ArrowLeft size={14} /> Back to industries
              </Link>
              <span className="section-eyebrow section-eyebrow--inverse mb-4">
                Real Estate CRM &amp; ERP Implementation
              </span>
              <h1 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-tight text-on-inverse sm:text-4xl lg:text-[44px]">
                From first enquiry to final payment,{" "}
                <span className="bg-gradient-to-r from-accent to-[#7dd3fc] bg-clip-text text-transparent">
                  one connected system.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-inverse-muted sm:text-base">
                VectorWave builds real estate CRM and ERP systems on Zoho that bring every lead,
                site visit, unit, booking and collection into one place, so your sales team
                follows up on time and management sees the whole business live.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BookConsultationButton className="btn btn-primary btn--md">
                  Book a free audit <ArrowRight size={15} />
                </BookConsultationButton>
                <a
                  href="#case-study"
                  className="inline-flex items-center gap-2 rounded-lg border border-on-inverse-border px-5 py-2.5 text-sm font-bold text-on-inverse transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  Read the case study <ArrowDown size={15} />
                </a>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-on-inverse-muted sm:text-sm">
                {["Lead capture from every channel", "Automated follow-ups", "Unit-level inventory", "Bookings linked to collections"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={14} className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent p-[1px]">
                <div className="overflow-hidden rounded-3xl bg-white">
                  <Image
                    src={RealEstateErpImage}
                    alt="Illustration of a real estate ERP dashboard on a laptop beside a model residential project, connected to finance, documents, customer and property modules"
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 540px, 100vw"
                    placeholder="blur"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-card-hover)] sm:-left-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-surface text-success">
                  <Check size={18} strokeWidth={2.5} />
                </span>
                <div>
                  <div className="text-xs font-bold text-ink">Live in 12 weeks</div>
                  <div className="text-[11px] text-ink-muted">Kickoff to full rollout, client case study</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Signature journey */}
        <section className="border-b border-border bg-surface px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-5 text-center text-[11px] font-bold uppercase tracking-wide text-ink-faint">
              The complete real estate customer journey, in one system
            </Reveal>
            <Reveal>
              <ol className="-mx-4 flex snap-x items-center overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-y-3 lg:overflow-visible lg:px-0">
                {journey.map((step, i) => (
                  <li key={step} className="flex shrink-0 snap-start items-center">
                    {i > 0 && (
                      <ArrowRight
                        size={13}
                        style={{ animationDelay: `${i * 90}ms` }}
                        className="mx-1.5 shrink-0 animate-flow-arrow text-ink-faint-2"
                      />
                    )}
                    <span
                      className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold ${
                        i === journey.length - 1
                          ? "border-ink-inverse bg-ink-inverse text-on-inverse"
                          : "border-border bg-surface-alt text-ink-soft"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                          i === journey.length - 1 ? "bg-accent text-ink-inverse" : "bg-surface-chip text-primary"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* 3. What is a real estate CRM? */}
        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="What is a real estate CRM?"
                heading="Not software for your IT team. A system for your sales team."
              />
              <div className="relative mt-6 rounded-2xl border border-border bg-surface-alt p-6">
                <Quote size={28} className="absolute -top-3.5 left-5 rounded-md bg-surface-alt px-1 text-accent" />
                <p className="text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                  A CRM (Customer Relationship Management) system for real estate is the{" "}
                  <strong className="text-ink">single place where every lead, site visit, booking and payment</strong>{" "}
                  for a project lives, replacing spreadsheets, WhatsApp chats and sticky notes.
                </p>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                If your leads are spread across Instagram DMs, WhatsApp, an Excel sheet and one
                salesperson&apos;s notebook, a real estate CRM simply means all of that, in one place.
              </p>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {crmExplainer.map((item, i) => (
                <Reveal key={item.title} delay={(i % 3) * 70}>
                  <div className="group h-full rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]">
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-chip text-primary transition-colors duration-300 group-hover:bg-ink-inverse group-hover:text-accent">
                      <item.icon size={19} />
                    </span>
                    <div className="text-sm font-bold text-ink">{item.title}</div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Problems we solve */}
        <section className="bg-surface-alt px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto mb-10 max-w-2xl">
              <SectionHeading
                eyebrow="Problems we solve"
                heading="Five real estate sales problems we hear every week, and how they disappear"
                description="If any of these sound familiar, they're symptoms of the same root cause: no single system connecting sales, inventory and finance."
                align="center"
              />
            </Reveal>

            <div className="flex flex-col gap-4">
              {problems.map((p, i) => (
                <Reveal key={p.problem} delay={i * 50}>
                  <div className="grid overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-[0.8fr_1fr_auto_1fr]">
                    <div className="flex items-center gap-3 border-b border-border p-5 md:border-b-0 md:border-r">
                      <span className="text-2xl font-bold text-border-soft">0{i + 1}</span>
                      <h3 className="text-sm font-bold text-ink sm:text-base">{p.problem}</h3>
                    </div>
                    <div className="flex items-start gap-3 p-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-error-surface text-error">
                        <X size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wide text-error">Before</div>
                        <p className="mt-1 text-sm text-ink-muted">{p.before}</p>
                      </div>
                    </div>
                    <div className="hidden items-center text-ink-faint-2 md:flex">
                      <ArrowRight size={18} />
                    </div>
                    <div className="flex items-start gap-3 bg-success-surface/60 p-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wide text-success">The VectorWave fix</div>
                        <p className="mt-1 text-sm text-ink-soft">{p.fix}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Feature spotlights */}
        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto mb-8 max-w-2xl">
              <SectionHeading
                eyebrow="What the system does"
                heading="Five modules, one connected real estate ERP"
                description="Each module works on its own and shares data with the others, so a lead becomes a booking and a booking becomes a collection without anyone re-typing it."
                align="center"
              />
            </Reveal>
            <Reveal>
              <FeatureSpotlights />
            </Reveal>
          </div>
        </section>

        {/* 6. Case study */}
        <section id="case-study" className="relative scroll-mt-20 overflow-hidden bg-ink-inverse px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-accent/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-6xl">
            {/* Intro */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <span className="section-eyebrow section-eyebrow--inverse">Client case study</span>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-on-inverse sm:text-3xl">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-inverse-muted sm:text-base">
                  {caseStudy.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Multi-project real estate company", "CRM + finance automation", "12-week rollout"].map((tag) => (
                    <span key={tag} className="rounded-full border border-on-inverse-border bg-white/5 px-3 py-1 text-xs font-bold text-on-inverse">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100} className="mx-auto w-full max-w-sm">
                <div className="relative">
                  <div aria-hidden className="absolute inset-6 rounded-full bg-accent/25 blur-3xl" />
                  <div className="relative aspect-[437/360] overflow-hidden">
                    <Image
                      src={RealEstateTabletImage}
                      alt="Illustration of a residential project on a tablet linked to sales, analytics and location insights"
                      className="h-full w-full rounded-2xl object-cover object-top"
                      sizes="(min-width: 1024px) 384px, 90vw"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Challenge */}
            <div className="mt-16">
              <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-accent">The challenge</div>
                  <h3 className="mt-2 max-w-xl text-lg font-bold text-on-inverse sm:text-xl">
                    Inquiries poured in from dozens of channels. The tools couldn&apos;t keep up.
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.channels.map((c) => (
                    <span key={c} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-bold text-on-inverse-muted">
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudy.challenges.map((c, i) => (
                  <Reveal key={c.title} delay={i * 60}>
                    <div className="h-full rounded-xl border border-on-inverse-border bg-ink-inverse-alt/50 p-5">
                      <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-error/20 text-[11px] font-bold text-[#fca5a5]">
                        {i + 1}
                      </span>
                      <div className="text-sm font-bold text-on-inverse">{c.title}</div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-on-inverse-muted">{c.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Objectives */}
            <Reveal className="mt-16 rounded-2xl border border-on-inverse-border bg-white/[0.03] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-accent">Objective</div>
                  <h3 className="mt-2 text-lg font-bold text-on-inverse sm:text-xl">
                    One connected workflow spanning the full customer journey.
                  </h3>
                  <p className="mt-3 text-sm text-on-inverse-muted">
                    {journey.join(" → ")}
                  </p>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-accent">
                    Management wanted real-time answers to
                  </div>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {caseStudy.questions.map((q) => (
                      <li key={q} className="flex items-start gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm text-on-inverse">
                        <CircleHelp size={16} className="mt-0.5 shrink-0 text-accent" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Solution */}
            <div className="mt-16">
              <Reveal className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wide text-accent">The solution by VectorWave</div>
                <h3 className="mt-2 max-w-2xl text-lg font-bold text-on-inverse sm:text-xl">
                  A centralized real estate management ecosystem, from lead capture to executive dashboards.
                </h3>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {caseStudy.solution.map((s, i) => (
                  <Reveal key={s.title} delay={(i % 2) * 80}>
                    <div className="h-full rounded-2xl border border-on-inverse-border bg-gradient-to-br from-white/[0.06] to-transparent p-6 transition-colors duration-300 hover:border-accent/50">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <s.icon size={19} />
                        </span>
                        <div>
                          <div className="text-[10.5px] font-bold uppercase tracking-wide text-on-inverse-faint">0{i + 1}</div>
                          <div className="text-sm font-bold text-on-inverse sm:text-base">{s.title}</div>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-on-inverse-muted">
                            <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-16">
              <Reveal className="mb-8">
                <div className="text-[11px] font-bold uppercase tracking-wide text-accent">The timeline</div>
                <h3 className="mt-2 text-lg font-bold text-on-inverse sm:text-xl">From kickoff to operational scale in 12 weeks</h3>
              </Reveal>
              <ol className="relative grid gap-6 md:grid-cols-3 md:gap-5">
                <span aria-hidden className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-on-inverse-border md:left-0 md:top-[15px] md:h-px md:w-full" />
                {caseStudy.timeline.map((t, i) => (
                  <Reveal key={t.phase} delay={i * 100}>
                    <li className="relative pl-12 md:pl-0 md:pt-12">
                      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-ink-inverse text-xs font-bold text-accent">
                        {i + 1}
                      </span>
                      <div className="text-xs font-bold text-accent">{t.weeks}</div>
                      <div className="mt-1 text-sm font-bold text-on-inverse sm:text-base">{t.phase}</div>
                      <p className="mt-2 text-[13px] leading-relaxed text-on-inverse-muted">{t.text}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Outcome */}
            <Reveal className="mt-16">
              <div className="grid gap-8 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-transparent p-6 ring-1 ring-on-inverse-border sm:p-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-accent">The outcome</div>
                  <p className="mt-3 text-lg font-bold leading-snug text-on-inverse sm:text-xl">
                    {caseStudy.conclusion}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {caseStudy.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm text-on-inverse">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-ink-inverse">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. Management dashboard preview */}
        {industry.illustrativeDashboard && (
          <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-5xl">
              <Reveal className="mx-auto mb-8 max-w-2xl">
                <SectionHeading
                  eyebrow="Management visibility"
                  heading="Your Friday status call, replaced by a live dashboard"
                  description="Booked, collected and outstanding, by project, source and salesperson. Here's the kind of view we configure (sample data shown)."
                  align="center"
                />
              </Reveal>
              <IllustrativeDashboardPreview
                stats={industry.illustrativeDashboard.stats}
                pipeline={industry.illustrativeDashboard.pipeline}
              />
            </div>
          </section>
        )}

        {/* 8. Built on Zoho */}
        <section className="bg-surface-alt px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto mb-10 max-w-2xl">
              <SectionHeading
                eyebrow="Real estate CRM with Zoho"
                heading="Why we build real estate CRMs on Zoho, not a generic off-the-shelf tool"
                description="Already on Zoho but not using it for real estate? We configure the same stack around your leads, site visits, bookings and collections."
                align="center"
              />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {zohoStack.map((z, i) => (
                <Reveal key={z.name} delay={i * 60}>
                  <Link
                    href={z.href}
                    className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-ink">{z.name}</span>
                      <ArrowUpRight size={15} className="text-ink-faint transition-colors duration-200 group-hover:text-primary" />
                    </div>
                    <p className="text-[13px] font-bold leading-snug text-primary">&ldquo;{z.angle}&rdquo;</p>
                    <p className="mt-auto pt-3 text-xs leading-relaxed text-ink-muted">{z.handles}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        {industry.faqs && industry.faqs.length > 0 && (
          <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-3xl">
              <Reveal className="mb-6">
                <SectionHeading heading="Frequently asked questions" align="center" />
              </Reveal>
              <IndustryFAQ faqs={industry.faqs} />
            </div>
          </section>
        )}

        {/* 10. CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-10">
          <Reveal>
            <HoverGlow className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-ink-inverse px-6 py-14 text-center sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[90px]"
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-xl font-bold leading-snug text-on-inverse sm:text-3xl">
                  Ready to connect every lead to every rupee collected?
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-on-inverse-muted sm:text-base">
                  Tell us how your sales, inventory and collections run today. We&apos;ll map the
                  gaps and show you what a connected real estate system looks like for your projects.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <BookConsultationButton className="btn btn-primary btn--md">
                    Book a free audit <ArrowRight size={15} />
                  </BookConsultationButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-on-inverse-border px-5 py-2.5 text-sm font-bold text-on-inverse transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </HoverGlow>
          </Reveal>
        </section>
      </main>
    </>
  );
}
