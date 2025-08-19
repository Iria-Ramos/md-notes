import { defineCollection, z } from "astro:content";

const files = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    content: z.string(),
    date: z.date(),
  }),
});

export const collections = { files };