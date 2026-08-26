import Reveal from "@/components/Reveal";

/**
 * A schematic preview of what a configured dashboard looks like for this industry —
 * deliberately stylized rather than a screenshot, so it never reads as a real client's
 * actual system. Every number is sample data. See ai-optimization/BUSINESS_FACTS.md's
 * "Existing honest-labeling precedent" — this follows the same rule as the
 * "Illustrative Example Architecture" section it sits next to.
 */
export default function IllustrativeDashboardPreview({
  stats,
  pipeline,
}: {
  stats: { label: string; value: string }[];
  pipeline: { stage: string; count: number }[];
}) {
  const maxCount = Math.max(...pipeline.map((p) => p.count));

  return (
    <Reveal>
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-ink">Sample booking &amp; collections dashboard</span>
          <span className="rounded-full bg-surface-chip px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-primary">
            Illustrative — sample data
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-surface-alt px-4 py-3.5">
              <div className="text-xl font-bold text-ink sm:text-2xl">{stat.value}</div>
              <div className="mt-0.5 text-xs text-ink-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="mb-3 text-[10.5px] font-bold uppercase tracking-wide text-ink-faint">
            Pipeline (example)
          </div>
          <div className="flex flex-col gap-2">
            {pipeline.map((p) => (
              <div key={p.stage} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs font-bold text-ink-soft sm:w-32">{p.stage}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-alt">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max((p.count / maxCount) * 100, 6)}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-xs font-bold text-ink">{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
