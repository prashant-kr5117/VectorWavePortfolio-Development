"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

const diagnostics = [
  {
    q: "Critical processes still run through Excel.",
    d: "No validated system of record for the process.",
    i: "Errors and rework compound as transaction volume grows.",
    s: "A purpose-built application replacing the spreadsheet.",
  },
  {
    q: "Sales, operations and finance see different numbers.",
    d: "No shared dashboard layer across departments.",
    i: "Decisions get delayed while teams reconcile whose number is right.",
    s: "A single reporting layer pulling from every connected system.",
  },
  {
    q: "Approvals depend on email and manual follow-ups.",
    d: "No defined workflow ownership.",
    i: "Approvals stall whenever the right person is unavailable.",
    s: "A structured approval workflow with clear accountability.",
  },
  {
    q: "Your systems don't talk to each other.",
    d: "No integration layer between existing tools.",
    i: "Staff re-enter the same data more than once, and it drifts out of sync.",
    s: "Connect what you already run, rather than replacing it.",
  },
  {
    q: "Management has data, but not enough visibility.",
    d: "Data exists, but no dashboard translates it into a decision.",
    i: "Leadership reacts to problems instead of anticipating them.",
    s: "Executive dashboards built on top of your existing transactions.",
  },
];

export default function BusinessDiagnosis() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-chip px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            Business diagnosis
          </span>
          <h2 className="mt-4 text-xl font-bold text-ink sm:text-2xl">
            Where business systems break down.
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {diagnostics.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 50} className="border-t border-border last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-ink sm:text-base"
                >
                  &ldquo;{item.q}&rdquo;
                  <Plus
                    size={16}
                    className={`shrink-0 text-ink-faint transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-6 pb-6 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                      <div>
                        <b className="mb-1 block text-xs font-bold uppercase tracking-wide text-primary">
                          Diagnosis
                        </b>
                        {item.d}
                      </div>
                      <div>
                        <b className="mb-1 block text-xs font-bold uppercase tracking-wide text-primary">
                          Business impact
                        </b>
                        {item.i}
                      </div>
                      <div>
                        <b className="mb-1 block text-xs font-bold uppercase tracking-wide text-primary">
                          Possible system response
                        </b>
                        {item.s}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
