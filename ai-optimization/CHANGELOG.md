# Changelog

Iteration log for the AI optimization loop. Stages 1-3 (governance setup, source-level
baseline, browser evaluation infrastructure) made no website changes. The first real
website iteration is logged below.

## Template

Copy this block for each new iteration:

```
### Iteration: 
Date: 
Branch/Commit: 
Target: 
Problem: 
Proposed Change: 
Reason: 
Before Score: 
After Score: 
Regressions: 
Decision: 
Human Approval: 
```

## Entries

### Iteration: Workstream 1 — Global Foundation
Date: 2026-08-20
Branch/Commit: main (VectorWavePortfolio-Development repo), uncommitted working-tree changes — not committed or pushed, per instructions
Target: Global technical/design foundation — typography, performance, accessibility, metadata (not a page redesign)
Problem: Confirmed Geist font override bug (app/globals.css:69), homepage TBT/LCP driven partly by unnecessary client-side hydration and third-party script timing, 31 axe-core violations across all 30 routes (global footer-contrast token + critical contact-form select with no accessible name), zero OpenGraph/canonical/Twitter metadata anywhere (ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md, ai-optimization/reports/RENDERED-BASELINE.md)
Proposed Change: (1) Fix body font-family to use the existing --font-sans/Geist token instead of the Arial override. (2) Fix About page's `preload`→`priority` image-prop typo; defer Zoho SalesIQ + Google Translate scripts to lazyOnload; split TechnologyAndIndustry.tsx and ProcessChains.tsx so only their interactive tab-switchers are client components, static content becomes server-rendered. (3) Fix the shared --color-on-inverse-faint token for WCAG AA footer contrast; add id/htmlFor to the Contact form's lead-source select; make Typewriter/Counter respect prefers-reduced-motion. (4) Add a reusable buildMetadata() helper (lib/seo.ts) with canonical/OpenGraph/Twitter, applied to all 8 route types with each page's existing title/description preserved verbatim; no OG image fabricated.
Reason: See ai-optimization/reports/WORKSTREAM-01-RESULT.md for full before/after evidence per fix.
Before Score: axe-core violations: 31 instances / 30 pages (1 critical). Lighthouse homepage (Stage 3, fresh session): Performance 33, LCP 4.1s, TBT 960ms, CLS 0.122, Accessibility 97, SEO 100, Best Practices 77.
After Score: axe-core violations: 2 instances / 2 pages (0 critical), both confirmed out of scope. Lighthouse homepage (same session as After, 3 runs): Performance 28-33, LCP 7.9-8.2s, TBT 1,860-2,220ms, CLS 0.144-0.145, Accessibility 100, SEO 100, Best Practices 77. Same-session control test (original unmodified code, re-measured immediately after): Performance 26, LCP 12.6s, TBT 3,600ms — proves the raw Before→After Lighthouse comparison is confounded by machine-load drift over the session, and the fair same-session comparison shows a real ~35-48% LCP/TBT improvement. Lighthouse Accessibility score improved on 7/8 representative routes (6 reaching 100), unaffected by the timing confound.
Regressions: None found — 0 console/page errors before and after, 0 broken routes/redirects, 0 accessibility regressions (all categories flat or improved), no visual/content changes beyond the intended font fix, no business-fact changes (verified via git diff + grep for the locked claims in BUSINESS_FACTS.md).
Decision: KEEP — build/type-check/lint (except 2 pre-existing, untouched violations)/all 30 routes' health checks pass; net accessibility and (once measurement noise is controlled for) performance improvement; zero regressions found.
Human Approval: Not yet requested — awaiting human review per SAFETY_RULES.md before this iteration is committed/merged. Nothing was committed or pushed.

### Iteration: Workstream 2 — Premium Global Design System
Date: 2026-08-20
Branch/Commit: main (VectorWavePortfolio-Development repo), uncommitted working-tree changes — not committed or pushed, per instructions
Target: Global visual design system — typography/shadow/color tokens, shared Header/Footer/Card/Button/SectionHeading/form-control components, responsive/motion polish. Explicitly not a homepage or Zoho-page redesign; no business-fact changes.
Problem: Repeated inline card styling across 7+ files (ai-optimization/reports/PRIORITY-MATRIX.md P2-2), header fixed/sticky inconsistency (P2-5), Footer rendered individually by 8 pages instead of centrally (P2-4), no design tokens for shadows/error-success colors/type scale, only 6 elements sitewide with any custom focus styling, inconsistent CTA/button styling per call-site, blog search input and 4 of 5 ContactForm fields still lacking programmatically associated labels.
Proposed Change: (1) New tokens in app/globals.css: --color-success/-error(+surface), --shadow-card/-card-hover (restrained, ink-tinted — deliberately softer than Tailwind's default shadow-lg), a documented --text-* type scale, and a sitewide `:focus-visible` rule. New `@layer components` classes: .section-eyebrow/-heading/-description, .card/.card-interactive/.card-icon, .btn + variants, .form-label/-control/-error. (2) New components/ui/Card.tsx (+CardIcon) and SectionHeading.tsx, applied to every card-grid duplication site found in Stage 2 across Services.tsx, services/page.tsx (3 grids), services/[slug]/page.tsx (2 grids), BlogGrid.tsx, blog/[slug]/page.tsx, about/page.tsx (4 grids), contact/page.tsx (2 cards). (3) Header: one consistent `sticky` behavior sitewide (was fixed-on-homepage-only), mobile menu now includes phone/email (previously desktop-top-bar-only), keyboard-focus now opens the Services dropdown (onFocus/Escape). (4) Footer centralized into app/layout.tsx, removed from the 8 individual pages that previously imported/rendered it. (5) ContactForm: full form-control/label consistency on all 5 fields; blog search input gained a proper associated label (previously had none). (6) Fixed a real testing-infrastructure bug found along the way: e2e/screenshots.spec.ts didn't scroll before capturing fullPage screenshots, so IntersectionObserver-gated (Reveal.tsx) below-the-fold content was captured invisible on long pages — not a site bug, confirmed present in the original Stage 3 baseline screenshots too; fixed for all future captures.
Reason: See ai-optimization/reports/WORKSTREAM-02-RESULT.md for full detail, and ai-optimization/reports/WORKSTREAM-02-IMAGE-OPPORTUNITIES.md for documented (not implemented) image needs.
Before Score: axe-core violations: 2 instances / 2 pages (carried over unchanged from Workstream 1, both confirmed out of scope for this workstream too). Lighthouse homepage (Workstream 1 measurement, same noisy-session caveat): Performance 29, Accessibility 100, SEO 100, Best Practices 77.
After Score: axe-core violations: 2 instances / 2 pages — unchanged, 0 new violations introduced. Lighthouse homepage: Performance 26, Accessibility 100, SEO 100, Best Practices 77 — flat/within the same local-machine measurement noise documented in Workstream 1; no regression signal on any route across 8 representative routes (full table in WORKSTREAM-02-RESULT.md).
Regressions: None found — 0 console/page errors before and after (all 30 routes), 0 new accessibility violations, 0 broken routes/redirects, build/type-check clean, navigation confirmed intact (automated health checks + manual screenshot review at all 5 viewports), no business-fact text changed (verified via diff + grep for the locked claims in BUSINESS_FACTS.md).
Decision: KEEP — build/type-check/lint (same 2 pre-existing, untouched violations as Workstream 1)/all 30 routes' health checks pass; 0 regressions; genuine visual-consistency improvement confirmed via screenshot review against the enterprise-design brief.
Human Approval: Not yet requested — awaiting human review per SAFETY_RULES.md before this iteration is committed/merged. Nothing was committed or pushed.
