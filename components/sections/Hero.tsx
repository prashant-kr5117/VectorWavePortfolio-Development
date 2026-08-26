import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import BookConsultationButton from "@/components/BookConsultationButton";
import EcosystemOrbit from "@/components/EcosystemOrbit";
import Counter from "@/components/Counter";
import HoverGlow from "@/components/HoverGlow";
import { platforms } from "@/lib/services";
import { industries } from "@/lib/industries";

export default function Hero() {
  return (
    // Top padding is now modest (pt-14/20) rather than pt-28/36 — that larger value
    // existed to clear a `fixed` header that didn't occupy document flow space; the
    // header is `sticky` everywhere now (see components/Header.tsx), which already
    // pushes this section down naturally.
    <HoverGlow as="section" className="bg-ink-inverse px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pb-16 lg:pt-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
            <span className="h-1.5 w-1.5 shrink-0 animate-dot-pulse rounded-full bg-accent" />
            ERP · CRM · Web &amp; AI Solutions
          </span>

          <h1 className="mt-5 min-h-[120px] max-w-xl text-[32px] font-bold leading-tight text-on-inverse sm:min-h-[180px] sm:text-5xl">
            <Typewriter
              segments={[
                { text: "Powering Intelligent " },
                {
                  text: "Business Flow,",
                  className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                },
                { text: " without the overhead." },
              ]}
              speed={85}
              startDelay={300}
            />
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-on-inverse-muted sm:text-base">
            We implement Zoho and Odoo ERP, CRM automation, web development and
            AI-powered tools so growing businesses run on one connected system.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <BookConsultationButton className="btn btn-primary btn--md w-full sm:w-auto">
              Book free consultation <ArrowRight size={15} />
            </BookConsultationButton>
            <Link href="/services" className="btn btn-secondary-inverse btn--md w-full sm:w-auto">
              See our services
            </Link>
          </div>

          {/* Projects Delivered restored per ai-optimization/reports/WORKSTREAM-03-RESULT.md
              Section 20 — "15+" is the human-confirmed verified figure (matching the
              About page's "15 Projects Completed"), not the prior contradicted "50+".
              Given first position and a larger number size than the other two stats so
              it reads as the primary proof point, with a divider separating it from the
              secondary platform/industry counts — a deliberately different visual
              treatment from the pre-Workstream-3 flat two-stat row, not a restoration of
              the old layout. */}
          <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-on-inverse-border pt-6">
            <div>
              <Counter value={15} suffix="+" className="text-3xl font-bold text-on-inverse" />
              <div className="mt-0.5 text-xs font-semibold text-on-inverse-faint">Projects delivered</div>
            </div>
            <div aria-hidden="true" className="hidden h-8 w-px bg-on-inverse-border sm:block" />
            <div>
              <Counter value={platforms.length} className="text-xl font-bold text-on-inverse" />
              <div className="mt-0.5 text-xs text-on-inverse-faint">Platforms</div>
            </div>
            <div>
              <Counter value={industries.length} className="text-xl font-bold text-on-inverse" />
              <div className="mt-0.5 text-xs text-on-inverse-faint">Industries served</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EcosystemOrbit />
        </Reveal>
      </div>
    </HoverGlow>
  );
}
