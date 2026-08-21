"use client";

import Image from "next/image";
import { ArrowRight, Target, Layers, Bot, Code2, Database } from "lucide-react";
import { motion, MotionConfig, type Variants } from "motion/react";
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
 * Sequenced reveal (Iteration 002): each node/connector settles into place in reading
 * order via Motion's staggerChildren, spring-eased per motion.dev/ui's own UI defaults
 * (stiffness 305 / damping 33). MotionConfig reducedMotion="user" is required here —
 * unlike this codebase's CSS keyframe animations, Motion drives transforms outside the
 * stylesheet, so app/globals.css's prefers-reduced-motion media query does not reach it.
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

const sequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const nodeSpring: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 305, damping: 33 },
  },
};

const arrowSpring: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export default function TechnologyEcosystemVisual() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sequence}
        className="mt-14 border-y border-on-inverse-border py-8"
      >
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
          <EcosystemStage stage={stages[0]} />
          <Connector />

          {/* Stage 2 — Platform implementation (branches into 3 real platforms) */}
          <motion.div
            variants={nodeSpring}
            className="flex w-full shrink-0 flex-col items-center rounded-xl border border-accent/40 bg-gradient-to-br from-accent/15 to-primary/10 px-4 py-4 text-center sm:w-[168px]"
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
          </motion.div>
          <Connector />

          {/* Stage 3 — Integration & automation */}
          <EcosystemStage stage={stages[2]} />
          <Connector />

          {/* Stage 4 — Custom development */}
          <EcosystemStage stage={stages[3]} />
          <Connector />

          {/* Stage 5 — Decisions & outcomes */}
          <EcosystemStage stage={stages[4]} last />
        </div>
      </motion.div>
    </MotionConfig>
  );
}

function EcosystemStage({
  stage,
  last = false,
}: {
  stage: { icon: typeof Target; label: string; detail: string | null };
  last?: boolean;
}) {
  const Icon = stage.icon;
  return (
    <motion.div
      variants={nodeSpring}
      className={`flex w-full shrink-0 flex-col items-center rounded-xl border px-4 py-4 text-center sm:w-[168px] ${
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

function Connector() {
  return (
    <motion.div
      variants={arrowSpring}
      className="flex shrink-0 items-center justify-center py-1 sm:rotate-0 sm:py-0"
    >
      <ArrowRight
        size={16}
        className="hidden shrink-0 animate-flow-arrow text-on-inverse-faint sm:block"
      />
      <ArrowRight
        size={16}
        className="block shrink-0 rotate-90 animate-flow-arrow text-on-inverse-faint sm:hidden"
      />
    </motion.div>
  );
}
