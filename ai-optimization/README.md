# AI Website Optimization — Governance Layer

This directory is the governance and evaluation foundation for a **future** AI-assisted
optimization loop for the VectorWave Technologies website. It was created directly from
[`VectorWave-Site-Audit.md`](../VectorWave-Site-Audit.md) (the discovery/audit report) and
from direct inspection of the live source code where the audit needed cross-checking.

**This directory does not change the website.** Nothing in `app/`, `components/`, `lib/`,
`public/`, or any config file was modified to produce this governance layer. No packages
were installed. No routes, layouts, colors, typography, or business claims were touched.

## What this is for

A future optimization loop will use these documents as its guardrails: what's true about
the business (`BUSINESS_FACTS.md`), what "good" looks like visually (`BRAND_GUIDELINES.md`,
`DESIGN_SYSTEM.md`, `DESIGN_BENCHMARKS.md`), what's off-limits (`SAFETY_RULES.md`), how
motion should behave (`MOTION_GUIDELINES.md`), how a change gets scored
(`EVALUATION_RUBRIC.md`), and where the site currently stands (`BASELINE.md`). Every
future iteration gets logged in `CHANGELOG.md`.

## Directory contents

| File | Purpose |
|---|---|
| `BUSINESS_FACTS.md` | The locked, verified-facts reference. Anything not here is not allowed to be asserted on the site. |
| `BRAND_GUIDELINES.md` | Target brand personality and visual direction — not yet implemented, descriptive only. |
| `DESIGN_SYSTEM.md` | Current design system as it exists in the live code today, plus a separate target-system section. |
| `EVALUATION_RUBRIC.md` | The weighted 100-point scoring model used to judge every future change. |
| `SAFETY_RULES.md` | Hard rules a future coding/review/judge agent must never violate. |
| `MOTION_GUIDELINES.md` | Motion philosophy for future animation work, including the "what problem does this solve" test. |
| `DESIGN_BENCHMARKS.md` | Research-backed 2026 enterprise/B2B design patterns, evaluated for adopt/adapt/avoid — not a copy of any specific company's design. |
| `BASELINE.md` | The audit's initial 12-category baseline score, locked as the starting reference point. |
| `CHANGELOG.md` | Iteration log template — empty until the optimization loop actually begins running changes. |
| `reviews/` | Future home for individual reviewer-agent output (Design/UX/Content, Technical). Empty today. |
| `screenshots/` | Future home for before/after page screenshots. Empty today — no screenshot tooling has been run yet (see Tool Availability below). |
| `reports/` | Future home for combined Final Judge reports per iteration. Empty today. |
| `iterations/` | Future home for per-iteration working notes/branches metadata. Empty today. |

## Agent architecture (future, not yet built)

Four roles, each with a single clear responsibility. None of these agents exist as running
automation yet — this is the architecture they'll follow once the loop is built.

### Agent 1 — Coding Agent (Claude Code)
- Inspects code, implements exactly one approved, scoped optimization objective per iteration.
- Runs validation (build, type-check, lint) before handing off.
- Preserves existing functionality; never bypasses `SAFETY_RULES.md`.
- Prepares a commit but does not merge or push without human approval (see rule set in
  `SAFETY_RULES.md`).

### Agent 2 — Design / UX / Content Reviewer
- Acts as Principal Product Designer + Creative Director + UX/CRO Strategist in one role.
- Reviews visual design, UX, CRO, content quality, brand consistency, imagery choices,
  motion, trust/proof, and buyer perspective ("would a customer trust this?").
- Combining these into one reviewer (rather than three separate agents) matches the
  audit's own recommendation in Section 21 — a 30-page marketing site doesn't justify
  the coordination overhead of splitting these further.

### Agent 3 — Technical Reviewer
- SEO, accessibility, performance, responsive behavior, technical architecture, broken
  links, metadata, structured data.

### Agent 4 — Final Judge
- Compares before/after screenshots and measurements.
- Combines both reviewers' findings, applies `EVALUATION_RUBRIC.md` weights, computes the
  new score.
- Identifies regressions against `SCORE_RULES` (see `EVALUATION_RUBRIC.md`).
- Accepts or rejects the iteration. **Does not write or modify code.**

## Tool availability (inspected 2026-08-20, nothing installed)

| Tool | Status |
|---|---|
| Automated test framework | **MISSING — REQUIRES APPROVAL.** No test files exist anywhere in the repo (only `node_modules` third-party test files matched a repo-wide search). `package.json` has no test script. |
| Playwright | **Present only as a transitive lockfile entry** (`@playwright/test@^1.51.1` appears in `package-lock.json`), pulled in indirectly by another dependency — it is **not** in `package.json`'s `devDependencies` and is not configured or usable as a project test runner today. Effectively **MISSING — REQUIRES APPROVAL** if a real E2E/screenshot suite is wanted. |
| Lighthouse / automated performance testing | **MISSING — REQUIRES APPROVAL.** No config, no CI step, no prior report found. The audit itself notes no live speed test was ever run. |
| Accessibility testing (axe, etc.) | **MISSING — REQUIRES APPROVAL.** Nothing found in dependencies or config. |
| Existing screenshot tooling | **MISSING — REQUIRES APPROVAL.** No screenshot scripts or visual-regression setup found. |
| CI/CD pipeline | **MISSING — REQUIRES APPROVAL.** No `.github/workflows`, no Vercel config, no Docker setup in the repo. |
| Linting | **Available.** `eslint` + `eslint-config-next` are real, installed devDependencies with a `lint` script in `package.json`. |
| Type-checking | **Available.** `typescript` strict mode is on (`tsconfig.json`), with a `tsconfig.check.json` / `tsconfig.check.tsbuildinfo` present, suggesting a type-check pass already happens in some workflow even without a dedicated npm script for it. |
| Build validation | **Available.** `next build` (`npm run build`) is a real, working script — this is the minimum safety net for step 3 of the future loop. |

**Conclusion:** the site currently has *build* and *type-check* safety nets, but nothing for
*visual regression*, *performance*, or *accessibility* measurement. Per the audit's own
Section 20 item 9 and Section 25 item 11 — and per `SAFETY_RULES.md` in this directory —
those need to be decided on and put in place, with explicit human approval, before any
automated optimization loop starts making changes on its own.

## What this task deliberately did NOT do

- Did not modify any file outside `ai-optimization/`.
- Did not install Playwright, Lighthouse, or any other package.
- Did not run a build, a live speed test, or take screenshots (no tooling exists yet, and
  doing so was out of scope for this task).
- Did not build the optimization loop itself, any automated commit/push logic, or any
  autonomous change mechanism.
- Did not fabricate any business fact, client, testimonial, statistic, award, or
  certification. See `BUSINESS_FACTS.md` for the exact boundary of what's known vs.
  unknown.
