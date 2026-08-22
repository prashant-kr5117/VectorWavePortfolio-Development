import Image from "next/image";
import Reveal from "@/components/Reveal";
import ZohoLogo from "@/src/zoho.png";
import OdooLogo from "@/src/odoo_logo.png";
import MicrosoftDynamics365Logo from "@/src/Microsoft_Dynamics_365_Logo.svg";

/**
 * Only the 3 platforms VectorWave actually implements (ai-optimization/BUSINESS_FACTS.md)
 * appear here. Shopify/React/NetSuite/Tally were removed — none is a verified VectorWave
 * platform capability (React is a build tool, not a platform partnership; Tally is what
 * the Maxvill case study migrated FROM, not a current offering; Shopify/NetSuite have no
 * supporting service content anywhere on the site). See
 * ai-optimization/reports/TRUST-FACT-AUDIT.md.
 *
 * Rendered as a static row, not a marquee: a continuous auto-scroll loop existed to fit
 * 7 logos that overflowed the viewport — 3 logos fit in one row with room to spare, so
 * the scroll motion no longer solves a layout problem and was removed rather than kept
 * as unexplained decoration (ai-optimization/MOTION_GUIDELINES.md).
 */
const partners = [
  { src: ZohoLogo, alt: "Zoho" },
  { src: OdooLogo, alt: "Odoo" },
  { src: MicrosoftDynamics365Logo, alt: "Microsoft Dynamics 365" },
];

export default function PartnerLogos() {
  return (
    <section className="border-b border-border py-8">
      <Reveal className="mb-5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">
          Platforms we implement
        </span>
      </Reveal>

      <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4 px-4 sm:gap-x-20">
        {partners.map((partner) => (
          <Image
            key={partner.alt}
            src={partner.src}
            alt={partner.alt}
            className="h-7 w-auto shrink-0 object-contain sm:h-8"
          />
        ))}
      </div>
    </section>
  );
}
