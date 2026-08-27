import Reveal from "@/components/Reveal";
import HoverGlow from "@/components/HoverGlow";
import BookConsultationButton from "@/components/BookConsultationButton";

export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Reveal>
        <HoverGlow className="rounded-2xl border border-border bg-ink-inverse px-6 py-14 text-center transition-all duration-300 hover:border-accent/50 sm:px-10">
          <h2 className="text-lg font-bold text-on-inverse sm:text-xl">
            Ready to bring your systems into one place?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-on-inverse-muted">
            Let&apos;s map out where your processes are breaking down and design
            the right connected setup to fix it.
          </p>
          <BookConsultationButton className="btn btn-primary btn--md mt-5">
            Book free consultation
          </BookConsultationButton>
        </HoverGlow>
      </Reveal>
    </section>
  );
}
