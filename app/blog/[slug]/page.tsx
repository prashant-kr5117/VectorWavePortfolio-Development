import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CTA from "@/components/sections/CTA";
import Reveal from "@/components/Reveal";
import BlogIcon from "@/components/BlogIcon";
import HoverGlow from "@/components/HoverGlow";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import { getPostBySlug, getRelatedPosts, posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | VectorWave Technologies`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.dateValue,
    modifiedTime: post.dateModifiedValue ?? post.dateValue,
  });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <ArticleJsonLd post={post} />
      <main className="flex-1">
        <section className="bg-surface-alt px-4 py-14 sm:px-6 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft transition-colors duration-200 hover:text-primary"
            >
              <ArrowLeft size={14} /> Back to blog
            </Link>
            <div>
              <span className="inline-block rounded-full bg-surface-chip px-4 py-1.5 text-[11px] font-bold text-primary">
                {post.category}
              </span>
              <h1 className="mx-auto mt-5 text-[24px] font-bold leading-tight text-ink sm:text-3xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <User size={14} /> {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime}
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <Reveal className="mx-auto flex max-w-2xl flex-col gap-5">
            <HoverGlow className="mb-2 flex h-40 items-center justify-center rounded-xl bg-ink-inverse text-on-inverse">
              <BlogIcon icon={post.icon} size={48} />
            </HoverGlow>
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-soft sm:text-base">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="bg-surface-alt px-4 py-14 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <Reveal className="mb-6 text-center">
                <h2 className="text-lg font-bold text-ink">
                  More on {post.category}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 60}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                      <span className="mb-2 inline-block w-fit rounded-full bg-surface-chip px-3 py-1 text-[10px] font-bold text-primary">
                        {r.category}
                      </span>
                      <h3 className="mb-2 text-sm font-bold leading-snug text-ink">
                        {r.title}
                      </h3>
                      <p className="line-clamp-2 text-xs text-ink-muted">
                        {r.excerpt}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}
