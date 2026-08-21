# Autonomous Optimization Loop

## Purpose

This directory turns the manually-driven VectorWave workstream process (Stages 1-3,
Workstreams 1-5 — all documented in `ai-optimization/reports/` and `CHANGELOG.md`) into a
governed, repeatable, iterative loop: **AUDIT → PRIORITIZE → PLAN → IMPLEMENT → BUILD →
TEST → SCREENSHOT → ACCESSIBILITY REVIEW → PERFORMANCE REVIEW → VISUAL REVIEW → SCORE →
ACCEPT OR REVERT → LOG → NEXT ITERATION.**

The goal is continuous improvement toward a **premium, modern, trustworthy, enterprise
technology consultancy** — not maximum change volume, not novelty for its own sake, and
never blind optimization. Every rule in this directory exists to keep the loop from doing
something a careful human reviewer wouldn't.

**This directory sets up the controller. It does not run it.** No file here is
executable automation — everything is a protocol document an agent (or a human) follows
step by step. See "How to start a loop" below for what actually kicks off an iteration.

---

## Architecture

```
ai-optimization/
├── loop/                      ← this directory: the controller's own governance
│   ├── README.md              ← you are here
│   ├── CONTROLLER.md          ← the exact 16-step protocol for every iteration
│   ├── ITERATION-PROTOCOL.md  ← mechanics: file templates, scoring worksheet, validation scope
│   ├── ROADMAP.md             ← current remaining work, reprioritized from evidence
│   ├── TASK-QUEUE.md          ← the operational queue CONTROLLER.md Step 4 reads
│   ├── STOP-CONDITIONS.md     ← when to revert one iteration vs. halt the whole loop
│   ├── HUMAN-DECISIONS.md     ← living log of open questions only a human can answer
│   └── state.json             ← the loop's single source of truth for where it left off
├── iterations/                 ← one ITERATION-<NNN>.md per iteration, ACCEPT or REVERT
├── reviews/                    ← individual reviewer-agent output, if/when the
│                                  Design/UX/Content and Technical reviewer roles
│                                  (README.md's original "Agent architecture" section)
│                                  are actually split into separate passes
├── reports/                    ← existing, pre-loop: Stage 1-3 + Workstream 1-5 results,
│                                  the trust/image audits, this setup's own report
├── screenshots/                ← baseline/ (canonical) + one dated/numbered folder per
│                                  workstream or iteration since
└── testing/                    ← machine-readable test output (routes, accessibility,
                                   font-check, Lighthouse) the loop reads as evidence
```

Everything the loop needs to make a decision already exists as a real file somewhere in
`ai-optimization/` — the loop's job is to read the right ones at the right time
(`CONTROLLER.md` Step 3), never to guess.

---

## How the loop works (short version)

1. Read `state.json` to see where things left off.
2. Read `TASK-QUEUE.md`, pick the highest-priority open, unblocked task.
3. Check it against `HUMAN-DECISIONS.md`'s trigger list — if it needs a fact, claim, or
   decision that isn't already verified, **stop and log it, don't guess.**
4. Checkpoint (a clean git `HEAD`), implement exactly one scoped change, validate, screenshot,
   visually review, score against `EVALUATION_RUBRIC.md`, decide ACCEPT/REVISE/REVERT/HUMAN
   REVIEW, log the outcome in `iterations/`, update `CHANGELOG.md` and `state.json`.
5. Pick the next task. Repeat, until a stop condition fires.

The full, exact procedure is `CONTROLLER.md` — this is the summary, not a substitute for
reading it before running an iteration.

---

## Safety model

Every safety rule already established for the manual workstream process
(`ai-optimization/SAFETY_RULES.md`) applies unchanged to every automated iteration. The
loop adds nothing that weakens those rules — it exists specifically to make sure they get
followed identically every time, without relying on a human remembering to check each
one:

- Never invent a client, testimonial, statistic, certification, partnership, or business
  result.
