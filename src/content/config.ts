import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    authorBio: z.string().optional(),
    authorImage: z.string().optional(),
    tags: z.array(z.string()),
    lastModified: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
}; 