import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries";

export type PostIcon = "boxes" | "trending-up" | "bot" | "code-2" | "shield-check";
export type PostCategory = "ERP" | "CRM" | "AI" | "Web Dev" | "Finance";

const CATEGORY_ICON: Record<PostCategory, PostIcon> = {
  ERP: "boxes",
  CRM: "trending-up",
  AI: "bot",
  "Web Dev": "code-2",
  Finance: "shield-check",
};

type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: string;
  image?: Image;
  publishedAt: string;
  _updatedAt: string;
  body: PortableTextBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: PortableTextBlock[];
  category: PostCategory;
  author: string;
  date: string;
  dateValue: string;
  dateModifiedValue?: string;
  image?: string;
  imageAlt?: string;
  readTime: string;
  icon: PostIcon;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function estimateReadTime(body: PortableTextBlock[]): string {
  const wordsPerMinute = 200;
  const wordCount = body
    .filter((block) => block._type === "block")
    .flatMap((block) => (block.children ?? []) as { text?: string }[])
    .reduce((count, span) => count + (span.text?.split(/\s+/).filter(Boolean).length ?? 0), 0);
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function toBlogPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    category: post.category,
    author: post.author,
    date: formatDate(post.publishedAt),
    dateValue: post.publishedAt,
    dateModifiedValue: post._updatedAt,
    image: post.image ? urlFor(post.image).width(1200).height(675).fit("crop").url() : undefined,
    imageAlt:
      (post.image as (Image & { alt?: string }) | undefined)?.alt ?? undefined,
    readTime: estimateReadTime(post.body ?? []),
    icon: CATEGORY_ICON[post.category],
  };
}

export async function getSortedPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch<SanityPost[]>(
    postsQuery,
    {},
    { next: { tags: ["post"] } }
  );
  return posts.map(toBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await client.fetch<SanityPost | null>(
    postBySlugQuery,
    { slug },
    { next: { tags: ["post"] } }
  );
  return post ? toBlogPost(post) : undefined;
}

export async function getRelatedPosts(current: BlogPost, limit = 2): Promise<BlogPost[]> {
  const posts = await getSortedPosts();
  return posts.filter((p) => p.slug !== current.slug && p.category === current.category).slice(0, limit);
}
