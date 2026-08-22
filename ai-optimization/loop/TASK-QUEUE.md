# Task Queue

The operational queue `CONTROLLER.md` Step 4 reads from directly. Unlike `ROADMAP.md`
(the higher-level map), every entry here must cite specific evidence — a report section,
a test result, a line reference — not a general impression. Required fields per entry:
**ID, Priority, Area, Problem, Evidence, Proposed solution, Risk, Business decision
required?, Status.**

**Maintenance rule:** before picking a task (`CONTROLLER.md` Step 4), check whether its
evidence is still current — a prior iteration may have already fixed it, or new evidence
may have downgraded/upgraded its priority. Update the entry (or close it) before working
from it. This queue is a snapshot as of 2026-08-21 (post-Workstream-5, pre-R-0-commit);
it will drift the moment any iteration runs, by design.

---

### Q-001
**Priority:** P0 (blocking — see `ROADMAP.md` R-0)
**Area:** Process / Git safety
**Problem:** 77 files are uncommitted across Workstreams 1-5; the loop's checkpoint model
requires a clean baseline `HEAD` to revert to.
**Evidence:** `git status --porcelain` (77 entries), `git log --oneline -5` (last real
commit `9b6ba44`, docs-only). `HUMAN-DECISIONS.md` H-1.
**Proposed solution:** Human reviews and commits the Workstream 1-5 changes (or specifies
what to discard first).
**Risk:** None to automate — this is explicitly a human action, not something the loop
performs.
**Business decision required?** No (process decision, not a factual claim) — but still
requires a human, since committing on someone's behalf without asking violates this
repo's own git-safety convention.
**Status:** Done — resolved 2026-08-21. Human committed the baseline as `af99005`
("feat: complete VectorWave optimization baseline", 351 files). See `HUMAN-DECISIONS.md`
H-1 resolution.

---

### Q-002
**Priority:** P0 (do immediately after Q-001 resolves)
**Area:** Measurement / scoring
**Problem:** `state.json.best_score` is still the pre-Workstream-1 Stage 2 baseline
(62.92) — five workstreams of real change happened since with no full rubric re-score.
**Evidence:** `ai-optimization/BASELINE.md` (original scores), `CHANGELOG.md` (5 logged
workstreams since), `ai-optimization/loop/ITERATION-PROTOCOL.md`'s scoring worksheet
(the method to use).
**Proposed solution:** Run a full 11-category `EVALUATION_RUBRIC.md` re-score against
the current (post-commit) state, using the evidence sources in the scoring worksheet.
Update `state.json.best_score`.
**Risk:** Low — this is measurement, not a website change. No revert path needed.
**Business decision required?** No.
**Status:** Done — resolved 2026-08-21. Full re-score against committed baseline
`af99005` complete: overall 62.92 → 76.37. See
`ai-optimization/reports/Q-002-FULL-RESCORE.md` for per-category evidence.

---

### Q-003
**Priority:** P1
**Area:** Accessibility (global)
**Problem:** 2 axe-core violations remain, unchanged since Workstream 1: `blog-index`'s
`color-contrast` (the `--color-ink-faint` token against its background), and
`service-zoho-bundled-suite`'s local hard-coded colors.
**Evidence:** `ai-optimization/testing/accessibility-results.json` (current, verified
2026-08-21 during Workstream 5's validation run — both violations still present, both
`serious` severity, 1 instance each).
**Proposed solution:** For `blog-index`: adjust the `--color-ink-faint` token (or its
usage on that route) to meet WCAG AA contrast — likely a global token change, so verify
it doesn't shift contrast elsewhere first. For `service-zoho-bundled-suite`: gated by
Q-004 (the design-fork decision) — fixing its local colors in isolation may be wasted
work if the fork gets resolved toward the shared token system anyway.
**Risk:** Low for the `blog-index` fix (single token, well-understood). The
`zoho-bundled-suite` fix should wait for Q-004.
**Business decision required?** No.
**Status:** blog-index half — Done, resolved by Iteration 001 (2026-08-21): darkened
`--color-ink-faint` to `#646f89`, verified 0 new violations sitewide. See
`ai-optimization/iterations/ITERATION-001.md`. zoho-bundled-suite half — still Blocked
on Q-004.

---

