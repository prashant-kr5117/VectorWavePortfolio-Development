# Iteration 004

Iteration: 004
Date: 2026-08-21
Task: Direct human bug report — the platform logo chips inside
`TechnologyEcosystemVisual.tsx`'s "Platform implementation" stage were illegible.
Problem: The Odoo logo asset (`src/odoo_logo.png`, actually a 480x480 square WebP icon,
not a wordmark) rendered as a near-invisible speck at `height: 14`. The platform name
itself was `sr-only` (screen-reader only) — sighted users had no visible text fallback,
only tiny/illegible logo images to identify each platform.
Evidence: User-provided screenshot showing the Odoo chip rendering blank; direct file
inspection (`file` command) confirming the WebP-in-a-.png asset and its square aspect
ratio.

## Changes

- Added a `label` field to `platformNodes` (Zoho, Odoo, Dynamics 365 — the last
  shortened from "Microsoft Dynamics 365," matching the shorthand already used
  elsewhere in this codebase's own route slugs, e.g. `dynamics-365-sales`) and replaced
  the `sr-only` span with real visible text.
- **First attempt** put logo + text side-by-side (horizontal) at a slightly larger logo
  size (18px). This broke immediately: the Microsoft Dynamics 365 SVG asset has a
  2.865:1 aspect ratio (checked via its `viewBox`), so even a modest height produces a
  wide image that left almost no width for the text in a ~116-134px chip, wrapping
  "Dynamics 365" onto 3 lines. Caught via an in-browser layout measurement
  (`scrollWidth`/`clientWidth` per chip) before it was ever screenshotted as "done."
- **Final design**: stacked layout (logo on top, label below, `flex-col`), each row
  getting the chip's full width independently instead of splitting it with its sibling.
  Logo height 16px, label `text-[10px] font-semibold text-ink-soft` (existing
  `DESIGN_SYSTEM.md` token, correct dark-on-white contrast for the chip's white
  background), `whitespace-nowrap` on the label since the stacked layout now gives it
  enough room to never need to wrap. Verified via the same measurement: all three labels
  render on exactly 1 line, well within their chip's width, at both 1024px and 1440px.
- Image `alt=""`/`aria-hidden="true"` kept (still decorative) since the now-visible
  label is the accessible name — this also improves WCAG 2.5.3 "Label in Name"
  compliance versus the prior `sr-only` approach, where the accessible name (full
  "Microsoft Dynamics 365") diverged from what was rendered (nothing, visually).

## Files

- components/sections/TechnologyEcosystemVisual.tsx

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint (scoped) | Pass — 0 errors/warnings |
| Build (`npm run build`) | Pass — 36/36 pages (rebuilt twice: once for the failed horizontal attempt's diagnosis, once for the final stacked version) |
| Playwright health-check (homepage) | Pass |
| axe accessibility (homepage) | Pass — 0 violations |
| Chip text-wrap check (in-browser, 1024/1440) | All 3 labels: 1 line, no overflow (Dynamics 365 label: 68px scroll width inside a 116-134px chip) |
| Visual review | Screenshots at 1024/1440 (all three platform names clearly legible as real text under each logo) and mobile-390 (unaffected — cards are full-width there, no space constraint) |

## Screenshots

`ai-optimization/screenshots/iteration-004/` — homepage at desktop-1440, tablet-1024,
mobile-390 (final, corrected state).

## Before score

Visual Design 82/100, Accessibility 96/100 (Iteration 003 baseline). Overall 77.27.

## After score

- Visual Design: 83/100 (+1) — fixes a real, user-reported legibility defect (one of
  three platform identities was effectively invisible); modest delta since this is a
  bug fix within an already-shipped feature, not new visual design work.
- Accessibility: 97/100 (+1) — replacing a `sr-only`-only name with a visible label that
  matches the accessible name improves WCAG 2.5.3 "Label in Name" alignment; previously
  sighted users had no text fallback at all when a logo failed to be legible.
- All other categories unchanged.

## Delta

Visual Design +1 (weight 9) = +0.09. Accessibility +1 (weight 8) = +0.08. Overall:
77.27 → 77.44.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired. The first (horizontal)
attempt's wrapping defect was caught via measurement *before* being presented as done,
and fixed within the same iteration (`CONTROLLER.md` Step 14 REVISE path) rather than
shipped and reported separately. No business-fact change (the shortened "Dynamics 365"
label is a real, already-used shorthand of the verified platform name, not a new claim).
No new dependency.

## Next recommendation

Iteration 002's flagged Performance-measurement gap (no Lighthouse before/after for the
`motion` dependency, now covering three iterations of animation work) remains the most
useful next step before further visual iteration on this component. Otherwise Q-009
(About page generic superlatives) remains the next queued `TASK-QUEUE.md` candidate.
