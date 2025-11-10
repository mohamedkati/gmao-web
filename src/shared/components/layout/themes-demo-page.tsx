
'use client';

import { useTheme } from '@/providers/theme-provider';
import { ThemeSwitcher } from '@/components/layout/theme-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Users,
  Wrench,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function ThemeDemoPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span className="font-bold text-xl">{theme.name}</span>
          </div>

          <h1
            className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
            }}
          >
            Système de Thèmes GMAO
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {theme.description} - Testez différentes palettes de couleurs pour votre application
          </p>

          <ThemeSwitcher />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Interventions
              </CardTitle>
              <Wrench
                className="w-5 h-5"
                style={{ color: theme.colors.primary }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">+12% ce mois</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Techniciens
              </CardTitle>
              <Users
                className="w-5 h-5"
                style={{ color: theme.colors.accent }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-slate-500">8 actifs maintenant</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: theme.colors.info }}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Planifiées
              </CardTitle>
              <Calendar
                className="w-5 h-5"
                style={{ color: theme.colors.info }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-slate-500">Cette semaine</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: theme.colors.warning }}
            />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                En Retard
              </CardTitle>
              <AlertTriangle
                className="w-5 h-5"
                style={{ color: theme.colors.warning }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-orange-500">Attention requise</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Buttons & Components */}
        <Card>
          <CardHeader>
            <CardTitle>Éléments d'Interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Buttons */}
            <div>
              <h3 className="font-semibold mb-3">Boutons</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                  }}
                  className="hover:opacity-90"
                >
                  Primary
                </Button>
                <Button
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: 'white',
                  }}
                  className="hover:opacity-90"
                >
                  Accent
                </Button>
                <Button
                  style={{
                    backgroundColor: theme.colors.success,
                    color: 'white',
                  }}
                  className="hover:opacity-90"
                >
                  Success
                </Button>
                <Button
                  style={{
                    backgroundColor: theme.colors.warning,
                    color: 'white',
                  }}
                  className="hover:opacity-90"
                >
                  Warning
                </Button>
                <Button
                  style={{
                    backgroundColor: theme.colors.error,
                    color: 'white',
                  }}
                  className="hover:opacity-90"
                >
                  Error
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-semibold mb-3">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge
                  style={{
                    backgroundColor: `${theme.colors.success}20`,
                    color: theme.colors.success,
                  }}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Terminé
                </Badge>
                <Badge
                  style={{
                    backgroundColor: `${theme.colors.info}20`,
                    color: theme.colors.info,
                  }}
                >
                  <Info className="w-3 h-3 mr-1" />
                  En cours
                </Badge>
                <Badge
                  style={{
                    backgroundColor: `${theme.colors.warning}20`,
                    color: theme.colors.warning,
                  }}
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Attention
                </Badge>
                <Badge
                  style={{
                    backgroundColor: `${theme.colors.error}20`,
                    color: theme.colors.error,
                  }}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Bloqué
                </Badge>
              </div>
            </div>

            {/* Progress bars */}
            <div>
              <h3 className="font-semibold mb-3">Barres de Progression</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Interventions terminées</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '75%',
                        backgroundColor: theme.colors.primary,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taux de satisfaction</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '92%',
                        backgroundColor: theme.colors.success,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Équipements actifs</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '68%',
                        backgroundColor: theme.colors.info,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Gradient Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Gradients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl",
                "bg-gradient-to-r",
                theme.gradient
              )}
            >
              Gradient Principal
            </div>

            <div
              className="h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
              }}
            >
              Gradient Alternatif
            </div>

            <div
              className={cn(
                "h-24 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl",
                theme.sidebar
              )}
            >
              Gradient Sidebar
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Palette de Couleurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(theme.colors).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-900 dark:text-white capitalize">
                      {name.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