### Q-004
**Priority:** P1
**Area:** Brand consistency / architecture
**Problem:** `/services/zoho-bundled-suite` runs a fully separate design system (Inter/
Manrope fonts, near-black dark theme, a different accent teal) from the rest of the site.
**Evidence:** `DESIGN_SYSTEM.md` "Forked design system" section, `STAGE-2-BASELINE-REVIEW.md`
Step 4.
**Proposed solution:** Not automatable — requires a human decision on direction (adopt
the fork sitewide, or bring the page back in line). See `HUMAN-DECISIONS.md` H-10.
**Risk:** High if attempted without a decision — this is exactly the kind of "major
architectural change" `STOP-CONDITIONS.md` says the loop must not decide unilaterally.
**Business decision required?** Yes — major brand-direction decision.
**Status:** Blocked — human decision required (H-10).

---

### Q-005
**Priority:** P1
**Area:** Content / SEO — Blog
**Problem:** Blog has never been a dedicated workstream target. Known gaps from Stage 2:
`BlogPost.image` is declared in `lib/posts.ts` but always `undefined` (cards/posts never
render a photo), and blog post `<h1>` uses a smaller mobile size than every other page's
main heading.
**Evidence:** `STAGE-2-BASELINE-REVIEW.md` Step 8 (image gap), `DESIGN_SYSTEM.md`
Typography section ("Heading size drift: blog post pages use a smaller H1 on mobile").
**Proposed solution:** Needs a fresh, dedicated audit pass first (this queue entry is a
placeholder pointing at known Stage 2 findings, not a full current audit) — re-verify
both findings are still accurate before implementing, then scope as two separate small
iterations (image strategy is a content/asset decision per `BRAND_GUIDELINES.md`'s Image
Strategy; the heading-size fix is a pure CSS consistency fix).
**Risk:** Low for the heading-size fix. The image gap may hit `HUMAN-DECISIONS.md`
triggers if it requires sourcing real photography — evaluate per-post, don't batch-decide.
**Business decision required?** Possibly, per-post, if real photography is the chosen fix.
**Status:** Heading-size half — Done, resolved by Iteration 005 (2026-08-21): re-verified
against current code (`app/blog/[slug]/page.tsx:57` still had `text-[24px]` vs. every
other page's `text-[26px]`), fixed to match. Image-gap half — **re-scoped, stale
finding**: re-audited during Iteration 005 and found `BlogPost.image` is still an unused
field (`lib/posts.ts:15`), but the underlying visual gap it originally described no
longer exists — a later workstream (before this loop existed) already solved it with a
per-category icon treatment (`BlogGrid.tsx`'s `BlogIcon` component, not the `image`
field). This is no longer a Trust/Content gap needing a business decision on
photography; it's a harmless, low-priority dead-code cleanup (remove the unused
optional field, or wire it up if real photography is ever sourced later). Downgraded to
P3, not re-added as an active queue item — noted here so a future audit doesn't
rediscover it from scratch.

---

