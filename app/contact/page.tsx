import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Contact VectorWave Technologies | Get in Touch",
  description:
    "Reach our team via live chat, email, or phone - Monday to Friday, 9:30 AM to 6:30 PM IST for tailored digital solutions.",
  path: "/contact",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: "Contact VectorWave Technologies",
      description:
        "Get in touch with VectorWave Technologies for ERP, CRM, automation, custom development and digital transformation solutions.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    breadcrumbSchema(`${SITE_URL}/contact#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Contact", item: `${SITE_URL}/contact` },
    ]),
  ],
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    desc: "Speak to a representative from Monday to Friday, 9:30 AM - 6:30 PM (IST).",
    action: "Start chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us a message at admin@vectorwavetechnologies.com. We'll get back to you within 24 hours.",
    action: "Send email",
    href: "mailto:admin@vectorwavetechnologies.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Call us Monday to Friday, 9:30 AM - 6:30 PM IST to speak directly with our team.",
    action: "Call +91-8791810555",
    href: "tel:+918791810555",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <main className="flex-1">
        <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
          <Reveal>
            <span className="inline-block rounded-full bg-surface-chip px-4 py-1.5 text-[11px] font-bold text-primary">
              Contact us
            </span>
            <h1 className="mx-auto mt-5 max-w-xl text-[26px] font-bold leading-tight text-ink sm:text-3xl">
              Powering intelligent business flow
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
              Connect with our experts to get customized, high-impact digital
              solutions tailored to help your business scale efficiently.
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {contactMethods.map((m, i) => (
                <Reveal key={m.title} delay={i * 60}>
                  <div className="group h-full rounded-xl border border-border bg-surface p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-chip text-primary transition-transform duration-300 group-hover:scale-110">
                      <m.icon size={20} />
                    </div>
                    <div className="mb-1 text-sm font-bold text-ink">
                      {m.title}
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-ink-muted">
                      {m.desc}
                    </p>
                    <a
                      href={m.href ?? "#"}
                      className="text-xs font-bold text-primary transition-colors duration-200 hover:text-link-deep"
                    >
                      {m.action} &rarr;
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Reveal>
                <ContactForm />
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
                  <h2 className="mb-4 text-sm font-bold text-ink">
                    Our office location
                  </h2>
                  <div className="flex items-start gap-3 text-sm text-ink-muted">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span>
                      GOLDEN-I, Office No 1034-1035, 10th Floor, Tower 3, Plot
                      No 11, Sector-Techzone IV, Greater Noida (West), Uttar
                      Pradesh 201318, India
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm text-ink-muted">
                    <Mail size={18} className="shrink-0 text-primary" />
                    <a
                      href="mailto:admin@vectorwavetechnologies.com"
                      className="transition-colors duration-200 hover:text-primary"
                    >
                      admin@vectorwavetechnologies.com
                    </a>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm text-ink-muted">
                    <Phone size={18} className="shrink-0 text-primary" />
                    <a
                      href="tel:+918791810555"
                      className="transition-colors duration-200 hover:text-primary"
                    >
                      +91-8791810555
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
