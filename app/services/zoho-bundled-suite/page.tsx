import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import { getServiceBySlug } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { inter } from "./_components/fonts";
import { Hero } from "./_components/Hero";
import { PageNav } from "./_components/PageNav";
import { SupportingStatementSection, ManifestoSection } from "./_components/PhilosophySection";
import { EcosystemSection } from "./_components/EcosystemSection";
import { ErpSection } from "./_components/ErpSection";
import { PlansSection } from "./_components/PlansSection";
import { ArchitectureSection } from "./_components/ArchitectureSection";
import { FinanceSection, TallyMigrationSection } from "./_components/FinanceSection";
import { CrmSection, LeadSourceSection } from "./_components/CrmSection";
import { IndustriesSection } from "./_components/IndustriesSection";
import { IntegrationsSection, IntegrationArchitectureSection } from "./_components/IntegrationsSection";
import { DataVisibilitySection } from "./_components/DataVisibilitySection";
import { TeamSection } from "./_components/TeamSection";
import { ExamplesSection } from "./_components/ExamplesSection";
import { SolutionsSection } from "./_components/SolutionsSection";
import { WhySection, DifferentiatorSection, PlatformCredibilitySection } from "./_components/WhySection";
import { ZohoCTA } from "./_components/ZohoCTA";

export const metadata: Metadata = buildMetadata({
  title: "Zoho Implementation & Consulting | VectorWave Technologies",
  description:
    "VectorWave designs Zoho as one connected business system — CRM, Finance, Inventory, Operations, Automation and Management Reporting — architected around how your business actually works.",
  path: "/services/zoho-bundled-suite",
});

const zohoBundledSuiteService = getServiceBySlug("zoho-bundled-suite")!;

export default function ZohoServicePage() {
  return (
    <div className={inter.className}>
      <ServiceJsonLd service={zohoBundledSuiteService} />
      <main className="flex-1">
        <Hero />
        <PageNav />
        <SupportingStatementSection />
        <ManifestoSection />
        <EcosystemSection />
        <ErpSection />
        <PlansSection />
        <ArchitectureSection />
        <FinanceSection />
        <TallyMigrationSection />
        <CrmSection />
        <LeadSourceSection />
        <IndustriesSection />
        <IntegrationsSection />
        <IntegrationArchitectureSection />
        <DataVisibilitySection />
        <TeamSection />
        <ExamplesSection />
        <SolutionsSection />
        <WhySection />
        <DifferentiatorSection />
        <PlatformCredibilitySection />
        <ZohoCTA />
      </main>
      <Footer />
    </div>
  );
}
