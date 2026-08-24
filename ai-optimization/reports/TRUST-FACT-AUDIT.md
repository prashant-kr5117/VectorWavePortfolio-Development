# Trust Fact Audit — Workstream 5

**Date:** 2026-08-21
**Scope:** Every trust/credibility-relevant claim in the live, served site (`app/`,
`components/`, `lib/`, `public/`) — excludes two stray, unreferenced HTML mockup files
in the repo root (`vectorwave-homepage-v5.html`, `vectorwave-zoho-service-section.html`)
and `VectorWave-Site-Audit.md`, neither of which Next.js serves as a route (see Section 9).
**Method:** Full-codebase grep for project counts, "Salesforce", partner/award/
certification language, testimonials, and team content, followed by direct reading of
every matched file, cross-checked claim-by-claim against `ai-optimization/BUSINESS_FACTS.md`.

Every row below states: **Claim → Location → Status → Recommended action → Requires
human confirmation?**

---

## 1. Project count

| Claim | Location | Status | Action | Human confirmation? |
|---|---|---|---|---|
| "25+" Projects delivered | `components/sections/Hero.tsx:76-77` | **VERIFIED** — the human-supplied figure recorded in `WORKSTREAM-03-RESULT.md` Section 20 | None — keep | No, already confirmed |
| "15" Projects Completed | `app/(site)/about/page.tsx` stats | **VERIFIED** — consistent with the Hero figure | None — keep | No |

