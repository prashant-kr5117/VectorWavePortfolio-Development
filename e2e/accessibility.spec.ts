import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";
import { routes } from "./lib/routes";

/**
 * Automated accessibility audit (Stage 3, Step 7).
 *
 * Runs axe-core (via @axe-core/playwright, the standard Playwright-compatible
 * integration) against every route using the WCAG 2.0/2.1 A+AA ruleset, which covers
 * automatable checks for: missing labels, missing alt text, heading order, button/link
 * accessible-name problems, ARIA misuse, and some contrast checks (axe's contrast rule
 * catches many but not all real-world contrast failures — it is not a substitute for
 * manual verification, and is reported as such).
 *
 * This does NOT fix anything — findings are written to
 * ai-optimization/reports/accessibility/<route>.json (full detail) and summarized in
 * ai-optimization/testing/accessibility-results.json (used to build
 * ai-optimization/reports/RENDERED-BASELINE.md).
 */

const DETAIL_DIR = path.resolve(__dirname, "..", "ai-optimization", "reports", "accessibility");
const SUMMARY_PATH = path.resolve(__dirname, "..", "ai-optimization", "testing", "accessibility-results.json");
fs.mkdirSync(DETAIL_DIR, { recursive: true });

type AxeSummary = {
  routeId: string;
  path: string;
  violationCount: number;
  violationsBySeverity: Record<string, number>;
  violationIds: string[];
};

const summaries: AxeSummary[] = [];

test.describe("Automated accessibility audit (axe-core)", () => {
  for (const route of routes) {
    test(`a11y: ${route.id}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      fs.writeFileSync(
        path.join(DETAIL_DIR, `${route.id}.json`),
        JSON.stringify(results, null, 2)
      );

      const violationsBySeverity: Record<string, number> = {};
      for (const v of results.violations) {
        violationsBySeverity[v.impact ?? "unknown"] =
          (violationsBySeverity[v.impact ?? "unknown"] ?? 0) + 1;
      }

      summaries.push({
        routeId: route.id,
        path: route.path,
        violationCount: results.violations.length,
        violationsBySeverity,
        violationIds: results.violations.map((v) => v.id),
      });
    });
  }

  test.afterAll(() => {
    fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summaries, null, 2));
  });
});