- Never change contact information without explicit human approval.
- Never present a hypothetical example as real (see `BRAND_GUIDELINES.md`'s Case Study
  Policy).
- Never change a business claim without a human first approving a `BUSINESS_FACTS.md`
  update.
- Never break a URL without a redirect in the same change.
- Never remove SEO-critical elements without an equivalent replacement.
- Never introduce a new font/color/library outside `DESIGN_SYSTEM.md`'s current or
  approved-target tokens.
- Never bundle unrelated changes into one iteration.
- Never skip validation, never merge without the checks in `CONTROLLER.md` Step 9
  passing.
- Never install a package without explicit human approval.
- **Never push.** Not in any mode, not automatically, ever — see Git model below.

## Git model

Every iteration starts from a clean, committed `HEAD` (`CONTROLLER.md` Step 7) and ends
one of two ways: a new commit (ACCEPT) or a full revert back to that same `HEAD`
(REVERT) — never a half-applied state. This means:

- **Revert is always cheap and always safe.** `git reset --hard <checkpoint-hash>` (or
  `git checkout -- .` for a still-uncommitted partial attempt) recovers the exact
  pre-iteration state, every time.
- **The loop never commits over existing uncommitted work.** If `git status` isn't clean
  before an iteration starts, the loop stops (`CONTROLLER.md` Step 7) — it does not
  assume it's safe to build on top of, or discard, whatever's already there.
- **The loop never pushes.** Commits stay local until a human explicitly pushes them —
  this is unconditional across every mode (SAFE/STANDARD/REVIEW), per this task's own
  instruction and `SAFETY_RULES.md`.
- **The loop never touches the production repository.** This entire system operates only
  in the development repo, as stated at the top of every workstream instruction so far.
- **Right now, the working tree is NOT clean** — see `HUMAN-DECISIONS.md` H-1. The loop
  cannot run its first iteration until that's resolved.

## Human decision gates

The loop stops and writes to `HUMAN-DECISIONS.md` whenever a task would require it to
assert or act on: an unverified business claim, a client name, a testimonial, an award,
a partnership, a certification, a project statistic, a client logo, anything with
copyright/licensing uncertainty, a real employee/team photograph, a major
brand-direction decision, ambiguous factual information, a destructive architecture
change, or anything with legal/compliance uncertainty. Full detail and the current list
of open items: `HUMAN-DECISIONS.md`.

This is not a rare edge case — it's expected to fire often, by design. A loop that never
hits a human decision gate on a trust-and-credibility-focused site would be a sign
something's wrong with the gate, not a sign of a smoothly running loop.

## Validation

Every iteration runs, at minimum: TypeScript, ESLint, `next build`. Beyond that,
`ITERATION-PROTOCOL.md`'s validation-scope table decides what else runs (health-check,
axe, screenshots, Lighthouse) based on what kind of change it is — a copy-only fix
doesn't need a full 150-screenshot capture, a shared-component change does. Judgment is
explicit and documented per iteration, not skipped by default.

## Scoring

Every iteration scores against `ai-optimization/EVALUATION_RUBRIC.md` — the same
weighted 11-category model used for `BASELINE.md` and every workstream since. The loop
does not invent a new scoring model. `ITERATION-PROTOCOL.md`'s scoring worksheet maps
each category to the exact evidence file/method to use, so a score is never a felt sense.
Most iterations produce a **partial** re-score (only the categories the change could
plausibly affect); a **full** re-score happens periodically (see `ROADMAP.md` Task R-0)
and whenever a halt-and-resume cycle completes.

