import {
  Factory,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Landmark,
  Building2,
  Truck,
  Briefcase,
  Package,
  BatteryCharging,
  Car,
  Laptop,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import RealEstateHeroImage from "@/src/real-estate-hero.jpg";
import ManufacturingHeroImage from "@/src/manufacturing-hero.jpg";
import RetailEcommerceHeroImage from "@/src/retail-ecommerce-hero.jpg";
import HealthcareHeroImage from "@/src/healthcare-hero.jpg";
import EducationHeroImage from "@/src/education-hero.jpg";
import FinancialServicesHeroImage from "@/src/financial-services-hero.jpg";
import LogisticsSupplyChainHeroImage from "@/src/logistics-supply-chain-hero.jpg";
import ItProfessionalServicesHeroImage from "@/src/it-professional-services-hero.jpg";
import TradingDistributionHeroImage from "@/src/trading-distribution-hero.jpg";
import EvManufacturingHeroImage from "@/src/ev-manufacturing-hero.jpg";
import AutomobileHeroImage from "@/src/automobile-hero.jpg";
import LaptopRefurbishmentHeroImage from "@/src/laptop-manufacturing-refurbishment-hero.jpg";
import EventManagementHeroImage from "@/src/event-management-hero.jpg";

export type Industry = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  model: string;
  caps: string[];
  visibility: string;
  flow?: string[];
  /** Real lib/services.ts slugs this industry's systems are typically built from. */
  relatedServiceSlugs?: string[];
  faqs?: { q: string; a: string }[];
  /** Sample-data-only preview of what a configured dashboard looks like — never real
   * client figures. Labeled illustrative everywhere it renders. */
  illustrativeDashboard?: {
    stats: { label: string; value: string }[];
    pipeline: { stage: string; count: number }[];
  };
  /** Generic, non-client-specific building photography for the hero — never a real
   * client's property. See src/real-estate-hero.jpg's sourcing note below. */
  heroImage?: StaticImageData;
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    desc: "Production planning, inventory, procurement, and quality management with real-time visibility on the floor.",
    model:
      "Demand-driven production from procured components through to finished, quality-checked goods.",
    caps: ["Manufacturing", "Procurement", "Inventory", "Production", "Quality Control", "Finance", "Dashboards & Reporting"],
    visibility: "Production and margin dashboards tied to procurement cost.",
    flow: ["Demand", "Procurement", "Components", "Production", "Quality", "Finished Goods"],
    // Generic production-line photo, sourced from Unsplash under the Unsplash License
    // (free for commercial use, no attribution required) — photo by Arno Senoner. Not a
    // photo of any VectorWave client's facility.
    heroImage: ManufacturingHeroImage,
  },
  {
    slug: "retail-ecommerce",
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    desc: "Keep inventory in sync, manage orders, and engage customers with scalable CRM and ERP systems.",
    model: "Multi-channel selling with inventory, pricing and orders staying in sync across every storefront.",
    caps: ["Sales", "Inventory", "Order Management", "Customer Management", "Finance", "Dashboards & Reporting"],
    visibility: "Sales and stock dashboards across every channel.",
    // Generic warehouse/pallet photo, sourced from Unsplash under the Unsplash License
    // (free for commercial use, no attribution required) — photo by Arum Visuals.
    heroImage: RetailEcommerceHeroImage,
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Patient management, billing, appointment scheduling, and operational tracking with data privacy intact.",
    model: "Patient interactions tied to scheduling and billing.",
    caps: ["CRM", "Operations", "Billing", "Workflow Automation", "Finance", "Reporting"],
    visibility: "Billing and utilization dashboards.",
    // Generic hospital-corridor photo, sourced from Unsplash under the Unsplash License
    // (free for commercial use, no attribution required) — photo by Tasha Kostyuk. Not a
    // photo of any VectorWave client's facility.
    heroImage: HealthcareHeroImage,
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    desc: "Admissions, student records, fee management, communication, and reporting in one integrated system.",
    model: "Admissions-driven enrollment with recurring fee cycles.",
    caps: ["Lead Management", "Admissions", "Student Operations", "Fees", "Workflow Automation", "Reporting"],
    visibility: "Admissions and fee-collection dashboards.",
    // Generic lecture-hall photo, sourced from Unsplash under the Unsplash License (free
    // for commercial use, no attribution required) — photo by Vitaly Gariev.
    heroImage: EducationHeroImage,
  },
  {
    slug: "financial-services",
    icon: Landmark,
    title: "Financial Services",
    desc: "Automation tools, CRM systems, and analytics platforms for reporting accuracy and compliance tracking.",
    model: "Client relationships and transactions that need to stay accurate, auditable and compliant.",
    caps: ["CRM", "Compliance Tracking", "Workflow Automation", "Analytics", "Reporting"],
    visibility: "Compliance and reporting-accuracy dashboards.",
    // Generic modern office-building photo, sourced from Unsplash under the Unsplash
    // License (free for commercial use, no attribution required) — photo by Yousef
    // Espanioly. Not a photo of any VectorWave client's building.
    heroImage: FinancialServicesHeroImage,
  },
  {
    slug: "real-estate",
    icon: Building2,
    title: "Real Estate",
    desc: "Lead management, property listings, contracts, and post-sale service across the full customer lifecycle.",
    model: "Project-based sales with long booking-to-collection cycles.",
    caps: ["Lead Management", "Property / Project Management", "Sales Pipeline", "Booking", "Customer Management", "Collections", "RERA / Compliance Tracking", "Finance", "Workflow Automation", "Dashboards & Reporting"],
    visibility: "Booking and collections dashboards tied to project inventory.",
    flow: ["Lead", "Opportunity", "Property / Project", "Booking", "Collection", "Finance", "Management Dashboard"],
    relatedServiceSlugs: ["sales", "zoho-finance", "whatsapp-automation", "ai-integration", "web-development"],
    faqs: [
      {
        q: "Do you work with independent brokers, or only developers?",
        a: "Both — a brokerage typically needs strong lead-to-site-visit tracking in a CRM; a developer running multi-phase projects usually needs project and inventory management on top of that for unit-level booking and collections. We map which one matches your operation before proposing anything.",
      },
      {
        q: "How do you handle RERA compliance and documentation?",
        a: "We configure document tracking, project registration references, and disclosure reminders as part of the CRM/ERP setup, so the platform becomes the system of record your compliance paperwork pulls from instead of a separate manual process. This is a configuration we build into your system, not a certified or approved RERA product — the filing itself stays with your team or your CA.",
      },
      {
        q: "Can this connect to our existing property listing website or portal?",
        a: "Yes — that's what our Web Development and integration work covers. Enquiry forms on your listing site feed directly into the CRM instead of arriving as disconnected emails, so a lead never sits unactioned in an inbox.",
      },
      {
        q: "How long does an implementation like this take?",
        a: "It depends on scope. A CRM-only setup for leads and the sales pipeline is the fastest path; adding project/inventory management, booking and collections workflows extends it. We scope a concrete timeline after understanding your current process rather than quoting a fixed number upfront.",
      },
      {
        q: "We already use Zoho or Odoo, but it's not really working for us. Can you help?",
        a: "That's common, and most of the work in that case is reconfiguring or extending an existing, underused setup rather than starting from zero. We'd start by reviewing what's already there.",
      },
    ],
    illustrativeDashboard: {
      stats: [
        { label: "Active leads", value: "24" },
        { label: "Units booked (MTD)", value: "9" },
        { label: "Collections on track", value: "82%" },
        { label: "RERA docs pending review", value: "2" },
      ],
      pipeline: [
        { stage: "New Lead", count: 24 },
        { stage: "Site Visit", count: 16 },
        { stage: "Booked", count: 9 },
        { stage: "Collection Due", count: 5 },
        { stage: "Collected", count: 4 },
      ],
    },
    // Generic apartment-facade photo (no identifiable property/client), sourced from
    // Unsplash under the Unsplash License (free for commercial use, no attribution
    // required) — photo by Dmytro Yarish. Not a photo of any VectorWave client's
    // project.
    heroImage: RealEstateHeroImage,
  },
  {
    slug: "logistics-supply-chain",
    icon: Truck,
    title: "Logistics & Supply Chain",
    desc: "Shipment tracking, warehouse management, order fulfilment, and vendor coordination in real time.",
    model: "Goods moving across warehouses, carriers and vendors that all need to stay coordinated in real time.",
    caps: ["Shipment Tracking", "Warehouse Management", "Order Fulfilment", "Vendor Coordination", "Finance", "Dashboards & Reporting"],
    visibility: "Fulfilment and vendor-performance dashboards.",
    // Generic aerial highway/transport photo, sourced from Unsplash under the Unsplash
    // License (free for commercial use, no attribution required) — photo by Jamie Zhang.
    heroImage: LogisticsSupplyChainHeroImage,
  },
  {
    slug: "it-professional-services",
    icon: Briefcase,
    title: "IT & Professional Services",
    desc: "Project management systems, client portals, time tracking, and billing automation.",
    model: "Billable work delivered against projects, tracked from timesheet through to invoice.",
    caps: ["Project Management", "Client Portals", "Time Tracking", "Billing Automation", "Finance", "Reporting"],
    visibility: "Utilization and project-profitability dashboards.",
    // Generic office-team photo, sourced from Unsplash under the Unsplash License (free
    // for commercial use, no attribution required) — photo by Vitaly Gariev.
    heroImage: ItProfessionalServicesHeroImage,
  },
  {
    slug: "trading-distribution",
    icon: Package,
    title: "Trading & Distribution",
    desc: "Tight control over inventory, procurement, and sales with automated reordering.",
    model: "Buy-sell operations across multiple warehouses and price lists.",
    caps: ["Sales", "Purchase", "Inventory", "Warehouse", "Procurement", "Finance", "Customer Management", "Dashboards & Reporting"],
    visibility: "Stock ageing and margin dashboards across warehouses.",
    // Generic warehouse/forklift photo, sourced from Unsplash under the Unsplash License
    // (free for commercial use, no attribution required) — photo by Bernd Dittrich.
    heroImage: TradingDistributionHeroImage,
  },
  {
    slug: "ev-manufacturing",
    icon: BatteryCharging,
    title: "EV Manufacturing",
    desc: "Vehicle assembly from procured components, sold through direct or dealer channels, with production and margin visibility.",
    model: "Vehicle assembly from procured components, sold through direct or dealer channels.",
    caps: ["Manufacturing", "Procurement", "Inventory", "Production", "Operations", "Finance", "Dashboards & Reporting"],
    visibility: "Production and margin dashboards tied to procurement cost.",
    // Generic robotic vehicle-assembly-line photo, sourced from Unsplash under the
    // Unsplash License (free for commercial use, no attribution required) — photo by
    // Lenny Kuhne. Not a photo of any VectorWave client's facility.
    heroImage: EvManufacturingHeroImage,
  },
  {
    slug: "automobile",
    icon: Car,
    title: "Automobile",
    desc: "Vehicle sales combined with ongoing service revenue, tracked across the full ownership lifecycle.",
    model: "Vehicle sales combined with ongoing service revenue.",
    caps: ["Sales", "CRM", "Inventory", "Procurement", "Service", "Finance", "Dashboards & Reporting"],
    visibility: "Sales and service dashboards across the ownership lifecycle.",
    // Generic car-headlight detail photo (no visible manufacturer badge), sourced from
    // Unsplash under the Unsplash License (free for commercial use, no attribution
    // required) — photo by Caroline Badran.
    heroImage: AutomobileHeroImage,
  },
  {
    slug: "laptop-manufacturing-refurbishment",
    icon: Laptop,
    title: "Laptop Manufacturing & Refurbishment",
    desc: "Device manufacturing alongside a full refurbishment and resale operation, with warranty and yield tracking.",
    model: "Device manufacturing alongside a full refurbishment and resale operation.",
    caps: ["Manufacturing", "Refurbishment Operations", "Serial / Asset Tracking", "Spare Parts Management", "Procurement", "Inventory & Warehouse", "Repair & Replacement", "Quality Control", "Sales & Distribution", "Warranty / Service", "Finance", "Dashboards & Reporting"],
    visibility: "Refurbishment yield and warranty-cost dashboards by device batch.",
    flow: ["Device Received", "Inspection", "Repair", "Spare Parts", "QC", "Refurbished Inventory", "Sales", "Warranty", "Finance", "Dashboard"],
    // Abstract circuit/fiber photo (no visible manufacturer branding), sourced from
    // Unsplash under the Unsplash License (free for commercial use, no attribution
    // required) — photo by Luke Jones.
    heroImage: LaptopRefurbishmentHeroImage,
  },
  {
    slug: "event-management",
    icon: PartyPopper,
    title: "Event Management",
    desc: "Project-based delivery coordinated across vendors and timelines, with per-engagement profitability tracking.",
    model: "Project-based delivery coordinated across vendors and timelines.",
    caps: ["Lead Management", "Event Operations", "Vendor Management", "Project Coordination", "Finance", "Reporting"],
    visibility: "Per-engagement profitability dashboards.",
    // Generic event-stage-lighting photo, sourced from Unsplash under the Unsplash
    // License (free for commercial use, no attribution required) — photo by Howen.
    heroImage: EventManagementHeroImage,
  },
];
