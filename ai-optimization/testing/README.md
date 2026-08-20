# Browser Evaluation Infrastructure

This directory holds machine-readable output from the Playwright-based evaluation layer
(Stage 3). Human-readable summaries live in `ai-optimization/reports/RENDERED-BASELINE.md`.
The infrastructure itself (config + scripts) lives at the repo root (`playwright.config.ts`)
and in `e2e/`, following normal Playwright convention rather than being nested inside
`ai-optimization/`.

## How to reproduce a baseline run

The app must be **built and served in production mode** (not `next dev`) so measurements
reflect real behavior, not dev-server overhead:

```bash
npm run build
npm run start -- -p 3100     # run this in the background / a separate terminal
```

Wait until `http://localhost:3100` responds (the start log prints "Ready in ...ms"), then
in another terminal, with the server still running:

```bash
npx playwright test e2e/font-check.spec.ts     # fast font-rendering check (Step 10)
npx playwright test e2e/health-check.spec.ts    # HTTP/console/redirect checks (Step 6)
npx playwright test e2e/accessibility.spec.ts   # axe-core audit, all routes (Step 7)
npx playwright test e2e/screenshots.spec.ts     # full visual baseline, ~8 min (Step 5/11)
node e2e/lighthouse-audit.mjs                   # Lighthouse, representative routes (Step 8)
```

Or run everything except Lighthouse in one pass: `npx playwright test` (equivalent to
`npm run e2e`). Lighthouse is intentionally separate — it drives its own Chrome instance
via `chrome-launcher` rather than Playwright's browser automation (see the comment at the
top of `e2e/lighthouse-audit.mjs` for why), and it's slow enough per-page (~20-40s) that
it only runs against `representativeRoutes`, not all 30.

Stop the server when done (`Ctrl+C`, or on Windows, find and kill the process bound to
port 3100).

## Files in this directory

| File | Produced by | Contents |
|---|---|---|
| `routes.generated.json` | `e2e/global-setup.ts` (runs automatically before any Playwright test) | The full route list, derived live from `lib/services.ts` + `lib/posts.ts` — never hand-duplicated. Regenerated on every test run, so it can never silently drift the way `app/sitemap.xml` does (see `ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md`, SEO section). |
| `health-check-results.json` | `e2e/health-check.spec.ts` | Per-route HTTP status, console errors, uncaught page errors, failed resource requests, redirect status, H1/content presence. |
| `accessibility-results.json` | `e2e/accessibility.spec.ts` | Per-route axe-core violation counts and rule IDs (summary — full detail per route is in `ai-optimization/reports/accessibility/<route>.json`). |
| `font-check-results.json` | `e2e/font-check.spec.ts` | Computed `font-family` on `<body>` and `<h1>` per representative route, plus whether the `--font-geist-sans` CSS variable is present. The measured before-state for the known font bug. |
| `lighthouse-results.json` | `e2e/lighthouse-audit.mjs` | Per-route Lighthouse category scores (Performance/Accessibility/SEO/Best Practices) for the representative route set (full reports in `ai-optimization/reports/lighthouse/<route>.json`). |
| `playwright-results.json` | Playwright's built-in JSON reporter | Raw pass/fail test run metadata — mechanical, not meant to be read directly. |

## Screenshot re-capture convention

Baseline screenshots live in `ai-optimization/screenshots/baseline/{desktop,tablet,mobile}/`
and are the **canonical visual reference** — per Stage 3 instructions, they must not be
silently overwritten. If the site changes and a new set of screenshots is needed for
comparison, re-run `screenshots.spec.ts` after first editing
`SCREENSHOT_ROOT` in `e2e/screenshots.spec.ts` to point at a new dated folder (e.g.
`ai-optimization/screenshots/2026-09-01/`), rather than pointing it back at `baseline/`.
`baseline/` should only ever be written once, by the run that produced it (2026-08-20).

## What this infrastructure intentionally does NOT do

- It does not fix anything it finds. Every spec is read-only against the running app.
- It does not run in CI (none exists yet — see `ai-optimization/README.md` Tool
  Availability).
- It does not commit or push automatically.
- Lighthouse throttling reflects Lighthouse's own default "simulated" throttling curve on
  a local, unthrottled network and a shared/local CPU — absolute scores should be treated
  as **directionally** informative (single-run measurements, not averaged across multiple
  runs) rather than a substitute for a real hosted-environment measurement once the site
  is deployed somewhere with real network conditions.
