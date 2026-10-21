import {
  BarChart3,
  BellRing,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileSignature,
  Inbox,
  LayoutDashboard,
  MessagesSquare,
  Route,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the dedicated /industries/real-estate page (app/industries/real-estate).
 * Sourced from the marketing team's Real Estate content strategy (the four pillars:
 * What Is a Real Estate CRM, Problems We Solve, Feature Spotlights, Real Estate CRM
 * with Zoho) and the client case study supplied by VectorWave. The client is
 * intentionally unnamed, and no outcome metrics are stated beyond what the case study
 * itself says.
 */

/** The 10-step journey from the case study's objectives — the page's signature motif. */
export const journey = [
  "Lead",
  "Qualification",
  "Follow-Up",
  "Site Visit",
  "Opportunity",
  "Property Selection",
  "Booking",
  "Collection",
  "Finance",
  "Management Dashboard",
];

export const crmExplainer: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Inbox,
    title: "Lead capture",
    text: "Pulls in enquiries from your website, Instagram/Facebook ads, portals and walk-ins, so no lead sits only in someone's personal phone.",
  },
  {
    icon: BellRing,
    title: "Follow-ups",
    text: "Reminds the salesperson to call, and reminds the manager if nobody did.",
  },
  {
    icon: CalendarCheck,
    title: "Site visits",
    text: "Tracks who actually visited a project, not just who said they would.",
  },
  {
    icon: Route,
    title: "Sales pipeline",
    text: "Shows every deal's stage, from New Lead to Negotiation to Booked, on one screen.",
  },
  {
    icon: Building2,
    title: "Property & unit info",
    text: "Towers, floors, unit numbers, sizes and prices in one system that updates the moment a unit is sold.",
  },
  {
    icon: FileSignature,
    title: "Booking",
    text: "Converts a confirmed deal into a booking with the customer's documents and payment plan attached.",
  },
  {
    icon: MessagesSquare,
    title: "Customer communication",
    text: "Every call, email and WhatsApp message is logged against the customer, so anyone on the team can pick up the conversation.",
  },
  {
    icon: Wallet,
    title: "Collections",
    text: "Tracks who has paid, who is due and who is overdue, linked directly to the booking instead of a separate Excel sheet.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    text: "Gives management a live dashboard instead of a Friday-afternoon status call.",
  },
];

export const problems: { problem: string; before: string; fix: string }[] = [
  {
    problem: "Leads coming from too many places",
    before: "Instagram, website, WhatsApp, calls, Excel. Nobody has the full picture.",
    fix: "Every source feeds one CRM automatically. One lead, one record, one owner.",
  },
  {
    problem: "Missed follow-ups",
    before: "A salesperson forgets to call the lead back, and the lead books with a competitor.",
    fix: "Automatic reminders, plus escalations when a follow-up is overdue.",
  },
  {
    problem: "Site visits go untracked",
    before: "Management doesn't know which leads actually visited the project.",
    fix: "Every visit is scheduled, assigned and logged, with a mandatory follow-up after.",
  },
  {
    problem: "Booking information is scattered",
    before: "Sales, finance and management each work off a different version of the truth.",
    fix: "One booking record (unit, customer, documents, payment plan) visible to everyone who needs it.",
  },
  {
    problem: "Collections are hard to track",
    before: "Payment status isn't connected to the booking, so overdue amounts slip through.",
    fix: "Collections are tied directly to the booking record, with automatic reminders for what's due.",
  },
];

export type FeatureKey = "leads" | "visits" | "inventory" | "booking" | "collections";

export const features: {
  key: FeatureKey;
  icon: LucideIcon;
  tab: string;
  title: string;
  headline: string;
  points: string[];
}[] = [
  {
    key: "leads",
    icon: Inbox,
    tab: "Leads",
    title: "Real Estate Lead Management",
    headline: "Every lead, from every source, assigned automatically. No lead left in someone's personal WhatsApp.",
    points: [
      "Lead capture from every source",
      "Source tracking, so you know exactly which channel a lead came from",
      "Automatic assignment to the right salesperson",
      "Follow-up reminders",
      "Lead scoring to focus on the leads most likely to convert",
      "Salesperson performance visibility",
    ],
  },
  {
    key: "visits",
    icon: CalendarCheck,
    tab: "Site Visits",
    title: "Site Visit Management",
    headline: "Know exactly who visited your project this week, and what happened after.",
    points: [
      "Schedule a site visit in a few clicks",
      "Auto-assign a salesperson",
      "Track visit status: scheduled, completed or no-show",
      "Mandatory follow-up after every visit",
      "Visit-to-booking conversion tracking",
    ],
  },
  {
    key: "inventory",
    icon: Building2,
    tab: "Inventory",
    title: "Property & Inventory Management",
    headline: "Your entire inventory (towers, floors, units, prices) updated the moment a unit sells.",
    points: [
      "Projects, towers and units in one structure",
      "Real-time availability",
      "Unit status: available, on hold or sold",
      "Pricing by unit, floor or type",
    ],
  },
  {
    key: "booking",
    icon: ClipboardCheck,
    tab: "Bookings",
    title: "Booking Management",
    headline: "One booking record. Sales, finance and management all look at the same information.",
    points: [
      "Booking status at a glance",
      "Customer information in one profile",
      "Unit allocation linked to the booking",
      "Document management",
      "Payment schedule attached to the booking",
    ],
  },
  {
    key: "collections",
    icon: Wallet,
    tab: "Collections",
    title: "Collections & Finance",
    headline: "Stop chasing payment status in a separate spreadsheet. Collections live on the booking itself.",
    points: [
      "Payment tracking against each booking",
      "Outstanding amount visibility",
      "Automatic collection reminders",
      "Finance-team visibility without extra spreadsheets",
      "Collection reporting",
    ],
  },
];

