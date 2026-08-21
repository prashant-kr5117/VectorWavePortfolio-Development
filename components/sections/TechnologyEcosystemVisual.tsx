"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Target, Layers, Bot, Code2, Database } from "lucide-react";
import { motion, MotionConfig, useInView, type Transition } from "motion/react";
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
 *
 * Sequenced reveal (Iteration 002/003): each node settles into place in reading order,
 * connectors draw themselves as an SVG line then confirm with an arrowhead, spring-eased
 * per motion.dev/ui's own UI defaults (stiffness 305 / damping 33). Timing is driven by
 * a single `useInView` boolean plus an explicit per-element delay (not `variants` +
 * `staggerChildren`) — deliberate: a connector's line and arrowhead need two different
 * animated properties on two different nested elements sharing one timing slot, and
 * explicit delays keep that fully deterministic rather than depending on how deep
 * variant-context propagation counts nested motion descendants for staggering.
 * MotionConfig reducedMotion="user" is required — unlike this codebase's CSS keyframe
 * animations, Motion drives transforms outside the stylesheet, so app/globals.css's
 * prefers-reduced-motion media query does not reach it.
 */
const platformNodes = [
  { name: "Zoho", label: "Zoho", logo: ZohoLogo },
  { name: "Odoo", label: "Odoo", logo: OdooLogo },
  { name: "Microsoft Dynamics 365", label: "Dynamics 365", logo: MicrosoftDynamics365Logo },
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

const STEP = 0.11;
const BASE_DELAY = 0.05;
const delayAt = (slot: number) => BASE_DELAY + slot * STEP;

const NODE_SPRING: Transition = { type: "spring", stiffness: 305, damping: 33 };
const ARROWHEAD_SPRING: Transition = { type: "spring", stiffness: 400, damping: 25 };
const LINE_DRAW_EASE: [number, number, number, number] = [0.34, 1.02, 0.64, 1];

export default function TechnologyEcosystemVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="mt-14 border-y border-on-inverse-border py-8">
        <div className="mb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wide text-accent">
            How the pieces connect
          </span>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-on-inverse-muted">
            The platform is one stage in the work, not the whole of it.
          </p>
        </div>

        {/* Desktop (lg+, 1024px+): horizontal flow. Mobile/tablet below that: vertical
            stack — 768px doesn't have room for 5 cards + connectors in a row without
            cramping the text, so it gets the same clean stacked treatment as mobile. */}
        <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-start lg:justify-center lg:gap-1">
          {/* Stage 1 — Business need */}
          <EcosystemStage stage={stages[0]} inView={inView} delay={delayAt(0)} />
          <Connector inView={inView} delay={delayAt(1)} />

          {/* Stage 2 — Platform implementation (branches into 3 real platforms) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ ...NODE_SPRING, delay: delayAt(2) }}
            className="flex w-full shrink-0 flex-col items-center rounded-xl border border-accent/40 bg-gradient-to-br from-accent/15 to-primary/10 px-4 py-4 text-center lg:w-[150px] xl:w-[168px]"
          >
            <Layers size={18} className="mb-2 text-accent" />
            <div className="text-xs font-bold text-on-inverse">Platform implementation</div>
            <div className="mt-3 flex w-full flex-col gap-1.5">
              {platformNodes.map((p) => (
                <span
                  key={p.name}
                  className="flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-white px-2 py-2"
                >
                  <Image src={p.logo} alt="" aria-hidden="true" style={{ height: 16, width: "auto" }} />
                  <span className="whitespace-nowrap text-[10px] font-semibold text-ink-soft">{p.label}</span>
                </span>
              ))}
            </div>
          </motion.div>
          <Connector inView={inView} delay={delayAt(3)} />

          {/* Stage 3 — Integration & automation */}
          <EcosystemStage stage={stages[2]} inView={inView} delay={delayAt(4)} />
          <Connector inView={inView} delay={delayAt(5)} />

          {/* Stage 4 — Custom development */}
          <EcosystemStage stage={stages[3]} inView={inView} delay={delayAt(6)} />
          <Connector inView={inView} delay={delayAt(7)} />

          {/* Stage 5 — Decisions & outcomes */}
          <EcosystemStage stage={stages[4]} inView={inView} delay={delayAt(8)} last />
        </div>
      </div>
    </MotionConfig>
  );
}

function EcosystemStage({
  stage,
  last = false,
  inView,
  delay,
}: {
  stage: { icon: typeof Target; label: string; detail: string | null };
  last?: boolean;
  inView: boolean;
  delay: number;
}) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...NODE_SPRING, delay }}
      className={`flex w-full shrink-0 flex-col items-center rounded-xl border px-4 py-4 text-center lg:w-[150px] xl:w-[168px] ${
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
    </motion.div>
  );
}

function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  // The line draws first (pathLength 0 -> 1), the arrowhead pops in as it finishes —
  // reinforcing "this stage's work flows into the next," not just "here's an arrow."
  const lineTransition = {
    pathLength: { duration: 0.3, ease: LINE_DRAW_EASE, delay },
    opacity: { duration: 0.12, delay },
  };
  const arrowTransition = { ...ARROWHEAD_SPRING, delay: delay + 0.24 };

  return (
    <div className="flex shrink-0 items-center justify-center py-1 sm:py-0">
      {/* Desktop / tablet: horizontal drawn line + arrowhead */}
      <div className="hidden items-center lg:flex">
        <svg width="22" height="12" viewBox="0 0 22 12" className="overflow-visible text-on-inverse-faint">
          <motion.path
            d="M1 6 H17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
            transition={lineTransition}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={arrowTransition}
          className="-ml-1.5"
        >
          <ArrowRight size={14} className="shrink-0 animate-flow-arrow text-on-inverse-faint" />
        </motion.div>
      </div>

      {/* Mobile: vertical drawn line + arrowhead */}
      <div className="flex flex-col items-center lg:hidden">
        <svg width="12" height="16" viewBox="0 0 12 16" className="overflow-visible text-on-inverse-faint">
          <motion.path
            d="M6 1 V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
            transition={lineTransition}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={arrowTransition}
          className="-mt-1.5"
        >
          <ArrowRight size={14} className="shrink-0 rotate-90 animate-flow-arrow text-on-inverse-faint" />
        </motion.div>
      </div>
    </div>
  );
}
