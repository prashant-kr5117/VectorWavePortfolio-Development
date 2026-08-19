# Stage 2 — Comprehensive Baseline Evaluation

**Date:** 2026-08-20
**Scope:** Full source-level review of all indexable routes. No website source file was
modified to produce this report. No packages were installed.
**Method:** Direct source inspection (this session) + three parallel read-only research
passes (SEO/metadata, accessibility/technical, content/visual) verified against the live
codebase, cross-checked against `VectorWave-Site-Audit.md` and the Stage 1 governance
files. Confidence tags follow the audit's convention: **[MEASURED]** read directly from
code, **[OBSERVED]** a consistent pattern across files, **[INFERRED]** a reasonable
conclusion without a live tool run, **[UNKNOWN]** needs a human or a tool this repo
doesn't have yet.

Governing context read and applied: `ai-optimization/README.md`, `BUSINESS_FACTS.md`,
`BRAND_GUIDELINES.md`, `DESIGN_SYSTEM.md`, `EVALUATION_RUBRIC.md`, `SAFETY_RULES.md`,
`MOTION_GUIDELINES.md`, `DESIGN_BENCHMARKS.md`, `BASELINE.md`. No contradictions found —
this report extends those documents with page-level evidence rather than revising them.

**Screenshot testing: blocked.** See `ai-optimization/screenshots/SCREENSHOT-STATUS.md`.
Playwright exists only as an unused `peerDependenciesMeta` reference in
`package-lock.json`, not installed in `node_modules`, not in `package.json`. All findings
below are source-level, not rendered-screenshot-based.

---

## Step 4 — Visual Design Review

### Strong existing patterns
- A real, centralized CSS-variable token system (`app/globals.css:7-59`) that most
  components correctly reference rather than hard-coding values.
- Consistent hover-lift card styling (`rounded-xl/2xl border border-border` +
  `hover:-translate-y-1 hover:shadow-lg`) genuinely reused across 7 files / 14
  occurrences — visually consistent even though it's copy-pasted rather than componentized.
- Header mobile navigation genuinely rethinks itself (nested platform→service menu)
  rather than just shrinking the desktop version — real responsive design craft.
- The `EcosystemOrbit` and `Zoho Ecosystem.png` diagram treatments show the site is
  capable of technical, non-generic visual storytelling when it tries.

### Weak patterns
- **[MEASURED]** `body { font-family: Arial, Helvetica, sans-serif; }`
  (`app/globals.css:69`) overrides the loaded Geist font for essentially all text —
  unchanged since Stage 1, still the single biggest visual-fidelity problem on the site.
- **[MEASURED]** Zero custom `:focus`/`focus-visible` styling anywhere in `globals.css`;
  only 6 `focus:` class occurrences total, both in form/search inputs
  (`ContactForm.tsx`, `BlogGrid.tsx`). Every button, nav link, and tab relies on the
  browser default outline — inconsistent visual polish between elements that clearly got
  design attention (hover states) and keyboard-focus states, which got none.
- **[MEASURED]** No dedicated `Card` component — 14 near-identical card style blocks
  copy-pasted across 7 files. Consistent today by coincidence of careful copy-pasting,
  not by structure.

### Inconsistent patterns
- **[MEASURED]** Header positioning: `fixed` on homepage only, `sticky` everywhere else
  (`components/Header.tsx:42-44`) — unchanged since Stage 1.
- **[MEASURED]** About page container widths mix `max-w-5xl` and `max-w-6xl` across
  adjacent sections with no evident content reason
  (`app/(site)/about/page.tsx:180,204,228,252,332,359`).
- **[MEASURED, new in Stage 2]** `/services/zoho-bundled-suite` is not just a different
  accent color — its `Hero.tsx` sets a near-black background
  (`radial-gradient(..., #0B0E12)`, `app/services/zoho-bundled-suite/_components/Hero.tsx:21`)
  with a `#20C4D9` accent (vs. the shared `#30b6cd`), on a page that otherwise sits inside
  a site that is white/light-surfaced everywhere else. This is a full light-vs-dark theme
  fork, not just a token drift — a materially bigger visual inconsistency than Stage 1's
  framing of "a slightly different teal" suggested.

### Missing patterns
- No dedicated error/loading/not-found pages (`app/error.tsx`, `app/loading.tsx`,
  `app/not-found.tsx` all confirmed absent) — visitors hitting a broken link or slow
  route see Next.js's generic unstyled default, not anything on-brand.
