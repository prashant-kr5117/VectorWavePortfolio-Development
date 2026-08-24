// Refreshes e2e/lib/blog-routes.generated.json from the posts currently published in
// Sanity. Playwright collects test cases by statically executing spec files (before
// global-setup or any network call can run), so e2e/lib/routes.ts cannot fetch Sanity
// live — it reads this checked-in snapshot instead. Re-run this after adding, renaming,
// or removing a post in the Studio, before running the e2e suite.
// Run with: npm run e2e:sync-routes
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-08-24",
  useCdn: false,
});

async function run() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, title }`
  );

  const outPath = path.resolve(__dirname, "..", "e2e", "lib", "blog-routes.generated.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "scripts/sync-blog-routes.mjs, reading published posts from Sanity",
        posts,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`Wrote ${posts.length} post routes to ${outPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
