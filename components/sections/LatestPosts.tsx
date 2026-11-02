import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import BlogIcon from "@/components/BlogIcon";
import { Card } from "@/components/ui/Card";
import { getSortedPosts } from "@/lib/posts";

export default async function LatestPosts({ limit = 3 }: { limit?: number }) {
  const posts = (await getSortedPosts()).slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section className="bg-surface-alt px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 text-center">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            Latest insights
          </h2>
          <p className="mt-1 text-[15px] text-ink-muted">
            Practical notes from our team on ERP, CRM, AI and automation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80} className="h-full">
              <Card href={`/blog/${post.slug}`} padding="sm" className="overflow-hidden !p-0">
                <div className="relative flex h-40 shrink-0 items-center justify-center overflow-hidden bg-surface text-primary">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <BlogIcon icon={post.icon} size={36} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-surface-chip px-3 py-1 text-xs font-bold text-primary">
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-base font-bold leading-snug text-ink">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs text-ink-faint">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary"
          >
            View all articles
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
