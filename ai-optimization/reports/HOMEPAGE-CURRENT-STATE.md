# Homepage Current-State Audit

**Date:** 2026-08-20
**Scope:** Section-by-section review of the live homepage (`app/(site)/page.tsx`), all 13
section components it renders, their sub-components, and the persistent `Header`. No
website source file was modified to produce this report.

**Method:** Direct source read of every section component + `Header.tsx` +
`EcosystemOrbit.tsx` + `lib/services.ts` + `lib/industries.ts`, cross-checked against
`ai-optimization/screenshots/workstream-02/{desktop,mobile}/homepage-*.png` (the current,
post-Workstream-2 rendered state) and every governance file (`BUSINESS_FACTS.md`,
`BRAND_GUIDELINES.md`, `DESIGN_SYSTEM.md`, `DESIGN_BENCHMARKS.md`, `BASELINE.md`,
`STAGE-2-BASELINE-REVIEW.md`, `RENDERED-BASELINE.md`, `WORKSTREAM-01-RESULT.md`,
`WORKSTREAM-02-RESULT.md`).

**Action key:** KEEP / REFINE / RESTRUCTURE / REPLACE / REMOVE / ADD — per the Core Rule:
do not redesign something merely because it can be redesigned. Every action below has to
earn its classification with a specific reason.

**Render order today:** Hero → TrustBadges → PartnerLogos → ProcessChains →
BusinessDiagnosis → Services → TechnologyAndIndustry → Process → WhyVectorWave →
Innovation → Testimonial → VideoTestimonial → CTA → (global) Footer.

---

## Context note: the persistent Header

Not a homepage section, but it directly shapes the homepage's first five seconds and its
CTA economy, so it's noted here rather than re-litigated per section:

- Desktop: dark utility bar (phone, email, LinkedIn/Instagram) + logo + nav + language
  switcher + **"Book a call"** (`.btn-primary`) — a fifth CTA moment before the page body
  even starts.
- Mobile: hamburger menu; phone/email now duplicated into the mobile menu (Workstream 2
  fix) — a real, confirmed-fixed prior gap.
- Now `sticky` everywhere (Workstream 2 fix, was `fixed` on homepage only) — the
  fixed/sticky inconsistency flagged in `BASELINE.md` is resolved; no homepage action
  needed here.
- **Relevant to this audit:** the header's own "Book a call" means the homepage hero's
  two CTAs are really a 2nd and 3rd CTA moment, not the first. See the Conversion
  Strategy section of `HOMEPAGE-MASTER-PLAN.md` for how this shapes CTA hierarchy.

---

## 1. Hero (`components/sections/Hero.tsx`)

| | |
|---|---|
| **Purpose** | Communicate what VectorWave does, for whom, and what to do next, within ~5-10 seconds. |
| **Current content** | Eyebrow badge: *"Zoho Authorised Partner · ERP · CRM · Web and AI Solutions"*. Typewriter H1: *"Powering Intelligent Business Flow, without the overhead."* Sub-copy: one sentence naming Zoho, Odoo, CRM automation, web dev, AI. Two CTAs: "Book free consultation" (primary) / "See our services" (secondary). Two animated counters: "50+ Projects delivered", "12 Industries served". `EcosystemOrbit` diagram on the right (Zoho, Odoo, Finance, Web Dev, AI, Microsoft 365 as orbiting nodes). |
| **Visual treatment** | Dark (`bg-ink-inverse`) full-bleed panel, subtle grid pattern, `HoverGlow` cursor-follow effect, gradient-text accent on "Business Flow," `Typewriter` character animation. |
| **UX role** | First impression; sets positioning (ERP/CRM implementation, not generic web dev) immediately via the eyebrow + H1 + orbit diagram combination. |
| **Strengths** | The `EcosystemOrbit` diagram is genuinely good — a real, custom, technical visual (not stock/decorative) that shows *what VectorWave actually touches*, matching `DESIGN_BENCHMARKS.md`'s "show substance up front" hero pattern. Headline is specific to the business (not generic "digital transformation" filler). CTA hierarchy is clear (one primary, one secondary, no competing third). |
| **Weaknesses** | **The eyebrow badge asserts "Zoho Authorised Partner" and the counter asserts "50+ Projects delivered" — both flagged UNVERIFIED in `BUSINESS_FACTS.md`, and the "50+" figure directly contradicts the About page's "15 Projects Completed."** This is the single most visible location on the entire site carrying two of the site's least-defensible claims. `Typewriter`'s reduced-motion gap is already fixed (Workstream 1); no residual accessibility issue here. |
| **Redundancy** | The "Book free consultation" CTA is the 2nd–3rd instance a visitor sees after the Header's "Book a call" (desktop) — not wrong, but worth being deliberate about in the CTA strategy (see Master Plan). |
| **Conversion value** | High — correct CTA hierarchy, above the fold. |
| **Trust value** | **Currently negative-leaning** — an unverifiable partner badge and a contradicted stat sitting in the most-seen location on the site actively work against the "trustworthy" brand personality target the moment a careful visitor checks them against the About page. |
| **Recommended action** | **REFINE.** Keep the structure, the `EcosystemOrbit` visual, the headline, and the CTA hierarchy — all genuinely strong. Replace the "Zoho Authorised Partner" badge text and the "50+ Projects delivered" counter with content backed by `BUSINESS_FACTS.md`, or hold both pending human verification (see Business Facts Requiring Confirmation in the Master Plan). Do not invent a replacement number — better to show one verified stat (e.g. "12 Industries served," already real) alone than two stats where one is contradicted elsewhere on the site. |

