// ==================================================
// 🎨 THEME SWITCHER COMPONENT
// ==================================================
// Fichier : components/theme-switcher.tsx

'use client';

import { useState } from 'react';
import { useTheme } from '@/providers/theme-provider';
import { themes, ThemeKey, getAllThemes } from '@/applib/themes/themes-config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleThemeChange = (themeKey: ThemeKey) => {
    setTheme(themeKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          Thème
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisir un Thème</DialogTitle>
          <DialogDescription>
            Sélectionnez le thème de couleurs pour votre application GMAO
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {getAllThemes().map(([key, theme]) => {
            const isActive = currentTheme === key;

            return (
              <button
                key={key}
                onClick={() => handleThemeChange(key as ThemeKey)}
                className={cn(
                  "relative group p-4 rounded-xl border-2 transition-all",
                  "hover:shadow-lg hover:scale-[1.02]",
                  isActive
                    ? "border-current shadow-xl"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                )}
                style={{
                  borderColor: isActive ? theme.colors.primary : undefined,
                }}
              >
                {/* Badge actif */}
                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {/* Nom du thème */}
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {theme.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {theme.description}
                  </p>
                </div>

                {/* Aperçu des couleurs */}
                <div className="space-y-2">
                  {/* Couleur principale */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-full h-8 rounded-lg shadow-inner"
                      style={{
                        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
                      }}
                    />
                  </div>

                  {/* Sidebar preview */}
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-6 rounded"
                      style={{ backgroundColor: theme.colors.sidebarBg }}
                    />
                    <div
                      className="flex-1 h-6 rounded"
                      style={{ backgroundColor: theme.colors.sidebarHover }}
                    />
                    <div
                      className="flex-1 h-6 rounded"
                      style={{ backgroundColor: theme.colors.sidebarActive }}
                    />
                  </div>

                  {/* Status colors */}
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: theme.colors.success }}
                      title="Success"
                    />
                    <div
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: theme.colors.warning }}
                      title="Warning"
                    />
                    <div
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: theme.colors.error }}
                      title="Error"
                    />
                    <div
                      className="flex-1 h-4 rounded"
                      style={{ backgroundColor: theme.colors.info }}
                      title="Info"
                    />
                  </div>
                </div>

                {/* Gradient preview */}
                <div
                  className={cn(
                    "mt-3 h-2 rounded-full bg-gradient-to-r",
                    theme.gradient
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Thème actuel */}
        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Thème actuel : <strong>{themes[currentTheme].name}</strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ==================================================
// 🎯 MINI VERSION - Pour la sidebar
// ==================================================

export const ThemeSwitcherCompact = () => {
  const { currentTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
          title="Changer de thème"
        >
          <Palette className="w-4 h-4" />
          <span>Thème</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choisir un Thème</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {getAllThemes().map(([key, theme]) => {
            const isActive = currentTheme === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setTheme(key as ThemeKey);
                  setOpen(false);
                }}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all hover:scale-105",
                  isActive
                    ? "border-current shadow-lg"
                    : "border-slate-200 dark:border-slate-700"
                )}
                style={{
                  borderColor: isActive ? theme.colors.primary : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{theme.name}</span>
                  {isActive && (
                    <Check
                      className="w-4 h-4"
                      style={{ color: theme.colors.primary }}
                    />
                  )}
                </div>
                <div className="flex gap-1">
                  <div
                    className="flex-1 h-3 rounded"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="flex-1 h-3 rounded"
                    style={{ backgroundColor: theme.colors.sidebarBg }}
                  />
                  <div
                    className="flex-1 h-3 rounded"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
