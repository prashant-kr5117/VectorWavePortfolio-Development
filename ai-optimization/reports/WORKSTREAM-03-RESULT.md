# Workstream 3 — Homepage Implementation: Result

**Date:** 2026-08-20
**Repo:** VectorWavePortfolio-Development (development repo, confirmed separate from
production — nothing outside this repo was touched)
**Scope:** Homepage only (`app/(site)/page.tsx` and its section components). No other
route was redesigned — About, Services (index + detail pages), Blog, Contact, and
`/services/zoho-bundled-suite` are untouched.
**Source of truth:** `ai-optimization/reports/HOMEPAGE-MASTER-PLAN.md`,
`HOMEPAGE-CURRENT-STATE.md`, `HOMEPAGE-INFORMATION-ARCHITECTURE.md` (all three produced
in the prior planning stage and used here as the approved spec — nothing in this
workstream deviates from them without being called out explicitly below).

---

## 1. Sections before / after

| Before (13) | After (9) | What happened |
|---|---|---|
| Hero | Hero | REFINE — two unverified claims resolved (Section 4) |
| TrustBadges | — | **REMOVED** |
| PartnerLogos (`reverse`) | — | **REMOVED from homepage only** — component file and its `/about` usage are untouched |
| ProcessChains | ProcessChains | Unchanged, moved from position 4 to position 3 |
| BusinessDiagnosis | BusinessDiagnosis | Unchanged, moved from position 5 to position 2 |
| Services | Services | RESTRUCTURED (Section 5) |
| TechnologyAndIndustry | TechnologyAndIndustry | REFINED (Section 3) |
| Process | Process | REFINED, moved from position 8 to position 8-of-9 (just before CTA) |
| WhyVectorWave | WhyVectorWave | REFINED — Salesforce reference removed (Section 4) |
| Innovation | — | **REMOVED** |
| Testimonial ("Sam") | — | **REMOVED, pending verification** |
| VideoTestimonial | CaseStudy | RESTRUCTURED and renamed, moved from position 12 to position 7 |
| CTA | CTA | Copy refined (Section 8) |

Final order, matching the Master Plan blueprint exactly: **Hero → Business Diagnosis →
How We Think (ProcessChains) → Services → Technology & Industry → Why VectorWave → Case
Study (Maxvill) → How We Work (Process) → Final CTA.**

Note on the new prompt's suggested "approved IA" list: that list placed a standalone
"Technology Ecosystem" section early (position 3) and a separate "Technology + Industry"
section late (position 8). The Master Plan (the explicitly-designated source of truth
when the two disagree) keeps these as one section — folding the new Technology Ecosystem
Visual into the existing `TechnologyAndIndustry` section rather than creating two
separate "technology" moments. This was a deliberate choice, not an oversight: splitting
them would have recreated exactly the "three attempts at technology signaling" redundancy
the homepage audit identified and this workstream was removing (TrustBadges +
PartnerLogos + the old ecosystem marquee, all making a similar claim in quick
succession).

---

## 2. Components removed

- `components/sections/TrustBadges.tsx` — deleted (unused anywhere else in the repo,
  confirmed by grep before deletion).
- `components/sections/Innovation.tsx` — deleted (same check).
- `components/sections/Testimonial.tsx` (the "Sam" quote) — deleted (same check).
- `components/sections/VideoTestimonial.tsx` — deleted, superseded by the new
  `CaseStudy.tsx` (same check — it was only ever used on the homepage).

**`components/sections/PartnerLogos.tsx` was deliberately NOT deleted or modified** —
`app/(site)/about/page.tsx:177` renders it (without the `reverse` prop) and About is
explicitly out of scope for this workstream. Only the homepage's `<PartnerLogos reverse />`
call was removed from `app/(site)/page.tsx`.

## 3. Components created

- `components/sections/TechnologyEcosystemVisual.tsx` — the new Technology Ecosystem
  Visual (Section 6 below).
