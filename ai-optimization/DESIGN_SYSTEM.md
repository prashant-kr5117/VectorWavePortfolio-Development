# Design System

Two sections: **CURRENT SYSTEM** (verified directly against the live source code, not
just the audit) and **TARGET SYSTEM** (descriptive direction only — not implemented).

---

## CURRENT SYSTEM

Source of truth: `app/globals.css` (verified 2026-08-20). Where the audit and the code
disagreed, the code wins, per the instructions for this task — no disagreements were
found; the audit's Section 5 findings are confirmed accurate below.

### Colors

| Token | Value | Used for |
|---|---|---|
| `--color-ink` | `#0b1b33` | Primary text |
| `--color-ink-soft` | `#33405c` | Secondary text |
| `--color-ink-muted` | `#55607a` | Muted text |
| `--color-ink-faint` | `#8a93a8` | Faint text |
| `--color-ink-faint-2` | `#93a0bd` | Faint text (variant) |
| `--color-link-deep` | `#0c447c` | Deep link color |
| `--color-surface` | `#ffffff` | Primary background |
| `--color-surface-alt` | `#f8fafc` | Alternate background |
| `--color-surface-chip` | `#eff4fe` | Chip/pill backgrounds |
| `--color-border` | `#e4e8f0` | Card/section borders |
| `--color-border-soft` | `#c7ceda` | Softer borders |
| `--color-ink-inverse` | `#0b1b33` | Fixed dark panels (Footer, CTA, Innovation, icon badges, Process circles) |
| `--color-ink-inverse-alt` | `#23324f` | Alt dark panel tone |
| `--color-on-inverse` | `#ffffff` | Text on dark panels |
| `--color-on-inverse-muted` | `#93a0bd` | Muted text on dark panels |
| `--color-on-inverse-faint` | `#6b7690` | Faint text on dark panels |
| `--color-on-inverse-border` | `#33405c` | Borders on dark panels |
| **`--color-accent`** | **`#30b6cd`** (teal/cyan) | **The real, live primary CTA color — every "Book a call" button** |
| `--color-accent-hover` | `#2aa0b4` | Accent hover state |
| `--color-primary` | `#1d4ed8` (blue) | Links, icon accents |

