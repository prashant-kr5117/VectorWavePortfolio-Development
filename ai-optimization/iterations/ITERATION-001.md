# Iteration 001

Iteration: 001
Date: 2026-08-21
Task: TASK-QUEUE.md Q-003 (blog-index half) — Accessibility (global), P1
Problem: `blog-index`'s `color-contrast` axe violation (serious) — the shared
`--color-ink-faint` token (`#8a93a8`) rendered at 3.07:1 contrast against white, below
the WCAG AA 4.5:1 minimum, on blog card author/date/read-time meta text.
Evidence: `ai-optimization/reports/accessibility/blog-index.json` violations[0]
(`color-contrast`, serious, fgColor `#8a93a8`, bgColor `#ffffff`, ratio 3.07, 18 nodes);
`ai-optimization/loop/TASK-QUEUE.md` Q-003; `STOP-CONDITIONS.md`'s documented known
baseline violation.

## Changes

Darkened `--color-ink-faint` from `#8a93a8` to `#646f89` in `app/globals.css` (single
token definition, one line). Computed to clear WCAG AA against both of the site's
documented light backgrounds with margin — 5.03:1 against `--color-surface` (#ffffff),
4.81:1 against `--color-surface-alt` (#f8fafc) — while staying lighter than
`--color-ink-muted` (6.29:1 against white) to preserve the ink token hierarchy
(ink → ink-soft → ink-muted → ink-faint, each progressively fainter). Confirmed via grep
that all 9 files consuming this token (`Header.tsx`, `BlogGrid.tsx`, `about/page.tsx`,
`services/page.tsx`, `PlatformArchitectureFlow.tsx`, `CaseStudy.tsx`,
`WhyVectorWave.tsx`, `ProcessChainTabs.tsx`, `BusinessDiagnosis.tsx`) use it only on
light surfaces (labels, arrows, captions) — no dark-section usage found, so darkening it
sitewide carries no risk of trading one contrast violation for another.

No markup, component, or business-fact change. Single CSS custom-property value change,
propagated automatically via `var(--color-ink-faint)`.

## Files

- app/globals.css

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint | Pass — 2 pre-existing errors in `ConsultationModal.tsx`/`LanguageSwitcher.tsx` (untouched files, same as every prior workstream); 0 new |
| Build (`npm run build`) | Pass — 36/36 pages generated |
| Playwright health-check | Pass — 31/31 (all 30 routes + /team redirect) |
| axe accessibility (full 30-route suite) | Pass — blog-index violations: 2→0. Sitewide: only `service-zoho-bundled-suite`'s pre-existing, out-of-scope local-color violation remains (unchanged, untouched file/route) |
| Lighthouse | Not run — single hex-value CSS change, no new render-blocking assets/scripts/layout shift per `ITERATION-PROTOCOL.md`'s validation-scope table |

## Screenshots

`ai-optimization/screenshots/iteration-001/` — `blog-index` (all 5 viewports, the fix's
primary target) plus `homepage`, `about`, `services-index` at desktop-1440 (representative
sample of other routes consuming the same shared token), per the "shared token change"
validation row.

## Before score

Accessibility: 92/100 (Q-002 full re-score, capped by 2 known open violations: blog-index
color-contrast + service-zoho-bundled-suite local colors). All other categories: see
`ai-optimization/reports/Q-002-FULL-RESCORE.md` (overall 76.37).

## After score

Accessibility: 96/100 — one of the two known violations is now resolved sitewide; the
remaining one (`service-zoho-bundled-suite`, blocked on H-10/Q-004) is unrelated to this
token and untouched. All other categories unchanged (partial re-score — only
Accessibility plausibly affected by this change).

## Delta

Accessibility +4. Overall weighted score: 76.37 → 76.69 (+0.32, Accessibility's weight is
8/100).

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired (build clean, all routes/nav/
forms unaffected, 0 accessibility regression — a real improvement instead, no business
fact touched, no URL changed). Per `STOP-CONDITIONS.md`'s "what meaningful improvement
means": this fixes a P1 evidence-backed `TASK-QUEUE.md` item, which justifies ACCEPT on
its own regardless of the numerically small +0.32 overall delta — the category-specific
move (+4, Accessibility) is also within the "single category moves by ≥3" meaningful-
improvement threshold.

## Next recommendation

The `service-zoho-bundled-suite` half of Q-003 (local hardcoded colors) is blocked on
Q-004/H-10 (the brand-fork decision) and should not be attempted until that human
decision resolves. Next candidate: Q-009 (About page generic superlatives — P2, low
risk, copy-only, no business decision) or a fresh audit pass for Q-005/Q-006 (Blog/
Contact, per `TASK-QUEUE.md`'s note that those need re-verification before
implementation).