Acceptance philosophy (`EVALUATION_RUBRIC.md`, this task's Section 11): a change is
generally accepted when tests pass, no meaningful regression exists, visual quality is
maintained or improved, and **either** the overall score improves **or** a critical issue
was fixed despite a neutral score. The loop does not chase numbers at the expense of real
UX — see `STOP-CONDITIONS.md`'s "what meaningful improvement means" section for how this
is operationalized, not just stated as a principle.

## Iteration lifecycle

`not queued → selected (Step 4) → safety-checked (Step 5) → planned (Step 6) →
checkpointed (Step 7) → implemented (Step 8) → validated (Step 9) → screenshotted (Step
10) → visually reviewed (Step 11) → compared (Step 12) → scored (Step 13) → decided (Step
14) → committed-and-logged or reverted-and-logged (Step 15) → next task selected (Step
16)`. Every iteration, whether ACCEPTed or REVERTed, produces exactly one
`ai-optimization/iterations/ITERATION-<NNN>.md` file — see `ITERATION-PROTOCOL.md` for
the exact template.

## Loop execution modes

- **SAFE** — only low-risk improvements (copy clarity, metadata, small CSS/token fixes
  with no layout restructuring, accessibility fixes with a well-understood pattern).
  Anything above low-risk gets deferred to `TASK-QUEUE.md` rather than attempted.
- **STANDARD** (default) — normal autonomous optimization: any task from the queue that
  clears `CONTROLLER.md` Step 5's safety check, at any risk tier, proceeds through the
  full protocol.
- **REVIEW** — like STANDARD, but stops **before Step 8** on anything above low-risk and
  requests human approval of the plan (Step 6's output) before implementing. Useful when
  a human wants to supervise a batch of iterations without fully halting the loop between
  each one.

Set the mode in `state.json.mode`. Default: `STANDARD`.

## How to start a loop

There is no automated scheduler or script in this repository yet — starting an
iteration means an agent (or a human) reads `state.json`, confirms
`human_decision_required` is `false` and `status` is not `blocked`, and then follows
`CONTROLLER.md` from Step 1. Before the very first iteration can start at all:

1. Resolve `HUMAN-DECISIONS.md` H-1 (commit or discard the current 77 uncommitted
   files).
2. Complete `TASK-QUEUE.md` Q-002 (a fresh full rubric score against the committed
   baseline).
3. Set `state.json.status = "idle"`, `human_decision_required = false`.
4. Begin `CONTROLLER.md` Step 1 for iteration 001.

## How to stop a loop

Between iterations, at the end of any Step 16: set `state.json.status = "idle"` (pauses,
resumable) or `"blocked"` (a stop condition fired — see `STOP-CONDITIONS.md`). To force a
stop mid-iteration (rare — normally let Step 15's ACCEPT/REVERT complete first): finish
the current iteration's REVERT path so the tree returns to its last clean checkpoint,
then set `status = "idle"`. Never leave the tree in a half-applied state between runs.

## How to recover/revert

- **Revert one iteration:** `git reset --hard <the checkpoint-hash recorded in that
  iteration's log>`. The iteration's `ai-optimization/iterations/ITERATION-<NNN>.md`
  file stays (it's a historical record, not undone) — only the code reverts.
- **Recover from a halted loop:** resolve the specific item in `HUMAN-DECISIONS.md`
  (mark it Resolved with the actual resolution, not just a status flip), then reset
  `state.json.human_decision_required = false`, `status = "idle"`, and
  `consecutive_no_improvement = 0` if that was the halt reason. Nothing about the code
  needs fixing to resume — the halt was a decision gate, not a bug.
- **Recover from a mid-iteration crash/interruption** (an agent stopped between Step 8
  and Step 15): the tree is left as a diff against `state.json.last_commit`. Either
  finish the iteration from wherever it left off (re-run validation from Step 9) or
  revert to `last_commit` and re-select the task — never leave it half-done across
  separate loop invocations (`CONTROLLER.md` Step 2 checks for exactly this).

---

## Current status

**The loop is not yet running its first iteration.** See "How to start a loop" above —
`HUMAN-DECISIONS.md` H-1 (uncommitted Workstream 1-5 baseline) blocks it. Once resolved,
`ai-optimization/reports/AUTONOMOUS-LOOP-SETUP.md` documents this setup's full audit
trail and exactly what to do next.
