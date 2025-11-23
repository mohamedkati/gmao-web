// ==================================================
// 🎨 SIDEBAR INTÉGRÉ AVEC UI STORE + THÈME
// ==================================================
// Fichier : features/layout/components/sidebar.tsx
//
// ✅ Utilise le UI Store existant
// ✅ Applique le thème dynamiquement
// ✅ Respecte l'architecture feature-based

'use client';

import { useUIStore } from '@/store/ui.store';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Wrench,
  Calendar,
  Users,
  Building2,
  Settings,
  BarChart3,
  FileText,
  Package,
  ChevronLeft,
  Palette,
  User,
  Badge,
  Menu,
  Search,
  Bell,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../shadcnui/input';
import { Button } from '../shadcnui/button';
import { themes } from '@/applib/themes/themes-config';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Wrench, label: 'Interventions', href: '/work-orders' },
  { icon: Calendar, label: 'Planning', href: '/planning' },
  { icon: Package, label: 'Équipements', href: '/property-groups' },
  { icon: Users, label: 'Techniciens', href: '/techniciens' },
  { icon: Building2, label: 'Sites', href: '/sites' },
  { icon: FileText, label: 'Rapports', href: '/rapports' },
  { icon: BarChart3, label: 'Statistiques', href: '/statistiques' },
  { icon: Settings, label: 'Paramètres', href: '/parametres' },
];

export const ThemedSidebar = () => {
  // ✅ Utiliser le UI Store existant
  const { sidebarOpen, toggleSidebar,sidebarCollapsed,isMobileMenuOpen } = useUIStore();

  // ✅ Utiliser le thème
  const { theme, setTheme, currentTheme } = useTheme();

  const pathname = usePathname();

  function handleThemeChanging(): void {
    if (theme.name === themes.emerald.name)
      setTheme('professional');
    else if (theme.name === themes.professional.name)
      setTheme('modern');
    else if (theme.name === themes.modern.name)
      setTheme('slate');
    else if (theme.name === themes.slate.name)
      setTheme('energetic');
    else if (theme.name === themes.energetic.name)
      setTheme('corporate');
    else if (theme.name === themes.corporate.name)
      setTheme('tech');
    else if (theme.name === themes.tech.name)
      setTheme('emerald');
  }

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col',
          'bg-sidebar border-r border-sidebar-border',
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-20' : 'w-64',
          isMobileMenuOpen && !sidebarOpen && '-translate-x-full',
          isMobileMenuOpen && 'lg:translate-x-0'
        )}
        // ✅ Appliquer la couleur du thème sur le sidebar
        style={{ backgroundColor: theme.colors.sidebarBg }}
      >
        {/* Header Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {sidebarOpen ? (
              <>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white">GMAO Pro</h1>
                  <p
                    className="text-xs"
                    style={{ color: theme.colors.sidebarText, opacity: 0.7 }}
                  >
                    {theme.name}
                  </p>
                </div>
              </>
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mx-auto"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Wrench className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg",
                      "transition-all duration-200 group relative overflow-hidden",
                      !isActive && "hover:translate-x-1",
                      !sidebarOpen && "justify-center"
                    )}
                    style={{
                      backgroundColor: isActive ? theme.colors.primary : 'transparent',
                      color: isActive ? 'white' : theme.colors.sidebarText,
                    }}
                    title={!sidebarOpen ? item.label : undefined}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = theme.colors.sidebarHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}

                    {/* Active indicator */}
                    {isActive && sidebarOpen && (
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 rounded-l"
                        style={{ backgroundColor: theme.colors.accentHover }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          {/* Theme Switcher Button */}
          {sidebarOpen && (
            <button
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg mb-3 transition-colors"
              style={{
                color: theme.colors.sidebarText,
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.sidebarHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onClick={handleThemeChanging}
            >
              <Palette className="w-4 h-4" />
              <span>Changer de thème</span>
            </button>
          )}

          {/* User Info */}
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg",
              !sidebarOpen && "justify-center px-2"
            )}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
              style={{ backgroundColor: theme.colors.primary }}
            >
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Jean Dupont
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: theme.colors.sidebarText, opacity: 0.7 }}
                >
                  Administrateur
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-3 top-6 w-6 h-6 rounded-full",
            "flex items-center justify-center shadow-lg",
            "transition-transform duration-300 hover:scale-110",
            "hidden lg:flex"
          )}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 text-white transition-transform",
              !sidebarOpen && "rotate-180"
            )}
          />
        </button>
      </aside>
    </>
  );
};

// ==================================================
// 🎨 HEADER AVEC THÈME DYNAMIQUE
// ==================================================

export const ThemedHeader = () => {
  const { toggleSidebar } = useUIStore();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left: Menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Toggle Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <Badge
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs border-2 border-white"
                  style={{
                    backgroundColor: theme.colors.error,
                    color: 'white'
                  }}
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: theme.colors.warning }}
                  />
                  <div>
                    <p className="font-medium">Maintenance en retard</p>
                    <p className="text-sm text-slate-500">CHAUD-001 nécessite attention</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  JD
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Jean Dupont</p>
                  <p className="text-xs text-slate-500">Administrateur</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Breadcrumb / Page Title (optionnel) */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <Badge
            // variant=''
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary
            }}
          >
            {theme.name}
          </Badge>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Bienvenue sur votre espace GMAO
        </p>
      </div>
    </header>
  );
};

// ==================================================
// 🎨 LAYOUT COMPLET
// ==================================================

// export const ThemedLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
//       <ThemedSidebar />
//       <div className="flex-1 ml-64">
//         <ThemedHeader />
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };
