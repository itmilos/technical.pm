export type Theme = 'light' | 'dark';

export const THEME_COOKIE_KEY = 'theme_preference';

export const themes: Theme[] = ['light', 'dark'];

export interface ThemeColors {
  // Core colors (RGB values)
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  
  // Input specific
  inputBorder: string;
  inputHover: string;
  inputFocus: string;
  inputPlaceholder: string;
  inputDisabled: string;
  
  // Brand specific
  cta: string;
  ctaForeground: string;
  uiAccent: string;
  uiAccentForeground: string;
  destructive: string;
  destructiveForeground: string;
}

// Tailwind color mapping - single source of truth
const tailwindColors = {
  'royal-purple': {
    50: '#f5f0ff',
    100: '#ede4ff',
    200: '#dcc8ff',
    300: '#c5a1ff',
    400: '#a870ff',
    500: '#8c3fff',
    600: '#6C3EA6',
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
    500: '#B57EDC',
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
    900: '#1E1E1E',
  },
  'neon-coral': {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#ffced1',
    300: '#ffa3aa',
    400: '#ff717c',
    500: '#FF4F58',
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
    500: '#0EC2A4',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  'pale-blush': {
    50: '#F3E6F8',
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
};

// Helper function to convert hex to RGB string
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// Helper function to get Tailwind color as RGB string
export function getTailwindColorRGB(colorPath: string): string {
  // Handle special cases like 'white' and 'gray-400'
  const specialColors: Record<string, string> = {
    'white': '255, 255, 255',
    'gray-400': '156, 163, 175',
  };
  
  if (colorPath in specialColors) {
    return specialColors[colorPath];
  }
  
  // Parse color path (e.g., 'royal-purple-600' -> color: 'royal-purple', shade: '600')
  const parts = colorPath.split('-');
  if (parts.length < 3) return '0, 0, 0';
  
  const shade = parts[parts.length - 1];
  const colorName = parts.slice(0, -1).join('-');
  
  // Valid shade values
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
  type ValidShade = typeof validShades[number];
  
  if (colorName in tailwindColors && validShades.includes(shade as ValidShade)) {
    const colorGroup = tailwindColors[colorName as keyof typeof tailwindColors];
    const hexColor = colorGroup[shade as ValidShade];
    return hexToRgb(hexColor);
  }
  
  return '0, 0, 0';
}

export const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    // Brand Dark Theme (default) - Sophisticated & Elite
    background: getTailwindColorRGB('deep-charcoal-900'), // #1E1E1E
    foreground: getTailwindColorRGB('pale-blush-50'), // #F3E6F8
    card: getTailwindColorRGB('pale-blush-50'), // #F3E6F8 - background fills, cards, soft UI areas
    cardForeground: getTailwindColorRGB('deep-charcoal-900'), // #1E1E1E - text on light cards
    primary: getTailwindColorRGB('royal-purple-600'), // #6C3EA6 - logos, headers, key buttons
    primaryForeground: getTailwindColorRGB('white'),
    secondary: getTailwindColorRGB('deep-charcoal-700'), // #4f4f4f - secondary elements
    secondaryForeground: getTailwindColorRGB('pale-blush-50'), // #F3E6F8
    muted: getTailwindColorRGB('deep-charcoal-800'), // #454545 - muted background
    mutedForeground: getTailwindColorRGB('electric-lavender-500'), // #B57EDC - highlights, accents
    accent: getTailwindColorRGB('electric-lavender-500'), // #B57EDC - hover states, highlights
    accentForeground: getTailwindColorRGB('white'),
    border: getTailwindColorRGB('deep-charcoal-600'), // #5d5d5d
    inputBorder: getTailwindColorRGB('deep-charcoal-500'), // #6d6d6d
    inputHover: getTailwindColorRGB('electric-lavender-500'), // #B57EDC
    inputFocus: getTailwindColorRGB('royal-purple-600'), // #6C3EA6
    inputPlaceholder: getTailwindColorRGB('gray-400'),
    inputDisabled: '0.5',
    cta: getTailwindColorRGB('neon-coral-500'), // #FF4F58 - CTAs, badges, emphasis areas
    ctaForeground: getTailwindColorRGB('white'),
    uiAccent: getTailwindColorRGB('cyber-teal-500'), // #0EC2A4 - charts, UI elements, subtle accents
    uiAccentForeground: getTailwindColorRGB('white'),
    destructive: getTailwindColorRGB('neon-coral-500'), // #FF4F58 - destructive actions
    destructiveForeground: getTailwindColorRGB('white'),
  },
  light: {
    // Brand Light Theme - Playful & Clean
    background: getTailwindColorRGB('white'), // Pure white background
    foreground: getTailwindColorRGB('deep-charcoal-900'), // #1E1E1E - text, anchoring elements
    card: getTailwindColorRGB('pale-blush-50'), // #F3E6F8 - background fills, cards, soft UI areas
    cardForeground: getTailwindColorRGB('deep-charcoal-900'), // #1E1E1E - text on cards
    primary: getTailwindColorRGB('royal-purple-600'), // #6C3EA6 - logos, headers, key buttons
    primaryForeground: getTailwindColorRGB('white'),
    secondary: getTailwindColorRGB('pale-blush-50'), // #F3E6F8 - secondary elements
    secondaryForeground: getTailwindColorRGB('deep-charcoal-900'), // #1E1E1E
    muted: getTailwindColorRGB('pale-blush-100'), // #f1e0f5 - very light blush for muted areas
    mutedForeground: getTailwindColorRGB('pale-blush-700'), // #814086 - darker purple for contrast
    accent: getTailwindColorRGB('electric-lavender-500'), // #B57EDC - highlights, accents, hover states
    accentForeground: getTailwindColorRGB('white'),
    border: getTailwindColorRGB('pale-blush-200'), // #e9d0ed
    inputBorder: getTailwindColorRGB('pale-blush-300'), // #ddb3e0
    inputHover: getTailwindColorRGB('electric-lavender-500'), // #B57EDC
    inputFocus: getTailwindColorRGB('royal-purple-600'), // #6C3EA6
    inputPlaceholder: getTailwindColorRGB('gray-400'),
    inputDisabled: '0.5',
    cta: getTailwindColorRGB('neon-coral-500'), // #FF4F58 - CTAs, badges, emphasis areas
    ctaForeground: getTailwindColorRGB('white'),
    uiAccent: getTailwindColorRGB('cyber-teal-500'), // #0EC2A4 - charts, UI elements, subtle accents
    uiAccentForeground: getTailwindColorRGB('white'),
    destructive: getTailwindColorRGB('neon-coral-500'), // #FF4F58
    destructiveForeground: getTailwindColorRGB('white'),
  },
};

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const savedTheme = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${THEME_COOKIE_KEY}=`))
    ?.split('=')[1] as Theme;
  return savedTheme || 'dark';
}

export function setTheme(theme: Theme) {
  document.cookie = `${THEME_COOKIE_KEY}=${theme};path=/;max-age=31536000`; // 1 year
  document.documentElement.setAttribute('data-theme', theme);
  applyThemeStyles(theme);
}

export function applyThemeStyles(theme: Theme) {
  const root = document.documentElement;
  const colors = themeColors[theme];
  
  // Apply all CSS custom properties
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--foreground', colors.foreground);
  root.style.setProperty('--card', colors.card);
  root.style.setProperty('--card-foreground', colors.cardForeground);
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-foreground', colors.primaryForeground);
  root.style.setProperty('--secondary', colors.secondary);
  root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--muted-foreground', colors.mutedForeground);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-foreground', colors.accentForeground);
  root.style.setProperty('--border', colors.border);
  root.style.setProperty('--input-border', colors.inputBorder);
  root.style.setProperty('--input-hover', colors.inputHover);
  root.style.setProperty('--input-focus', colors.inputFocus);
  root.style.setProperty('--input-placeholder', colors.inputPlaceholder);
  root.style.setProperty('--input-disabled', colors.inputDisabled);
  root.style.setProperty('--cta', colors.cta);
  root.style.setProperty('--cta-foreground', colors.ctaForeground);
  root.style.setProperty('--ui-accent', colors.uiAccent);
  root.style.setProperty('--ui-accent-foreground', colors.uiAccentForeground);
  root.style.setProperty('--destructive', colors.destructive);
  root.style.setProperty('--destructive-foreground', colors.destructiveForeground);
  
  // Apply theme-specific classes to the body for transition effects
  document.body.className = `bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-200`;
}

// Export the color definitions for use in other parts of the app
export { tailwindColors }; 