import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    headline: z.string(),
    subheadline: z.string().optional(),
    body_text: z.string().optional(),
  }),
});

export const collections = { blog, pages };