- No shared `Container`/max-width component to prevent the About-page-style drift from
  recurring elsewhere.
- No dedicated error/success color token — the one live form-validation error uses a
  generic, untokenized red.

---

## Step 5 — Premium Enterprise Assessment

**Rating: C — Professional technology consultancy, not yet D (premium enterprise).**

Reasoning, weighed against `BRAND_GUIDELINES.md`'s target personality and
`DESIGN_BENCHMARKS.md`'s current research:

- The site clears "generic freelancer/agency" (A) comfortably — it has a real design
  token system, real structured data, a real CRM-backed lead pipeline, and genuinely
  specific service copy (confirmed in Step 10 below), none of which are typical of a
  freelancer site.
- It also clears "professional implementation company" (B) — the 6-D process framing,
  the technical ecosystem diagrams, and the platform breadth (19 services / 4 platforms)
  signal real operational maturity.
- It sits at **(C) professional technology consultancy** rather than **(D) premium
  enterprise** for three concrete, evidenced reasons:
  1. **Trust/proof is thin and partly unsubstantiated** — an uncertified "Zoho
     Authorised Partner" badge claim, an unnamed award, a testimonial with no company
     name, and two contradicting project-count stats (see `BUSINESS_FACTS.md`).
     Current 2026 B2B research is explicit that this exact pattern — decorative,
     unverifiable trust signals — is what keeps a site from reading as premium/enterprise
     to a buying committee (`DESIGN_BENCHMARKS.md`, "Trust / proof sections").
  2. **Visual execution doesn't match the token system's ambition** — the font bug means
     the site is not even rendering as designed, and the `/services/zoho-bundled-suite`
     page's dark-theme fork reads as two different companies sharing a URL structure.
     Premium enterprise sites are visually unified across every page a buyer might land
     on; this one currently is not.
  3. **Proof depth is below what enterprise buying committees expect** — one real,
     specific case study is genuinely strong, but it's under-surfaced (a single homepage
     section) rather than structurally central to the buyer journey, which current
     research flags as the actual 2026 differentiator for enterprise credibility
     (`DESIGN_BENCHMARKS.md`, "Case studies / proof depth").

None of this requires a redesign to fix — items 1 and 3 are governance/content decisions
(see `BUSINESS_FACTS.md`), and item 2's biggest single lever is the one-line font fix
already flagged as the top recommendation in `BASELINE.md`.

---

## Step 6 — Modern Design Research

Full research output with sources lives in `ai-optimization/DESIGN_BENCHMARKS.md`
(created in Stage 1, still current — no new research was needed to re-verify it,
current findings above cross-check cleanly against those benchmarks). Headline
takeaways applied above: contextual/specific proof beats decorative trust badges;
restrained, purposeful motion is now the industry default, not a novelty; whitespace
functions as a credibility signal for enterprise buyers. Full Adopt/Adapt/Avoid table is
in that file — not duplicated here.

---

## Step 7 — Motion / Transition Review

### Existing animations

| Element | Purpose | Speed/quality | Consistency | Accessibility | Performance risk |
|---|---|---|---|---|---|
| `Reveal` (scroll fade-up) | Progressive content reveal | Smooth, CSS-transition based | Used consistently across nearly every section — the one clean animation primitive in the codebase | Covered by the global `prefers-reduced-motion` CSS rule (`globals.css:236-245`) | Low — IntersectionObserver-based, not scroll-listener based |
| `.btn-shine` hover sweep | Button hover feedback | Subtle, 0.65s, tied to real hover | Consistent on primary CTAs | Covered by reduced-motion CSS rule | Negligible |
| `Typewriter` (headline typing) | Draws attention to hero headline | Character-by-character via `setInterval` | Used on Homepage + About hero | **[MEASURED, new] NOT covered by `prefers-reduced-motion`** — it's a JS `setInterval` effect, not a CSS animation/transition, so the global CSS media query has zero effect on it | Low CPU cost, but a real accessibility gap |
| `Counter` (animated stat count-up) | Draws attention to stats | `setInterval`-driven digit increment | Used on About page stats | **[MEASURED, new] Same gap as Typewriter** — not covered by the CSS reduced-motion rule | Low |
| `EcosystemOrbit` orbit-dash | Diagram motion | CSS keyframe, continuous loop | Homepage only | Covered by CSS reduced-motion rule | Low, but maintains separate hard-coded mobile/desktop size numbers (maintenance note, not a bug) |
| Marquee (partner logos) | Passive logo showcase | 24s linear loop, pauses on hover | Homepage only | Covered by CSS reduced-motion rule | Low |
| Tab active-state transitions (×3 implementations) | Switch panel content | Instant/CSS transition | **Inconsistent**: 3 separate implementations (`TechnologyAndIndustry.tsx`, `ProcessChains.tsx`, `SolutionsTabs.tsx`), none share code, none support arrow-key navigation | See Step 13 — none are fully ARIA-tabs-pattern compliant | Low |

