import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * Platform-level architecture diagram — one per platform (Zoho/Odoo/Microsoft 365/Custom
 * Development), shown on every service page for that platform rather than a bespoke
 * diagram per service. Reuses the pill-and-arrow chain visual language already
 * established sitewide (ProcessChainTabs.tsx, WhyVectorWave.tsx) so this reads as the
 * same design system, not a new visual pattern. See
 * ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 2/10.
 */
export default function PlatformArchitectureFlow({ stages }: { stages: string[] }) {
  return (
    <Reveal className="flex flex-wrap items-center justify-center gap-y-3">
      {stages.map((stage, i) => (
        <span key={stage} className="flex items-center">
          {i > 0 && (
            <ArrowRight
              size={14}
              style={{ animationDelay: `${i * 90}ms` }}
              className="mx-2 shrink-0 animate-flow-arrow text-ink-faint sm:mx-3"
            />
          )}
          <span
            style={{ animationDelay: `${i * 70}ms` }}
            className="animate-[fade-in-up_0.5s_ease-out_backwards] whitespace-nowrap rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs font-bold text-ink-soft sm:text-sm"
          >
            {stage}
          </span>
        </span>
      ))}
    </Reveal>
  );
}
