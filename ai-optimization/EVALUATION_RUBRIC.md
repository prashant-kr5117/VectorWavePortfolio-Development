# Evaluation Rubric

A weighted 100-point scoring model for judging every future optimization iteration.
Weights are fixed; only the scores per iteration change. This is the same table used to
score `BASELINE.md` and every future round in `CHANGELOG.md`.

## Weighted categories

| Category | Points | Why this weight |
|---|---|---|
| Conversion / CRO | 14 | Directly drives the actual business outcome — leads. |
| Trust / Proof | 12 | Currently the weakest category (see `BASELINE.md`) — a lead-gen site lives or dies on credibility. |
| Content | 11 | Feeds both trust and search rankings; currently uneven in quality. |
| UX | 11 | How clear and frictionless navigation and interactions are. |
| Visual Design | 9 | Important, but a multiplier on the categories above, not a goal on its own. |
| SEO | 9 | Already a relative strength — the goal is to maintain it, not regress it. |
| Accessibility | 8 | Both an ethical baseline and a genuine usability improvement for everyone. |
| Mobile UX | 8 | Real gaps exist today (e.g. missing mobile contact info). |
| Brand Consistency | 7 | Currently hurt by the Zoho page's separate design system. |
| Performance | 6 | Strong foundation (static generation) already exists; smaller marginal gains available here. |
| Technical Quality | 5 | Weighted low deliberately — a broken build should block a change outright at the guardrail step, not just cost a few points. |
| **Total** | **100** | |

## Objective criteria per category

Every score must be backed by evidence — rendered screenshots, actual source code,
automated measurements, content analysis, accessibility checks, performance
measurements, SEO checks, or explicit business rules. **"Looks good = 90" is not a valid
score.**

### Conversion / CRO (14)
- Are CTAs clear, consistent, and not competing with each other on the page?
- Is there exactly one mechanism per action (e.g. one way "Book a call" behaves, not
  two)?
- Is proof placed near the claims/CTAs it supports?
- Evidence required: screenshot + CTA inventory per page.

### Trust / Proof (12)
- Is every trust claim on the page backed by an entry in `BUSINESS_FACTS.md`?
- Is the one real case study (Maxvill) used, and used honestly?
- Are any hypothetical examples correctly labeled per the Case Study Policy in
  `BRAND_GUIDELINES.md`?
- Evidence required: claim-by-claim cross-check against `BUSINESS_FACTS.md`.

### Content (11)
- Is copy specific to VectorWave's actual services, not generic filler?
- Are statistics/numbers internally consistent across pages (no repeat of the "50+ vs.
  15 projects" contradiction)?
- Evidence required: cross-page text diff/grep for the changed claim or copy.

### UX (11)
- Can a user complete the primary task (contact/book a call) without confusion?
- Are interactive patterns (modals, dropdowns, tabs) consistent in behavior across the
  site?
- Evidence required: manual interaction walkthrough or screenshot sequence.

### Visual Design (9)
- Does the page use only the CURRENT (or approved TARGET) tokens in `DESIGN_SYSTEM.md`,
  not new ad hoc colors/fonts?
- Evidence required: before/after screenshot + a check that no new hard-coded color/font
  was introduced outside the token system.

### SEO (9)
- Does every page keep a unique title/description and correct structured data?
- Evidence required: metadata diff, structured-data validation output.

### Accessibility (8)
- Automated check output (once tooling exists — see `README.md` Tool Availability) or,
  until then, a manual check against: labeled form fields, keyboard operability, focus
  management, `prefers-reduced-motion` support.
- Evidence required: accessibility check output or documented manual audit.

### Mobile UX (8)
- Does the change work correctly at standard mobile breakpoints?
- Evidence required: mobile-viewport screenshot.

### Brand Consistency (7)
- Does the change use the shared design tokens rather than introducing or reinforcing a
  second system (see the `/services/zoho-bundled-suite` fork in `DESIGN_SYSTEM.md`)?
- Evidence required: token audit of the changed files.

### Performance (6)
- Does the change avoid adding new render-blocking assets, new fonts, or new
  dependencies?
- Evidence required: build output size diff, or a Lighthouse score once that tooling
  exists.

### Technical Quality (5)
- Does the code build and type-check cleanly?
- Evidence required: `npm run build` / type-check output (pass/fail is close to binary
  here, which is why this category is weighted low relative to the guardrail step below).

## Score rules

1. Every optimization must have a specific, stated objective.
2. Prefer global/system fixes (e.g. a shared token or component change) when they
   improve multiple pages at once, over one-off page edits.
3. One scoped optimization objective per iteration — no bundling.
4. Do not make unrelated changes during an iteration.
5. A change must improve its target category without creating serious regressions in
   any other category.
6. **Build failures reject the iteration.**
7. **Broken routes reject the iteration.**
8. **Broken navigation rejects the iteration.**
9. **Broken forms reject the iteration.**
10. **Serious accessibility regression rejects the iteration.**
11. **Serious performance regression rejects the iteration.**
12. Business claims cannot be changed automatically — must go through
    `BUSINESS_FACTS.md` update + human approval first.
13. URLs cannot be changed without a corresponding redirect in the same change.
14. No fabricated case studies.
15. No fabricated testimonials.
16. No fabricated metrics.
17. No fabricated clients.
18. No random fonts/colors — only tokens defined in `DESIGN_SYSTEM.md` (current or
    approved target).
19. Do not add dependencies unless justified and explicitly approved.
20. Do not redesign the entire website in one iteration.

## Scoring flow

`BASELINE.md` → Iteration 1 → Iteration 2 → ... — each iteration's score is recorded in
`CHANGELOG.md` using this same weighted table, so drift or progress is visible over
time, not just as a single before/after snapshot.
