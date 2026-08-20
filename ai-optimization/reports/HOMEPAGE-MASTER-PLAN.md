# Homepage Master Plan

**Date:** 2026-08-20
**Status:** Strategy and design specification only. **No website source file was
modified to produce this document.** Nothing here has been implemented.
**Depends on:** `HOMEPAGE-CURRENT-STATE.md` (audit), `HOMEPAGE-INFORMATION-ARCHITECTURE.md`
(narrative order), and every file in `ai-optimization/` (governance layer).

**Objective:** make the homepage feel like a premium, modern, trustworthy, enterprise
technology consultancy, while preserving the strong existing work identified in the
current-state audit. This is not a rebuild — of the 13 current sections, 4 are kept
outright or with copy-only refinement, 5 are refined in place, 2 are restructured, and
only 3 are removed (2 of those pending human verification, not aesthetic judgment).

---

## 1. Hero Strategy

**Current state (`HOMEPAGE-CURRENT-STATE.md` item 1):** structurally strong — clear
headline, correct CTA hierarchy, a genuinely good custom `EcosystemOrbit` diagram. Two
specific defects: the "Zoho Authorised Partner" badge and the "50+ Projects delivered"
counter are both unverified, and the latter directly contradicts the About page's "15
Projects Completed."

**What the hero must communicate in 5-10 seconds** (per the brief):
1. **What VectorWave does** — already clear: ERP/CRM implementation + web/AI, named
   platforms (Zoho, Odoo).
2. **Who it helps** — currently implicit only ("growing businesses"); the sub-copy could
   be one clause more specific without becoming a list.
3. **Why it's credible** — currently carried entirely by the two unverified claims. This
   is the actual gap, not the headline or visual.
4. **What to do next** — already clear (two well-differentiated CTAs).

**Recommended content direction (not final copy — copy is a Phase A content decision, not
a design-spec decision):**
- **Headline:** keep the existing headline. *"Powering Intelligent Business Flow,
  without the overhead"* is specific to the ERP/CRM/automation positioning, not generic
  "digital transformation" language, and the `Typewriter` treatment is a proven,
  accessible pattern already in place — no reason to replace working copy.
- **Supporting message:** keep the existing sentence structure (names Zoho, Odoo, CRM
  automation, web dev, AI); optionally sharpen "growing businesses" toward the confirmed
  industry breadth (13 industries, `lib/industries.ts`) if a human wants more specificity
  — not required.
- **CTA hierarchy:** keep as-is — "Book free consultation" (primary) / "See our services"
  (secondary) is already the correct pattern (`BRAND_GUIDELINES.md` CTA philosophy: one
  clear primary action).
- **Visual:** keep `EcosystemOrbit` — it is real, custom, and technical, exactly what
  `DESIGN_BENCHMARKS.md`'s hero research recommends over generic/stock hero imagery.
- **Trust signal:** replace the two unverified claims. Do not invent a replacement metric.
  Options, in order of preference, pending human input:
  1. Use only the one already-real stat ("12 Industries served") alone, without a paired
     unverified stat — asymmetry is preferable to a false pair.
  2. If a verified, current project count becomes available (resolving the 50+/15
     contradiction — `BUSINESS_FACTS.md`), use that single verified number.
  3. Replace the "Zoho Authorised Partner" eyebrow text with a factual, unfalsifiable
     framing already true today, e.g. naming the platforms directly ("Zoho & Odoo
     Implementation Partner" is still a partner-status claim and should not be used
     without verification; "ERP · CRM · Web & AI Solutions" alone, dropping the
     partner-status clause, is safe and already partially the existing copy).
- **Above-the-fold density:** unchanged — current density (badge, H1, sub-copy, 2 CTAs,
  2 stats) is reasonable and shouldn't grow; if the trust-signal fix reduces to one stat,
  the section gets *less* dense, not more, which is a net improvement, not a loss.
- **Mobile experience:** already reviewed via `homepage-mobile-390.png` — hero stacks
  cleanly, `EcosystemOrbit` correctly switches to its dedicated 2-column mobile grid
  (`components/EcosystemOrbit.tsx:174-194`, a genuinely good existing pattern, not a
  shrunk desktop version). No structural mobile change needed here.

---

## 2. Positioning Architecture

VectorWave should not read as a vendor of disconnected point services. The homepage
should make the following chain visible, primarily through the (refined) Technology &
Industry section and secondarily through the page's overall sequence:

```
Business need
   ↓
Technology strategy   ("we recommend based on requirements, not what we'd rather sell" —
                        already real copy in TechPlatformTabs, keep and reinforce)
   ↓
Platform implementation   (Zoho / Odoo / Microsoft Dynamics 365 — the 3 confirmed ERP/CRM platforms)
   ↓
Integration    (connecting what already exists — already present in BusinessDiagnosis's
                "your systems don't talk to each other" diagnostic)
   ↓
Automation     (AI & Custom Technology tab, already present)
   ↓
Custom development   (Web, Mobile, AI Integration, WhatsApp Automation — the 4 confirmed
                       Custom Development services)
   ↓
Optimization   (the "Data isn't the finish line, decision is" visibility-chain content,
                already present in TechnologyAndIndustry)
```