### Q-006
**Priority:** P1
**Area:** UX / Content — Contact page
**Problem:** Contact has never been a dedicated workstream target; no current audit
exists confirming its state post-Workstream-1/2's global changes.
**Evidence:** No workstream report covers Contact specifically — `WORKSTREAM-01/02-RESULT.md`
touched it only incidentally (e.g. Workstream 2's form-label consistency pass covered
`ContactForm.tsx` fields sitewide).
**Proposed solution:** A fresh audit iteration first (same pattern as Q-005) — check form
UX, mobile layout, and whether trust signals (address/phone/email, response-time
expectations) sit near the form itself, per `BRAND_GUIDELINES.md`'s "proof near the
claim" principle applied to conversion context.
**Risk:** Low for an audit. Implementation risk depends on findings.
**Business decision required?** Unlikely, unless findings surface an unverified claim.
**Status:** Done — resolved by Iteration 006 (2026-08-21). Audit found the form itself
solid (proper labels, loading/success/error states, stated response-time expectation)
and trust signals already sit next to the form (office-location card in the same grid
row). Real finding: the page stacked 3 competing contact mechanisms (header "Book a
call," the form, and a redundant bottom `<CTA />` band) — removed the redundant CTA
band from this page only. See `ai-optimization/iterations/ITERATION-006.md`.

---

### Q-015
**Priority:** P3
**Area:** Accessibility / Form UX — Contact page
**Problem:** `ContactForm.tsx`'s `firstName`/`lastName`/`email` inputs have no
`autocomplete` attribute (`given-name`/`family-name`/`email`).
**Evidence:** Direct code read during Iteration 006's Q-006 audit. Not caught by axe
(not part of its default violation set), which is why no prior workstream flagged it.
**Proposed solution:** Add the 3 corresponding `autocomplete` values — a WCAG 2.1 SC
1.3.5 best practice, also improves browser autofill convenience.
**Risk:** Low — attribute-only, no behavior change.
**Business decision required?** No.
**Status:** Done — resolved by Iteration 008 (2026-08-22). Added
`given-name`/`family-name`/`email` autocomplete values; verified via full 30-route
suite since `ContactForm` also renders inside the sitewide `ConsultationModal`. See
`ai-optimization/iterations/ITERATION-008.md`.

---

### Q-007
**Priority:** P2
**Area:** Visual design — Services
**Problem:** All 18 templated service pages within a platform show the identical
platform-level architecture diagram (`PlatformArchitectureFlow`) with no indication of
which stage that specific service occupies.
**Evidence:** `ai-optimization/reports/SERVICE-IMAGE-MAP.md`, "Explicitly NOT added, and
why" section — this was a deliberate, documented scope decision in Workstream 4, flagged
as a real future enhancement.
**Proposed solution:** Add an optional `highlight` prop to `PlatformArchitectureFlow`
(per-service, indicating which stage to visually emphasize) — a scoped, low-risk
component enhancement, not a new visual system.
**Risk:** Low — additive prop, backward-compatible, touches one shared component plus
19 call sites' data (not markup).
**Business decision required?** No.
**Status:** Open.

---

### Q-008
**Priority:** P2
**Area:** Visual design — About page
**Problem:** About page mixes `max-w-5xl` and `max-w-6xl` container widths across
adjacent sections with no evident content-based reason.
**Evidence:** `DESIGN_SYSTEM.md` Layout section, citing
`app/(site)/about/page.tsx:180,204,228,252,332,359` (line numbers as of the Stage 2
audit — re-verify current line numbers before implementing, since Workstream 5 edited
this file).
**Proposed solution:** Standardize to one width (whichever the majority of sections
already use), or build the `TARGET SYSTEM`'s planned shared `Container` component if that
decision has been made by then (see `DESIGN_SYSTEM.md` TARGET SYSTEM section).
**Risk:** Low — layout-only, no content change.
**Business decision required?** No.
**Status:** Open.

---

### Q-009
**Priority:** P2
**Area:** Content — About page
**Problem:** "Best Quality Designs" and "Best ROI Techniques" (About page "Why choose
us" list) are generic superlatives not backed by a specific, checkable claim.
**Evidence:** `ai-optimization/reports/TRUST-FACT-AUDIT.md` Section 3, "Not changed,
flagged only."
**Proposed solution:** Rewrite toward specific, evidence-free positioning language (e.g.
describing an actual practice rather than an unranked superlative) — same pattern already
used for "Award Winning Support Team" → "Dedicated, Hands-On Support" in Workstream 5.
**Risk:** Low — copy-only change, no claim requiring verification either before or after.
**Business decision required?** No.
**Status:** Done — resolved by Iteration 007 (2026-08-21). "Best Quality Designs" →
"Clean, Purposeful Design"; "Best ROI Techniques" → "ROI-Focused Delivery" — same
pattern as Workstream 5's "Award Winning Support Team" → "Dedicated, Hands-On Support"
already in this list. See `ai-optimization/iterations/ITERATION-007.md`.

---

## Blocked-on-human items (tracked here for completeness, not independently actionable)

| ID | Area | Blocked on | See |
|---|---|---|---|
| Q-010 | Maxvill case study asset | Client approval | `HUMAN-DECISIONS.md` H-9 |
| Q-011 | Real team photo caption/prominence | Human confirmation | `HUMAN-DECISIONS.md` H-7 |
| Q-012 | Leadership names/photos | Business input | `HUMAN-DECISIONS.md` H-8 |
| Q-013 | Second verified case study (Odoo/MS365) | New client becoming available | `ROADMAP.md` item 9 |
| Q-014 | Salesforce real capability | Business confirmation | `HUMAN-DECISIONS.md` H-4 |

These stay in the queue (not deleted) so a future evidence refresh doesn't rediscover
them from scratch — but `CONTROLLER.md` Step 4 must skip them until their blocking
condition clears.