export const caseStudy = {
  title: "Real Estate Business Automation & CRM Implementation",
  summary:
    "A growing real estate company managing multiple projects, properties, customers and sales activities needed a centralized business management system. Teams were running on Excel sheets, WhatsApp conversations, emails and separate systems, with nothing connecting lead generation to final payment collection and financial reporting.",
  channels: ["Facebook", "Instagram", "Property portals", "Website forms", "Walk-ins", "WhatsApp"],
  challenges: [
    {
      title: "Disconnected communication",
      text: "Lead data lived in personal WhatsApp chats, individual email inboxes and spreadsheets.",
    },
    {
      title: "No accountable follow-ups",
      text: "The sales team managed touchpoints manually, causing delayed responses, duplicate outreach and forgotten opportunities.",
    },
    {
      title: "Untracked site visits",
      text: "Management had no real-time visibility into scheduled, completed or failed site visits.",
    },
    {
      title: "Inventory & finance disconnect",
      text: "Unit availability sat in static files while finance tracked collections separately from sales bookings, so there was no unified picture of outstanding revenue.",
    },
  ],
  questions: [
    "How many leads convert to site visits, and site visits to bookings?",
    "Which source and which salesperson perform best?",
    "How much has been booked, collected, and is still outstanding?",
  ],
  solution: [
    {
      icon: Inbox,
      title: "Centralized lead capture",
      points: [
        "Aggregated every inquiry (website, social media, WhatsApp, portals) into one CRM.",
        "Automatic assignment rules route prospects to the right team member instantly, with alerts.",
      ],
    },
    {
      icon: BellRing,
      title: "Automated nurturing & site-visit workflows",
      points: [
        "Structured pipeline: New Lead → Contacted → Qualified → Site Visit → Negotiation → Booking.",
        "Automated reminders for reps: Today's Follow-Ups, Overdue Follow-Ups, High-Priority Leads.",
        "Site-visit lifecycle streamlined from scheduling to post-visit feedback.",
      ],
    },
    {
      icon: Building2,
      title: "Inventory & booking engine",
      points: [
        "Inventory structured as Project → Tower → Floor → Unit → Pricing/Availability.",
        "Bookings linked directly to units and customer profiles, preventing double-booking and duplicate data.",
      ],
    },
    {
      icon: LayoutDashboard,
      title: "Connected collections & executive dashboards",
      points: [
        "Automated payment schedules, due-date alerts and collection tracking tied to CRM booking records.",
        "Real-time dashboards for lead-source performance, site-visit conversion, unit turnover and cash-flow projections.",
      ],
    },
  ],
  timeline: [
    {
      weeks: "Weeks 1–2",
      phase: "Discovery & Architecture",
      text: "Operational discovery, lead-source audit, pipeline workflow mapping, property schema modeling and tech stack blueprinting.",
    },
    {
      weeks: "Weeks 3–6",
      phase: "Implementation & Automation",
      text: "CRM configuration, lead capture integration, automated assignment, inventory structure build and finance module synchronization.",
    },
    {
      weeks: "Weeks 7–12",
      phase: "Deployment, Optimization & Training",
      text: "Team onboarding, live rollout, pipeline optimization, executive dashboard deployment and continuous performance refinement.",
    },
  ],
  outcomes: [
    "Spreadsheets, WhatsApp threads and isolated systems replaced by one connected CRM",
    "Every touchpoint connected, from first inquiry to payment collection",
    "Real-time visibility into pipeline, salesperson accountability and unit availability",
    "Cash-flow projections available to management on demand",
  ],
  conclusion:
    "The business moved from reactive, manual management to a data-driven operation positioned for sustainable growth.",
};

export const zohoStack: { name: string; handles: string; angle: string; href: string }[] = [
  {
    name: "Zoho CRM",
    handles: "Leads, contacts, opportunities, follow-ups and the sales pipeline.",
    angle: "The engine behind your sales pipeline.",
    href: "/services/sales",
  },
  {
    name: "Zoho Books",
    handles: "Invoices, payments and accounting.",
    angle: "Bookings and collections no longer live in two different systems.",
    href: "/services/zoho-finance",
  },
  {
    name: "Zoho Analytics",
    handles: "Dashboards and reporting.",
    angle: "Your Friday status call, replaced by a live dashboard.",
    href: "/services/zoho-bundled-suite",
  },
  {
    name: "Zoho Campaigns",
    handles: "Marketing campaigns.",
    angle: "From ad click to lead in your CRM, automatically.",
    href: "/services/zoho-bundled-suite",
  },
  {
    name: "Zoho Creator",
    handles: "Custom workflows and apps.",
    angle: "Every project has its own process. Our builds fit yours, not a template.",
    href: "/services/zoho-bundled-suite",
  },
];
