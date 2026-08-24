/**
 * Canonical route list for the AI optimization evaluation infrastructure.
 *
 * Service routes are derived directly from the live data file (lib/services.ts) so they
 * can never silently drift from the real site the way the static app/sitemap.xml does
 * (see ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md, Step 12). Blog routes come
 * from e2e/lib/blog-routes.generated.json instead of lib/posts.ts directly: posts now
 * live in Sanity, and Playwright collects test cases by statically executing this file
 * before global-setup (or any network call) can run, so a live Sanity fetch isn't
 * possible here. Run `npm run e2e:sync-routes` after changing posts in the Studio to
 * refresh that snapshot. Every Playwright test/script imports `routes` from here instead
 * of hardcoding paths.
 */
import { serviceCategories } from "../../lib/services";
import blogRoutesSnapshot from "./blog-routes.generated.json";

const posts = blogRoutesSnapshot.posts;

export type RouteKind = "core" | "service" | "blog";

export type Route = {
  /** Filesystem-safe identifier, used for screenshot/report filenames. */
  id: string;
  /** Human-readable label for reports. */
  label: string;
  /** URL path relative to the site origin. */
  path: string;
  kind: RouteKind;
};

const coreRoutes: Route[] = [
  { id: "homepage", label: "Homepage", path: "/", kind: "core" },
  { id: "about", label: "About", path: "/about", kind: "core" },
  { id: "services-index", label: "Services Index", path: "/services", kind: "core" },
  { id: "blog-index", label: "Blog Index", path: "/blog", kind: "core" },
  { id: "contact", label: "Contact", path: "/contact", kind: "core" },
];

const serviceRoutes: Route[] = serviceCategories.map((service) => ({
  id: `service-${service.slug}`,
  label: `Service: ${service.title}`,
  path: `/services/${service.slug}`,
  kind: "service",
}));

const blogRoutes: Route[] = posts.map((post) => ({
  id: `blog-${post.slug}`,
  label: `Blog: ${post.title}`,
  path: `/blog/${post.slug}`,
  kind: "blog",
}));

export const routes: Route[] = [...coreRoutes, ...serviceRoutes, ...blogRoutes];

/**
 * A smaller, representative subset covering every distinct page template, used by
 * scripts where running all ~30 routes would be excessive (e.g. Lighthouse, which is
 * slow per-page). Includes the design-forked zoho-bundled-suite page explicitly since
 * it uses a completely different component tree from every other service page.
 */
export const representativeRoutes: Route[] = [
  coreRoutes[0], // homepage
  coreRoutes[1], // about
  coreRoutes[2], // services index
  serviceRoutes.find((r) => r.id === "service-zoho-bundled-suite")!,
  serviceRoutes.find((r) => r.id !== "service-zoho-bundled-suite")!, // one standard templated service page
  coreRoutes[3], // blog index
  blogRoutes[0], // one blog detail page
  coreRoutes[4], // contact
];
