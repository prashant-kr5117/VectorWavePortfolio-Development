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
