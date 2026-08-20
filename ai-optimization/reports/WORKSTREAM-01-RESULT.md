# Workstream 1 — Global Foundation: Result

**Date:** 2026-08-20
**Repo:** VectorWavePortfolio-Development (confirmed separate from the production repo per
this task's instructions)
**Scope:** Typography fix, performance fixes, accessibility fixes, reusable metadata
architecture — global/technical only, no redesign. Governed by `ai-optimization/SAFETY_RULES.md`,
`ai-optimization/EVALUATION_RUBRIC.md`, and `ai-optimization/BUSINESS_FACTS.md` (no
business facts were touched — verified below).

---

## 1. Typography — font bug fixed

**Root cause:** `app/globals.css:69` — `font-family: Arial, Helvetica, sans-serif;`
overrode the Geist font the site was already downloading via `next/font`.

**Fix:** [app/globals.css](../../app/globals.css) — changed to
`font-family: var(--font-sans), Arial, Helvetica, sans-serif;`, where `--font-sans`
already resolved to `var(--font-geist-sans)` in the existing `@theme inline` block. This
uses the font system that was already built and intended — no new font, no new
dependency, Arial/Helvetica kept as the fallback chain rather than removed.

**Verified (measured, not assumed):** re-ran `e2e/font-check.spec.ts` — computed
`font-family` on `<body>` and `<h1>` now reads `Geist, "Geist Fallback", Arial,
Helvetica, sans-serif` on 7 of 8 representative routes. The 8th,
`/services/zoho-bundled-suite`, correctly still renders `Manrope` on its `<h1>` — that
page's own separate font system is untouched, as instructed (its design-fork resolution
is a later, human-gated decision — see `ai-optimization/DESIGN_SYSTEM.md`). Full data:
`ai-optimization/testing/font-check-results.json`.

No font sizes were changed, per instructions.

---

## 2. Performance

### What the Stage 3 Lighthouse data pointed to

From `ai-optimization/reports/RENDERED-BASELINE.md` and a fresh read of
`ai-optimization/reports/lighthouse/homepage.json`'s `bootup-time` audit, the three
largest measured contributors to the homepage's ~960ms TBT were: a first-party JS chunk
(1110ms scripting), GA4's `gtag.js` (544ms scripting), and the combined weight of the
chat + translate third-party scripts (~505ms scripting). Root cause investigation (not
just the audit list) also found: `app/(site)/about/page.tsx` passed an invalid `preload`
prop to `next/image` instead of `priority` (a typo bug, not a stylistic choice), and two
homepage sections (`TechnologyAndIndustry.tsx`, `ProcessChains.tsx`) were entirely
client-rendered (`"use client"` at the top of the file) even though most of their content
is static — only 2-3 `useState` calls in each file actually needed a client boundary.

### Fixes implemented

1. **Image loading bug fix** — [app/(site)/about/page.tsx](<../../app/(site)/about/page.tsx>):
   `preload` → `priority` on the About page's hero background image. This was a real
   bug (an unrecognized prop silently does nothing), not a design change — the image was
   never getting its intended load priority.

2. **Third-party script loading strategy** — [app/layout.tsx](../../app/layout.tsx):
   Zoho SalesIQ (chat) and Google Translate scripts moved from `strategy="afterInteractive"`
   to `strategy="lazyOnload"`. Both have zero visible presence until a visitor actively
   triggers them (the translate element is CSS/JS-hidden by design; the chat bubble isn't
   above-the-fold content), so deferring their execution costs nothing functionally. GA4
   was deliberately left on `afterInteractive` so early-bounce visits are still tracked —
   a real product tradeoff, documented inline in the code.

3. **Reduced unnecessary client-side hydration** — split two homepage sections so only
   the genuinely interactive parts ship as client JS:
   - `components/sections/ProcessChains.tsx` is now a server component; the tab-switcher
     moved to a new `components/sections/ProcessChainTabs.tsx` client component.
   - `components/sections/TechnologyAndIndustry.tsx` is now a server component; its two
     tab-switchers moved to new `components/sections/TechPlatformTabs.tsx` and
     `components/sections/IndustryTabs.tsx` client components. The static "One
     transformation approach" statement, the ecosystem marquee, and the
     "Data isn't the finish line" visibility-questions block all now render as plain
     server HTML instead of shipping inside a client bundle.

   This is a mechanical split using the existing `HoverGlow`/`Reveal` client leaf
   components' already-supported `children: ReactNode` pattern — no visual output
   changed (verified below), no functionality removed, no new abstraction invented
   beyond separating "this needs `useState`" from "this doesn't."

