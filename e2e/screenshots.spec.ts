import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { routes } from "./lib/routes";
import { viewports } from "./lib/viewports";

/**
 * Visual baseline capture (Stage 3, Step 5 / Step 11).
 *
 * Captures a full-page screenshot of every indexable route at every target viewport and
 * stores it under ai-optimization/screenshots/baseline/<category>/<route>-<category>-<width>.png.
 *
 * This is the canonical visual reference for future iterations. Per Stage 3 instructions,
 * these baseline files must not be silently overwritten by a later run — re-running this
 * spec after the site changes should write to a new dated subfolder
 * (ai-optimization/screenshots/<date>/...), not back into baseline/. See
 * ai-optimization/testing/README.md for the re-capture convention.
 */

// Defaults to the canonical "baseline" set. Override with SCREENSHOT_DIR=<name> to
// capture a comparison set elsewhere without touching the original baseline — e.g.
// `SCREENSHOT_DIR=workstream-01 npx playwright test e2e/screenshots.spec.ts`. See
// ai-optimization/testing/README.md's re-capture convention.
const SCREENSHOT_ROOT = path.resolve(
  __dirname,
  "..",
  "ai-optimization",
  "screenshots",
  process.env.SCREENSHOT_DIR || "baseline"
);

for (const category of ["desktop", "tablet", "mobile"] as const) {
  fs.mkdirSync(path.join(SCREENSHOT_ROOT, category), { recursive: true });
}

test.describe("Visual baseline screenshots", () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route.id} @ ${viewport.id}`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          reducedMotion: "reduce",
        });
        const page = await context.newPage();

        const response = await page.goto(route.path, { waitUntil: "networkidle" });
        await page.waitForTimeout(300);

        // The site's `Reveal` wrapper (components/Reveal.tsx) uses an IntersectionObserver
        // to fade content in as it scrolls into view — its initial state is opacity-0
        // until observed. A real visitor triggers this naturally by scrolling; a
        // fullPage screenshot taken without ever scrolling does not, so any
        // below-the-fold Reveal-wrapped content would be captured invisible even
        // though it renders correctly for real users. Scroll through the page first so
        // the screenshot reflects what a visitor actually sees.
        const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < scrollHeight; y += 500) {
          await page.evaluate((yy) => window.scrollTo(0, yy), y);
          await page.waitForTimeout(60);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);

        const fileName = `${route.id}-${viewport.category}-${viewport.width}.png`;
        const filePath = path.join(SCREENSHOT_ROOT, viewport.category, fileName);
        await page.screenshot({ path: filePath, fullPage: true });

        await context.close();

        test.info().annotations.push({
          type: "screenshot-status",
          description: JSON.stringify({
            route: route.path,
            viewport: viewport.id,
            httpStatus: response?.status() ?? null,
            file: filePath,
          }),
        });
      });
    }
  }
});
