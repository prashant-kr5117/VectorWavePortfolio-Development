import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";

const CATEGORIES = ["ERP", "CRM", "AI", "Web Dev", "Finance"] as const;

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the post URL, e.g. /blog/your-slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog list and in search results.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...CATEGORIES], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "VectorWave Team",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Important for SEO and accessibility.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", category: "category", media: "mainImage" },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