**This chain is not a new invention — every link already exists somewhere on the current
homepage.** The positioning work is connecting them explicitly rather than leaving the
connection implicit across three separate sections (`ProcessChains`, `TechnologyAndIndustry`,
`WhyVectorWave`).

### How Zoho, Odoo, Microsoft Dynamics 365, and Custom Development should coexist

Evidence review (`lib/services.ts` confirms an even 5/5/5/4 service split across the 4
platforms; the live code's own `TechPlatformTabs` component independently labels Zoho
"Flagship"):

- **Do not force artificial parity.** The code's own "Flagship" badge on Zoho is a real,
  intentional signal already in the design — `BUSINESS_FACTS.md` doesn't contradict this
  (Zoho is the platform behind the one real case study, the live chat widget, and the
  contact-form CRM backend). Keep Zoho as first-listed/flagship where the code already
  does this.
- **Do not let this become "Zoho, and three afterthoughts."** The service count is
  genuinely even (5/5/5/4); Odoo and Microsoft Dynamics 365 each have equally real,
  specific "best for" framing already written in `TechPlatformTabs` ("modular
  open-source ERP" / "larger enterprises already invested in the Microsoft ecosystem").
  Preserve that specificity — don't let a Zoho-first visual hierarchy erase Odoo/Dynamics
  365 content depth.
- **Custom Development is the connective tissue, not a 5th competing platform** — it's
  what makes the other three actually fit a specific business (integration, automation,
  AI, mobile/web). The homepage should frame it that way (already partially true via the
  "AI & Custom Technology" tab's "best for businesses that need something no off-the-shelf
  platform covers" copy) rather than as a 4th item in a flat list.
- **Salesforce is not part of this architecture** until `BUSINESS_FACTS.md` open question
  #3 is resolved — see Trust/Proof section below. It currently appears as if it were a
  5th coequal platform in 3 separate homepage locations with zero supporting content
  anywhere else on the site; this is the single highest-priority Business Facts
  Requiring Confirmation item in this plan.

---

## 3. Trust / Proof Strategy

Per `BASELINE.md`, this is the weakest scored category (48/100) and the highest-value
target for improvement given `EVALUATION_RUBRIC.md`'s weighting (12 points, 2nd-highest
after Conversion/CRO).

### What to do
1. **Lead with the Maxvill case study, structurally, not just as a testimonial** — see
   Section 6 below. This is the single highest-leverage trust move available, and it
   requires zero new information, only restructuring what's already verified.
2. **Remove decorative/duplicate trust signals** (TrustBadges, the PartnerLogos marquee
   as currently composed, the unverified Sam testimonial) per
   `HOMEPAGE-CURRENT-STATE.md`. Removing unverifiable claims is itself a trust
   improvement — a shorter, all-true page reads as more credible than a longer page with
   mixed verified/unverified content, per `DESIGN_BENCHMARKS.md`'s finding that generic
   trust decoration is actively losing effectiveness with 2026 B2B buyers.
3. **Resolve the Salesforce presentation** across all 3 homepage locations
   (`TechnologyAndIndustry`'s tabs, its ecosystem marquee, `WhyVectorWave`'s platform
   chain) consistently, pending confirmation.
4. **Do not add new trust badges, award claims, or partnership claims** anywhere on the
   homepage without a corresponding new entry in `BUSINESS_FACTS.md` first, per
   `SAFETY_RULES.md`.

### Where proof should live
- **Near the claims it supports**, not concentrated in one "trust section" far from
  context — per `BRAND_GUIDELINES.md`'s trust/proof philosophy. Concretely: the Maxvill
  case study (Section 6) sits after "Why VectorWave" makes its differentiation claims,
  functioning as direct evidence for those claims, not a disconnected testimonial block.
- **The "we recommend based on requirements" line** (`TechPlatformTabs`) and **the
  "client confidentiality" line** (`TechnologyAndIndustry`) are themselves a form of
  process credibility — candid, specific statements that don't require external
  verification because they're statements about VectorWave's own process, not claims
  about outcomes. Keep and, if anything, reinforce this pattern rather than diluting it
  with unverifiable badges.

### Business facts requiring human confirmation before implementation
(Consolidated from `BUSINESS_FACTS.md`, with the specific homepage location(s) each one
affects — this is the action list a human needs to work through before Phase A begins.)

| # | Claim | Homepage location(s) | What's needed |
|---|---|---|---|
| 1 | "Zoho Authorised Partner" | Hero eyebrow, TrustBadges (removed per this plan, but the underlying fact still needs resolving for the Hero) | Real certificate/badge ID, or remove the claim |
| 2 | "50+ Projects delivered" vs. About page's "15 Projects Completed" | Hero counter | One verified, consistent number |
| 3 | Salesforce as a supported platform | `TechnologyAndIndustry` (tabs + marquee), `WhyVectorWave` (platform chain) — 3 locations | Confirm real Salesforce service capability, or remove from all 3 |
| 4 | "Sam, Founder & CEO" testimonial | Testimonial section (removed per this plan pending this) | Real company name + confirmed permission, or leave removed |
| 5 | Shopify / React / NetSuite / Tally as "trusted technology partners" | PartnerLogos marquee | Confirm which (if any) represent real, statable capabilities |
| 6 | Accent brand color / light-vs-dark direction | Not homepage-specific, but affects any new homepage component styling | Human decision (already flagged in `DESIGN_SYSTEM.md`) |

None of these are assumed resolved by this plan — every recommendation above that touches
one of these facts is written as conditional on confirmation, per `SAFETY_RULES.md`.

---

## 4. Case Study Treatment (Maxvill)

**Current state:** one video + one quote, no narrative structure, no adjacent CTA
(`HOMEPAGE-CURRENT-STATE.md` item 12).

**Recommended structure**, using only verified content (the existing quote text and
`BUSINESS_FACTS.md`'s confirmed facts — nothing invented):

| Beat | Content (verified only) |
|---|---|
| **Challenge** | Generalized framing consistent with the quote's own content — a business running sales and accounting on disconnected/manual tools (Tally for accounting, implied manual/fragmented sales process pre-CRM). Do not invent specifics beyond what the quote supports. |
| **Solution** | Zoho CRM sales setup + Tally-to-Zoho-Books migration — both named explicitly in the existing quote, nothing new. |
| **Technology** | Zoho CRM, Zoho Books (both real, confirmed platform services). |
| **Implementation** | Whatever the business can additionally confirm (timeline, scope) — if nothing further is confirmable, this beat can be omitted rather than filled with invented detail. |
| **Outcome** | The quote's own qualitative language: "seamless implementation, responsive team" — no fabricated metric, percentage, or dollar figure. If the business can provide a real, verifiable outcome number, it can be added later through the standard `BUSINESS_FACTS.md` update process; until then, qualitative outcome language only. |
| **CTA** | A context-specific action attached directly to this section — e.g. "Talk to us about a similar Zoho CRM or Books migration" — not a repeat of the generic "Book free consultation" copy used elsewhere. |

**Visual treatment:** keep the existing video + poster (real asset, already in place);
the video itself is the interview footage — do not add a second, fabricated "screenshot"
of the Maxvill implementation, since no such real asset is confirmed to exist
(`BRAND_GUIDELINES.md`: never fabricate a project screenshot).

**Do not create additional fictional companies or examples framed as real** anywhere in
this treatment, per the Case Study Policy.

---

## 5. Visual Storytelling

Per `BRAND_GUIDELINES.md`'s Image Strategy priority order (real assets → real screenshots
→ custom diagrams → custom illustrations → licensed stock → AI-generated last resort).

| Section | Problem | Recommended visual | Purpose | Real/custom/illustrative | Priority |
|---|---|---|---|---|---|
| Hero | None — already well-served | `EcosystemOrbit` (existing) | Shows real technical breadth | Real/custom (existing) | — (no change needed) |
| Technology & Industry | Ecosystem relationship (Business need → Platform → Integration → Automation → Optimization) is currently expressed only as tab copy + a text marquee, not visually | A custom architecture/relationship diagram — see Section 6 (Technology Ecosystem Visual) below | Comprehension — makes the Positioning Architecture (Section 2) visible, not just readable | Custom diagram | **High** |
| Case Study (Maxvill) | No visual beyond the interview video/poster | None needed beyond what exists — do not fabricate a second visual | N/A | Real (existing video/poster) | — (no addition recommended) |
| Services / Capabilities | 19 services across 4 platforms currently rendered as a flat, equal-weight grid (or, if restructured per `HOMEPAGE-CURRENT-STATE.md` item 6, a platform-grouped layout) | If restructured to a bento/platform-grouped layout, the platform icons already in `lib/services.ts`'s `ServiceIcon` lookup are sufficient — no new imagery needed | Scannability of an already-real, already-specific catalog | Existing icon system | Medium (tied to the Services restructure, not a standalone visual ask) |
| Industries (within Technology & Industry) | Already well-served — each industry has a real icon (`lib/industries.ts`) and specific text content | None needed | N/A | Existing icon system | — (no addition recommended) |

**Explicitly not recommended anywhere on the homepage:** stock photography of any kind
(offices, handshakes, generic "team collaborating" imagery), AI-generated corporate
imagery, or any new "team photo" — the About page's leadership-photo gap is a separate,
already-flagged issue (`WORKSTREAM-02-IMAGE-OPPORTUNITIES.md`) and is not a homepage
concern. Adding an image to the homepage "to finish" a section is explicitly against
`BRAND_GUIDELINES.md`'s Image Strategy and is not recommended anywhere in this plan.

---

## 6. Technology Ecosystem Visual

**Should the homepage visually communicate the Zoho / Odoo / Microsoft Dynamics 365 /
Custom Development / Integrations / Automation / Analytics relationship? Yes** — this is
the single highest-priority visual recommendation in this plan, because the Positioning
Architecture (Section 2) currently exists only as separated, unconnected text across
three sections, and a diagram is the correct tool for showing a *relationship*, not just
a *list* (this is exactly the distinction `BRAND_GUIDELINES.md`'s illustration philosophy
draws: "prefer diagrams that explain how the work looks... over generic illustration").

**Directly builds on existing work, does not replace it:**
- `EcosystemOrbit` (Hero) already establishes the visual language (a central hub, orbiting
  nodes, connecting lines, real logos where available) for "what VectorWave touches."
- `TechnologyAndIndustry`'s "visibility chain" (Transactions → Data → KPIs → Dashboards →
  Decisions) already establishes a left-to-right flow-diagram visual language for "how
  value moves through the system."

