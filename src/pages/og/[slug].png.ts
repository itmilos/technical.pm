import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const posts = await getCollection('blog');
  const post = posts.find((p) => p.slug === slug);

  const title = post?.data.title ?? 'technical.pm';
  const description = post?.data.description ?? 'Technical Product Manager Portfolio & Blog';
  const tags: string[] = post?.data.tags ?? [];
  const isDefiSeries = tags.some(t => t.toLowerCase().includes('defi') || t.toLowerCase().includes('rwa'));

  const seriesLabel = isDefiSeries ? 'Tech PM → DeFi PM in 60 Days' : 'technical.pm';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          background: '#1E1E1E',
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        },
        children: [
          // Top accent bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                background: 'linear-gradient(90deg, #6C3EA6 0%, #B57EDC 100%)',
                height: '5px',
                width: '120px',
                borderRadius: '3px',
                marginBottom: '48px',
              },
            },
          },
          // Series label
          {
            type: 'div',
            props: {
              style: {
                fontSize: '20px',
                color: '#B57EDC',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: '600',
              },
              children: seriesLabel,
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 60 ? '42px' : '52px',
                fontWeight: '800',
                color: '#FFFFFF',
                lineHeight: '1.15',
                maxWidth: '1000px',
                flex: '1',
              },
              children: title,
            },
          },
          // Description
          {
            type: 'div',
            props: {
              style: {
                fontSize: '22px',
                color: '#9CA3AF',
                marginTop: '20px',
                maxWidth: '900px',
                lineHeight: '1.4',
              },
              children: description.length > 120 ? description.slice(0, 117) + '...' : description,
            },
          },
          // Bottom row
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: '1px solid #2D2D2D',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '26px',
                      fontWeight: '800',
                      color: '#6C3EA6',
                      letterSpacing: '-0.02em',
                    },
                    children: 'technical.pm',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '20px',
                      color: '#6B7280',
                    },
                    children: 'Milos Rujevic — Technical PM',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
};
