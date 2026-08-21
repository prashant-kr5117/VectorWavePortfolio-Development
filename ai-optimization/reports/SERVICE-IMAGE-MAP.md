# Service Image Map

**Date:** 2026-08-20/21
**Scope:** All 19 services in `lib/services.ts` plus the Services index (`app/services/page.tsx`).
Per `ai-optimization/BRAND_GUIDELINES.md`'s Image Strategy: an image must improve
comprehension, credibility, storytelling, hierarchy, or conversion — never added merely
to fill space. This map documents that decision explicitly for every service, not just
the ones that got a visual.

**Priority order used below** (per this workstream's Section 8): (1) genuine VectorWave
asset, (2) real product/platform visual where legally appropriate, (3) custom diagram,
(4) professional illustration, (5) AI-generated illustration, (6) stock imagery only if
genuinely useful.

---

## What was actually implemented (applies to every service below)

Rather than a per-service image, every service page now gets a **shared, per-platform
architecture diagram** (`components/services/PlatformArchitectureFlow.tsx`, fed by
`platformProfiles` in `lib/services.ts`) showing that platform's real capability flow —
e.g. Odoo services show `CRM → Sales → Inventory → Manufacturing → Accounting →
Reporting`. This is a **custom diagram** (priority 3), reused across every service on
that platform rather than built uniquely per service, because the underlying
architecture genuinely doesn't change between, say, Zoho Sales and Zoho Finance — only
which stage of it that specific service sits in. This satisfies "each service needs the
visual treatment that best explains that service" without hand-building 19 near-identical
diagrams, and directly avoids the "decorative logo wall" pattern
`ai-optimization/HOMEPAGE-MASTER-PLAN.md` already flagged as a risk elsewhere on the site.

No product screenshot, no stock photo, and no AI-generated image was added to any
service page. See the per-service table below for the reasoning on each.

---

## Per-service decisions

| Service | Visual needed? | Visual type | Purpose | Priority | Existing asset? | External asset required? | AI generation appropriate? | Recommended implementation |
|---|---|---|---|---|---|---|---|---|
| Zoho Bundled Suite | Yes (implemented) | Custom diagram (shared, platform-level) | Show how the full suite's apps connect | High | Yes — the Zoho `platformProfiles` flow, built this workstream | No | No | Done — `PlatformArchitectureFlow` with Zoho's `CRM → Books → Inventory → Analytics → Automation` stages |
| Zoho Sales | Yes (implemented) | Custom diagram (shared) | Same Zoho architecture flow, contextualizes where Sales sits in it | Medium | Yes (shared) | No | No | Done — same shared component |
| Zoho IT & Support | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Zoho Finance | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Zoho Human Resources | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Odoo Business Suite | Yes (implemented) | Custom diagram (shared) | Show Odoo's real modular flow: `CRM → Sales → Inventory → Manufacturing → Accounting → Reporting` | High | Yes (shared) | No | No | Done |
| Odoo Sales & eCommerce | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Odoo Inventory & Operations | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Odoo Accounting | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Odoo Workforce & HR | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Microsoft 365 & Dynamics Suite | Yes (implemented) | Custom diagram (shared) | Show the real enterprise process flow: `Sales → Customer Service → Finance → Supply Chain → Business Central → Power Platform` | High | Yes (shared) | No | No | Done |
| Dynamics 365 Sales | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Microsoft Security & Device Management | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Business Central Finance | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Dynamics 365 HR | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Mobile App Development | Yes (implemented) | Custom diagram (shared) | Show the custom-dev flow: `Business requirement → Architecture → APIs → Application → Integrations → Data → Deployment` | Medium | Yes (shared) | No | No | Done |
| Web Development | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| AI Integration | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| WhatsApp Automation | Yes (implemented) | Custom diagram (shared) | Same | Medium | Yes (shared) | No | No | Done |
| Services index — full-platform cards (Zoho/Odoo/Microsoft 365) | Yes (implemented) | Real VectorWave asset | Identify each platform at a glance | High | **Yes** — `PlatformLogo` component, reusing the real logo files already in `src/` (`zoho.png`, `odoo_logo.png`, `Microsoft_Dynamics_365_Logo.svg`) | No | No | Done — no new asset needed |

---

## Explicitly NOT added, and why

- **No fabricated Zoho/Odoo/Dynamics 365 UI screenshots anywhere.** Per this
  workstream's explicit instruction ("Do NOT generate fake screenshots of Zoho, Odoo or
  Microsoft products... AI-generated visuals must NEVER pretend to be actual product
  UI"), and because no real, licensed screenshot of VectorWave's own implementation work
  exists in this repository to use instead (the same gap `WORKSTREAM-02-IMAGE-OPPORTUNITIES.md`
  already flagged sitewide).
- **No stock photography** (offices, people at desks, generic "team collaborating"
  imagery) on any service page — explicitly against `BRAND_GUIDELINES.md`'s Image
  Strategy, and would add nothing a careful enterprise buyer values.
- **No AI-generated illustrative imagery** — every visual need identified above was
  fully satisfiable with a custom diagram or an existing real asset, so priority tiers 5
  and 6 (AI-generated / stock) were never reached for any service.
- **No per-service unique diagram was hand-built** (i.e., 19 different diagrams) — this
  was a deliberate scope decision, not an oversight. The real architectural relationship
  is a property of the *platform*, not the individual service; building 19 near-identical
  diagrams that each show "the same 5-6 boxes with one box highlighted" would be far
  closer to decorative repetition than genuine differentiation. If a future workstream
  wants per-service emphasis (e.g., highlighting which specific stage a service occupies
  within its platform's flow), that's a scoped enhancement to the existing
  `PlatformArchitectureFlow` component (an optional `highlight` prop), not a new visual
  system — flagged here as a real, low-effort future improvement, not implemented in this
  pass.

## Future opportunity (documented, not implemented — consistent with `WORKSTREAM-02-IMAGE-OPPORTUNITIES.md`)

| Section | Why a visual would help | Visual type | Priority | Source |
|---|---|---|---|---|
| Odoo Inventory & Operations / Manufacturing-related services | A real warehouse/production-floor photo or a process-flow screenshot from an actual VectorWave implementation would be stronger proof than a generic architecture diagram | Real implementation screenshot | P3 | Real (would require the business to provide it, with client permission) |
| Any service page, if a second real case study becomes available | Currently only Maxvill (Zoho) is a verified case study (`ai-optimization/BUSINESS_FACTS.md`) — a verified Odoo or Microsoft 365 case study would let those platform groups carry the same proof weight Zoho already has via the homepage case study | Real case study + real screenshot | P2 (once a second verified client exists) | Real, pending business confirmation |

No stock imagery is recommended anywhere in this table, consistent with
`BRAND_GUIDELINES.md`'s Image Strategy priority order.
