# Human Decisions — Pending and Resolved

A living log. The loop appends a new entry every time `CONTROLLER.md` Step 5 or
`STOP-CONDITIONS.md`'s halt conditions trigger a stop. A human resolves an item by
editing its **Status** and **Resolution** fields directly in this file — the loop reads
this file, never a side channel, so the resolution must live here to take effect.

**Trigger list** (from this task's brief — the loop must stop and log an item here, never
guess, whenever a task touches): unverified business claims, client names, testimonials,
awards, partnerships, certifications, project statistics, client logos,
copyright/licensing uncertainty, real employee/team photographs, major brand-direction
decisions, ambiguous factual information, destructive architecture changes, or
legal/compliance uncertainty.

---

## Open items

### H-1 — Working tree must be committed (or explicitly discarded) before the loop's first iteration

**Category:** Destructive architecture / process safety (git model)
**Raised:** 2026-08-21, during controller setup
**Status:** OPEN — blocks all loop iterations (`state.json.human_decision_required = true`)

The working tree currently holds **77 uncommitted files** spanning Workstreams 1-5 (the
last real commit is `9b6ba44`, a docs-only commit — "docs: define homepage master plan").
`CONTROLLER.md` Step 7's checkpoint model, and every REVERT path in `STOP-CONDITIONS.md`,
assume the loop's first checkpoint is a clean, human-reviewed `HEAD`. Right now that
isn't true: a `git reset --hard` at any point would discard five workstreams of
real, already-validated work, and the loop has no way to distinguish "its own" changes
from this pre-existing uncommitted work using git alone.

**Decision needed:** a human should review Workstreams 1-5's accumulated changes (see
`CHANGELOG.md` for the full list, `WORKSTREAM-01-RESULT.md` through `WORKSTREAM-05-RESULT.md`
for per-workstream detail) and either:
(a) commit them as a reviewed baseline (one commit or several, human's choice), or
(b) explicitly instruct that specific files/changes be discarded before the baseline commit.

**Resolution:** _(pending)_

---

### H-2 — Zoho Authorised Partner status

**Category:** Certification claim
**Raised:** Carried forward from `BUSINESS_FACTS.md` (original Stage 1 audit)
**Status:** OPEN, but not currently blocking — the unverified claim is already removed
from every location it appeared (Hero eyebrow, About page "Certified" language — see
`ai-optimization/reports/TRUST-FACT-AUDIT.md` Section 3). This entry exists so a future
iteration doesn't need to rediscover the question.

Does VectorWave hold a real, current Zoho partner certification? If yes, with what
credential ID/tier, and can it be displayed?

**Resolution:** _(pending — no action needed unless the business wants to reintroduce
this claim with evidence)_

---

### H-3 — Project count: "15+" figure

**Category:** Business statistic
**Raised:** Workstream 3 (2026-08-20)
**Status:** RESOLVED for the live site — a human supplied "15+ Projects Delivered" as the
verified figure (`WORKSTREAM-03-RESULT.md` Section 20), and it's now consistent
site-wide (Hero: "15+", About: "15"). **Still open:** `ai-optimization/BUSINESS_FACTS.md`
itself was never updated to reflect this resolution — it still documents the old
50+/15 contradiction as unresolved (flagged in `TRUST-FACT-AUDIT.md` Section 1).

**Resolution:** Live site resolved 2026-08-20. `BUSINESS_FACTS.md` governance-file update
still pending — low priority, doesn't block any loop iteration, but should be corrected
by whoever owns that file so future audits don't re-flag a already-solved problem.

---

### H-4 — Salesforce as a capability

**Category:** Platform/partnership claim
**Raised:** Original audit; last touched Workstream 5 (2026-08-21)
**Status:** RESOLVED for the live site (removed from all 4 remaining locations —
`ai-optimization/reports/TRUST-FACT-AUDIT.md` Section 2). **Underlying question still
open:** does VectorWave have a real, statable Salesforce capability worth building
service content for?

**Resolution:** Absence is the correct default until this is answered. If the business
confirms a real capability, a future iteration can add real Salesforce service content
(following the same pattern as the 19 existing services) — this is a P2 content-addition
task, not a P0/P1 fix, since nothing is currently broken by Salesforce's absence.

---

### H-5 — "Sam, Founder & CEO" testimonial

**Category:** Testimonial / client name
**Raised:** Original audit
**Status:** RESOLVED — removed (Workstream 3), confirmed still absent (Workstream 5).
Do not restore without a real company name and confirmed permission to use the quote.

**Resolution:** Stays removed unless a human supplies verification.

---

### H-6 — Shopify / React / NetSuite / Tally as "technology partners"

**Category:** Partnership claim
**Raised:** Original audit; resolved Workstream 5 (2026-08-21)
**Status:** RESOLVED — removed from `PartnerLogos.tsx` (`TRUST-FACT-AUDIT.md` Section 4).
Tally in particular directly contradicted the site's own Maxvill case study (which
describes migrating a client *away from* Tally).

