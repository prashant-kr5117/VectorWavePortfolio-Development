# Iteration 010

Iteration: 010
Date: 2026-08-22
Task: Direct human bug report — on the homepage's "Technology should fit the business"
and "Different industries. Different processes." sections, hovering/selecting a list
item near the end of the list could leave its detail-preview content out of view
(scrolled above or below the visible viewport), depending on screen height and which
item was selected.
Evidence: User-provided screenshots showing the preview card fixed above the tech-
platform list and below the industry list, with no mechanism keeping it in view as the
list (up to 17 industries) scrolled past.

## Changes

Root cause investigation found the intended fix (`position: sticky` on the detail
panel) was silently broken by **three separate, compounding CSS issues** — each
confirmed via direct ancestor-chain inspection (`getComputedStyle` walked up the DOM),
not assumed:

1. **`Reveal`'s scroll-in transform.** Both components wrapped their entire content
   (including the would-be-sticky panel) in `<Reveal>`, whose fade-up animation applies
   `translate-y-0`/`translate-y-6`. Per the CSS spec, *any* non-`none` transform value
   on an ancestor — including `translateY(0)`, which looks like a no-op — creates a new
   containing block, which silently breaks `position: sticky` on descendants. Fixed by
   restructuring both components so only the heading is `<Reveal>`-wrapped; the sticky
   panel and list are siblings outside it (losing the scroll-in fade for just that
   region — an acceptable, minor trade-off against a real functional bug).
2. **`HoverGlow`'s `overflow-hidden`.** The section-level ambient hover-glow wrapper
   (`TechnologyAndIndustry.tsx`'s outer `<HoverGlow as="section">`) sets
   `overflow: hidden` — another well-documented way to break `position: sticky` on any
   descendant. Rather than removing this sitewide (other `HoverGlow` usages are
   rounded-corner cards where the clip genuinely matters, to stop the glow bleeding past
   the rounded edges), added an opt-out `clip` prop (default `true`, preserving all 8
   other call sites unchanged) and set `clip={false}` for this one usage, where the glow
   is a full-bleed fill with nothing to clip against.
3. **Sitewide: `app/template.tsx`'s page-enter transform never clears.** While
   diagnosing #1, found `.animate-page-enter` (wrapping *every* page's content, in
   `app/template.tsx`) uses `animation: page-enter 0.4s ... both`. The `both` fill-mode
   means the final keyframe's `transform: translateY(0)` persists **forever** after the
   0.4s animation completes — silently breaking `position: sticky` anywhere on the
   entire site, not just here, for the page's whole lifetime. Fixed by dropping
   `forwards` (keeping only `backwards`, needed to avoid a flash-of-unstyled-content
   before the animation starts): the animation's end state and the element's natural
   resting state are numerically identical, so this is a zero-visual-difference fix
   that unblocks sticky positioning sitewide going forward.