---

## 2. TrustBadges (`components/sections/TrustBadges.tsx`)

| | |
|---|---|
| **Purpose** | Reinforce credibility immediately below the hero via a scrolling badge strip. |
| **Current content** | Marquee loop of 4 pill badges: "Zoho Authorised Partner," "24x7 Live Support," "Result Oriented Projects," "Experienced Professionals." |
| **Visual treatment** | Auto-scrolling marquee, light background, small icon+label pills. |
| **UX role** | A second, immediate trust signal directly under the Hero. |
| **Strengths** | Technically clean implementation (CSS marquee, respects reduced-motion globally). |
| **Weaknesses** | **This is exactly the "decorative trust badge wall" pattern `DESIGN_BENCHMARKS.md` and `BRAND_GUIDELINES.md` both flag as losing effectiveness with 2026 B2B buyers.** Three of the four badges are vague, unverifiable marketing language with no evidence anywhere in `BUSINESS_FACTS.md` ("Result Oriented Projects," "Experienced Professionals," "24x7 Live Support" — the latter contradicted by the confirmed real business hours, Mon–Fri 9:30–6:30 IST, elsewhere in `BUSINESS_FACTS.md`). The badge repeats the same unverified "Zoho Authorised Partner" claim the Hero already makes, one scroll-length later. |
| **Redundancy** | **Direct content redundancy with the Hero's own eyebrow badge** ("Zoho Authorised Partner" appears in both, back to back). Structurally redundant with `PartnerLogos` immediately below it — two consecutive marquee strips before any real content section. |
| **Conversion value** | Low — doesn't move a visitor toward a decision, just fills space between Hero and the first content section. |
| **Trust value** | **Negative.** Per current 2026 research (`DESIGN_BENCHMARKS.md`, "Trust / proof sections"), a wall of unverifiable badges directly under an already-unverified hero claim compounds the credibility problem rather than solving it — this is the single clearest example of the site's Trust/Proof weakness (48/100 baseline) made visible in one component. |
| **Recommended action** | **REMOVE.** Not "refine the wording" — remove the section entirely. It duplicates the Hero's claim, stacks three more unverifiable claims immediately after it, and consumes a full scroll-length of a first-time visitor's limited attention with decoration instead of the specific, attributed proof `BRAND_GUIDELINES.md` calls for. If a future verified fact (e.g., a confirmed partner status with a real badge asset) becomes available, it belongs *inline near the claim it supports* (e.g., next to the Zoho platform card), not as a standalone marquee. |

---

## 3. PartnerLogos (`components/sections/PartnerLogos.tsx`, `reverse` prop on homepage)

