import { groq } from "next-sanity";

// Shared projection: keep in sync across the queries below.
const postFields = groq`
  "slug": slug.current,
  title,
  excerpt,
  category,
  author,
  "image": mainImage,
  publishedAt,
  _updatedAt,
  body
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
