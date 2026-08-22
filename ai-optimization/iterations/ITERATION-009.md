# Iteration 009

Iteration: 009
Date: 2026-08-22
Task: `ai-optimization/reports/PERFORMANCE-AUDIT.md` Finding 1 / Fix #1 — highest-confidence,
broadest-reach performance fix identified by the dedicated performance investigation.
Problem: Two brand-logo image assets were absurdly oversized for how they're displayed.
`src/odoo_logo.png` is actually an 86-frame **animated WebP** file (a decorative
promotional "slot reveal" animation cycling through the word "odoo" and unrelated
feature icons — no single frame is a usable static logo), 800,798 bytes, imported in
4 components (`EcosystemOrbit.tsx`, `PlatformLogo.tsx`, `PartnerLogos.tsx`,
`TechnologyEcosystemVisual.tsx`) and displayed at 16-64px. `src/GIF by Zoho.gif` is a
1.47MB animated GIF (a promotional "All in One ZOHO" badge, not a plain logo) used only
in `PartnerLogos.tsx` as the "Zoho" logo — explaining why the About page alone weighed
~3MB vs. ~1.5MB on every other route.
Evidence: `PERFORMANCE-AUDIT.md` Finding 1 (deterministic byte-weight measurements from
Lighthouse's `total-byte-weight` audit, cross-checked against on-disk file sizes via
`ls -la`); direct visual inspection of extracted animation frames (`sharp` with
`{page: n}`) confirming neither asset has a usable static frame.

## Changes

- Sourced the real official Odoo logo (the "odoo" wordmark, purple first "o") from
  Wikimedia Commons (`Odoo_Official_Logo.png`, itself sourced from Wikipedia's company
  infobox — a standard, low-risk source for a real, publicly-known company's brand
  mark representing an already-verified platform per `BUSINESS_FACTS.md`). Verified via
  `Special:FilePath` + a proper User-Agent (Wikimedia's API etiquette policy blocks
  generic/empty UAs with 429s). Replaced `src/odoo_logo.png` in place (same import
  path, zero code changes needed in its 4 consuming components) — 623×199px, 8,948
  bytes (a 98.9% reduction from 800,798 bytes).
- Swapped `PartnerLogos.tsx`'s "Zoho" import from `src/GIF by Zoho.gif` to the
  already-correct, already-used-elsewhere `src/zoho.png` (26KB, the real clean Zoho
  wordmark) — no new asset needed, just pointing at the asset that should have been
  used originally. Deleted the now-fully-unused `GIF by Zoho.gif` (confirmed via grep
  it had no other references).
- Chose this via `AskUserQuestion` this session: given no usable static Odoo logo
  existed anywhere in the repo, presented 3 options (source the official logo / wait for
  a human-supplied asset / compress the existing broken frame as a stopgap) — human
  chose "source the official logo."

## Files

- src/odoo_logo.png (binary replacement)
- src/GIF by Zoho.gif (deleted)
- components/sections/PartnerLogos.tsx

## Tests

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Pass — 0 errors |
| ESLint (scoped) | Pass — 0 errors/warnings |
| Build (`npm run build`) | Pass — 36/36 pages |
| Playwright health-check (homepage, about, services-index — the 3 routes rendering these logos) | Pass |
| axe accessibility | Pass — 0 violations |
| Visual review | Odoo logo now renders as the real, recognizable wordmark at every display size (16-64px) across all 4 usages; Zoho logo unchanged in appearance (same wordmark, now via the correct lightweight asset) |

## Screenshots

`ai-optimization/screenshots/iteration-009/` — homepage desktop-1440 and mobile-390.

## Before score

Performance: 70/100 (Q-002 baseline — explicitly flagged there as this loop's
lowest-confidence category, "no clean throttled measurement exists yet"). Trust/Proof:
71/100, Visual Design: 83/100 (both carried from Iteration 004/007).

## After score

- Performance: 76/100 (+6) — a deterministic, evidence-backed reduction (not a timing
  estimate): ~800KB removed sitewide (Odoo logo, all 4 usages) plus an additional
  ~1.47MB removed specifically from the About page (Zoho GIF). This is the first
  Performance-category evidence in this loop that isn't a noisy timing measurement.
- Trust/Proof: 72/100 (+1) — the site now displays the *actual* Odoo brand mark next to
  the word "Odoo," rather than an unrelated animated graphic; a small but real
  accuracy-of-representation fix for a genuinely verified platform partnership.
- Visual Design: 84/100 (+1) — modest, since Iteration 004 already mitigated the worst
  of the illegibility with a text label; this iteration fixes the underlying image
  itself.

## Delta

Performance +6 (weight 6) = +0.36. Trust/Proof +1 (weight 12) = +0.12. Visual Design +1
(weight 9) = +0.09. Overall: 78.35 → 78.92.

## Decision

ACCEPT

## Reason

No `STOP-CONDITIONS.md` automatic-revert condition fired. No business fact invented —
Odoo and Zoho are both already-verified platforms per `BUSINESS_FACTS.md`; this only
corrects *how* their existing, true partnership is visually represented. Sourcing the
logo was an explicit human decision (`AskUserQuestion`), not a unilateral call.

## Next recommendation

`PERFORMANCE-AUDIT.md`'s Fix #2 (Google Translate/GTM loading strategy) and Fix #3 (JS
bundle code-splitting) remain open. A follow-up Lighthouse pass to quantify this
iteration's actual LCP/byte-weight impact (vs. the audit's pre-fix baseline) would be
a good verification step before starting Fix #2 or #3.
