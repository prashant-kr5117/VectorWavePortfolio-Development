import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { routes } from "./lib/routes";

/**
 * Browser health check (Stage 3, Step 6).
 *
 * For every route: detects HTTP failures, console errors, failed resource requests,
 * uncaught page exceptions (a proxy for hydration errors — React logs a "Hydration
 * failed" console error too, which is also captured), unexpected redirects, and missing
 * page content (no <h1>, empty body text).
 *
 * This test intentionally never asserts hard pass/fail on content issues — per Stage 3
 * instructions ("Do not automatically fix failures. Report them."), everything is
 * recorded to ai-optimization/testing/health-check-results.json and summarized in
 * ai-optimization/reports/RENDERED-BASELINE.md. The only hard Playwright assertion is
 * that the page actually returns a response at all (a total navigation failure is a
 * different class of problem than a console warning and is worth failing loudly on).
 */

type RouteHealth = {
  routeId: string;
  path: string;
  httpStatus: number | null;
  finalUrl: string;
  redirected: boolean;
  expectedRedirect: boolean;
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: { url: string; failure: string | null }[];
  hasH1: boolean;
  h1Text: string | null;
  bodyTextLength: number;
};

const results: RouteHealth[] = [];
const OUTPUT_DIR = path.resolve(__dirname, "..", "ai-optimization", "testing");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

test.describe("Route health checks", () => {
  for (const route of routes) {
    test(`health: ${route.id}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: { url: string; failure: string | null }[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => {
        pageErrors.push(err.message);
      });
      page.on("requestfailed", (req) => {
        failedRequests.push({ url: req.url(), failure: req.failure()?.errorText ?? null });
      });

      const response = await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const finalUrl = page.url();
      const requestedUrl = new URL(route.path, "http://localhost:3100").toString();
      const redirected = finalUrl !== requestedUrl;

      const h1 = page.locator("h1").first();
      const hasH1 = (await h1.count()) > 0;
      const h1Text = hasH1 ? (await h1.textContent())?.trim() ?? null : null;
      const bodyTextLength = ((await page.locator("body").textContent()) ?? "").trim().length;

      const health: RouteHealth = {
        routeId: route.id,
        path: route.path,
        httpStatus: response?.status() ?? null,
        finalUrl,
        redirected,
        expectedRedirect: false, // none of the tested routes are expected to redirect
        consoleErrors,
        pageErrors,
        failedRequests,
        hasH1,
        h1Text,
        bodyTextLength,
      };
      results.push(health);

      // Hard-fail only on total navigation breakage — everything else is reported, not asserted.
      expect(response, `${route.path} produced no navigation response at all`).toBeTruthy();
    });
  }

  test("redirect check: /team -> /about", async ({ page }) => {
    const response = await page.goto("/team", { waitUntil: "networkidle" });
    const finalUrl = page.url();
    results.push({
      routeId: "redirect-team",
      path: "/team",
      httpStatus: response?.status() ?? null,
      finalUrl,
      redirected: finalUrl !== new URL("/team", "http://localhost:3100").toString(),
      expectedRedirect: true, // configured in next.config.ts
      consoleErrors: [],
      pageErrors: [],
      failedRequests: [],
      hasH1: false,
      h1Text: null,
      bodyTextLength: 0,
    });
    expect(finalUrl.endsWith("/about")).toBeTruthy();
  });

  test.afterAll(() => {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, "health-check-results.json"),
      JSON.stringify(results, null, 2)
    );
  });
});
