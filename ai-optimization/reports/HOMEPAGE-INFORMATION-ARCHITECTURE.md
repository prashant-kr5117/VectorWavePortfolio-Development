# Homepage Information Architecture

**Date:** 2026-08-20
**Depends on:** `HOMEPAGE-CURRENT-STATE.md` (section-by-section audit and per-section
KEEP/REFINE/RESTRUCTURE/REPLACE/REMOVE/ADD classifications this document builds the new
sequence from).

**Goal:** design the ideal homepage narrative — not every existing section has to remain,
and order is treated as a first-class design decision, not just inherited from what's
already built.

---

## The story the page needs to tell

> WHO WE ARE → WHAT WE SOLVE → HOW WE DO IT → WHAT TECHNOLOGY WE WORK WITH → WHY TRUST US
> → PROOF → WHAT TO DO NEXT

Mapped against `EVALUATION_RUBRIC.md`'s weights, this ordering deliberately front-loads
**Conversion/CRO (14)** and **Trust/Proof (12)** — the two highest-weighted, and Trust/Proof
the weakest-scoring (48/100 baseline) — categories, rather than treating them as an
afterthought sequence bolted onto the end.

---

## Proposed section order

| Order | Section | Maps to narrative beat | Status vs. today |
|---|---|---|---|
| 1 | **Hero** | WHO WE ARE | REFINE (unchanged position) |
| 2 | **Business Diagnosis** | WHAT WE SOLVE | KEEP, **moved up** (was position 5) |
| 3 | **How We Think** (ProcessChains) | HOW WE DO IT | KEEP (unchanged position) |
| 4 | **Services / Capabilities** | HOW WE DO IT (breadth) | RESTRUCTURE (unchanged position) |
| 5 | **Technology & Industry** | WHAT TECHNOLOGY WE WORK WITH | REFINE, **elevated in prominence** (unchanged position, but now the clear "positioning" centerpiece once TrustBadges/PartnerLogos are removed ahead of it) |
| 6 | **Why VectorWave** | WHY TRUST US (differentiation) | REFINE (unchanged position) |
| 7 | **Case Study** (VideoTestimonial → expanded) | PROOF | RESTRUCTURE, **moved up** (was position 12, second-to-last) |
| 8 | **How We Work** (Process, 4-step) | WHAT TO DO NEXT (sets expectations before the ask) | REFINE, **moved down** (was position 8, mid-page) |
| 9 | **CTA** | WHAT TO DO NEXT (the ask) | KEEP (unchanged position — the natural close) |

**Removed entirely from the sequence:** TrustBadges (decorative, duplicate, unverified),
PartnerLogos as a standalone marquee (content absorbed/corrected into Technology &
Industry per `HOMEPAGE-CURRENT-STATE.md` item 3), Innovation (generic filler), Testimonial
/ "Sam" (unverifiable, pending confirmation).

---

## Reasoning for the reordering

### Business Diagnosis moves from #5 to #2
It is the strongest problem-first CRO section on the page (`HOMEPAGE-CURRENT-STATE.md`
item 5) — currently it sits *after* two decorative marquees and a process-differentiation
section, meaning a visitor has to get past ~2 screens of trust decoration and abstract
positioning before the page even acknowledges their problem. Moving it to #2 means the
sequence becomes: *here's who we are* → *here's the problem you probably have* → *here's
how we think about solving it* → *here's what we actually do*. That is a materially
stronger opening argument than the current *who we are* → *trust me* → *trust me again* →
*here's our philosophy* → *finally, your problem*.

### Case Study moves from #12 to #7
`STAGE-2-BASELINE-REVIEW.md` (Step 9) and `HOMEPAGE-CURRENT-STATE.md` item 12 both
identify the Maxvill case study as the single strongest trust asset on the site,
currently appearing once, near the very end, with no adjacent CTA. `DESIGN_BENCHMARKS.md`
("Case studies / proof depth") explicitly recommends surfacing real proof earlier and
more centrally, not treating it as a closing footnote. Position #7 — immediately after
"Why VectorWave" makes its differentiation claims and immediately before the process/CTA
close — puts real evidence directly behind the site's own claims about itself, which is
the specific "proof near the claim it supports" pattern `BRAND_GUIDELINES.md` calls for.

