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
    url: z.string().url().optional(),
    locale: z.enum(['es', 'en']).default('es'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string().default('Tp3studio'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    locale: z.enum(['es', 'en']).default('es'),
  }),
});

export const collections = { portfolio, blog };