### Where motion COULD improve understanding (not a recommendation to add motion everywhere)

| Section | Current problem | Recommended motion | Purpose | Expected UX benefit | Performance risk | Accessibility consideration | Priority |
|---|---|---|---|---|---|---|---|
| `/services/[slug]` "What's included" tools grid | Static list of tool name + one sentence, no visual sense of how tools relate to each other | Staggered reveal as the grid scrolls into view (reuse existing `Reveal`) | Content, not decoration — helps a scanning reader parse a 5-7 item list as it appears rather than all at once | Slightly better scannability of already-thin content | Negligible (already-proven pattern) | Must respect `prefers-reduced-motion` (already does, since `Reveal` is CSS-based) | P3 |
| Zoho bundled suite's flow-chip diagrams (Hero, Ecosystem, Architecture, CRM sections) | Diagrams are static | Progressive reveal tied to scroll position, revealing each step of the flow in sequence | Storytelling — these diagrams exist specifically to explain a process; sequential reveal reinforces the sequence | Meaningful — matches the audit's own framing that this page's diagrams are its strongest content asset | Low if CSS/IntersectionObserver-based (matches existing `Reveal` pattern) | Must degrade to fully-visible-at-once under reduced motion | P3 (page-fork status must be decided first — see `DESIGN_SYSTEM.md`) |
| `Typewriter`/`Counter` | Not a "where to add motion" case — a **fix**, not a new pattern | N/A — add a `prefers-reduced-motion` check before starting the `setInterval` loop, render the final text/number immediately for those users | Accessibility correctness | Removes a real WCAG gap | None — pure bugfix | Directly addresses SC 2.3.3 / vestibular-motion concerns | **P1** |
| Tab components (×3) | No keyboard arrow-key navigation, inconsistent ARIA | Not new motion — standardize interaction pattern (see Step 13) | Usability + accessibility | Keyboard users can navigate tabs the way screen readers expect | None | Direct accessibility fix | P1/P2 |

No section was found where motion should be **added purely for visual interest** — consistent with `MOTION_GUIDELINES.md`'s "what problem does this solve" test. Every recommendation above ties to a specific comprehension, consistency, or accessibility purpose.

---

## Step 8 — Image / Visual Review

Full page-by-page inventory (13 homepage sections, About, Services index, 3 representative service pages, 23 zoho-bundled-suite components, Blog index, Contact) is documented directly in this report's evidence base; the condensed opportunity list is in
`ai-optimization/reports/DESIGN-OPPORTUNITY-MAP.md`. Headline findings:

- **[MEASURED]** Every image on the site already goes through `next/image` — no raw
  `<img>` tags found anywhere (audit claim reconfirmed).
- **[MEASURED]** Blog cards and blog posts never render a photo — `BlogIcon.tsx` is a
  pure lucide-icon lookup with no `<Image>` path at all, even though `BlogPost.image` is
  a declared-but-always-undefined field in `lib/posts.ts:15`.
- **[MEASURED]** About page's 4 leadership cards render a generic `UserRound` icon
  (`app/(site)/about/page.tsx:269-281`) because `photo` is unset on all 4 entries — and
  because `name` is also unset, the role title itself fills the "name" slot.
