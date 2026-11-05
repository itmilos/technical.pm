// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => {
        // Exclude API routes and private pages from sitemap
        return !page.includes('/api/') && !page.includes('/admin');
      },
      customPages: [
        'https://technical.pm',
        'https://technical.pm/brand-strategy',
        'https://technical.pm/mcp',
        'https://technical.pm/mcp.md',
        'https://technical.pm/llms.txt',
        'https://technical.pm/agents.md'
      ],
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US'
        }
      }
    })
  ],
  base: '/',
  compressHTML: true,
  // Static build for AWS Amplify Hosting; the contact-form API moved to a Lambda that Amplify proxies /api/send-email to.
  output: 'static',
  // The old /blog redirects (/blog, /blog/rss.xml, /blog/*) are Amplify 301 rules now; a static build cannot do the wildcard.
  build: {
    inlineStylesheets: 'always',
    assets: '_astro'
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  },
  vite: {
    build: {
      outDir: 'dist'
    },
    ssr: {
      noExternal: ['@astrojs/*']
    }
  },
  site: 'https://technical.pm' // Replace with your actual domain
});