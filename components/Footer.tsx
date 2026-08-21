import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import HoverGlow from "@/components/HoverGlow";
import { socialLinks } from "@/lib/social";
import Logo from "@/src/logo2.png";

const platformLinks = [
  { label: "Zoho", href: "/#tech-zoho" },
  { label: "Dynamics 365", href: "/#tech-dynamics" },
  { label: "Odoo", href: "/#tech-odoo" },
];

const industryLinks = [
  { label: "EV Manufacturing", href: "/services#ev-manufacturing" },
  { label: "Real Estate", href: "/services#real-estate" },
  { label: "Laptop Refurbishment", href: "/services#laptop-manufacturing-refurbishment" },
  { label: "Trading", href: "/services#trading-distribution" },
];

export default function Footer() {
  return (
    <HoverGlow as="footer" className="bg-ink-inverse px-4 pb-6 pt-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-8 border-b border-ink-inverse-alt pb-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Image src={Logo} alt="VectorWave Technologies" className="mb-3.5 h-25 w-auto" />
          <p className="max-w-[380px] text-sm leading-relaxed text-on-inverse-muted">
            A business transformation and enterprise technology company, with
            a dashboard and reporting practice backed by financial and data
            analysts. Zoho is our flagship platform; we also implement
            Dynamics 365, Odoo and custom technology.
          </p>
        </div>

        <div>
          <div className="mb-3 text-base font-bold text-on-inverse">Platforms</div>
          <ul className="space-y-2.5 text-sm text-on-inverse-muted">
            {platformLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-on-inverse"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-base font-bold text-on-inverse">Industries</div>
          <ul className="space-y-2.5 text-sm text-on-inverse-muted">
            {industryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-on-inverse"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-base font-bold text-on-inverse">Get in touch</div>
          <ul className="space-y-2.5 text-sm text-on-inverse-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              GOLDEN-I, Office No 1034-1035, 10th Floor, Tower 3, Plot No 11,
              Sector-Techzone IV, Greater Noida (West), Uttar Pradesh 201318,
              India
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:admin@vectorwavetechnologies.com"
                className="transition-colors duration-200 hover:text-on-inverse"
              >
                admin@vectorwavetechnologies.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href="tel:+918791810555"
                className="transition-colors duration-200 hover:text-on-inverse"
              >
                +91-8791810555
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 pt-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <span className="text-sm text-on-inverse-faint">
            © 2026 VectorWave Technologies. All rights reserved.
          </span>
          <span className="text-xs text-on-inverse-faint">
            Zoho Ecosystem · Microsoft Dynamics 365 · Odoo
          </span>
        </div>
        <div className="flex gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-on-inverse-border text-on-inverse-muted transition-colors duration-200 hover:border-primary hover:text-on-inverse"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </HoverGlow>
  );
}
