# Performance Audit — Dedicated Investigation

**Date:** 2026-08-22
**Scope:** Measurement and root-cause analysis only. No code changes made — this report
is the deliverable, per explicit instruction.

## Methodology

- **Build:** fresh `npm run build` against the current `main` HEAD (commit `1b4ea42`, post-
  Iteration-008), served in production mode (`npm run start -- -p 3100`) — never `next dev`,
  per `ai-optimization/testing/README.md`'s own reproduction instructions.
- **Routes:** the project's existing, established `representativeRoutes` set (8 routes,
  defined in `ai-optimization/testing/routes.generated.json`, unchanged by this
  investigation): homepage, about, services-index, service-zoho-bundled-suite,
  service-sales, blog-index, one representative blog post, contact.
- **Samples:** **5 independent Lighthouse runs per route (40 total)**, each with a fresh
  headless Chrome instance (no shared browser state between runs). **Median** reported
  per metric per route, with the observed min–max range shown alongside — this is the
  gap the existing tooling documentation itself flags (`ai-optimization/testing/README.md`:
  "single-run measurements, not averaged across multiple runs... should be treated as
  directionally informative"). This audit is the first time that gap has been closed.
- **Throttling:** Lighthouse's default **simulated** throttling (`cpuSlowdownMultiplier:
  4`, ~1.6 Mbps simulated network), desktop form factor — identical methodology to every
  prior Lighthouse measurement in this project, so old-vs-new comparisons are apples-to-
  apples. **Absolute timings below are 4x-CPU-throttled lab numbers, not raw real-device
  timings** — treat them as directionally correct and relatively comparable across routes,
  not as literal seconds a typical visitor experiences.
- **INP:** not reported. Lighthouse's `inp-breakdown-insight` audit returns
  `scoreDisplayMode: "notApplicable"` for a lab run — INP is a field metric measured from
  real user interactions (via Chrome UX Report), not something a static lab audit without
  a live user can produce. **Total Blocking Time (TBT)** is reported instead, which is
  the standard lab-metric proxy for input responsiveness and what Lighthouse itself
  substitutes.
- **Diagnostics:** a supplementary single full-detail Lighthouse pass per route was run
  to extract the current audit ID set for this Lighthouse version (several audit IDs
  changed since the project's existing baseline reports were generated — e.g.
  `render-blocking-resources` → `render-blocking-insight`,
  `largest-contentful-paint-element` → `lcp-breakdown-insight` — noted so a future
  measurement doesn't silently return empty diagnostic data the way an early draft of
  this investigation's own script did).
- **Nothing was committed or modified.** Two throwaway Node scripts were used to drive
  measurements (not committed, not part of the tracked codebase) and are deleted at the
  end of this investigation.

## Median results (5 samples/route)

| Route | Perf | LCP | FCP | CLS | TBT | Speed Index | TTI | Transfer |
|---|---|---|---|---|---|---|---|---|
| Homepage | 32 (28–34) | 7.1s (6.8–7.4) | 1.0s (1.0–1.4) | 0.145 | 1805ms (1293–1950) | 2.6s | 7.4s | 1539 KB |
| About | 44 (42–45) | 8.0s (6.4–12.3) | 0.9s (0.9–0.9) | 0.035 | 988ms (940–1484) | 1.5s | 8.1s | 3029 KB |
| Services index | 44 (39–47) | 7.5s (6.4–10.0) | 0.9s (0.9–1.2) | 0.000 | 1280ms (786–1656) | 1.2s | 7.6s | 1520 KB |
| Zoho Bundled Suite | 39 (34–41) | 7.6s (7.4–7.8) | 1.1s (1.1–1.7) | 0.000 | 1721ms (1492–2068) | 2.0s | 7.8s | 1607 KB |
| Service: Sales | 44 (43–45) | 7.3s (6.9–10.6) | 0.9s (0.9–1.0) | 0.000 | 1089ms (993–1635) | 1.4s | 7.5s | 1548 KB |
| Blog index | 42 (33–46) | 7.6s (5.2–7.8) | 1.2s (1.2–2.0) | 0.000 | 1118ms (715–1353) | 1.7s | 7.6s | 1545 KB |
| Blog post | 46 (45–54) | 7.1s (7.0–7.6) | 0.9s (0.9–1.1) | 0.000 | 834ms (460–1051) | 1.2s | 7.6s | 1544 KB |
| Contact | 49 (40–50) | 6.6s (6.4–6.9) | 1.1s (0.9–1.2) | 0.000 | 611ms (553–1435) | 1.6s | 7.1s | 1531 KB |

**Noise band observed:** several routes show wide min–max spread even across just 5 same-
build, same-machine samples (e.g. About's LCP: 6.4s–12.3s; Services index LCP: 6.4s–10.0s).
This confirms the "single-run" caveat in the existing tooling docs was correct to flag —
any one-off Lighthouse number in this project's history (including every number logged in
`CHANGELOG.md`'s Workstream entries) should be read as a sample from this range, not a
precise measurement.

## Comparison against the previous baseline

The most recent full-detail baseline is the single-run capture committed at
`ai-optimization/reports/lighthouse/*.json` (fetched 2026-08-21T08:20–08:22Z, pre-dating
this session's Iterations 001–008). Comparing that single run to this investigation's
5-sample median:

| Route | Perf (old→new) | LCP (old→new) | TBT (old→new) |
|---|---|---|---|
| Homepage | 25 → 32 | 7.7s → 7.1s | 4330ms → 1805ms |
| About | 41 → 44 | 11.4s → 8.0s | 1896ms → 988ms |
| Services index | 44 → 44 | 5.6s → 7.5s | 1344ms → 1280ms |
| Zoho Bundled Suite | 28 → 39 | 6.0s → 7.6s | 2336ms → 1721ms |
| Service: Sales | 42 → 44 | 5.9s → 7.3s | 1110ms → 1089ms |
| Blog index | 39 → 42 | 6.8s → 7.6s | 1028ms → 1118ms |
| Blog post | 45 → 46 | 5.7s → 7.1s | 836ms → 834ms |
| Contact | 42 → 49 | 5.7s → 6.6s | 968ms → 611ms |

**Reading this correctly:** every one of these old values was a *single* Lighthouse run —
exactly the kind of noisy sample this investigation's own 5-run min–max ranges show can
swing by several seconds on LCP alone. The direction of change here is not a reliable
signal (e.g. Services index's old single-run LCP of 5.6s sits comfortably inside this
investigation's own 6.4–10.0s range for the *same route on the same build*). **The one
reliable, repeatable signal across both the old baseline and this investigation is the
absolute magnitude**: every route's Performance score has sat in the 25–49 range and
every route's LCP has sat above 5.5s, across two independently-run measurement sessions
five workstream/iterations apart. That consistency — not the noisy point-to-point deltas
— is the real finding: **this site has a genuine, persistent performance problem**, not a
one-off bad measurement.

## Bottleneck analysis (evidence-based)

### Finding 1 — Two brand-logo image assets are wildly oversized for how they're displayed

- `src/odoo_logo.png` is actually an **animated WebP file with a `.png` extension**,
  **800,798 bytes** on disk, `480×480`. It is imported and rendered in **4 different
  components** (`EcosystemOrbit.tsx`, `PlatformLogo.tsx`, `PartnerLogos.tsx`,
  `TechnologyEcosystemVisual.tsx`), at display heights ranging from **16px to ~64px** —
  confirmed by direct code inspection of each usage's `size`/`height` styling. Lighthouse
  measured its delivered transfer size as **801,207 bytes** — next.js's built-in image
  optimizer does not meaningfully re-encode it, most likely because it skips
  transformation for animated source images (to preserve the animation), so the ~800KB
  original ships essentially as-is regardless of where or how small it's displayed.
- `src/GIF by Zoho.gif` is **1,501,006 bytes** (1.47MB) on disk and is imported as the
  "Zoho" logo specifically inside `PartnerLogos.tsx` — the only component that uses it.
  This directly explains why the **About page is the one clear outlier** in total page
  weight (3029 KB median vs. ~1520–1610 KB for every other route): About is the only
  route where `PartnerLogos` still renders (per Workstream 3's homepage cleanup, the
  homepage's own `PartnerLogos` usage was removed; About's was kept).
- Evidence: Lighthouse's `total-byte-weight` audit lists both assets by exact URL and
  byte count on every affected route; on-disk `ls -la` confirms the same byte counts
  independent of Lighthouse. No estimation involved — this is a direct, deterministic
  measurement.

### Finding 2 — Deferred third-party scripts execute late and correlate with when LCP finally settles, on every route

- Google Tag Manager (`googletagmanager.com/gtag/js`, 170KB) and Google Translate
  (`translate.googleapis.com`, 93KB) are both loaded via Next.js `Script strategy=
  "lazyOnload"` (`app/layout.tsx`) — correctly deferred per Workstream 1's original
  fix. But under Lighthouse's simulated throttling, their actual **execution** (not just
  network fetch — both finish downloading by ~2.4s on every route checked) lands at
  **5.5–7.5 seconds** into the page lifecycle (`long-tasks` audit, cross-checked on both
  homepage and contact — the two routes with the most different content, same late-
  script pattern in both).
- On every route checked, `lcp-breakdown-insight` attributes only **1.2–2.0 seconds**
  combined (time-to-first-byte + "element render delay") to the earliest identifiable
  LCP candidate — yet the actual reported `largest-contentful-paint` metric lands
  **4–6 seconds later**, in the same window where these third-party scripts are still
  executing. This pattern repeats identically on homepage and contact (structurally
  unrelated pages), which is what makes it a layout-level (sitewide), not page-specific,
  finding.
- Lighthouse's own `unused-javascript` audit flags **~126KB combined** ("wasted bytes")
  across just the GTM and Translate scripts as code that loads but never executes on a
  typical page view.
- This is evidence of a correlation and a plausible mechanism (late third-party
  execution/DOM mutation extending the window before the browser finalizes its LCP
  candidate), not a proven single root cause — flagged with that honesty rather than
  overclaiming certainty.

### Finding 3 — Homepage's CLS (the one outlier — every other route measured a clean 0.000) traces to the Hero's own animated headline

- `cls-culprits-insight` attributes homepage's entire 0.145 CLS score (WCAG/Core Web
  Vitals "needs improvement" territory; every other route is a clean 0.000) to two
  specific elements: the gradient-highlighted headline span (`"Business Flow,"`,
  `bg-gradient-to-r ... bg-clip-text`) and a 2px-wide span matching the `Typewriter`
  component's blinking cursor (`components/Typewriter.tsx` per `MOTION_GUIDELINES.md`'s
  own documentation of this component).
- This is homepage-specific (matches: only homepage uses `Typewriter`) and independent
  of Findings 1–2.

### Supporting evidence — client JS bundle cost

- Two shared chunks (`1eglloh0s_w8l.js`, 71KB; `0jem183kvk9zx.js`, 52KB) generate
  multiple long tasks on every route measured and are flagged by `unused-javascript`
  with up to **52KB "wasted"** on a single page (About). This contributes to TBT
  sitewide but is a smaller, less clear-cut finding than 1–2 above — noted as
  supporting evidence, not elevated to the top 3.

## Top 3 highest-impact fixes (identified, NOT implemented)

Ranked by confidence × reach, per this investigation's evidence:

1. **Replace `src/odoo_logo.png` and `src/GIF by Zoho.gif` with properly sized, non-
   animated static logo images.** Highest confidence (deterministic byte measurements,
   not timing estimates), broadest reach (Odoo asset loads on every route; the GIF
   specifically explains the About page's outlier weight). Expected effect: roughly
   -800KB on every route, an additional -1.47MB specifically on About — a same-order-of-
   magnitude cut to total page weight with no design/behavior change, since these assets
   already render at 16-64px regardless.
2. **Re-examine the Google Translate / Google Tag Manager loading strategy** — in
   particular, whether Google Translate (93KB + associated execution cost) could be
   deferred further to load only when a visitor actually opens the language switcher
   (`components/LanguageSwitcher.tsx` already wraps/gates it), rather than on every page
   load regardless of use. GTM's necessity/configuration is a product decision outside
   this audit's scope to recommend changing, but its current `lazyOnload` timing
   relative to LCP finalization is worth a focused follow-up investigation before
   assuming the current strategy is optimal.
3. **Investigate the shared JS bundle composition** (`1eglloh0s_w8l.js`,
   `0jem183kvk9zx.js`) for code-splitting opportunities — confirm whether client-only
   component code needed on a small subset of routes is being shipped to every route,
   and whether `unused-javascript`'s ~180-205KB "wasted" figure per page points to a
   specific over-broad import.

## What this audit deliberately does not do

Per instruction: no code was changed, no fix was implemented, and no `TASK-QUEUE.md`/
`state.json`/`CHANGELOG.md` entry was made — this is a standalone investigation, not a
loop iteration. If any of the 3 fixes above should be scoped as a future iteration, that
is a separate decision for whoever reviews this report.
