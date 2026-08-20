# Workstream 2 — Premium Global Design System: Result

**Date:** 2026-08-20
**Repo:** VectorWavePortfolio-Development (development repo, confirmed separate from
production)
**Scope:** Global design tokens, shared Header/Footer/Card/Button/Section-heading/Form
components, responsive/motion polish. No homepage or per-page content redesign, no Zoho
page changes, no business-fact changes.

---

## 1. Design system established

All new tokens live in `app/globals.css`, additive to the existing token set (nothing
removed, nothing renamed) unless noted:

| Addition | Purpose |
|---|---|
| `--color-success`, `--color-success-surface`, `--color-error`, `--color-error-surface` | Filled a documented gap — the one live error message previously used a raw, untokenized red. Now `text-error`/`bg-error-surface` etc. are real theme-generated utilities. |
| `--shadow-card`, `--shadow-card-hover` | Restrained, ink-tinted elevation replacing Tailwind's default `shadow-lg` (softer, tighter blur, cooler tone) — a deliberate "avoid excessive shadows" / enterprise-not-generic-SaaS decision. |
| `--shadow-control-focus` | Reserved for future form-control focus styling. |
| `--text-eyebrow`, `--text-h2`, `--text-h3`, `--text-body`, `--text-body-sm` (+ paired line-heights) | A documented type scale for the system going forward. **Not mass-retrofitted onto every existing page heading** — see "What was deliberately not done" below. |
| Global `:focus-visible` rule | One rule (`outline: 2px solid var(--color-primary); outline-offset: 2px;`) now covers every interactive element site-wide. Previously only 6 elements in the entire codebase had any custom focus styling (`ai-optimization/reports/RENDERED-BASELINE.md`). Only triggers on keyboard/programmatic focus, never on mouse/touch. |
| `@layer components`: `.section-eyebrow(--light/--inverse)`, `.section-heading`, `.section-description`, `.card`, `.card-interactive`, `.card-icon(--inverse)`, `.btn`, `.btn--md/--sm`, `.btn-primary`, `.btn-secondary`, `.btn-secondary-inverse`, `.btn-text`, `.form-label`, `.form-control`, `.form-error` | The reusable class vocabulary requested in Section 1 ("prefer reusable CSS variables/classes/components over page-specific hacks"). |

New components in `components/ui/`:
- **`Card.tsx`** — polymorphic (renders `<Link>` when `href` is given, `<div>`
  otherwise), with `padding`/`interactive`/`align` props. Replaces the ~14 near-identical
  inline card blocks Stage 2 found across 7 files.
- **`CardIcon`** — the repeated icon-badge slot (light or inverse tone).
- **`SectionHeading.tsx`** — the repeated eyebrow + heading + description pattern, with
  `tone` (light/inverse) and `align` props.

Border-radius and spacing values were **not** changed — the existing `rounded-xl`
(cards)/`rounded-lg` (controls/buttons)/`rounded-full` (pills) system was already
consistent; it's now formalized by construction (every card/button goes through one
component) rather than changed.

---

## 2. Header / navigation

| Fix | Detail |
|---|---|
| One consistent behavior sitewide | Was `fixed` on the homepage only, `sticky` everywhere else (a confirmed inconsistency, `STAGE-2-BASELINE-REVIEW.md`). Now `sticky` everywhere. `Hero.tsx`'s top padding was reduced from `pt-28/36` to `pt-14/20` to match — that larger padding existed specifically to clear a `fixed` header that didn't occupy document flow; a `sticky` header already pushes content down naturally, so the old padding would have doubled up. Verified visually (screenshot, Section 8). |
| Mobile contact info | Phone/email were previously only in the desktop-only top bar (`hidden lg:flex`), unreachable from the mobile menu — a confirmed gap (`PRIORITY-MATRIX.md` P2-8). Now duplicated into the mobile menu. |
| Keyboard-accessible dropdown | The desktop Services mega-menu opened on `onMouseEnter` only. Added `onFocus` (opens when Tab reaches it) and `onKeyDown` (Escape closes it) to the same wrapper that already had the `onBlur`-closes-on-focus-leave handler. |
| CTA consistency | "Book a call" (desktop + mobile) now uses `.btn .btn-primary .btn--sm` instead of a hand-written class string. |

**Navigation was not broken** — verified via the health-check spec (all 30 routes'
in-page navigation intact, 0 console errors) and manual screenshot review.

---

## 3. Footer

