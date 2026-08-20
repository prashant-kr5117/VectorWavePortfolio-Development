import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for the VectorWave AI-optimization evaluation layer
 * (ai-optimization/README.md — Stage 3: browser evaluation infrastructure).
 *
 * This is evaluation/testing infrastructure only. It does not modify, build, or ship
 * as part of the production site — `next build` output and the `e2e/` directory are
 * unrelated to what Next.js serves to real visitors.
 *
 * The app is expected to already be built and running via `npm run build` followed by
 * `npm run start -- -p 3100` (see ai-optimization/testing/README.md for the exact
 * commands) so that measurements reflect production behavior, not `next dev`'s HMR
 * overhead. `reuseExistingServer` lets a manually-started server be reused; CI (if ever
 * added) would always start fresh.
 */
export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,
  reporter: [["list"], ["json", { outputFile: "ai-optimization/testing/playwright-results.json" }]],

  use: {
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
    screenshot: "off", // screenshots are captured explicitly by e2e/screenshots.spec.ts, not on failure
  },

  // Chromium only — the site targets standard evergreen browsers and Stage 3 explicitly
  // asks not to create unnecessary browser projects. Viewport size is set per-test via
  // dedicated browser contexts (see e2e/lib/viewports.ts), not via separate projects.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
