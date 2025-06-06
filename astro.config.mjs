// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercelServerless from '@astrojs/vercel/serverless';
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
        'https://technical.pm/blog',
        'https://technical.pm/brand-strategy'
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
  output: 'server',
  adapter: vercelServerless({
    webAnalytics: {
      enabled: true
    },
    maxDuration: 10
  }),
  build: {
    inlineStylesheets: 'auto',
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