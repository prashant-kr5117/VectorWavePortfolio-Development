import type { StaticImageData } from "next/image";
import ZohoBundledSuiteImage from "@/src/services/zoho-bundled-suite.jpg";
import SalesImage from "@/src/services/sales.jpg";
import ItSupportImage from "@/src/services/it-support.jpg";
import ZohoFinanceImage from "@/src/services/zoho-finance.jpg";
import HumanResourcesImage from "@/src/services/human-resources.jpg";
import OdooBusinessSuiteImage from "@/src/services/odoo-business-suite.jpg";
import OdooSalesEcommerceImage from "@/src/services/odoo-sales-ecommerce.jpg";
import OdooInventoryOperationsImage from "@/src/services/odoo-inventory-operations.jpg";
import OdooAccountingImage from "@/src/services/odoo-accounting.jpg";
import OdooWorkforceHrImage from "@/src/services/odoo-workforce-hr.jpg";
import Microsoft365DynamicsSuiteImage from "@/src/services/microsoft-365-dynamics-suite.jpg";
import Dynamics365SalesImage from "@/src/services/dynamics-365-sales.jpg";
import MicrosoftSecurityDeviceManagementImage from "@/src/services/microsoft-security-device-management.jpg";
import BusinessCentralFinanceImage from "@/src/services/business-central-finance.jpg";
import Dynamics365HrImage from "@/src/services/dynamics-365-hr.jpg";
import MobileAppDevelopmentImage from "@/src/services/mobile-app-development.jpg";
import WebDevelopmentImage from "@/src/services/web-development.jpg";
import AiIntegrationImage from "@/src/services/ai-integration.jpg";
import WhatsappAutomationImage from "@/src/services/whatsapp-automation.jpg";

export type ServiceIcon =
  | "boxes"
  | "users"
  | "headset"
  | "calculator"
  | "user-cog"
  | "shopping-cart"
  | "package"
  | "shield-check"
  | "smartphone"
  | "globe"
  | "sparkles"
  | "message-circle"
  | "layers"
  | "puzzle"
  | "layout-grid"
  | "code";

export type ServiceTool = {
  name: string;
  desc: string;
};

export type PlatformSlug = "zoho" | "odoo" | "microsoft-365" | "custom-development";

export type Platform = {
  slug: PlatformSlug;
  name: string;
  short: string;
  icon: ServiceIcon;
};

export type ServiceCategory = {
  slug: string;
  platform: PlatformSlug;
  title: string;
  short: string;
  intro: string;
  /** The business problem this service exists to solve — shown before the solution. */
  problem: string;
  /** Short, concrete "who this is for" statements — not fabricated client claims. */
  useCases: string[];
  /** Systems this service commonly connects with — platform facts, not project claims. */
  integrations: string[];
  icon: ServiceIcon;
  tools: ServiceTool[];
  metaTitle: string;
  metaDescription: string;
  /** Generic, non-client-specific photography for the service's card/hero image. */
  image: StaticImageData;
};

export const platforms: Platform[] = [
  {
    slug: "zoho",
    name: "Zoho",
    short: "Sales, finance, HR and operations, unified in one connected suite.",
    icon: "layers",
  },
  {
    slug: "odoo",
    name: "Odoo",
    short: "A modular open-source ERP that scales with exactly what you need.",
    icon: "puzzle",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365",
    short: "Office, collaboration and Dynamics 365 working as one platform.",
    icon: "layout-grid",
  },
  {
    slug: "custom-development",
    name: "Custom Development",
    short: "Web, mobile and AI builds connected to the systems you already run.",
    icon: "code",
  },
];

/**
 * Platform-level architecture flow and implementation methodology — shared across every
 * service on that platform, rather than duplicated per service. This is intentional: the
 * underlying implementation approach genuinely doesn't differ between, say, Zoho Sales
 * and Zoho Finance, so representing it once per platform (not once per service) avoids
 * the near-duplicate-paragraph risk flagged in ai-optimization/reports/STAGE-2-BASELINE-REVIEW.md.
 * See ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 2.
 */
export type PlatformProfile = {
  /** Stage labels for the platform architecture diagram (components/services/PlatformArchitectureFlow.tsx). */
  architecture: string[];
  implementation: { step: string; detail: string }[];
  /** Contextual CTA label for this platform's service pages — see WORKSTREAM-04-RESULT.md Section 13. */
  ctaLabel: string;
};

export const platformProfiles: Record<PlatformSlug, PlatformProfile> = {
  zoho: {
    architecture: ["CRM", "Books", "Inventory", "Analytics", "Automation"],
    implementation: [
      { step: "Map", detail: "Document how sales, finance and operations actually run today." },
      { step: "Configure", detail: "Set up the right combination of Zoho apps around that process." },
      { step: "Connect", detail: "Link Zoho to your website, email and any tools you're keeping." },
      { step: "Go live & support", detail: "Migrate data, train the team, and stay available after launch." },
    ],
    ctaLabel: "Talk to a Zoho solution architect",
  },
  odoo: {
    architecture: ["CRM", "Sales", "Inventory", "Manufacturing", "Accounting", "Reporting"],
    implementation: [
      { step: "Scope modules", detail: "Choose only the Odoo apps the business actually needs." },
      { step: "Configure on one database", detail: "Set up workflows so every app shares the same data." },
      { step: "Customize with Studio", detail: "Adjust forms, views and reports without a full dev cycle." },
      { step: "Migrate & support", detail: "Move existing data across and stay available after go-live." },
    ],
    ctaLabel: "Talk to an Odoo implementation specialist",
  },
  "microsoft-365": {
    architecture: ["Sales", "Customer Service", "Finance", "Supply Chain", "Business Central", "Power Platform"],
    implementation: [
      { step: "Assess the estate", detail: "Review what's already licensed in Microsoft 365 and Dynamics 365." },
      { step: "Configure the platform", detail: "Set up Dynamics 365 or Business Central for finance, sales or operations." },
      { step: "Extend with Power Platform", detail: "Add Power Apps, Power Automate and Power BI where needed." },
      { step: "Secure & support", detail: "Apply identity/device policy and stay available after go-live." },
    ],
    ctaLabel: "Talk to a Microsoft 365 solution architect",
  },
  "custom-development": {
    architecture: ["Business requirement", "Architecture", "APIs", "Application", "Integrations", "Data", "Deployment"],
    implementation: [
      { step: "Define the requirement", detail: "Understand the workflow the platform doesn't already cover." },
      { step: "Design the architecture", detail: "Plan how the build connects to your existing systems." },
      { step: "Build & integrate", detail: "Develop the application and connect it via API to your CRM/ERP." },
      { step: "Deploy & support", detail: "Ship it, monitor it, and keep it running." },
    ],
    ctaLabel: "Discuss your project",
  },
};