- **[MEASURED]** Unused, shippable-weight image assets confirmed by cross-reference
  grep: `src/Banner.png` (754KB), `src/logo.png` (332KB), `src/Logo_oracle.jpg` (8.9KB —
  notable because Oracle isn't a partner claimed anywhere on the site), plus 5 default
  Next.js boilerplate SVGs in `public/`. None of these affect runtime performance (they
  aren't imported by any component, so Next never bundles/serves them), but they are
  repository dead weight.
- **[MEASURED]** Heavy but *used* assets: a 6.7MB testimonial video, a 1.43MB partner GIF,
  a 1.34MB ecosystem PNG, and a 782KB Odoo logo file that only ever renders at ~40px tall
  — Next's image optimizer resizes on the fly, so visitor impact is limited, but source
  weight bloats every build/checkout.

---

## Step 9 — Case Study Review

### The one real case study (Nikhil / Maxvill, `components/sections/VideoTestimonial.tsx`, used once at `app/(site)/page.tsx:53-59`)

- **Presentation:** video + poster image + one-sentence quote + name/role. No written
  narrative structure (no stated business problem → solution → architecture → result
  breakdown), just a single testimonial quote.
- **Story structure:** the quote itself names two concrete deliverables (Zoho CRM sales
  setup, Tally→Zoho Books migration) — genuinely more specific than most testimonials on
  the site, but it is not developed into a full case-study narrative anywhere.
- **Credibility:** highest on the site — real name, real company, real specific project.
  Currently appears in exactly one place (one homepage section).
- **CTA:** none directly attached to this testimonial — a visitor reading it has no
  adjacent "see how we did this" or "talk to us about a similar migration" action.

**Recommendation (not implemented — for a future scoped iteration):** develop this into
a **REAL CASE STUDY** with a proper problem → solution → result structure, sourced only
from what's already verified (the quote content) plus anything the business can add and
verify. Do not add outcome numbers, dates, or scope details not already confirmed in
`BUSINESS_FACTS.md`.

### Where the site needs more proof, and what's allowed

Per the Case Study Policy in `BRAND_GUIDELINES.md`, any additional proof content must be
one of:

| Category | Applies where |
|---|---|
| **REAL CASE STUDY** | Only the Maxvill story — no other real, named client project exists in the codebase to draw from. |
| **SOLUTION STORY** | Could generalize a common problem (e.g. "a business running finance on spreadsheets migrates to Zoho Books") without naming an unverified client — useful filler for the 18 thin service pages. |
| **ILLUSTRATIVE SCENARIO** | Already correctly modeled once, on `/services/zoho-bundled-suite`'s `ExamplesSection.tsx:60` — exact label: *"Illustrative implementation patterns — not case studies unless separately verified."* This is the reusable template; nowhere else on the site currently uses it, but nowhere else currently needs to, since no other page presents hypothetical scenarios as if real. |
| **EXAMPLE ARCHITECTURE** | The zoho-bundled-suite page's flow diagrams (Ecosystem, Architecture, Integration sections) are effectively this category already, just not explicitly labeled as such — a labeling improvement, not a content addition, would be low-risk. |

No fictional company should be introduced anywhere on the site. This finding does not
change from Stage 1.

---

## Step 10 — Content Review

| Current problem | Why it matters | Recommended direction | Priority |
|---|---|---|---|
| Two contradicting "projects delivered" numbers (50+ vs. 15) still live simultaneously | A visitor reading both pages in one sitting sees a direct credibility failure — this is not a design issue, it's a trust issue with zero cost to fix once a real number is confirmed | Get one verified number from the business (`BUSINESS_FACTS.md`), use it in both places | **P0** |
| The 18 templated service pages share identical section headings word-for-word ("What's included," "Other {platform} services we provide") and a repeated rhetorical sentence pattern ("We [verb] X so Y…") across nearly all 19 service intros **[MEASURED, new specificity]** | Individually the intros are genuinely well-written and platform-specific (verified — Sales, Odoo Inventory, and MS Security intros each open with a distinct, accurate claim about that platform), but the structural sameness plus phrase repetition creates real thin/near-duplicate-content risk for search and reads as templated to a careful human reader | Do not rewrite the intros (they're good) — vary the fixed section headings/microcopy and/or add one differentiating section per platform family, as a scoped content iteration, not a rewrite of everything | P2 |
| Repetitive phrasing confirmed at scale: "connected system" in 5 files, "growing businesses" in 7 files, "streamline operations" in 2 files | Natural for one consistent brand voice, but risks amplification if any future AI content generation leans on the same source pages as a style reference | Track as a known pattern; avoid reinforcing it further in new copy | P3 |
| Blog: 6 posts, all "VectorWave Team" byline, `image` field declared but never populated | Thin content depth for search competitiveness in commercial ERP/CRM terms; missing imagery is a content-completeness gap, not a bug | Either populate real author attribution and images, or explicitly decide anonymity/no-imagery is intentional (mirrors the About-page team-photo decision needed) | P2 |
| Contact page "Live Chat Support" card has no real destination — its `href` falls back to `"#"` (`app/contact/page.tsx:96`, confirmed via source read) **[MEASURED, new]** | A dead link on the contact page — the one page whose entire job is capturing leads — is a direct CRO problem | Wire it to actually open the Zoho SalesIQ widget (which is already loaded site-wide) or remove the card if chat isn't meant to be triggered from here | **P1** |
| Salesforce claimed as a platform in 3 places with zero supporting content anywhere | Same as Stage 1 finding — unchanged, still unresolved | Decide: build real content, or remove the claim | P1 |

---

## Step 11 — UX / CRO Review (first-time buyer lens)

Answering as a first-time B2B decision-maker landing on the homepage:

- **Can I understand what VectorWave does within 10 seconds?** Yes — the Hero headline
  ("Powering Intelligent Business Flow, without the overhead") plus the immediately
  following trust badges and platform ecosystem diagram make the ERP/CRM implementation
  positioning clear quickly.
- **Can I understand who it serves?** Mostly — the Industries tab and service catalog
  make this discoverable, but it takes scrolling/clicking to confirm, not immediate from
  the hero alone.
- **Can I understand what problems it solves?** Yes — the `BusinessDiagnosis` accordion
  section explicitly frames common business pain points, which is a genuinely good CRO
  pattern (problem-first framing before solution).
- **Can I trust it?** Partially. The real, specific Maxvill testimonial builds trust; the
  unverified "Zoho Authorised Partner," unnamed "Award Winning," and no-company "Sam"
  testimonial actively undercut it once a visitor looks closely — this is the site's
  clearest weak point, consistent with the Trust/Proof score below.
- **Can I find proof?** With effort — one testimonial section, one video testimonial,
  no dedicated proof/case-study page.
- **Can I understand the difference between services?** Reasonably well within a
  platform (Zoho vs. Odoo vs. Microsoft 365 framing is clear), less so between
  individual services within a platform, since all 18 non-bundled service pages share
  an identical two-section structure and the differentiation lives entirely in a single
  intro paragraph.
- **Do I know what action to take?** Mostly yes — CTAs are frequent and clear — but the
  **two competing "Book a call" mechanisms** (plain link vs. modal) plus the **dead
  live-chat link** on the Contact page introduce small but real friction at exactly the
  moment a convinced visitor is trying to convert.

Navigation/IA: genuinely strong (confirmed mobile nested menu, working blog search/filter, clear service grouping). Forms: real, CRM-backed, accessible-in-appearance but not
programmatically labeled (see Step 13). Mobile UX: the missing mobile-menu contact info
(Step 13) is the most concrete mobile-specific friction point found.

---

## Step 12 — SEO Review

| Area | Finding | Confidence |
|---|---|---|
| Titles/descriptions | Unique per page, all 8 route types confirmed to export `metadata`/`generateMetadata` with title+description; homepage inherits root layout's title/description (no page-level override) | [MEASURED] |
| OpenGraph / Twitter cards | **Confirmed zero matches anywhere in the codebase** — not partial, entirely absent. Every shared link (LinkedIn, Slack, WhatsApp) will show a blank or platform-guessed preview | [MEASURED] |
| Canonical URLs | **Confirmed zero matches** for `canonical`/`alternates.canonical` anywhere — new, more precise finding than Stage 1 flagged | [MEASURED] |
| Structured data | Broad and correct: Organization/WebSite on the root, `AboutPage`/`CollectionPage`/`ContactPage` + `BreadcrumbList` on About/Services/Blog/Contact listings, `Service` + `BreadcrumbList` on every service detail page, `Article` + `BreadcrumbList` on every blog post. Confirmed genuinely more thorough than the Stage 1 audit's summary implied — breadcrumbs are present on 6 of 7 non-homepage page types | [MEASURED] |
| Sitemap | Static XML file, header comment confirms it was generated by a third-party crawler ("Screaming Frog SEO Spider 23.2"), not by the app. All `<lastmod>` values are hardcoded to one date (2026-08-12) regardless of actual page content — already stale by its own logic as of today (2026-08-20). Coverage happens to match current routes exactly today (27/27 URLs verified against `lib/services.ts` and `lib/posts.ts`), but nothing in the codebase keeps it in sync going forward | [MEASURED] |
| robots.txt | Correct, minimal, points to the sitemap | [MEASURED] |
| Heading structure | Exactly one `<h1>` per page confirmed across all 8 route types, no duplicates found | [MEASURED] |
| Image alt text | Mixed and appropriately so — dynamic/descriptive alt text on logos, diagrams, and brand images; empty `alt=""` correctly used on confirmed-decorative images (About hero background, video poster, service-card logo icons); no generic placeholder alt text found | [MEASURED] |
| Internal linking | Real but algorithmic, not editorial — same-platform service cross-links and same-category blog cross-links are computed at render time from shared attributes (`getServicesByPlatform`, `getRelatedPosts`), not curated per page | [MEASURED] |
| Thin/duplicate content risk | 18 of 19 service pages share one template with two content sections and near-identical fixed headings; individual intros are hand-written and distinct, but the structural sameness is a real competitive-ranking risk for a business selling 18 different but related services | [MEASURED] |

**Net change from Stage 1:** the confirmed *total absence* of both OpenGraph/Twitter
metadata and canonical URLs (not previously separately verified) is a slightly larger
technical SEO gap than the original audit's framing suggested, while structured data and
breadcrumb coverage is confirmed *stronger* than the original summary implied. These
roughly offset — see Step 16 scoring below for the net effect.

---

## Step 13 — Accessibility Review

**Actual issues (confirmed in code, not hypothetical):**

- `components/ContactForm.tsx` — every `<label>` is a visual sibling of its input with
  **no `htmlFor`/`id` pairing**, so screen readers cannot programmatically associate the
  label with the field (WCAG 1.3.1 / 4.1.2 concern). This is a **new, more precise**
  finding than Stage 1's "every field has a proper label" — visually true, programmatically
  not sufficient.
- `components/BlogGrid.tsx:38-45` — the search input has no `<label>`, `aria-label`, or
  `aria-labelledby` — only a placeholder, which is not an accessible name.
- `components/LanguageSwitcher.tsx` — no Escape-to-close, no `role` on the dropdown
  panel, items are plain buttons without `role="menuitem"`/`role="option"`.
- Three separate tab-style implementations (`TechnologyAndIndustry.tsx`,
  `ProcessChains.tsx`, `SolutionsTabs.tsx`) — one more than Stage 1's audit named — with
  inconsistent and in all three cases **incomplete** ARIA tabs patterns, and **zero**
  arrow-key keyboard navigation across any of them.
- `components/ServiceIcon.tsx` and `components/BlogIcon.tsx` — both crash (React
  "invalid element type" error) on an unrecognized icon key rather than failing
  gracefully; `PlatformLogo.tsx` has a partial fallback that itself routes back through
  the crashable `ServiceIcon`.
- Mobile header: phone/email/social links are `hidden` below `lg:` breakpoint and are
  **not** duplicated anywhere in the mobile menu markup — confirmed by full read of both
  blocks in `Header.tsx`.
- `Typewriter.tsx` and `Counter.tsx` are JS-`setInterval`-driven and are **not** covered
  by the global `prefers-reduced-motion` CSS rule, unlike every other animation on the
  site — a real, specific gap the original audit's general "site respects reduced
  motion" framing didn't fully capture.

**Genuine strengths (reconfirmed):**
- `ConsultationModal.tsx` — full focus trap, Escape-to-close, focus restoration, scroll
  lock, correct `role="dialog"`/`aria-modal`/`aria-labelledby` — the one component with
  complete accessibility engineering.
- No clickable non-interactive elements found outside one `aria-hidden` modal backdrop
  (an accepted pattern, not a violation).
- `prefers-reduced-motion` CSS rule is real and covers all pure-CSS animations/transitions.

**Potential risk, not yet confirmed:** color contrast ratios — cannot be measured from
source alone; requires a live tool (axe/Lighthouse), which doesn't exist in this repo yet.
Flagged as **[UNKNOWN]**, consistent with Stage 1.

---

## Step 14 — Performance Review

All findings below are **[OBSERVED]** or **[INFERRED]** — no live Lighthouse/speed test
exists or was run.

- **[OBSERVED]** Static generation for all main routes remains the strongest performance
  asset the site has.
- **[MEASURED]** The font-override bug means Geist downloads but Arial renders — wasted
  bandwidth on every page load, unchanged from Stage 1.
- **[OBSERVED]** Heavy used assets confirmed: 6.7MB testimonial video, 1.43MB partner
  GIF, 1.34MB ecosystem PNG, 782KB Odoo logo rendered at ~40px. `next/image` resizes on
  the fly, softening the real-world impact, but the video in particular (loaded via a
  plain `<video>`-style component, not further optimized by Next's image pipeline) is
  the single heaviest asset on the homepage.
- **[OBSERVED]** 17 files carry `"use client"`; all route-level files remain server
  components (correct pattern). Two components (`TechnologyAndIndustry.tsx`,
  `ProcessChains.tsx`) are client components for a small amount of `useState`-driven
  interactivity but also render large static content blocks inside that same client
  boundary — a mild, not severe, hydration-cost inefficiency.
- **[INFERRED]** Three third-party scripts (GA4, Zoho SalesIQ chat, Google Translate)
  remain loaded non-blocking but are historically heavy scripts regardless of load
  strategy — unchanged assessment from Stage 1, still unmeasured.
- **[UNKNOWN]** Actual Core Web Vitals, bundle size, and Lighthouse score — requires
  tooling this repo doesn't have (see `README.md` Tool Availability).

---

## Step 15 — Technical Review

- **[MEASURED]** No `error.tsx`, `loading.tsx`, or `not-found.tsx` exist anywhere in
  `app/` — confirmed absent at every nesting level. `notFound()` is called
  programmatically in two places but falls back to Next's generic default UI.
- **[MEASURED]** `app/services/zoho-bundled-suite/page.tsx:30` uses a non-null assertion
  (`getServiceBySlug("zoho-bundled-suite")!`) with no guard, unlike the sibling dynamic
  route which correctly calls `notFound()` on a missing service — a latent crash risk if
  that slug is ever renamed, currently safe only because the slug happens to exist today.
- **[MEASURED]** Card styling duplicated across 7 files / 14 occurrences, no shared
  `Card` component — confirmed at Stage 1, now quantified precisely.
- **[MEASURED]** `lib/services.ts`, `lib/industries.ts`, `lib/posts.ts` are all cleanly
  typed literal-data modules with small, correctly-typed accessor functions — genuinely
  good architecture, reconfirmed.
- **[MEASURED]** Component/server-client boundaries are generally well-formed (client
  boundaries pushed to leaf components), with two components identified as candidates
  for narrower splitting rather than as bugs.
- **[MEASURED]** No automated tests, no CI pipeline — unchanged, still the single
  biggest structural risk before any automated optimization loop should be trusted to
  run unsupervised (per `SAFETY_RULES.md`).

---

## Step 16 — Scored Baseline (weighted rubric)

Per `EVALUATION_RUBRIC.md`. Every score is evidence-backed above; no score was assigned
on visual impression alone.

| Category | Weight | Score /100 | Weighted | Evidence basis | Confidence |
|---|---|---|---|---|---|
| Conversion / CRO | 14 | 61 | 8.54 | Dead live-chat link (new), two competing "Book a call" mechanisms (unchanged), real CRM-backed form (strength) | [MEASURED] |
| Trust / Proof | 12 | 48 | 5.76 | Unchanged — same unverified claims, same single strong-but-underused case study | [MEASURED] |
| Content | 11 | 61 | 6.71 | Slightly up — service intros confirmed genuinely well-differentiated per platform; offset by confirmed structural template-sameness and phrase repetition at scale | [MEASURED]/[OBSERVED] |
| UX | 11 | 65 | 7.15 | Slightly down — a third inconsistent tab implementation and the dead chat link newly confirmed | [MEASURED] |
| Visual Design | 9 | 67 | 6.03 | Slightly down — the zoho-bundled-suite dark-theme fork is a bigger inconsistency than previously characterized; font bug unresolved | [MEASURED] |
| SEO | 9 | 68 | 6.12 | Down — total absence of OpenGraph/canonical confirmed (bigger gap than assumed); offset by confirmed-strong breadcrumb/structured-data coverage | [MEASURED] |
| Accessibility | 8 | 58 | 4.64 | Down — unlabeled form/search inputs, incomplete tab ARIA patterns (×3), reduced-motion gap in JS-timed animations, all newly quantified | [MEASURED] |
| Mobile UX | 8 | 70 | 5.60 | Unchanged — same confirmed mobile contact-info gap, no new mobile-specific issues found | [OBSERVED] |
| Brand Consistency | 7 | 50 | 3.50 | Down — the zoho page's dark/light theme fork is more severe than a token-drift framing suggested | [MEASURED] |
| Performance | 6 | 65 | 3.90 | Unchanged — still no live measurement; asset weight findings reconfirmed | [INFERRED] |
| Technical Quality | 5 | 70 | 3.50 | Roughly unchanged — new specific risks found (non-null assertion, icon-crash paths, no error/loading pages) offset by reconfirmed clean data architecture | [MEASURED] |
| **Weighted total** | **100** | — | **61.45** | | |

---

## Step 17 — Comparison Against Initial Baseline

`ai-optimization/BASELINE.md` is **not modified** — it remains the locked
INITIAL BASELINE. This section records the comparison alongside it, per the
`BASELINE → ITERATION → NEW SCORE` convention in `CHANGELOG.md`.

| Category | Initial Baseline | Stage 2 Score | Δ | Why the delta exists |
|---|---|---|---|---|
| Conversion / CRO | 62 | 61 | −1 | New dead-link finding, no site change |
| Trust / Proof | 48 | 48 | 0 | No new information changes this |
| Content | 60 | 61 | +1 | Deeper per-page reading found the intros better-differentiated than the summary-level audit credited |
| UX | 66 | 65 | −1 | Third tab inconsistency + dead link newly confirmed |
| Visual Design | 68 | 67 | −1 | Dark-theme-fork severity more precisely characterized |
| SEO | 72 | 68 | −4 | OG/canonical absence confirmed total, not partial |
| Accessibility | 64 | 58 | −6 | Largest delta — unlabeled inputs, incomplete tab ARIA, reduced-motion gap all newly quantified with file:line precision |
| Mobile UX | 70 | 70 | 0 | No new mobile-specific findings |
| Brand Consistency | 55 | 50 | −5 | Dark/light theme fork is a bigger inconsistency than a color-drift framing suggested |
| Performance | 65 | 65 | 0 | Still unmeasured; no new asset-weight surprises |
| Technical Quality | 71 | 70 | −1 | New specific risks found, offset by reconfirmed clean data layer |
| **Weighted total** | **≈62.9** | **61.45** | **≈−1.5** | See framing note below |

### Framing note — this is not a regression

**The website was not modified between the initial audit and this evaluation** —
Stage 1 and Stage 2 were both read-only. The ~1.5-point weighted drop (and the larger
individual drops in Accessibility, SEO, and Brand Consistency) reflects **deeper,
file:line-precise evidence gathered in Stage 2**, not any change to the live site. The
initial baseline was a summary-level audit; Stage 2 verified specific claims against
exact code locations and, in several categories (Accessibility, SEO, Brand Consistency),
found the underlying reality was somewhat worse than the summary-level framing conveyed
— while in one category (Content) it found the reality was somewhat better. Both
directions are evidence of increased measurement rigor, not of the website changing.

### Unresolved questions (requires a human, unchanged from Stage 1 unless noted)

1. True, current, accurate business numbers (projects, clients, awards) — see `BUSINESS_FACTS.md`.
2. Is "Zoho Authorised Partner" real and current? Is there a badge to display?
3. Does VectorWave currently offer real Salesforce services?
4. Real names/photos for the leadership team, or confirm anonymity is intentional.
5. Is "Sam, Founder & CEO" a real, permission-given testimonial? Needs a company name or removal.
6. What should the brand accent color be — live teal (`#30b6cd`), the zoho page's teal (`#20C4D9`), or something else entirely, and should the zoho page's **dark theme** become a new sitewide direction or be brought back to the light system? **[Sharper version of a Stage 1 question — Stage 2 confirms this is a light/dark decision, not just a color decision.]**
7. Where is the "Live Chat Support" contact card on `/contact` actually supposed to go? **[New question raised by the dead-link finding.]**
8. Should the blog get real author attribution and featured images, or is the current anonymous/icon-only style intentional?
9. Hosting/CI/testing platform decision — still open, still blocking any real automated safety net.
10. Real analytics access — still not available to this process.
