# Trust Image Requirements — Workstream 5

**Date:** 2026-08-21
**Method:** Reviewed every image referenced from a trust/credibility-relevant section
(About hero, PartnerLogos, Leadership, Case Study) directly, including opening the actual
image files, not just reading the code that references them — per
`ai-optimization/BRAND_GUIDELINES.md`'s Image Strategy, which ranks real assets above
every other option.

---

## Finding: a real, previously under-leveraged team photo already exists

`src/TeamImage.jpeg` (127KB) is used today as the dimmed background behind the About
page's hero heading (`app/(site)/about/page.tsx`, opacity-gradient overlay, `alt=""`).
Opening the actual file: it shows **9 people in matching black polo shirts carrying what
appears to be a VectorWave logo**, standing together in an office space with visible
desks, monitors, and branded signage — consistent with a genuine, on-premises team photo,
not stock imagery (no watermarks, no generic model-agency staging, no repeated faces
across other "team" stock sets we'd expect from a purchased asset).

**This is exactly the kind of asset `BRAND_GUIDELINES.md` ranks highest ("1. Real team
photography") and the one thing the site's credibility gap around the About page's
individual leadership cards (Section 7 of `TRUST-FACT-AUDIT.md`) doesn't have.**

**What this workstream did with it:** left its current usage unchanged (dimmed hero
background, `alt=""`) — this is a safe, working, decorative treatment that needed no fix.
**What this workstream did NOT do:** did not add a caption asserting facts about the
photo (who's in it, where/when it was taken, whether these are current employees) that
can't be independently confirmed from the file alone. Per `SAFETY_RULES.md`, presenting
an unconfirmed claim about a real asset is still a claim that needs a human to confirm
before it's stated as fact.

**Recommended follow-up (requires human confirmation, not a design decision):**
1. Confirm these are current VectorWave employees at the company's own office (very
   likely, given the branded polos, but should be confirmed rather than assumed).
2. If confirmed, this photo could do more work than a dimmed background — e.g. a
   captioned "Our team in Greater Noida" moment near the "Meet the team" section,
   giving the page one real, unposed group photo alongside the role-based leadership
   cards. This is a future content decision, not implemented here, since it requires the
   human confirmation above before any caption asserting who/where can be added.

---

## Leadership section — redesigned without fabricated portraits

**Before:** 4 leadership cards (CEO, Head of ERP Development, Finance Advisory Lead,
Supply Chain & Operations Lead), each rendering a circular placeholder with a generic
`UserRound` icon standing in for a missing photo — the classic "photo should be here"
visual cue, which reads as unfinished rather than intentional.

**Why not fill it with a generated/stock photo:** explicitly prohibited —
`BRAND_GUIDELINES.md` Image Strategy: "Never... generate fake employee headshots,"
reinforced by this workstream's own Section 8 instruction.

**What was done instead:** the avatar-circle pattern was removed. Leadership cards now
use the same icon-badge (`CardIcon`) treatment already used one section below for
"Departments" on the same page — each leader's role gets a relevant icon (briefcase for
CEO, chip for Head of ERP Development, calculator for Finance, truck for Supply Chain)
in the same visual language as the rest of the page, rather than a circle implying a
photo. This reads as a deliberate, consistent editorial choice (role-based team
presentation) rather than 4 unfilled photo slots. No name was invented — the `name` field
never had real data and none was added.

**Still open, requires human input, not fixable by content/design work alone:**
- Real names for the 4 leadership roles, if the business wants individuals credited by
  name (currently role-only, which is honest but less personal).
- Real headshots, if/when available — at that point the card layout can be extended to
  show a photo (the current `CardIcon` pattern doesn't block adding one later; it simply
  doesn't fabricate one now).

---

## Case study (Maxvill) — no new visual needed

Reviewed whether the homepage case study (`components/sections/CaseStudy.tsx`) would
benefit from a project screenshot, workflow diagram, or architecture visualization, per
this workstream's Section 6 instruction.

**Conclusion: no new visual is recommended.** The existing real video + poster (the
Maxvill interview footage) is the only real visual asset that exists for this project —
no dashboard screenshot, no architecture diagram, and no other client-approved asset was
found anywhere in the repository (`public/`, `src/`) that documents the actual Maxvill
Zoho CRM/Books implementation. Per `BRAND_GUIDELINES.md`'s explicit rule ("Never fabricate
a project screenshot") and this workstream's Section 6 instruction ("Do NOT create a fake
client screenshot... if a real asset is required but unavailable, document it"), a
generic Zoho CRM dashboard screenshot could visually resemble a "Maxvill screenshot"
without being one — which would be exactly the fabrication this process exists to
prevent. **Documented requirement, unmet:** a real screenshot or workflow diagram of the
actual Maxvill implementation, if the client can approve sharing one, would strengthen
this section further — flagged for a future iteration contingent on client approval, not
attempted here.

---

## PartnerLogos (About page) — asset reduction, not addition

Trimmed from 7 logo assets to 3 (Zoho, Odoo, Microsoft Dynamics 365) — see
`TRUST-FACT-AUDIT.md` Section 4 for the reasoning. All 3 kept logos were already in the
repository (`src/GIF by Zoho.gif`, `src/odoo_logo.png`,
`src/Microsoft_Dynamics_365_Logo.svg`) and are the same files already used elsewhere
(`EcosystemOrbit.tsx`, homepage `TechnologyEcosystemVisual.tsx` per Workstream 3). No new
image asset was added. The 4 removed logo files (`shopify.png`,
`react_original_wordmark_logo_icon_146375.webp`, `NetSuite_idNc45xmoe_0.svg`, `tally.svg`)
were left in place in `src/` (not deleted) — removing unreferenced files is a repo-cleanup
action, not a trust/content decision, and out of scope for this workstream; they are now
simply unused by any component (confirmed via grep — no remaining import of any of the 4).

---

## Summary table

| Section | Visual need | Real asset available? | Action | Priority |
|---|---|---|---|---|
| About hero | Team credibility | **Yes — `TeamImage.jpeg`, already real, already in use** | Left as-is; flagged for a possible future caption pending human confirmation of who/where | Low (already working) |
| Leadership cards | Individual credibility | No (no real headshots exist) | Redesigned without portraits — icon-badge pattern, matches Departments | Done this workstream |
| Case study (Maxvill) | Implementation proof | No (no screenshot/diagram of the real project exists) | None added — documented as an unmet, client-approval-gated requirement | Requires client approval, not implementable now |
| PartnerLogos (About) | Platform credibility | Yes — Zoho/Odoo/Dynamics 365 logos, already in repo | Reduced from 7 to the 3 verified logos | Done this workstream |
