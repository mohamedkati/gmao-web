'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeKey, themes } from '../lib/themes/themes-config';
// import { type ThemeProviderProps } from 'next-themes/dist/types';
interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  theme: typeof themes[ThemeKey];
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeKey>('emerald');

  // Charger le thème depuis localStorage au montage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('gmao-theme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Sauvegarder le thème dans localStorage
  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    localStorage.setItem('gmao-theme', theme);

    // Appliquer les CSS variables (optionnel)
    applyThemeVariables(theme);
  };

  // Appliquer le thème au montage
  React.useEffect(() => {
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  return <NextThemesProvider {...props} >
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        theme: themes[currentTheme]
      }}
    >
      {children}
    </ThemeContext.Provider>
  </NextThemesProvider>;

  // return (<ThemeContext.Provider
  //   value={{
  //     currentTheme,
  //     setTheme,
  //     theme: themes[currentTheme]
  //   }}
  // >
  //   {children}
  // </ThemeContext.Provider>
  // );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ✅ Fonction qui injecte les variables CSS dans :root
// const applyThemeVariables = (themeKey: ThemeKey) => {
//   const theme = themes[themeKey];
//   const root = document.documentElement;

//   // Appliquer les couleurs principales
//   root.style.setProperty('--color-primary', theme.colors.primary);
//   root.style.setProperty('--color-primary-dark', theme.colors.primaryDark);
//   root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
//   root.style.setProperty('--color-primary-foreground', '#ffffff');

//   // Accent
//   root.style.setProperty('--color-accent', theme.colors.accent);
//   root.style.setProperty('--color-accent-hover', theme.colors.accentHover);
//   root.style.setProperty('--color-accent-foreground', '#ffffff');

//   // Sidebar
//   root.style.setProperty('--color-sidebar-bg', theme.colors.sidebarBg);
//   root.style.setProperty('--color-sidebar-hover', theme.colors.sidebarHover);
//   root.style.setProperty('--color-sidebar-active', theme.colors.sidebarActive);
//   root.style.setProperty('--color-sidebar-text', theme.colors.sidebarText);

//   // Status
//   root.style.setProperty('--color-success', theme.colors.success);
//   root.style.setProperty('--color-warning', theme.colors.warning);
//   root.style.setProperty('--color-error', theme.colors.error);
//   root.style.setProperty('--color-info', theme.colors.info);

//   // ✅ Mettre à jour aussi les variables shadcn/ui pour les boutons
//   // Convertir hex en HSL pour shadcn
//   const primaryHSL = hexToHSL(theme.colors.primary);
//   root.style.setProperty('--primary', primaryHSL);
//   root.style.setProperty('--primary-foreground', '0 0% 100%'); // blanc
// };

const applyThemeVariables = (themeKey: ThemeKey) => {
  const theme = themes[themeKey];
  const root = document.documentElement;

  // Appliquer toutes les couleurs en format HSL
  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convertir le nom de camelCase en kebab-case
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--color-${cssKey}`, value);
  });

  // ✅ Variables spéciales pour shadcn/ui (format HSL direct)
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--primary-foreground', '0 0% 100%');

  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--accent-foreground', '0 0% 100%');

  // ✅ Pour les inputs focus
  root.style.setProperty('--ring', theme.colors.primary);
};


// Helper pour convertir Hex en HSL (pour shadcn/ui)
const hexToHSL = (hex: string): string => {
  // Supprimer le # si présent
  hex = hex.replace(/^#/, '');

  // Convertir en RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};
