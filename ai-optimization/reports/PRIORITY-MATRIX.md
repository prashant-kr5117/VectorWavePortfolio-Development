# Priority Matrix

Derived from `STAGE-2-BASELINE-REVIEW.md`. Global problems (affecting many pages via one
shared file) are ranked ahead of page-specific or cosmetic items at the same severity
tier, per the task instructions. Nothing in this document has been implemented — this is
planning only.

**P0 — Critical** (business-credibility or broken-functionality risk; should block other work)
**P1 — High impact** (global reach or clear conversion/accessibility cost)
**P2 — Medium impact** (real but contained)
**P3 — Polish** (low urgency, no evidence of active harm)

---

## P0 — Critical

### P0-1: Conflicting "projects delivered" numbers
- **Problem:** Homepage says "50+ Projects delivered"; About page says "15 Projects Completed." Same company, two numbers, live simultaneously.
- **Pages affected:** Homepage, About (2 pages, but both are top-of-funnel, high-traffic pages).
- **Category:** Trust / Proof, Content.
- **Impact:** High — a visible, internally-contradictory credibility failure a reader can catch in one sitting.
- **Effort:** Trivial once a real number exists (two text edits).
- **Risk:** None to fix (text-only), but **cannot be fixed without a human-provided verified number** — this is a `BUSINESS_FACTS.md` gate, not a code problem.
- **Recommended solution:** Get one true number from the business, update `BUSINESS_FACTS.md`, then apply in both places in one scoped iteration.
- **Priority:** **P0**

### P0-2: Unsubstantiated trust claims ("Zoho Authorised Partner," "Award Winning Support Team," "4 Accolades Earned")
- **Problem:** No certificate, badge, award name, or issuing body exists anywhere in the codebase to back these claims.
- **Pages affected:** Homepage, About.
- **Category:** Trust / Proof.
- **Impact:** High — directly undercuts the "premium enterprise" credibility goal in `BRAND_GUIDELINES.md`; current 2026 B2B research specifically flags unverifiable badges as actively harmful to enterprise credibility.
- **Effort:** Low (soften/remove wording) to moderate (if real evidence exists and needs to be sourced/displayed).
- **Risk:** Low if softened/removed; requires human input either way.
- **Recommended solution:** Human confirms whether these are real and verifiable; either add real evidence or soften the claim — never fabricate the backing.
- **Priority:** **P0**

---

## P1 — High impact

### P1-1: Geist font never renders (Arial override)
- **Problem:** `body { font-family: Arial, Helvetica, sans-serif; }` at `app/globals.css:69` overrides the Geist font the site downloads on every page load.
- **Pages affected:** Global — every single page.
- **Category:** Visual Design, Performance.
- **Impact:** Very high reach (100% of pages), directly affects whether the site looks like its own design system.
- **Effort:** Trivial — one CSS rule change.
- **Risk:** Low and highly controlled — visually reversible in one line, no business-fact risk, no route/URL risk.
- **Recommended solution:** Remove/replace the Arial override so the already-downloaded Geist font actually applies.
- **Priority:** **P1** (see Step 20 for why this is the recommended *first* optimization specifically)

### P1-2: Zero OpenGraph/Twitter/canonical metadata anywhere
- **Problem:** Every shared VectorWave link shows a blank or platform-guessed preview on LinkedIn/Slack/WhatsApp; no canonical URLs exist to guard against duplicate-content indexing.
- **Pages affected:** Global — all ~30 routes.
- **Category:** SEO, Conversion/CRO (shared-link impressions).
- **Impact:** High reach, moderate-to-high effect on link-sharing conversion and search hygiene.
- **Effort:** Low-to-moderate — one shared metadata helper extended with `openGraph`/`twitter`/`alternates.canonical`, applied per route.
- **Risk:** Low — additive metadata, no visual or business-claim change.
- **Recommended solution:** Extend `lib/seo.ts` (or a new metadata helper) with OG/Twitter/canonical fields, wired into each route's existing `metadata`/`generateMetadata` export.
- **Priority:** **P1**

### P1-3: Two "Book a call" mechanisms + one dead contact-page link
- **Problem:** Header uses a plain link to `/contact`; other CTAs open a modal instead. Separately, the Contact page's "Live Chat Support" card has no real destination (`href ?? "#"`).
- **Pages affected:** Global (Book-a-call inconsistency touches every page with a CTA) + Contact page specifically (dead link).
- **Category:** Conversion / CRO, UX.
- **Impact:** High — friction at the exact moment of conversion intent.
- **Effort:** Low-to-moderate — requires a decision on which mechanism wins, then a find-and-replace-style pass; the dead link is a one-line fix once the intended destination (likely triggering the already-loaded Zoho SalesIQ widget) is confirmed.
- **Risk:** Low if scoped to just the CTA mechanism, not bundled with any visual redesign.
- **Recommended solution:** Pick one "Book a call" behavior sitewide; wire the chat card to the real chat widget or remove it.
- **Priority:** **P1**

