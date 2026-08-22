"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

export default function HoverGlow({
  as = "div",
  children,
  className = "",
  clip = true,
}: {
  as?: "div" | "section" | "footer";
  children: ReactNode;
  className?: string;
  /** Clips the glow to the element's box (needed for rounded-corner cards, so the glow
   * doesn't visually poke past the rounded edges). Default true preserves existing
   * behavior everywhere. Pass false when nothing needs corner-clipping and something
   * inside needs `position: sticky` to work — `overflow` other than `visible` on any
   * ancestor breaks sticky, a well-documented CSS gotcha. */
  clip?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const Component = as;

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <Component
      ref={ref as never}
      onMouseMove={handleMove}
      className={`group relative ${clip ? "overflow-hidden" : ""} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(48,182,205,0.28), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </Component>
  );
}
