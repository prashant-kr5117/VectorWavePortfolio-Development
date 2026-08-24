"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/posts";
import BlogIcon from "@/components/BlogIcon";
import HoverGlow from "@/components/HoverGlow";
import { Card } from "@/components/ui/Card";

const categories = ["All", "ERP", "CRM", "AI", "Web Dev", "Finance"];

export default function BlogGrid({ posts: allPosts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const isDefaultView = active === "All" && query.trim() === "";
  const featured = isDefaultView ? allPosts[0] : null;

  const filtered = allPosts
    .filter((p) => (featured ? p.slug !== featured.slug : true))
    .filter((p) => active === "All" || p.category === active)
    .filter((p) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    });

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            id="blog-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="form-control rounded-full pl-10"
          />
        </div>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors duration-200 ${
              active === cat
                ? "border-primary bg-surface-chip text-primary"
                : "border-border text-ink-soft hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:flex-row"
        >
          <HoverGlow className="flex h-40 items-center justify-center bg-ink-inverse text-on-inverse transition-transform duration-300 group-hover:scale-105 sm:h-auto sm:w-64 sm:shrink-0">
            <BlogIcon icon={featured.icon} size={48} />
          </HoverGlow>
          <div className="flex flex-1 flex-col justify-center p-6">
            <span className="mb-2 inline-block w-fit rounded-full bg-surface-chip px-3 py-1 text-[10px] font-bold text-primary">
              Latest &middot; {featured.category}
            </span>
            <h2 className="mb-2 text-lg font-bold leading-snug text-ink">
              {featured.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-sm text-ink-muted">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-faint">
              <span className="flex items-center gap-1">
                <User size={12} /> {featured.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {featured.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {featured.readTime}
              </span>
              <span className="ml-auto flex items-center gap-1 text-xs font-bold text-primary">
                Read article
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-muted">
          No articles match your search yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Card key={post.slug} href={`/blog/${post.slug}`} padding="sm" className="overflow-hidden !p-0">
              <div className="flex h-32 shrink-0 items-center justify-center bg-surface-alt text-primary transition-transform duration-300 group-hover:scale-105">
                <BlogIcon icon={post.icon} size={36} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-block w-fit rounded-full bg-surface-chip px-3 py-1 text-[10px] font-bold text-primary">
                  {post.category}
                </span>
                <h3 className="mb-2 text-sm font-bold leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-3 text-[10px] text-ink-faint">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