**Recommendation:** a custom diagram for the Technology & Industry section that combines
both existing visual languages into one relationship diagram:

```
Business Need  →  Technology Strategy  →  [ Zoho | Odoo | Microsoft Dynamics 365 ]  →  Integration & Automation  →  Custom Development  →  Optimization / Decisions
```

- **Must communicate capability, not become a logo wall.** Per the brief's explicit
  warning — this is a flow/relationship diagram with the 3 platforms as one stage among
  several, not a decorative arrangement of logos. The existing `PartnerLogos` marquee
  (recommended for removal/restructure in the audit) is the cautionary example of what
  this should *not* become.
- **Reuses real elements already in the codebase:** the platform logos already imported
  in `EcosystemOrbit.tsx` and `PartnerLogos.tsx` (Zoho, Odoo, Microsoft Dynamics 365 —
  the 3 confirmed platforms only, pending the Salesforce decision), the existing
  visibility-chain pill styling from `TechnologyAndIndustry.tsx`, and the existing
  orbit/flow motion patterns from `MOTION_GUIDELINES.md`'s "workflow / architecture /
  data-flow animation" category (already explicitly endorsed there as appropriate for
  VectorWave specifically).
- **This is a Phase C (Visual Assets) / Phase B (Visual Design) item** in the
  Implementation Plan below, not a copy/content change — it requires actual diagram
  design work, not just rearranging existing text.

