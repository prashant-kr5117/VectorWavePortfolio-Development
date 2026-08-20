// Lighthouse performance/accessibility/SEO/best-practices audit (Stage 3, Step 8-9).
//
// Runs as a plain Node script, NOT through the Playwright test runner, because
// Lighthouse drives its own headless Chrome instance via chrome-launcher rather than
// Playwright's browser automation. To avoid depending on a system-installed Chrome (not
// guaranteed to exist in this environment), it points chrome-launcher at the same
// Chromium binary Playwright already downloaded (`@playwright/test`'s bundled chromium),
// so no separate browser install was needed for this step.
//
// Usage: node e2e/lighthouse-audit.mjs
// Requires the production server already running at http://localhost:3100
// (see ai-optimization/testing/README.md for the exact startup sequence).
//
// This script only reads/measures. It does not modify any application file.

import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "http://localhost:3100";
const REPORT_DIR = path.join(ROOT, "ai-optimization", "reports", "lighthouse");
const SUMMARY_PATH = path.join(ROOT, "ai-optimization", "testing", "lighthouse-results.json");

fs.mkdirSync(REPORT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(SUMMARY_PATH), { recursive: true });

// Reads the route list from ai-optimization/testing/routes.generated.json, which
// e2e/global-setup.ts writes fresh (from lib/services.ts / lib/posts.ts) every time
// `npx playwright test` runs. This script is plain Node ESM (not run through Playwright's
// TS loader), so it reads that generated JSON snapshot rather than re-deriving the list
// itself — the JSON file, not this file, is the single source of truth for route data;
// run `npm run e2e` (or any playwright test) at least once before this script so the
// snapshot exists and is current.
const routesSnapshotPath = path.join(ROOT, "ai-optimization", "testing", "routes.generated.json");
if (!fs.existsSync(routesSnapshotPath)) {
  console.error(
    `Missing ${routesSnapshotPath}. Run "npx playwright test" (or "npm run e2e:font") at least once first — ` +
      "its global-setup step generates this file from lib/services.ts and lib/posts.ts."
  );
  process.exit(1);
}
const routesSnapshot = JSON.parse(fs.readFileSync(routesSnapshotPath, "utf-8"));
const representativeRoutes = routesSnapshot.representativeRoutes.map((r) => ({ id: r.id, path: r.path }));

async function main() {
  const chromePath = chromium.executablePath();
  console.log(`Launching Chrome via chrome-launcher at: ${chromePath}`);

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const summary = [];

  try {
    for (const route of representativeRoutes) {
      const url = `${BASE_URL}${route.path}`;
      console.log(`Running Lighthouse: ${url}`);
      try {
        const result = await lighthouse(
          url,
          {
            port: chrome.port,
            output: "json",
            logLevel: "error",
            onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
            formFactor: "desktop",
            screenEmulation: { disabled: true },
          }
        );

        const lhr = result.lhr;
        fs.writeFileSync(
          path.join(REPORT_DIR, `${route.id}.json`),
          JSON.stringify(lhr, null, 2)
        );

        summary.push({
          routeId: route.id,
          path: route.path,
          status: "measured",
          scores: {
            performance: lhr.categories.performance?.score ?? null,
            accessibility: lhr.categories.accessibility?.score ?? null,
            seo: lhr.categories.seo?.score ?? null,
            bestPractices: lhr.categories["best-practices"]?.score ?? null,
          },
        });
      } catch (err) {
        console.error(`Lighthouse failed for ${url}:`, err.message);
        summary.push({
          routeId: route.id,
          path: route.path,
          status: "error",
          error: err.message,
          scores: null,
        });
      }
    }
  } finally {
    // chrome.kill() can throw EPERM on Windows while it removes its temp profile
    // directory (a file-locking timing quirk, not a sign the audit data is bad — every
    // route's report is already written to disk by this point). Swallow it so a cleanup
    // failure never loses the summary written below.
    try {
      await chrome.kill();
    } catch (err) {
      console.warn(`Chrome cleanup warning (safe to ignore): ${err.message}`);
    }
  }

  fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));
  console.log(`\nLighthouse summary written to ${SUMMARY_PATH}`);
  console.table(
    summary.map((s) => ({
      route: s.routeId,
      status: s.status,
      performance: s.scores?.performance != null ? Math.round(s.scores.performance * 100) : "-",
      accessibility: s.scores?.accessibility != null ? Math.round(s.scores.accessibility * 100) : "-",
      seo: s.scores?.seo != null ? Math.round(s.scores.seo * 100) : "-",
      bestPractices: s.scores?.bestPractices != null ? Math.round(s.scores.bestPractices * 100) : "-",
    }))
  );
}

main().catch((err) => {
  console.error("Lighthouse audit script failed:", err);
  process.exit(1);
});
