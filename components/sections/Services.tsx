import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformLogo from "@/components/PlatformLogo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { platforms, getServicesByPlatform } from "@/lib/services";

/**
 * Grouped by the real 4-platform structure (Zoho / Odoo / Microsoft 365 / Custom
 * Development) instead of a hand-picked 10-item subset. The previous version mixed
 * platforms inconsistently, included a service with no working link (Data Migration),
 * and pointed two different cards at the same URL (E-Commerce/Web Development) — sourcing
 * directly from lib/services.ts (the same data the Header mega-menu and /services page
 * already use) removes both bugs by construction rather than needing a separate fix. See
 * ai-optimization/reports/HOMEPAGE-CURRENT-STATE.md item 6.
 */
export default function Services() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <SectionHeading
            heading="Websites, systems, and everything in between"
            description="We design and build business websites, e-commerce and web apps, and implement ERP, CRM and AI across Zoho, Odoo, Microsoft 365 and custom development."
            align="center"
            size="lg"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, pi) => (
            <Reveal key={platform.slug} delay={pi * 80} className="card flex h-full flex-col p-5">
              <div className="flex items-center gap-3">
                <PlatformLogo platform={platform} size={36} iconSize={16} />
                <div className="text-base font-bold leading-snug text-ink">{platform.name}</div>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{platform.short}</p>

              <div className="mt-4 flex flex-1 flex-col gap-0.5 border-t border-border pt-3">
                {getServicesByPlatform(platform.slug).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group/item flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition-colors duration-200 hover:bg-surface-alt"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-chip text-primary transition-transform duration-300 group-hover/item:scale-110">
                      <ServiceIcon icon={service.icon} size={12} />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink-soft group-hover/item:text-ink">
                      {service.title}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/services"
                className="btn-text mt-4 inline-flex items-center text-[13px]"
              >
                Explore {platform.name} services
                <ArrowRight size={12} className="shrink-0" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
