"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * Same accordion pattern as components/sections/BusinessDiagnosis.tsx (grid-rows
 * transition + rotating Plus icon), reused here for a simple Q&A instead of the
 * 3-part diagnosis/impact/response layout.
 */
export default function IndustryFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 50} className="border-t border-border last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold text-ink sm:text-base"
            >
              {item.q}
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
                <p className="pb-6 text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
