import Reveal from "@/components/Reveal";

const steps = [
  { n: 1, label: "Discover", detail: "Understand how the business actually runs today." },
  { n: 2, label: "Design", detail: "Map the target system before any configuration begins." },
  { n: 3, label: "Build", detail: "Configure and connect the platform to fit the business." },
  { n: 4, label: "Support", detail: "Stay live after go-live, not just through launch." },
];

export default function Process() {
  return (
    <section className="bg-surface-alt px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-8 text-center">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            How we work
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            A clear path from first call to a live, working system.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 80}
              className="group flex flex-col items-center gap-2.5 text-center"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-inverse text-xs font-bold text-on-inverse transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
                {step.n}
              </div>
              <div className="text-sm font-bold text-ink">{step.label}</div>
              <p className="text-xs leading-relaxed text-ink-muted">{step.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
