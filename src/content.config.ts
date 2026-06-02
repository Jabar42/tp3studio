import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    name: z.string(),
    location: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    image: z.string().optional(),
  }),
});

export const collections = { portfolio };
