import Reveal from "@/components/Reveal";
import ProcessChainTabs from "./ProcessChainTabs";

/**
 * Server component — no "use client" here. The only genuinely interactive part of this
 * section (the process tab-switcher) lives in ProcessChainTabs.tsx; this static header
 * renders as plain server HTML instead of shipping as part of a client bundle.
 * See ai-optimization/reports/WORKSTREAM-01-RESULT.md for why this was split.
 */
export default function ProcessChains() {
  return (
    <section className="bg-surface-alt px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-chip px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
            How we think
          </span>
          <h2 className="mt-4 text-xl font-bold leading-snug text-ink sm:text-2xl">
            We don&apos;t start with software.
            <br />
            <span className="text-ink-muted">We start with how your business works.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
            Sales, finance, procurement, inventory, manufacturing and
            operations are connected business processes, not isolated
            software modules.
          </p>
        </Reveal>

        <ProcessChainTabs />
      </div>
    </section>
  );
}
