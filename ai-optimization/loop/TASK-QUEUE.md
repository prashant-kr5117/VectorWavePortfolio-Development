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
**Status:** Open — blocks all other tasks below from being *executed* (they can still be
queued/prioritized).

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
**Status:** Open, blocked on Q-001.

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
**Status:** Open (blog-index half), Blocked on Q-004 (zoho-bundled-suite half).

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
**Status:** Open — needs a fresh audit iteration before an implementation iteration.

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
**Status:** Open — needs a fresh audit iteration.

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
**Status:** Open.

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
