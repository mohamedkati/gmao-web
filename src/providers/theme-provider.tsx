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

  // return <NextThemesProvider {...props} >{children}</NextThemesProvider>;

  return (<ThemeContext.Provider
    value={{
      currentTheme,
      setTheme,
      theme: themes[currentTheme]
    }}
  >
    {children}
  </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Helper pour appliquer les variables CSS (optionnel)
const applyThemeVariables = (themeKey: ThemeKey) => {
  const theme = themes[themeKey];
  const root = document.documentElement;

  // Appliquer les couleurs comme variables CSS
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};