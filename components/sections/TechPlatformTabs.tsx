"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

const techPlatforms = [
  {
    id: "tech-zoho",
    name: "Zoho",
    badge: "Flagship",
    tagline: "Flagship ecosystem",
    coverage: ["ERP", "CRM", "Finance", "Inventory", "HR", "Analytics"],
    fit: "Best for teams that want one connected suite instead of stitching together point tools.",
    href: null,
  },
  {
    id: "tech-odoo",
    name: "Odoo",
    badge: null,
    tagline: "Flexible modular ERP",
    coverage: ["Sales", "Inventory", "Manufacturing", "Accounting"],
    fit: "Best for growing businesses that want an affordable, modular open-source ERP.",
    href: "/services",
  },
  {
    id: "tech-dynamics",
    name: "Microsoft Dynamics 365",
    badge: null,
    tagline: "Enterprise business applications",
    coverage: ["Finance", "Supply Chain", "Sales", "Customer Service"],
    fit: "Best for larger enterprises already invested in the Microsoft ecosystem.",
    href: "/services",
  },
  {
    id: "tech-ai",
    name: "AI & Custom Technology",
    badge: null,
    tagline: "Agents · Automation · Web · Mobile · APIs",
    coverage: ["Custom agents", "Workflow automation", "Web & mobile apps", "API integrations"],
    fit: "Best for businesses that need something no off-the-shelf platform covers.",
    href: "/services",
  },
];

/**
 * The interactive platform tab-switcher half of the "Technology & Industry" section
 * (components/sections/TechnologyAndIndustry.tsx). Split out so the section's large
 * static content (ecosystem marquee, visibility questions, etc.) doesn't need to ship
 * as client JS just because this widget needs `useState`. See
 * ai-optimization/reports/WORKSTREAM-01-RESULT.md.
 *
 * Each row expands in place on hover/click/focus rather than driving a separate sticky
 * detail panel above the list — the content shows up exactly where the interaction
 * happened. Uses the same grid-template-rows expand pattern as BusinessDiagnosis.tsx's
 * accordion.
 */
export default function TechPlatformTabs() {
  const [activeTech, setActiveTech] = useState(0);

  return (
    <div>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-on-inverse-border bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
          Technology
        </span>
        <h2 className="mt-4 text-xl font-bold leading-snug text-on-inverse sm:text-2xl">
          Technology should fit the business.
          <br />
          <span className="text-on-inverse-muted">Not the other way around.</span>
        </h2>
      </Reveal>

      <div role="tablist" aria-label="Technology platforms" className="mt-7 flex flex-col">
        {techPlatforms.map((t, i) => {
          const isActive = i === activeTech;
          return (
            <div key={t.id} className="border-t border-on-inverse-border last:border-b">
              <button
                id={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                onClick={() => setActiveTech(i)}
                onMouseEnter={() => setActiveTech(i)}
                onFocus={() => setActiveTech(i)}
                className="group block w-full scroll-mt-24 py-4 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-bold transition-colors duration-200 ${
                      isActive ? "text-on-inverse" : "text-on-inverse-muted group-hover:text-on-inverse"
                    }`}
                  >
                    {t.name}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`shrink-0 transition-all duration-300 ${
                      isActive ? "rotate-180 text-accent" : "text-on-inverse-faint"
                    }`}
                  />
                </div>
                <span className="text-xs text-on-inverse-muted">{t.tagline}</span>
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-5">
                    {t.badge && (
                      <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                        {t.badge}
                      </span>
                    )}

                    <div className={`flex flex-wrap gap-1.5 ${t.badge ? "mt-3" : ""}`}>
                      {t.coverage.map((c) => (
                        <span
                          key={c}
                          className="whitespace-nowrap rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold text-on-inverse"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-on-inverse-muted">{t.fit}</p>

                    {t.href && (
                      <Link
                        href={t.href}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                      >
                        View related services
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs italic leading-relaxed text-on-inverse-faint">
        We recommend the platform based on business requirements, not
        on which one we&apos;d rather sell.
      </p>
    </div>
  );
}
