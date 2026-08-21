# Iteration 003

Iteration: 003
Date: 2026-08-21
Task: Direct human request (follow-up to Iteration 002) — "can we improve it more" for
`TechnologyEcosystemVisual.tsx`'s connector animation. Presented 3 options (animated
connector lines, hover states, Performance measurement); human chose animated connector
lines.
Problem: Iteration 002's connectors were a plain arrow icon that faded/scaled in — a
"flow diagram" that never actually drew a line between its nodes. Human asked for a more
literal, premium "watch the pipeline connect" treatment.
Evidence: Direct human request this session; `motion.dev/ui`'s stagger/spring UI
defaults (already applied in Iteration 002) extended here to an SVG `pathLength`
draw-in, a standard technique for "line draws itself" motion.

## Changes

- Replaced each `Connector`'s arrow-only fade with a two-part sequence in the same
  timing slot: an SVG line draws in first (`pathLength` animated 0→1 via Motion,
  duration 0.3s, custom ease), then a small arrowhead pops in with a spring
  (`stiffness: 400, damping: 25`) right as the line finishes — "this stage's work flows
  into the next," not just "here's an arrow." Separate horizontal (desktop/tablet) and
  vertical (mobile) SVG variants, matching the existing responsive split.
- Switched the whole component's timing model from Motion `variants` +
  `staggerChildren` to a single `useInView` boolean plus an explicit per-element
  `delay` (`BASE_DELAY + slot * STEP`). Reason: a connector's line and arrowhead are two
  differently-animated nested elements sharing one timing slot — nested `variants`
  propagation staggers *all* variant-bearing descendants regardless of nesting depth
  (confirmed empirically in Iteration 002's own timing measurement, which ran faster
  than the naive stagger-count math predicted), which would have made the line+arrowhead
  pair's relative timing unpredictable. Explicit delays remove that ambiguity entirely.
- **Found and fixed a real layout regression the connector redesign introduced**: the
  wider connector footprint (SVG + arrowhead vs. a bare 16px icon) pushed the row over
  its available width at the 1024px tablet breakpoint (measured: 976px content vs 944px
  available) and, after a first narrowing pass, an even worse overflow surfaced at 768px
  (811px vs 720px available — this appears to have been a pre-existing risk at 768px
  that Iteration 002 never actually tested, not something introduced here; the fixed
  168px card width alone is 840px, already tight at 720-944px available). Fix: instead
  of cramming progressively narrower card widths into every breakpoint, moved the
  horizontal-flow breakpoint from `sm:` (640px) to `lg:` (1024px) — 768px now gets the
  same clean vertical stack already proven at mobile-390, and the horizontal row only
  activates where it comfortably fits (1024px: 150px cards; 1280px+: 168px cards).
  Verified via an in-browser `scrollWidth`/`clientWidth` check at 768/1024/1280/1440,
  all non-overflowing, plus visual screenshot review at each width.
- No content, copy, or business-fact change.

## Files

- components/sections/TechnologyEcosystemVisual.tsx

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint (scoped to changed file) | Pass — 0 errors/warnings |
| Build (`npm run build`) | Pass — 36/36 pages (rebuilt twice, once per layout fix) |
| Playwright health-check (homepage) | Pass |
| axe accessibility (homepage) | Pass — 0 violations |
| Overflow check (768/1024/1280/1440, in-browser `scrollWidth` vs `clientWidth`) | Pass at all 4 — 768: 720/720, 1024: 944/944, 1280: 1200/1200, 1440: 1280/1280 (768 and 1024 sit exactly at their available width with the fitted card size, confirmed via screenshot review to not visually crop/wrap/scroll) |
| In-browser stagger timing (1440) | 379ms → 1535ms across 5 cards, ~consistent with Iteration 002's 362ms → 1509ms — confirms the timing-model rewrite (variants → explicit delay) didn't change the felt pacing |
| Visual review | Screenshots at 768 (vertical stack, clean), 1024 and 1440 (horizontal row, connector line + arrowhead clearly visible between every card, no cramping) |

## Screenshots

`ai-optimization/screenshots/iteration-003/` — homepage at desktop-1440, tablet-1024,
tablet-768, mobile-390 (final settled state). Mid-animation / layout verification
screenshots and timing data were captured via ad hoc scratch scripts during this
iteration's own debugging and are not retained (working artifacts, not the iteration's
evidence record — the settled-state screenshots plus the numeric overflow/timing checks
above are the record).

## Before score

UX 78/100, Visual Design 80/100 (Iteration 002 baseline). Overall 77.09.

## After score

- Visual Design: 82/100 (+2) — a literal drawn connector line is a more premium,
  specific execution of `MOTION_GUIDELINES.md`'s "workflow / architecture / data-flow
  animation" pattern than an arrow-only fade; the mid-iteration overflow catch also
  means this ships without a new mobile/tablet layout defect, which a naive version of
  this change would have introduced.
- UX: 78/100 (unchanged) — this iteration is a visual/motion refinement of an already-
  scored UX pattern, not a new interaction; no further UX-category evidence to justify
  moving it again this iteration.
- All other categories unchanged.

## Delta

Visual Design +2 (weight 9) = +0.18. Overall: 77.09 → 77.27.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired. The mid-iteration layout
regression (768/1024 overflow) was caught and fixed *within* this same iteration before
scoring/logging — per `CONTROLLER.md` Step 14's REVISE path ("the direction is right but
something needs a small fix within the same scoped objective... fix it, then re-run from
Step 9"), which is exactly what happened: re-validated build/health-check/axe and
re-verified layout at all 4 widths after the fix, all clean. No dependency added (reused
Iteration 002's `motion` install). No business-fact/URL change.

## Next recommendation

Iteration 002's flagged Performance-measurement gap (no Lighthouse before/after for the
`motion` dependency) still stands and now covers two iterations' worth of added
animation code — worth prioritizing before further motion work on this component.
Otherwise: Q-009 (About page generic superlatives) remains the next queued
`TASK-QUEUE.md` candidate.
