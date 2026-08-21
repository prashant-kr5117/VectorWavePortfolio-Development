# Controller — Operating Protocol

This is the exact procedure an agent (or a human driving the loop manually) must follow
for every iteration of the autonomous optimization loop. It is a protocol document, not
code — there is no script that executes this automatically yet (see `README.md` "How to
start a loop"). Read `ai-optimization/loop/README.md` first for the overall system this
document operates within.

**Every iteration follows all 16 steps below, in order. Do not skip a step. Do not
combine two unrelated improvements into one iteration (`EVALUATION_RUBRIC.md` rule 3).**

---

## STEP 1 — Read current state

Read `ai-optimization/loop/state.json`. This tells you:
- `current_iteration` — the next iteration number to run.
- `status` — `not_started` / `in_progress` / `blocked` / `idle`. If `blocked`, stop and
  go straight to `HUMAN-DECISIONS.md` — do not proceed to Step 2.
- `human_decision_required` — if `true`, stop. Read `HUMAN-DECISIONS.md`, find the
  open item(s), and wait for a human to resolve them. **Never proceed past a `true` flag
  by guessing the answer.**
- `consecutive_no_improvement` — if this is at or above the threshold in
  `STOP-CONDITIONS.md`, stop and request review instead of starting a new iteration.
- `mode` — SAFE / STANDARD / REVIEW (see `README.md` Section "Loop execution modes").
  This governs what Step 5 is allowed to automate.

## STEP 2 — Inspect Git status

Run `git status` and `git log --oneline -5`. Confirm:
- The working tree matches what `state.json.last_commit` says it should (i.e. nothing
  unexpected has changed since the loop last ran — if it has, a human touched the repo
  outside the loop; treat this the same as `HUMAN-DECISIONS.md` item H-1 and stop).
- The tree is clean, OR the only uncommitted content is from a previous loop iteration
  that never finished (Step 7's checkpoint exists but Steps 8-15 didn't complete) — if
  so, that partial iteration must be resolved (reverted or completed) before starting a
  new one. **Never start a new iteration on top of another iteration's unfinished work.**

## STEP 3 — Read relevant governance

Do not re-read everything every time. Read only what this iteration's task touches:
- Always: `SAFETY_RULES.md`, `EVALUATION_RUBRIC.md` (the rules that gate every change).
- If the task touches a business claim, stat, testimonial, or partnership:
  `BUSINESS_FACTS.md` (mandatory) and check `HUMAN-DECISIONS.md` for an existing entry.
- If the task touches visual design: `BRAND_GUIDELINES.md`, `DESIGN_SYSTEM.md`.
- If the task touches motion/animation: `MOTION_GUIDELINES.md`.
- If the task needs external design-pattern precedent: `DESIGN_BENCHMARKS.md`.
- Always: the most recent 1-2 entries in `CHANGELOG.md` and the most recent 2-3 files in
  `ai-optimization/iterations/`, so this iteration doesn't repeat or contradict very
  recent work.

## STEP 4 — Identify highest-priority unresolved issue

Read `ai-optimization/loop/TASK-QUEUE.md`. Pick the highest-priority `Status: Open` item
that:
1. Has no unresolved `Business decision required?` flag (or that flag has been resolved
   in `HUMAN-DECISIONS.md`).
2. Is not blocked by another open task (check the queue for stated dependencies).

If the queue is stale (evidence has changed since it was last updated — e.g. a prior
iteration already fixed the thing a queued task describes), **update the queue first**,
per `TASK-QUEUE.md`'s own maintenance rule, then re-pick. Do not work from a queue you
know to be wrong.

If two P0 items are open, prefer the one blocking the most other work (e.g. a broken
build blocks everything; fix that first regardless of what else is queued).

## STEP 5 — Determine whether it is safe to automate

Check the selected task against `STOP-CONDITIONS.md` and `HUMAN-DECISIONS.md`'s trigger
list (unverified claims, client names, testimonials, awards, partnerships,
certifications, statistics, client logos, licensing uncertainty, real employee photos,
major brand-direction decisions, ambiguous facts, destructive architecture changes,
legal/compliance uncertainty).

- If the task requires inventing or asserting any fact not already in `BUSINESS_FACTS.md`
  or the current codebase: **do not proceed.** Log it in `HUMAN-DECISIONS.md`, set
  `state.json.human_decision_required = true`, stop.
- If the task is safe under the current `mode` (SAFE only allows low-risk; STANDARD
  allows normal-risk; REVIEW requires a stop-and-confirm before Step 8 for anything
  above low-risk) — proceed.
- If genuinely uncertain whether something counts as safe: treat it as unsafe. The cost
  of an unnecessary human check-in is low; the cost of an invented claim or a silently
  broken page is not (`SAFETY_RULES.md`).

## STEP 6 — Create an iteration plan

Write the plan as the opening section of the iteration's future log entry (don't create
the file yet — draft it, e.g. in the current context/a scratch note). The plan states:
- The single scoped objective (one sentence).
- Which files will change.
- What evidence justifies the change (cite the report/audit/test result).
- What the expected effect is on which `EVALUATION_RUBRIC.md` categories.
- What could go wrong, and what the revert path is.

