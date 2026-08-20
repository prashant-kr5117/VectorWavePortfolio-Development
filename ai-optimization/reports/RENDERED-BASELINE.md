# Rendered Baseline — Stage 3

**Date:** 2026-08-20
**Method:** Real browser measurement via Playwright (Chromium) + axe-core + Lighthouse,
run against a production build (`next build` + `next start -p 3100`) of the **unmodified**
website. This supersedes Stage 2's source-only inferences with actual rendered
measurements wherever the two overlap — differences are called out explicitly below.

**Confidence key:** **[MEASURED]** — read directly from a tool's output in this run.
**[OBSERVED]** — a consistent pattern across the measured routes. **[INFERRED]** — a
reasonable conclusion the tooling doesn't directly state. **[UNKNOWN]** — still not
measurable with what exists (e.g. this is a single local run, not a multi-run average, and
not measured against real hosting/network conditions).

No website source file was modified to produce these measurements. Confirmed via
`git diff` at the end of this stage — see the final "Git Safety" section.

---

## Coverage

| Check | Routes covered | Tool |
|---|---|---|
| Screenshots | All 30 indexable routes × 5 viewports = 150 images | Playwright |
| Health check (HTTP/console/redirects/content) | All 30 routes + 1 redirect check (`/team`) | Playwright |
| Accessibility (axe-core) | All 30 routes | `@axe-core/playwright` |
| Font rendering | 8 representative routes | Playwright |
| Lighthouse (Performance/Accessibility/SEO/Best Practices) | 8 representative routes | `lighthouse` + `chrome-launcher` |

The representative 8 (used for font-check and Lighthouse, where full 30-route coverage
would be slow and largely redundant given the shared templates documented in Stage 2):
homepage, about, services index, `/services/zoho-bundled-suite` (the design fork),
`/services/sales` (a standard templated service page), blog index, one blog post, contact.

---

## Screenshot status

**150/150 captured successfully**, full-page, `reducedMotion: "reduce"` applied per
Stage 3 Step 3/5/11. Stored at `ai-optimization/screenshots/baseline/{desktop,tablet,mobile}/`,
28MB total. Filenames follow `<route-id>-<category>-<width>.png`
(e.g. `homepage-desktop-1440.png`, `homepage-mobile-390.png`). Zero capture failures,
zero timeouts. This is now the canonical visual reference — see
`ai-optimization/testing/README.md` for the re-capture convention (never overwrite
`baseline/` silently).

---

## Browser errors [MEASURED]

**Zero console errors. Zero uncaught page exceptions (no hydration-error signal) across
all 30 routes.** This is a genuinely clean result — Stage 2's source-level review found
no obvious red flags here, and the rendered measurement confirms it directly.

## Failed requests [MEASURED]

**30 of 30 routes show at least one "failed" network request** — but all of them trace to
two known, expected causes, not to a site defect:

1. **`net::ERR_ABORTED` on the Google Analytics `collect` beacon** (every route). This
   fires because the automated test navigates away/closes the browser context before the
   GA4 beacon finishes — a standard artifact of headless automated testing, not something
   a real visitor would experience.
2. **`net::ERR_BLOCKED_BY_ORB` on a Google Translate background request** (roughly half
   the routes, appears probabilistic/timing-dependent). This is a known behavior of
   Google's Translate widget performing a bot-detection sanity check
   (`google.com/sorry/index...`) that gets blocked by Chrome's Opaque Response Blocking
   in a headless/automated context. The Translate widget itself still initializes
   correctly (confirmed no console error or page error accompanies it).

**Net finding:** no genuinely broken resource request was found on any route. Both
patterns are third-party-script artifacts of automated/headless testing conditions, not
evidence of a site bug — flagged here for completeness per Stage 3 Step 6, not as an
action item.

## HTTP failures, broken navigation, unexpected redirects [MEASURED]

Zero. All 30 routes returned HTTP 200. The one configured redirect (`/team` → `/about`)
fired correctly and was the only redirect observed anywhere.

