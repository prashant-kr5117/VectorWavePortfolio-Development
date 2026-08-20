import Image from "next/image";
import {
  Boxes,
  Users,
  Headset,
  Calculator,
  UserCog,
  Database,
  ShoppingCart,
  Bot,
  Smartphone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Card, CardIcon } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import WebCodingImage from "@/src/Web Coding.png";

const services = [
  {
    icon: Boxes,
    title: "Zoho Bundle Suite",
    desc: "CRM, Finance, HR and Analytics set up as one suite.",
    slug: "zoho-bundled-suite",
  },
  {
    icon: Users,
    title: "Zoho Sales",
    desc: "Pipeline automation, lead capture and reporting.",
    slug: "sales",
  },
  {
    icon: Headset,
    title: "IT & Support",
    desc: "Infrastructure, helpdesk and reliable uptime.",
    slug: "it-support",
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    desc: "Invoicing, expenses, compliance and reporting.",
    slug: "zoho-finance",
  },
  {
    icon: UserCog,
    title: "Human Resources",
    desc: "Recruitment, onboarding, attendance and payroll.",
    slug: "human-resources",
  },
  {
    icon: Database,
    title: "Data Migration",
    desc: "Secure, accurate transfers with minimal downtime.",
  },
  {
    logo: WebCodingImage,
    title: "Web Development",
    desc: "Fast, SEO-friendly websites that convert visitors.",
    slug: "web-development",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Secure online stores built to grow sales.",
    slug: "web-development",
  },
  {
    icon: Bot,
    title: "Artificial Intelligence",
    desc: "Automation that speeds up decisions and tasks.",
    slug: "ai-integration",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Android, iOS and cross-platform apps for your team.",
    slug: "mobile-app-development",
  },
];

export default function Services() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <SectionHeading
            heading="Services we provide"
            description="One connected system in place of scattered spreadsheets and tools."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <Card href={s.slug ? `/services/${s.slug}` : undefined}>
                {s.logo ? (
                  <div className="mb-3 h-12 w-12 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Image src={s.logo} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <CardIcon>
                    <s.icon size={18} />
                  </CardIcon>
                )}
                <div className="mb-1 text-sm font-bold text-ink">{s.title}</div>
                <p className="text-sm text-ink-muted">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
