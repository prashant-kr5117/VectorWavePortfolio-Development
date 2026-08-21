# Service Content Research

**Date:** 2026-08-20
**Method:** Web research (WebSearch) against vendor-adjacent and, where linked, official
sources (odoo.com, learn.microsoft.com, microsoft.com/dynamics-365), used to verify
current terminology and capability accuracy before rewriting `lib/services.ts`'s Odoo and
Microsoft 365/Dynamics 365 content. Zoho and Custom Development content was **not**
rewritten — see rationale below.

Per `ai-optimization/BUSINESS_FACTS.md` and the Content Positioning Rule
(`HOMEPAGE-MASTER-PLAN.md`-adjacent instructions for this workstream): everything below
is classified as **Platform Fact** (what the vendor's product does) unless marked
otherwise. No **VectorWave-specific historical claim** (a client count, a named
implementation, a certification) was added anywhere — those remain gated behind
`BUSINESS_FACTS.md`.

---

## Why Zoho was not re-researched

Per this workstream's explicit instruction ("Zoho content is currently the strongest
internal source... preserve strong existing Zoho content... do not rewrite it
unnecessarily") and Stage 2's own finding (`STAGE-2-BASELINE-REVIEW.md` Step 10: "the
intros are genuinely well-written and platform-specific... individually the intros are
genuinely well-written"), the 5 Zoho services' `intro` and `tools` fields in
`lib/services.ts` are **byte-identical to before this workstream**. Only new,
additive fields (`problem`, `useCases`, `integrations` — see Section 2 of
`WORKSTREAM-04-RESULT.md`) were added to the Zoho entries.

## Why Custom Development was not re-researched

The 4 Custom Development services' content (Mobile App Development, Web Development, AI
Integration, WhatsApp Automation) was not flagged as weak/generic/AI-sounding by Stage 2,
is not vendor-product content requiring external verification (it describes what
VectorWave builds, not a third-party product's feature set), and reads as specific
rather than templated on inspection. Per the instruction "do not rewrite content merely
to make it longer," it was left untouched aside from the same additive fields as Zoho.

---

## Platform: Odoo

### Sources researched

- [Odoo — official apps overview](https://www.odoo.com/) (odoo.com)
- [Odoo CRM](https://www.odoo.com/) / Odoo module descriptions cross-checked against
  multiple 2026 implementation-partner guides summarizing current Odoo documentation
- [Odoo Studio — official features page](https://www.odoo.com/app/studio-features) (odoo.com)
- [Odoo Time Off — official](https://www.odoo.com/app/time-off) (odoo.com)
- [Odoo Time Off — features](https://www.odoo.com/app/time-off-features) (odoo.com)
- [Odoo Appraisals — official](https://www.odoo.com/app/appraisals) (odoo.com)
- [Odoo Appraisals — features](https://www.odoo.com/app/appraisals-features) (odoo.com)
- [Odoo HR — features](https://www.odoo.com/app/employees-features) (odoo.com)
- [Human resources software — Odoo](https://www.odoo.com/app/employees) (odoo.com)

### Capabilities verified

- **CRM**: pipeline management from first contact through to close; leads captured
  automatically from website forms, incoming email, or database import.
- **Sales**: quotations, sales orders, and customer invoices, flowing directly into
  fulfillment/accounting.
- **Inventory**: real-time stock updates on receipt/movement/sale; barcode scanning,
  drop-shipping, multi-warehouse; transactions reflect instantly across Sales,
  Manufacturing, and Accounting.
- **Manufacturing**: production planning, work-order tracking, Bills of Materials (BoMs),
  and quality checks in one interface.
- **Accounting**: invoicing, bank reconciliation, tax/compliance, financial reporting.
- **Studio**: a no-code, drag-and-drop application builder — custom fields/views/forms,
  a report/BI builder (graphs, kanban, pivot tables, Gantt), menu editor, access-rights
  management, CSV/XLS import-export — explicitly positioned as configuration/customization
  without a developer.
- **Employees (HR)**: centralizes employee profiles, job info, departments, managers,
  documents, contracts, and org structure; onboarding/offboarding plans trigger a
  cross-app activity sequence.
- **Recruitment**: hiring-pipeline management, resume repositories, interview scheduling,
  applicant tracking, job postings published directly to the company website.
- **Time Off**: leave requests update timesheets, attendance, payroll, and balances in
  real time; configurable single- or two-level approval.
- **Appraisals**: 360° feedback, real-time goal tracking, automated appraisal cycles,
  goals linked to review cycles via smart buttons.
- **Website/eCommerce**: real-time inventory sync across storefront/marketplace/POS at
  the moment of purchase; supports downloadable products and recurring subscription
  packages from the same store.

### Terminology verified

- "Odoo Studio" (not "Odoo Customizer" or similar) is the correct, current product name
  for the no-code builder.
- App names used in `lib/services.ts` (Odoo CRM, Odoo Sales, Odoo Inventory, Odoo
  Manufacturing, Odoo Accounting, Odoo Invoicing, Odoo Expenses, Odoo Employees, Odoo
  Recruitment, Odoo Time Off, Odoo Appraisals, Odoo Purchase, Odoo Quality, Odoo
  Maintenance, Odoo Website & eCommerce, Odoo Subscriptions, Odoo Documents & Sign, Odoo
  Referrals) all match current official product naming — no renames found.

### Content changed

`intro` and `tools[].desc` text was refined (not padded) across all 5 Odoo services in
`lib/services.ts` to reflect the verified capability language above — e.g. Manufacturing's
description now explicitly names BoMs and quality checks (previously implied but not
named); Studio's description now explicitly states "no-code" and names the report/BI
builder; Recruitment now explicitly mentions website job-posting; Time Off now explicitly
mentions the two-level approval option; Appraisals now explicitly names 360° feedback.
None of these are new claims — each is a more precise statement of what the earlier,
slightly more generic description already gestured at.

### Claims intentionally excluded

- No specific Odoo *version number* is cited anywhere (Odoo ships frequent releases;
  citing a version would go stale and isn't necessary for a service description).
- No AI/Copilot-style roadmap features for Odoo were added — 2026 search results
  referenced upcoming AI-assisted features (smart CRM suggestions, predictive inventory)
  from third-party commentary, not confirmed as shipped, general-availability Odoo
  product features from an official source; excluded per "prefer official vendor
  documentation" and to avoid stating a roadmap item as a current capability.

### VectorWave-specific claims requiring verification

None added. No Odoo client count, named implementation, or certification appears
anywhere in the rewritten content — the Content Positioning Rule's "Platform Fact" vs.
"VectorWave Service" vs. "Unverified Historical Claim" distinction was applied throughout
(every rewritten sentence describes what Odoo does or what VectorWave *helps configure*,
never a claim about past client work).

---

## Platform: Microsoft Dynamics 365 / Business Central / Microsoft 365

### Sources researched

- [Business Central — official Microsoft product page](https://www.microsoft.com/en-us/dynamics-365/products/business-central) (microsoft.com)
- [Agents, Copilot, and AI capabilities in Dynamics 365 apps — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/copilot/ai-get-started) (learn.microsoft.com)
- [Customer Insights and Journeys — Microsoft Dynamics 365](https://www.microsoft.com/en/dynamics-365/products/customer-insights) (microsoft.com)
- [2026 release wave 1 plans for Dynamics 365, Power Platform, Copilot Studio — Microsoft Dynamics 365 Blog](https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2026/03/18/2026-release-wave-1-plans-for-microsoft-dynamics-365-microsoft-power-platform-and-copilot-studio-offerings/) (microsoft.com)
- [Overview of Dynamics 365 Human Resources 2026 release wave 1 — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/enterprise-resource-planning/dynamics365-human-resources/) (learn.microsoft.com)
- [What's new in Microsoft Security: July 2026 — Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/07/30/whats-new-in-microsoft-security-july-2026/) (microsoft.com)
- [Learn about using Intune to manage Microsoft Defender settings — Microsoft Intune | Microsoft Learn](https://learn.microsoft.com/en-us/intune/device-security/microsoft-defender/security-settings-management) (learn.microsoft.com)

### Capabilities verified

- **Business Central**: financial management (general ledger, cash flow, budgets,
  reporting, automated bank reconciliation, compliance tracking), supply chain/inventory
  (real-time tracking, demand forecasting, vendor management, purchase orders), sales/CRM
  tools, project management, service management, basic manufacturing, and Power
  BI/Excel-based analytics — all included out of the box, alongside **Copilot** for tasks
  like bank reconciliation, inventory forecasting, and sales-line suggestions "without
  additional configuration."
- **Dynamics 365 Sales**: Copilot draws on CRM data *and* Microsoft 365 signals (email,
  meeting recaps) to surface actionable insights and recommended actions; Sales,
  Customer Service, and Customer Insights are model-driven apps built on **Microsoft
  Dataverse**, the shared Power Platform data layer — this is why Copilot/AI capabilities
  are consistent across them.
- **Customer Insights**: Copilot turns natural-language prompts into actions — creating
  customer journeys and segments, analyzing data quality, refining content.
- **Security stack (Intune / Entra ID / Defender / Purview)**: Microsoft is actively
  converging identity (Entra), device management (Intune), security (Defender), and data
  governance (Purview) into one control plane; Intune integrates natively with Entra ID,
  Conditional Access, Defender for Endpoint, and Purview, and can manage Defender
  settings even on devices not enrolled in Intune.
- **Dynamics 365 Human Resources**: durable focus areas confirmed across multiple current
  sources — minimizing manual work across the employee lifecycle, recruiting/onboarding,
  personnel/compensation/benefits management, and performance management.

### Terminology verified

- "Microsoft Dataverse" (not "Common Data Service," its pre-2020 name) is current.
- "Microsoft Entra ID" (not "Azure Active Directory," its pre-2023 name) is current.
- "Business Central," "Dynamics 365 Sales," "Dynamics 365 Customer Insights," "Dynamics
  365 Human Resources," "Power BI," "Power Apps," "Power Automate," "Microsoft Intune,"
  "Microsoft Defender," "Microsoft Purview" are all current official product names — no
  renames found.

### Content changed

`intro` and `tools[].desc` text was refined across all 5 Microsoft 365/Dynamics 365
services — e.g. Business Central Finance's description now explicitly names the
Copilot-assisted bank-reconciliation/inventory-forecasting capability (a genuine,
currently-shipping, officially-documented feature, not a roadmap item); Dynamics 365
Sales' description now explicitly names the Dataverse foundation it shares with Customer
Service/Customer Insights (explaining *why* the platform's tools work together, not just
asserting that they do); Security & Device Management's description now frames the
identity/device/security/data-governance convergence, which is the current, officially
stated direction of the product suite, not a stale "each tool is separate" framing.

### Claims intentionally excluded

- No specific "2026 release wave" feature was cited as a permanent capability — release
  waves are time-boxed rollout plans, not stable product descriptions; citing one by name
  would make the page read as time-stamped and go stale. The *underlying, durable*
  capability each wave reinforces (e.g., HR's ongoing recruiting/onboarding focus) was
  kept; the wave-specific marketing language was not.
- No Microsoft partnership, certification, or "Microsoft Partner" badge claim was added —
  `BUSINESS_FACTS.md` confirms no such certification is verified anywhere in the
  codebase, and this workstream's own instructions explicitly prohibit it without
  verification.
- No implementation history, customer result, or project count was added.

### VectorWave-specific claims requiring verification

None added, for the same reason as Odoo — every rewritten sentence is either a Platform
Fact or a VectorWave Service statement ("VectorWave configures/connects X"), never a
historical claim.

---

## Summary table

| Platform | Services touched | Intro/tools rewritten? | New fields added? | VectorWave claims added |
|---|---|---|---|---|
| Zoho | 5 | No — preserved verbatim | Yes (problem, useCases, integrations) | None |
| Odoo | 5 | Yes — refined for current terminology/precision | Yes | None |
| Microsoft 365 / Dynamics 365 | 5 | Yes — refined for current terminology/precision | Yes | None |
| Custom Development | 4 | No — preserved verbatim | Yes | None |
