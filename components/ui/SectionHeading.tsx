import type { ReactNode } from "react";

/**
 * Shared "eyebrow + heading + description" pattern repeated (with minor variations)
 * across nearly every section on the site. `tone="inverse"` matches the styling used on
 * dark panels (Footer/CTA/Hero-adjacent sections); `tone="light"` matches the default
 * light-surface sections.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  size = "default",
}: {
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  tone?: "light" | "inverse";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "default" | "lg";
}) {
  const alignClass = align === "center" ? "text-center" : "";
  const headingTone = tone === "inverse" ? "text-on-inverse" : "text-ink";
  const descriptionTone = tone === "inverse" ? "text-on-inverse-muted" : "text-ink-muted";
  const large = size === "lg";

  return (
    <div className={alignClass}>
      {eyebrow && (
        <span
          className={`section-eyebrow ${
            tone === "inverse" ? "section-eyebrow--inverse" : "section-eyebrow--light"
          } ${large ? "text-xs" : ""}`}
        >
          {eyebrow}
        </span>
      )}
      <Heading className={`section-heading mt-4 ${headingTone}`}>{heading}</Heading>
      {description && (
        <p className={`section-description ${descriptionTone} ${
            large ? `mt-2 max-w-3xl text-[15px] leading-relaxed ${align === "center" ? "mx-auto" : ""}` : ""
          }`}>{description}</p>
      )}
    </div>
  );
}
