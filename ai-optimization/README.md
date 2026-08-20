# AI Website Optimization — Governance Layer

This directory is the governance and evaluation foundation for a **future** AI-assisted
optimization loop for the VectorWave Technologies website. It was created directly from
[`VectorWave-Site-Audit.md`](../VectorWave-Site-Audit.md) (the discovery/audit report) and
from direct inspection of the live source code where the audit needed cross-checking, then
extended across Stage 2 (baseline evaluation) and Stage 3 (browser evaluation
infrastructure).

**This directory, plus `playwright.config.ts` and `e2e/` at the repo root, does not
change the website itself.** Nothing in `app/`, `components/`, `lib/`, `public/`, or any
existing config file was modified to build this governance/evaluation layer. Stage 3
*did* install real dev-dependencies (`@playwright/test`, `@axe-core/playwright`,
`lighthouse`) and add `npm run e2e:*` scripts — see "Stage 3 update" below for exactly
what changed and why. No production routes, layouts, colors, typography, or business
claims were touched at any stage.

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
| `screenshots/baseline/{desktop,tablet,mobile}/` | 150 real full-page screenshots (30 routes × 5 viewports), captured in Stage 3. This is the canonical visual reference — see `screenshots/SCREENSHOT-STATUS.md` (Stage 2 blocker note, now resolved) and `testing/README.md` (re-capture convention). |
| `reports/STAGE-2-BASELINE-REVIEW.md`, `PRIORITY-MATRIX.md`, `DESIGN-OPPORTUNITY-MAP.md` | Stage 2's source-level evaluation, priority ranking, and opportunity map. |
| `reports/RENDERED-BASELINE.md` | Stage 3's real browser-measured baseline (screenshots, health checks, axe-core accessibility, Lighthouse, font verification) — supersedes Stage 2's source-only inferences wherever they overlap. |
| `reports/accessibility/<route>.json`, `reports/lighthouse/<route>.json` | Full per-route detail behind `RENDERED-BASELINE.md`'s summaries. |
| `testing/` | Machine-readable summary JSON + the generated route list + instructions for reproducing a baseline run. See `testing/README.md`. |
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

## Tool availability (last updated Stage 3, 2026-08-20)

| Tool | Status |
|---|---|
| Automated test framework (E2E/browser) | **Available as of Stage 3.** `@playwright/test` is a real `devDependency`, Chromium browser installed, config at `playwright.config.ts`, specs in `e2e/`. |
| Playwright | **Available.** No longer a transitive-only lockfile reference — installed and configured for screenshots, health checks, and accessibility testing. See `ai-optimization/testing/README.md` for exact run commands. |
| Lighthouse / automated performance testing | **Available as of Stage 3.** `lighthouse` is a real `devDependency`; `e2e/lighthouse-audit.mjs` drives it via `chrome-launcher`, reusing Playwright's already-downloaded Chromium binary rather than depending on a system-installed Chrome. Currently run against a representative 8-route subset (full-route Lighthouse is slow — ~20-40s/route). |
| Accessibility testing (axe-core) | **Available as of Stage 3.** `@axe-core/playwright` runs against all 30 routes in `e2e/accessibility.spec.ts`. |
| Screenshot tooling | **Available as of Stage 3.** `e2e/screenshots.spec.ts` captures full-page screenshots for all 30 routes × 5 viewports; baseline set exists at `screenshots/baseline/`. |
| Unit/component test framework | **Still MISSING — REQUIRES APPROVAL if wanted.** Stage 3 only added browser/E2E-level tooling (screenshots, health checks, axe, Lighthouse), which is what the optimization loop actually needs for visual/accessibility/performance regression checking. No unit test framework (Jest/Vitest) was added — not required for this loop's purpose, and out of scope unless separately requested. |
| CI/CD pipeline | **Still MISSING — REQUIRES APPROVAL.** No `.github/workflows`, no Vercel config, no Docker setup in the repo. The tooling above runs locally/on-demand only; nothing runs it automatically yet. |
| Linting | **Available.** `eslint` + `eslint-config-next`, `lint` script in `package.json`. |
| Type-checking | **Available.** `typescript` strict mode; the new `e2e/` TypeScript files pass the same `next build` type-check (verified in Stage 3). |
| Build validation | **Available.** `next build` (`npm run build`) — confirmed working in Stage 3 with the new `e2e/` files present. |

**Conclusion:** the site now has real build, type-check, visual-regression (screenshot),
accessibility (axe-core), and performance (Lighthouse) measurement capability — all four
gaps identified at the end of Stage 2 are closed. What's still missing is automation
(CI/CD) to run this tooling without a human triggering it, and a unit-test framework
(not required by this loop, and not added). Per `SAFETY_RULES.md`, a human should still
gate any actual optimization loop from running unsupervised until CI exists.

