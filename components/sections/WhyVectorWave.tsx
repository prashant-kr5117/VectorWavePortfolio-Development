import Reveal from "@/components/Reveal";

const items = [
  {
    n: "01",
    title: "We understand the transaction.",
    chain: ["Lead", "Order", "Inventory", "Invoice", "Payment", "GL"],
  },
  {
    n: "02",
    title: "We understand the operating model.",
    chain: ["Sales", "Procurement", "Warehouse", "Finance"],
    sep: "↔",
  },
  {
    n: "03",
    title: "We understand the management layer.",
    chain: ["Transactions", "Data", "KPIs", "Dashboard", "Decision"],
    note: "Dashboards are designed around the financial and operational questions management needs answered, built with a team that includes financial and data analysts.",
  },
  {
    n: "04",
    title: "We don't lock you into one platform.",
    chain: ["Zoho", "Odoo", "Dynamics 365", "Custom Technology"],
    sep: "|",
  },
];

export default function WhyVectorWave() {
  return (
    <section id="why" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
            Technology partners configure software.
            <br />
            <span className="text-ink-muted">We design business systems.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 70} className="border-t border-border pt-6">
              <div className="mb-2.5 text-xs font-bold text-primary">{item.n}</div>
              <h3 className="mb-4 text-base font-bold leading-snug text-ink">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-1.5">
                {item.chain.map((step, si) => (
                  <span key={step} className="flex items-center gap-1.5">
                    {si > 0 && (
                      <span className="text-xs text-ink-faint">{item.sep ?? "→"}</span>
                    )}
                    <span className="whitespace-nowrap rounded-md border border-border bg-surface-alt px-2.5 py-1 text-xs font-bold text-ink-soft">
                      {step}
                    </span>
                  </span>
                ))}
              </div>
              {item.note && (
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">{item.note}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
