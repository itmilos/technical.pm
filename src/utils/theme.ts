export type Theme = 'light' | 'dark' | 'purple';

export const THEME_COOKIE_KEY = 'theme_preference';

export const themes: Theme[] = ['light', 'dark', 'purple'];

export const themeColors = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    secondary: 'bg-gray-100',
    secondaryHover: 'hover:bg-gray-200',
    border: 'border-gray-200',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    primary: 'bg-purple-500',
    primaryHover: 'hover:bg-purple-600',
    secondary: 'bg-gray-800',
    secondaryHover: 'hover:bg-gray-700',
    border: 'border-gray-700',
  },
  purple: {
    background: 'bg-purple-50',
    text: 'text-purple-900',
    primary: 'bg-purple-700',
    primaryHover: 'hover:bg-purple-800',
    secondary: 'bg-purple-100',
    secondaryHover: 'hover:bg-purple-200',
    border: 'border-purple-200',
  },
};

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const savedTheme = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${THEME_COOKIE_KEY}=`))
    ?.split('=')[1] as Theme;
  return savedTheme || 'light';
}

export function setTheme(theme: Theme) {
  document.cookie = `${THEME_COOKIE_KEY}=${theme};path=/;max-age=31536000`; // 1 year
  document.documentElement.setAttribute('data-theme', theme);
  applyThemeStyles(theme);
}

export function applyThemeStyles(theme: Theme) {
  const root = document.documentElement;
  const colors = themeColors[theme];
  
  // Apply theme-specific classes to the body
  document.body.className = `${colors.background} ${colors.text} transition-colors duration-200`;
  
  // Update CSS variables for theme-specific colors
  root.style.setProperty('--theme-background', getComputedStyle(root).getPropertyValue(`--${theme}-background`));
  root.style.setProperty('--theme-text', getComputedStyle(root).getPropertyValue(`--${theme}-text`));
  root.style.setProperty('--theme-primary', getComputedStyle(root).getPropertyValue(`--${theme}-primary`));
  root.style.setProperty('--theme-secondary', getComputedStyle(root).getPropertyValue(`--${theme}-secondary`));
} 