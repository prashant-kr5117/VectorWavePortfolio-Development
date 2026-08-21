# Q-002 — Full Rubric Rescore (post-Workstream-5, against committed baseline `af99005`)

Per `ai-optimization/loop/TASK-QUEUE.md` Q-002 and `ITERATION-PROTOCOL.md`'s scoring
worksheet. This is a **full** 11-category re-score (the periodic kind — first one since
`BASELINE.md`, required before the loop's first iteration per `README.md` "How to start
a loop"). Method: apply `EVALUATION_RUBRIC.md`'s objective criteria to the evidence
already logged in `CHANGELOG.md`'s 5 workstream entries, `ai-optimization/reports/
TRUST-FACT-AUDIT.md`, and `DESIGN_SYSTEM.md`, rather than re-deriving from zero — this
is what `ITERATION-PROTOCOL.md`'s worksheet specifies as the evidence source for most
categories. Not a fresh screenshot-by-screenshot audit; a periodic full re-score is
expected to be superseded by the next one (`ROADMAP.md` Task R-0).

## Scores

| Category | Weight | Baseline | New | Δ | Evidence |
|---|---|---|---|---|---|
| Conversion / CRO | 14 | 62 | 74 | +12 | WS3 removed duplicate "book a call" mechanism, added contextual CTAs to Maxvill case study (repositioned near proof, `CaseStudy` component); WS4 replaced one generic sitewide CTA with per-platform contextual CTAs (`ServiceCTA.tsx`) on 18 service pages. |
| Trust / Proof | 12 | 48 | 70 | +22 | WS3 removed unverified "Zoho Authorised Partner" badge + contradicted "50+" stat; WS5's full claim audit (`TRUST-FACT-AUDIT.md`) removed Salesforce (4 locations), "Certified," "Award Winning," 3 unsourced stats, 4 unverified partner logos — replaced only with code-derived real numbers or nothing. Largest single-category gain, still capped: H-2 (Zoho cert), H-7 (team photo), H-8 (leadership names/photos), H-9 (Maxvill asset) remain open per `HUMAN-DECISIONS.md`. |
| Content | 11 | 60 | 72 | +12 | WS4 replaced generic Odoo/MS365 copy with source-verified specifics (`SERVICE-CONTENT-RESEARCH.md`) across 10 services, added problem/useCases/integrations to all 19; WS3 fixed the 50+/15 project-count contradiction. Q-009 (generic superlatives on About) still open — not yet fixed. |
| UX | 11 | 66 | 76 | +10 | WS2 unified header/sticky behavior, centralized Footer, keyboard-accessible dropdown; WS3 restructured homepage into the approved 9-section blueprint; WS4 gave all 18 templated service pages a consistent 7-section structure (was a thin 2-section template). |
| Visual Design | 9 | 68 | 78 | +10 | WS1 fixed the font-override bug; WS2 introduced shared tokens/components (Card, SectionHeading, shadows, type scale) replacing repeated inline styling. Capped: Q-004/H-10 (`/services/zoho-bundled-suite` full design-system fork) and Q-008 (`max-w-5xl`/`max-w-6xl` inconsistency) still open. |
| SEO | 9 | 72 | 88 | +16 | WS1 added `buildMetadata()` (canonical/OG/Twitter) to all 8 route types, verified titles/descriptions preserved. Lighthouse SEO measured 100 on every representative route across all 5 workstreams. Capped below max: static sitemap (`BASELINE.md` problem #5) not yet addressed. |
| Accessibility | 8 | 64 | 92 | +28 | axe-core: 31 violations/30 pages (1 critical) at Stage 3 → 2 violations/2 pages (0 critical, both known/out-of-scope), held flat with zero regressions across all 5 workstreams. Lighthouse Accessibility 100 on every measured route since WS1. Capped: the 2 known violations (Q-003) remain open. |
| Mobile UX | 8 | 70 | 78 | +8 | WS2 added phone/email to the mobile menu (previously desktop-top-bar only — a named baseline gap). All 5 workstreams captured and visually reviewed 390px screenshots with no breakage found. |
| Brand Consistency | 7 | 55 | 62 | +7 | WS2 unified most of the site on shared tokens. Modest gain only: the rubric's own stated reason for this category's low baseline score — the `/services/zoho-bundled-suite` fork — is explicitly still open (H-10) and unresolved by any workstream so far. |
| Performance | 6 | 65 | 70 | +5 | WS1's same-session controlled test showed a real ~35-48% LCP/TBT improvement (deferred third-party scripts, server-rendered static sections) once machine-load noise is controlled for. Raw Lighthouse Performance stayed within a noisy 26-47 band across workstreams on this shared, unthrottled machine — no clean throttled measurement exists yet to certify a precise current number, so this stays a conservative, low-confidence increase pending a controlled remeasurement. |
| Technical Quality | 5 | 71 | 85 | +14 | Clean build/type-check/lint and 31/31 health checks across all 5 workstreams, 0 regressions, 0 new dependencies; 2 real bugs caught and fixed during implementation itself (JSX whitespace bug in WS4, screenshot-capture scroll bug in WS2). |

## Weighted overall

`Σ(category_score × category_weight) / 100`:

```
74×14 + 70×12 + 72×11 + 76×11 + 78×9 + 88×9 + 92×8 + 78×8 + 62×7 + 70×6 + 85×5
= 1036 + 840 + 792 + 836 + 702 + 792 + 736 + 624 + 434 + 420 + 425
= 7637
÷ 100 = 76.37
```

**New `best_score.overall`: 76.37** (baseline was 62.92 — a +13.45 point improvement
across Workstreams 1-5, consistent with the volume and evidence quality logged in
`CHANGELOG.md`).

## Confidence notes / what would sharpen this further

- **Performance** is the lowest-confidence number here — the existing evidence is all
  from an unthrottled, shared, noisy machine. A clean throttled Lighthouse run (desktop +
  mobile, representative routes) would let a future iteration replace this estimate with
  a directly measured one.
- This re-score reuses each workstream's own self-reported evidence rather than
  independently re-deriving every category from raw screenshots — appropriate for a
  periodic full re-score per `ITERATION-PROTOCOL.md`, but the next full re-score should
  independently re-verify at least Trust/Proof and Accessibility (the two categories with
  the largest deltas) against fresh evidence rather than carrying this one forward
  indefinitely.
- Both known-open accessibility violations (Q-003) and the brand fork (Q-004/H-10) are
  already correctly identified in `TASK-QUEUE.md` as the next highest-leverage items —
  this re-score's category caps agree with that prioritization independently.
