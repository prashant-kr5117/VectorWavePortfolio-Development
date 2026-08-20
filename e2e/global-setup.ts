import fs from "node:fs";
import path from "node:path";
import { routes, representativeRoutes } from "./lib/routes";

/**
 * Playwright global setup — runs once before any test file, and is transpiled by
 * Playwright's own TypeScript loader (the same mechanism that resolves e2e/lib/routes.ts's
 * relative import of ../../lib/services.ts and ../../lib/posts.ts without needing ts-node
 * or a "type": "module" change to the main package.json).
 *
 * Its only job is to snapshot the live, code-derived route list to disk under
 * ai-optimization/testing/, per Stage 3 Step 4 ("Store the generated route list under
 * ai-optimization/"). This is a read-only export of data that already exists in
 * lib/services.ts / lib/posts.ts — it does not alter routing behavior in any way.
 */
export default async function globalSetup() {
  const outDir = path.resolve(__dirname, "..", "ai-optimization", "testing");
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "routes.generated.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "e2e/lib/routes.ts, derived from lib/services.ts + lib/posts.ts",
        totalRoutes: routes.length,
        routes,
        representativeRoutes,
      },
      null,
      2
    )
  );

  console.log(`[global-setup] Wrote ${routes.length} routes to ai-optimization/testing/routes.generated.json`);
}
