# Design Opportunity Map

Where the site could improve, organized by opportunity type. Nothing here is
implemented — this is planning only, feeding future scoped iterations governed by
`EVALUATION_RUBRIC.md` and `SAFETY_RULES.md`.

---

## Imagery opportunities

| Page | Section | Current issue | Recommended visual | Visual purpose | Priority | Recommended source | Category |
|---|---|---|---|---|---|---|---|
| About | "Meet the team" (4 leadership cards) | Generic `UserRound` icon placeholder, no names | Real headshots | Credibility — matches the "human" trait in `BRAND_GUIDELINES.md` | P2 | Real VectorWave staff photos | Real |
| Blog index + posts | Every card/post | `BlogIcon` lucide icon only, `image` field declared but always unset | Real featured images per post, or purposeful category-based custom illustration if photos aren't available | Comprehension + storytelling — a wall of identical-feeling icon cards reduces scannability across 6 posts | P2 | Real photo if available, else custom illustration (not stock) | Real or Custom illustration |
| `/services/[slug]` (18 pages) | "What's included" tools grid | Text-only tool list, no visual sense of the tools working together | A small custom "how these tools connect" diagram, reused per platform family (Zoho/Odoo/MS365/Custom) rather than per individual service | Comprehension — shows integration, which is VectorWave's actual value proposition | P3 | Custom process diagram (one per platform, not per service — controls effort) | Custom diagram |
| Homepage | `VideoTestimonial` (Nikhil/Maxvill) | Currently a single video+quote, no supporting visual context about the actual migration | A simple before/after or workflow diagram illustrating the Tally→Zoho Books migration, IF this becomes a developed case study (see Case Study section below) | Storytelling + credibility | P3 | Custom diagram, built from the real verified project facts only | Custom diagram |
| Homepage | Testimonial ("Sam, Founder & CEO") | No company name, no visual weight — reads weaker than the video testimonial beside it | Not an imagery fix — see Content Review in the Stage 2 report; do not add an image to a testimonial whose text itself is unverifiable | N/A | — | — |
| Services index | Platform/service grids | Icon-only cards throughout — functional but visually uniform across the whole page | No image recommended — this is a case where the audit-confirmed pattern (icon + text card) is appropriate for a dense catalog; adding photography here would violate `BRAND_GUIDELINES.md`'s "never add an image merely to fill whitespace" rule | — | — | — | **No image needed** |

---

## Where diagrams should replace or supplement text

- `/services/zoho-bundled-suite`'s Architecture, Ecosystem, Integration, and CRM/Lead-Source sections already do this well (flow-chip diagrams) — this page is the proof-of-concept for the pattern, not a gap. The opportunity is **reuse**, not invention: the 18 templated service pages have zero equivalent diagram treatment despite being conceptually similar content (a set of connected tools).
- `BusinessDiagnosis` accordion (homepage) is currently text-only inside each expanded item — could benefit from one small supporting icon per diagnosis point, but this is optional polish (P3), not a comprehension gap; the text itself reads clearly.
- Contact page's three method cards (chat/email/phone) are appropriately icon-based already — no diagram opportunity here.

## Where animation could improve understanding

See `STAGE-2-BASELINE-REVIEW.md` Step 7 for the full table. Summary: no section needs
animation added purely for interest. Two real opportunities exist — staggered reveal on
the tools grid (P3, cosmetic) and progressive scroll-tied reveal on the zoho page's flow
diagrams (P3, gated behind the page's design-direction decision) — plus two **fixes**
that aren't really "add motion" so much as "make existing motion accessible": the
`Typewriter`/`Counter` reduced-motion gap (P1, correctness) and standardizing the three
tab implementations' keyboard interaction (P1/P2, correctness).

## Where transitions could improve flow

No specific gap identified beyond what's already covered by `Reveal`'s consistent
scroll-fade pattern. The existing page-enter transition (`animate-page-enter` in
`globals.css`) is already applied; no missing sitewide transition was found.

## Where cards need redesign

Not redesign — **componentization**. The visual pattern itself (rounded corners,
border, hover-lift) is already consistent and reasonably aligned with the "clean,
precise" brand trait. The opportunity is structural (extract the one shared `Card`
component per `PRIORITY-MATRIX.md` P2-2), not visual.

## Where typography needs improvement

- Sitewide: the font-override bug (`globals.css:69`) is the dominant typography issue —
  fixing it changes everything else about how the type system reads, so no other
  typography opportunity should be evaluated until this is resolved (evaluating heading
  scale/rhythm against a font that isn't actually the deployed font would produce
  misleading conclusions).
- Blog post pages: confirmed smaller mobile H1 than every other page's main heading —
  a small, likely accidental scale inconsistency worth aligning once the font fix lands.

## Where sections need restructuring

- The 18 templated service pages' two-section structure (tools grid + cross-link block)
  is thin relative to what ranks well for competitive B2B search terms. A third section
  — even a small "who this is for" or "how we implement it" block — would add real
  differentiation without requiring new page templates, per the Content Review findings.
- Contact page: the "Live Chat Support" card needs either a real destination or removal
  — this is a functional fix, not a visual restructure, but it lives in this document
  because it's a card-level content/behavior decision.

## Where case studies need stronger presentation

Covered in depth in `STAGE-2-BASELINE-REVIEW.md` Step 9 and `BRAND_GUIDELINES.md`'s Case
Study Policy. Summary: the one real case study (Nikhil/Maxvill) is under-presented
relative to how much credibility weight it's carrying — it appears in exactly one
homepage section with no problem→solution→result structure and no adjacent CTA. This is
the single highest-value "more proof, zero fabrication" opportunity on the site, because
it requires no new invented content — only better presentation of what's already
verified.

## Where trust needs improvement

- Replace or soften unverifiable badges/claims (partner status, awards) — see
  `PRIORITY-MATRIX.md` P0-2.
- Resolve the contradicting project-count stat — see P0-1.
- Attach a company name to the "Sam" testimonial, or replace/remove it — gated on human
  confirmation per `BUSINESS_FACTS.md`.
- Surface the Maxvill case study more prominently and with more structure, per above.

---

## Explicitly not recommended

Per `BRAND_GUIDELINES.md`'s "avoid" list and the "no image merely to fill whitespace"
rule, this map deliberately does **not** recommend: stock photography anywhere, AI-generated
hero imagery, decorative gradients/glassmorphism/3D on the service catalog pages, or any
new illustration style that isn't already grounded in the site's existing diagram
language (flow-chips, ecosystem groupings). The target is more of what
`/services/zoho-bundled-suite` already proves the team can build — technical,
purpose-built diagrams — applied more consistently, not a new decorative visual
language layered on top.
