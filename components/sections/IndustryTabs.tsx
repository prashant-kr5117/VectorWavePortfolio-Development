"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { industries } from "@/lib/industries";

/**
 * The interactive industry tab-switcher half of the "Technology & Industry" section
 * (components/sections/TechnologyAndIndustry.tsx). Split out for the same reason as
 * TechPlatformTabs.tsx — see ai-optimization/reports/WORKSTREAM-01-RESULT.md.
 */
export default function IndustryTabs() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const active = industries[activeIndustry];

  return (
    <Reveal delay={100}>
      <span className="inline-flex items-center gap-2 rounded-full border border-on-inverse-border bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
        Industry experience
      </span>
      <h2 className="mt-4 text-xl font-bold leading-snug text-on-inverse sm:text-2xl">
        Different industries.
        <br />
        <span className="text-on-inverse-muted">Different processes.</span>
      </h2>

      <div role="tablist" aria-label="Industries" className="mt-6 flex flex-col">
        {industries.map((ind, i) => {
          const isActive = i === activeIndustry;
          return (
            <button
              key={ind.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndustry(i)}
              onMouseEnter={() => setActiveIndustry(i)}
              onFocus={() => setActiveIndustry(i)}
              className={`flex items-center gap-2.5 border-t border-on-inverse-border py-3 text-left text-[13.5px] font-bold transition-colors duration-200 last:border-b ${
                isActive ? "text-on-inverse" : "text-on-inverse-muted hover:text-on-inverse"
              }`}
            >
              <ind.icon size={14} className={isActive ? "text-accent" : "text-on-inverse-faint"} />
              {ind.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-on-inverse-border bg-white/5 p-5">
        <div key={activeIndustry} className="animate-[fade-in-up_0.4s_ease-out_backwards]">
          <p className="text-sm leading-relaxed text-on-inverse">{active.model}</p>

          <div className="mt-4 text-[10.5px] font-bold uppercase tracking-wide text-accent">
            Key processes
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-on-inverse-muted">
            {active.caps.join(" · ")}
          </p>

          <div className="mt-4 text-[10.5px] font-bold uppercase tracking-wide text-accent">
            Management visibility
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-on-inverse-muted">
            {active.visibility}
          </p>

          {active.flow && (
            <>
              <div className="mt-4 text-[10.5px] font-bold uppercase tracking-wide text-accent">
                Signature process
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                {active.flow.map((step, si) => (
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
        </div>
      </div>
    </Reveal>
  );
}