**Finding: no contradiction exists anywhere in the live site.** The historically-flagged
"50+ vs. 15" contradiction (`BUSINESS_FACTS.md`, `BASELINE.md`) was already resolved by
Workstream 3. Grepped the entire site for any other numeric project-count claim ("50+",
other digit+"Projects") — none found. **`ai-optimization/BUSINESS_FACTS.md` itself still
records the old 50+/15 contradiction as unresolved** (its "Claims present in the code
that are UNVERIFIED" table, row 1-2) — that governance file is now stale on this specific
point and should be updated by whoever owns it to reflect the "15+" resolution, separate
from this workstream's own scope.

---

## 2. Salesforce

| Location | Status | Action taken |
|---|---|---|
| `components/Footer.tsx:11` — `platformLinks` array entry, linking to `/#tech-salesforce` | **CONTRADICTORY** — no Salesforce service page/content exists anywhere on the site (confirmed: `app/services/` has 19 real service slugs across Zoho/Odoo/Microsoft 365/Custom Development, none Salesforce), and the anchor itself was already broken — `components/sections/TechPlatformTabs.tsx` only defines `id="tech-zoho"`, `id="tech-odoo"`, `id="tech-dynamics"`; `tech-salesforce` never existed as a section id even before this fix, so the Footer link led nowhere on top of asserting an unverified capability | **Removed** the Salesforce entry from `platformLinks` |
| `components/Footer.tsx:31-32` — "About VectorWave" blurb: "...Dynamics 365, Salesforce, Odoo and custom technology." | **CONTRADICTORY** | **Removed** "Salesforce, " from the sentence |
| `components/Footer.tsx:105` — bottom tagline: "Zoho Ecosystem · Microsoft Dynamics 365 · Salesforce · Odoo" | **CONTRADICTORY** | **Removed** "· Salesforce" |
| `app/services/zoho-bundled-suite/_components/WhySection.tsx:86` — `PlatformCredibilitySection`'s platform list (`["Microsoft Dynamics 365", "Salesforce", "Odoo"]`), under copy stating "We can recommend and work across platforms when the business requires it" | **CONTRADICTORY** — directly asserts a working capability across Salesforce | **Removed** "Salesforce" from the array |

**No replacement platform was invented anywhere** — every removal simply shortens the
existing, real Zoho/Dynamics 365/Odoo list, per the explicit instruction not to invent a
substitute. Salesforce now appears **nowhere** in the live site. The Footer is rendered
globally (root layout, per `WORKSTREAM-02-RESULT.md`), so this single fix removes the
claim from every page at once — this was flagged as the single biggest inconsistency
carried over from Workstream 3/4 (`WORKSTREAM-04-RESULT.md` Section 16's "Remaining
weaknesses" table), since the homepage/services pages had already been made
Salesforce-free while the global Footer and the Zoho Bundled Suite fork still asserted it.

**Human confirmation still open:** whether VectorWave has a real, statable Salesforce
capability worth building actual service content for in the future. Until confirmed,
correct state is "absent," not "present and unbacked" — which is what this fix achieves.

---

## 3. Partner / award / certification claims

| Claim | Location | Status | Action | Human confirmation? |
|---|---|---|---|---|
| "Zoho Authorised Partner" (Hero eyebrow badge) | — | **Already removed** in Workstream 3 (confirmed absent from current `Hero.tsx`; eyebrow now reads "ERP · CRM · Web & AI Solutions") | None needed | Still open if the business wants to pursue and later state real partner status |
| "Trusted technology partners" (PartnerLogos section label, About page) | `components/sections/PartnerLogos.tsx` | **CONTRADICTORY** — the word "partners" asserts a formal relationship with all 7 logos shown (Zoho, Odoo, Microsoft Dynamics 365, Shopify, React, NetSuite, Tally), 4 of which have zero supporting evidence anywhere (see Section 4 below) | **Relabeled** to "Platforms we implement" — accurate, requires no partnership evidence, still states real capability | No — this rewording doesn't assert anything beyond what's independently verified (the 19 real services) |
| "Certified Zoho Consultants & Implementation Experts" (About page department title) | `app/(site)/about/page.tsx` (departments array) | **UNVERIFIED** — no certificate, credential ID, or issuing body named anywhere in the codebase | **Removed** "Certified" → "Zoho Consultants & Implementation Experts" | Yes — if the team holds real Zoho certifications, human can supply the credential and this can be restored with evidence |
| "...consists of certified Zoho experts..." (same department's description) | Same file | **UNVERIFIED**, same reason | **Removed** "certified" from the sentence | Same as above |
| "certified Zoho consultants..." (About page `<meta description>`) | `app/(site)/about/page.tsx` metadata | **UNVERIFIED**, same reason — an SEO-visible claim, not just on-page copy | **Removed** "certified" from the meta description | Same as above |
| "Award Winning Support Team" (About page "Why choose us" list) | `app/(site)/about/page.tsx` (whyChooseUs array) | **UNVERIFIED** — no award name, issuing body, or date anywhere in the codebase, same finding as the original site audit | **Replaced** with "Dedicated, Hands-On Support" — a positioning statement about how the team works, not a claim requiring external verification | Yes — if a real award exists, it can be named specifically (award name + issuing body + year) once supplied |
| "4 Accolades Earned" (About page stat) | `app/(site)/about/page.tsx` (stats array) | **UNVERIFIED** — no award names anywhere | **Removed**, not replaced with an invented number (see Section 6) | Yes |

**Not changed, flagged only:** "Best Quality Designs" and "Best ROI Techniques" (About
page "Why choose us" list) are generic marketing adjectives, not specific certifiable
claims (no named award/certification/ranking is implied the way "Award Winning" or
"Certified" implies one) — left as-is per this workstream's scope (which targets claims
implying external verification), but noted here as soft superlative language a future
content pass could tighten toward more specific, evidence-free positioning language.

---

## 4. Partner / technology logos (About page `PartnerLogos`)

| Logo | Status | Action |
|---|---|---|
| Zoho | **VERIFIED** — flagship platform, 5 real services, the Maxvill case study, the live SalesIQ chat widget | Kept |
| Odoo | **VERIFIED** — 5 real services in `lib/services.ts` | Kept |
| Microsoft Dynamics 365 | **VERIFIED** — 5 real services in `lib/services.ts` | Kept |
| Shopify | **UNVERIFIED** — no Shopify service page, no Shopify content anywhere else on the site | **Removed** |
| React | **UNVERIFIED as a "partner"** — React is a frontend library VectorWave's own Custom Development work may use internally, not a third-party platform relationship; presenting it as a coequal logo alongside Zoho/Odoo/Dynamics 365 implied a partnership status that doesn't exist | **Removed** |
| NetSuite | **UNVERIFIED / actively misleading** — NetSuite is a competing ERP product; no NetSuite service content exists anywhere, and its presence in a "trusted technology partners" strip could be read as a false capability claim | **Removed** |
| Tally | **CONTRADICTORY** — Tally is the legacy system the site's own real case study (Maxvill) says VectorWave *migrated a client away from*; presenting it as a current "technology partner" directly contradicts the site's own proof point | **Removed** |

Reduced from 7 logos to the 3 that are independently verifiable against
`BUSINESS_FACTS.md`'s services list. Component was also changed from a continuous
auto-scroll marquee to a static row (Section 9 below) — 3 logos no longer need to scroll
to fit, and per `ai-optimization/MOTION_GUIDELINES.md`'s "what problem does this
animation solve" test, motion with no layout reason left was removed rather than kept as
unexplained decoration.

---

## 5. Testimonials

| Testimonial | Attribution | Source | Status | Action |
|---|---|---|---|---|
| "Sam, Founder & CEO" | First name only, no company | — | Already removed in Workstream 3 | **Confirmed absent** — grepped `app/` and `components/` for any trace, none found |
| Nikhil, CEO, Maxvill | Full name, role, company | Real video (`/maxwell-testimonial.mp4`) + poster + direct quote | **VERIFIED** — the one genuine, named case study on the site | Unchanged this workstream; already well-structured (Challenge → Solution → Technology → Outcome → CTA) since Workstream 3's `CaseStudy.tsx` — see Section 5 of `WORKSTREAM-05-RESULT.md` for the review of whether further changes were needed |

No other testimonial exists anywhere on the site (confirmed by the same sitewide grep).

---

## 6. Other About-page stats

| Original claim | Status | Action |
|---|---|---|
| "10 Satisfied Clients" | **UNVERIFIED** — no source anywhere in the codebase | **Removed** |
| "15 Projects Completed" | **VERIFIED** (Section 1) | **Kept**, unchanged |
| "4 Accolades Earned" | **UNVERIFIED** (Section 3) | **Removed** |
| "56K+ Lines of Code" | **UNVERIFIED** and not a customer-relevant metric even if true | **Removed** |

**Replacement, not invention:** the 3 removed stats were replaced with 3 structural
facts derived live from the same source data the Hero already uses for its own stats
(`platforms.length`, `industries.length`, plus `serviceCategories.length` — the total
real service count, 19) — the identical pattern Workstream 3 used and documented for the
Hero counters ("a structural fact directly derivable from `lib/services.ts`, not a
marketing claim, and not a number pulled from thin air" — `WORKSTREAM-03-RESULT.md`
Section 4). These numbers cannot drift out of sync with the real service catalog the way
a hand-typed number could.

---

## 7. Team / leadership

See `ai-optimization/reports/TRUST-IMAGE-REQUIREMENTS.md` for the full imagery
discussion, including a real, previously-underused team photo found during this audit.
Summary: 4 leadership entries with real, specific role descriptions but no individual
names anywhere (`name` field never existed) — not a fabrication (nothing false is
stated), but the placeholder avatar-circle-with-generic-icon presentation read as "a
photo should be here and isn't." Redesigned to drop the avatar-circle pattern entirely
in favor of the same icon-badge card style already used for the page's "Departments"
section immediately below — consistent, and no longer implies a missing photo. No name
was invented for any of the 4 roles.

---

## 8. Footer (global, all pages)

Beyond the Salesforce fix (Section 2), the rest of `Footer.tsx`'s content — the address,
email, phone, "Platforms" list, "Industries" list, and social links — was cross-checked
against `BUSINESS_FACTS.md` and found accurate: the address/email/phone match exactly,
the industry links correspond to real entries in `lib/industries.ts`, and social links
map to the confirmed LinkedIn/Instagram-only presence. No further Footer change was
needed.

---

## 9. Out-of-scope findings (documented, not fixed)

- **Two stray HTML files in the repo root** (`vectorwave-homepage-v5.html`,
  `vectorwave-zoho-service-section.html`) still contain old Salesforce-inclusive copy and
  markup. Neither is imported, linked, or served by the Next.js app (confirmed: not
  under `app/`, `components/`, or `public/`; no route references either file) — they are
  dead repo weight already flagged in `BASELINE.md` item 12, not a live-site claim.
  Recommend deleting them in a future cleanup pass (not this workstream's scope — no live
  page depends on them, and deleting files is a bigger blast radius than this
  content-focused workstream should take on unprompted).
- **`ai-optimization/BUSINESS_FACTS.md` itself is now stale** on the 50+/15 project-count
  question (Section 1) — it should be updated by its owner to record the "15+" resolution
  Workstream 3 already implemented, independent of this workstream.

---

## Summary

| Metric | Count |
|---|---|
| Contradictory claims found | 5 (Salesforce ×4 locations, "certified"/"Award Winning"/"Accolades" cluster) |
| Unverified claims found | 8 (certification ×3 occurrences, Award ×1, Accolades ×1, Satisfied Clients ×1, Lines of Code ×1, 4 unverified partner logos) |
| Claims removed | 12 occurrences across 4 files |
| Claims preserved (verified) | Zoho/Odoo/Microsoft Dynamics 365 platform claims, 15/15+ project count, Nikhil/Maxvill case study, all contact information, all 19 service claims |
| New claims invented | **0** |