## STEP 7 — Create a Git checkpoint BEFORE modification

```
git status
```

- **If the working tree is clean:** create a checkpoint by noting the current commit
  hash in the iteration's draft log. No new commit is needed — the current `HEAD` *is*
  the checkpoint to revert to.
- **If the working tree is NOT clean:** stop. Per this protocol's Git Safety rule, do
  not modify a dirty tree — either the previous iteration didn't close out cleanly
  (Step 2 should have caught this) or a human has in-progress work. **Never destroy
  existing uncommitted work by committing over it or discarding it without asking.**
  Set `human_decision_required = true`, log the situation in `HUMAN-DECISIONS.md`, stop.

This is the single most important safety mechanism in the whole loop: every iteration
starts from a known-good, committed `HEAD`, so "revert" always means `git checkout -- .`
/ `git reset --hard <checkpoint-hash>` against a real, recoverable point — never a guess.

## STEP 8 — Implement ONE coherent improvement

Make only the change described in Step 6's plan. Per `SAFETY_RULES.md` and
`EVALUATION_RUBRIC.md` rule 4 ("do not make unrelated changes during an iteration") —
if you notice an unrelated problem while implementing, **do not fix it in the same
iteration.** Add it to `TASK-QUEUE.md` as a new candidate task and keep going.

## STEP 9 — Run validation

At minimum, always:
```
npx tsc --noEmit    (or: rely on `npm run build`'s type-check pass)
npm run lint
npm run build
```
Then, scoped to what the change could plausibly affect (see `README.md`'s validation
section for the judgment rule — do not run everything for a one-line copy fix):
```
npx playwright test e2e/health-check.spec.ts
npx playwright test e2e/accessibility.spec.ts
```
**Any failure here is an automatic REVERT candidate** — proceed to Step 14 with that
recommendation pre-loaded; do not attempt to "fix forward" mid-iteration unless the fix
is trivial and still within the single scoped objective.

## STEP 10 — Capture screenshots

Required whenever the change touches rendered markup/CSS (skip only for changes that
cannot affect layout/visuals, e.g. a metadata-only string change — state why in the log
if skipped). Use a new dated/numbered folder, never overwrite `baseline/` or a prior
iteration's folder:
```
SCREENSHOT_DIR=iteration-<NNN> npx playwright test e2e/screenshots.spec.ts
```
Scope to the affected route(s) where the full 150-shot run isn't warranted — see
`README.md`'s validation judgment rule.

## STEP 11 — Perform visual review

**Actually open and look at the rendered screenshots.** Do not judge success from source
code alone (`SAFETY_RULES.md`'s spirit, `EVALUATION_RUBRIC.md`'s "looks good = 90 is not
a valid score" rule). Check, per `README.md`'s visual-review checklist: hierarchy,
spacing, typography, alignment, responsiveness, consistency with `DESIGN_SYSTEM.md`
tokens, enterprise maturity per `BRAND_GUIDELINES.md`, conversion clarity. Compare
directly against the previous iteration's (or baseline's) screenshot of the same route.

## STEP 12 — Compare against previous state

Diff this iteration's evidence against the prior state on every axis that could plausibly
have changed: axe violation count, Lighthouse scores (if run), screenshot appearance,
build/lint output, business-fact cross-check (`BUSINESS_FACTS.md`). Note every delta,
positive or negative — do not selectively report only improvements.

