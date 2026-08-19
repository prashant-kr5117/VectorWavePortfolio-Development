# Screenshot Tooling Status — Stage 2

**Status: BLOCKED. No screenshots were generated.**

## Why

Rendered/browser-based screenshot testing requires a browser-automation tool. The only
candidate found in the project is `@playwright/test@^1.51.1`, which appears **only** as a
`peerDependenciesMeta` entry inside another package's metadata in `package-lock.json` —
it is **not** listed in `package.json` `devDependencies`, and confirmed **not present**
in `node_modules/@playwright` at all. It is not installed, not configured, and not
usable. There is no other screenshot, visual-regression, or Lighthouse tooling anywhere
in the repo (no `.github/workflows`, no Playwright config file, no Puppeteer, no
Storybook).

Per this stage's explicit instructions, no package may be installed and `package.json`
may not be modified. Screenshot capture was therefore out of scope for Stage 2, and
Stage 2's visual/UX findings are based on **source-level analysis** (component code,
Tailwind classes, design tokens, JSX structure) rather than rendered screenshots. This is
flagged throughout `ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md` as **[OBSERVED]**
or **[INFERRED]**, never presented as a measured visual score.

## What would be required to unblock this

1. Human approval to add `@playwright/test` as a real `devDependency` (not just a
   transitive lockfile reference) and run `npx playwright install` to fetch browser
   binaries.
2. A small capture script (e.g. `scripts/screenshot.ts`) that runs `next build && next
   start`, then uses Playwright to visit each of the ~30 routes and capture full-page +
   viewport screenshots at the six target breakpoints (1440, 1280, 1024, 768, 390px).
3. Agreement on where captured screenshots live long-term — this `screenshots/`
   directory is the designated location once tooling exists.
4. Separately, for real performance measurement: Lighthouse CI or a similar tool, which
   also does not currently exist in this repo (see `ai-optimization/README.md` Tool
   Availability table).

None of the above was installed or configured as part of this stage — this file exists
only to document the blocker and the exact path to resolving it, per Stage 2 Step 3.
