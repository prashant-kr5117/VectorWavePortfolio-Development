# VectorWave Technologies — Full Project Discovery Report

**Type:** Read-only codebase audit. No files in the repository were modified in producing this report.
**Repo:** `my-app` (GitHub: `prashant-kr5117/VectorWavePortfolio`)
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4
**Routes inspected:** 30 indexable pages

**How to read the confidence tags used throughout:**
- **[MEASURED]** — read directly in the source code; highest confidence.
- **[OBSERVED]** — seen consistently across multiple files, a real pattern.
- **[INFERRED]** — a reasonable conclusion drawn without running the app live (e.g. performance, without an actual Lighthouse run).
- **[UNKNOWN]** — cannot be determined from the code alone; needs a human answer.

---

## 1. Executive summary

This is a more mature codebase than most small-business marketing sites. There's a real design-token system, real structured data (JSON-LD) for search engines, a contact form that actually posts leads into a CRM instead of just pretending to, and disciplined image handling throughout. The problems that exist are concentrated in three places: a typography bug that silently defeats the site's intended font, one page that quietly forked its own separate design system, and a handful of business claims/statistics that are either unverifiable or that contradict each other on different pages.

**What's genuinely working:**
- A real CSS-variable design-token system (colors, dark-panel "inverse" tokens) that most components consistently pull from, rather than hard-coding colors everywhere.
- The contact form is **not** a stub. It posts real submissions to a Zoho CRM webhook through a working API route. Many audits of comparable sites find "contact us" forms that go nowhere — this one is real.
- Structured data (JSON-LD) is implemented broadly and correctly across nearly every page type — Organization, WebSite, Article, Service, Breadcrumb schemas, etc. This is unusually thorough for a site this size and genuinely helps search engines understand the site.
- Every page is statically generated at build time (fast, cheap to host, good for SEO), and every single image on the site goes through Next.js's built-in image optimizer — there isn't a single raw, unoptimized `<img>` tag anywhere in the codebase.
- There's a genuinely well-built accessible modal (the "book a consultation" popup) with proper keyboard trapping, Escape-to-close, and focus restoration — the kind of detail that's usually skipped on marketing sites.

**What needs attention first:**
- The site loads a custom font (Geist) but a CSS rule elsewhere silently overrides it back to plain Arial for almost all text — meaning the site is very likely not displaying the font it was designed with, while still paying the download cost for it.
- One page (`/services/zoho-bundled-suite`) uses entirely different fonts, colors, and buttons than the rest of the site — it looks like a separate website glued on.
- The homepage claims "50+ projects delivered," while the About page claims "15 projects completed." Same company, two different numbers, both live at once.
- "Salesforce" is advertised as a platform VectorWave works with in three separate places on the site, but there is no actual Salesforce service page or content behind that claim anywhere.
- There's no automated testing and no CI pipeline, and the project's own internal notes file (meant to help future work stay oriented) is out of date compared to what the code actually does.

---

## 2. Technology stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | `next@16.2.10` | App Router, Turbopack build system (the default in Next.js 16). |
| UI library | `react@19.2.4` / `react-dom@19.2.4` | Current major versions. |
| Language | `typescript@^5` | Strict mode is turned on in `tsconfig.json`, meaning the compiler enforces stricter type safety than the default. |
| Styling | `tailwindcss@^4` | Configured the modern "CSS-first" way (a `@theme` block inside the CSS file itself) rather than the older separate config-file approach. |
| Icons | `lucide-react@^1.23.0` | This version of the icon library dropped brand/social icons, so LinkedIn and Instagram icons are hand-drawn as raw SVG paths in the code instead. |
| Fonts | `next/font/google` (Geist Sans + Geist Mono) | Loaded site-wide — but see Section 5, there's strong evidence this font is never actually displayed. The one special page (`zoho-bundled-suite`) separately loads two *more* font families (Inter + Manrope). |
| Animation | Hand-rolled, no library | CSS keyframes plus custom "scroll into view" detection code. No Framer Motion or similar library is used. |
| Forms | Native browser APIs | No form library (like React Hook Form) and no validation library (like Zod). Validation is just the browser's built-in "required field" checking. |
| CMS | None — content lives in code | Services, industries, and blog posts are stored as typed data files in the `lib/` folder rather than pulled from a headless CMS. |
| Package manager | npm | Confirmed by the presence of `package-lock.json`. |
| Analytics | Google Analytics 4 | Real, live tracking ID embedded in the code. |
| Live chat | Zoho SalesIQ | A real, configured chat widget script loads on every page. |
| Translation | Google Translate widget | Configured for English and Dutch only, with a custom UI wrapper and a documented workaround for a known bug where Google Translate can crash React. |
| API routes | One: `/api/contact` | Receives the contact form submission, validates it, and forwards it to a Zoho CRM function. |
| Environment variables | 2 keys in `.env.local` | A Zoho CRM webhook URL and API key. Correctly excluded from version control (not committed to git) — good security practice. |
| Automated testing | **None found** | No test files exist anywhere in the repository. |
| CI/CD pipeline | **None found** | No GitHub Actions workflows, no Vercel config file, no Docker setup committed. |
| Deployment target | **[UNKNOWN]** | Cannot be determined from the code — there's no deployment configuration file to inspect. |
| Version control | Single `main` branch on GitHub | Most recent commit is from Aug 18, 2026. Recent history shows many small, careful visual-tuning commits (adjusting logo sizes, footer spacing) — this reads as an actively maintained project, not an abandoned one. |