With all three structural blockers cleared, sticky positioning started working
mechanically — but surfaced a fourth, purely visual issue: **ghosting**. The detail
panels' backgrounds were translucent (`bg-gradient-to-br from-accent/15 to-primary/10`
and `bg-white/5`), so once genuinely pinned in the viewport, the list content
correctly scrolling underneath them showed through as faint overlapping text. Fixed by
switching both panels to the already-established, already-used-elsewhere
`bg-ink-inverse-alt` solid token (the same "elevated opaque surface on the dark
section" pattern `EcosystemOrbit.tsx`'s tooltips already use) — fully opaque, no new
color introduced.

Also restructured `IndustryTabs.tsx` for consistency: its detail panel previously
rendered *below* the list (opposite of `TechPlatformTabs.tsx`'s panel-above-list
order) — moved to match, so both components now share one predictable interaction
model.

**Incidentally found and fixed during validation** (not the original bug, but exposed
by fixing it): making the tech-platform card render unconditionally (outside `Reveal`'s
initially-hidden state) caused axe to newly detect a pre-existing WCAG contrast failure
on the "Flagship" badge (`bg-accent` + white text, 2.41:1 — likely always broken for
real users once the reveal animation finished, but masked from every prior automated
scan by test-timing against `Reveal`'s `opacity-0` initial state). Fixed by swapping
the badge's text to `text-ink` (7.14:1 against `bg-accent`).

## Files

- components/sections/TechPlatformTabs.tsx
- components/sections/IndustryTabs.tsx
- components/HoverGlow.tsx
- components/sections/TechnologyAndIndustry.tsx
- app/globals.css

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint (scoped) | Pass — 0 errors/warnings |
| Build (`npm run build`) | Pass — 36/36 pages (rebuilt 5 times across the investigation as each root cause was found and fixed) |
| Playwright health-check (full 30-route suite) | Pass — 31/31 (shared-component/sitewide-CSS change; `HoverGlow` and `template.tsx` both cross-cut every route) |
| axe accessibility (full 30-route suite) | Pass — 0 new violations (the incidentally-found Flagship badge contrast issue was fixed within this same iteration before logging, per `CONTROLLER.md` Step 14's REVISE path — not shipped broken) |
| Behavioral verification (custom Playwright script, 700px viewport — deliberately short, matching the reported bug) | Confirmed: hovering the actual last item in each list ("AI & Custom Technology," 4th of 4 tech platforms; "Event Management," 17th of 17 industries) now keeps the detail panel fully visible and pinned near the top of the viewport, with correct matching content and no visual ghosting |
| Ancestor-chain diagnostic (`getComputedStyle` walk) | Confirmed all 3 structural blockers cleared: `overflow: visible` throughout, `transform: none` throughout |

## Screenshots

Verification screenshots (mid-interaction states, short-viewport reproduction) were
captured via ad hoc scratch scripts during debugging and are not retained as permanent
artifacts — the ancestor-chain diagnostic output and the behavioral pass/fail results
above are the retained evidence. `ai-optimization/screenshots/iteration-009/` (shared
with Iteration 009) covers the final settled homepage state.

## Before score

UX: 79/100 (Iteration 006), Accessibility: 98/100 (Iteration 008), Visual Design:
84/100 (Iteration 009, this session).

## After score

- UX: 83/100 (+4) — fixes a genuine, user-reported discoverability defect: on a list
  with up to 17 items, later items' detail content was previously unreachable within
  the viewport on shorter screens. Verified via precise before/after measurement, not
  just visual impression.
- Accessibility: 99/100 (+1) — fixes a real WCAG contrast failure (2.41:1 → 7.14:1) that
  existing tooling had never caught due to a testing blind spot this iteration
  incidentally closed.
- Visual Design: 86/100 (+2) — removes visual ghosting, establishes one consistent
  interaction pattern across both tab-switcher components instead of two different ones.

## Delta

UX +4 (weight 11) = +0.44. Accessibility +1 (weight 8) = +0.08. Visual Design +2
(weight 9) = +0.18. Overall: 78.92 → 79.62.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired in the final state (the
transient Flagship-badge violation was found and fixed within this same iteration,
per the REVISE path, before being scored/logged). No business fact, URL, or
navigation/form behavior changed. Root-caused via direct measurement at every step
(ancestor `getComputedStyle` inspection, precise bounding-box math, before/after
screenshots) rather than guessing — each of the 3 compounding structural fixes was
verified individually before moving to the next.

## Next recommendation

The `animate-page-enter` fix (Finding 2 above) unblocks `position: sticky` sitewide —
worth flagging as a new low-priority `TASK-QUEUE.md` item: audit whether any other
component elsewhere on the site attempted (and silently failed at) sticky positioning
for the same reason, now that the root blocker is cleared. `PERFORMANCE-AUDIT.md`'s
Fix #2 and #3 remain the next substantive performance candidates.
