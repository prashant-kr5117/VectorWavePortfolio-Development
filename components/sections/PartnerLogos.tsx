import Image from "next/image";
import Reveal from "@/components/Reveal";
import ZohoLogo from "@/src/zoho logo.webp";
import OdooLogo from "@/src/odoo_logo.png";
import MicrosoftDynamics365Logo from "@/src/Microsoft_Dynamics_365_Logo.svg";

/**
 * Only the 3 platforms VectorWave actually implements (ai-optimization/BUSINESS_FACTS.md)
 * appear here. Shopify/React/NetSuite/Tally were removed — none is a verified VectorWave
 * platform capability (React is a build tool, not a platform partnership; Tally is what
 * the Maxvill case study migrated FROM, not a current offering; Shopify/NetSuite have no
 * supporting service content anywhere on the site). See
 * ai-optimization/reports/TRUST-FACT-AUDIT.md.
 */
const partners = [
  { src: ZohoLogo, alt: "Zoho" },
  { src: OdooLogo, alt: "Odoo" },
  { src: MicrosoftDynamics365Logo, alt: "Microsoft Dynamics 365" },
];
const partnersLoop = [...partners, ...partners];

export default function PartnerLogos({ reverse = false }: { reverse?: boolean }) {
  return (
    <section className="group relative overflow-hidden border-b border-border py-8">
      <Reveal className="mb-5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">
          Platforms we implement
        </span>
      </Reveal>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent sm:w-24" />

      <div
        className={`flex w-max items-center gap-14 sm:gap-20 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {partnersLoop.map((partner, i) => (
          <Image
            key={`${partner.alt}-${i}`}
            src={partner.src}
            alt={partner.alt}
            className="h-7 w-auto shrink-0 object-contain sm:h-8"
          />
        ))}
      </div>
    </section>
  );
}
