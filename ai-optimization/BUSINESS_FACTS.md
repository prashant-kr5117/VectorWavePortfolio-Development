# Business Facts — Locked Reference

**This file is the factual guardrail for all future AI agents.** Anything not listed here
as confirmed must not be written into the site, a review, or a report as if it were true.

Sourced entirely from the live source code and `VectorWave-Site-Audit.md` (Section 15,
cross-checked against other sections). No information was invented. Anything the audit
could not verify is explicitly marked below.

**STRICT RULE:** Never invent clients, testimonials, statistics, project counts, revenue,
awards, certifications, partnerships, case-study results, customer names, or performance
results — not in this file, and not in any future review, change, or generated content.

---

## Confirmed facts

| Fact | Value |
|---|---|
| Company name | VectorWave Technologies |
| Domain | vectorwavetechnologies.com |
| Email | admin@vectorwavetechnologies.com |
| Phone | +91-8791810555 |
| Address | GOLDEN-I, Office No 1034-1035, 10th Floor, Tower 3, Plot No 11, Sector-Techzone IV, Greater Noida (West), Uttar Pradesh 201318, India |
| Business hours | Monday–Friday, 9:30 AM–6:30 PM IST |
| Social media | LinkedIn and Instagram only — no Twitter/X, Facebook, or YouTube configured |
| Services offered | 19 total, across four platforms: Zoho, Odoo, Microsoft 365, Custom Development |
| Industries served | 13 named industries |
| Named client testimonial (real) | Nikhil, CEO of "Maxvill" — describes a Zoho CRM setup and a Tally-to-Zoho-Books migration. This is the one verifiable case study on the entire site. |
| Google Search Console | Verified — a real verification code is present in the site |
| Google Analytics | Live and connected (GA4) |
| Live chat | Zoho SalesIQ, real and configured |
| Contact form backend | Real — posts to a Zoho CRM webhook via `/api/contact`, not a stub |
| Translation | Google Translate widget, English and Dutch only |

## Services (19, by platform)

- **Zoho (5):** Bundled Suite, Sales, IT & Support, Finance, Human Resources
- **Odoo (5):** Business Suite, Sales & eCommerce, Inventory & Operations, Accounting, Workforce & HR
- **Microsoft 365 (5):** Dynamics Suite, Dynamics 365 Sales, Security & Device Management, Business Central Finance, Dynamics 365 HR
- **Custom Development (4):** Mobile App Development, Web Development, AI Integration, WhatsApp Automation

## Claims present in the code that are UNVERIFIED — do not repeat as fact without correction

| Claim | Where it appears | Status |
|---|---|---|
| "50+ Projects delivered" | Homepage | **CONTRADICTS the About page figure below. UNKNOWN — HUMAN VERIFICATION REQUIRED.** |
| "15 Projects Completed" | About page | **CONTRADICTS the homepage figure above. UNKNOWN — HUMAN VERIFICATION REQUIRED.** |
| "10 Satisfied Clients" | About page | No source given anywhere in the codebase. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| "4 Accolades Earned" | About page | No award names, issuing organizations, or dates given anywhere. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| "56K+ Lines of Code" | About page | Not a customer-relevant metric and unverifiable as stated. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| "Zoho Authorised Partner" | Homepage | No certificate, badge image, or partner ID exists anywhere in the codebase. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| "Award Winning Support Team" | About page | No award name or issuing body given. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| Salesforce as a supported platform | Footer, homepage technology section, an old mockup file | No Salesforce service page or content exists anywhere on the site. UNKNOWN — HUMAN VERIFICATION REQUIRED (does VectorWave actually offer Salesforce services?). |
| "Sam, Founder & CEO" testimonial | Homepage | No company name given; cannot be verified. UNKNOWN — HUMAN VERIFICATION REQUIRED. |
| 4 leadership roles ("Chief Executive Officer," etc.), 5 team departments | About page "Meet the team" section | No individual names given anywhere; all four leadership cards show placeholder icons, not real photos. UNKNOWN — HUMAN VERIFICATION REQUIRED (real names/photos, or confirm anonymity is intentional). |

## Explicitly NOT present anywhere in the codebase

These are called out because a future AI agent might otherwise assume they exist for a
company of this type. They do not — do not reference them as if they do.

- No dedicated "Case Studies" page or section (only the one Maxvill testimonial).
- No awards page, press page, or "as featured in" section.
- No investor/leadership bios beyond the four unnamed placeholder roles.
- No pricing page.
- No named individual blog authors (all posts are credited to "VectorWave Team").
- No Twitter/X, Facebook, or YouTube presence.

## Existing honest-labeling precedent (reuse this pattern)

The `/services/zoho-bundled-suite` page already contains four example scenarios explicitly
labeled **"Illustrative implementation patterns — not case studies unless separately
verified."** This is the correct template for any future hypothetical or illustrative
content anywhere else on the site. Always use one of:

- **"Illustrative Scenario"**
- **"Hypothetical Example"**
- **"Example Architecture"**

Never present hypothetical content as if it were a real client outcome.

## Related documents

[[SAFETY_RULES]] — hard rules built on top of this file. [[BASELINE]] — the Trust/Proof
score (48/100) that these unverified claims are directly responsible for.
