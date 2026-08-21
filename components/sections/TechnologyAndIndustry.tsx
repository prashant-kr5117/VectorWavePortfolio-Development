import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import TechPlatformTabs from "./TechPlatformTabs";
import IndustryTabs from "./IndustryTabs";
import TechnologyEcosystemVisual from "./TechnologyEcosystemVisual";

const visibilityChain = ["Transactions", "Data", "KPIs", "Dashboards", "Decisions"];

const visibilityQuestions = [
  "Which products are actually profitable?",
  "Where is inventory getting stuck?",
  "Which receivables are becoming a risk?",
  "Where is operational capacity being lost?",
  "Which sales channels are performing?",
];

/**
 * Server component — no "use client" here. Only the two tab-switchers
 * (TechPlatformTabs, IndustryTabs) are genuinely interactive; everything else in this
 * section (the closing statement, ecosystem marquee, and visibility-questions list) is
 * static and now renders as plain server HTML instead of shipping inside the same
 * client bundle purely because two `useState` calls lived in the same file. HoverGlow
 * and Reveal remain client leaf components (as they already were), receiving this
 * static content as server-rendered children. See
 * ai-optimization/reports/WORKSTREAM-01-RESULT.md for why this was split.
 */
export default function TechnologyAndIndustry() {
  return (
    <HoverGlow as="section" className="bg-ink-inverse px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <TechPlatformTabs />
          <IndustryTabs />
        </div>

        <Reveal className="mt-16 border-t border-on-inverse-border pt-10 lg:mt-20">
          <h3 className="max-w-xl text-lg font-bold text-on-inverse sm:text-xl">
            One transformation approach.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-inverse-muted">
            We have worked across manufacturing, technology, services,
            healthcare, education and trading businesses. Because client
            confidentiality matters, we showcase our industry and
            business-process experience rather than publishing sensitive
            client information.
          </p>
        </Reveal>

        <TechnologyEcosystemVisual />

        <Reveal className="mt-16 lg:mt-20">
          <h2 className="max-w-lg text-xl font-bold leading-snug text-on-inverse sm:text-2xl">
            Data isn&apos;t the finish line.
            <br />
            <span className="text-on-inverse-muted">Decision is.</span>
          </h2>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {visibilityChain.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && <ArrowRight size={12} className="shrink-0 text-on-inverse-faint" />}
                <span className="whitespace-nowrap rounded-md border border-on-inverse-border bg-white/5 px-3.5 py-2 text-sm font-bold text-on-inverse">
                  {step}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-8 flex max-w-2xl flex-col">
            {visibilityQuestions.map((q) => (
              <div
                key={q}
                className="border-t border-on-inverse-border py-3.5 text-sm italic text-on-inverse-muted last:border-b"
              >
                &ldquo;{q}&rdquo;
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </HoverGlow>
  );
}