---

## 7. Motion Strategy

Per `MOTION_GUIDELINES.md`'s test: *"what user problem does this animation solve?"*

### Keep (already purposeful, already reduced-motion-safe)
- `Reveal` (scroll fade-up) — the site's one clean animation primitive, used consistently.
  Keep exactly as-is; extend to any new section built in this plan.
- `Typewriter` (Hero headline) — already fixed for reduced-motion (Workstream 1); keep.
- `Counter` (stat count-up) — already fixed for reduced-motion (Workstream 1); keep,
  contingent on the Hero stat content itself being resolved (Section 1).
- Tab-switch fade-in (`ProcessChainTabs`, `TechPlatformTabs`, `IndustryTabs`) — purposeful,
  tied to a real interaction, appropriately restrained.
- `.btn-shine` hover sweep — small, real-interaction-tied, already assessed as
  "reasonable scale" in `MOTION_GUIDELINES.md`.
- `EcosystemOrbit`'s hover/orbit-dash motion — purposeful (reveals node detail on
  hover/focus), already reduced-motion-covered via global CSS.

### Refine
- **The three marquees** (TrustBadges, PartnerLogos, TechnologyAndIndustry's ecosystem
  strip) collectively represent the same motion device — continuous auto-scroll —
  repeated three times within roughly the first two page-scrolls. Individually each
  passes a weak version of the motion test ("shows more content than fits"); collectively,
  three instances of the same device in quick succession reads as decorative repetition
  rather than three distinct purposeful choices. **Per the removals recommended in the
  audit (TrustBadges removed, PartnerLogos restructured into the new Technology Ecosystem
  Visual, ecosystem-strip marquee removed as redundant with TechPlatformTabs), this drops
  naturally from three marquees to zero standalone marquees** — not a motion rule change,
  a consequence of the content restructuring already recommended above.

### New motion — only where it improves comprehension, hierarchy, storytelling, or interaction

| Recommendation | Purpose | Trigger | Duration | Accessibility | Performance impact |
|---|---|---|---|---|---|
| Progressive reveal of the new Technology Ecosystem Visual (Section 6), showing each stage of the Business Need → Platform → Integration → Optimization chain in sequence | Storytelling — reinforces that this is a *flow*, not a static list, directly supporting comprehension of the Positioning Architecture | Scroll into view (reuse existing `Reveal`/`IntersectionObserver` pattern — no new mechanism) | Staggered, ~80-100ms per stage (matching the existing `ProcessChainTabs` stagger timing already in the codebase) | Must degrade to fully-visible-at-once under `prefers-reduced-motion`, per the existing global CSS rule | Low — CSS/IntersectionObserver-based, same cost class as existing `Reveal` usage |
| A short CTA-attach micro-interaction on the restructured Case Study section (e.g. the new contextual CTA fading/sliding in as the case study content is read) | Reinforces the CTA is *specific to this section*, not the generic sitewide button | Scroll into view | Subtle, matching existing `Reveal` timing | Same reduced-motion coverage | Negligible |

**No animation is recommended anywhere in this plan for decorative purposes alone** — every
item above ties to a specific comprehension or interaction purpose, consistent with
`MOTION_GUIDELINES.md` and reconfirmed by `DESIGN_BENCHMARKS.md`'s finding that 2026
motion-design guidance is moving toward restraint, not away from it.

