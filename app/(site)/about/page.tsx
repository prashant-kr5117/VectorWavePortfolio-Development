import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import Typewriter from "@/components/Typewriter";
import PartnerLogos from "@/components/sections/PartnerLogos";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import TeamImage from "@/src/TeamImage.jpeg";
import { platforms, serviceCategories } from "@/lib/services";
import { industries } from "@/lib/industries";
import {
  Boxes,
  Code2,
  Headset,
  Calculator,
  Users,
  GraduationCap,
  Briefcase,
  Cpu,
  Truck,
  CheckCircle2,
  Layers,
  Scale,
  BrainCircuit,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About VectorWave Technologies",
  description:
    "Meet the VectorWave team: Zoho consultants, CRM specialists, finance pros, web developers, and AI engineers helping businesses bring sales, finance, HR, and operations together in one system.",
  path: "/about",
});

const whatWeDo = [
  { icon: Boxes, label: "Zoho Services" },
  { icon: Code2, label: "Website Development" },
  { icon: Headset, label: "IT Solutions" },
  { icon: Calculator, label: "Finance Services" },
  { icon: Users, label: "Human Resources" },
  { icon: GraduationCap, label: "Tech Support & Trainings" },
];

const leadership: {
  icon: typeof Briefcase;
  role: string;
  desc: string;
}[] = [
  {
    icon: Briefcase,
    role: "Chief Executive Officer",
    desc: "A strategic ERP transformation leader with extensive experience in enterprise systems and digital change. Leads VectorWave with a clear focus on structured growth, operational clarity, and financial governance.",
  },
  {
    icon: Cpu,
    role: "Head of ERP Development",
    desc: "An enterprise systems architect who leads our technical team, specialising in Zoho architecture, system integrations, automation, and scalable ERP design.",
  },
  {
    icon: Calculator,
    role: "Finance Advisory Lead",
    desc: "Makes sure your chart of accounts is structured correctly, your reports are accurate, and your system holds up during audits and compliance reviews.",
  },
  {
    icon: Truck,
    role: "Supply Chain & Operations Lead",
    desc: "Handles the practical side of ERP: inventory management, procurement workflows, warehouse structure, and fulfilment logic that reflects how your business actually runs.",
  },
];

const departments = [
  {
    icon: Layers,
    title: "Zoho Consultants & Implementation Experts",
    desc: "Our Zoho Consulting Team has extensive experience implementing and customizing the complete Zoho ecosystem: CRM, Books, Zoho One deployment, workflow automation, and advanced integrations. From requirement gathering and solution architecture to data migration and optimization, the team ensures structured and seamless Zoho implementation.",
  },
  {
    icon: Users,
    title: "CRM Consulting & Business Automation Specialists",
    desc: "The CRM Implementation Team builds CRM systems that are structured, scalable, and fully customised around how the business actually operates, with customer data centralised and workflows running automatically. The team specialises in Zoho CRM implementation, lead management, sales automation, and reporting dashboards.",
  },
  {
    icon: Scale,
    title: "Finance & Compliance Team",
    desc: "Qualified accounting and taxation professionals with strong expertise in corporate finance, GST compliance, payroll management, statutory reporting, and financial planning, keeping your finances accurate and operations transparent.",
  },
  {
    icon: Code2,
    title: "Web Development Team",
    desc: "Builds digital platforms that are fast, responsive, and built to perform: custom websites, business web applications, portal systems, and SEO-optimised architecture, with a focus on clean code, mobile responsiveness, and seamless integration with CRM and business systems.",
  },
  {
    icon: BrainCircuit,
    title: "AI Team",
    desc: "Builds intelligent, data-driven systems that help businesses work smarter: AI, machine learning, automation, and predictive analytics that optimise workflows and support better decision-making, integrated directly into CRM and finance platforms.",
  },
];

const process = [
  { n: "01", title: "Discover & Define", desc: "Every project starts with a conversation. Goals, challenges, and opportunities are mapped out clearly." },
  { n: "02", title: "Plan with Purpose", desc: "A clear roadmap built around your business with realistic timelines and the right tools." },
  { n: "03", title: "Design for Impact", desc: "Crafting intuitive, user-focused designs that align with your brand and business needs." },
  { n: "04", title: "Build & Integrate", desc: "Solid builds, smooth integrations, and architecture that holds up as business scales." },
  { n: "05", title: "Test & Optimise", desc: "Before anything goes live, it's tested thoroughly for quality, security, and efficiency." },
  { n: "06", title: "Launch & Support", desc: "The launch is managed carefully, with ongoing support, monitoring, and improvements after." },
];

const whyChooseUs = [
  "Clean, Purposeful Design",
  "24x7 Live Support",
  "Result Oriented Projects",
  "Dedicated, Hands-On Support",
  "ROI-Focused Delivery",
  "Experienced Professionals",
];

/**
 * Every value here is a structural fact derived from the same source data the
 * homepage Hero uses (components/sections/Hero.tsx), not a marketing claim — same
 * pattern, same reasoning: a code-derived count can't drift out of sync or need a
 * source no one can point to. "10 Satisfied Clients", "4 Accolades Earned", and
 * "56K+ Lines of Code" were removed — none had a source anywhere in the codebase
 * (ai-optimization/reports/TRUST-FACT-AUDIT.md). "15 Projects Completed" is kept:
 * it's the same human-verified figure as the Hero's "15+ Projects delivered".
 */
