import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );

  return rss({
    title: 'Technical Product Manager Blog',
    description: 'Insights on AI/ML product management, cloud infrastructure, and technical strategy from Milos Rujevic',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      author: `${post.data.author} (hello@technical.pm)`,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      customData: post.data.lastModified ? 
        `<lastBuildDate>${new Date(post.data.lastModified).toUTCString()}</lastBuildDate>` : 
        undefined,
    })),
    customData: `
      <language>en-us</language>
      <managingEditor>hello@technical.pm (Milos Rujevic)</managingEditor>
      <webMaster>hello@technical.pm (Milos Rujevic)</webMaster>
      <copyright>© ${new Date().getFullYear()} Milos Rujevic. All rights reserved.</copyright>
      <category>Technology</category>
      <category>Product Management</category>
      <category>AI/ML</category>
      <ttl>1440</ttl>
    `,
  });
}; 