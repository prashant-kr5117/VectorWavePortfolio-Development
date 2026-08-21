import Image from "next/image";
import { ArrowRight, Target, Layers, Bot, Code2, Database } from "lucide-react";
import Reveal from "@/components/Reveal";
import ZohoLogo from "@/src/zoho.png";
import OdooLogo from "@/src/odoo_logo.png";
import MicrosoftDynamics365Logo from "@/src/Microsoft_Dynamics_365_Logo.svg";

/**
 * Replaces the old ecosystem name-marquee (redundant with TechPlatformTabs directly
 * above it — see ai-optimization/reports/HOMEPAGE-CURRENT-STATE.md item 7) with a real
 * relationship diagram: how a business need actually moves through VectorWave's work,
 * from the platform layer through integration/automation/custom development to a
 * decision. This is deliberately NOT a logo wall — the three platform logos are one
 * stage among six, not the whole diagram. See
 * ai-optimization/reports/HOMEPAGE-MASTER-PLAN.md Section 6.
 */
const platformNodes = [
  { name: "Zoho", logo: ZohoLogo },
  { name: "Odoo", logo: OdooLogo },
  { name: "Microsoft Dynamics 365", logo: MicrosoftDynamics365Logo },
];

const stages = [
  {
    icon: Target,
    label: "Business need",
    detail: "Where a process breaks down or a decision is delayed",
  },
  {
    icon: Layers,
    label: "Platform implementation",
    detail: null, // rendered separately as the platform-logo stage
  },
  {
    icon: Bot,
    label: "Integration & automation",
    detail: "Connecting what already exists, removing manual re-entry",
  },
  {
    icon: Code2,
    label: "Custom development",
    detail: "Web, mobile, AI and API work that extends the platform",
  },
  {
    icon: Database,
    label: "Decisions & outcomes",
    detail: "Dashboards built on live transaction data",
  },
];

export default function TechnologyEcosystemVisual() {
  return (
    <Reveal className="mt-14 border-y border-on-inverse-border py-8">
      <div className="mb-6 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wide text-accent">
          How the pieces connect
        </span>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-on-inverse-muted">
          The platform is one stage in the work, not the whole of it.
        </p>
      </div>

      {/* Desktop / tablet: horizontal flow. Mobile: vertical stack (flex-col via sm:flex-row). */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-center sm:gap-2">
        {/* Stage 1 — Business need */}
        <EcosystemStage stage={stages[0]} index={0} />
        <Connector index={0} />

        {/* Stage 2 — Platform implementation (branches into 3 real platforms) */}
        <div
          style={{ transitionDelay: "80ms" }}
          className="flex w-full shrink-0 animate-[fade-in-up_0.5s_ease-out_backwards] flex-col items-center rounded-xl border border-accent/40 bg-gradient-to-br from-accent/15 to-primary/10 px-4 py-4 text-center sm:w-[168px]"
        >
          <Layers size={18} className="mb-2 text-accent" />
          <div className="text-xs font-bold text-on-inverse">Platform implementation</div>
          <div className="mt-3 flex w-full flex-col gap-1.5">
            {platformNodes.map((p) => (
              <span
                key={p.name}
                className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5"
              >
                <Image src={p.logo} alt="" aria-hidden="true" style={{ height: 14, width: "auto" }} />
                <span className="sr-only">{p.name}</span>
              </span>
            ))}
          </div>
        </div>
        <Connector index={1} />

        {/* Stage 3 — Integration & automation */}
        <EcosystemStage stage={stages[2]} index={2} />
        <Connector index={2} />

        {/* Stage 4 — Custom development */}
        <EcosystemStage stage={stages[3]} index={3} />
        <Connector index={3} />

        {/* Stage 5 — Decisions & outcomes */}
        <EcosystemStage stage={stages[4]} index={4} last />
      </div>
    </Reveal>
  );
}

function EcosystemStage({
  stage,
  index,
  last = false,
}: {
  stage: { icon: typeof Target; label: string; detail: string | null };
  index: number;
  last?: boolean;
}) {
  const Icon = stage.icon;
  return (
    <div
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`flex w-full shrink-0 animate-[fade-in-up_0.5s_ease-out_backwards] flex-col items-center rounded-xl border px-4 py-4 text-center sm:w-[168px] ${
        last
          ? "border-accent bg-accent/15"
          : "border-on-inverse-border bg-white/5"
      }`}
    >
      <Icon size={18} className={last ? "mb-2 text-accent" : "mb-2 text-on-inverse-faint"} />
      <div className="text-xs font-bold text-on-inverse">{stage.label}</div>
      {stage.detail && (
        <div className="mt-1 text-[10.5px] leading-snug text-on-inverse-muted">{stage.detail}</div>
      )}
    </div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 sm:rotate-0 sm:py-0">
      <ArrowRight
        size={16}
        style={{ animationDelay: `${index * 90}ms` }}
        className="hidden shrink-0 animate-flow-arrow text-on-inverse-faint sm:block"
      />
      <ArrowRight
        size={16}
        style={{ animationDelay: `${index * 90}ms` }}
        className="block shrink-0 rotate-90 animate-flow-arrow text-on-inverse-faint sm:hidden"
      />
    </div>
  );
}