## The future optimization loop (documented only — not implemented)

Once a human decides to actually start running optimization iterations, each one is
intended to follow this sequence. **None of this runs automatically today** — every step
below is triggered by a human running a command; there is no scheduler, no CI trigger,
and no autonomous change mechanism.

```
AUDIT → CHANGE → BUILD → SCREENSHOT → ACCESSIBILITY → PERFORMANCE
  → DESIGN REVIEW → TECHNICAL REVIEW → FINAL JUDGE → KEEP / REVERT
```

1. **AUDIT** — confirm the current state against `BASELINE.md` / the latest
   `CHANGELOG.md` entry; pick exactly one scoped objective from `PRIORITY-MATRIX.md`
   (per `EVALUATION_RUBRIC.md`'s "one objective per iteration" rule).
2. **CHANGE** — Agent 1 (Coding Agent) implements the single scoped change, on a
   separate branch, never on `main` (`SAFETY_RULES.md`).
3. **BUILD** — `npm run build` must succeed and type-check cleanly. A build failure
   rejects the iteration outright (`EVALUATION_RUBRIC.md` rule 6) before any review
   even starts.
4. **SCREENSHOT** — re-run `e2e/screenshots.spec.ts` against the changed branch, into a
   new dated folder (never overwriting `screenshots/baseline/` — see
   `testing/README.md`).
5. **ACCESSIBILITY** — re-run `e2e/accessibility.spec.ts`; compare violation counts
   against the current baseline in `reports/RENDERED-BASELINE.md`.
6. **PERFORMANCE** — re-run `node e2e/lighthouse-audit.mjs` on the affected route(s);
   compare against the current Lighthouse baseline.
7. **DESIGN REVIEW** — Agent 2 (Design/UX/Content Reviewer) compares before/after
   screenshots against `BRAND_GUIDELINES.md`, `DESIGN_SYSTEM.md`, and
   `DESIGN_BENCHMARKS.md`.
8. **TECHNICAL REVIEW** — Agent 3 (Technical Reviewer) checks the accessibility/
   performance/SEO deltas and the code itself against `SAFETY_RULES.md`.
9. **FINAL JUDGE** — Agent 4 combines both reviews, applies `EVALUATION_RUBRIC.md`
   weights, checks for regressions per the score rules, and recommends KEEP or REVERT.
   The Final Judge never writes code.
10. **KEEP / REVERT** — a human approves the merge (required for at least the first
    several rounds per `SAFETY_RULES.md`); on REVERT, the branch is discarded and the
    attempt is still logged in `CHANGELOG.md` for the historical record.

This sequence is a direct extension of the Agent Architecture section above, now that
Stage 3 has given steps 4-6 real tooling to run rather than being blocked. Building the
actual orchestration (a script or agent that runs this sequence end-to-end) is explicitly
**out of scope** for Stage 3 — this section documents the intended shape only.

## What Stage 1/2 deliberately did NOT do (historical)

- Did not modify any file outside `ai-optimization/`.
- Did not install any package.
- Did not run a build, a live speed test, or take screenshots (no tooling existed yet).
- Did not build the optimization loop itself, any automated commit/push logic, or any
  autonomous change mechanism.
- Did not fabricate any business fact, client, testimonial, statistic, award, or
  certification. See `BUSINESS_FACTS.md` for the exact boundary of what's known vs.
  unknown.

## Stage 3 update (2026-08-20) — what changed and why

Stage 3 built the browser evaluation infrastructure Stage 2 identified as missing. This
is infrastructure only — no website redesign, no font fix, no content change, no
business-claim change. Exactly what changed:

- **Installed** (`devDependencies` only): `@playwright/test`, `@axe-core/playwright`,
  `lighthouse` — plus Playwright's Chromium browser binary (downloaded to the OS-level
  Playwright cache, not tracked in the repo).
- **Added**, all new files, nothing existing modified: `playwright.config.ts` (repo
  root), `e2e/` (route list, viewport definitions, global setup, and 4 test specs, plus
  the Lighthouse script), and new `npm run e2e*` scripts in `package.json`.
- **Ran** the full infrastructure once against an unmodified production build, producing
  `reports/RENDERED-BASELINE.md`, 150 baseline screenshots, and the JSON detail behind
  both.
- **Did not** touch `app/`, `components/`, `lib/`, `public/`, or any existing config
  file. `git diff` on every previously-tracked file is empty — see
  `reports/RENDERED-BASELINE.md`'s Git Safety section for the exact verification.
- **Did not** fix the font bug, change any color/layout/content, or implement any part
  of the loop diagram above beyond documenting it.