## STEP 13 — Score using EVALUATION_RUBRIC.md

Score the categories the change could plausibly affect (not all 11 blindly) using the
rubric's objective criteria and evidence requirements. Record: overall score if a full
re-score was done, or per-category deltas if only a partial re-score applies this
iteration (most iterations will be partial — a full 11-category re-score is expensive
and only needed periodically, see `ROADMAP.md` Task R-0 and `README.md`'s scoring
section). State the evidence for every score, per the rubric's own requirement.

## STEP 14 — Decide: ACCEPT / REVISE / REVERT / HUMAN REVIEW

Apply `STOP-CONDITIONS.md`'s automatic-revert rules first (build failure, critical test
failure, broken route, material accessibility regression, major visual regression,
compromised business fact, unjustified major performance regression) — if any apply,
the decision is **REVERT**, no further judgment call needed.

Otherwise:
- **ACCEPT** — tests pass, no meaningful regression, visual quality maintained or
  improved, and (overall score improved OR a critical issue was fixed despite neutral
  scoring — `EVALUATION_RUBRIC.md`/`README.md` scoring philosophy).
- **REVISE** — the direction is right but something needs a small fix within the same
  scoped objective (e.g. a spacing issue found in Step 11) — fix it, then re-run from
  Step 9. Do not expand scope while revising.
- **REVERT** — validation passed but quality is flat or worse, or a stop condition
  fired.
- **HUMAN REVIEW** — genuinely ambiguous (e.g. a borderline visual judgment call, or a
  score that's flat but the change might matter for reasons the rubric doesn't capture).
  Never resolve ambiguity by guessing — that's what this decision exists for.

## STEP 15 — If accepted: commit, update reports, update state

```
git add <only the files this iteration touched>
git commit -m "Iteration <NNN>: <one-line scoped objective>"
```
Never `git add -A`/`git add .` — stage exactly what the plan (Step 6) said would change,
per this repo's own git-safety convention (see the root `CLAUDE.md`/session
instructions). Then:
- Write `ai-optimization/iterations/ITERATION-<NNN>.md` (see `ITERATION-PROTOCOL.md` for
  the exact template).
- Append a `CHANGELOG.md` entry in the existing format.
- Update `ai-optimization/loop/state.json`: `current_iteration`, `last_score`,
  `best_score` (if improved), `last_commit`, `consecutive_no_improvement` (reset to 0 on
  ACCEPT), `last_updated`.
- Update `TASK-QUEUE.md`: mark the task `Status: Done`, add any new tasks discovered
  during implementation (Step 8's rule).

**Never push.** Pushing is not part of this loop under any mode unless a human
explicitly configures and authorizes it separately (`SAFETY_RULES.md`).

On REVERT:
```
git checkout -- .    (or git reset --hard <checkpoint-hash> from Step 7)
```
Still write `ai-optimization/iterations/ITERATION-<NNN>.md` documenting the attempt and
why it was reverted — a reverted iteration is not a deleted one; the log entry is the
record (per `README.md` item 13's iteration log, and per the top-level instruction "STOP
after Workstream 5" pattern established in this project: even rejected work gets logged,
never silently discarded). Update `state.json.consecutive_no_improvement` (+1) and
`last_updated`; do not advance `current_iteration` or `last_commit`.

## STEP 16 — Select next task

Re-run Step 4 against the now-updated `TASK-QUEUE.md`. If `consecutive_no_improvement`
has reached the threshold in `STOP-CONDITIONS.md`, stop instead and set
`status = "blocked"`, `human_decision_required = true` with a note explaining why.

---

## Non-negotiables (apply at every step)

- One coherent improvement per iteration — never bundle unrelated redesigns
  (`EVALUATION_RUBRIC.md` rule 3, this task's own instruction).
- Never invent a business fact, client, testimonial, statistic, certification, or
  partnership at any step (`SAFETY_RULES.md`, `HUMAN-DECISIONS.md`).
- Never modify the production repository — this loop only ever runs in the development
  repo.
- Never install a package without explicit human approval (`SAFETY_RULES.md`).
- Never commit unrelated files, never `git add -A`.
- Never push.
- When uncertain, choose HUMAN REVIEW / stop over guessing.