export const serviceCategories: ServiceCategory[] = [
  // ---- Zoho ----
  // Zoho intro/tools content preserved verbatim from before Workstream 4 — per
  // ai-optimization/reports/SERVICE-CONTENT-RESEARCH.md, this was already the strongest,
  // most specific content on the site and was not rewritten. Only problem/useCases/
  // integrations were added.
  {
    slug: "zoho-bundled-suite",
    image: ZohoBundledSuiteImage,
    platform: "zoho",
    title: "Zoho Bundled Suite",
    short: "CRM, Finance, HR and Analytics set up as one connected suite.",
    intro:
      "Full-suite Zoho implementation covering everything from initial setup to customisation and go-live, all built around how your business actually works. We map your existing processes and configure the right combination of apps for better team efficiency and collaboration.",
    problem:
      "Sales, finance, HR and reporting often run in disconnected tools that don't share data, so numbers have to be reconciled by hand.",
    useCases: [
      "A business consolidating multiple point tools into one system",
      "A company standardizing process across departments for the first time",
      "A team that wants sales, finance and HR reporting from a single source of truth",
    ],
    integrations: ["Zoho CRM Plus", "Zoho Finance Plus", "Website & lead forms", "Email & calendar"],
    icon: "boxes",
    metaTitle: "Zoho Bundled Suite | Zoho Implementation & Setup Services",
    metaDescription:
      "Get every Zoho tool configured and live, built around your business. End-to-end implementation, one trusted partner, zero guesswork.",
    tools: [
      {
        name: "Zoho One",
        desc: "A complete business operating system integrating sales, marketing, finance, HR, and operations with real-time data access.",
      },
      {
        name: "Zoho CRM Plus",
        desc: "Consolidates sales, marketing, customer support, and analytics into a single platform for comprehensive customer visibility.",
      },
      {
        name: "Zoho Creator Plus",
        desc: "Enables custom app development and workflow automation without needing a full development team.",
      },
      {
        name: "Zoho Finance Plus",
        desc: "Unifies accounting, invoicing, inventory, expenses, and billing functions.",
      },
      {
        name: "Zoho People Plus",
        desc: "Covers the full employee journey from onboarding through performance tracking and learning.",
      },
      {
        name: "Zoho Projects Plus",
        desc: "Provides centralised project planning, task management, time tracking, and team collaboration.",
      },
      {
        name: "Zoho Workplace",
        desc: "Combines business email, document collaboration, video meetings, and team messaging.",
      },
    ],
  },
  {
    slug: "sales",
    image: SalesImage,
    platform: "zoho",
    title: "Sales",
    short: "Pipeline automation, lead capture and reporting built around your process.",
    intro:
      "Accelerate revenue growth and streamline your sales process with powerful Zoho sales applications. From lead capture to deal closure and customer engagement, these tools help businesses automate workflows, improve conversions, and deliver exceptional customer experiences.",
    problem:
      "Leads get lost between first contact and a closed deal when there's no shared pipeline, so follow-ups depend on memory rather than a system.",
    useCases: [
      "A sales team without a shared CRM today",
      "A business that wants automated lead capture from its website",
      "A team that needs live pipeline reporting for management",
    ],
    integrations: ["Zoho Finance (quote-to-invoice)", "Website & landing pages", "WhatsApp / live chat", "Email"],
    icon: "users",
    metaTitle: "Zoho Sales Tools | Capture Leads & Close Deals Faster",
    metaDescription:
      "VectorWave sets up Zoho CRM, SalesIQ, Bigin, and Bookings to help your team capture more leads, automate follow-ups, and grow revenue faster.",
    tools: [
      {
        name: "Zoho CRM",
        desc: "Manage leads, contacts, and sales pipelines with automation, analytics, and AI insights that help teams close deals faster.",
      },
      {
        name: "Zoho Bigin",
        desc: "A straightforward CRM built for small businesses. Track deals, manage pipelines, and stay on top of customer interactions without the complexity.",
      },
      {
        name: "Zoho SalesIQ",
        desc: "Chat with website visitors in real time, track their behaviour, and turn prospects into qualified leads using automation and live chat tools.",
      },
      {
        name: "Zoho Bookings",
        desc: "Let customers book appointments online, sync with the calendar automatically, and send instant confirmations, no back and forth needed.",
      },
      {
        name: "Zoho Canvas",
        desc: "Redesign the CRM interface to match the way the team actually works, more intuitive, more visual, easier to use every day.",
      },
    ],
  },
  {
    slug: "it-support",
    image: ItSupportImage,
    platform: "zoho",
    title: "IT & Support",
    short: "Infrastructure, helpdesk and reliable uptime for your team.",
    intro:
      "Good support keeps customers happy and businesses running. Zoho's tools enable teams to handle tickets faster, resolve issues remotely, and deliver customer experiences people actually appreciate.",
    problem:
      "Support requests spread across email and chat make it hard to track response times or spot recurring issues.",
    useCases: [
      "A support team without a shared ticketing system",
      "A business that needs SLA tracking on response times",
      "Field teams that need remote-access troubleshooting",
    ],
    integrations: ["Zoho CRM (customer context)", "Email & phone", "Remote-access tools", "Knowledge base / website"],
    icon: "headset",
    metaTitle: "Zoho IT & Support | Helpdesk & Remote Support Tools",
    metaDescription:
      "VectorWave implements Zoho Desk, Assist, Lens, and FSM to help your support team resolve issues faster and keep customers satisfied.",
    tools: [
      {
        name: "Zoho Desk",
        desc: "Manages customer tickets with automated workflows, SLA tracking, and multi-channel support to prevent missed requests and maintain response times.",
      },
      {
        name: "Zoho Assist",
        desc: "Provides remote system connectivity for instant issue resolution, reducing downtime and accelerating IT team response capabilities.",
      },
      {
        name: "Zoho Lens",
        desc: "Delivers augmented reality guidance for real-time problem resolution without requiring on-site visits.",
      },
      {
        name: "Zoho FSM",
        desc: "Coordinates field service teams through intelligent scheduling, work order management, and mobile access for technicians.",
      },
    ],
  },
  {
    slug: "zoho-finance",
    image: ZohoFinanceImage,
    platform: "zoho",
    title: "Zoho Finance",
    short: "Invoicing, expenses, compliance and reporting, kept in sync.",
    intro:
      "Zoho's financial tools consolidate accounting, billing, expenses, and inventory management into one unified platform, automating routine tasks and giving real-time visibility into business financial performance.",
    problem:
      "Manual invoicing and expense tracking make it hard to know real-time cash position or stay ahead of compliance deadlines.",
    useCases: [
      "A business still invoicing manually or from spreadsheets",
      "A company that needs GST/VAT-compliant accounting",
      "A team that wants automated payment reminders and reconciliation",
    ],
    integrations: ["Zoho CRM (quote-to-cash)", "Bank feeds", "Payment gateways", "Zoho Inventory"],
    icon: "calculator",
    metaTitle: "Zoho Finance Solutions | Accounting, Billing & Inventory",
    metaDescription:
      "Zoho Books, Invoice, Inventory, and more all connected in one system. VectorWave sets it up so you always know exactly where your business stands financially.",
    tools: [
      {
        name: "Zoho Books",
        desc: "Accounting, GST/VAT compliance, invoicing, and bank reconciliation are all handled from one cloud-based platform.",
      },
      {
        name: "Zoho Invoice",
        desc: "Create professional invoices, automate payment reminders, and enable online payments to improve cash flow management.",
      },
      {
        name: "Zoho Expense",
        desc: "Employee expenses are tracked, approvals are automated, and spending stays under control with real-time reporting and policy rules.",
      },
      {
        name: "Zoho Inventory",
        desc: "Maintain accurate stock levels, purchase orders, and order fulfilment with up-to-date inventory data.",
      },
      {
        name: "Zoho Checkout",
        desc: "Collect one-time and recurring payments through secure, branded payment pages.",
      },
      {
        name: "Zoho Billing",
        desc: "Subscription billing, recurring invoices, and revenue tracking are automated so managing the customer billing cycle becomes effortless.",
      },
      {
        name: "Zoho Subscriptions",
        desc: "Manage subscription plans, handle upgrades and renewals, and automate billing with flexible pricing options.",
      },
    ],
  },
  {
    slug: "human-resources",
    image: HumanResourcesImage,
    platform: "zoho",
    title: "Human Resources",
    short: "Recruitment, onboarding, attendance and payroll workflows.",
    intro:
      "Managing people is one of the most important parts of running a business. Zoho's HR tools bring recruitment, onboarding, attendance, payroll, and performance management into one connected system.",
    problem:
      "Recruitment, attendance and payroll tracked in spreadsheets create errors and slow down every people process.",
    useCases: [
      "A growing team outgrowing spreadsheet-based HR",
      "A business that needs compliant, automated payroll",
      "A company that wants a self-service portal for leave and attendance",
    ],
    integrations: ["Zoho Finance (payroll postings)", "Biometric / attendance devices", "Email", "Job boards"],
    icon: "user-cog",
    metaTitle: "Zoho HR Solutions | People, Recruit & Payroll",
    metaDescription:
      "Manage your team from hire to retire. VectorWave implements Zoho People, Recruit, and Payroll to simplify HR - accurately, automatically, and compliantly.",
    tools: [
      {
        name: "Zoho People",
        desc: "A complete HR platform that manages the full employee journey, from the day someone joins to the day they leave, with automated workflows and real-time reporting built in.",
      },
      {
        name: "Zoho Recruit",
        desc: "A recruitment management system that simplifies hiring for businesses and staffing agencies, from posting jobs to scheduling interviews and making offers.",
      },
      {
        name: "Zoho Payroll",
        desc: "A reliable payroll solution that automates salary processing, tax calculations, and statutory compliance so every team member gets paid accurately and on time, every time.",
      },
    ],
  },

  // ---- Odoo ----
  // intro/tools refined against current official Odoo sources — see
  // ai-optimization/reports/SERVICE-CONTENT-RESEARCH.md for exact sources and what changed.
  {
    slug: "odoo-business-suite",
    image: OdooBusinessSuiteImage,
    platform: "odoo",
    title: "Odoo Business Suite",
    short: "CRM, inventory, accounting and HR running on one connected database.",
    intro:
      "Odoo's modular design — 50+ integrated apps sharing one database — means you only run what your business needs. We implement and connect the right combination of Odoo apps so sales, finance, inventory, and HR share the same data instead of living in separate systems.",
    problem:
      "Running CRM, inventory, accounting and HR on separate systems means the same data gets entered more than once and drifts out of sync.",
    useCases: [
      "A business consolidating multiple disconnected tools onto one database",
      "A company that wants sales, inventory and finance to update each other automatically",
      "A team planning to add modules, like manufacturing, as it grows",
    ],
    integrations: ["Odoo Website & eCommerce", "Bank feeds", "Barcode scanners", "Third-party apps via Odoo's API"],
    icon: "boxes",
    metaTitle: "Odoo Business Suite | Odoo ERP Implementation Services",
    metaDescription:
      "VectorWave implements Odoo's CRM, Inventory, Accounting, and HR apps on one database, so every part of your business shares the same data.",
    tools: [
      {
        name: "Odoo CRM & Sales",
        desc: "Captures leads automatically from your website, email or database imports, and manages the full pipeline from first contact through to quotation and order.",
      },
      {
        name: "Odoo Inventory",
        desc: "Updates stock in real time as products are received, moved or sold, with barcode scanning and multi-warehouse support visible instantly in Sales and Accounting.",
      },
      {
        name: "Odoo Accounting",
        desc: "Handles invoicing, bank reconciliation, tax compliance, and financial reporting in one place.",
      },
      {
        name: "Odoo Employees",
        desc: "Centralises employee profiles, contracts and org structure, with onboarding and offboarding plans that trigger the right steps automatically.",
      },
      {
        name: "Odoo Studio",
        desc: "A no-code, drag-and-drop builder for custom forms, views, reports and workflows — configuration changes without a full development cycle.",
      },
    ],
  },
  {
    slug: "odoo-sales-ecommerce",
    image: OdooSalesEcommerceImage,
    platform: "odoo",
    title: "Sales & eCommerce",
    short: "Quotes, storefronts and subscriptions connected to the same data.",
    intro:
      "Odoo blurs the line between CRM and storefront, letting you sell however your customers show up — in a shop, online, or through a sales rep — without juggling separate systems for each. We configure the tools that fit how you actually sell.",
    problem:
      "Selling in-store, online and through reps on separate systems means stock and pricing can go out of sync between channels.",
    useCases: [
      "A business selling through more than one channel today",
      "A company launching a subscription or recurring-revenue product",
      "A team that wants quotes to flow straight into fulfilment and invoicing",
    ],
    integrations: ["Odoo Inventory (stock sync)", "Payment gateways", "Shipping carriers", "Odoo Accounting"],
    icon: "shopping-cart",
    metaTitle: "Odoo Sales & eCommerce | CRM, Storefront & Subscriptions",
    metaDescription:
      "VectorWave sets up Odoo CRM, Sales, Website & eCommerce, and Subscriptions so you can sell in-store, online, or through a rep from one system.",
    tools: [
      {
        name: "Odoo CRM",
        desc: "Tracks leads, opportunities, and pipeline stages with activity reminders and win/loss reporting.",
      },
      {
        name: "Odoo Sales",
        desc: "Generates quotations, sales orders, and contracts that flow straight into invoicing and delivery.",
      },
      {
        name: "Odoo Website & eCommerce",
        desc: "Builds your online storefront with real-time stock sync across web, marketplace and POS, plus support for subscriptions and downloadable products.",
      },
      {
        name: "Odoo Subscriptions",
        desc: "Automates recurring billing, renewals, and customer upgrades for subscription revenue.",
      },
    ],
  },
  {
    slug: "odoo-inventory-operations",
    image: OdooInventoryOperationsImage,
    platform: "odoo",
    title: "Inventory & Operations",
    short: "Stock, purchasing and manufacturing kept accurate and in sync.",
    intro:
      "This is where Odoo pulls ahead of most CRM-first platforms, real operational control. We set up inventory, purchasing, and manufacturing so stock levels, production runs, and vendor orders are always accurate and always in sync.",
    problem:
      "Manual stock counts and disconnected purchasing lead to stockouts, overstock, or production delays waiting on components.",
    useCases: [
      "A business with multiple warehouses to keep in sync",
      "A manufacturer that needs BoM-driven production planning",
      "A team that wants automated reordering instead of manual purchase requests",
    ],
    integrations: ["Odoo Sales & eCommerce", "Odoo Accounting", "Barcode scanners", "Vendor / supplier systems"],
    icon: "package",
    metaTitle: "Odoo Inventory & Operations | Stock, Manufacturing & Purchase",
    metaDescription:
      "VectorWave configures Odoo Inventory, Manufacturing, Purchase, Quality, and Maintenance for accurate stock levels and reliable production runs.",
    tools: [
      {
        name: "Odoo Inventory",
        desc: "Double-entry stock tracking across multiple warehouses, with barcode scanning and transfers.",
      },
      {
        name: "Odoo Manufacturing",
        desc: "Brings production planning, Bills of Materials and work-order tracking into one interface, with built-in quality checks.",
      },
      {
        name: "Odoo Purchase",
        desc: "Automates vendor orders and reordering rules based on real stock levels.",
      },
      {
        name: "Odoo Quality",
        desc: "Sets checkpoints and inspection rules to catch issues before products ship.",
      },
      {
        name: "Odoo Maintenance",
        desc: "Tracks equipment upkeep and preventive maintenance schedules to reduce downtime.",
      },
    ],
  },
  {
    slug: "odoo-accounting",
    image: OdooAccountingImage,
    platform: "odoo",
    title: "Odoo Accounting",
    short: "Invoicing, reconciliation and reporting that update the moment you sell.",
    intro:
      "Odoo's finance apps keep invoicing, expenses, and reporting in sync with the rest of your business, so your numbers are accurate the moment a sale or purchase happens, not days later.",
    problem:
      "Books that update days after a sale or purchase make it hard to trust the numbers management is looking at.",
    useCases: [
      "A business closing the books manually or with delayed exports",
      "A company that needs multicurrency accounting",
      "A team that wants live financial dashboards instead of static reports",
    ],
    integrations: ["Odoo Sales / Inventory / Manufacturing", "Bank feeds", "Odoo Spreadsheet (BI)", "E-signature for approvals"],
    icon: "calculator",
    metaTitle: "Odoo Accounting | Invoicing, Reconciliation & Reporting",
    metaDescription:
      "VectorWave implements Odoo Accounting, Invoicing, Expenses, and BI so your financial reporting reflects real-time business activity.",
    tools: [
      {
        name: "Odoo Accounting",
        desc: "Full double-entry accounting with bank sync, reconciliation, and multicurrency support.",
      },
      {
        name: "Odoo Invoicing",
        desc: "Creates and sends invoices automatically from sales orders, delivery, or contracts.",
      },
      {
        name: "Odoo Expenses",
        desc: "Lets staff submit and route expense claims for approval, synced directly to the books.",
      },
      {
        name: "Odoo Spreadsheet (BI)",
        desc: "Live financial dashboards and reports built on real-time data, not exports.",
      },
      {
        name: "Odoo Documents & Sign",
        desc: "Stores financial records and handles e-signatures for approvals and contracts.",
      },
    ],
  },
  {
    slug: "odoo-workforce-hr",
    image: OdooWorkforceHrImage,
    platform: "odoo",
    title: "Workforce & HR",
    short: "Recruitment, attendance and reviews without the spreadsheets.",
    intro:
      "From the first interview to everyday attendance, we set up Odoo's HR apps to handle the employee lifecycle without spreadsheets or manual tracking.",
    problem:
      "Hiring, attendance and reviews tracked across spreadsheets and email slow down every people decision.",
    useCases: [
      "A business without a structured hiring pipeline today",
      "A company that needs self-service leave requests and approvals",
      "A team that wants recurring, structured performance reviews",
    ],
    integrations: ["Odoo Payroll (where implemented)", "Company website (job postings)", "Email", "Attendance / biometric devices"],
    icon: "user-cog",
    metaTitle: "Odoo Workforce & HR | Employees, Recruitment & Time Off",
    metaDescription:
      "VectorWave sets up Odoo Employees, Recruitment, Time Off, Appraisals, and Referrals to run the full employee lifecycle without spreadsheets.",
    tools: [
      {
        name: "Odoo Employees",
        desc: "Centralises employee profiles, contracts, documents and org structure, with onboarding and offboarding plans that trigger the right steps automatically.",
      },
      {
        name: "Odoo Recruitment",
        desc: "Manages hiring pipelines with resume tracking, interview scheduling, and job postings published directly to your website.",
      },
      {
        name: "Odoo Time Off",
        desc: "Leave requests update timesheets, attendance and balances in real time, with single- or two-level approval.",
      },
      {
        name: "Odoo Appraisals",
        desc: "Runs structured review cycles with 360° feedback and real-time goal tracking linked to each appraisal.",
      },
      {
        name: "Odoo Referrals",
        desc: "Turns your own team into a recruiting channel with built-in referral tracking and rewards.",
      },
    ],
  },

  // ---- Microsoft 365 ----
  // intro/tools refined against current official Microsoft sources — see
  // ai-optimization/reports/SERVICE-CONTENT-RESEARCH.md for exact sources and what changed.
  {
    slug: "microsoft-365-dynamics-suite",
    image: Microsoft365DynamicsSuiteImage,
    platform: "microsoft-365",
    title: "Microsoft 365 & Dynamics Suite",
    short: "Office apps and Dynamics 365 set up to work as one platform.",
    intro:
      "Microsoft 365 and Dynamics 365 already run in the background of most businesses, we just make sure they're set up to work together. We implement and connect the Microsoft apps your team needs for collaboration, sales, and finance on one shared platform.",
    problem:
      "Microsoft 365 and Dynamics 365 often run side by side without being configured to actually work together, so teams still export data between them by hand.",
    useCases: [
      "A business already licensed for Microsoft 365 that wants Dynamics 365 connected to it, not separate",
      "A company that wants finance, sales and collaboration on one platform",
      "A team that wants custom internal tools without a full dev team, via Power Platform",
    ],
    integrations: ["SharePoint & OneDrive", "Outlook & Teams", "Power BI", "Existing line-of-business systems via Power Automate"],
    icon: "boxes",
    metaTitle: "Microsoft 365 & Dynamics Suite | Connected Business Platform",
    metaDescription:
      "VectorWave connects Microsoft 365, Dynamics 365 Business Central and Sales, SharePoint, and Power Platform into one working system.",
    tools: [
      {
        name: "Microsoft 365 Core Apps",
        desc: "Word, Excel, PowerPoint, Outlook, and Teams set up and licensed correctly for your team.",
      },
      {
        name: "Dynamics 365 Business Central",
        desc: "A connected ERP covering finance, supply chain, sales and projects, with Copilot built in for bank reconciliation, inventory forecasting and sales-line suggestions.",
      },
      {
        name: "Dynamics 365 Sales",
        desc: "Manages your pipeline and customer data on the same platform as your inbox and calendar.",
      },
      {
        name: "SharePoint & OneDrive",
        desc: "Centralised file storage and team sites so documents don't live in scattered inboxes.",
      },
      {
        name: "Power Platform",
        desc: "Power Apps and Power Automate to build custom workflows and internal tools without a dev team.",
      },
    ],
  },
  {
    slug: "dynamics-365-sales",
    image: Dynamics365SalesImage,
    platform: "microsoft-365",
    title: "Dynamics 365 Sales",
    short: "Pipeline and customer data managed right inside Outlook and Teams.",
    intro:
      "Sell where your team already works. We configure Dynamics 365's sales tools to plug directly into Outlook and Teams, so your pipeline stays current without extra logins or duplicate data entry.",
    problem:
      "A sales team working out of Outlook and spreadsheets loses pipeline visibility the moment a deal moves between people.",
    useCases: [
      "A business already on Microsoft 365 wanting its CRM in the same place as email and calendar",
      "A team that wants AI-assisted deal insights drawn from email and meeting activity",
      "A company that needs live sales reporting in Power BI",
    ],
    integrations: ["Outlook & Teams", "Microsoft Dataverse", "Power BI", "Dynamics 365 Customer Insights"],
    icon: "users",
    metaTitle: "Dynamics 365 Sales | CRM Inside Outlook & Teams",
    metaDescription:
      "VectorWave configures Dynamics 365 Sales, Customer Insights, Bookings, and Power BI so your pipeline stays current inside Microsoft 365.",
    tools: [
      {
        name: "Dynamics 365 Sales",
        desc: "Tracks leads, opportunities and forecasts, with Copilot drawing on CRM data and Microsoft 365 signals like email and meeting recaps to surface next-best actions.",
      },
      {
        name: "Dynamics 365 Customer Insights",
        desc: "Builds customer journeys and segments from unified data, with Copilot turning plain-language requests into ready-to-use segments.",
      },
      {
        name: "Microsoft Bookings",
        desc: "Lets customers schedule appointments online, synced automatically with Outlook calendars.",
      },
      {
        name: "Microsoft Teams Sales Integration",
        desc: "Brings CRM records, call notes, and follow-ups directly into Teams conversations.",
      },
      {
        name: "Power BI",
        desc: "Live sales dashboards and reporting built on the same data as your CRM.",
      },
    ],
  },
  {
    slug: "microsoft-security-device-management",
    image: MicrosoftSecurityDeviceManagementImage,
    platform: "microsoft-365",
    title: "Security & Device Management",
    short: "Enterprise-grade identity, device and threat protection from day one.",
    intro:
      "This is Microsoft's real strength: enterprise-grade security that most other platforms simply don't offer natively. We set up device management, identity protection, and threat detection — increasingly one connected control plane rather than separate tools — so your business is secured from day one, not patched together after the fact.",
    problem:
      "Laptops, phones and logins managed separately make it hard to know what's actually protected, or to respond quickly when something isn't.",
    useCases: [
      "A business without a central device-management console today",
      "A company that needs multi-factor authentication enforced consistently",
      "A team that needs compliance-ready data-loss prevention",
    ],
    integrations: ["Microsoft Entra ID (identity)", "Microsoft 365 apps", "Existing endpoints (laptops, phones)", "Conditional access policies"],
    icon: "shield-check",
    metaTitle: "Microsoft Security & Device Management | Intune, Entra, Defender",
    metaDescription:
      "VectorWave sets up Microsoft Intune, Entra ID, Defender, and Purview for enterprise-grade device management and threat protection.",
    tools: [
      {
        name: "Microsoft Intune",
        desc: "Manages and protects laptops, phones and apps from one console, and can enforce security policy even on devices not fully enrolled.",
      },
      {
        name: "Microsoft Entra ID",
        desc: "Secures logins with multi-factor authentication and conditional access policies.",
      },
      {
        name: "Microsoft Defender",
        desc: "Detects and blocks phishing, malware, and other threats across email and endpoints.",
      },
      {
        name: "Microsoft Purview",
        desc: "Governs and protects sensitive data with built-in compliance and data loss prevention.",
      },
    ],
  },
  {
    slug: "business-central-finance",
    image: BusinessCentralFinanceImage,
    platform: "microsoft-365",
    title: "Business Central Finance",
    short: "Accounting, purchasing and reporting on live business data.",
    intro:
      "Dynamics 365 Business Central brings your finance function onto the same platform as sales and operations, so reporting reflects what's actually happening in the business, not last month's export.",
    problem:
      "Finance running separately from sales and operations means reports reflect last month, not what's happening now.",
    useCases: [
      "A business outgrowing entry-level accounting software",
      "A company that needs purchasing and inventory tied directly to the ledger",
      "A team that wants Copilot-assisted bank reconciliation and forecasting",
    ],
    integrations: ["Dynamics 365 Sales", "Power BI", "Bank feeds", "Microsoft 365 (Excel/Outlook)"],
    icon: "calculator",
    metaTitle: "Business Central Finance | Dynamics 365 Accounting & Reporting",
    metaDescription:
      "VectorWave implements Dynamics 365 Business Central's finance, purchasing, and inventory apps with live Power BI reporting built in.",
    tools: [
      {
        name: "Business Central Finance",
        desc: "Core accounting, multi-entity ledgers and financial reporting, with Copilot-assisted bank reconciliation built in.",
      },
      {
        name: "Business Central Sales & Purchasing",
        desc: "Connects quotes, orders, and vendor bills directly to the general ledger.",
      },
      {
        name: "Business Central Inventory",
        desc: "Tracks stock and costing in real time, tied to purchasing and sales.",
      },
      {
        name: "Power BI Financial Reporting",
        desc: "Live dashboards for cash flow, budgets, and performance built on live data.",
      },
      {
        name: "Approvals & Workflow",
        desc: "Automated approval chains for invoices, expenses, and purchase orders.",
      },
    ],
  },
  {
    slug: "dynamics-365-hr",
    image: Dynamics365HrImage,
    platform: "microsoft-365",
    title: "Dynamics 365 HR",
    short: "Recruitment, leave and performance in one connected system.",
    intro:
      "From recruitment through performance reviews, we configure Dynamics 365 Human Resources so employee data, leave, and reporting sit in one place instead of scattered spreadsheets and forms.",
    problem:
      "Recruitment, leave and performance tracked in separate spreadsheets and forms slow down onboarding and make workforce reporting unreliable.",
    useCases: [
      "A business consolidating HR data currently spread across spreadsheets",
      "A company that wants structured recruiting and onboarding workflows",
      "A team that needs workforce reporting tied to live headcount data",
    ],
    integrations: ["Microsoft 365 (Outlook, Teams)", "Power BI", "Dynamics 365 Finance / Business Central (where implemented)", "Payroll systems"],
    icon: "user-cog",
    metaTitle: "Dynamics 365 HR | Recruitment, Leave & Performance",
    metaDescription:
      "VectorWave configures Dynamics 365 Human Resources so employee records, leave, and performance reviews sit in one connected system.",
    tools: [
      {
        name: "Employee Records",
        desc: "A central profile for every employee, covering contracts, roles, and org structure.",
      },
      {
        name: "Recruitment & Onboarding",
        desc: "Manages job requisitions, candidate tracking, and structured onboarding plans.",
      },
      {
        name: "Leave & Absence Management",
        desc: "Handles time off requests, balances, and approvals with self-service access.",
      },
      {
        name: "Performance Management",
        desc: "Runs goal tracking and review cycles tied to individual and team performance.",
      },
      {
        name: "Workforce Reporting",
        desc: "Power BI backed reporting on headcount and workforce trends.",
      },
    ],
  },

  // ---- Custom Development ----
  // Content preserved verbatim from before Workstream 4 — not flagged as weak/generic
  // by Stage 2, and describes VectorWave's own build practice rather than a third-party
  // product needing external verification. Only problem/useCases/integrations were added.
  {
    slug: "mobile-app-development",
    image: MobileAppDevelopmentImage,
    platform: "custom-development",
    title: "Mobile App Development",
    short: "Native and cross-platform apps built around how your team works.",
    intro:
      "We design and build mobile apps for iOS and Android that extend your business systems into the field, whether that's a sales team, service technicians, or customers who need self-service on the go. Every app is built to talk to the platforms you already run, not as a bolt-on.",
    problem:
      "Field teams without mobile access to CRM or ERP data end up re-entering the same information back at a desk.",
    useCases: [
      "Field sales or service teams who need CRM/ERP access on the go",
      "A business that needs offline-capable data capture",
      "A company that wants a customer-facing self-service app",
    ],
    integrations: ["Existing CRM/ERP (Zoho, Odoo, Dynamics 365)", "Push notification services", "Backend APIs", "App Store / Google Play"],
    icon: "smartphone",
    metaTitle: "Mobile App Development | iOS & Android Apps",
    metaDescription:
      "VectorWave builds native and cross-platform mobile apps connected to your CRM or ERP, built for field teams, sales, and customer self-service.",
    tools: [
      {
        name: "iOS & Android Apps",
        desc: "Native or cross-platform builds tailored to your workflow, published and maintained end to end.",
      },
      {
        name: "Field & Sales Apps",
        desc: "Mobile access to CRM and ERP data, so field teams can update records, capture signatures, and log visits without a laptop.",
      },
      {
        name: "Offline-First Design",
        desc: "Apps that keep working without a connection and sync automatically once back online.",
      },
      {
        name: "App Store Management",
        desc: "Handles submission, updates, and compliance across the Apple App Store and Google Play.",
      },
      {
        name: "Push Notifications & Alerts",
        desc: "Keep customers and staff informed in real time, tied directly to backend events.",
      },
    ],
  },
  {
    slug: "web-development",
    image: WebDevelopmentImage,
    platform: "custom-development",
    title: "Web Development",
    short: "Websites, portals and e-commerce builds connected to the systems behind them.",
    intro:
      "A website that isn't connected to your CRM or ERP is just a brochure. We build business websites, customer portals, and online stores that pull and push data from the platforms you run, so leads, orders, and support requests land exactly where your team already works.",
    problem:
      "A website that doesn't talk to the CRM or ERP behind it means leads and orders have to be re-entered by hand.",
    useCases: [
      "A business whose current website isn't connected to its CRM/ERP",
      "A company that needs a customer self-service portal",
      "A team launching or replatforming an online store",
    ],
    integrations: ["Zoho / Odoo / Microsoft 365 (via API)", "Payment gateways", "Email & marketing tools", "Analytics"],
    icon: "globe",
    metaTitle: "Web Development | Business Websites & E-Commerce",
    metaDescription:
      "VectorWave builds websites, online stores, and customer portals connected directly to the CRM or ERP systems behind them.",
    tools: [
      {
        name: "Business Websites",
        desc: "Fast, SEO-ready sites built on modern frameworks, designed to convert visitors into leads.",
      },
      {
        name: "E-Commerce",
        desc: "Online stores connected directly to inventory, pricing, and order fulfilment, no manual syncing.",
      },
      {
        name: "Customer Portals",
        desc: "Self-service login areas for invoices, tickets, or order status, pulled live from your backend.",
      },
      {
        name: "API & Integration",
        desc: "Connects your website to Zoho, Odoo, Microsoft 365, or any third-party system you rely on.",
      },
      {
        name: "Ongoing Support & Hosting",
        desc: "Monitoring, updates, and hosting so the site stays fast and secure after launch.",
      },
    ],
  },
  {
    slug: "ai-integration",
    image: AiIntegrationImage,
    platform: "custom-development",
    title: "AI Integration",
    short: "Practical AI embedded into the apps and workflows you already use.",
    intro:
      "Most businesses don't need a chatbot for the sake of it, they need AI that removes a specific bottleneck. We identify where AI actually pays off in your operations and build it directly into your CRM, ERP, or internal tools, from automated data entry to intelligent document processing.",
    problem:
      "Repetitive data entry and manual document processing take up time a small team doesn't have to spare.",
    useCases: [
      "A business with high-volume manual data entry",
      "A team that wants forecasts or trends surfaced automatically from existing CRM/ERP data",
      "A company exploring an internal AI assistant trained on its own processes",
    ],
    integrations: ["Existing CRM/ERP (Zoho, Odoo, Dynamics 365)", "Document/email sources", "BI dashboards", "Third-party AI model providers"],
    icon: "sparkles",
    metaTitle: "AI Integration | Practical AI for Business Systems",
    metaDescription:
      "VectorWave embeds AI into your CRM, ERP, and internal tools to automate data entry, surface insights, and remove real bottlenecks.",
    tools: [
      {
        name: "AI-Assisted Workflows",
        desc: "Automates repetitive data entry, tagging, and routing inside your existing systems.",
      },
      {
        name: "Document & Data Extraction",
        desc: "Pulls structured data out of invoices, forms, and emails automatically.",
      },
      {
        name: "Predictive Insights",
        desc: "Surfaces trends and forecasts inside your CRM or BI dashboards using your own data.",
      },
      {
        name: "Custom AI Assistants",
        desc: "Internal tools trained on your business processes to answer questions and handle routine requests.",
      },
      {
        name: "Model Integration",
        desc: "Connects leading AI providers securely into your existing applications.",
      },
    ],
  },
  {
    slug: "whatsapp-automation",
    image: WhatsappAutomationImage,
    platform: "custom-development",
    title: "WhatsApp Automation",
    short: "Automated messaging and chat flows built into WhatsApp Business.",
    intro:
      "WhatsApp is often the fastest way to reach customers, but manual replies don't scale. We set up WhatsApp Business API automation for order updates, support flows, and marketing messages, connected directly to your CRM so conversations stay in context.",
    problem:
      "Manually replying to every order update, booking confirmation or FAQ on WhatsApp doesn't scale as volume grows.",
    useCases: [
      "A business fielding high WhatsApp message volume manually today",
      "A company that wants order/appointment confirmations sent automatically",
      "A team that needs WhatsApp conversations logged against the right CRM record",
    ],
    integrations: ["Zoho / Odoo / Dynamics 365 CRM", "WhatsApp Business API", "Order/booking systems", "Live agent handoff"],
    icon: "message-circle",
    metaTitle: "WhatsApp Automation | Business API & Chat Flows",
    metaDescription:
      "VectorWave sets up WhatsApp Business API automation for order updates, support flows, and CRM-connected customer conversations.",
    tools: [
      {
        name: "WhatsApp Business API Setup",
        desc: "Verified business accounts and messaging infrastructure configured end to end.",
      },
      {
        name: "Automated Chat Flows",
        desc: "Order confirmations, appointment reminders, and FAQs handled without a human reply.",
      },
      {
        name: "CRM-Connected Messaging",
        desc: "Conversations sync directly into Zoho, Odoo, or Dynamics so context is never lost.",
      },
      {
        name: "Broadcast & Campaigns",
        desc: "Sends targeted updates and promotions to opted-in customer segments.",
      },
      {
        name: "Support Handoff",
        desc: "Routes complex conversations to a live agent with full chat history intact.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((s) => s.slug === slug);
}

export function getServicesByPlatform(platform: PlatformSlug): ServiceCategory[] {
  return serviceCategories.filter((s) => s.platform === platform);
}

export function getPlatform(slug: PlatformSlug): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

export function getPlatformProfile(slug: PlatformSlug): PlatformProfile {
  return platformProfiles[slug];
}

/**
 * Related services for a given service: same-platform siblings first, plus a small,
 * business-sensible cross-platform recommendation set (every platform implementation
 * benefits from automation/integration/a connected front-end — see
 * ai-optimization/reports/WORKSTREAM-04-RESULT.md Section 8 for the reasoning). Custom
 * Development services only link to their own siblings, since they already are the
 * "integration" layer other services point to.
 */
export function getRelatedServices(service: ServiceCategory): ServiceCategory[] {
  const siblings = getServicesByPlatform(service.platform).filter((s) => s.slug !== service.slug);

  if (service.platform === "custom-development") {
    return siblings;
  }

  const crossPlatformSlugs = ["ai-integration", "web-development"];
  const crossPlatform = crossPlatformSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceCategory => Boolean(s));

  return [...siblings, ...crossPlatform];
}
