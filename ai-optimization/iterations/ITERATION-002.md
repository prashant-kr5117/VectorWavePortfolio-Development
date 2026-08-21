# Iteration 002

Iteration: 002
Date: 2026-08-21
Task: Direct human request (not sourced from `TASK-QUEUE.md`) — sequenced/staggered
reveal animation for the homepage's "How the pieces connect" flow diagram
(`TechnologyEcosystemVisual.tsx`), designed against `motion.dev/ui`'s stagger+spring
patterns per the human's explicit request.
Problem: The component already attempted a per-card stagger (`style={{ transitionDelay:
'${index*80}ms' }}` on each card) but it had no effect: the cards animate via a CSS
`@keyframes` animation, and `transition-delay` only applies to CSS `transition`, not
`animation`. Worse, that keyframe animation fired once at component mount (page load)
and finished in 0.5s — long before the outer `Reveal` wrapper's scroll-triggered
visibility ever made the block visible. Net effect: by the time a visitor scrolled the
section into view, every card had already silently finished animating off-screen, so the
whole block just appeared as one flat, simultaneous fade — no visible sequence at all.
Evidence: Direct code read of `components/sections/TechnologyEcosystemVisual.tsx` (prior
version) and `components/Reveal.tsx`; confirmed via in-browser timing measurement (see
"Tests" below) that the pre-existing implementation had no observable per-card stagger.

## Changes

Per human decision (`AskUserQuestion`, this session): installed the `motion` npm package
(explicit approval given for this new dependency, required by `SAFETY_RULES.md`) rather
than building a CSS-only approximation. Rewrote `TechnologyEcosystemVisual.tsx`:

- Replaced the outer `<Reveal>` wrapper with `motion.div` (`whileInView`, `viewport={{
  once: true, amount: 0.2 }}`) driving a `staggerChildren: 0.11, delayChildren: 0.05`
  sequence — the single trigger now drives both the section-level fade-in and the
  internal per-node stagger, eliminating the two-independent-systems bug above.
- Each stage card and connector arrow is a `motion.div` with a spring transition
  (`stiffness: 305, damping: 33` for nodes, `stiffness: 400, damping: 25` for the
  smaller connector arrows) — these are motion.dev/ui's own published UI defaults,
  translated into this component rather than copied as decoration.
- Wrapped in `MotionConfig reducedMotion="user"` — required because Motion animates via
  inline styles/WAAPI, not CSS `animation`/`transition` properties, so
  `app/globals.css`'s existing `prefers-reduced-motion` media query (lines 370-379) does
  not reach it. This is the functional equivalent for Motion-driven content, per
  `MOTION_GUIDELINES.md`'s non-negotiable reduced-motion rule.
- Component gained `"use client"` (required — `motion.div` needs a Client Component
  boundary; the file had no client-only APIs before this change).
- The connector arrows' existing ambient `.animate-flow-arrow` CSS loop (continuous
  pulse, unrelated to entrance) is preserved unchanged.
- No content, copy, layout structure, or business-fact change — same 5 stages, same
  labels, same Tailwind visual styling.

## Files

- app/globals.css — none (this iteration didn't touch it; listed for clarity that
  iteration 001's change is unrelated)
- components/sections/TechnologyEcosystemVisual.tsx
- package.json / package-lock.json (added dependency: `motion@13.1.1`)

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint | Pass — same 2 pre-existing errors in untouched files (`ConsultationModal.tsx`, `LanguageSwitcher.tsx`); 0 new |
| Build (`npm run build`) | Pass — 36/36 pages |
| npm audit (new dependency check) | `motion` added exactly 4 clean packages (`motion`, `motion-dom`, `motion-utils`, and a `framer-motion` re-export shim); none appear among the 6 pre-existing high-severity findings, which are all unrelated Next.js-toolchain transitives (`next`, `postcss`, `sharp`, `nanoid`, `js-yaml`, `brace-expansion`) — confirmed via `git diff package-lock.json` |
| Playwright health-check (homepage) | Pass |
| axe accessibility (homepage) | Pass — 0 violations (unchanged) |
| In-browser stagger timing measurement | Custom instrumented script (see below) — real per-node reveal times captured via `requestAnimationFrame` polling of computed `opacity`, avoiding Playwright-IPC-latency-corrupted results from an initial screenshot-burst attempt |
| Lighthouse | Not run — no retained "before" First Load JS baseline existed to diff against in this Next.js/Turbopack build output format; flagged below as a follow-up rather than guessed |

**Stagger timing (ground truth, ms from scroll-trigger):**

| Stage | First visible | Fully settled |
|---|---|---|
| Business need | 362 | 629 |
| Platform implementation | 578 | 878 |
| Integration & automation | 878 | 1075 |
| Custom development | 1039 | 1291 |
| Decisions & outcomes | 1241 | 1509 |

Confirms a genuinely sequential, clearly readable cascade (~1.5s total, each stage
starting 200-300ms after the previous) — not a simultaneous pop, which is what the
pre-existing (buggy) implementation actually produced.

## Screenshots

`ai-optimization/screenshots/iteration-002/` — homepage desktop-1440 and mobile-390
(final settled state, both confirm no layout regression). Mid-animation state verified
separately via the timing measurement above, since static screenshots can't usefully
show a spring/stagger sequence — an initial screenshot-burst attempt was discarded after
it produced misleading results from Playwright IPC overhead (documented in this
iteration's working notes, not repeated here since the timing table above is the
trustworthy record).

## Before score

UX: 76/100, Visual Design: 78/100, Performance: 70/100 (all carried from Iteration 001 /
`ai-optimization/reports/Q-002-FULL-RESCORE.md`). Overall: 76.69.

## After score

- UX: 78/100 (+2) — this is `MOTION_GUIDELINES.md`'s explicitly named "Progressive
  visual storytelling... tied to scroll" pattern, applied to genuinely process-oriented
  content (the rubric's own stated rationale for why this pattern fits VectorWave), now
  verifiably sequential rather than a bug that silently produced a flat fade.
- Visual Design: 80/100 (+2) — spring-based settle-into-place motion, restrained (no
  bounce loop, single settle per node), consistent with "restrained hover states" /
  "controlled reveal" guidance.
- Performance: 70/100 (unchanged) — new dependency confirmed clean (no new
  vulnerabilities), but exact bundle-size delta wasn't measured this iteration (no
  retained baseline to diff against). Left flat rather than guessed in either direction —
  see "Next recommendation."
- All other categories unchanged (partial re-score).

## Delta

UX +2 (weight 11) = +0.22. Visual Design +2 (weight 9) = +0.18. Overall: 76.69 → 77.09.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired: build/type-check clean, 0 new
ESLint errors, homepage health-check and axe both pass (0 violations, no regression),
no business fact or URL touched, no unrelated file changed. The new dependency was not
introduced quietly — it was the explicit subject of a human `AskUserQuestion` decision
this session, satisfying `SAFETY_RULES.md`'s approval requirement. Positive, evidenced
deltas in two categories (UX, Visual Design) with a verified mechanism (real timing
data, not a felt-sense visual impression) support ACCEPT over a HUMAN REVIEW escalation.

## Next recommendation

Performance's flat score here is the one loose thread — a follow-up Lighthouse pass
(homepage, before/after `motion`) would let a future iteration replace this "unmeasured,
assumed neutral" placeholder with a real number, the same way `Q-002-FULL-RESCORE.md`
already flagged Performance as this loop's lowest-confidence category generally. Otherwise:
Q-009 (About page generic superlatives, P2, copy-only) remains the next queued
candidate per Iteration 001's recommendation.
