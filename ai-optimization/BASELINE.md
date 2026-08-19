# Baseline

## INITIAL BASELINE

Recorded directly from `VectorWave-Site-Audit.md` Section 19. These numbers are **not**
to be silently modified — any future change to them must go through a new scored
iteration and be logged in `CHANGELOG.md` as `BASELINE → ITERATION → NEW SCORE`.

| Category | Score | Confidence |
|---|---|---|
| Visual Design | 68 | [MEASURED] |
| UX | 66 | [MEASURED] |
| Mobile UX | 70 | [OBSERVED] |
| Content | 60 | [OBSERVED] |
| Brand Consistency | 55 | [MEASURED] |
| Conversion / CRO | 62 | [MEASURED] |
| Trust / Proof | 48 | [MEASURED] |
| SEO | 72 | [MEASURED] |
| Accessibility | 64 | [MEASURED] |
| Performance | 65 | [INFERRED — no live speed test was run] |
| Technical Quality | 71 | [MEASURED] |
| Information Architecture | 74 | [OBSERVED] |

Note: `EVALUATION_RUBRIC.md`'s weighted 100-point model uses 11 categories (it excludes
Information Architecture as a separately weighted line and folds related concerns into
UX/Technical Quality). This baseline table preserves all 12 categories exactly as
reported in the audit, since that's the original source of truth — do not merge or drop
any of them when recording future iteration scores.

## Most important global problems (carried from the audit, Section 17)

Ordered by impact-for-effort, highest first:

1. The unused-font bug — a one-line CSS fix, affects the whole site's visual identity.
2. Conflicting "projects delivered" numbers (50+ vs. 15) — needs a real number from the
   business first (see `BUSINESS_FACTS.md`).
3. No social-share preview metadata anywhere.
4. Footer not centralized — currently harmless, a landmine for future pages.
5. Static sitemap file — accurate today, will drift as content changes.
6. No dedicated error/success color in the design system.
7. Accent color re-typed instead of token-referenced in three files.
8. Inconsistent header behavior (fixed on homepage, sticky elsewhere).
9. Two different mechanisms for the same "Book a call" action.
10. No automated tests, no CI pipeline — the biggest long-term risk once any automated
    editing tool starts touching this codebase.
11. `PROJECT_CONTEXT.md` is out of date vs. the real code (wrong accent color, claims the
    contact form has no backend when it does).
12. Unused images/boilerplate and two large stray HTML mockup files in the repo root.

## Recommended first optimization target

Per the audit's own punch list (Section 20) and confirmed independently against the live
code in `DESIGN_SYSTEM.md`: **fix the font-override bug**
([globals.css:69](../app/globals.css#L69)). It is a single-line, single-file CSS change,
carries zero business-fact risk, directly improves the Visual Design and Performance
categories, and is the highest-leverage fix available before any broader design work
begins. It is a strong candidate for the very first scoped iteration once the
optimization loop is actually built — not attempted as part of this governance task.
