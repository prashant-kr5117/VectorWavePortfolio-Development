import Reveal from "@/components/Reveal";
import { manrope } from "./fonts";

const items = [
  { title: "Business-First Design", desc: "Architecture before configuration, every time." },
  { title: "Finance + SCM + Development Expertise", desc: "One team spanning the disciplines that matter." },
  { title: "Industry-Specific Solutions", desc: "Pipelines and workflows shaped around your sector." },
  { title: "Native + API Integrations", desc: `Your business doesn't have to live inside Zoho alone.` },
  { title: "Tally → Zoho Books Migration", desc: "Planned, mapped and validated — not just imported." },
  { title: "Data + Dashboard-First Thinking", desc: "Management visibility designed in from day one." },
  { title: "Multidisciplinary Implementation Team", desc: "Finance, operations, data and development, together." },
  { title: "Zoho Ecosystem Expertise", desc: "We know when to use each application, and when not to." },
];

export function WhySection() {
  return (
    <section
      id="why"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      style={{ background: "linear-gradient(135deg,#0B0E12 0%,#102A43 100%)" }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className={`${manrope.className} text-[32px] font-bold text-white sm:text-[48px]`}>
            Why VectorWave?
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 40} className="border-t border-white/[0.14] pt-5">
              <div className="mb-2.5 text-xs font-extrabold text-[#72D5DF]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className={`${manrope.className} mb-2 text-[17px] font-extrabold text-[#F2F1EA]`}>
                {item.title}
              </h4>
              <p className="text-[13.5px] leading-[1.6] text-[#9AA0A6]">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DifferentiatorSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-10 lg:py-28"
      style={{ background: "linear-gradient(135deg,#0B0E12 0%,#102A43 100%)" }}
    >
      <Reveal className="mx-auto max-w-2xl">
        <h2 className={`${manrope.className} text-2xl font-bold leading-snug text-white sm:text-[32px]`}>
          We don&apos;t just build the system.
          <span className="block text-[#72D5DF]">We make sure the business can run on it.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-[#9AA0A6]">
          Finance. Operations. Supply Chain. Sales. Technology. Data. One
          team. One architecture. One connected business system.
        </p>
      </Reveal>
    </section>
  );
}

export function PlatformCredibilitySection() {
  return (
    <section className="bg-[#F5F4EF] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3.5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#59616B]">
          <span className="h-[5px] w-[5px] rounded-full bg-[#102A43]" />
          Platform Expertise
        </div>
        <h2 className={`${manrope.className} max-w-2xl text-2xl font-bold leading-tight tracking-tight text-[#191D23] sm:text-[34px]`}>
          Zoho is our primary ecosystem.
          <span className="block text-[#59616B]">Our architecture thinking is platform-independent.</span>
        </h2>
        <p className="mt-3.5 max-w-xl text-[14.5px] text-[#59616B]">
          We can recommend and work across platforms when the business
          requires it.
        </p>
        <div className="mt-7 flex flex-wrap items-baseline gap-9">
          <span className={`${manrope.className} text-[15px] font-extrabold tracking-[0.02em] text-[#191D23]`}>
            Zoho
          </span>
          {["Microsoft Dynamics 365", "Odoo"].map((p) => (
            <span key={p} className={`${manrope.className} text-[15px] font-extrabold tracking-[0.02em] text-[#59616B]`}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
