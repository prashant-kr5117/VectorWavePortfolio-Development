import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared card primitive — replaces the ~14 near-identical inline card style blocks
 * found across 7 files in Stage 2 (ai-optimization/reports/PRIORITY-MATRIX.md P2-2).
 * Renders as a Link when `href` is given, a plain div otherwise. Visual styling comes
 * from the `.card`/`.card-interactive` classes in app/globals.css, so every card on the
 * site shares one definition of "what a card looks like."
 */
export function Card({
  href,
  children,
  className = "",
  padding = "md",
  interactive = true,
  id,
  align,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
  id?: string;
  align?: "center";
}) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6 sm:p-8",
  }[padding];

  const classes = `group flex h-full flex-col ${
    interactive ? "card-interactive" : "card"
  } ${paddingClasses} ${align === "center" ? "items-center text-center" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} id={id} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
}

/** The icon-badge slot repeated at the top of most cards. */
export function CardIcon({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "inverse";
}) {
  return (
    <div className={`card-icon mb-3 ${tone === "inverse" ? "card-icon--inverse" : ""}`}>
      {children}
    </div>
  );
}