**Centralized** — moved from being individually imported and rendered by 8 separate page
files (`app/(site)/page.tsx`, `about/page.tsx`, `services/page.tsx`,
`services/[slug]/page.tsx`, `services/zoho-bundled-suite/page.tsx`, `blog/page.tsx`,
`blog/[slug]/page.tsx`, `contact/page.tsx`) into `app/layout.tsx`, rendered exactly once.
This was a confirmed technical-debt item (`PRIORITY-MATRIX.md` P2-4: "a new page that
forgets this line ships with no footer"). All 8 individual `import Footer` / `<Footer />`
lines were removed. Verified via `curl`'d raw HTML on the About page: exactly one
`<footer>` element, exactly one copyright string.

The Footer component itself was **not modified** — the WCAG-AA contrast fix from
Workstream 1 (`--color-on-inverse-faint`) is untouched and still applies.

---

## 4. Shared Card system

Applied `Card`/`CardIcon` (replacing hand-written duplicate card markup) at every
duplication site identified in Stage 2's card audit, plus a few more found while working:

| File | Card grid(s) converted |
|---|---|
| `components/sections/Services.tsx` (homepage) | 10-item service grid |
| `app/services/page.tsx` | Platform-services grid, "Comprehensive digital solutions" grid, industries grid (3 grids) |
| `app/services/[slug]/page.tsx` (18 pages) | "What's included" tools grid, "Other services" grid |
| `components/BlogGrid.tsx` | Regular post-card grid (featured card kept its bespoke two-column layout — a one-off, not a duplicated pattern) |
| `app/blog/[slug]/page.tsx` | "More on {category}" related-posts grid |
| `app/(site)/about/page.tsx` | "What we Provide" grid, leadership grid, departments list, "Our 6-D process" grid |
| `app/contact/page.tsx` | Contact-method grid, office-info panel (via the base `.card` class) |

**Not blindly componentized**: the homepage's `TrustBadges`, `PartnerLogos` marquee,
`ProcessChains`/`TechnologyAndIndustry` tab panels, `Testimonial`/`VideoTestimonial`, and
the Zoho Bundled Suite page's own component library were left untouched — none of these
are the "card" pattern Stage 2 identified (rounded border + padding + hover-lift); forcing
them into `Card` would have been exactly the "blindly componentize every div" the
instructions warned against.

Shadows are deliberately restrained (`--shadow-card`/`--shadow-card-hover`, Section 1) —
visually softer than the site's previous `shadow-lg` default, on purpose.

---

## 5. Button / CTA system

`.btn` + one of `.btn-primary` / `.btn-secondary` / `.btn-secondary-inverse` / `.btn-text`
+ a size (`.btn--md`/`.btn--sm`) now covers every CTA touched in this pass: Header
(desktop + mobile "Book a call"), `Hero.tsx` (both CTAs), `CTA.tsx` (the sitewide closing
CTA section, used on every page via that shared component), `ContactForm.tsx`'s submit
button. All states (default/hover/active/disabled) are defined once in `globals.css`
rather than per call-site. Focus is handled by the global `:focus-visible` rule (Section
1) rather than per-button focus classes.

**No new button animation was added** — the existing `.btn-shine` hover-sweep effect on
primary buttons was preserved (moved directly into `.btn-primary`'s definition rather
than duplicated per call-site).

---

## 6. Global section patterns

`SectionHeading` (eyebrow + heading + description, light or inverse tone) now backs the
section-intro pattern in: `Services.tsx`, all 3 grids in `services/page.tsx`, the "What's
included" heading in `services/[slug]/page.tsx`, and 4 sections on the About page ("What
we Provide", "Meet the team", "Our 6-D process", "Why choose us"). Bare eyebrow pills
(without a paired heading) were standardized to `.section-eyebrow` on the About, Services,
Contact, and blog-post hero sections.

**Pages were not forced into identical layouts** — each page keeps its own section order,
count, and content; only the *building blocks* (eyebrow style, heading weight/size,
description tone) are now shared.

Form controls: `.form-label`/`.form-control`/`.form-error` now back every field in
`ContactForm.tsx` (previously only the lead-source `<select>` had a properly associated
label, from Workstream 1) and the blog search input in `BlogGrid.tsx`, which also gained
a proper `<label>` (`sr-only`, paired via `htmlFor`/`id`) — it had none before, a gap
flagged back in `STAGE-2-BASELINE-REVIEW.md`.

---

## 7. Responsive design

Reviewed via the fixed screenshot infrastructure (Section 9) at all 5 target viewports
(1440, 1280, 1024, 768, 390) across all 30 routes. No global inconsistency found beyond
the Header fix in Section 2 — card grids already collapse sensibly (1 → 2 → 3-5 columns)
and continued to after switching to the `Card` component, since `Card` only changes
styling classes, not grid/breakpoint logic (untouched in every file).

---

## 8. Motion

No large animation was added. Changes were restrained and purposeful, matching
`MOTION_GUIDELINES.md`'s "what problem does this solve" test:
- The `.btn-primary` shine sweep was preserved, not expanded.
- `Card`'s hover state (`-translate-y-1` + shadow lift) is the same restrained lift the
  site already used everywhere — now guaranteed consistent instead of copy-pasted.
- The new `:focus-visible` outline has no transition/animation — it should appear
  instantly for keyboard users, not fade in.
- `prefers-reduced-motion` support (global CSS rule, and the `Typewriter`/`Counter` JS
  checks from Workstream 1) is untouched and still respected.

---

## 9. A significant infrastructure finding (not a website bug)

While spot-checking the About page, its full-page screenshot showed large blank gaps
where the "Meet the team," "6-D process," and "Why choose us" sections should be — this
looked like a serious rendering bug, and the *same* gap was present in the original Stage
3 baseline screenshot (predating any of this work), so it wasn't something Workstream 1
or 2 introduced.

**Root cause, confirmed:** `components/Reveal.tsx` uses an `IntersectionObserver` to fade
content in as a visitor scrolls (initial state: `opacity-0`). `e2e/screenshots.spec.ts`
took `fullPage` screenshots without ever scrolling the page, so the observer never fired
for below-the-fold content — it stayed invisible in the screenshot despite rendering
correctly for real visitors. Verified by manually scripting a scroll-through before
capturing: all content appeared exactly as expected.

**Fixed**: `e2e/screenshots.spec.ts` now scrolls through the full page height before
capturing (see the file for the exact implementation). This makes screenshots taken from
this point forward — including the workstream-02 set below — an accurate representation
of what a real visitor sees. Flagging this because it means the Stage 3 and Workstream 1
baseline screenshots likely have this same artifact on any page with substantial
below-the-fold `Reveal`-wrapped content; their other verification methods (health checks,
build, console errors) were unaffected, only the raw visual screenshots.

---

## 10. Zoho Bundled Suite page

**Not touched**, as instructed. Its own separate font/color/component system remains
exactly as it was. The only indirect interaction: it already imports and renders the
shared `Footer` and `ConsultationModal` components (confirmed before starting), which
still work correctly with the centralized-Footer change since removing its individual
`<Footer />` call (now rendered once, globally, in the root layout) applies there too —
verified via the health-check spec (`service-zoho-bundled-suite` route: 0 errors, correct
HTTP status).

---

## 11. Content / business facts

**Untouched.** No business claim, statistic, testimonial, award, partnership, or client
reference was added, removed, or reworded. `grep` for the locked contradicting figures
("50+", "15 Projects Completed", "Zoho Authorised Partner," "Salesforce," the Sam/Nikhil
testimonials) across every file this workstream touched shows they appear only inside
data structures and JSX that were structurally rearranged (wrapped in `Card`/
`SectionHeading`) — the text content itself is byte-identical to before.

---

## 12. Validation results

| Check | Result |
|---|---|
| TypeScript (`next build`) | ✅ Pass, 0 errors |
| ESLint | ✅ Pass — same 2 pre-existing errors as Workstream 1 (`ConsultationModal.tsx`, `LanguageSwitcher.tsx`, both untouched by this workstream), 0 new issues |
| Next.js production build | ✅ Pass — all 36 routes generated |
| Playwright health check (30 routes + redirect) | ✅ 31/31 passed — 0 console errors, 0 page errors, 0 HTTP failures, 0 unexpected redirects |
| axe accessibility (30 routes) | ✅ 30/30 passed (test execution); **2 violation instances remain, unchanged from Workstream 1** (`blog-index` and `service-zoho-bundled-suite` color-contrast — both confirmed out of scope for this workstream: different token, or the untouched Zoho page) — **0 new violations introduced** |
| Font rendering (8 representative routes) | ✅ Unchanged — Geist renders correctly everywhere except the (untouched) Zoho page |
| Lighthouse (8 representative routes) | ✅ Measured — see table below |
| Screenshots (all 30 routes × 5 viewports) | ✅ 150/150 captured, using the now-fixed scroll-through methodology (Section 9) |

### Lighthouse comparison (Workstream 1 → Workstream 2, same local-machine caveat as before)

| Route | Perf (WS1 → WS2) | Accessibility (WS1 → WS2) | SEO | Best Practices |
|---|---|---|---|---|
| Homepage | 29 → 26 | 100 → 100 | 100 → 100 | 77 → 77 |
| About | 40 → 42 | 100 → 100 | 100 → 100 | 77 → 77 |
| Services index | 41 → 46 | 100 → 100 | 100 → 100 | 77 → 77 |
| `/services/zoho-bundled-suite` | 33 → 39 | 95 → 95 | 100 → 100 | 77 → 77 |
| `/services/sales` | 34 → 48 | 100 → 100 | 100 → 100 | 77 → 77 |
| Blog index | 36 → 47 | 100 → 100 | 100 → 100 | 77 → 77 |
| Blog post (sample) | 41 → 49 | 100 → 100 | 100 → 100 | 77 → 77 |
| Contact | 39 → 47 | 100 → 100 | 100 → 100 | 77 → 77 |

**Same caveat as `WORKSTREAM-01-RESULT.md`**: these are single local runs on a shared
machine with demonstrated 2-3x run-to-run variance from background load, not a
controlled benchmark environment. Most routes show a *higher* Performance score this
round (likely just favorable timing, not attributable to any specific change — this pass
added CSS-only styling changes and component restructuring that doesn't materially change
JS payload size). Accessibility (Lighthouse's own DOM-based score, not a timing metric,
so not subject to the same noise) held at 100 everywhere it already was, and CLS/LCP were
not separately re-verified as improved or regressed beyond what's implied by the flat
Accessibility/SEO/Best-Practices scores — no regression signal anywhere.

---

## 13. Visual review (as a senior enterprise product designer)

Reviewing the workstream-02 screenshot set against the brief:

- **Does this look like a serious enterprise technology consultancy?** Closer than
  before. Consistent card borders/shadows/radii across every grid, a single restrained
  button language, and a header that behaves predictably read as more deliberate than the
  prior copy-pasted-per-file styling.
- **Premium without flashy?** Yes — the shadow change specifically (softer, ink-tinted,
  smaller blur than Tailwind's default `shadow-lg`) was a direct "avoid excessive
  shadows, avoid generic SaaS" decision, not a cosmetic tweak.
- **Does the header feel credible?** Yes — the fixed/sticky inconsistency was the most
  concrete "this site wasn't finished" signal a careful visitor could find; it's gone.
- **Does the CTA hierarchy feel professional?** Yes — one primary style, one secondary
  style, used consistently; no more hand-rolled variants per section.
- **Do cards feel designed rather than templated?** Meaningfully closer — same visual
  language, restrained shadow, consistent icon-badge treatment across services, blog,
  About, and contact.
- **Does mobile feel equally intentional?** Yes on the pages reviewed (homepage, About,
  services) — grids collapse cleanly, the mobile menu now actually carries the contact
  info the desktop version has.

**What still holds this back from "premium enterprise" fully**, honestly assessed and
deliberately **not** fixed here (belongs to later, explicitly-scoped workstreams): the
typography scale exists as tokens but wasn't retrofitted onto every existing heading size
(so some visual inconsistency in heading sizes across pages remains); the Trust/Proof
weaknesses from `BASELINE.md` are entirely unaddressed (this was a visual-system
workstream, not a content/proof workstream); the Zoho page's design fork is still a
visually jarring exception when a visitor navigates there from anywhere else on the site.

---

## 14. Regressions

**None found.** 0 console/page errors before and after (all 30 routes), 0 new
accessibility violations, 0 broken routes/redirects, build and type-check clean,
navigation confirmed intact via automated health checks and manual screenshot review, no
business-fact text changed.

---

## 15. What was deliberately not done (scope discipline)

- Existing page-specific heading *sizes* were not mass-changed to the new type-scale
  tokens — that's a visible, page-by-page change closer to "redesign" than "foundation,"
  reserved for a future, explicitly-scoped pass.
- `TrustBadges`, `PartnerLogos`, `ProcessChains`/`TechnologyAndIndustry` interactive
  panels, `Testimonial`/`VideoTestimonial`, and the homepage's overall structure/section
  order were not touched.
- The Zoho Bundled Suite page's own design was not touched.
- No image was added anywhere (see `WORKSTREAM-02-IMAGE-OPPORTUNITIES.md`).
- No business fact, claim, statistic, or testimonial was changed.
- Homepage redesign was not started, per explicit instruction to stop after this
  workstream.

---

## 16. Final recommendation

**Workstream 2 is complete and safe to review.** The global foundation (tokens, Header,
Footer, Card, Button, Section-heading, form-control systems) is now in place and applied
broadly enough that a future page-level redesign workstream can build on real, shared
primitives instead of more one-off styling. Recommended next step, in order:
1. Human review of this workstream (screenshots in `ai-optimization/screenshots/workstream-02/`).
2. Resolve the still-open Zoho Bundled Suite design-fork decision — it's now the single
   largest remaining visual inconsistency on the site, and several further global
   fixes (extending the type-scale tokens to real heading sizes, for instance) arguably
   should wait until that decision is made, so they can be applied consistently
   everywhere at once rather than twice.
3. Only after that: begin the actual homepage/page-level visual redesign workstream this
   task explicitly deferred.
