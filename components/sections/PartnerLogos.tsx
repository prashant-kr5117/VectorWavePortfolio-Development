import Image from "next/image";
import Reveal from "@/components/Reveal";
import ZohoLogo from "@/src/zoho logo.webp";
import OdooLogo from "@/src/odoo.gif";
import MicrosoftDynamics365Logo from "@/src/Microsoft_Dynamics_365_Logo.svg";
import NetSuiteLogo from "@/src/NetSuite_idNc45xmoe_0.svg";
import TallyLogo from "@/src/tally.svg";

/**
 * NetSuite and Tally are shown here as a deliberate visual/decorative choice, not as a
 * claim that VectorWave implements them as services — neither has a service page or any
 * supporting capability content on the site (see ai-optimization/reports/TRUST-FACT-AUDIT.md
 * for why they were originally removed). Tally is specifically what the Maxvill case study
 * migrated FROM, not a current offering. Human decision, not an AI-inferred one.
 */
const partners = [
  { src: ZohoLogo, alt: "Zoho" },
  { src: OdooLogo, alt: "Odoo", sizeClassName: "h-9 sm:h-11" },
  { src: MicrosoftDynamics365Logo, alt: "Microsoft Dynamics 365" },
  { src: NetSuiteLogo, alt: "NetSuite", sizeClassName: "h-4 sm:h-5" },
  { src: TallyLogo, alt: "Tally" },
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
            className={`w-auto shrink-0 object-contain ${partner.sizeClassName ?? "h-7 sm:h-8"}`}
          />
        ))}
      </div>
    </section>
  );
}