**Resolution:** All 4 removed. Only Zoho/Odoo/Microsoft Dynamics 365 remain (verified
platforms with real service content).

---

### H-7 — Real team photo — caption and prominence

**Category:** Real employee/team photograph
**Raised:** Workstream 5 (2026-08-21), during the trust-image audit
**Status:** OPEN, non-blocking

`src/TeamImage.jpeg` — a real photo of 9 people in matching branded polo shirts, used
today as the About page's dimmed hero background (`alt=""`) — was found to be genuine,
not stock imagery, but is under-leveraged. Full detail:
`ai-optimization/reports/TRUST-IMAGE-REQUIREMENTS.md`.

**Decision needed:** (1) Confirm these are current VectorWave employees at the company's
own office. (2) If confirmed, decide whether to caption/feature it more prominently
(e.g. near "Meet the team") — this requires stating facts (who, where, when) that can't
be inferred from the file alone.

**Resolution:** _(pending)_

---

### H-8 — Leadership names and real photos

**Category:** Real employee photograph / personal information
**Raised:** Original audit; last touched Workstream 5
**Status:** OPEN, non-blocking (current treatment — role-only, icon-based cards — is the
correct interim state per `BRAND_GUIDELINES.md`, not a placeholder waiting on this)

Does the business want to name the 4 leadership roles individually and provide real
headshots? Current state (icon-badge cards, no names, no fabricated photos) is honest and
was reviewed as design-appropriate in Workstream 5 — this is a "would be nice," not a
defect.

**Resolution:** _(pending — no action needed unless the business supplies names/photos)_

---

### H-9 — Maxvill case study: real screenshot or diagram

**Category:** Client-approved asset / copyright
**Raised:** Workstream 5 (2026-08-21)
**Status:** OPEN, non-blocking

No real screenshot or workflow diagram of the actual Maxvill Zoho CRM/Books
implementation exists in the repo. A generic Zoho dashboard screenshot would risk
implying it depicts the real client project without being one — not created. Full
detail: `TRUST-IMAGE-REQUIREMENTS.md`.

**Decision needed:** Can the client (Maxvill/Nikhil) approve sharing a real screenshot or
process diagram of the actual implementation?

**Resolution:** _(pending)_

---

### H-10 — Brand accent color / light-vs-dark direction (`/services/zoho-bundled-suite` fork)

**Category:** Major brand-direction decision
**Raised:** Stage 2 (`DESIGN_SYSTEM.md`); still open
**Status:** OPEN, non-blocking but architecturally significant — flagged in
`STOP-CONDITIONS.md` as a "major architectural change" that the loop must not decide
unilaterally.

`/services/zoho-bundled-suite` runs its own font system (Inter/Manrope vs. sitewide
Geist), its own near-black dark theme, and its own accent teal (`#20C4D9` vs. the shared
`#30b6cd`) — a full design-system fork, not a minor drift. Resolving it requires deciding
either (a) this becomes the new sitewide brand direction, or (b) it gets brought back in
line with the shared system.

**Decision needed:** Which direction, or is the fork intentionally permanent (e.g. a
distinct sub-brand for this one flagship product)?

**Resolution:** _(pending — see `ROADMAP.md` item for how this gates several other
polish tasks)_

---

## Resolved items (kept for history — do not delete)

See H-3, H-4, H-5, H-6 above — each documents both the original question and its
resolution in one entry, since the resolution context matters for future audits.

---

## How to add a new item

Append a new `### H-<N>` section above "Resolved items," using the same 5-field
structure (Category, Raised, Status, the decision-needed prose, Resolution). Number
sequentially — never reuse a number, even for a resolved-and-later-reopened item (open a
new one that references the old one instead).
