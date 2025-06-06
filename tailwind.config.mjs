/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 🎨 Primary Color Palette (Core Identity)
        'royal-purple': {
          50: '#f5f0ff',
          100: '#ede4ff',
          200: '#dcc8ff',
          300: '#c5a1ff',
          400: '#a870ff',
          500: '#8c3fff',
          600: '#6C3EA6', // Primary brand color
          700: '#5b2b8a',
          800: '#4d2471',
          900: '#41205e',
        },
        
        'electric-lavender': {
          50: '#faf7ff',
          100: '#f4edff',
          200: '#eadeff',
          300: '#dcc4ff',
          400: '#c89cff',
          500: '#B57EDC', // Highlights, accents, hover states
          600: '#a055c7',
          700: '#8c44ab',
          800: '#753a8c',
          900: '#613173',
        },
        
        'deep-charcoal': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1E1E1E', // Backgrounds, text, anchoring elements
        },
        
        // 🎯 Accent Palette (Dynamic & Expressive Touches)
        'neon-coral': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#ffced1',
          300: '#ffa3aa',
          400: '#ff717c',
          500: '#FF4F58', // CTAs, badges, emphasis areas
          600: '#f12532',
          700: '#d11825',
          800: '#b91c28',
          900: '#9f1c27',
        },
        
        'cyber-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0EC2A4', // Charts, UI elements, subtle accents
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        'pale-blush': {
          50: '#F3E6F8', // Background fills, cards, soft UI areas
          100: '#f1e0f5',
          200: '#e9d0ed',
          300: '#ddb3e0',
          400: '#cc8cd0',
          500: '#b569bc',
          600: '#9c4ea3',
          700: '#814086',
          800: '#6a366e',
          900: '#5a305c',
        },
      },
      fontFamily: {
        // Primary font: Modern, clean, premium feel - pairs beautifully with Space Grotesk
        'primary': ['DM Sans', 'system-ui', 'sans-serif'],
        // Accent font: Bold, rebellious, unconventional
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