### "How We Work" (4-step process) moves from #8 to #8-effectively-#8-of-9 (just before CTA)
Today it sits mid-page, sandwiched between two content-dense sections, functioning as an
underdeveloped pause. "What happens after I say yes" is most relevant to a visitor who is
already close to converting — i.e., right before the final ask, not in the middle of the
positioning argument. This also resolves the naming/conceptual overlap with "How We
Think" (`HOMEPAGE-CURRENT-STATE.md` items 4 and 8) by physically separating the two
"How we..." sections to opposite ends of the page instead of ~2 sections apart.

### Technology & Industry stays at #5, but is effectively promoted
It doesn't move numerically, but with TrustBadges and the standalone PartnerLogos marquee
removed ahead of it, it becomes the first true "here's our technology depth" moment a
visitor reaches — previously it was the *third* attempt at technology/trust signaling
(after TrustBadges' badge wall and PartnerLogos' logo wall), diluted by two weaker
predecessors. Removing the weaker two effectively elevates this one without changing its
position.

---

## What this order deliberately does NOT do

- It does not invent a new section to fill the gap left by removing TrustBadges,
  PartnerLogos-as-marquee, Innovation, or the Sam testimonial — per the Core Rule, a
  section is only added if it earns its place (see the "ADD" candidates below, both
  conditional).
- It does not reorder `BusinessDiagnosis` or `ProcessChains`'s *internal* content — only
  their position in the page sequence.
- It does not merge `ProcessChains` ("how we think about your business") and `Process`
  ("how we work with you") into one section — they answer genuinely different questions
  (business-process philosophy vs. project delivery stages) and merging them would lose
  that distinction; separating them further in the page sequence (see above) fixes the
  conflation risk without losing either one's content.

---

## ADD candidates (conditional, not committed)

Per the Core Rule, nothing is added without a clear reason tied to a real gap identified
in `HOMEPAGE-CURRENT-STATE.md`:

1. **A short, explicit positioning statement connecting the platform choice to business
   need**, e.g. a one-line framing directly above or below the Technology & Industry
   section along the lines of the architecture in `HOMEPAGE-MASTER-PLAN.md`'s Positioning
   Architecture (Business need → Technology strategy → Platform implementation →
   Integration → Automation → Custom development → Optimization). This is not a new
   section so much as a possible short connective addition between Services (#4) and
   Technology & Industry (#5) — flagged as a candidate, not a commitment, pending the
   Master Plan's fuller treatment.
2. **A CTA directly attached to the Case Study section** (#7) — not a new standalone
   section, but a required addition to the restructured Case Study per
   `HOMEPAGE-CURRENT-STATE.md` item 12's finding that it currently has none.

No other new section is recommended. Specifically **not recommended**: a dedicated
"trust badges" replacement section, a separate "why choose us vs. competitors"
comparison section (no competitor-comparison content exists or is verified), or any new
marquee/logo-wall pattern — all would repeat the exact pattern this document is removing.

---

## Resulting page skeleton (for reference — full detail in `HOMEPAGE-MASTER-PLAN.md`)

```
1. Hero                      — who we are, what we do, primary CTA
2. Business Diagnosis        — what we solve (problem-first)
3. How We Think              — how we do it (process philosophy)
4. Services / Capabilities   — how we do it (breadth, restructured by platform)
5. Technology & Industry     — what technology we work with + who we've helped
6. Why VectorWave            — why trust us (differentiation)
7. Case Study (Maxvill)      — proof, with attached CTA
8. How We Work               — what to expect next (process, right before the ask)
9. Final CTA                 — what to do next
   (Footer — unchanged, global)
```

Nine sections, down from thirteen — each one earning its place per the audit, none
invented.
