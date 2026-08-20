"use client";

import { useState } from "react";
import { ArrowRight, ShoppingCart, ClipboardList, Warehouse, Factory } from "lucide-react";
import Reveal from "@/components/Reveal";

const processes = [
  {
    n: "01",
    icon: ShoppingCart,
    title: "Order to Cash",
    chain: ["Lead", "Opportunity", "Quote", "Sales Order", "Fulfillment", "Invoice", "Collection", "GL"],
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Procure to Pay",
    chain: ["Requirement", "Approval", "Purchase Order", "Receipt", "Vendor Bill", "Payment"],
  },
  {
    n: "03",
    icon: Warehouse,
    title: "Inventory",
    chain: ["Purchase", "Receipt", "Warehouse", "Movement", "Allocation", "Shipment", "Valuation"],
  },
  {
    n: "04",
    icon: Factory,
    title: "Manufacturing",
    chain: ["Demand", "Procurement", "Components", "Production", "Quality", "Finished Goods"],
  },
];

/**
 * The only interactive part of the "How we think" section (components/sections/ProcessChains.tsx).
 * Split out so the section's static header text doesn't need to ship as client JS just because
 * this tab-switcher needs `useState` — see ai-optimization/reports/WORKSTREAM-01-RESULT.md.
 */
export default function ProcessChainTabs() {
  const [active, setActive] = useState(0);
  const process = processes[active];

  return (
    <Reveal>
      <div role="tablist" aria-label="Business processes" className="flex flex-wrap gap-2">
        {processes.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.n}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 sm:px-4 sm:py-3 ${
                isActive
                  ? "border-primary bg-primary shadow-md shadow-primary/20"
                  : "border-border bg-surface hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                  isActive ? "bg-white/15 text-white" : "bg-surface-chip text-primary"
                }`}
              >
                <p.icon size={16} />
              </span>
              <span>
                <span
                  className={`block text-[10px] font-bold tracking-wide ${
                    isActive ? "text-white/70" : "text-primary"
                  }`}
                >
                  {p.n}
                </span>
                <span className={`block text-sm font-bold ${isActive ? "text-white" : "text-ink"}`}>
                  {p.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-5 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div key={active} className="flex flex-wrap items-center gap-y-3">
          {process.chain.map((step, si) => {
            const isLast = si === process.chain.length - 1;
            return (
              <div key={`${active}-${step}`} className="flex items-center">
                {si > 0 && (
                  <ArrowRight
                    size={15}
                    style={{ animationDelay: `${si * 90}ms` }}
                    className="mx-1.5 shrink-0 animate-flow-arrow text-ink-faint sm:mx-2"
                  />
                )}
                <div
                  style={{ animationDelay: `${si * 70}ms` }}
                  className={`animate-[fade-in-up_0.5s_ease-out_backwards] whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-bold transition-transform duration-300 hover:-translate-y-0.5 sm:px-3.5 sm:py-2.5 sm:text-sm ${
                    isLast
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                      : "border-border bg-surface-alt text-ink-soft"
                  }`}
                >
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