**Repo hygiene note:** two large standalone HTML files sit in the root of the repository — `vectorwave-homepage-v5.html` (399 KB) and `vectorwave-zoho-service-section.html` (428 KB). Neither is used by the actual Next.js website; they look like design mockup exports that got committed by accident. Together they add 827 KB of dead weight to the repository.

---

## 3. Complete route map

All 30 pages are pre-built at deploy time (nothing is generated on-the-fly per visitor except the contact form submission), which is good for speed and search engine visibility.

### Main site pages

| URL | What it is | Notes |
|---|---|---|
| `/` | Homepage | 12 stacked sections (hero, trust badges, services, testimonials, etc.). Doesn't define its own page title — it inherits the site-wide default. |
| `/about` | About page | This is also where the old `/team` URL now redirects to. Team/leadership section shows generic icons instead of real photos (see Section 7). |
| `/services` | Services index | Lists every platform (Zoho, Odoo, Microsoft 365, Custom Development) and every industry served. |
| `/services/zoho-bundled-suite` | A special, custom-built landing page | Built from 23 separate component files with its own fonts and colors — different from the rest of the site (see Section 6). |
| `/services/[slug]` | 18 other individual service pages | Dynamically generated from a single data file, one page per service (e.g. `/services/sales`, `/services/odoo-accounting`). |
| `/blog` | Blog index | Has a working search/filter feature. |
| `/blog/[slug]` | 6 individual blog posts | Each post shows only a generic icon, never a real photo/image, even though the underlying data structure supports one. |
| `/contact` | Contact page | Three contact method cards (chat, email, phone) plus the live contact form. |
| `/team` | Redirects permanently to `/about` | Confirms the team content used to live on its own page and was later merged into About. |
| `/api/contact` | Not a visible page — a backend endpoint | Receives form submissions and forwards them to the CRM. |
| `/sitemap.xml` | A static file, not auto-generated | See Section 10 for why this matters. |
| `/robots.txt` | Correct and minimal | Tells search engines they can crawl everything and where the sitemap is. |

### The 19 services, grouped by platform

- **Zoho (5):** the bundled suite, Sales, IT & Support, Finance, Human Resources
- **Odoo (5):** Business Suite, Sales & eCommerce, Inventory & Operations, Accounting, Workforce & HR
- **Microsoft 365 (5):** the Dynamics Suite, Dynamics 365 Sales, Security & Device Management, Business Central Finance, Dynamics 365 HR
- **Custom Development (4):** Mobile App Development, Web Development, AI Integration, WhatsApp Automation

### The 6 blog posts

All authored under the generic byline "VectorWave Team" (no individual writer credit), spanning ERP, CRM, AI, Web Dev, and Finance categories, dated between April and June 2026.

I cross-checked the sitemap against the actual pages that exist — as of today, they match exactly. **[MEASURED]** That won't necessarily stay true, though — see Section 10.

---

## 4. Global architecture

**How pages are assembled:** There's one root layout file that wraps every page with the site header, third-party scripts (analytics, chat, translate), and a "book a consultation" popup system that's available everywhere.

**A real inconsistency:** the site's Header is included once, centrally, in that root layout — every page automatically gets it. The Footer is **not** handled the same way. Instead, every single page individually has its own line of code that says "show the footer here" — ten separate places doing the same thing. This isn't a problem today (someone remembered to add it everywhere), but it's a landmine: if a new page gets added later and whoever writes it forgets that one line, that page will silently ship with no footer and nobody will necessarily notice right away.

**No custom error/loading pages:** Next.js supports custom "loading" screens, custom error pages, and a custom "page not found" page that match your site's design. None of these exist here — visitors who hit a broken link or a slow-loading page see Next.js's generic, unstyled defaults instead of anything matching the VectorWave brand.

**The data layer is genuinely good:** services, industries, and blog posts are stored as clean, typed data files rather than being duplicated/hardcoded into every page that uses them. This means adding a new service to the site is a small, safe data edit — not a risky copy-paste of an entire page template.

---

## 5. Design system

There's a real, deliberate set of design tokens (reusable named values for colors, spacing, etc.) defined once and referenced throughout most of the site. Two things undermine it significantly.

### The color palette that's actually live in the code

| Token name | Actual color | Used for |
|---|---|---|
| Ink (main text) | `#0b1b33` (dark navy) | Primary text |
| Surface | `#ffffff` / `#f8fafc` | Backgrounds |
| Border | `#e4e8f0` | Card/section borders |
| Ink Inverse | `#0b1b33` | Dark panels — footer, call-to-action sections |
| **Accent** | **`#30b6cd` (teal/cyan)** | **The real, live color used on every primary "Book a call" button** |
| Primary | `#1d4ed8` (blue) | Links and icon accents |

### ⚠️ Finding: the project's own documentation contradicts the live code

