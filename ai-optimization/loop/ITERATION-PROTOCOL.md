# Iteration Protocol — Mechanics and Templates

`CONTROLLER.md` defines *when* and *why* each step happens. This document defines the
exact mechanics: file naming, the iteration log template, the scoring worksheet, and the
validation-scope decision rule. Read alongside `CONTROLLER.md`, not instead of it.

---

## Iteration numbering

`current_iteration` in `state.json` is the next number to use. Iterations are numbered
sequentially starting at `001`, regardless of ACCEPT/REVERT outcome — a reverted
iteration still consumes its number (its log records why), so numbers are a true
chronological record, not just a count of successes.

File: `ai-optimization/iterations/ITERATION-<NNN>.md`, zero-padded to 3 digits
(`ITERATION-001.md`, `ITERATION-002.md`, ... `ITERATION-100.md` if it gets that far).

---

## Iteration log template

Every iteration, ACCEPT or REVERT, produces exactly one file using this template
(matches this task's Section 13 field list):

```markdown
# Iteration <NNN>

Iteration: <NNN>
Date: <YYYY-MM-DD>
Task: <TASK-QUEUE.md ID and one-line title>
Problem: <what evidence-backed issue this addresses>
Evidence: <report/audit/test citation — file + section, not a vague claim>

## Changes
<prose description of what was actually done>

## Files
<exact list of files touched, one per line>

## Tests
| Check | Result |
|---|---|
| TypeScript | |
| ESLint | |
| Build | |
| Playwright health-check | |
| axe accessibility | |
| Lighthouse (if run) | |

## Screenshots
<path to this iteration's screenshot folder, and which routes/viewports were captured>

## Before score
<per-category scores/deltas from Step 13, with evidence — or "not separately re-scored,
inherited from iteration <N-1>" if this iteration's category wasn't touched>

## After score
<same categories, after>

## Delta
<net change, category by category; overall delta if a full re-score was done>

## Decision
ACCEPT | REVISE (then re-log the final state) | REVERT | HUMAN REVIEW

## Reason
<the specific rule or evidence that drove the decision — cite STOP-CONDITIONS.md or
EVALUATION_RUBRIC.md by name where applicable>

## Next recommendation
<what TASK-QUEUE.md item this iteration's outcome points to next, if any>
```

A REVERT entry still fills in every section — "Files" lists what was touched before the
revert, "Decision" is REVERT, "Reason" states which stop condition fired or why quality
didn't improve. Nothing is deleted from the record.

---

## Validation scope — the judgment rule

Per this task's Section 9 instruction ("do not run expensive full-site Lighthouse on
every tiny CSS change... use judgment"), scope validation to what the change could
plausibly affect:

| Change type | Required | Optional / only if plausible impact |
|---|---|---|
| Copy/text-only (no markup structure change) | TypeScript, ESLint, build, health-check on the affected route(s) | axe on affected route(s) if the text change touches an `alt`/`aria-label`/heading |
| Markup/layout/component change | TypeScript, ESLint, build, health-check, axe, screenshots — all scoped to affected route(s) | Lighthouse on affected route(s) if layout/image/script weight could shift |
| Shared component/token change (affects many routes) | Full 30-route health-check + axe, screenshots for a representative sample (not necessarily all 150) | Full Lighthouse representative-route run |
| Global CSS/font/script change | Full 30-route suite across all checks, representative Lighthouse | Full screenshot set only if visual output could differ sitewide |
| Metadata-only (title/description/JSON-LD) | TypeScript, build | Nothing else — no visual/behavioral surface changed |

When genuinely unsure which row applies, run the more expensive tier — the cost of an
unnecessary axe/screenshot pass is minutes; the cost of a missed regression is a bad
ACCEPT decision.

---

## Scoring worksheet

`EVALUATION_RUBRIC.md`'s 11 weighted categories, with the specific evidence source this
loop uses for each (so "scoring" is never a felt-sense number):

| Category | Weight | Evidence source in this repo |
|---|---|---|
| Conversion / CRO | 14 | CTA inventory (manual, per `EVALUATION_RUBRIC.md`'s own method) + screenshot review |
| Trust / Proof | 12 | Claim-by-claim cross-check against `BUSINESS_FACTS.md` (same method as `ai-optimization/reports/TRUST-FACT-AUDIT.md`) |
| Content | 11 | Cross-page grep for the changed claim/copy + manual specificity read |
| UX | 11 | Manual interaction walkthrough or screenshot sequence |
| Visual Design | 9 | Screenshot review + token-usage check against `DESIGN_SYSTEM.md` |
| SEO | 9 | Metadata diff + structured-data validation |
| Accessibility | 8 | `ai-optimization/testing/accessibility-results.json` violation counts, before/after |
| Mobile UX | 8 | 390px screenshot review |
| Brand Consistency | 7 | Token audit of changed files (no new hard-coded color/font outside `DESIGN_SYSTEM.md`) |
| Performance | 6 | `ai-optimization/testing/lighthouse-results.json`, or build-output size diff if Lighthouse wasn't run this iteration |
| Technical Quality | 5 | Build/type-check pass/fail (near-binary, per the rubric's own weighting rationale) |

A **partial re-score** (most iterations) only recomputes the categories the change could
plausibly touch, carrying every other category forward unchanged from the prior
iteration's score. A **full re-score** (periodic — see `ROADMAP.md` Task R-0, and
whenever `consecutive_no_improvement` resets after a HUMAN REVIEW resolution) recomputes
all 11.

**Do not compute a single overall number by feel.** The weighted overall score is:
`Σ(category_score × category_weight) / 100`, using whatever categories have a current
score (partial re-scores still produce a valid weighted overall using the
most-recently-known value for untouched categories).

---

## Where checkpoints and reverts actually point

Step 7's checkpoint is always a real git commit hash, recorded in the iteration's draft
plan before Step 8 starts. A revert is one of:

```
git checkout -- <files this iteration touched>      # partial, still-uncommitted iteration
git reset --hard <checkpoint-hash>                    # full revert to the checkpoint
```

Never use `git clean -f` as part of a revert unless the iteration created genuinely new,
untracked files that need removing too — and even then, review what `git clean -n` would
remove first (this repo's own git-safety convention).
