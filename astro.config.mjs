// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  base: '/',
  compressHTML: true,
  output: 'server',
  adapter: node({
    mode: 'standalone'
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