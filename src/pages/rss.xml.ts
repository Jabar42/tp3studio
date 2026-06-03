import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'Tp3studio Blog',
    description: 'Automatización, chatbots y páginas web para pequeños negocios en Latinoamérica.',
    site: 'https://tp3studio.com',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}`,
    })),
  });
}
