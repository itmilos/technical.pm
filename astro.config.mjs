// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercelServerless from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
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
    inlineStylesheets: 'auto'
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
  }
});