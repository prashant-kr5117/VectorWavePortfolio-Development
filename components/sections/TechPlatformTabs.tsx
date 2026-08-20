"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
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
    id: "tech-dynamics",
    name: "Microsoft Dynamics 365",
    badge: null,
    tagline: "Enterprise business applications",
    coverage: ["Finance", "Supply Chain", "Sales", "Customer Service"],
    fit: "Best for larger enterprises already invested in the Microsoft ecosystem.",
    href: "/services",
  },
  {
    id: "tech-salesforce",
    name: "Salesforce",
    badge: null,
    tagline: "Enterprise CRM & customer experience",
    coverage: ["Sales Cloud", "Service Cloud", "Marketing Cloud"],
    fit: "Best for complex, high-volume sales organizations that need deep customization.",
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
 */
export default function TechPlatformTabs() {
  const [activeTech, setActiveTech] = useState(0);
  const activePlatform = techPlatforms[activeTech];

  return (
    <Reveal>
      <span className="inline-flex items-center gap-2 rounded-full border border-on-inverse-border bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
        Technology
      </span>
      <h2 className="mt-4 text-xl font-bold leading-snug text-on-inverse sm:text-2xl">
        Technology should fit the business.
        <br />
        <span className="text-on-inverse-muted">Not the other way around.</span>
      </h2>

      <div className="mt-7 rounded-xl border border-accent/40 bg-gradient-to-br from-accent/15 to-primary/10 p-6">
        <div key={activeTech} className="animate-[fade-in-up_0.4s_ease-out_backwards]">
          {activePlatform.badge && (
            <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-inverse">
              {activePlatform.badge}
            </span>
          )}
          <div className="mt-3 text-lg font-bold text-on-inverse">{activePlatform.name}</div>
          <p className="mt-1 text-sm text-on-inverse-muted">{activePlatform.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {activePlatform.coverage.map((c) => (
              <span
                key={c}
                className="whitespace-nowrap rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold text-on-inverse"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-on-inverse-muted">{activePlatform.fit}</p>

          {activePlatform.href && (
            <Link
              href={activePlatform.href}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              View related services
              <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>

      <div role="tablist" aria-label="Technology platforms" className="mt-2 flex flex-col">
        {techPlatforms.map((t, i) => {
          const isActive = i === activeTech;
          return (
            <button
              key={t.id}
              id={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTech(i)}
              onMouseEnter={() => setActiveTech(i)}
              onFocus={() => setActiveTech(i)}
              className="group block w-full scroll-mt-24 border-t border-on-inverse-border py-4 text-left last:border-b"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-bold transition-colors duration-200 ${
                    isActive ? "text-on-inverse" : "text-on-inverse-muted group-hover:text-on-inverse"
                  }`}
                >
                  {t.name}
                </span>
                <ChevronRight
                  size={15}
                  className={`shrink-0 transition-all duration-200 ${
                    isActive ? "translate-x-0.5 text-accent" : "text-on-inverse-faint"
                  }`}
                />
              </div>
              <span className="text-xs text-on-inverse-muted">{t.tagline}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-xs italic leading-relaxed text-on-inverse-faint">
        We recommend the platform based on business requirements, not
        on which one we&apos;d rather sell.
      </p>
    </Reveal>
  );
}