| | |
|---|---|
| **Purpose** | Show the technology ecosystem VectorWave works with. |
| **Current content** | Marquee of 7 logos: Zoho, Odoo, Microsoft Dynamics 365, **Shopify, React, NetSuite, Tally**, under the eyebrow "Trusted technology partners." |
| **Visual treatment** | Logo marquee, reverse-direction from the Header's implicit expectation, pausable on hover. |
| **Strengths** | Uses real logo assets, not stock imagery. Motion pattern (marquee, pause-on-hover) is technically sound and reduced-motion-safe. |
| **Weaknesses** | **A positioning accuracy problem, not just a visual one.** Of the 7 logos: Zoho, Odoo, and Microsoft Dynamics 365 match the 3 ERP/CRM platforms in `BUSINESS_FACTS.md`. **Shopify, React, NetSuite, and Tally do not correspond to any of the 19 confirmed services or 4 confirmed platforms.** React is a frontend library VectorWave presumably builds *with*, not a "technology partner" in the vendor-relationship sense the eyebrow text implies. NetSuite is a competitor ERP, not a listed service. Tally is the system the Maxvill case study explicitly *migrated away from* — showing it in a "trusted technology partners" strip actively contradicts its own case study's narrative. This is the label "Trusted technology partners" being applied to a mix of real implementation platforms, a dev framework, a competitor product, and a legacy system being replaced — exactly the kind of unattributed claim `BUSINESS_FACTS.md`'s strict rule exists to prevent. |
| **Redundancy** | Zoho, Odoo, and Microsoft Dynamics 365 already appear in `TechnologyAndIndustry`'s ecosystem list and `TechPlatformTabs` — this section adds three more, unrelated logos rather than adding new information. |
| **Conversion value** | Low. |
| **Trust value** | **Actively risky** — a careful enterprise buyer (procurement, technical evaluator) who recognizes NetSuite as a competitor or notices Tally's contradiction with the case study directly below will read this as sloppiness, undermining exactly the "precise" personality trait `BRAND_GUIDELINES.md` targets. |
| **Recommended action** | **RESTRUCTURE.** Do not remove technology-ecosystem communication from the homepage — that's genuinely useful positioning content and `TechnologyAndIndustry` already does it better with real fit/coverage information. Remove this specific marquee and either (a) fold Zoho/Odoo/Dynamics 365 logos into the `TechnologyAndIndustry` section as visual reinforcement of the tab content that's already there, or (b) if React/Shopify/NetSuite/Tally involvement is real and confirmable (e.g., "we build on React," "we've migrated clients off Tally"), reframe them accurately — never under an unqualified "trusted technology partners" claim. Flagged for human confirmation: which of the 4 non-platform logos represent real, statable capabilities vs. should be dropped. |

---

## 4. ProcessChains — "How we think" (`components/sections/ProcessChains.tsx` + `ProcessChainTabs.tsx`)

| | |
|---|---|
| **Purpose** | Establish VectorWave's differentiated approach: process-first, not software-first. |
| **Current content** | Eyebrow "How we think." H2: *"We don't start with software. We start with how your business works."* Interactive tab-switcher across 4 business processes (Order to Cash, Procure to Pay, Inventory, Manufacturing), each rendering as a connected chain of steps (e.g. Lead → Opportunity → Quote → Sales Order → Fulfillment → Invoice → Collection → GL). |
| **Visual treatment** | Light `surface-alt` band, icon tab buttons, animated flow-arrow chain reveal on tab switch. |
| **UX role** | Positioning/differentiation — this is where the site earns the "technical, precise" personality trait rather than just asserting it. |
| **Strengths** | Genuinely distinctive content — most implementation-partner sites don't show this level of process specificity. Directly supports `BRAND_GUIDELINES.md`'s illustration philosophy ("prefer custom process diagrams that explain how the work actually looks... shows understanding rather than asserting it"). Clean, purposeful motion (staggered chain reveal tied to a real interaction, passes the Motion Guidelines test). |
| **Weaknesses** | None structural. The section header ("How we think") sits close in the page flow to `Process` further down ("How we work") — see Redundancy. |
| **Redundancy** | **Naming/conceptual overlap with the `Process` section** (item 8 below) — "How we think" vs. "How we work" are easy to conflate on a first read, even though their content is genuinely different (business-process chains vs. engagement/project process). |
| **Conversion value** | Medium — builds credibility that supports later conversion rather than driving it directly. |
| **Trust value** | High — this is real, specific, checkable-by-a-technical-buyer content, not a claim. |
| **Recommended action** | **KEEP**, content and interaction unchanged. **REFINE** only the section's relationship to `Process` — see Information Architecture recommendation to separate these more clearly in sequence and/or heading language so they don't read as two attempts at the same idea. |

---

## 5. BusinessDiagnosis — "Where business systems break down" (`components/sections/BusinessDiagnosis.tsx`)