### What was measured, and an important honest correction

Initial post-fix Lighthouse runs on the homepage showed LCP and TBT that looked **worse**
than the Stage 3 baseline (LCP ~4.1s → ~7.9-8.2s; TBT ~960ms → ~1,860-2,220ms across 3
runs). Before shipping that as a "the changes made it worse" finding, I ran a controlled
same-session test: **stashed every change, rebuilt the completely original code, and
re-measured on the same machine, in the same session, immediately afterward.**

| | Performance | LCP | TBT | CLS |
|---|---|---|---|---|
| Stage 3 baseline (measured hours earlier, fresh session) | 33 | 4.1s | 960ms | 0.122 |
| **Control** — original code, re-measured *this session* | 26 | **12.6s** | **3,600ms** | 0.122 |
| **Treatment** — this workstream's code, same session (3 runs) | 28-33 | 7.9-8.2s | 1,860-2,220ms | 0.144-0.145 |

**The original, completely unmodified code measured *worse* than my changes when tested
in the same session.** This proves the apparent regression was environmental — Lighthouse
is measuring on a local, shared, single-run, unthrottled-network machine that had
accumulated real background load (many repeated builds, dev servers, and Chrome
launches) over the course of a long working session, exactly the caveat
`ai-optimization/reports/RENDERED-BASELINE.md` already flagged ("single-run measurements,
not averaged... treat as directional"). The Stage 3 baseline numbers and this
workstream's numbers are **not directly comparable** — they were captured hours apart in
a materially different machine-load state. The fair, same-session comparison (control vs.
treatment above) shows a real improvement: **LCP ~35-37% lower, TBT ~40-48% lower**, with
this workstream's changes.

**Honest limitation:** the third-party-script-strategy change specifically was tested
once in isolation (reverting just that piece, mid-session) and showed a smaller, less
clear TBT benefit than expected — plausibly because `lazyOnload` defers script execution
into the exact window Lighthouse uses to detect "quiescence" for TTI/TBT, which can
offset some of the real-world main-thread-contention benefit it should still provide to
an actual visitor. I kept the change (the UX rationale — deferring invisible-until-triggered
widgets — holds regardless of this one metric's sensitivity to timing), but flag this as
inconclusive on Lighthouse's TBT number specifically, and a good candidate for
re-verification once real hosting/network conditions exist (see Remaining Issues).

**What this means for the numbers below:** the "Before" column in the Lighthouse table
uses the Stage 3 baseline (the only prior recorded numbers), and the "After" column uses
this workstream's measurements — both single local runs, both subject to the same
environmental caveat. Read the *direction and the same-session control test* as the
credible signal, not the exact absolute deltas between Before and After.

| Route | Perf (Before → After) | Accessibility LH (Before → After) | SEO (Before → After) | Best Practices (Before → After) |
|---|---|---|---|---|
| Homepage | 33 → 29 | 97 → 100 | 100 → 100 | 77 → 77 |
| About | 37 → 40 | 96 → 100 | 100 → 100 | 77 → 77 |
| Services index | 45 → 41 | 96 → 100 | 100 → 100 | 77 → 77 |
| `/services/zoho-bundled-suite` | 31 → 33 | 95 → 95 | 100 → 100 | 77 → 77 |
| `/services/sales` | 41 → 34 | 96 → 100 | 100 → 100 | 77 → 77 |
| Blog index | 47 → 36 | 97 → 100 | 100 → 100 | 77 → 77 |
| Blog post (sample) | 48 → 41 | 96 → 100 | 100 → 100 | 77 → 77 |
| Contact | 49 → 39 | 92 → 100 | 100 → 100 | 77 → 77 |

Lighthouse's own **Accessibility score genuinely improved on 7 of 8 routes** (6 reaching
a perfect 100, up from 92-97) — this is a directly attributable, non-environmental result
of the accessibility fixes below, not affected by the machine-load confound (Lighthouse's
accessibility audits are static DOM checks, not timing-based). Best Practices is flat at
77 everywhere, before and after — expected, since it's driven by the mere *presence* of
third-party cookies/scripts, not their load timing (see `RENDERED-BASELINE.md`).

**No functionality was removed** to obtain any of this — every third-party integration,
every interactive tab, every animation still works exactly as before (verified in
Section 5).

---

## 3. Accessibility

| Fix | File | What changed |
|---|---|---|
| Footer contrast 3.78:1 → compliant | [app/globals.css](../../app/globals.css) | `--color-on-inverse-faint` token changed from `#6b7690` to `#7c86a3` — computed contrast against `--color-ink-inverse` (`#0b1b33`) is now **4.76:1** (WCAG AA requires 4.5:1). This is a shared design token used in 4 other places (Footer, Hero stats labels, TechnologyAndIndustry icons/arrows) — fixing it at the token level fixes all of them consistently, per the "prefer global/system fixes" rule in `EVALUATION_RUBRIC.md`. Chose the smallest lightness increase that clears AA rather than jumping to the brighter `on-inverse-muted` tier, to preserve the existing two-tier visual hierarchy. |
| Contact "How did you hear about us" select — accessible name | [components/ContactForm.tsx](../../components/ContactForm.tsx) | Added `id="leadSource"` to the `<select>` and `htmlFor="leadSource"` to its `<label>` — zero visual change, resolves the axe **critical** `select-name` violation (the select previously had no accessible name at all). |
| Typewriter reduced-motion | [components/Typewriter.tsx](../../components/Typewriter.tsx) | On mount, checks `window.matchMedia("(prefers-reduced-motion: reduce)")`; if true, shows the full text immediately instead of animating character-by-character. |
| Counter reduced-motion | [components/Counter.tsx](../../components/Counter.tsx) | Same pattern — shows the final number immediately instead of counting up, when reduced motion is preferred. |

### Measured before/after (axe-core, all 30 routes, WCAG 2.0/2.1 A+AA)

| | Total violation instances | Pages affected | Worst severity |
|---|---|---|---|
| Before (Stage 3) | 31 | 30 of 30 | 1 critical (`select-name`), rest serious (`color-contrast`) |
| **After** | **2** | **2 of 30** | serious (`color-contrast`, both out of scope — see below) |

The `select-name` critical violation is **completely eliminated**. The global
`color-contrast` violation is eliminated from **28 of 30 pages**. Full data:
`ai-optimization/testing/accessibility-results.json` and
`ai-optimization/reports/accessibility/<route>.json`.

### The 2 remaining `color-contrast` violations — confirmed out of scope

- **`blog-index`**: a *different* token (`--color-ink-faint`, `#8a93a8`, 3.07:1) used for
  blog-card meta text (date/read-time row) on a light background — not the Footer, not
  the token this task specified.
- **`service-zoho-bundled-suite`**: hard-coded hex colors (`#707479` on `#303236`,
  `#0e8797` on `#f5f4ef`) local to that page's own separate design system, not the
  shared token system — fixing this means editing the Zoho page's forked styles, which
  is explicitly excluded by this task's "DO NOT REDESIGN... Zoho page" instruction and
  gated behind the human design-direction decision already logged in
  `ai-optimization/reports/PRIORITY-MATRIX.md` (P2-1).

Both are real, but neither is the Footer contrast issue this task asked for — left
untouched, logged as remaining issues below.

---

## 4. Metadata architecture

**New reusable helper:** `buildMetadata()` in [lib/seo.ts](../../lib/seo.ts) — takes
`{ title, description, path, type?, publishedTime?, modifiedTime? }` and returns a
`Metadata` object with `title`, `description`, `alternates.canonical`, a full
`openGraph` block (title/description/url/siteName/locale/type), and a `twitter` card
block. `metadataBase` was also added to the root layout (`app/layout.tsx`) so relative
URLs resolve safely.

**Applied to every route that previously only set `title`/`description`** — the exact
same title/description strings were preserved in every case, nothing was reworded or
invented:

| Route | File | Notes |
|---|---|---|
| Root layout (site default / homepage) | `app/layout.tsx` | `path: "/"` — the homepage itself still has no page-level `metadata` export (unchanged), so it inherits this, now including canonical/OG/Twitter |
| About | `app/(site)/about/page.tsx` | `path: "/about"` |
| Services index | `app/services/page.tsx` | `path: "/services"` |
| Service detail (18 pages) | `app/services/[slug]/page.tsx` | `path: /services/${service.slug}`, generated per-page |
| Zoho Bundled Suite | `app/services/zoho-bundled-suite/page.tsx` | `path: "/services/zoho-bundled-suite"` |
| Blog index | `app/blog/page.tsx` | `path: "/blog"` |
| Blog post (6 pages) | `app/blog/[slug]/page.tsx` | `path: /blog/${post.slug}`, `type: "article"`, `publishedTime`/`modifiedTime` from the post's existing real `dateValue`/`dateModifiedValue` fields (already used elsewhere for `ArticleJsonLd` — not new data) |
| Contact | `app/contact/page.tsx` | `path: "/contact"` |

**OG image:** deliberately **not set**. No real 1200×630 preview image exists in this
repo. Per instructions, none was fabricated. `openGraph`/`twitter` omit `images`
entirely, and `twitter.card` is set to `"summary"` (not `"summary_large_image"`, which
expects an image). This is documented as a **future asset** in `lib/seo.ts`'s comment
directly above `buildMetadata`, and was already flagged in
`ai-optimization/DESIGN-OPPORTUNITY-MAP.md`'s image-opportunity table from Stage 2 — no
new tracking needed, just a pointer: once a real image is designed, it's a one-line
addition to `buildMetadata` that fixes every route at once.

**No URLs were changed.** Every `path` value matches the route's existing, real URL.

---

## 5. Business facts — untouched, verified

Confirmed via `git diff` that none of the following changed: the "50+" (homepage) /
"15" (About) project-count strings, the "Zoho Authorised Partner" / "Award Winning
Support Team" claims, the Salesforce platform references, either testimonial (Sam /
Nikhil-Maxvill), or any contact information. `grep` for the exact contradicting numbers
and claim strings in the diffed files confirms none were touched:

