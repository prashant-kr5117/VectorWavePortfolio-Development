import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { representativeRoutes } from "./lib/routes";

/**
 * Font-rendering verification (Stage 3, Step 10).
 *
 * Stage 2 identified, from source alone, that app/globals.css:69
 * (`body { font-family: Arial, Helvetica, sans-serif; }`) likely overrides the Geist
 * font the site loads via next/font. This spec does NOT fix that — it measures the
 * actual computed font-family the browser renders, on both <body> and the page's <h1>,
 * so there is a real before-state on record ahead of any future fix.
 *
 * Explicitly out of scope: changing app/globals.css. This file only reads computed
 * styles.
 */

const OUTPUT_PATH = path.resolve(__dirname, "..", "ai-optimization", "testing", "font-check-results.json");

type FontResult = {
  routeId: string;
  path: string;
  expectedFontFamily: string;
  bodyComputedFontFamily: string;
  h1ComputedFontFamily: string;
  geistCssVariablePresent: boolean;
};

const results: FontResult[] = [];

test.describe("Font rendering verification", () => {
  for (const route of representativeRoutes) {
    test(`font-check: ${route.id}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      const bodyComputedFontFamily = await page.evaluate(() =>
        getComputedStyle(document.body).fontFamily
      );

      const h1ComputedFontFamily = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        return h1 ? getComputedStyle(h1).fontFamily : "(no h1 found)";
      });

      // The Geist font-loading system exposes a CSS custom property (--font-geist-sans)
      // on the root element regardless of whether anything actually *uses* it — this
      // confirms the font is being loaded/downloaded even if it isn't rendered.
      const geistCssVariablePresent = await page.evaluate(() => {
        const rootStyle = getComputedStyle(document.documentElement);
        const value = rootStyle.getPropertyValue("--font-geist-sans");
        return value.trim().length > 0;
      });

      results.push({
        routeId: route.id,
        path: route.path,
        expectedFontFamily: "Geist (via next/font, exposed as --font-geist-sans)",
        bodyComputedFontFamily,
        h1ComputedFontFamily,
        geistCssVariablePresent,
      });
    });
  }

  test.afterAll(() => {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  });
});