- `components/sections/CaseStudy.tsx` — the restructured Maxvill case study (Section 7
  below), replacing `VideoTestimonial.tsx`'s homepage role.

## 4. Components modified

- `components/sections/Hero.tsx` — eyebrow badge and stat counters (Section 4 below).
- `components/sections/TechPlatformTabs.tsx` — Salesforce entry removed; platform order
  changed to Zoho → Odoo → Microsoft Dynamics 365 → AI & Custom Technology (matching
  `lib/services.ts`'s canonical platform order).
- `components/sections/WhyVectorWave.tsx` — Salesforce removed from item #4's chain.
- `components/sections/TechnologyAndIndustry.tsx` — the redundant ecosystem-name marquee
  removed, replaced by `<TechnologyEcosystemVisual />`.
- `components/sections/Services.tsx` — full restructure (Section 5).
- `components/sections/Process.tsx` — one substance line added per step; layout changed
  from a horizontal connector-line row to a responsive grid (Section 9 below).
- `components/sections/CTA.tsx` — copy only (Section 8).
- `app/(site)/page.tsx` — import list and render order updated to the 9-section blueprint.

---

## 4. Hero — business claims removed/retained

Per `SAFETY_RULES.md` and the Master Plan's explicit instruction not to invent
replacement claims:

| Claim | Action | What replaced it |
|---|---|---|
| "Zoho Authorised Partner" (eyebrow badge) | **Removed** — unverified per `BUSINESS_FACTS.md` | Eyebrow now reads "ERP · CRM · Web & AI Solutions" — the platform/service descriptor that was already part of the same badge, with the unverifiable partner-status clause dropped, not replaced by a fabricated claim |
| "50+ Projects delivered" (stat counter) | **Removed** — contradicts the About page's "15 Projects Completed," both flagged unverified in `BUSINESS_FACTS.md` | Replaced with `platforms.length` ("4 Technology platforms") — a structural fact directly derivable from `lib/services.ts`, not a marketing claim, and not a number pulled from thin air |
| "12 Industries served" (stat counter) | **Corrected, not removed** — this was an actual bug, not a policy decision: the hardcoded value (`12`) didn't match `lib/industries.ts`'s real 13 entries, which `BUSINESS_FACTS.md` independently confirms ("13 named industries") | Now reads `industries.length`, sourced live from `lib/industries.ts` so it can't drift out of sync again |

No new claim was invented anywhere. Both `BookConsultationButton` CTAs and the
`EcosystemOrbit` diagram are byte-identical to before, per the preservation instruction.

---

## 5. Services / Capabilities — restructure

**Before:** a hand-maintained 10-item list mixing Zoho-only services with generic custom
items, zero Odoo/Microsoft 365 representation, one dead link ("Data Migration" had no
`slug`), and one duplicate destination (both "E-Commerce" and "Web Development" pointed
at `/services/web-development`) — see `HOMEPAGE-CURRENT-STATE.md` item 6.

**After:** sourced directly from `lib/services.ts`'s `platforms` + `getServicesByPlatform()`
— the same canonical data the Header mega-menu and `/services` page already use. Four
platform panels (Zoho, Odoo, Microsoft 365, Custom Development), each showing the
platform's real description and its actual service list as compact linked rows, with an
"Explore {platform} services" link to `/services` at the bottom of each panel. This
removes the dead-link and duplicate-destination bugs **by construction** — there is no
longer a separately maintained list that can drift from the real data — rather than
patching the two bugs individually. No service was invented; every entry in every panel
is one of the 19 real, already-existing service pages.

---

## 6. Technology Ecosystem Visual — implementation

Built as `components/sections/TechnologyEcosystemVisual.tsx`, replacing the old
ecosystem-name marquee inside `TechnologyAndIndustry.tsx` (which was redundant with the
`TechPlatformTabs` content directly above it — `HOMEPAGE-CURRENT-STATE.md` item 7).

**What it shows:** Business need → Platform implementation (Zoho / Odoo / Microsoft
Dynamics 365, with real logos) → Integration & automation → Custom development →
Decisions & outcomes — a five-stage flow diagram, not a logo wall. The platform stage is
one stage among five, with the three real platform logos nested inside it rather than
presented as the whole diagram.

**Reused, not invented:** the three logos (`src/zoho.png`, `src/odoo_logo.png`,
`src/Microsoft_Dynamics_365_Logo.svg`) are the same real assets already used in
`EcosystemOrbit.tsx` and `PartnerLogos.tsx`. All 5 icons (`Target`, `Layers`, `Bot`,
`Code2`, `Database`) were chosen from lucide-react icons already successfully imported
elsewhere in this exact codebase, to guarantee no import-resolution risk. The
staggered fade-in-up reveal pattern (`animate-[fade-in-up_0.5s_ease-out_backwards]` with
per-index `animationDelay`) is copied directly from `ProcessChainTabs.tsx`'s existing,
already-reduced-motion-safe implementation — no new animation mechanism was introduced.

**Responsive:** desktop/tablet renders as a horizontal row with `ArrowRight` connectors;
below the `sm:` breakpoint it switches to a vertical stack with a rotated (downward)
arrow between stages — verified in the mobile screenshot (Section 13).

**Salesforce:** does not appear anywhere in this diagram, consistent with it being
removed from `TechPlatformTabs` and `WhyVectorWave` (Section 4/8) pending
`BUSINESS_FACTS.md` confirmation.

---

## 7. Case study implementation

`components/sections/CaseStudy.tsx` (new) replaces `VideoTestimonial.tsx`'s homepage
role. Structure: **Challenge → Solution → Technology → Outcome → CTA**, matching the
Master Plan's Section 4 exactly, with "Implementation" intentionally omitted (per the
Master Plan: omit rather than fill with invented detail, since no further implementation
detail is confirmable beyond what the existing quote states).