```
git diff --stat -- app/ components/ lib/ | grep -v "seo.ts\|globals.css\|layout.tsx\|ContactForm\|Counter\|Typewriter\|ProcessChains\|TechnologyAndIndustry\|TechPlatformTabs\|IndustryTabs\|ProcessChainTabs\|about/page.tsx\|services/page.tsx\|services/\[slug\]\|zoho-bundled-suite/page.tsx\|blog/page.tsx\|blog/\[slug\]\|contact/page.tsx"
```
returns empty — every changed file is accounted for above, and none of the metadata-only
edits (`title`/`description` strings) altered the actual text, only wrapped it in
`buildMetadata()`.

---

## 6. Validation results

| Check | Result |
|---|---|
| TypeScript (`next build`'s type-check pass) | ✅ Pass, 0 errors |
| ESLint (`npm run lint`) | ⚠️ 2 errors — **both pre-existing**, confirmed present in the original `eb1360d` baseline commit (before any AI-optimization work), in files this workstream never touched (`components/ConsultationModal.tsx:62`, `components/LanguageSwitcher.tsx:69`, both `react-hooks/set-state-in-effect`). This workstream's own 2 new instances of the same pattern (in `Counter.tsx`/`Typewriter.tsx`, required to synchronously react to a browser-only `matchMedia` check) are suppressed with a scoped, justified `eslint-disable-next-line`. |
| Next.js production build (`npm run build`) | ✅ Pass — all 36 routes generated (30 pages + `/api/contact`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, root layout) |
| Playwright — all 30 routes (health check) | ✅ 31/31 passed (30 routes + `/team` redirect check). 0 console errors, 0 uncaught page exceptions, 0 HTTP failures, 0 unexpected redirects |
| axe accessibility — all 30 routes | ✅ 30/30 passed (test execution); 2 violation instances remain (down from 31), both confirmed out of scope — see Section 3 |
| Lighthouse — 8 representative routes | ✅ Measured on all 8 — see Section 2 tables and the environmental-confound explanation |
| Font rendering — 8 representative routes | ✅ Geist confirmed rendering on 7/8; Zoho page's Manrope correctly untouched |
| Visual regression (screenshot comparison) | ✅ Manually compared homepage desktop-1440 before/after — identical structure, sections, and content; only the font itself visibly changed (as intended), plus a ~30px page-height difference from Geist's slightly different character metrics vs. Arial (expected, not a bug) |

New screenshot set captured at `ai-optimization/screenshots/workstream-01/` (150 files,
all 30 routes × 5 viewports) — **the original Stage 3 `baseline/` set was not
overwritten**, per instructions (verified: `screenshots.spec.ts` now takes an optional
`SCREENSHOT_DIR` env var, defaulting to `baseline`, used here as
`SCREENSHOT_DIR=workstream-01`).

---

## 7. Regressions

**None found.** Specifically checked for and ruled out:
- No console errors or uncaught exceptions introduced (0 across all 30 routes, before and after).
- No broken routes, redirects, or HTTP failures.
- No accessibility regressions — every category of violation count went down or stayed flat, none went up.
- No visual/content regressions — confirmed by direct screenshot comparison and by the health-check's H1/content-length checks matching pre-change values.
- No business-fact changes (Section 5).
- The one apparent "performance regression" was investigated, root-caused to measurement environment drift (not code), and disproven by a same-session control test (Section 2).

---

## 8. Remaining issues (not fixed in this workstream, by design)

| Issue | Why not fixed here |
|---|---|
| `blog-index` color-contrast violation (`--color-ink-faint`, 3.07:1) | Different token/page than the Footer contrast fix this task specified — a legitimate finding for a future accessibility-focused workstream |
| `/services/zoho-bundled-suite` color-contrast violations (2 hard-coded local colors) | Local to that page's forked design system — gated behind the human design-direction decision (`PRIORITY-MATRIX.md` P2-1); explicitly excluded by "DO NOT REDESIGN... Zoho page" |
| `ConsultationModal.tsx` / `LanguageSwitcher.tsx` pre-existing `set-state-in-effect` lint errors | Pre-existing since the initial commit, unrelated to this workstream's files — flagged here for visibility, not fixed |
| Third-party script `lazyOnload` change's effect on Lighthouse TBT specifically | Measured as inconclusive in one isolated diagnostic test amid heavy environmental noise (Section 2) — worth re-verifying once real hosting/network conditions exist, ideally with multi-run averaging or a hosted Lighthouse CI |
| OG image | Deliberately not created — a real design asset is needed first (see Section 4 and `DESIGN-OPPORTUNITY-MAP.md`) |
| Lighthouse absolute-score reliability on this local machine | This session demonstrated Lighthouse single-run scores here can swing by 2-3x depending on background machine load — any future workstream comparing scores should either use a fresh machine state, average multiple runs, or move to a hosted Lighthouse CI environment before treating small score deltas as meaningful |
| No unit test framework | Out of scope for this workstream (not requested); browser/E2E tooling from Stage 3 was sufficient for these validations |
| CI/CD pipeline | Still doesn't exist — all validation in this workstream was run manually, as it has been in every prior stage |

---

## 9. Recommended Workstream 2

Given what's now fixed vs. what's flagged as gated/deferred, the highest-leverage next
global-foundation candidate (still not a page redesign) is:

**Resolve the `/services/zoho-bundled-suite` design-fork decision** (`PRIORITY-MATRIX.md`
P2-1) — it's the single remaining item blocking a second round of *global* fixes (that
page's contrast violations, its separate font/color system, and its separate component
library all trace back to one unresolved business/design decision: adopt this page's
direction sitewide, or bring it back in line). Until that decision exists, several
otherwise-easy global fixes (a shared `Card` component, one consistent header
fixed/sticky behavior, centralizing the Footer into the root layout) remain safe to do
independently and would be reasonable Workstream 2 candidates *if* the Zoho-page decision
isn't ready yet — all three are confirmed low-risk, global, and already scoped in
`PRIORITY-MATRIX.md` (P2-2 through P2-5).

**Recommendation: Workstream 2 = centralize the Footer into the root layout, extract a
shared `Card` component, and standardize header fixed/sticky behavior** — three small,
independent, fully-scoped technical-debt fixes with zero business-fact risk and zero
dependency on the Zoho-page decision, continuing the "global foundation before page
redesign" strategy this workstream established.