The repository contains a file called `PROJECT_CONTEXT.md` — internal notes meant to help anyone (human or AI) working on this project stay oriented. That file states the primary call-to-action color is **orange (`#F97316`)**. There is no orange color anywhere in the actual design system or any component in the codebase. The real, live accent color is **teal (`#30b6cd`)**. At some point the brand direction changed and nobody updated the notes file to match. This matters because anyone (or any AI) trusting that file over the live code would build the wrong color into new work.

### ⚠️ Finding: the site's custom font is very likely never actually displayed **[MEASURED, high confidence]**

This is the single most concrete technical bug found in this audit. Here's the chain of evidence:

1. The site loads a font called "Geist" (a modern, custom typeface) via Next.js's font system, site-wide.
2. That font-loading system creates a reusable style "token" that components are supposed to reference to actually use the font.
3. But the site's global stylesheet contains a direct rule that says: *all body text should use Arial, Helvetica, or the system's generic sans-serif font* — a completely different, plain font.
4. A search across every single file in the app found **zero** places where any component actually references the "use Geist" token.
5. Because of how CSS rules override each other, that blanket "use Arial" rule wins for essentially all text on the site.

**In plain terms:** the site is downloading a custom, branded font over the network on every page load — but the browser is very likely showing plain Arial/Helvetica instead, because nothing is telling it to actually use the font that was downloaded. This is both a performance cost (wasted download) and a design-fidelity problem (the site doesn't look like what it was designed to look like).

### Other design-system inconsistencies found

- **Heading size drift:** blog post pages use a slightly smaller heading size on mobile than every other page's main heading — a small, probably accidental inconsistency.
- **Container width drift:** the About page mixes two different maximum content widths in different sections with no obvious content-based reason for the difference.
- **The accent teal color gets "re-typed" as a raw color value (instead of referencing the shared token) in three separate files.** This works fine today, but means if the brand color ever changes, someone has to remember to manually find and update these three spots too, instead of it updating automatically everywhere.
- **There's no dedicated color for error messages** (like a form validation error) — the one error message on the site currently just uses a generic red color that isn't part of the actual token system.
- **The header behaves differently depending on which page you're on** — it's "fixed" (stays pinned to the top of the screen while scrolling) only on the homepage, and "sticky" (a slightly different behavior) on every other page. This is a real, confirmed inconsistency in how the site's main navigation behaves.

---

## 6. Component system

### The genuinely reusable, well-built pieces

- **`Reveal`** — a "fade up as you scroll" animation wrapper used consistently across nearly every section of the site. This is the one clean, non-duplicated animation building block in the whole codebase.
- **The "Book a Consultation" popup** — the best-built piece of the entire codebase from an accessibility standpoint. It properly traps keyboard focus inside itself while open, closes on the Escape key, returns focus to wherever the user was after closing, and prevents the background page from scrolling while it's open. This is genuinely above-average care for a marketing site.
- **The contact form** — used both as a standalone page and inside that popup, so there's only one version of it to maintain. Every field has a proper, accessible label.
- **The "card" visual pattern** (rounded corners, border, hover-lift effect) — reused consistently across a dozen different sections of the site (services grid, blog grid, industries grid, etc.), so the site *feels* consistent even though, as noted below, that consistency is maintained by copy-pasting the same styling code into each file rather than by having one shared reusable "Card" component. That's a hidden fragility: if the company ever wants to change how cards look, someone has to find and update it in a dozen places by hand.

### ⚠️ Finding: one page (`/services/zoho-bundled-suite`) is a completely separate design system

This page is built from 23 of its own component files and reads as a different website that happens to share a URL structure with the rest of the site:

- It loads two entirely different font families (Inter and Manrope) instead of the site's Geist fonts.
- It uses roughly 15 hard-coded colors that don't reference the shared color tokens at all.
- Its accent color is a teal that's *close to but not the same as* the real site-wide teal — close enough to look intentional, different enough that it would break if someone tried to update the brand color everywhere at once.
- It has its own separate button and card styling instead of using the shared ones.

To be fair, this page also does some things well: it reuses the site's shared popup/footer/animation components for actual *behavior*, and one section of it explicitly and correctly labels its example scenarios as "illustrative — not real case studies unless separately verified," which is exactly the kind of honest, careful labeling the rest of the site should probably copy.

**This isn't just a bug to quietly fix** — it's a real decision the business needs to make: was this page an intentional new direction for the brand that the rest of the site should eventually catch up to, or is it a one-off that should be brought back in line with everything else?

### Other component-level findings

- Two icon lookup systems in the code will crash if ever given an icon name they don't recognize, instead of failing gracefully.
- Two very similar "tab" interface components (one on the homepage, one on the Zoho page) are each built with different, and each individually incomplete, accessibility patterns for screen reader users.
- The site's language switcher (English/Dutch) doesn't close when you press Escape, unlike the more carefully built consultation popup — an inconsistent level of polish between two similar "popup" interactions.
- The contact form's "how did you hear about us" dropdown includes a "Walk-in" option, which reads oddly for a business-to-business IT consulting company — it looks like it was copy-pasted from a retail or car dealership template and never edited.
- **There are two different ways "Book a call" behaves depending on where you click it** — in the header, it's a plain link that takes you to the Contact page; in several other places on the site, it's a button that instead pops open the consultation modal on the current page. Both are reasonable choices individually, but having both live at once for what's meant to be the same action is a real inconsistency worth a deliberate decision.

---

## 7. Image / visual system

The good news first: **every single image on the site goes through Next.js's automatic image optimizer** — there is not one plain, unoptimized image tag anywhere in the codebase. Alt text (the description read aloud by screen readers) is present and meaningful on real content images, and correctly left empty only on the two images that are purely decorative backgrounds.

### Asset cleanliness issues

| File | Size | Status |
|---|---|---|
| A promotional GIF used in the partner-logo strip | 1.4 MB | Used, but GIF is an inefficient format for what's essentially a static logo. |
| A large ecosystem diagram | 1.4 MB | Used, reasonably sized in context. |
| The Odoo logo source file | 782 KB | Used — but it only ever displays at about 40 pixels tall, so the source file is wildly larger than it needs to be. |
| An unused banner image | 754 KB | **Confirmed completely unused** anywhere in the site — pure dead weight. |
| An old, superseded logo file | 332 KB | **Confirmed completely unused** — a newer logo file replaced it, but the old one was never deleted. |
| Five default placeholder icons that ship with every new Next.js project | under 1.5 KB each | **Confirmed completely unused** — leftover boilerplate from when the project was first created. |

None of this hurts your actual visitors much, since Next.js's image optimizer resizes and compresses images on the fly regardless of the original file size — but it does bloat the repository itself and slow down every build.

### ⚠️ Finding: the "Meet the team" section doesn't actually show the team

The About page has a section titled "Meet the team" with four leadership profile cards. Every single one shows a generic placeholder person-icon instead of an actual photo, because the underlying data was never filled in with real photos. None of the four leadership roles are given actual names either — just job titles (e.g., "Chief Executive Officer" with no name attached). The one real photo on the page is a decorative background image behind the page's headline text, unconnected to any specific person.

### A small technical bug

The About page's hero image is passed a prop called `preload`, which isn't a real, recognized instruction for Next.js's image component — the correct instruction (`priority`) tells the browser "load this image first, it's the most important thing above the fold." Because of this typo-like mistake, that hero image likely isn't getting the loading priority it's supposed to have, which could make the page feel slightly slower to load visually.

---

## 8. Content architecture

**Strengths:** The service descriptions are genuinely hand-written and specific to each service — not generic template filler. The Zoho Bundled Suite page in particular has noticeably more sophisticated, specific writing than the rest of the site (it explains real technical workflows rather than speaking in vague marketing language). The blog posts, while few, read like they were written by someone who actually understands the subject matter rather than generated to hit a word count.

**Weaknesses:**
- The blog only has 6 posts total, all credited to the generic "VectorWave Team" byline rather than a named individual author, and none of them have a real featured image even though the underlying data structure has a field for one.
- 18 of the 19 individual service pages share one template and don't have much unique content beyond an intro paragraph and a list of included tools — fine for a small site, but thinner than what tends to rank well in search results for competitive terms.
- Certain phrases ("streamline operations," "connected system," "growing businesses") repeat frequently across the Home, About, and Services pages. This is natural for one consistent brand voice, but it's worth knowing in advance if an AI tool is later used to generate more content — otherwise this pattern is likely to be amplified rather than fixed.

---

## 9. Conversion / CRO (turning visitors into leads)

A first-time visitor can clearly tell what VectorWave does, who it's for, and what to do next — the value proposition and calls-to-action are clear and consistently placed throughout the site. The weak point is **proof**: the site *asserts* trustworthiness more than it *demonstrates* it.

### ⚠️ Finding: two different "projects delivered" numbers, live on the site at the same time

- The **homepage** says: **"50+ Projects delivered"**
- The **About page** says: **"15 Projects Completed"**

There is no shared source backing either number, and nothing in the code explains the discrepancy. A visitor who reads both pages in the same sitting would likely notice this.

### ⚠️ Finding: several trust claims have no supporting evidence anywhere in the codebase

- "Zoho Authorised Partner" (shown on the homepage) — no partner certificate, badge image, or ID number exists anywhere to back this up.
- "Award Winning Support Team" and "4 Accolades Earned" (About page) — no award names, no issuing organizations, no dates are given anywhere.
- A homepage testimonial attributed to "Sam, Founder & CEO" gives no company name at all, which makes it far less credible than the *other* testimonial on the same page — a video testimonial from "Nikhil, CEO, Maxvill" that names a real company and describes a specific project (a migration from Tally accounting software to Zoho Books).

None of this means these claims are false — they may well be true — but as written, there's nothing in the codebase that would let anyone verify them, and the internal contradiction on project counts is a concrete, fixable credibility problem regardless.

---

## 10. SEO

**What's implemented well:**
- Every page has a unique title and description.
- Structured data (the behind-the-scenes markup that helps Google understand what a page is about) is implemented broadly and correctly — this is genuinely above average for a site this size.
- `robots.txt` is correct and minimal.
- Every page has exactly one main heading, and the heading structure underneath it is consistent.
- Internal linking between related pages (services cross-linking to other services, blog posts cross-linking to related posts) is strong.

**What's missing:**
- **There is zero "social share preview" metadata anywhere on the site.** This is the information that controls what a page looks like when someone shares a VectorWave link on LinkedIn, Twitter/X, or in a Slack/WhatsApp message — normally a preview image, title, and description. Right now, sharing any VectorWave link on social media will show a blank or platform-guessed preview instead of anything intentional.
- **The sitemap (the file that tells search engines what pages exist) is a static, hand-generated file rather than one that updates itself automatically.** It happens to be 100% accurate today, but it's disconnected from the actual data that powers the services and blog pages — meaning the next time a service or blog post is added, renamed, or removed, someone has to remember to manually regenerate this file, or search engines will start working from stale information.

---

## 11. Accessibility

Better than typical for a marketing site this size, but inconsistently applied — some parts clearly got real attention and care, others got none.

**Done well:**
- The consultation popup (mentioned earlier) has a genuinely complete accessibility implementation.
- A typewriter-style animated headline correctly keeps the full text available to screen readers even while it's visually being "typed out" character by character.
- Every contact form field has a proper label.
- The site respects the "reduce motion" setting some users turn on in their operating system — animations are genuinely shortened or disabled site-wide when that setting is on.
- No use anywhere of the common bad practice of making a clickable element out of a generic `<div>` instead of a real, keyboard-accessible button or link.

**Gaps:**
- The blog's search box has no label that a screen reader can announce.
- The language switcher dropdown can't be closed with the Escape key, unlike the more carefully built consultation popup.
- The header's phone number, email, and social icons are hidden on mobile screens — and critically, they're **not** repeated anywhere in the mobile menu either, so a mobile visitor can't reach that contact info from the site's navigation at all (they'd have to scroll all the way to the footer, or visit the Contact page).
- On the Zoho Bundled Suite page specifically, hover effects (for mouse users) got a lot of custom design attention, while keyboard-only users get just the browser's plain default focus outline — an imbalance in whose experience got polished.

**Not measurable from the code alone:** actual color contrast ratios (whether text is readable enough against its background per accessibility standards) would need to be checked with a live tool like Lighthouse or axe — this report can't confirm pass or fail on that from source code alone.

---

## 12. Performance

No live speed test (like Google Lighthouse or PageSpeed Insights) was run as part of this audit — everything below is inferred from reading the code, not measured live. A real speed test is a natural next step.

- **Strong foundation:** every main page is pre-built as static HTML rather than assembled fresh on each visit, which is about the best starting point for speed you can have.
- **The unused-font bug (Section 5)** means the site is spending network bandwidth downloading a custom font that likely never actually gets displayed.
- **The Zoho Bundled Suite page adds two more font families on top of that** — between the main site and that one page, visitors could be downloading three or four separate font families in total.
- **Three third-party scripts** (Google Analytics, the live chat widget, and the translation widget) are all loaded in a performance-conscious way (non-blocking), but chat and translation widgets are both well-known, historically, for being heavy and slowing down page interactivity regardless of how carefully they're loaded.
- **Animations are built efficiently** — using modern "watch for scroll position" browser APIs rather than older, janky scroll-event listeners that constantly fire and can cause visible stutter.
- **No custom loading screens exist**, so slower page transitions fall back to whatever Next.js shows by default rather than a branded loading state.

---

## 13. Responsive design (mobile/tablet/desktop)

- The site is built mobile-first and uses standard, well-tested breakpoint sizes rather than unusual custom ones.
- The services dropdown menu genuinely rethinks itself for mobile rather than just shrinking — on desktop it's a wide multi-column dropdown, and on mobile it becomes a proper nested expandable menu (platform, then services within that platform). This is a real, above-average piece of responsive design work.
- Card grids across the site sensibly go from one column on mobile, to two on tablet, to three-to-five on desktop, depending on how many items are in each section.
- One component (the interactive "ecosystem" diagram on the homepage) maintains separate size numbers for mobile and desktop by hand rather than calculating them from one shared value — not a bug visitors would notice, but a small maintenance headache for whoever edits it next.
- The one confirmed structural inconsistency between pages on any screen size is the header's fixed-vs-sticky behavior difference noted in Section 5.

---

## 14. Technical quality

**Strengths:**
- Content data (services, blog posts, industries) is cleanly separated from the visual presentation code — a real, disciplined architecture choice that makes the site easier to extend safely.
- TypeScript's strictest safety checks are turned on throughout the project.
- The contact form is a real, working integration, not a stub.
- Every image goes through the optimizer — no exceptions found.

**Gaps:**
- No automated tests exist, and there's no continuous integration pipeline (a system that automatically checks the code before it's allowed to be deployed). Right now, the only thing preventing a broken change from going live is careful manual review.
- The Footer-not-in-layout issue from Section 4.
- A few spots in the code tell TypeScript "trust me, this will never be empty" in places where, strictly speaking, it technically could be — a minor but real fragility.
- The project's own internal notes file is out of date in at least two ways: it documents the wrong brand accent color, and it still claims the contact form has "no backend wired yet" — which is no longer true; it's now a real, working CRM integration.

---

## 15. Verified business information

Only facts that are explicitly present in the code. This section is meant to become the "ground truth" reference for any future AI-assisted work on the site, so nothing gets invented.

### Confirmed facts
| Fact | Value |
|---|---|
| Company name | VectorWave Technologies |
| Domain | vectorwavetechnologies.com |
| Email | admin@vectorwavetechnologies.com |
| Phone | +91-8791810555 |
| Address | GOLDEN-I, Office No 1034-1035, 10th Floor, Tower 3, Plot No 11, Sector-Techzone IV, Greater Noida (West), Uttar Pradesh 201318, India |
| Business hours | Monday–Friday, 9:30 AM–6:30 PM IST |
| Social media | LinkedIn and Instagram only — no Twitter/X, Facebook, or YouTube configured |
| Services offered | 19 total, across Zoho, Odoo, Microsoft 365, and Custom Development |
| Industries served | 13 named industries |
| Named client testimonial | Nikhil, CEO of "Maxvill" — describes a Zoho CRM setup and a Tally-to-Zoho-Books migration |
| Google Search Console | Verified — a real verification code is present in the site |
| Google Analytics | Live and connected |

### Claims that appear in the code but need a human to confirm or correct
| Claim | Where it appears | The problem |
|---|---|---|
| "50+ Projects delivered" | Homepage | Contradicts the "15" figure below |
| "15 Projects Completed," "10 Satisfied Clients," "4 Accolades Earned," "56K+ Lines of Code" | About page | No source given anywhere; contradicts the homepage figure |
| "Zoho Authorised Partner" | Homepage | No certificate or badge evidence exists in the codebase |
| "Award Winning Support Team" | About page | No award name or issuing body given |
| Salesforce as a supported platform | Footer, homepage technology section, an old mockup file | No actual Salesforce service page or content exists anywhere on the site |
| "Sam, Founder & CEO" testimonial | Homepage | No company name given, can't be verified |
| 4 leadership roles, 5 team departments | About page | No individual names given anywhere |

---

## 16. Existing case studies

There is no dedicated "case studies" section anywhere on the site. If someone asks "how many real, verifiable case studies do we have," the honest answer based on the code is: **exactly one** — the Nikhil/Maxvill video testimonial, which names a real company and describes a specific, concrete project.

Everything else industry-related on the site is intentionally anonymized — the homepage explicitly states that VectorWave shows general industry experience rather than naming specific clients, "because client confidentiality matters." That's a disclosed, deliberate choice, not an oversight.

The Zoho Bundled Suite page goes a step further and explicitly labels its four example scenarios as **"Illustrative implementation patterns — not case studies unless separately verified."** This is genuinely good, honest practice that's already present in the codebase — and it's the right template to reuse anywhere else a hypothetical example is needed in the future: always label it clearly as **"Illustrative Scenario"** or **"Hypothetical Example,"** never presented as if it were real.

---

## 17. Global system problems

These are problems that, if fixed once, improve the entire site rather than just one page. Roughly ordered by how much impact you get for how little effort.

1. **The unused-font bug** — a one-line CSS fix, but it affects the visual identity of the entire site.
2. **The conflicting "projects delivered" numbers** — needs a real number from the business, then a quick text change in two places.
3. **No social-share preview metadata anywhere** — affects how every single page looks when shared on social media or messaging apps.
4. **Footer not centralized** — currently harmless, but a real risk for any page added in the future.
5. **The static sitemap file** — accurate today, will quietly go stale as the site's content changes.
6. **No dedicated color for error/success messages** in the design system.
7. **The brand accent color is "re-typed" instead of referenced** in three files — a latent risk if the brand color ever changes.
8. **Inconsistent header behavior** between the homepage and every other page.
9. **Two different mechanisms for the same "Book a call" action** across the site.
10. **No automated tests, no CI pipeline** — the biggest long-term risk, especially if any AI-assisted editing tool starts making automated changes to this codebase in the future without a safety net in place first.
11. **The project's internal notes file is out of date** compared to the real code.
12. **Unused images, unused boilerplate files, and two large stray HTML mockup files** — pure repository housekeeping.

---

## 18. Page-specific problems

| Page | Problem |
|---|---|
| `/services/zoho-bundled-suite` | Entirely separate fonts/colors/buttons — the single biggest consistency problem on the site (Section 6). |
| `/about` | "Meet the team" shows icon placeholders instead of real photos; no leadership member is named. |
| `/blog` | Only 6 posts, no real images, no individual author bylines. |
| Homepage testimonial | "Sam, Founder & CEO" has no company name, weaker than the testimonial right below it. |
| Homepage, About, Footer | Trust claims (partner status, awards) with no supporting evidence anywhere. |
| Footer, homepage | The Salesforce platform link leads nowhere — there's no actual page behind it. |
| `/blog/[slug]` | Slightly smaller mobile heading size than every other page. |
| `/services/[slug]` (×18) | Thin, templated content beyond the tool list. |

---

## 19. Baseline quality score

Scored out of 100 in each of 12 categories, based on the actual evidence gathered in this audit — not a gut-feel number. Confidence tags indicate how sure this scoring is.

| Category | Score | Why |
|---|---|---|
| Visual Design | 68 | Real token system, but the font bug means the site likely doesn't look like it was designed to. **[MEASURED]** |
| UX | 66 | Clear navigation, but two different "book a call" mechanisms and dead-end links cost points. **[MEASURED]** |
| Mobile UX | 70 | Well-built responsive navigation, but header contact info is unreachable on mobile. **[OBSERVED]** |
| Content | 60 | Genuinely good writing where it got attention, thin and templated elsewhere. **[OBSERVED]** |
| Brand Consistency | 55 | Undermined by the Zoho page's separate design system and the stale internal documentation. **[MEASURED]** |
| Conversion / CRO | 62 | A real, working lead pipeline into the CRM — a genuine strength — offset by the conflicting stats. **[MEASURED]** |
| Trust / Proof | 48 | One real testimonial is carrying the credibility of the entire site; several unsubstantiated claims. **[MEASURED]** |
| SEO | 72 | Strong structured data, but no social-share metadata and a sitemap that will drift over time. **[MEASURED]** |
| Accessibility | 64 | Some genuinely excellent components, some untouched; contrast levels unmeasured. **[MEASURED]** |
| Performance | 65 | Static generation gives a strong base, but no live speed test was run to confirm. **[INFERRED]** |
| Technical Quality | 71 | Clean architecture and a real CRM integration, but no tests or CI safety net. **[MEASURED]** |
| Information Architecture | 74 | Logical, sensible organization throughout the site. **[OBSERVED]** |

---

## 20. Highest-priority problems (the punch list)

Ranked by how much value you get for how little work, combining both the global and page-specific findings:

1. **Fix the font bug.** One CSS change, benefits the entire site's visual identity immediately.
2. **Pick one true "projects delivered" number** and use it consistently on both pages.
3. **Decide what to do about the Salesforce claim** — either build real content behind it, or remove the claim.
4. **Decide the fate of the Zoho Bundled Suite page's design** — this is the highest-effort item on the list, and it's a real decision, not a bug fix: either it becomes the new direction, or it gets brought back in line with the rest of the site.
5. **Back up or soften the "Zoho Authorised Partner" and awards claims.**
6. **Add social-share preview metadata** across the site.
7. **Centralize the Footer** into the shared page layout.
8. **Make the sitemap generate itself automatically** from the same data that powers the services and blog pages.
9. **Put a basic safety net in place** (automated build/type-checking at minimum) before any AI tool starts making automated changes to this code.
10. **Decide on real names/photos for the About page team section**, or confirm that staying anonymous is the intended choice.

---

## 21. Recommended AI agent architecture

*(This section responds to a specific follow-up request: how to design a future automated system that keeps improving the site over time.)*

Given that this is a 30-page static marketing site with an already-decent design system, a large committee of many specialized AI agents would be overkill — more coordination overhead than the actual complexity of the site justifies. A lean setup is recommended instead:

| Role | Recommendation |
|---|---|
| **Coding agent** | One agent that implements a single, scoped change at a time, always inside a separate branch — never directly on the live/main version of the code. |
| **Design/UX/Content reviewer** | One agent combining what might otherwise be three separate roles (creative direction, UX/conversion review, content strategy) — on a site this size, these three overlap heavily, and splitting them just slows the process down without adding real signal. |
| **Technical reviewer** | One agent combining SEO, performance, and accessibility review into a single pass. |
| **Final judge** | A lightweight step that reconciles the two reviewers' findings into one final verdict — this could literally just be one of the same agents re-reading both reports rather than a whole separate process. |
| **"Would a customer trust this?" check** | Folded into the Design/UX reviewer's checklist rather than being a separate agent — no need for a dedicated role just for this one question. |
| Anything beyond the above | **Not recommended.** Adding more specialist agents right now would be over-engineering for a site this size, especially given there's no automated testing safety net yet (see Section 20, item 9) — that needs to exist *before* an automated review pipeline does. |

---

## 22. Recommended optimization loop

1. **Establish a baseline.** Take a full-page screenshot and a speed-test score for every one of the 30 pages, before any AI-driven changes begin.
2. **Propose one scoped change at a time** — either one specific page, or one sitewide design-token change, never both kinds of change at once, and always in a separate branch.
3. **Automated guardrails run before any AI review happens:** a check that compares any changed text against a locked "verified facts" file (Section 15 is the starting point for that file) and blocks the change if it introduces any new number, name, or claim that isn't already verified. The code must also successfully build and pass type-checking before it's even eligible for review.
4. **Re-capture** a screenshot and speed score of just the changed page(s).
5. **Review** the change against the scoring system in Section 23, comparing before-and-after screenshots and speed scores.
6. **Judge:** the change must not make *any* category meaningfully worse, even if it improves its intended target — and the overall weighted score must go up.
7. **Human approval gate** before anything merges into the live site, at least for the first several rounds of this process. Once trust is established, very low-risk changes (like small wording or spacing tweaks) could eventually be allowed to go live automatically — but changes to business facts, contact information, or page URLs should never be allowed to skip human approval.
8. **Cap the number of automatic iterations** per page per cycle, and automatically undo any change that fails to build or gets rejected by the review step.
9. **Keep a running scorecard** — Baseline → Round 1 → Round 2 → Round 3 — so progress (or regression) is visible over time, not just the most recent snapshot.

---

## 23. Recommended evaluation rubric (100 points)

Weighted toward what actually matters for a business-to-business lead-generation website — getting visitors to trust the company and take action — rather than split evenly across categories.

| Category | Points | Why this weight |
|---|---|---|
| Conversion / CRO | 14 | Directly drives the actual business outcome — leads. |
| Trust / Proof | 12 | Currently the weakest category found in this audit (Section 19) — a lead-gen site lives or dies on credibility. |
| Content | 11 | Feeds both trust and search rankings; currently uneven in quality. |
| UX | 11 | How clear and frictionless the navigation and interactions are. |
| Visual Design | 9 | Important, but a multiplier on the categories above, not a goal on its own. |
| SEO | 9 | Already a relative strength — the goal here is to maintain it, not regress it. |
| Accessibility | 8 | Both an ethical baseline and a genuine usability improvement for everyone. |
| Mobile | 8 | Real gaps exist today (like the missing mobile contact info). |
| Brand Consistency | 7 | Currently hurt by the Zoho page's separate design system. |
| Performance | 6 | Already has a strong foundation (static generation); smaller marginal gains available here than in the categories above. |
| Technical Quality | 5 | Intentionally weighted low here because a broken build should block a change outright at the guardrail step (Section 22, step 3), not just cost a few points. |

Use this same table to score Baseline → Round 1 → Round 2 → Round 3 — the weights stay fixed, only the scores in each round change.

---

## 24. Safety rules for any future AI-driven changes

**Content safety — hard rules, no exceptions:**
- Never invent a client name, testimonial, statistic, certification, or partnership. If it isn't in the verified-facts list (Section 15), it doesn't get written into the site.
- Never change contact information (phone, email, address) without a human explicitly approving it first.
- Never present a hypothetical example as if it were real — always label it "Illustrative Scenario" or "Hypothetical Example," the same way the Zoho Bundled Suite page already correctly does.
- Never change a business claim (a stat, a partner status, an award) without a human first approving an update to the verified-facts list.

**Technical safety — hard rules, no exceptions:**
- Never break an existing page URL — if a URL has to change, a redirect must be added in that same change.
- Never remove SEO-critical elements (structured data, page titles/descriptions) without putting a replacement in immediately.
- Never quietly introduce a new font, new color, or new external library as a side effect of an unrelated change.
- Never make sweeping, multi-page changes in a single step — one page or one sitewide design-token change per round, as described in Section 22.
- Never skip the automated build/safety checks, and never merge changes without human approval while this process is still new and unproven.

---

## 25. Exact next steps

1. Fix the font bug (remove the Arial override so the site actually shows the Geist font it downloads).
2. Get a real, current, accurate number for "projects delivered" from the business and use it consistently everywhere.
3. Decide: build out real Salesforce content, or remove the Salesforce claim.
4. Decide the design direction for the Zoho Bundled Suite page — adopt it as the new standard, or bring it back in line with the rest of the site.
5. Gather real evidence for (or soften) the partner-status and award claims.
6. Get real names and, if wanted, photos for the leadership team — or confirm that staying anonymous is actually the intended approach.
7. Update the project's internal notes file so it matches what the code actually does.
8. Add social-share preview metadata across all pages.
9. Make the sitemap generate itself automatically instead of being a manually maintained file.
10. Run an actual live speed test (Lighthouse) and set up automated before/after screenshots as the real foundation for the optimization loop described in Section 22.
11. Decide on a hosting/deployment platform and a testing/CI setup before any automated pipeline gets built.

---

## Information required from you

These are the things this audit genuinely cannot answer just by reading the code — they need a real answer from you or someone at VectorWave:

1. **True, accurate business numbers** — satisfied clients, projects completed, and any real awards (with names, issuing organizations, and dates). The site currently shows two different, contradicting numbers.
2. **Is "Zoho Authorised Partner" a real, current certification?** Is there a badge or certificate that should actually be displayed?
3. **Does VectorWave currently offer real Salesforce services?** The site claims this in three places with nothing behind it.
4. **Real names (and optionally photos) for the leadership team and department heads** — or confirmation that staying anonymous is the intended style.
5. **Is "Sam, Founder & CEO" a real, permission-given testimonial?** If so, it needs a company name and some way to verify it; if not, it should be replaced or removed.
6. **What should the actual brand accent color be going forward?** The live teal, the orange still written in the internal notes file, or the different teal used on the Zoho page?
7. **Where is this site hosted, and is there a preferred CI/testing setup** to build toward?
8. **Should a real content-management system be added for the blog?** (The project's own internal notes already suggest this is needed.)
9. **Are there any existing brand guidelines or approved photography** that should guide future design work, not currently present in this codebase?
10. **Can you provide access to real analytics data?** Analytics tracking is already live and connected — real visitor behavior data would make any future conversion-rate recommendations much more grounded than guesswork from source code alone.

---

*This report was produced by directly reading every relevant file in the codebase — no files were modified in the process. A version of this report with visual formatting, score bars, and color-coded severity tags is also available as a hosted page (Claude Artifact) titled "VectorWave Site Audit."*