| | |
|---|---|
| **Purpose** | Problem-first framing before any solution is presented — let the visitor self-identify with a specific pain point. |
| **Current content** | Accordion of 5 diagnostic statements in the visitor's own voice (e.g. *"Critical processes still run through Excel"*), each expanding to Diagnosis / Business impact / Possible system response. |
| **Visual treatment** | Minimal, text-forward, light background, `Plus`-icon rotate on expand. |
| **UX role** | CRO pattern: problem-first framing before solution, explicitly called out as a strength in `STAGE-2-BASELINE-REVIEW.md` Step 11. |
| **Strengths** | This is the single best CRO-pattern section on the current homepage — specific, relatable, non-generic pain points; each one maps cleanly to a real service category without hard-selling. Accessible accordion (`aria-expanded`, keyboard-operable native button). |
| **Weaknesses** | None found. |
| **Redundancy** | None. |
| **Conversion value** | High — this is where a visitor starts self-qualifying ("that's us"). |
| **Trust value** | Medium-high — demonstrates domain understanding without requiring third-party proof. |
| **Recommended action** | **KEEP**, unchanged. This is exactly the kind of section the Core Rule exists to protect from unnecessary redesign. |

---

## 6. Services (`components/sections/Services.tsx`)

| | |
|---|---|
| **Purpose** | Show the breadth of what VectorWave delivers. |
| **Current content** | 10-card grid: Zoho Bundle Suite, Zoho Sales, IT & Support, Finance & Accounting, Human Resources, Data Migration, Web Development, E-Commerce, Artificial Intelligence, App Development. |
| **Visual treatment** | Uniform 1→2→3-column card grid, now using the shared `Card`/`CardIcon` components (Workstream 2). |
| **UX role** | Capability overview / entry point into the services catalog. |
| **Strengths** | Uses the new shared `Card` component consistently (Workstream 2 foundation work). Cards link out to real service pages where slugs exist. |
| **Weaknesses** | **This 10-card list is neither the full catalog nor a clearly curated subset — it's an inconsistent middle ground.** `BUSINESS_FACTS.md` confirms 19 real services across 4 platforms (5 Zoho, 5 Odoo, 5 Microsoft 365, 4 Custom Development); this grid shows a Zoho-heavy mix (2 explicit Zoho services + "IT & Support"/"Finance & Accounting"/"HR" which read as platform-agnostic but are actually Zoho service slugs) plus 4 custom-dev items, with **zero Odoo and zero Microsoft 365 services represented at all**. "Data Migration" has no `slug` (dead-end card, not a real service page). "E-Commerce" and "Web Development" both point to the same `/services/web-development` slug — two cards for one destination. This uniform grid is also the exact pattern `DESIGN_BENCHMARKS.md`'s bento-grid research flags as worth evaluating: 19 services (or even this 10-item subset) in one equal-weight grid doesn't visually communicate the Zoho/Odoo/Microsoft 365/Custom Development structure that actually organizes the business. |
| **Redundancy** | Two cards (E-Commerce, Web Development) resolve to the same URL. |
| **Conversion value** | Medium, undercut by the Data Migration dead-end and the duplicate destination. |
| **Trust value** | Neutral-to-negative — an attentive visitor comparing this grid to the header's mega-menu (which correctly shows all 4 platforms) will notice the homepage's version is incomplete/inconsistent, a small but real "this site wasn't finished" signal, the same category of issue Workstream 2 fixed for the header itself. |
| **Recommended action** | **RESTRUCTURE.** Reorganize around the real 4-platform structure (Zoho / Odoo / Microsoft 365 / Custom Development) so the section accurately represents the business rather than an arbitrary 10-item subset — a bento-style or platform-grouped layout (per `DESIGN_BENCHMARKS.md`'s cautious "adapt" verdict) is worth evaluating specifically because it can show 4 unequal-weight platform groups rather than forcing 19 services into one uniform grid. Fix the Data Migration dead-link and the E-Commerce/Web-Development duplicate regardless of the broader restructure — those are correctness bugs, not design decisions. |

---

## 7. TechnologyAndIndustry (`components/sections/TechnologyAndIndustry.tsx` + `TechPlatformTabs.tsx` + `IndustryTabs.tsx`)

| | |
|---|---|
| **Purpose** | Two-part positioning section: which technology platform fits which need, and which industries VectorWave has real process experience in. |
| **Current content** | Left: `TechPlatformTabs` — 5 platform tabs (Zoho "Flagship," Microsoft Dynamics 365, **Salesforce**, Odoo, AI & Custom Technology), each with coverage tags and a "best for" fit statement. Right: `IndustryTabs` — 13 industries (from `lib/industries.ts`), each with model/key-processes/visibility/signature-process detail. Below both: a confidentiality statement ("we showcase industry experience rather than publishing sensitive client information"), an ecosystem name marquee (Zoho, Microsoft Dynamics 365, **Salesforce**, Odoo, AI & Automation, Custom Technology), and a "Data isn't the finish line" visibility-chain block with 5 rhetorical questions. |
| **Visual treatment** | Dark (`bg-ink-inverse`) full-bleed section, `HoverGlow`, two-column tab layout, animated fade-in on tab switch. |
| **UX role** | The section that should answer "does this apply to my business/industry?" and "which platform is right for us?" |
| **Strengths** | The `TechPlatformTabs`' explicit "best for" framing per platform is genuinely useful buyer-facing content (helps self-selection). The 13-industry depth (`lib/industries.ts`) is real, specific data, not filler — each industry has a distinct model/process-chain, not a reworded template. The closing line *"We recommend the platform based on business requirements, not on which one we'd rather sell"* is a strong, specific trust statement, unusually candid for a vendor site. |
| **Weaknesses** | **Salesforce appears here twice** (in `TechPlatformTabs`'s 5-platform list and again in the ecosystem marquee) **as a full, equal-weight platform with its own coverage tags ("Sales Cloud, Service Cloud, Marketing Cloud") and fit statement — but `BUSINESS_FACTS.md` confirms zero Salesforce service pages or supporting content exist anywhere on the site.** This is the single largest positioning-accuracy risk on the homepage: a visitor interested in Salesforce will read specific, confident capability claims and find nothing to back them anywhere else on the site. This is a homepage-specific instance of a site-wide flagged issue (`BUSINESS_FACTS.md`), but it is the most detailed and most confident presentation of that unverified claim anywhere on the site. |
| **Redundancy** | The ecosystem marquee repeats the same 6 names `TechPlatformTabs` already lists individually with far more detail one screen-scroll above it — low incremental value. |
| **Conversion value** | Medium-high (the "best for" self-selection framing genuinely helps a buyer place themselves) — undercut by the Salesforce risk. |
| **Trust value** | High where content is real (industries, Zoho/Odoo/Dynamics 365 fit statements, the "we don't sell what doesn't fit" line); **actively risky** on the Salesforce claim specifically. |
| **Recommended action** | **REFINE.** This section's structure, the "best for" framing, and the 13-industry depth are strong and should be preserved and, per the Master Plan's positioning architecture, elevated rather than diminished. Remove or clearly re-scope the Salesforce entry in both `TechPlatformTabs` and the ecosystem marquee pending human confirmation (`BUSINESS_FACTS.md` open question #3) — do not present coverage tags/fit copy for a platform with no supporting evidence anywhere else on the site. The ecosystem marquee itself is a candidate for removal as redundant with the tabs directly above it (**REMOVE** the marquee specifically, not the section). |

---

## 8. Process — "How we work" (`components/sections/Process.tsx`)

| | |
|---|---|
| **Purpose** | Show the engagement process at a glance: Discover → Design → Build → Support. |
| **Current content** | 4 numbered steps in a horizontal (desktop) / vertical (mobile) connector layout, no supporting copy per step beyond the single-word label. |
| **Visual treatment** | Light `surface-alt` band, simple numbered circles connected by a line, hover scale+color change. |
| **UX role** | A lightweight "what happens after I book a call" preview. |
| **Strengths** | Simple, scannable, doesn't overstay its welcome. |
| **Weaknesses** | Thin relative to its neighbors — single-word labels with zero elaboration sit between two much richer sections (`TechnologyAndIndustry` above, `WhyVectorWave` below), making it feel like a placeholder rather than a considered section. As noted in item 4, its "How we work" label is easily conflated with `ProcessChains`' "How we think" earlier on the same page. |
| **Redundancy** | Conceptual overlap with `ProcessChains` (see item 4) — two different ideas ("how we approach your business processes" vs. "our project delivery stages") that read as similar on a skim. |
| **Conversion value** | Low-medium — reduces uncertainty about "what happens next," which matters for a considered B2B purchase, but doesn't currently do enough work to justify its position between two content-rich sections. |
| **Trust value** | Low — a label without elaboration doesn't build confidence on its own. |
| **Recommended action** | **REFINE.** Keep the underlying idea (a visible engagement process reduces buyer uncertainty, a real CRO need for a considered purchase) but add one short line of substance per step, and reconsider its position/heading relative to `ProcessChains` so the two don't read as redundant. See the Master Plan's information architecture for a proposed reordering that separates "how we think about your business" (early, positioning) from "what working with us looks like" (later, closer to the final CTA, where "what happens next" is most relevant). |

---

## 9. WhyVectorWave (`components/sections/WhyVectorWave.tsx`)

| | |
|---|---|
| **Purpose** | Differentiate VectorWave from a generic software configurator — "technology partners configure software, we design business systems." |
| **Current content** | 4 numbered statements, each with a visual process chain (transaction flow, operating-model flow, management-layer flow, platform-agnostic chain: Zoho \| Odoo \| Dynamics 365 \| **Salesforce** \| Custom Technology). |
| **Visual treatment** | Light section, 2-column grid, chain-of-pills visual per item, matching `ProcessChains`' visual language. |
| **Strengths** | Point #3 (management-layer dashboards "built with a team that includes financial and data analysts") is a specific, checkable operational claim rather than marketing language — a genuine differentiator statement. Point #4's "we don't lock you into one platform" is consistent with, and reinforces, `TechPlatformTabs`' "we recommend based on requirements" line — a coherent through-line across two sections. |
| **Weaknesses** | **Salesforce appears a third time on this same homepage** in item #4's chain — same unverified-claim risk as item 7, now appearing in three separate homepage locations (`TechnologyAndIndustry`'s tabs, its ecosystem marquee, and here). Section title "WhyVectorWave" is generic/internal-sounding as an on-page heading concept even though the rendered H2 copy itself ("Technology partners configure software. We design business systems.") is good — the component name isn't user-facing, so this is a minor internal-clarity note only, not a visitor-facing issue. |
| **Redundancy** | Visual pattern (chain-of-pills) is the third instance of the same interaction/visual idea on this homepage (after `ProcessChains` and the visibility-chain in `TechnologyAndIndustry`) — individually fine, collectively risks feeling like one repeated device rather than three distinct ones. |
| **Conversion value** | Medium — reinforces differentiation right before the closing proof/CTA sequence. |
| **Trust value** | High content (points 1-3), same Salesforce risk as above on point 4. |
| **Recommended action** | **REFINE.** Strong differentiation content — keep it. Resolve the Salesforce reference consistently with items 7's recommendation (same underlying fact, same fix, applied everywhere it appears). Consider varying the visual treatment of at least one of the three chain-of-pills sections in a future visual pass so the device doesn't repeat three times identically — a Motion/Visual Design note, not a content problem. |

---

## 10. Innovation (`components/sections/Innovation.tsx`)

| | |
|---|---|
| **Purpose** | Appears to function as a mid-page secondary CTA band. |
| **Current content** | H2 "Innovate digitally," one generic sentence about replacing spreadsheets with "one clean, connected ERP and CRM setup," and an "Explore more" link to `/services`. |
| **Visual treatment** | Dark full-bleed band, centered text, bordered outline-button CTA. |
| **Strengths** | Visually breaks up the page rhythm (dark band between two light sections) — a legitimate pacing function. |
| **Weaknesses** | **The copy is generic marketing language** ("innovate digitally") of exactly the kind `BRAND_GUIDELINES.md` warns against, in contrast to nearly every other section on this page, which is specific and technical. The CTA label "Explore more" is exactly the vague pattern `BRAND_GUIDELINES.md`'s CTA philosophy explicitly calls out to avoid ("Learn more," "Get started" vs. "Book a call," "Talk to us"). Content-wise this section says nothing that `ProcessChains`, `BusinessDiagnosis`, or `WhyVectorWave` haven't already said more specifically. |
| **Redundancy** | **This is the weakest, most generic section on the page, and it sits between two much stronger sections** (`WhyVectorWave` above, `Testimonial`/`VideoTestimonial` below) that both make more specific points. It functions as a filler transition rather than adding information. |
| **Conversion value** | Low — a vague CTA to a destination (`/services`) the visitor has already been offered explicitly in the Hero ("See our services") and the Header ("Services" nav item, mega-menu). |
| **Trust value** | Neutral-to-negative — generic copy in an otherwise specific, technical page reads as filler, undercutting the "precise" personality trait by contrast with its neighbors. |
| **Recommended action** | **REMOVE.** If a visual pacing break (dark band between light sections) is still wanted at this point in the page, it should carry a genuinely differentiated message (e.g., positioned as a mid-page CTA tied to a specific message — see Conversion Strategy in the Master Plan for what should replace it), not a restatement of the "Book a call"/"See services" choice already offered twice above it. |

---

## 11. Testimonial (`components/sections/Testimonial.tsx`)

| | |
|---|---|
| **Purpose** | Social proof via a leadership quote. |
| **Current content** | Quote: *"I don't believe in customer satisfaction, it sets the bar too low. Customers should be truly delighted by the solutions we deliver."* — attributed to "Sam, Founder & CEO." |
| **Visual treatment** | Minimal, centered, italic quote styling. |
| **Strengths** | None beyond visual polish — the styling itself is clean and consistent with the rest of the site. |
| **Weaknesses** | **This is the exact testimonial `BUSINESS_FACTS.md` flags as unverifiable: no company name given, cannot be confirmed as a real, permission-given testimonial.** The quote is also generic (a philosophy statement about customer delight, not a specific, checkable claim about VectorWave's work) — the opposite of what makes the Maxvill testimonial immediately following it credible. |
| **Redundancy** | **Sits directly before `VideoTestimonial` (the one real, verified case study)** — placing the site's least-credible proof element immediately in front of its most-credible one actively undercuts the real one by association and forces a skeptical visitor to mentally discount both. |
| **Conversion value** | Low, likely negative — an unverifiable quote weakens rather than strengthens the trust sequence a buyer is moving through at exactly the point (right before the final CTA) where trust matters most. |
| **Trust value** | **Negative** per `BUSINESS_FACTS.md`'s explicit flag and `BRAND_GUIDELINES.md`'s trust philosophy ("never state a claim without evidence... soften or remove rather than inventing backing"). |
| **Recommended action** | **REMOVE**, pending human verification. If "Sam, Founder & CEO" is a real, permission-given testimonial with a confirmable company, it can return — with the company name added, per `BRAND_GUIDELINES.md`'s "specific, attributed proof" standard — once verified. Until then, per the Case Study Policy, it should not appear as unattributed real proof. This is a direct, homepage-specific application of an already-flagged site-wide finding (`BUSINESS_FACTS.md`, open question #5). |

---

## 12. VideoTestimonial (`components/sections/VideoTestimonial.tsx`) — the Maxvill case study

| | |
|---|---|
| **Purpose** | Present the one genuine, verified case study on the entire site. |
| **Current content** | H2 "Hear it from our clients." A click-to-play video (poster image, 6.7MB video file) with a written quote below: *"VectorWave Technologies streamlined our sales with Zoho CRM and smoothly migrated our accounting from Tally to Zoho Books. Seamless implementation, responsive team - highly recommend!"* — Nikhil, CEO, Maxvill. |
| **Visual treatment** | Light `surface-alt` band, large video player with play-button overlay, quote below. |
| **UX role** | The site's single strongest trust asset — real name, real company, two specific, verifiable deliverables named directly in the quote (Zoho CRM sales setup, Tally→Zoho Books migration). |
| **Strengths** | Genuinely real, specific, attributed — exactly what `DESIGN_BENCHMARKS.md` and `BRAND_GUIDELINES.md` say 2026 B2B buyers respond to. Click-to-play (not autoplay) is good UX and good performance practice for a 6.7MB asset. |
| **Weaknesses** | **Presented as a single testimonial quote, not a case study** — no problem → solution → outcome narrative structure, despite the quote itself containing enough specific detail (CRM setup + accounting migration) to support one. **No adjacent CTA** — a visitor moved by this proof has no "talk to us about a similar migration" or "see how we did this" action attached to it; they have to scroll to the generic closing `CTA` section instead, losing momentum at the exact moment of highest interest. Appears only once, this far down the page — `STAGE-2-BASELINE-REVIEW.md` (Step 9) already flags this as under-leveraged given how much credibility weight it carries alone. |
| **Redundancy** | None — this is the one truly non-redundant proof element on the page. |
| **Conversion value** | Currently underused — high potential, not fully captured without a directly attached CTA. |
| **Trust value** | **The highest of any element on the homepage.** |
| **Recommended action** | **RESTRUCTURE.** Develop into a real, structured case-study treatment (Challenge → Solution → Technology → Implementation → Outcome → CTA, using only what's already verified — no invented metrics or dates) per the Master Plan's Case Study section. Move earlier in the page flow given how much proof-weight it carries (see Information Architecture). Attach a specific, contextual CTA directly to it ("Talk to us about a similar migration," not a repeat of the generic "Book free consultation"). Do not add any detail not already present in the verified quote or confirmed in `BUSINESS_FACTS.md`. |

---

## 13. CTA (`components/sections/CTA.tsx`)

| | |
|---|---|
| **Purpose** | Final, page-closing conversion moment. |
| **Current content** | H2 "Would you like to start a project with us?" One sentence of supporting copy. "Book free consultation" button. |
| **Visual treatment** | Rounded dark card on a light page background, `HoverGlow` border-accent hover state — visually distinct from the full-bleed dark bands used elsewhere (`Hero`, `TechnologyAndIndustry`, `Innovation`), giving it a "final card" identity. |
| **Strengths** | Clear, singular action; visually reads as a deliberate closing moment rather than another full-bleed section, which is good pacing. Consistent CTA mechanism (`BookConsultationButton`), not a second competing "Book a call" implementation. |
| **Weaknesses** | Copy is slightly generic ("start a project," "impactful digital solutions that drive real results") relative to the specificity everywhere else on the page — a missed opportunity to close with the same technical/enterprise specificity the rest of the page earns. |
| **Redundancy** | This is the *appropriate* final instance of the "Book free consultation" CTA already seen in the Hero and (as "Book a call") in the Header — expected repetition at a page's natural close, not a problem in itself. |
| **Conversion value** | High — correctly placed, correct mechanism, singular action. |
| **Trust value** | Neutral. |
| **Recommended action** | **KEEP** structurally. **REFINE** copy only — tighten the headline/subhead toward the same enterprise-specific, buyer-relevant language used in `BusinessDiagnosis` and `ProcessChains`, per the Master Plan's Conversion Strategy (avoid generic "digital solutions" phrasing at the one moment that should feel most conclusive). |

---

## Summary table

| # | Section | Action | Primary reason |
|---|---|---|---|
| — | Header | KEEP | Already fixed (Workstream 2); noted for CTA-economy context only |
| 1 | Hero | REFINE | Strong structure/visual; two unverified claims need resolution |
| 2 | TrustBadges | **REMOVE** | Decorative badge wall, duplicate + unverified claims |
| 3 | PartnerLogos | RESTRUCTURE | Logo set doesn't match real platforms/services |
| 4 | ProcessChains | KEEP | Distinctive, real, well-executed |
| 5 | BusinessDiagnosis | KEEP | Best CRO pattern on the page |
| 6 | Services | RESTRUCTURE | Doesn't represent the real 4-platform/19-service catalog |
| 7 | TechnologyAndIndustry | REFINE | Strong content; Salesforce claim + marquee redundancy |
| 8 | Process | REFINE | Underdeveloped; conceptual overlap with ProcessChains |
| 9 | WhyVectorWave | REFINE | Strong content; shares the Salesforce claim issue |
| 10 | Innovation | **REMOVE** | Generic filler between two stronger sections |
| 11 | Testimonial (Sam) | **REMOVE** (pending verification) | Unverifiable, undercuts the real case study next to it |
| 12 | VideoTestimonial (Maxvill) | RESTRUCTURE | The site's best asset, underdeveloped and under-placed |
| 13 | CTA | KEEP | Correct structure; minor copy refinement only |

**Net effect if all recommendations are adopted:** 13 sections → 10 (two removed outright,
one pending verification), with the strongest existing sections (BusinessDiagnosis,
ProcessChains, TechnologyAndIndustry, VideoTestimonial) preserved or elevated rather than
replaced — consistent with the Core Rule and with `BUSINESS_FACTS.md`/`SAFETY_RULES.md`'s
requirement not to fabricate replacement content for anything removed.

See `HOMEPAGE-INFORMATION-ARCHITECTURE.md` for the resulting narrative order and
`HOMEPAGE-MASTER-PLAN.md` for the full section-by-section blueprint.
