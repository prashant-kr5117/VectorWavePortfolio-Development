# Stop Conditions

Two categories: conditions that stop **one iteration** (automatic REVERT, loop keeps
running) and conditions that stop **the whole loop** (loop halts, human review required).
Confusing the two is the most likely controller bug — check this document before deciding
which applies.

---

## Automatic REVERT (stops the iteration, not the loop)

Per `CONTROLLER.md` Step 14, these fire without further judgment — no scoring debate
needed, the decision is REVERT:

- **Build fails** (`npm run build` non-zero exit) — `EVALUATION_RUBRIC.md` rule 6.
- **A route breaks** (health-check reports a non-200, an unexpected redirect, a console
  error, or an uncaught page exception on any route) — rule 7.
- **Navigation breaks** (header/footer links, mega-menu, mobile menu no longer function)
  — rule 8.
- **A form breaks** (contact form or consultation modal no longer submits/opens/closes
  correctly) — rule 9.
- **Accessibility regresses materially** — a new axe-core violation appears on any route
  that didn't have it before, OR an existing violation's severity increases. (The 2
  pre-existing, out-of-scope violations documented since Workstream 1 —
  `blog-index`'s color-contrast, `service-zoho-bundled-suite`'s local hard-coded colors —
  are the known baseline; anything beyond that count is a regression.) Rule 10.
- **Performance regresses significantly without strong UX justification** — a
  representative-route Lighthouse Performance score drops outside the documented
  local-machine noise band (roughly ±8 points on this shared, unthrottled machine — see
  every Workstream result's Lighthouse section for the precedent) with no accompanying
  UX/trust/content improvement that would justify the tradeoff. Rule 11.
- **A business fact is compromised** — the change asserts something not in
  `BUSINESS_FACTS.md`, contradicts an existing verified fact, or reintroduces a claim
  this project already removed for being unverified (e.g. Salesforce, "Certified,"
  "Award Winning" — see `ai-optimization/reports/TRUST-FACT-AUDIT.md` for the full
  removed-claims list; none of these may silently reappear in a future iteration).
  `SAFETY_RULES.md` rule.
- **A URL changes without a redirect in the same change** — rule 13.

When any of these fire mid-iteration, stop implementing further, run Step 15's REVERT
path, log the iteration (still — see `ITERATION-PROTOCOL.md`), and continue the loop
with the next task. **One reverted iteration is not itself a reason to halt the loop** —
see the consecutive-failure threshold below for when repetition becomes a halt condition.

---

## Loop-halting conditions (stop the whole loop, require human input)

Set `state.json.status = "blocked"` and `human_decision_required = true`, with a
specific reason recorded in `HUMAN-DECISIONS.md`, when:

1. **A human decision is required** — any trigger in `HUMAN-DECISIONS.md`'s list
   (unverified claims, client names, testimonials, awards, partnerships, certifications,
   project statistics, client logos, licensing/copyright uncertainty, real
   employee/team photographs, major brand-direction decisions, ambiguous factual
   information, destructive architecture changes, legal/compliance uncertainty). This is
   the most common halt reason and is expected to fire often — it is not a failure mode,
   it's the loop working correctly.
2. **Critical ambiguity exists** that isn't covered by a specific rule above — e.g. two
   governance documents give conflicting guidance and neither is clearly authoritative
   for this case.
3. **No meaningful improvement remains** in `TASK-QUEUE.md` — every open item is either
   blocked on a human decision or below the minimum-value threshold to justify an
   iteration (see "Negligible improvement," below).
4. **Score improvement becomes negligible** — three consecutive ACCEPTed iterations each
   move the overall weighted score by less than 0.5 points with no category-specific win
   large enough to matter on its own. This usually means the remaining `TASK-QUEUE.md`
   items are genuinely P3/polish-tier, not that the loop is broken — treat it as a
   natural stopping point, not an error.
5. **Repeated iteration failures** — see the consecutive-no-improvement threshold below.
6. **Validation repeatedly fails** on the same task after one REVISE attempt (Step 14) —
   don't loop retrying the same fix; escalate.
7. **A major architectural change is required** to make further progress (e.g. resolving
   the `/services/zoho-bundled-suite` design-fork decision, centralizing something that
   touches every page's rendering path) — these are explicitly flagged as
   human-gated decisions in `DESIGN_SYSTEM.md`'s TARGET SYSTEM section already; the loop
   must not decide this unilaterally.
8. **Business facts are insufficient** to proceed with the next-highest-priority task at
   all (not just one field of it) — e.g. the entire remaining queue is gated on the same
   unresolved fact.

### Consecutive-no-improvement threshold

**Default: stop after 3 consecutive REVERTed or no-improvement iterations and request
review.** Increment `state.json.consecutive_no_improvement` on every REVERT or
zero/negative-delta ACCEPT; reset to 0 on any ACCEPT with a positive delta. At 3, halt
per the procedure above — do not attempt a 4th automatically. This threshold exists
specifically so the loop can't spin forever making tiny or failed changes to look
productive (this task's Section 16 instruction: "Do NOT create infinite changes merely
to keep the loop running").

---

## What "meaningful improvement" means here

Not every positive score delta justifies continuing to grind the same category. A change
is meaningful if at least one of:
- It fixes a P0 or P1 item (`TASK-QUEUE.md` priority tiers) — priority alone justifies
  the iteration even if the numeric delta is small (`EVALUATION_RUBRIC.md`/`README.md`:
  "a critical issue fixed despite neutral scoring" can still be ACCEPTed).
- The weighted overall score moves by ≥0.5.
- A single category moves by ≥3 points with no regression elsewhere.

Anything smaller, repeated, is the "negligible improvement" halt condition above — not
because small fixes are bad, but because grinding P3 polish while a real halt condition
exists (an open human decision, an unresolved architecture question) wastes iterations
that should instead surface the blocker.

---

## Recovery from a halt

See `README.md`'s "How to recover/revert" section for the exact procedure. In short: a
human resolves the specific item in `HUMAN-DECISIONS.md` (or the ambiguity/architecture
question), updates that file to mark it resolved, sets `state.json.human_decision_required
= false` and `status = "idle"`, and resets `consecutive_no_improvement = 0` if the halt
was for that reason. The loop resumes at `CONTROLLER.md` Step 1 on its next invocation —
nothing about the halt itself needs to be "fixed" in code.
