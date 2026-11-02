import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import BookConsultationButton from "@/components/BookConsultationButton";

export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Reveal>
        <HoverGlow className="rounded-2xl border border-border bg-ink-inverse px-6 py-14 text-center transition-all duration-300 hover:border-accent/50 sm:px-10">
          <h2 className="text-xl font-bold text-on-inverse sm:text-2xl">
            Ready to bring your systems into one place?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-on-inverse-muted">
            Start with a free audit. We map where your processes break down across
            Sales, Finance, Marketing and Supply Chain, then show the right
            connected setup to fix it &mdash; across Zoho and Odoo ERP, custom
            development and agentic AI.
          </p>
          <ul className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-2">
            {[
              "Sales",
              "Finance",
              "Marketing",
              "SCM",
              "Custom development",
              "Agentic AI",
            ].map((area) => (
              <li
                key={area}
                className="rounded-full border border-on-inverse-border px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-inverse-muted"
              >
                {area}
              </li>
            ))}
          </ul>
          <BookConsultationButton className="btn btn-primary btn--md mt-6">
            Book a free audit
          </BookConsultationButton>
        </HoverGlow>
      </Reveal>
    </section>
  );
}