## Missing page content [MEASURED]

Zero real gaps. Every one of the 30 real routes has exactly one `<h1>` with real text and
substantial body text. (The health-check script's own JSON shows one "no H1" / "thin
content" flag, but that's an artifact of the `/team` redirect-check entry, which
intentionally doesn't inspect post-redirect content — not a finding about `/about`, which
the redirect lands on and which independently passed its own full content check.)

## A rendering nuance worth documenting (not a bug)

The `<h1>` text captured by `page.locator("h1").textContent()` on the homepage and About
page reads as duplicated (e.g. *"Powering Intelligent BusinesPowering Intelligent
Business Flow, without the overhead."*). This is **not** a rendering bug — it's the
`Typewriter` component's accessible-by-design structure
([components/Typewriter.tsx:47-62](../../components/Typewriter.tsx#L47-L62)): an
`aria-hidden="true"` span shows the animated partial/full text, and a separate `sr-only`
span holds the complete text for screen readers. Screen readers correctly announce it
once (aria-hidden content is excluded from accessible-name computation). But any tool
that reads raw `textContent` — including this test script, and potentially some
naive/older SEO crawlers that don't fully respect `aria-hidden` — will see the text
concatenated. Worth knowing before treating any future "duplicate H1 text" finding from a
different tool as a new bug; it's this same known structure.

---

## Accessibility findings [MEASURED — axe-core, WCAG 2.0/2.1 A+AA ruleset]

**31 violation instances across 30 pages** — far more consistent and narrower than Stage
2's source-level review anticipated, because axe only catches what's automatable; it
does **not** catch some of the specific manual-inspection findings from Stage 2 (like the
`ContactForm` labels' missing `htmlFor`/`id` pairing on the text inputs specifically, or
the tab components' missing keyboard navigation — axe doesn't check keyboard-operability
of custom widgets). Two distinct rule violations found:

### 1. `color-contrast` (serious) — every single one of the 30 pages [MEASURED, global]

**Root cause identified:** [components/Footer.tsx:101-106](../../components/Footer.tsx#L101-L106) —
the copyright line and the platform-list line both use `text-on-inverse-faint` (`#6b7690`)
on the dark footer background (`--color-ink-inverse`, `#0b1b33`), measured contrast ratio
**3.78:1**, below the WCAG AA requirement of **4.5:1** for normal text. Because Footer
renders on every page, this single token-level issue affects the entire site — an
overlooked example of exactly the token-drift risk `DESIGN_SYSTEM.md` already flagged in
general terms, now measured concretely. Notably, this is the same footer line that
carries the unverified "Salesforce" platform claim (`ai-optimization/BUSINESS_FACTS.md`)
— two independent Stage 1/2 findings converging on the same two lines of markup.

### 2. `select-name` (critical) — Contact page only [MEASURED]

`[components/ContactForm.tsx]` — the "How did you hear about us" `<select
name="leadSource">` has **zero accessible name**: no wrapping/`htmlFor` label, no
`aria-label`, no `aria-labelledby`, no `title`. This is the single most severe
accessibility finding in this entire evaluation (axe `impact: "critical"`) — a screen
reader user cannot determine what this form control is at all. This sharpens Stage 2's
source-level finding (labels present visually but not programmatically associated) with
tool-confirmed severity: the `<select>` is worse off than its sibling text inputs, which
at least have an adjacent (if unassociated) `<label>` text.

**Not caught by axe (still real — see `STAGE-2-BASELINE-REVIEW.md`):** keyboard
navigation gaps in the 3 tab implementations, the `LanguageSwitcher`'s missing
Escape-to-close, the `Typewriter`/`Counter` reduced-motion gap, the icon-lookup crash
risk. Automated tooling and manual source review are complementary, not redundant —
this is why both exist in this evaluation layer.

---

## Lighthouse findings [MEASURED — single local run per route, desktop form factor, Lighthouse's default simulated throttling]

| Route | Performance | Accessibility | SEO | Best Practices |
|---|---|---|---|---|
| Homepage | 33 | 97 | 100 | 77 |
| About | 37 | 96 | 100 | 77 |
| Services index | 45 | 96 | 100 | 77 |
| `/services/zoho-bundled-suite` | 31 | 95 | 100 | 77 |
| `/services/sales` | 41 | 96 | 100 | 77 |
| Blog index | 47 | 97 | 100 | 77 |
| Blog post (sample) | 48 | 96 | 100 | 77 |
| Contact | 49 | 92 | 100 | 77 |

### Performance — [MEASURED] genuinely poor, not previously measurable

Stage 2 could only say "no live speed test was run" [INFERRED]. Now measured directly.
Homepage core metrics: **LCP 4.1s** (target: <2.5s for "good"), **Total Blocking Time
960ms** (target: <200ms), **CLS 0.122** (target: <0.1), **Time to Interactive 7.6s**.
Lighthouse's own diagnostics point at ~150KiB of unused JavaScript and flag layout-shift
and forced-reflow issues. This is a genuinely new, concrete finding — Stage 2's
Performance score (65/100, [INFERRED]) was likely too generous relative to what real
Core Web Vitals show. **Caveat:** this is a single local run without CDN/production
network conditions, so treat the exact numbers as directional, not final — but the low
scores are consistent across all 8 representative routes, which rules out a one-off
measurement fluke.

### Accessibility (Lighthouse's own score, distinct from the direct axe-core run above)

92-97 across all routes — broadly consistent with the axe-core run finding only 1-2
violations per page (Lighthouse's accessibility category is itself axe-based, just a
different ruleset subset and weighting).

### SEO — 100 on every route, but a narrower check than it looks

**Important caveat, not a contradiction of Stage 2:** Lighthouse's SEO category checks
crawlability, title/meta-description presence, HTTP status, descriptive link text,
`robots.txt` validity, and image alt presence — **all real strengths this site already
has**, confirmed. It does **not** score Open Graph/Twitter-card presence at all, and its
`canonical` check returned `notApplicable` (Lighthouse only fails an *invalid* canonical,
never flags a *missing* one), and `structured-data` is a manual-only check that isn't
scored automatically. **So a 100 SEO score here is real but does not contradict Stage 2's
finding that OpenGraph/canonical metadata is completely absent** — Lighthouse simply
doesn't measure that gap. Both findings stand; they're measuring different things.

### Best Practices — flat 77 on every route

Two audits fail identically on every route: **`third-party-cookies`** (2 cookies
detected — consistent with GA4 + Zoho SalesIQ both being live, real, loaded scripts per
`BUSINESS_FACTS.md`) and **`inspector-issues`** (Chrome DevTools logged at least one
Issue — likely related to the same third-party-script behavior observed in the Failed
Requests section above). Neither is a code defect introduced by this site's own
first-party code; both trace to the third-party scripts it deliberately loads.

---

## Font verification [MEASURED — Step 10]

**Expected:** Geist (loaded via `next/font`, exposed as the `--font-geist-sans` CSS
variable).
**Actual, measured on every representative route:** `Arial, Helvetica, sans-serif` on
both `<body>` and every `<h1>` — **except** `/services/zoho-bundled-suite`, whose `<h1>`
renders `Manrope, "Manrope Fallback"` (that page's own separate font, confirming the
design-fork finding from Stage 1/2 at the rendered level, not just in source).

On every route, `--font-geist-sans` **is** present and non-empty as a CSS custom
property — confirming the font is genuinely downloaded/loaded, exactly as
`app/globals.css:69`'s `font-family: Arial, Helvetica, sans-serif;` override predicts:
the font loads, but nothing ever tells the browser to use it. This is now a fully
measured, tool-confirmed before-state (not source-inferred) for whenever the fix in
`ai-optimization/BASELINE.md`'s "Recommended first optimization target" is actually
implemented — full data in `ai-optimization/testing/font-check-results.json`.

---

## Performance observations, consolidated

| Signal | Stage 2 (source-only) | Stage 3 (measured) |
|---|---|---|
| Performance category | 65/100 [INFERRED] | Lighthouse 31-49/100 [MEASURED] — materially worse than the source-level inference suggested |
| Font bug cost | Assumed wasted download | Confirmed: font loads (`--font-geist-sans` present) but never renders on 7/8 representative routes |
| Heavy assets | Flagged by file size only | LCP (4.1s on homepage) and 960ms TBT are consistent with heavy-asset/script-cost concerns already flagged in Stage 2 |
| Third-party scripts | "historically heavy, unmeasured" | Best Practices 77 flat, tied directly to third-party cookies/issues — consistent with GA4 + Zoho SalesIQ + Google Translate all being real and live |

## SEO observations, consolidated

| Signal | Stage 2 (source-only) | Stage 3 (measured) |
|---|---|---|
| Crawlability/titles/meta/robots.txt | Confirmed strong from source | Lighthouse SEO 100/100 confirms it at the rendered level |
| OpenGraph/canonical absence | Confirmed absent from source | Not contradicted — Lighthouse's SEO score doesn't check for these at all, so the 100 score and the "absent" finding are both true simultaneously |
| Structured data | Confirmed broad/correct from source | Lighthouse marks `structured-data` as manual-only (unscored) — Stage 2's source-level verification remains the only real check performed on this so far |

---

## Font-family, health, accessibility, and Lighthouse raw data

Full machine-readable output for every route: `ai-optimization/testing/*.json` (summary
level) and `ai-optimization/reports/{accessibility,lighthouse}/<route>.json` (full
per-route detail, including axe's complete violation nodes and Lighthouse's complete
audit set).

---

## Unresolved / still not measurable

- **Real-world performance** under actual hosting/CDN/network conditions — this run used
  a local, unthrottled machine. [UNKNOWN] until the site is measured on its real
  deployment target (also still undecided — see `BUSINESS_FACTS.md`).
- **Cross-browser rendering** (Firefox/Safari) — this infrastructure deliberately used
  Chromium-only per Stage 3's "do not create unnecessary browser projects" instruction;
  cross-browser is a reasonable future addition, not attempted here.
- **Multi-run Lighthouse averaging** — this is a single run per route; Lighthouse scores
  are known to have run-to-run variance, particularly for timing-based metrics like TBT/CLS.

---

## Git safety

Verified at the end of this stage via `git status --porcelain` and `git diff --stat`:

- **Zero diff on any pre-existing tracked file under `app/`, `components/`, `lib/`,
  `public/`, or `src/`** — confirmed with `git diff --stat -- app/ components/ lib/
  public/ src/`, which returned empty. No production route, layout, color, typeface, or
  business claim was touched.
- **4 pre-existing tracked files modified**, all expected and all infrastructure-only:
  `package.json` (new `devDependencies` + `npm run e2e:*` scripts), `package-lock.json`
  (dependency tree for those installs), `.gitignore` (excludes Playwright's own transient
  `test-results/`/`playwright-report/` run artifacts — not our evaluation output, which
  stays tracked), `ai-optimization/README.md` (Stage 3 updates: tool-availability table,
  future-loop diagram, directory listing).
- **New files/directories only** everywhere else: `playwright.config.ts`, `e2e/` (config,
  route/viewport data, 4 specs, the Lighthouse script), `ai-optimization/testing/`,
  `ai-optimization/reports/RENDERED-BASELINE.md` (this file), `ai-optimization/reports/
  accessibility/`, `ai-optimization/reports/lighthouse/`, `ai-optimization/screenshots/
  baseline/`.
- **Nothing was committed or pushed.** All of the above are working-tree changes only, per
  Stage 3's explicit instruction not to commit/push automatically.
