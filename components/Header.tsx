"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";
import Logo from "@/src/White Theme logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ServiceIcon from "@/components/ServiceIcon";
import PlatformLogo from "@/components/PlatformLogo";
import { platforms, getServicesByPlatform } from "@/lib/services";
import { socialLinks } from "@/lib/social";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const itemDotStyles = [
  "bg-rose-50 text-rose-600",
  "bg-emerald-50 text-emerald-600",
  "bg-blue-50 text-blue-600",
  "bg-violet-50 text-violet-600",
  "bg-amber-50 text-amber-600",
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [openPlatform, setOpenPlatform] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    // One consistent behavior sitewide (was `fixed` on the homepage only, `sticky`
    // everywhere else — a confirmed inconsistency, see
    // ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md). `sticky` is used everywhere
    // now, matching the majority of the site's prior behavior.
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-colors duration-300">
      <div className="hidden items-center justify-between bg-ink-inverse px-4 py-3 text-on-inverse-muted sm:px-6 lg:flex lg:px-10">
        <div className="flex items-center gap-6 text-[13px] font-semibold text-[#ffffff]">
          <a
            href="tel:+918791810555"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-accent"
          >
            <Phone size={15} />
            +91-8791810555
          </a>
          <a
            href="mailto:admin@vectorwavetechnologies.com"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-accent"
          >
            <Mail size={15} />
            admin@vectorwavetechnologies.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="transition-colors duration-200 hover:text-on-inverse"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="VectorWave Technologies"
            className="-my-6 h-23 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/services" && pathname.startsWith("/services"));

            if (link.href === "/services") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setServicesOpen(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setServicesOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setServicesOpen(false)}
                    className={`relative flex items-center gap-1 py-1 text-[13px] font-bold transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                      active
                        ? "text-primary after:w-full"
                        : "text-ink-soft hover:text-primary hover:after:w-full after:w-0"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </Link>

                  <div
                    className={`absolute left-1/2 top-full z-20 w-[880px] max-w-[92vw] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0,0.71,0.2,1.01)] ${
                      servicesOpen
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible translate-y-1 scale-[0.98] opacity-0"
                    }`}
                  >
                    <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
                      <div className="grid grid-cols-4 gap-6">
                        {platforms.map((platform, colIndex) => (
                          <div
                            key={platform.slug}
                            className={`transition-[opacity,transform] duration-300 ease-[cubic-bezier(0,0.71,0.2,1.01)] ${
                              servicesOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                            }`}
                            style={{ transitionDelay: "0ms" }}
                          >
                            <div
                              className={`mb-3 flex items-center gap-2 border-b border-border pb-3 transition-opacity duration-300 ${
                                servicesOpen ? "opacity-100" : "opacity-0"
                              }`}
                              style={{ transitionDelay: `${colIndex * 50}ms` }}
                            >
                              <PlatformLogo
                                platform={platform}
                                size={24}
                                iconSize={13}
                                fallbackBg="rounded-md bg-surface-chip text-primary"
                              />
                              <span className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                                {platform.name}
                              </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                              {getServicesByPlatform(platform.slug).map((service, i) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="group/item flex items-center gap-2.5 rounded-lg px-1.5 py-2 transition-colors duration-200 hover:bg-surface-alt"
                                >
                                  <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover/item:scale-110 ${itemDotStyles[i % itemDotStyles.length]}`}
                                  >
                                    <ServiceIcon icon={service.icon} size={13} />
                                  </div>
                                  <div className="text-xs font-bold leading-tight text-ink-soft group-hover/item:text-ink">
                                    {service.title}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-surface-alt px-4 py-3">
                        <span className="text-xs text-ink-muted">
                          Not sure what you need?
                        </span>
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="group/cta flex items-center gap-1 text-xs font-bold text-primary transition-colors duration-200"
                        >
                          Explore Capabilities
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[13px] font-bold transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                  active
                    ? "text-primary after:w-full"
                    : "text-ink-soft hover:text-primary hover:after:w-full after:w-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-alt text-ink">
            <LanguageSwitcher colorClassName="text-ink" />
          </span>
          <Link href="/contact" className="btn btn-primary btn--sm">
            Book a call
          </Link>
        </div>

        <button
          className="text-ink transition-colors duration-300 active:scale-90 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto border-t border-border bg-surface px-4 py-3">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href === "/services" && pathname.startsWith("/services"));

              if (link.href === "/services") {
                return (
                  <div key={link.href}>
                    <div
                      className={`flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-bold transition-colors duration-200 ${
                        active ? "bg-surface-chip text-primary" : "text-ink-soft"
                      }`}
                    >
                      <Link
                        href={link.href}
                        className="flex-1"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        aria-label="Toggle services submenu"
                        aria-expanded={servicesExpanded}
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className="p-1"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            servicesExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        servicesExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-2 flex flex-col gap-0.5 border-l border-border pl-3">
                          {platforms.map((platform) => {
                            const platformOpen = openPlatform === platform.slug;
                            return (
                              <div key={platform.slug}>
                                <button
                                  onClick={() =>
                                    setOpenPlatform(platformOpen ? null : platform.slug)
                                  }
                                  aria-expanded={platformOpen}
                                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-bold text-ink-muted transition-colors duration-200 hover:bg-surface-alt hover:text-ink"
                                >
                                  <span className="flex items-center gap-2">
                                    <PlatformLogo
                                      platform={platform}
                                      size={20}
                                      iconSize={12}
                                      fallbackBg="rounded-md bg-surface-chip text-primary"
                                    />
                                    {platform.name}
                                  </span>
                                  <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${
                                      platformOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                                <div
                                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                    platformOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <div className="ml-2 flex flex-col gap-0.5 border-l border-border pl-3">
                                      {getServicesByPlatform(platform.slug).map((service) => (
                                        <Link
                                          key={service.slug}
                                          href={`/services/${service.slug}`}
                                          className="rounded-md px-2 py-2 text-[11.5px] font-semibold text-ink-faint transition-colors duration-200 hover:bg-surface-alt hover:text-ink"
                                          onClick={() => setOpen(false)}
                                        >
                                          {service.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-2.5 text-sm font-bold transition-colors duration-200 ${
                    active
                      ? "bg-surface-chip text-primary"
                      : "text-ink-soft hover:bg-surface-alt"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Phone/email were previously only in the desktop-only top bar (hidden
                below lg:) and never reachable from the mobile menu — a confirmed mobile
                UX gap (ai-optimization/reports/PRIORITY-MATRIX.md P2-8). */}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3 text-sm font-semibold text-ink-soft">
              <a
                href="tel:+918791810555"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-primary"
              >
                <Phone size={15} />
                +91-8791810555
              </a>
              <a
                href="mailto:admin@vectorwavetechnologies.com"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-primary"
              >
                <Mail size={15} />
                admin@vectorwavetechnologies.com
              </a>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm font-bold text-ink-soft">Language</span>
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="btn btn-primary btn--sm mt-2"
              onClick={() => setOpen(false)}
            >
              Book a call
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
