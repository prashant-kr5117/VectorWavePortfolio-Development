import type { Metadata } from "next";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import BlogGrid from "@/components/BlogGrid";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, ORGANIZATION_ID, WEBSITE_ID, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Blog | VectorWave Technologies",
  description:
    "Stay updated with VectorWave's blog on Zoho tools, ERP strategy, and digital transformation for growing businesses.",
  path: "/blog",
});

const blogJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blog#webpage`,
      url: `${SITE_URL}/blog`,
      name: "Blog | VectorWave Technologies",
      description:
        "Insights and articles from VectorWave Technologies covering ERP, CRM, automation, AI and business technology.",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    breadcrumbSchema(`${SITE_URL}/blog#breadcrumb`, [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Blog", item: `${SITE_URL}/blog` },
    ]),
  ],
};

export default async function BlogPage() {
  const posts = await getSortedPosts();

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <main className="flex-1">
        <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
          <Reveal>
            <span className="inline-block rounded-full bg-surface-chip px-4 py-1.5 text-[11px] font-bold text-primary">
              Blog
            </span>
            <h1 className="mx-auto mt-5 max-w-xl text-[26px] font-bold leading-tight text-ink sm:text-3xl">
              Insights on ERP, CRM, AI and business automation
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
              Practical notes from our team on getting more out of Zoho, Odoo,
              CRM automation, and the tools that run your business.
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <BlogGrid posts={posts} />
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