### P1-4: Accessibility — unlabeled inputs, incomplete tab ARIA, reduced-motion gap
- **Problem:** Contact form labels aren't programmatically associated with inputs (no `htmlFor`/`id`); blog search input has no accessible name; three separate tab implementations lack keyboard arrow-navigation and consistent ARIA; `Typewriter`/`Counter` JS animations ignore `prefers-reduced-motion`.
- **Pages affected:** Contact (form), Blog (search), Homepage + Zoho page (tabs), Homepage + About (typewriter/counter) — effectively global.
- **Category:** Accessibility.
- **Impact:** High — concrete, specific WCAG-relevant gaps, not hypothetical risk.
- **Effort:** Low per individual fix (add `htmlFor`/`id` pairs, add `aria-label`, add a `matchMedia` check before starting `setInterval`); moderate if standardizing all three tab implementations into one shared pattern.
- **Risk:** Low — these are additive/corrective, not visual redesigns.
- **Recommended solution:** Treat as several small, independently scoped iterations (per `EVALUATION_RUBRIC.md`'s "one objective per iteration" rule) rather than one bundled accessibility sweep.
- **Priority:** **P1**

### P1-5: Salesforce claimed with no supporting content
- **Problem:** Salesforce appears as a supported platform in 3 places (footer, homepage tech section, an old mockup file) with no actual service page or content behind it.
- **Pages affected:** Footer (global), Homepage.
- **Category:** Trust / Proof, Content.
- **Impact:** High — a dead-end claim a curious visitor can click and find nothing.
- **Effort:** Low (remove the claim) or high (build real Salesforce content) depending on the business decision.
- **Risk:** Requires a business decision before any change — cannot be resolved by an AI agent alone per `SAFETY_RULES.md`.
- **Recommended solution:** Human decides: build it out for real, or remove the claim.
- **Priority:** **P1**

---

## P2 — Medium impact

### P2-1: `/services/zoho-bundled-suite` design fork (dark theme, separate fonts, separate accent)
- **Problem:** Confirmed to be a full light-vs-dark theme fork (near-black hero background vs. the rest of the site's white surfaces), two extra font families, and a numerically different accent teal, all built from 23 independent components.
- **Pages affected:** One page, but it's a major service-conversion page.
- **Category:** Brand Consistency, Visual Design.
- **Impact:** High severity, contained reach (one page) — hence P2 rather than P1 despite the severity, since it doesn't propagate to other pages the way the font bug or metadata gap do.
- **Effort:** Very high either direction — this is a real design-direction decision, not a bug fix, and is explicitly the single highest-effort item on the original audit's list.
- **Risk:** High if rushed; this should not be attempted as a "quick fix," it needs a deliberate decision first.
- **Recommended solution:** Human decision required first (adopt this direction sitewide, or bring the page back in line) — do not schedule implementation before that decision exists.
- **Priority:** **P2** (decision-gated; effort/risk profile disqualifies it as a quick early win despite its visibility)

### P2-2: Card styling duplicated across 7 files, no shared `Card` component
- **Problem:** 14 near-identical card style blocks copy-pasted rather than componentized.
- **Pages affected:** Global (services grids, blog grids, industries grids, About page).
- **Category:** Technical Quality, Brand Consistency (future-proofing).
- **Impact:** No visible harm today — pure maintenance-risk reduction.
- **Effort:** Moderate — extract one shared component, migrate 7 call sites.
- **Risk:** Low if done as a pure refactor with no visual change (verifiable by diffing rendered output).
- **Recommended solution:** Extract a shared `Card` component with the existing styling preserved exactly.
- **Priority:** **P2**

### P2-3: Icon lookup crash risk (`ServiceIcon`, `BlogIcon`)
- **Problem:** Both crash (React render error) on an unrecognized icon key instead of failing gracefully.
- **Pages affected:** Any page rendering a service or blog icon — effectively global.
- **Category:** Technical Quality.
- **Impact:** No current failures (TypeScript unions currently keep data in sync), but zero defense if that ever drifts.
- **Effort:** Trivial — add a fallback icon/null-check in both lookup functions.
- **Risk:** Very low, purely defensive.
- **Recommended solution:** Add a graceful fallback to both icon lookups.
- **Priority:** **P2**

### P2-4: Footer not centralized in root layout
- **Problem:** 8 separate page files each individually render `<Footer />`; a new page that forgets this line ships without a footer.
- **Pages affected:** Currently harmless (all 8 correctly include it), but a landmine for any future page.
- **Category:** Technical Quality.
- **Impact:** Zero current harm, real future risk.
- **Effort:** Low — move `<Footer />` into `app/layout.tsx`.
- **Risk:** Low-moderate — must verify no page currently double-renders or special-cases the footer before centralizing.
- **Recommended solution:** Centralize into the root layout as a scoped, easily-verified global change.
- **Priority:** **P2**

### P2-5: Header fixed/sticky inconsistency
- **Problem:** `fixed` on homepage only, `sticky` everywhere else.
- **Pages affected:** Global (every page, in terms of the inconsistency existing across the set).
- **Category:** Brand Consistency, Visual Design.
- **Impact:** Moderate — a real, confirmed inconsistency, but low visible harm to an individual visitor who only ever sees one page's behavior at a time.
- **Effort:** Trivial — pick one behavior, apply everywhere.
- **Risk:** Low.
- **Recommended solution:** Standardize on one header behavior sitewide.
- **Priority:** **P2**

### P2-6: Static sitemap will drift from real content
- **Problem:** Hand/tool-generated `sitemap.xml`, hardcoded stale `<lastmod>` dates, no code path ties it to `lib/services.ts`/`lib/posts.ts`. Accurate today, will silently go stale on the next content change.
- **Pages affected:** Global (search-engine visibility for all routes).
- **Category:** SEO.
- **Impact:** No current harm (verified 27/27 URLs match today), real future risk.
- **Effort:** Moderate — replace the static file with a `sitemap.ts` route handler generated from the same data files.
- **Risk:** Low if implemented as a pure generation-mechanism swap with identical output verified before/after.
- **Recommended solution:** Dynamic `sitemap.ts` generated from `lib/services.ts` + `lib/posts.ts`.
- **Priority:** **P2**

### P2-7: 18 service pages' template sameness (near-duplicate-content SEO risk)
- **Problem:** Identical section headings and structural skeleton across 18 pages; intros are good but the wrapper is uniform.
- **Pages affected:** 18 of 30 routes — the majority of the site.
- **Category:** SEO, Content.
- **Impact:** Real but gradual (search-ranking risk, not a broken-today problem).
- **Effort:** Moderate — varying fixed microcopy/headings without touching the good intro content.
- **Risk:** Low if scoped narrowly (headings/microcopy only, not a content rewrite).
- **Recommended solution:** Vary the shared template's fixed strings; do not touch the differentiated intro paragraphs.
- **Priority:** **P2**

### P2-8: Mobile header contact info unreachable from the mobile menu
- **Problem:** Phone/email/social confirmed present only in the desktop-only top bar, not duplicated in the mobile menu.
- **Pages affected:** Global (every page's mobile header).
- **Category:** Mobile UX, Accessibility.
- **Impact:** Moderate — a real mobile-specific friction point for a use case (calling directly) that matters for a B2B service business.
- **Effort:** Low — add the same three links into the existing mobile menu markup.
- **Risk:** Low.
- **Recommended solution:** Duplicate phone/email (and optionally social) into the mobile menu.
- **Priority:** **P2**

---

## P3 — Polish

### P3-1: No error/loading/not-found pages
- **Problem:** `app/error.tsx`, `app/loading.tsx`, `app/not-found.tsx` all confirmed absent.
- **Pages affected:** Global (fallback behavior for the whole site).
- **Category:** Technical Quality, UX.
- **Effort:** Low-moderate.
- **Risk:** Low.
- **Recommended solution:** Add on-brand versions of all three.
- **Priority:** P3

### P3-2: No dedicated error/success color token
- **Effort:** Trivial (add one token).
- **Risk:** Low.
- **Priority:** P3

### P3-3: Accent teal re-typed as raw hex in 3 files instead of token reference
- **Effort:** Low.
- **Risk:** Low.
- **Priority:** P3

### P3-4: `PROJECT_CONTEXT.md` internal notes file out of date (wrong accent color, stale "no backend" claim)
- **Effort:** Trivial — it's a docs file, not app code.
- **Risk:** None.
- **Priority:** P3

### P3-5: Repository housekeeping — unused images (`Banner.png`, `logo.png`, `Logo_oracle.jpg`), 5 unused Next.js boilerplate SVGs, 2 stray root-level HTML mockup files (827KB combined)
- **Impact:** Zero runtime effect (confirmed unreferenced, so unbundled); pure repo hygiene.
- **Effort:** Trivial.
- **Risk:** Very low (confirm-unreferenced-then-delete).
- **Priority:** P3

### P3-6: Odoo logo source file (782KB) displayed at ~40px
- **Effort:** Trivial (re-export a smaller source asset).
- **Risk:** Very low.
- **Priority:** P3

### P3-7: About page's leadership section shows placeholder icons and job titles only, no names/photos
- **Category:** Trust/Proof, Content.
- **Effort:** N/A — blocked on the business providing real names/photos, or an explicit decision to stay anonymous.
- **Risk:** Requires human input, not a code risk.
- **Priority:** P3 (not urgent, but the underlying human-input question is worth resolving alongside the other P0/P1 business-fact questions)

### P3-8: Blog has no author bylines beyond "VectorWave Team," no featured images ever populated
- **Effort:** Depends entirely on business input (real authors/images) — otherwise a documentation-only decision that the current style is intentional.
- **Priority:** P3