---

## 8. Conversion Strategy

**Current state:** CTAs are already mostly well-behaved (`STAGE-2-BASELINE-REVIEW.md`
Step 11 confirms one consistent "Book a call" mechanism after Workstream 2's fix), but
`HOMEPAGE-CURRENT-STATE.md` identifies real redundancy: Header ("Book a call") + Hero
(2 CTAs) + Innovation ("Explore more," removed per this plan) + CTA section ("Book free
consultation") = up to 4 distinct CTA moments before Footer, several saying the same
generic thing.

| CTA role | Recommendation | Language direction |
|---|---|---|
| **Primary (persistent)** | Header "Book a call" — unchanged, already the correct single mechanism | Keep as-is |
| **Primary (Hero)** | "Book free consultation" — unchanged | Keep as-is |
| **Secondary (Hero)** | "See our services" — unchanged | Keep as-is |
| **Mid-page CTA** | Currently Innovation's vague "Explore more" (removed). Per `HOMEPAGE-INFORMATION-ARCHITECTURE.md`, no replacement standalone CTA section is added — the case study's new attached CTA (below) fills this role with more specificity than a generic mid-page band would. | N/A — intentionally not replaced with an equivalent generic section |
| **Case-study CTA** | New, contextual, attached directly to the restructured Maxvill case study (Section 4) | "Talk to us about a similar migration" / "See how we approach a project like this" — specific to the case study content, not a repeat of "Book free consultation" |
| **Final CTA** | Existing `CTA` section — keep structure, refine copy toward enterprise-buyer specificity | Tighten from "start a project" / "impactful digital solutions" toward language consistent with `BusinessDiagnosis`'s and `ProcessChains`' specificity (e.g., naming the kind of conversation — a systems/process review — rather than generic "project") |

**Explicitly avoided, per `BRAND_GUIDELINES.md`'s CTA philosophy:** a third distinct
"Book a call" mechanism, vague CTA labels ("Learn more," "Get started"), and repeating
the identical CTA copy at more than 2 of the resulting page's touchpoints (Hero and Final
CTA can reasonably share language as the expected opening/closing bookend; the Case
Study CTA must not).

---

## 9. Mobile Strategy

Reviewed against `homepage-mobile-390.png` (current rendered state) and the general
responsive patterns already confirmed working in `WORKSTREAM-02-RESULT.md` Section 7
(card grids collapse 1→2→3-5 columns; `EcosystemOrbit` has a dedicated mobile
composition, not a shrunk desktop version).

| Breakpoint | Key hierarchy decisions |
|---|---|
| **390px (mobile)** | Hero stacks vertically, `EcosystemOrbit` switches to its existing 2-column icon grid (keep, already good). Removed sections (TrustBadges, PartnerLogos marquee, Innovation, Sam testimonial) reduce total mobile scroll length — a direct mobile UX win, since every removed section was full-width and non-trivial in mobile scroll cost. The restructured Services grid (Section on Services in the audit) should collapse to 1 column as card grids already do sitewide — no new pattern needed. The new Technology Ecosystem Visual (Section 6) needs an explicit mobile composition decided at design time — a horizontal flow diagram does not fit 390px directly; recommend a vertical stacked-stage version (top-to-bottom instead of left-to-right), consistent with how `WhyVectorWave`'s chain-of-pills already wraps on narrow viewports today. |
| **768px (tablet)** | Two-column layouts (Services grid, Technology & Industry's tab columns) generally hold at this width already (confirmed via `homepage-tablet-768.png` in the existing screenshot baseline). No structural change beyond what the restructured sections inherit automatically from the shared `Card`/grid patterns. |
| **1024px (small desktop / tablet landscape)** | Existing 3-column service grids and 2-column dark-section layouts (`TechnologyAndIndustry`) hold. Watch specifically that the new Technology Ecosystem Visual doesn't feel cramped at this width if it's a horizontal flow — may need its own breakpoint-specific simplification (e.g., fewer visible intermediate stage labels) rather than reusing the 1440px composition unscaled. |
| **1280px** | Standard desktop composition; no changes beyond what's already reviewed. |
| **1440px** | Full desktop composition (the primary reviewed viewport throughout this plan). |

**Sections needing explicit mobile-specific treatment (not just "shrink the desktop
version"):**
- The new Technology Ecosystem Visual (Section 6) — vertical stacking, as above.
- The restructured Services grid (`HOMEPAGE-CURRENT-STATE.md` item 6) — if a bento/
  platform-grouped layout is adopted, it needs its own mobile composition decision (likely
  4 stacked platform groups, each internally 1-column) rather than assuming the desktop
  bento grid simply reflows.

No section is recommended for horizontal scrolling — consistent with `BRAND_GUIDELINES.md`'s
"avoid template-like, overcrowded layouts" and the existing site's pattern of vertical
stacking rather than horizontal-scroll patterns anywhere else.

---

## 10. Competitive / Design Research (Adopt / Adapt / Avoid)

This plan does not conduct new external research — `ai-optimization/DESIGN_BENCHMARKS.md`
(Stage 1, reconfirmed current in Stage 2) already researched 2026 enterprise/B2B/ERP/SaaS
design patterns with sourcing. The table below applies those existing verdicts
specifically to the homepage decisions in this plan, rather than repeating the research.

| Pattern | Benchmark verdict | Homepage-specific application in this plan |
|---|---|---|
| Hero shows real substance, not generic aspiration | Adapt | Keep `EcosystemOrbit`; resolve the two unverified hero claims (Section 1) |
| Trust sections as decorative logo/badge walls | Avoid | Remove TrustBadges and the current PartnerLogos marquee (Sections 3, `HOMEPAGE-CURRENT-STATE.md` items 2-3) |
| Contextual, specific proof near the claim it supports | Adopt | Case study repositioned directly after "Why VectorWave" (`HOMEPAGE-INFORMATION-ARCHITECTURE.md`) |
| Consistent persistent navigation | Adopt | Already resolved (Workstream 2); no further homepage action |
| Whitespace as a credibility signal | Adopt (as a lens, not a new style) | Applied via *removal* (fewer, better sections) rather than added decoration — consistent with reducing 13 sections to 9 |
| Bento-grid layouts for complex catalogs | Adapt, cautiously | Applied only to the Services restructure (Section on Services), and only because it demonstrably fixes a real problem (the current grid's incomplete/inconsistent 10-of-19 service representation), not adopted for its own trend value |
| Purposeful, restrained micro-interactions | Adopt (already largely aligned) | Section 7 above — extend the existing `Reveal` pattern, no new animation philosophy |
| Accessibility/performance as baseline, not differentiator | Adopt | Out of scope for this content/structure plan specifically (already the subject of Workstreams 1-2); this plan's own additions (new diagram, new CTA) must inherit the same `prefers-reduced-motion` and focus-visible standards already established sitewide |

No pattern from any specific named competitor was copied — every verdict above traces to
a principle in `DESIGN_BENCHMARKS.md`, filtered through VectorWave's own audited homepage
state.

---

## 11. Final Homepage Blueprint

| # | Section | Purpose | Action | Content direction | Visual direction | CTA | Motion | Desktop behavior | Mobile behavior | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Hero** | Who we are / what we do / why credible / what's next | REFINE | Keep headline/sub-copy; resolve 2 unverified claims (Section 1) | Keep `EcosystemOrbit`; no new imagery | Book free consultation (primary) / See our services (secondary) | Keep `Typewriter`/`Counter` (already reduced-motion-safe) | Unchanged 2-column layout | Unchanged (already stacks well; `EcosystemOrbit` already has a dedicated mobile grid) | **P0** (contains the most-visible unverified claims on the site) |
| 2 | **Business Diagnosis** | What we solve | KEEP, moved up (#5→#2) | Unchanged content | Unchanged (accordion) | None (informational) | Unchanged (`Reveal`) | Unchanged | Unchanged | P1 (reorder only) |
| 3 | **How We Think** (ProcessChains) | How we approach a business | KEEP | Unchanged content | Unchanged | None | Unchanged (tab fade-in) | Unchanged | Unchanged | P2 |
| 4 | **Services / Capabilities** | Breadth of what we deliver | RESTRUCTURE | Reorganize around the real 4-platform/19-service structure; fix Data Migration dead-link and E-Commerce/Web-Development duplicate | Consider platform-grouped/bento layout (adapt, cautiously — Section 10) | Individual service links (unchanged mechanism) | Extend existing `Reveal` stagger | New grid composition (grouped by platform) | New mobile composition (stacked platform groups) — Section 9 | **P1** (accuracy/consistency bug, not just a design preference) |
| 5 | **Technology & Industry** | What technology we work with + industry fit | REFINE | Resolve Salesforce presentation (3 locations) pending confirmation; remove redundant ecosystem-name marquee | **Add** the new Technology Ecosystem Visual (Section 6) | "View related services" (existing, per-tab) | New staggered-reveal diagram animation (Section 7) | Two-column tabs unchanged; diagram sits within/below | Vertical-stacked diagram composition (Section 9) | **P0** (Salesforce claim); P1 (new visual) |
| 6 | **Why VectorWave** | Why trust us / differentiation | REFINE | Unchanged content except the same Salesforce fix in item #4's chain | Unchanged | None | Unchanged | Unchanged | Unchanged | P1 (shares the Salesforce fix) |
| 7 | **Case Study (Maxvill)** | Proof | RESTRUCTURE, moved up (#12→#7) | Challenge→Solution→Technology→Outcome structure (Section 4), verified content only | Keep existing video/poster; no new fabricated visual | **Add** contextual CTA ("Talk to us about a similar migration") | Subtle CTA-reveal micro-interaction (Section 7) | Unchanged layout, restructured content | Unchanged layout | **P0** (highest-leverage trust fix available) |
| 8 | **How We Work** (Process) | Set expectations before the ask | REFINE, moved down (#8→#8-of-9) | Add one line of substance per step (currently single-word labels only) | Unchanged visual pattern | None | Unchanged | Unchanged | Unchanged | P2 |
| 9 | **Final CTA** | The ask | KEEP | Tighten copy toward enterprise-buyer specificity (Section 8) | Unchanged | Book free consultation | Unchanged | Unchanged | Unchanged | P2 (copy only) |
| — | ~~TrustBadges~~ | — | **REMOVE** | — | — | — | — | — | — | P0 (removal) |
| — | ~~PartnerLogos (standalone marquee)~~ | — | **RESTRUCTURE into #5's new visual, or REMOVE if not absorbed** | — | — | — | — | — | — | P1 |
| — | ~~Innovation~~ | — | **REMOVE** | — | — | — | — | — | — | P1 (removal) |
| — | ~~Testimonial ("Sam")~~ | — | **REMOVE, pending verification** | — | — | — | — | — | — | P0 (trust risk removal) |

---

## 12. Implementation Plan

Per `SAFETY_RULES.md`: every phase below is scoped, happens on a separate branch, and
none of it is authorized to begin from this document alone — this document is the
specification a human approves before any `CHANGE` step (`README.md`'s loop) begins.
Per `EVALUATION_RUBRIC.md` rule 3, each phase should still be broken into single-objective
iterations at execution time, not implemented as one sweeping change.

| Phase | Scope | Depends on | Complexity |
|---|---|---|---|
| **A — Content / structure** | Remove TrustBadges, Innovation, Sam testimonial; resolve Salesforce presentation (3 locations); reorder sections per the blueprint; restructure Services around the real 4-platform catalog; fix Data Migration/E-Commerce dead-links; restructure the Maxvill case study copy (Challenge→Solution→Technology→Outcome) | Human resolution of the Business Facts Requiring Confirmation table (Section 3) — **the actual blocking dependency for this entire phase** | **Medium.** Mostly deletion, reordering, and copy restructuring of already-verified content — low technical risk, but blocked on human sign-off for every fact-dependent item. |
| **B — Visual design** | Design the new Technology Ecosystem Visual's exact composition (desktop + mobile); design the restructured Services grid's platform-grouped layout; design the case study's new CTA treatment | Phase A's content decisions (can't finalize a diagram's stages until Section 2's positioning chain is confirmed as final copy) | **Medium-high.** The ecosystem visual specifically requires real design iteration, not just a token/component change. |
| **C — Visual assets** | Build the actual Technology Ecosystem Visual diagram (SVG/component, reusing `EcosystemOrbit`'s and the visibility-chain's existing visual language per Section 6) | Phase B | **Medium.** No new imagery sourcing needed (no photography, no stock, no AI-generation) — this is custom diagram/component build work using patterns already proven in the codebase. |
| **D — Motion** | Implement the staggered-reveal animation for the new ecosystem visual; implement the case-study CTA micro-interaction; verify reduced-motion behavior for both | Phase C | **Low.** Reuses the existing `Reveal`/`IntersectionObserver` pattern already proven across the site — not a new motion system. |
| **E — Responsive** | Build and verify the mobile-specific compositions for the restructured Services grid and the new ecosystem visual (Section 9) | Phases B-D | **Medium.** Two genuinely new mobile compositions needed (not just reflow); everything else in the blueprint inherits already-proven responsive patterns. |
| **F — Validation** | Full re-run of the existing Stage 3 tooling (screenshots, axe-core, Lighthouse, health checks) against the new homepage; before/after comparison against `RENDERED-BASELINE.md` and the Workstream 1/2 results; human review against this blueprint and `EVALUATION_RUBRIC.md` | All prior phases | **Low** (tooling already exists and is proven — Stage 3/Workstream 1-2 established the exact process this phase reuses). |

**Not included in any phase above, and out of scope for this plan:** the
`/services/zoho-bundled-suite` design-fork decision (a separate, already-flagged decision
in `DESIGN_SYSTEM.md` and `WORKSTREAM-02-RESULT.md`, not a homepage concern), any change
to page URLs, and any business-fact change that hasn't gone through the
`BUSINESS_FACTS.md` update + human approval process first.

---

## 13. Success Criteria

Measurable, evidence-checkable per `EVALUATION_RUBRIC.md`'s standard ("looks good = 90"
is not a valid score):

1. **Positioning clarity within 10 seconds** — a first-time visitor can state what
   VectorWave does, who it helps, and one reason to trust it, using only Hero content.
   Checkable via the same first-time-buyer-lens walkthrough `STAGE-2-BASELINE-REVIEW.md`
   Step 11 already used.
2. **Zero unverified claims remain on the homepage** — every stated fact traces to a
   `BUSINESS_FACTS.md` entry. Checkable via a claim-by-claim cross-check (the same method
   `EVALUATION_RUBRIC.md`'s Trust/Proof category already specifies).
3. **No internally contradicting statistics** — the 50+/15 projects contradiction
   specifically must not exist anywhere the new homepage links to or echoes.
4. **CTA hierarchy has no more than one generic "Book free consultation" repeat beyond
   the Hero/Final-CTA bookend** — the Case Study CTA must be measurably distinct in
   wording from the other two.
5. **Trust/Proof category score improves from the 48/100 baseline** — re-scored via
   `EVALUATION_RUBRIC.md` after implementation, logged in `CHANGELOG.md` per the existing
   `BASELINE → ITERATION → NEW SCORE` convention.
6. **Section count reduction (13→9) does not reduce total real information conveyed** —
   verifiable by confirming every piece of content in a removed section is either (a)
   genuinely redundant with a kept section (documented in `HOMEPAGE-CURRENT-STATE.md`) or
   (b) unverifiable and therefore correctly removed, not lost real information.
7. **Global design-token consistency** — no new hard-coded color/font introduced outside
   `DESIGN_SYSTEM.md`'s current or approved-target tokens (the new Technology Ecosystem
   Visual must use existing tokens/components, per `EVALUATION_RUBRIC.md`'s Visual Design
   and Brand Consistency categories).
8. **Mobile quality** — the two genuinely new mobile compositions (ecosystem visual,
   restructured services grid) pass the same screenshot-based review process already
   proven in Stage 3/Workstream 2, at all 5 standard viewports.
9. **Accessibility** — zero new axe-core violations introduced (current baseline: 2
   violations sitewide, both already out-of-scope/pre-existing per `WORKSTREAM-02-RESULT.md`);
   the new diagram and CTA micro-interaction both verified `prefers-reduced-motion`-safe.
10. **Performance** — no new render-blocking asset, no new font, no new dependency
    introduced by the new diagram component, per `EVALUATION_RUBRIC.md`'s Performance
    category evidence requirement (build-output size diff).
11. **Enterprise visual maturity** — re-run the same "senior enterprise product designer"
    review lens `WORKSTREAM-02-RESULT.md` Section 13 already used, expecting a "yes"
    answer to each of its questions specifically informed by this plan's changes (does
    removing decorative trust elements and adding real proof placement move the site from
    "professional technology consultancy" (C) measurably toward "premium enterprise" (D),
    per `STAGE-2-BASELINE-REVIEW.md` Step 5's rating scale).
12. **Clear relationship between capabilities** — a visitor can explain, after viewing the
    Technology & Industry section alone, how Zoho/Odoo/Microsoft Dynamics 365 relate to
    Integration/Automation/Custom Development, without needing to read the Services
    section separately — the specific comprehension goal the new ecosystem visual
    (Section 6) exists to serve.

---

## Summary for review

- **Current homepage assessment:** structurally competent (13 sections, working motion,
  working responsive patterns, a real design-token foundation from Workstreams 1-2), but
  undermined by unverified claims in its two most-visible locations (Hero, TrustBadges)
  and by under-leveraging its one genuinely strong trust asset (the Maxvill case study).
  Consistent with `STAGE-2-BASELINE-REVIEW.md`'s "C — professional technology consultancy,
  not yet D — premium enterprise" rating.
- **Proposed structure:** 9 sections (down from 13), reordered to front-load
  problem-recognition and move proof earlier, per `HOMEPAGE-INFORMATION-ARCHITECTURE.md`.
- **Major changes:** case study restructured and repositioned; Services section
  restructured around the real platform catalog; a new Technology Ecosystem Visual added;
  3 sections removed.
- **What will be preserved:** Hero's headline/CTA structure and `EcosystemOrbit` visual,
  `BusinessDiagnosis` entirely unchanged, `ProcessChains` entirely unchanged,
  `TechnologyAndIndustry`'s tab content and "we recommend based on requirements" copy,
  `WhyVectorWave`'s differentiation content, the Final CTA's structure, all existing
  reduced-motion/accessibility work from Workstreams 1-2.
- **What will be removed:** TrustBadges (decorative/duplicate/unverified), the standalone
  PartnerLogos marquee (inaccurate platform representation), Innovation (generic filler),
  the "Sam" testimonial (unverifiable) — pending human verification per Section 3's table.
- **What will be added:** a Technology Ecosystem Visual (Section 6), a contextual CTA
  attached to the case study, one line of substance per "How We Work" step.
- **Image requirements:** none beyond the one new custom diagram (Section 6) — no
  photography, no stock imagery, no AI-generated imagery anywhere in this plan.
- **Motion requirements:** one new staggered-reveal animation (the ecosystem visual) and
  one new subtle CTA-reveal micro-interaction, both reusing the existing `Reveal`
  primitive and both `prefers-reduced-motion`-safe by construction.
- **Business facts requiring confirmation:** 6 items (Section 3 table) — Zoho partner
  status, the 50+/15 project-count contradiction, Salesforce capability (appearing in 3
  homepage locations), the Sam testimonial, the Shopify/React/NetSuite/Tally logo set,
  and the brand accent-color/light-vs-dark direction. **Phase A cannot fully complete
  until these are resolved.**
- **Estimated implementation complexity:** Medium overall — Phase A (content/structure) is
  low-technical-risk but human-approval-blocked; Phase B/C (visual design/assets) is the
  genuinely new-design-work phase (the ecosystem visual); Phases D-F (motion, responsive,
  validation) are low-risk because they reuse patterns and tooling already proven in
  Workstreams 1-2 and Stage 3.
