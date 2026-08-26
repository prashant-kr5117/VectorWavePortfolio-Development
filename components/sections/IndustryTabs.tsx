"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { industries } from "@/lib/industries";

/**
 * The interactive industry tab-switcher half of the "Technology & Industry" section
 * (components/sections/TechnologyAndIndustry.tsx). Split out for the same reason as
 * TechPlatformTabs.tsx — see ai-optimization/reports/WORKSTREAM-01-RESULT.md.
 *
 * Each row expands in place on hover/click/focus rather than driving a separate detail
 * panel elsewhere on the page — the content shows up exactly where the interaction
 * happened. Uses the same grid-template-rows expand pattern as BusinessDiagnosis.tsx's
 * accordion.
 */
export default function IndustryTabs() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <div>
      <Reveal delay={100}>
        <span className="inline-flex items-center gap-2 rounded-full border border-on-inverse-border bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
          Industry experience
        </span>
        <h2 className="mt-4 text-xl font-bold leading-snug text-on-inverse sm:text-2xl">
          Different industries.
          <br />
          <span className="text-on-inverse-muted">Different processes.</span>
        </h2>
      </Reveal>

      <div role="tablist" aria-label="Industries" className="mt-7 flex flex-col">
        {industries.map((ind, i) => {
          const isActive = i === activeIndustry;
          return (
            <div key={ind.slug} className="border-t border-on-inverse-border last:border-b">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                onClick={() => setActiveIndustry((cur) => (cur === i ? -1 : i))}
                onMouseEnter={() => setActiveIndustry(i)}
                onFocus={() => setActiveIndustry(i)}
                className="flex w-full items-center justify-between gap-2.5 py-3.5 text-left"
              >
                <span className="flex items-center gap-2.5">
                  <ind.icon size={14} className={isActive ? "text-accent" : "text-on-inverse-faint"} />
                  <span
                    className={`text-[13.5px] font-bold transition-colors duration-200 ${
                      isActive ? "text-on-inverse" : "text-on-inverse-muted"
                    }`}
                  >
                    {ind.title}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-all duration-300 ${
                    isActive ? "rotate-180 text-accent" : "text-on-inverse-faint"
                  }`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-5 pl-[26px]">
                    <p className="text-sm leading-relaxed text-on-inverse">{ind.model}</p>

                    <div className="mt-3.5 text-[10.5px] font-bold uppercase tracking-wide text-accent">
                      Key processes
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-on-inverse-muted">
                      {ind.caps.join(" · ")}
                    </p>

                    <div className="mt-3.5 text-[10.5px] font-bold uppercase tracking-wide text-accent">
                      Management visibility
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-on-inverse-muted">
                      {ind.visibility}
                    </p>

                    {ind.flow && (
                      <>
                        <div className="mt-3.5 text-[10.5px] font-bold uppercase tracking-wide text-accent">
                          Signature process
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                          {ind.flow.map((step, si) => (
                            <span key={step} className="flex items-center gap-1.5">
                              {si > 0 && <ArrowRight size={10} className="shrink-0 text-on-inverse-faint" />}
                              <span className="whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-[11px] font-bold text-on-inverse">
                                {step}
                              </span>
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group/link mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent"
                    >
                      Explore {ind.title} solutions
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
