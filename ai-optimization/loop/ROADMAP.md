# Roadmap

This is a **starting point for reprioritization, not a fixed backlog.** Per this task's
own instruction, the controller must re-evaluate priority against live evidence
(`TASK-QUEUE.md`, current screenshots, current test results) every iteration, not work
through this list top-to-bottom blindly. Items here that turn out to already be resolved,
or turn out lower-priority than something the loop discovers later, should be
re-ranked or closed — see `TASK-QUEUE.md`'s maintenance rule.

**Important — this roadmap was written after inspecting the actual repository state,
not from the assumption embedded in this task's original prompt.** The prompt's own
"known remaining areas" list (Trust/proof, About, Team, Testimonials, Salesforce,
partner/award claims) describes work that **has already been implemented**, uncommitted,
in this working tree — Workstream 5, completed earlier in this session, before this
controller-setup task began. See `ai-optimization/reports/WORKSTREAM-05-RESULT.md`,
`TRUST-FACT-AUDIT.md`, and `TRUST-IMAGE-REQUIREMENTS.md`. This controller-setup task did
**not** redo or re-implement that work (per its own "do not perform Workstream 5"
instruction, which this respects by not touching it further) — it only inspected and
reported the current state, which already includes it.

---

## Blocking item (must resolve before iteration 1)

**R-0 — Commit the Workstream 1-5 baseline, then compute a fresh full rubric score.**
The working tree holds 77 uncommitted files from 5 workstreams that were never committed
(`HUMAN-DECISIONS.md` H-1). Until a human reviews and commits this baseline, the loop
cannot create its first checkpoint (`CONTROLLER.md` Step 7) or safely revert anything.
Once committed, the controller's first real action should be a full 11-category
`EVALUATION_RUBRIC.md` re-score (see `ITERATION-PROTOCOL.md`'s scoring worksheet) —
`state.json`'s `best_score` is currently still the pre-Workstream-1 Stage 2 baseline
(62.92), which is now stale given how much has changed since. This isn't optional
scaffolding — every later iteration's "did the score improve" question is meaningless
without an accurate current baseline first.

---

## Reprioritized candidates (post-Workstream-5 state)

Ranked by the priority tiers in `TASK-QUEUE.md`/`CONTROLLER.md` Section 3, based on what
the repository and reports actually show today — not the original static list.

### P1 — High

1. **`/services/zoho-bundled-suite` design-fork decision** (`HUMAN-DECISIONS.md` H-10) —
   the single largest remaining Brand Consistency (7pts) and Visual Design (9pts) risk:
   a full font/color/theme fork on one live route. This is a **human decision gate**, not
   an automatable task — the loop should surface it, not resolve it. Whatever direction
   is chosen unblocks real implementation work worth queuing afterward.
2. **Blog** — not touched by any workstream so far (Workstream 3's Stop Condition
   excluded it; Workstream 5's Stop Condition excluded it too). `STAGE-2-BASELINE-REVIEW.md`
   flagged missing featured images (`BlogPost.image` declared but always `undefined`) and
   a heading-size mobile inconsistency vs. every other page — real, unaudited-since-Stage-2
   gaps in a category (Content, 11pts; SEO, 9pts) that hasn't had a dedicated pass yet.
3. **Contact page** — same status as Blog: never a dedicated workstream target. Worth a
   fresh audit pass (form UX, mobile layout, trust signals near the form) before assuming
   it's fine.
4. **Global accessibility follow-through** — 2 known violations remain
   (`blog-index`'s `color-contrast`, `service-zoho-bundled-suite`'s local hard-coded
   colors), unchanged since Workstream 1. Low effort, directly fixes a named, specific
   gap (Accessibility, 8pts) that's been carried as "known, out of scope" for 4
   consecutive workstreams now — a good candidate for an early, low-risk first real
   iteration once R-0 is resolved.

### P2 — Medium

5. **Real Maxvill implementation asset** (`HUMAN-DECISIONS.md` H-9) — client-approval-gated,
   not implementable by the loop alone; queue as blocked until resolved.
6. **Real team photo prominence** (`HUMAN-DECISIONS.md` H-7) — human-confirmation-gated.
7. **About page container-width consistency** (`max-w-5xl` vs `max-w-6xl` — flagged since
   Stage 2, never fixed) — small, low-risk, Brand Consistency/Visual Design win.
8. **Remaining service-page visual refinement** — `SERVICE-IMAGE-MAP.md`'s documented,
   not-yet-implemented "future opportunity": an optional `highlight` prop on
   `PlatformArchitectureFlow` so each service page's diagram highlights which stage that
   specific service occupies, rather than showing the identical platform-level diagram
   19 times. Real, scoped, low-risk.
9. **Second verified case study** — gated entirely on the business (Odoo/Microsoft 365
   currently have zero case-study proof; only Zoho/Maxvill exists). Not automatable;
   queue as blocked pending a real client.
10. **"Best Quality Designs"/"Best ROI Techniques" superlatives** (About page) — flagged
    in `TRUST-FACT-AUDIT.md` Section 3 as soft, non-blocking puffery. A future content
    pass could tighten this toward more specific, evidence-free positioning language.

### P3 — Polish

11. **Footer centralization follow-through / header behavior** — already resolved
    (Workstream 2: Footer centralized in root layout, one consistent header behavior).
    Listed here only to confirm it's **closed**, not open — a future task-queue refresh
    should not re-flag it.
12. **Micro-interaction polish, spacing refinements** — no specific item identified yet;
    to be discovered via visual review during other iterations, not sought out
    proactively while P0/P1 items exist (Section 3's "never work on P3 while meaningful
    P0/P1 issues remain" rule).

---

## Items to explicitly NOT re-open

These were resolved by Workstreams 1-5 and should not reappear in a future task-queue
refresh unless new evidence contradicts the resolution:

- Font-override bug (Workstream 1) — Geist renders correctly.
- Third-party script loading / unnecessary client hydration (Workstream 1).
- Design token system, shared `Card`/`SectionHeading` components, header/footer
  consistency (Workstream 2).
- Homepage's unverified claims, TrustBadges/Innovation/"Sam" removal, Services
  restructure, Technology Ecosystem Visual, Case Study restructure (Workstream 3).
- Services architecture (7-part template), Odoo/Microsoft 365 content research, Services
  index restructure (Workstream 4).
- Footer/PartnerLogos/About-page Salesforce and unverified-claim removal, Leadership
  redesign (Workstream 5).

---

## How this roadmap gets consumed

`TASK-QUEUE.md` is the operational, evidence-backed version of this list — this document
is the higher-level map; the queue is what `CONTROLLER.md` Step 4 actually reads. When
this roadmap and the queue disagree (e.g. the queue has fresher evidence a roadmap item
is already done), **the queue wins** — update this roadmap to match, don't let it drift
stale.
