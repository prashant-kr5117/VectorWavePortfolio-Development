import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, organizationSchema, websiteSchema } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import PartnerLogos from "@/components/sections/PartnerLogos";
import BusinessDiagnosis from "@/components/sections/BusinessDiagnosis";
import ProcessChains from "@/components/sections/ProcessChains";
import Services from "@/components/sections/Services";
import TechnologyAndIndustry from "@/components/sections/TechnologyAndIndustry";
import WhyVectorWave from "@/components/sections/WhyVectorWave";
import CaseStudy from "@/components/sections/CaseStudy";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "VectorWave Technologies",
      description:
        "VectorWave Technologies assists growing businesses with Zoho and Odoo ERP, CRM automation, web development and AI-powered business solutions.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <main className="flex-1">
        <Hero />
        <PartnerLogos reverse />
        <BusinessDiagnosis />
        <ProcessChains />
        <Services />
        <TechnologyAndIndustry />
        <WhyVectorWave />
        <CaseStudy
          videoSrc="/maxwell-testimonial.mp4"
          poster="/maxwell-poster.jpg"
          quote="VectorWave Technologies streamlined our sales with Zoho CRM and smoothly migrated our accounting from Tally to Zoho Books. Seamless implementation, responsive team - highly recommend!"
          name="Nikhil"
          role="CEO, Maxvill"
        />
        <Process />
        <CTA />
      </main>
    </>
  );
}
