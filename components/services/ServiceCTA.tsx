import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import BookConsultationButton from "@/components/BookConsultationButton";
import type { PlatformSlug } from "@/lib/services";
import { getPlatformProfile } from "@/lib/services";

/**
 * Contextual, per-platform CTA for service detail pages — replaces the generic sitewide
 * <CTA /> ("Would you like to start a project with us?") that every service page
 * previously repeated identically. Still uses the single BookConsultationButton
 * mechanism (no second "Book a call" implementation), per
 * ai-optimization/BRAND_GUIDELINES.md's CTA philosophy. See
 * ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 13.
 */
export default function ServiceCTA({
  platform,
  serviceTitle,
}: {
  platform: PlatformSlug;
  serviceTitle: string;
}) {
  const profile = getPlatformProfile(platform);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Reveal>
        <HoverGlow className="rounded-2xl border border-border bg-ink-inverse px-6 py-14 text-center transition-all duration-300 hover:border-accent/50 sm:px-10">
          <h2 className="text-lg font-bold text-on-inverse sm:text-xl">{profile.ctaLabel}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-on-inverse-muted">
            {`Tell us about your ${serviceTitle.toLowerCase()} requirements and we'll map out how it fits with what you already run.`}
          </p>
          <BookConsultationButton className="btn btn-primary btn--md mt-5">
            {profile.ctaLabel}
          </BookConsultationButton>
        </HoverGlow>
      </Reveal>
    </section>
  );
}