Source: [globals.css:7-34](../app/globals.css#L7-L34)

**⚠️ Contradicted internal doc:** `PROJECT_CONTEXT.md` states the primary CTA color is
orange (`#F97316`). There is no orange anywhere in the live design system or any
component. The live accent is teal `#30b6cd`. Treat `PROJECT_CONTEXT.md` as stale on this
point — this file and the live CSS are authoritative.

**No dedicated error/success color token exists.** The one live form-validation error
message on the site uses a generic red not part of this token system.

**Token re-typing risk:** the accent teal (`#30b6cd`) is hard-coded as a raw value
(rather than referencing the token) in at least three separate files — a latent risk if
the brand color changes; those spots won't update automatically.

### Typography

- Font loading: `next/font/google`, Geist Sans + Geist Mono, loaded site-wide and
  exposed as `--font-sans` / `--font-mono` in the `@theme inline` block
  ([globals.css:58-59](../app/globals.css#L58-L59)).
- **⚠️ Confirmed bug:** `body { font-family: Arial, Helvetica, sans-serif; }` at
  [globals.css:69](../app/globals.css#L69) overrides Geist for effectively all text on
  the site. No component was found referencing the Geist CSS variable directly. The site
  downloads Geist over the network but almost certainly renders Arial/Helvetica instead —
  both a performance cost (wasted download) and a design-fidelity problem.
- `/services/zoho-bundled-suite` loads two **additional** font families (Inter, Manrope)
  independent of the site-wide Geist setup — see "Forked design system" below.
- Heading size drift: blog post pages (`/blog/[slug]`) use a smaller H1 on mobile than
  every other page's main heading.

### Layout

- Container widths: the site generally uses Tailwind's standard `max-w-5xl` /
  `max-w-6xl` / `max-w-7xl` utilities, applied per-section rather than through one shared
  container component.
- **⚠️ Confirmed inconsistency:** the About page mixes `max-w-5xl` and `max-w-6xl` across
  adjacent sections with no evident content-based reason —
  [app/(site)/about/page.tsx:180, 204, 228, 252, 332, 359](<../app/(site)/about/page.tsx#L180>).
- Breakpoints: standard Tailwind v4 defaults (mobile-first); no custom breakpoint scale
  found in `globals.css`'s `@theme` block.
- Grids: card grids scale 1 column (mobile) → 2 (tablet) → 3–5 (desktop) depending on
  section item count — consistent pattern across services/blog/industries grids.
- Header positioning is **inconsistent by page**: `fixed` on the homepage only, `sticky`
  everywhere else —
  [components/Header.tsx:42-44](../components/Header.tsx#L42-L44):
  ```
  isHome ? "fixed left-0 right-0 top-0" : "sticky top-0"
  ```
- Footer is **not** centralized in the root layout. Confirmed: 8 separate page files each
  individually import and render `<Footer />` (`app/(site)/page.tsx`,
  `app/(site)/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`,
  `app/services/zoho-bundled-suite/page.tsx`, `app/blog/page.tsx`,
  `app/blog/[slug]/page.tsx`, `app/contact/page.tsx`). A new page that forgets this line
  will silently ship without a footer.

### Components

Verified present in `components/`: `Header`, `Footer`, `ConsultationModal`,
`BookConsultationButton`, `ContactForm`, `Reveal` (scroll-reveal wrapper), `Counter`,
`EcosystemOrbit`, `Typewriter`, `LanguageSwitcher`, `ServiceIcon`, `PlatformLogo`,
`BlogGrid`, `BlogIcon`, `HoverGlow`, plus JSON-LD structured-data components
(`JsonLd`, `ArticleJsonLd`, `ServiceJsonLd`) and a `sections/` subfolder for page
sections (Hero, Services, ProcessChains, TechnologyAndIndustry, WhyVectorWave, etc.).

- **Header / navigation:** desktop mega-menu style services dropdown; genuinely
  redesigns itself for mobile into a nested expandable menu (platform → services) rather
  than just shrinking — a real strength. Header contact info (phone/email/social) is
  hidden on mobile and **not** duplicated in the mobile menu, making it unreachable
  without scrolling to the footer or visiting `/contact`.
- **Footer:** dark inverse-panel styling (`--color-ink-inverse`); rendered per-page, not
  centrally (see Layout above).
- **Buttons:** primary CTA styling consistently uses `--color-accent`; a `.btn-shine`
  hover sweep effect exists as a shared utility class
  ([globals.css:190-208](../app/globals.css#L190-L208)).
- **Cards:** the rounded-corner/border/hover-lift visual pattern is reused consistently
  across ~12 sections, but is copy-pasted styling in each file rather than one shared
  `Card` component — a maintenance fragility, not a visual inconsistency today.
- **Forms:** native browser validation only, no form or schema validation library.
  Contact form is shared between the standalone `/contact` page and the consultation
  modal.
- **Hero:** per-page `Hero` components; the About page hero passes an invalid `preload`
  prop to `next/image` instead of the real `priority` prop, likely losing above-the-fold
  load priority.
- **Testimonials:** two testimonials on the homepage — one named+attributed with company
  (Nikhil/Maxvill, video), one attributed only to a first name and title with no company
  ("Sam, Founder & CEO").
- **FAQ / Tabs / Accordions:** two separate tab-interface implementations exist (one
  homepage, one on the Zoho page), each with different and each individually incomplete
  screen-reader accessibility patterns.
- **CTA sections:** dark inverse-panel sections consistent with Footer/Innovation
  styling.
- **Breadcrumbs:** structured data includes Breadcrumb schema (JSON-LD); visual
  breadcrumb UI presence not separately verified in this pass.
- **Modal (Book a Consultation):** the best-built component in the codebase —
  proper focus trap, Escape-to-close, focus restoration, background scroll lock.
  `LanguageSwitcher`'s dropdown does not share this same Escape-to-close behavior.

### ⚠️ Forked design system: `/services/zoho-bundled-suite`

Built from 23 of its own component files under
`app/services/zoho-bundled-suite/_components/`. Confirmed independent of the shared
system:
- Two different font families (Inter, Manrope) instead of Geist.
- ~15 hard-coded colors not referencing the shared tokens.
- Its own accent teal, visually close to but numerically different from
  `--color-accent` — close enough to look intentional, different enough to break a
  future global brand-color update.
- Its own button and card styling instead of the shared patterns.
- Does correctly reuse the shared popup/footer/animation components for *behavior*, and
  correctly labels its example scenarios "Illustrative implementation patterns — not
  case studies unless separately verified" (see `BRAND_GUIDELINES.md` Case Study
  Policy).

This is a real business decision, not just a bug: either this becomes the new brand
direction the rest of the site should converge toward, or it gets brought back in line
with the shared system. Not resolved by this governance layer — flagged for human
decision.

---

## TARGET SYSTEM (descriptive direction only — not implemented)

This section states what future optimization iterations should move the CURRENT system
toward. Nothing here has been built.

- **One token system, everywhere.** The `/services/zoho-bundled-suite` page's colors,
  fonts, and buttons should eventually resolve to the shared tokens above — either by
  updating the shared tokens to adopt what works from that page (a real brand decision
  for the business), or by migrating that page onto the existing tokens. Either
  direction is fine; having two live systems at once is not.
- **Geist should actually render.** The `body { font-family: Arial... }` override should
  be resolved so the fonts already being downloaded are the fonts actually shown —
  standard practice per `next/font` usage and confirmed as the single highest-leverage
  visual-identity fix in the audit (Section 17, item 1).
- **One shared `Card` component**, not copy-pasted styling across ~12 files — reduces
  risk without changing how anything currently looks.
- **One shared `Container`/max-width component** instead of ad hoc `max-w-*` choices per
  section, removing drift like the About page's mixed widths.
- **One consistent header behavior** (fixed or sticky, chosen once, applied everywhere)
  instead of the current homepage-only fixed/sticky split.
- **A real error/success color token**, added to the existing token system rather than a
  generic hard-coded red.
- **Footer centralized in the root layout**, removing the per-page landmine.
- **One "Book a call" mechanism**, not two competing ones (plain link vs. modal-opening
  button).

None of the above should be attempted in one sweeping change — see `SAFETY_RULES.md`
("Never make sweeping, multi-page changes in a single step") and
`EVALUATION_RUBRIC.md`'s scoped-iteration rule.