const stats = [
  { value: "15", label: "Projects Completed" },
  { value: String(platforms.length), label: "Technology Platforms" },
  { value: String(industries.length), label: "Industries Served" },
  { value: String(serviceCategories.length), label: "Services Offered" },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: "About Us | VectorWave Technologies",
      description:
        "Learn about VectorWave Technologies and our approach to ERP implementation, CRM automation, digital solutions and business transformation.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    breadcrumbSchema(`${SITE_URL}/about#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "About Us", item: `${SITE_URL}/about` },
    ]),
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-14 text-center sm:px-6 sm:py-16">
          <Image
            src={TeamImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-inverse via-ink-inverse/75 to-ink-inverse/45" />
          <Reveal className="relative">
            <span className="section-eyebrow section-eyebrow--light">About Us</span>
            <h1 className="mx-auto mt-5 min-h-[68px] max-w-2xl text-[26px] font-bold leading-tight text-on-inverse sm:min-h-[80px] sm:text-3xl">
              <Typewriter text="Engineering ERP systems that drive business performance" speed={70} />
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-on-inverse-muted sm:text-base">
              We specialize in ERP implementation and CRM automation, with deep
              hands-on expertise in Zoho and Odoo, helping growing businesses
              bring sales, finance, HR, and operations together into one system.
            </p>
          </Reveal>
        </section>

        <PartnerLogos />

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
            <Reveal>
              <h2 className="text-lg font-bold text-ink">Who are we</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                We are a technology-driven solutions partner delivering
                innovative digital services, Zoho expertise, and reliable IT
                support, helping businesses streamline operations, scale
                efficiently, and achieve sustainable growth through smart,
                future-ready solutions.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-lg font-bold text-ink">Our mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Technology should make your business simpler, not more
                complicated. Our mission is to help growing businesses get the
                right systems in place, set up properly, used confidently, and
                built to grow with you.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <SectionHeading heading="What we Provide" align="center" />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {whatWeDo.map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <Card align="center">
                    <CardIcon>
                      <item.icon size={20} />
                    </CardIcon>
                    <span className="text-sm font-bold text-ink">{item.label}</span>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
            <Reveal>
              <h2 className="text-lg font-bold text-ink">Our position</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Many businesses invest in ERP software but fail to realize its
                full potential because it isn&apos;t tailored to their specific
                operations. We view ERP differently: it&apos;s the foundation of
                your business, connecting departments, ensuring data accuracy,
                and providing a comprehensive overview of company activities.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-lg font-bold text-ink">Why it matters</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                A well implemented ERP system enables smarter decision making,
                improves efficiency, reduces operational risk, and provides the
                visibility required to scale confidently in a competitive
                environment.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8">
              <SectionHeading
                heading="Meet the team"
                description="Behind every solution we deliver is a group of people who genuinely care about getting it right."
                align="center"
              />
            </Reveal>
            <Reveal className="mb-4 text-xs font-bold uppercase tracking-wide text-ink-faint">
              Leadership
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {leadership.map((person, i) => (
                <Reveal key={person.role} delay={i * 60}>
                  <Card>
                    <CardIcon>
                      <person.icon size={20} />
                    </CardIcon>
                    <div className="mb-1 text-sm font-bold text-ink">{person.role}</div>
                    <p className="text-xs leading-relaxed text-ink-muted">
                      {person.desc}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <Reveal className="mb-4 mt-10 text-xs font-bold uppercase tracking-wide text-ink-faint">
              Departments
            </Reveal>
            <div className="flex flex-col gap-4">
              {departments.map((dept, i) => (
                <Reveal key={dept.title} delay={i * 60}>
                  <Card className="gap-4 sm:flex-row sm:items-start" padding="lg">
                    <CardIcon tone="inverse">
                      <dept.icon size={20} />
                    </CardIcon>
                    <div>
                      <div className="mb-2 text-sm font-bold text-ink sm:text-base">
                        {dept.title}
                      </div>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {dept.desc}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <SectionHeading heading="Our 6-D process" align="center" />
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((step, i) => (
                <Reveal key={step.n} delay={i * 60}>
                  <Card>
                    <div className="mb-2 text-xs font-bold text-primary">{step.n}</div>
                    <div className="mb-1 text-sm font-bold text-ink">{step.title}</div>
                    <p className="text-xs leading-relaxed text-ink-muted">{step.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <HoverGlow as="section" className="bg-ink-inverse px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <SectionHeading
                heading="Why choose us"
                description="Intelligent, dependable, and scalable solutions that enhance operational efficiency and foster sustainable growth."
                tone="inverse"
                align="center"
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item, i) => (
                <Reveal key={item} delay={i * 50}>
                  <div className="flex items-center gap-3 rounded-lg border border-ink-inverse-alt px-4 py-3 transition-colors duration-200 hover:border-primary">
                    <CheckCircle2 size={18} className="shrink-0 text-primary" />
                    <span className="text-sm font-bold text-on-inverse">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-inverse-alt pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-on-inverse">{s.value}</div>
                  <div className="mt-1 text-xs text-on-inverse-muted">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </HoverGlow>

        <CTA />
      </main>
    </>
  );
}
