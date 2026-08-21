"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Play, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import BookConsultationButton from "@/components/BookConsultationButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Replaces VideoTestimonial's homepage usage with a structured case-study narrative
 * (Challenge -> Solution -> Technology -> Outcome -> CTA), per
 * ai-optimization/reports/HOMEPAGE-MASTER-PLAN.md Section 4. Every line below is drawn
 * directly from the existing, verified quote (Nikhil, CEO, Maxvill) and
 * ai-optimization/BUSINESS_FACTS.md — no metric, date, or detail is invented. This is
 * the one genuine, named case study on the site (BUSINESS_FACTS.md), moved up from
 * position 12 to position 7 in the page because it's the strongest trust asset available.
 */
const beats = [
  {
    label: "Challenge",
    text: "Sales was tracked without a connected CRM, and accounting ran on Tally — a separate system from the sales process.",
  },
  {
    label: "Solution",
    text: "VectorWave implemented Zoho CRM for sales and migrated accounting from Tally to Zoho Books.",
  },
  {
    label: "Technology",
    text: "Zoho CRM, Zoho Books",
  },
];

export default function CaseStudy({
  videoSrc,
  poster,
  quote,
  name,
  role,
}: {
  videoSrc: string;
  poster?: StaticImageData | string;
  quote: string;
  name: string;
  role: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-surface-alt px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <SectionHeading
            eyebrow="Real client, verified work"
            heading="Case study: Maxvill"
            description="The one client story on this site we can name, and stand behind."
            align="center"
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <Reveal className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-ink-inverse shadow-xl">
            {playing ? (
              <video
                className="h-full w-full"
                controls
                autoPlay
                playsInline
                preload="none"
                poster={typeof poster === "string" ? poster : poster?.src}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play testimonial from ${name}`}
                className="group absolute inset-0 h-full w-full"
              >
                {poster ? (
                  <Image
                    src={poster}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-ink-inverse to-ink-inverse-alt" />
                )}
                <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={26} className="ml-1 fill-current" />
                  </span>
                </span>
              </button>
            )}
          </Reveal>

          <Reveal delay={100} className="flex flex-col">
            <div className="flex flex-col gap-5">
              {beats.map((beat) => (
                <div key={beat.label} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  <div className="mb-1 text-[10.5px] font-bold uppercase tracking-wide text-primary">
                    {beat.label}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">{beat.text}</p>
                </div>
              ))}

              <div className="border-t border-border pt-4">
                <div className="mb-1 text-[10.5px] font-bold uppercase tracking-wide text-primary">
                  Outcome
                </div>
                <p className="text-sm italic leading-relaxed text-ink">&ldquo;{quote}&rdquo;</p>
                <p className="mt-2 text-xs font-bold text-ink">
                  {name} <span className="font-normal text-ink-faint">— {role}</span>
                </p>
              </div>
            </div>

            <BookConsultationButton className="btn btn-primary btn--md mt-6 self-start">
              Talk to us about a similar migration <ArrowRight size={15} />
            </BookConsultationButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
