import { tailwindColors } from './src/utils/theme.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand colors imported from centralized theme system
        ...tailwindColors,
      },
      fontFamily: {
        // Primary font: Modern, clean, premium feel (Elite + Playful)
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        // Accent font: Bold, rebellious, unconventional (Rebel + Tesla-like)
        'accent': ['Space Grotesk', 'system-ui', 'sans-serif'],
        // Code font: Technical, precise
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 