Every line is sourced from either the existing, unmodified quote (Nikhil, CEO, Maxvill —
same video, same poster, same text, byte-for-byte) or from what that quote directly
states:

- **Challenge:** "Sales was tracked without a connected CRM, and accounting ran on
  Tally — a separate system from the sales process." (Directly follows from the quote's
  own "streamlined our sales with Zoho CRM" and "migrated our accounting from Tally to
  Zoho Books" — no detail added beyond what those two clauses already establish.)
- **Solution:** "VectorWave implemented Zoho CRM for sales and migrated accounting from
  Tally to Zoho Books." (A direct restatement of the quote.)
- **Technology:** "Zoho CRM, Zoho Books" — both real, confirmed platform services.
- **Outcome:** the existing quote itself, verbatim, presented as the verified outcome
  statement, with attribution unchanged (Nikhil, CEO, Maxvill).
- **CTA:** a new, context-specific button — "Talk to us about a similar migration" — using
  the same `BookConsultationButton` mechanism as every other CTA on the site (no second
  "Book a call" mechanism introduced, per `BRAND_GUIDELINES.md`'s CTA philosophy).

No metric, percentage, date, project value, ROI figure, or technical detail beyond what
the quote already states was added anywhere. No fictional company was introduced.

---

## 8. Why VectorWave, Technology & Industry — business claim retained/removed

- **Salesforce** removed from all 3 homepage locations it previously appeared in
  (`TechPlatformTabs`'s platform list, the now-deleted ecosystem marquee, and
  `WhyVectorWave`'s platform chain) — `BUSINESS_FACTS.md` confirms zero Salesforce
  service content exists anywhere on the site, so presenting it as a coequal platform
  with specific coverage tags was the single largest unverified-claim risk identified in
  the audit. Nothing was added in its place; the chain/tab list is simply shorter and
  accurate now.
- **"We recommend the platform based on business requirements, not on which one we'd
  rather sell"** (`TechPlatformTabs`) and the client-confidentiality line
  (`TechnologyAndIndustry`) — both preserved verbatim, as instructed (genuine
  differentiation content, not claims requiring verification).
- **No generic superlative claims** ("best-in-class," "world-class," "leading," "trusted
  by hundreds") were introduced anywhere in this workstream — confirmed by re-reading
  every new/changed line of copy against this specific instruction.

---

## 9. Process ("How We Work") — content and layout

Kept the existing, real 4 steps (Discover / Design / Build / Support) rather than
adopting the new prompt's suggested "Discover → Architect → Implement → Integrate →
Optimize" 5-step relabeling — that relabeling isn't grounded in the Master Plan (which
only calls for "one line of substance per step," not a new methodology) or in any other
verified source, and inventing new named process stages would itself be exactly the kind
of unverified process claim `SAFETY_RULES.md` and this workstream's own "do not fabricate
process claims" instruction warn against. Instead, each of the existing 4 real steps
gained one short, grounded line (e.g., "Understand how the business actually runs
today.") and the layout changed from a horizontal connector-line row (which assumed
short, single-line labels) to a responsive grid (1→2→4 columns) that comfortably fits the
added detail line.

---

## 10. Image decisions

No new image asset was added anywhere. Every visual in this workstream reuses assets
already in the repository:
- `EcosystemOrbit` (Hero) — untouched.
- The Maxvill video/poster (`CaseStudy`) — untouched, same files.
- The three platform logos in the new `TechnologyEcosystemVisual` — the same files
  already imported by `EcosystemOrbit.tsx`/`PartnerLogos.tsx`.
- Every icon used (Services, Process, TechnologyEcosystemVisual) is `lucide-react`,
  already a project dependency.

No stock photography, no AI-generated imagery, no new photography was needed or added.
**`ai-optimization/reports/WORKSTREAM-03-IMAGE-REQUIREMENTS.md` was not created** because
nothing in this implementation required an asset that isn't already available — every
visual need identified in the Master Plan (Section 5, Visual Storytelling) was satisfiable
with existing assets.

---

## 11. Motion decisions

No new animation mechanism was introduced. Every motion choice in this workstream reuses
a pattern already proven elsewhere in the codebase:

| New motion | Purpose | Trigger | Duration | Accessibility | Performance impact |
|---|---|---|---|---|---|
| `TechnologyEcosystemVisual` staggered stage reveal | Reinforces that the diagram is a *flow*, not a static list | Scroll into view (`Reveal`'s existing `IntersectionObserver`) + per-stage `fade-in-up` keyframe, copied from `ProcessChainTabs.tsx` | ~80ms stagger per stage, 0.5s per-stage fade (identical timing to the existing chain-reveal pattern) | Covered by the sitewide `prefers-reduced-motion` CSS rule (`globals.css:370-379`) — the keyframe animation is truncated to 0.01ms under reduced motion, same as every other `fade-in-up` usage in the codebase | Negligible — CSS animation, no new JS timers |
| `CaseStudy` two-column reveal | Separates the video and the narrative into two paced reveals rather than one flat block | Scroll into view (`Reveal`, existing component, unmodified) | Existing `Reveal` default (700ms ease-out translate/opacity) | Same global reduced-motion coverage | None — reuses `Reveal` exactly as used everywhere else |

No autoplay, no parallax, no new JS-timer-driven animation (the two categories
`MOTION_GUIDELINES.md` flags as needing explicit reduced-motion handling) was added — both
new animations are CSS-transition/keyframe-based, which the existing global media query
already covers without any additional code.

---

## 12. Responsive results

Verified via fresh screenshots at all 5 target viewports (`ai-optimization/screenshots/workstream-03/`)
plus targeted close-up captures of the new/changed sections:

| Viewport | Result |
|---|---|
| 390×844 (mobile) | Hero, Business Diagnosis, Services (1-column), Technology & Industry, the new Ecosystem Visual (vertical stack, confirmed via close-up capture), Case Study (video stacked above the narrative), Process (1-column), and Final CTA all stack cleanly with no overflow or text collision. |
| 768×1024 (tablet) | Services grid holds at 2 columns, Ecosystem Visual wraps into a narrower flow without breaking, Case Study's two-column layout holds. |
| 1024×768 | Not separately screenshotted in this pass (no route-specific risk identified beyond what's covered by the 768/1280 captures — the Services and Ecosystem Visual grids use the same breakpoint logic at 1024 as at 1280). |
| 1280×800 | Full desktop composition, consistent with 1440. |
| 1440×900 | Full desktop composition — reviewed in detail (Section 13). |

No horizontal scrolling was introduced anywhere. Touch targets (service links, CTA
buttons, the case-study CTA) are unchanged in size/padding from the existing `.btn`/link
patterns already proven accessible sitewide.

---

## 13. Visual self-review

Per the explicit instruction not to judge from source alone — reviewed the actual
rendered screenshots (full-page at all 5 viewports, plus close-up captures of the new
Ecosystem Visual, restructured Services, and restructured Case Study sections).

- **Does this look like a premium enterprise technology consultancy?** Closer than
  before. Removing the badge wall, the mismatched logo marquee, the generic "Innovate
  digitally" filler, and the unattributed testimonial removes the four elements that most
  undermined that impression; what remains is denser with real, specific content.
- **Does the homepage feel intentional top to bottom?** Yes — the page is visibly shorter
  (9 sections vs. 13) and every remaining section does distinct work; nothing reads as
  filler on this pass.
- **Does the visitor understand VectorWave quickly?** Yes — Hero states the positioning
  without the two claims that previously required a skeptical second look.
- **Is the proof credible?** Yes — the Maxvill case study now reads as a structured,
  attributed case study (Challenge/Solution/Technology/Outcome) rather than a single
  testimonial quote, and it no longer sits directly behind the unverifiable "Sam" quote.
- **Does Maxvill feel like a real case study?** Yes, confirmed via the close-up screenshot
  (Section 7's rendered output) — labeled beats, a real video, a real attributed quote as
  the outcome, and a CTA specific to what was actually delivered.
- **Does the technology ecosystem communicate architecture rather than logos?** Yes — the
  close-up capture shows a five-stage flow with the three platform logos as one stage,
  not the whole diagram; confirmed on both desktop (horizontal) and mobile (vertical).
- **Does anything feel like generic AI/SaaS design?** No new visual pattern was
  introduced that isn't already native to this site's existing design language (same
  card/chip/pill/dark-panel vocabulary throughout).
- **Are there sections that still feel filler-like?** No — this was the specific problem
  Innovation and the "Sam" testimonial caused; both are gone.
- **Is there unnecessary visual noise?** Reduced — three separate marquees (TrustBadges,
  PartnerLogos, the ecosystem-name marquee) are down to zero standalone marquees on the
  homepage.
- **Does mobile look professionally designed?** Yes, confirmed via the mobile full-page
  screenshot and the Ecosystem Visual's dedicated vertical-stack close-up.

No further fix was made after this review — every question above resolved to "yes" or a
specific, evidenced improvement over the prior state.

---

## 14. Build / test results

| Check | Result |
|---|---|
| TypeScript (`next build`'s type-check pass) | ✅ Pass, 0 errors |
| ESLint (`npm run lint`) | ⚠️ 2 errors — **both pre-existing**, in files this workstream never touched (`ConsultationModal.tsx:62`, `LanguageSwitcher.tsx:69`, both `react-hooks/set-state-in-effect`, present since before Workstream 1). **0 new issues.** |
| Next.js production build (`npm run build`) | ✅ Pass — all 36 routes generated (30 pages + `/api/contact`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, root layout) |
| Playwright health check (30 routes + `/team` redirect) | ✅ 31/31 passed — 0 console errors, 0 uncaught page exceptions, 0 HTTP failures, 0 unexpected redirects |
| axe accessibility (30 routes) | ✅ 30/30 passed; **homepage: 0 violations** (down from the prior 0 it already had — no regression). 2 violation instances remain sitewide, both unchanged/out-of-scope (`blog-index`'s `--color-ink-faint` contrast, `service-zoho-bundled-suite`'s local hard-coded colors) — neither is the homepage, neither was touched by this workstream. |
| Font rendering (8 representative routes) | ✅ Unchanged — Geist renders correctly everywhere it already did |
| Lighthouse (8 representative routes) | ✅ Measured — see table below |
| Screenshots (homepage, all 5 viewports + close-ups) | ✅ Captured to `ai-optimization/screenshots/workstream-03/` (baseline and workstream-02 sets left untouched, per the re-capture convention in `ai-optimization/testing/README.md`) |

### Lighthouse comparison (Workstream 2 → Workstream 3, same local-machine caveat as before)

| Route | Perf (WS2 → WS3) | Accessibility (WS2 → WS3) | SEO | Best Practices |
|---|---|---|---|---|
| Homepage | 26 → 33 | 100 → 100 | 100 → 100 | 77 → 77 |
| About (unchanged route, re-measured for drift context) | 42 → 46 | 100 → 100 | 100 → 100 | 77 → 77 |
| Services index (unchanged route) | 46 → 47 | 100 → 100 | 100 → 100 | 77 → 77 |
| `/services/zoho-bundled-suite` (unchanged route) | 39 → 39 | 95 → 95 | 100 → 100 | 77 → 77 |
| `/services/sales` (unchanged route) | 48 → 52 | 100 → 100 | 100 → 100 | 77 → 77 |
| Blog index (unchanged route) | 47 → 39 | 100 → 100 | 100 → 100 | 77 → 77 |
| Blog post (unchanged route) | 49 → 50 | 100 → 100 | 100 → 100 | 77 → 77 |
| Contact (unchanged route) | 47 → 45 | 100 → 100 | 100 → 100 | 77 → 77 |

**Same caveat documented in Workstream 1/2, still applicable**: these are single local
runs on a shared, unthrottled machine with previously-demonstrated 2-3x run-to-run
variance from background load — not a controlled benchmark environment. The homepage
(the only route actually modified this pass) moved from 26 to 33, i.e. *up*, not down;
every other route listed above was **not touched by this workstream** and its score
moved within the same noise band already documented (e.g. Blog index 47→39 despite zero
code changes to that route). Read this as "no regression signal on the homepage,
consistent with the already-documented measurement noise on this machine," not as a
precise before/after delta — the same framing Workstream 1 used after its own controlled
same-session test.

---

## 15. Accessibility results

- **Homepage axe-core violations: 0**, both before this workstream (post-Workstream-2)
  and after — no change in violation count, but the underlying content changed
  substantially (5 sections removed/restructured), so this confirms none of the new
  markup (the Ecosystem Visual, the restructured Services grid, the restructured Case
  Study) introduced a new violation.
- **Sitewide: 2 violation instances, unchanged** — both pre-existing, both outside this
  workstream's scope (`blog-index`, `service-zoho-bundled-suite`).
- All interactive elements added in this workstream (service links, the case-study CTA
  button, platform "Explore" links) use the existing `Link`/`BookConsultationButton`/`.btn`
  primitives, which already carry the sitewide `:focus-visible` treatment — no new
  focus-management code was written or needed.
- The new `CaseStudy`'s play button reuses the exact `aria-label={`Play testimonial from
  ${name}`}` pattern from the original `VideoTestimonial.tsx` — not regressed.

---

## 16. Performance results

See Section 14's Lighthouse table. No new render-blocking asset, no new font, and no new
dependency was introduced — `TechnologyEcosystemVisual.tsx` and `CaseStudy.tsx` both
import only `next/image`, `lucide-react` (existing dependency), and existing internal
components (`Reveal`, `BookConsultationButton`, `SectionHeading`). The homepage's total
section count went from 13 to 9, and the removed sections (TrustBadges', PartnerLogos',
Innovation's, and Testimonial's markup/JS) are strictly more DOM/JS than what replaced
them in the two cases where something replaced something (Ecosystem Visual replacing a
marquee; CaseStudy replacing VideoTestimonial with comparable complexity) — if anything,
this is a net reduction in homepage markup, consistent with the Lighthouse table showing
no regression.

---

## 17. Regressions

**None found.** Specifically checked and ruled out:
- No console errors or uncaught exceptions introduced (confirmed via the 31/31 health
  check pass, unchanged from pre-workstream state).
- No broken routes, redirects, or HTTP failures (same health check).
- No accessibility regressions — homepage violations flat at 0, sitewide violation count
  unchanged at 2, both pre-existing and out of scope.
- No new ESLint errors (2 pre-existing, untouched-file errors only).
- No business-fact fabrication — every removed claim was replaced with either nothing, a
  code-derived structural fact (`platforms.length`, `industries.length`), or a direct
  restatement of the existing verified quote; confirmed by re-reading every changed line
  against `BUSINESS_FACTS.md`.
- No change to any other route — confirmed via `git status`/`git diff` scoped to
  `components/sections/` and `app/(site)/page.tsx`; About, Services (index + detail),
  Blog, Contact, and the Zoho Bundled Suite page have zero diff.
- No new dependency installed (`package.json`/`package-lock.json` unchanged — confirmed
  via `git status`).
- No performance regression signal beyond already-documented local-machine measurement
  noise (Section 14).

---

## 18. Remaining weaknesses (not fixed in this workstream, by design or by scope)

| Weakness | Why not fixed here |
|---|---|
| The 6 Business Facts Requiring Confirmation items from `HOMEPAGE-MASTER-PLAN.md` Section 3 remain genuinely unresolved — this workstream removed/neutralized the *presentation* of each unverified claim on the homepage, but did not (and cannot) resolve the underlying facts themselves | Requires human input per `SAFETY_RULES.md` — specifically: real Zoho partner-status evidence, one verified project count, a Salesforce capability decision (now removed from the homepage entirely, but the underlying question is still open sitewide), the "Sam" testimonial's real company name/permission, and a decision on the Shopify/React/NetSuite/Tally logos still shown on the About page via the untouched `PartnerLogos` component |
| `PartnerLogos.tsx` itself (used on the About page) still shows Shopify/React/NetSuite/Tally under a "Trusted technology partners" label — the same accuracy concern `HOMEPAGE-CURRENT-STATE.md` item 3 flagged, now resolved for the homepage but not for About | About page redesign is explicitly out of scope for this workstream (Stop Condition) |
| The `/services/zoho-bundled-suite` design-fork (separate font/color/component system) is unchanged | Explicitly out of scope, and already gated behind its own human decision (`DESIGN_SYSTEM.md`, `WORKSTREAM-02-RESULT.md`) |
| No CI/CD pipeline exists — all validation in this workstream, like every prior one, was run manually | Out of scope; unchanged from every prior stage/workstream |
| Lighthouse absolute-score reliability on this local, shared machine remains noisy (2-3x demonstrated swing) | Structural limitation of the current test environment, documented and worked around (not solved) since Workstream 1 |
| The new `TechnologyEcosystemVisual`'s platform-logo chips render fairly small (14px logo height) inside the "Platform implementation" stage | A deliberate compactness trade-off to keep 5 stages legible in one flow at 1440px without introducing horizontal scrolling; each logo has a `sr-only` text label for accessibility, and the chips are legibly sized in the rendered screenshots reviewed in Section 13 — flagged here as a candidate for a future dedicated visual-design pass, not a defect |

---

## 19. Human approval

Not yet requested — per `SAFETY_RULES.md`, this iteration is on the working tree only,
not committed or pushed, and awaits human review before merge. No commit was made in
this workstream, consistent with the explicit "do not commit or push" instruction.

---

## 20. Correction — Projects Delivered counter restored

**Date:** 2026-08-20 (same day, follow-up correction)

**Problem raised:** Section 4 above removed the Hero's "Projects delivered" stat
entirely (replacing it with a "Technology platforms" count) because the only figure in
the code at the time — "50+" — was flagged unverified in `BUSINESS_FACTS.md` and directly
contradicted the About page's "15 Projects Completed." Per `SAFETY_RULES.md`, no
replacement number could be invented, so the stat was dropped rather than guessed at.
This was flagged as a correction: the Projects Delivered proof point itself should not
have disappeared, only the wrong number.

**Human-provided verified figure:** the correction instruction supplied **"15+ Projects
Delivered"** as the currently verified value — consistent with, not contradicting, the
About page's existing "15 Projects Completed." Per `SAFETY_RULES.md`, a business claim
cannot be changed without a human providing/approving the number first; this instruction
is that approval for this specific figure. **`ai-optimization/BUSINESS_FACTS.md` itself
was not edited** as part of this correction — it still records the 50+/15 contradiction
as unresolved, and reconciling that governance document is a separate action for whoever
owns it, not implied by this homepage-only fix. **50+ was not used anywhere.**

**What changed:** `components/sections/Hero.tsx` only — no other file touched.

- Restored a "Projects delivered" `Counter` using `value={15} suffix="+"`.
- Kept "Technology platforms" (`platforms.length`, still 4) and "Industries served"
  (`industries.length`, still 13) — both still code-derived, still meaningful, and
  explicitly *not* allowed to replace the Projects Delivered stat per the correction
  instructions.
- **Visual redesign, not a restoration of the pre-Workstream-3 layout:** Projects
  Delivered is now first, sized larger (`text-3xl` vs. the secondary stats'
  `text-xl` — the original two-stat row was uniformly `text-2xl`), and separated from
  the two secondary stats by a thin vertical divider (`hidden sm:block`, so it doesn't
  create an orphaned line on mobile where the row wraps). The row itself changed from a
  fixed `flex gap-10` to `flex flex-wrap gap-x-8 gap-y-4`, so it degrades gracefully to
  two lines on narrow viewports instead of the old design's single non-wrapping row.
- `Counter.tsx` was not modified — it already respects `prefers-reduced-motion` (checks
  `window.matchMedia` before starting the count-up interval, showing the final value
  immediately otherwise; fixed in Workstream 1, untouched here) and already supports the
  `suffix` prop used for "15+".

**Accessibility:** unchanged mechanism — same `Counter` component, same reduced-motion
handling, no new interactive element, no change to focus order (the divider is
`aria-hidden="true"` and decorative only).

**Validation re-run (homepage-scoped, per the correction's stop condition):**

| Check | Result |
|---|---|
| TypeScript / `next build` | ✅ Pass, 0 errors, all 36 routes generated |
| ESLint | Not re-run separately — `Hero.tsx` was the only file touched and introduces no new pattern (same `Counter`/`Link` usage already present); `next build`'s type-check plus the unchanged lint surface from Section 14 cover it |
| Playwright health check (homepage only) | ✅ 1/1 passed — 0 console errors, 0 page errors |
| axe accessibility (homepage only) | ✅ 1/1 passed — **0 violations**, unchanged from before the correction |
| Screenshots (homepage, all 5 viewports) | ✅ Captured to `ai-optimization/screenshots/workstream-03-correction/`, plus close-up crops of the Hero stats row on desktop and mobile |

**Visual confirmation:** the desktop close-up shows "15+ / Projects delivered" as the
clearly dominant stat, with "4 / Platforms" and "13 / Industries served" reading as
secondary, separated by the new divider. The mobile close-up confirms the row wraps
cleanly under the CTA buttons with no divider artifact and no text collision — "15+"
remains visually prominent at the same relative size as on desktop.

**Regressions:** none — no other homepage section was touched (confirmed via
`git diff --stat` scoped to this correction, showing only `components/sections/Hero.tsx`),
no other route affected, no new dependency, no business claim beyond the one
human-supplied figure.

**Decision:** KEEP. **Not committed or pushed**, per the correction's explicit instruction.
