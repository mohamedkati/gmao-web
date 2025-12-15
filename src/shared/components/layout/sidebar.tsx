'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wrench,
  Package,
  Calendar,
  FileText,
  Building2,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BoxIcon,
  Palette,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import { useUIStore } from '@/store/ui.store';
import { useIsMobile } from '@/shared/hooks/use-media-query';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/shadcnui/tooltip';
import { useTenant } from '@/shared/hooks/use-tenant';
import { useTheme } from '@/providers/theme-provider';
import { themes } from '@/applib/themes/themes-config';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Groups', href: '/property-groups', icon: Package },
  { name: 'Customers',href: '/customers', icon: Users },
  { name: 'Interventions', href: '/work-orders', icon: Wrench },
  { name: 'Maintenances', href: '/maintenance', icon: Calendar },
  { name: 'Contrats', href: '/contracts', icon: FileText },
  { name: 'Stock', href: '/inventory', icon: BoxIcon },
  { name: 'Clients', href: '/customers', icon: Building2 },
  { name: 'Techniciens', href: '/admin/roles', icon: Users },
  { name: 'Settings', href: '/admin/permissions', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore();
  const isMobile = useIsMobile();
  const { tenant } = useTenant();

  const { theme, setTheme, currentTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
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
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col',
          'bg-sidebar border-sidebar-border',
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-20' : 'w-64',
          isMobile && !sidebarOpen && '-translate-x-full',
          isMobile && 'lg:translate-x-0'
        )}
        style={{
          backgroundColor: `hsl(${theme.colors.sidebarBg})`,
           color: `hsl(${theme.colors.sidebarText})`,
        }}
      >
        {/* Logo */}
        <div
          className={cn(
            'h-16 flex items-center border-sidebar-border px-4',
            'bg-gradient-to-r from-sidebar to-sidebar/95',
            sidebarCollapsed ? 'justify-center' : 'justify-between'
          )}
          style={{
            color: `hsl(${theme.colors.sidebarText})`,
            opacity:0.7
          }}

        >
          {sidebarCollapsed ? (
            <div className="p-2 bg-primary/20 rounded-xl backdrop-blur-sm ring-1 ring-primary/30">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl"></div>
                <div className="relative p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/50">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">{tenant?.name}</h1>
                <p className="text-xs text-sidebar-foreground/60">Maintenance</p>
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <TooltipProvider delayDuration={0}>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                const linkContent = (
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      'hover:bg-sidebar-accent group relative overflow-hidden',
                      active
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30'
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                      sidebarCollapsed && 'justify-center'
                    )}
                  >
                    {/* Animated background on hover */}
                    {!active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {/* Icon with animation */}
                    <div className={cn(
                      'relative z-10 transition-transform duration-200',
                      active ? 'scale-110' : 'group-hover:scale-110'
                    )}>
                      <Icon className="h-5 w-5 flex-shrink-0" />
                    </div>

                    {/* Label */}
                    {!sidebarCollapsed && (
                      <span className="relative z-10">{item.name}</span>
                    )}

                    {/* Active indicator */}
                    {active && !sidebarCollapsed && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-white/80 animate-pulse"></div>
                    )}
                  </Link>
                );

                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-sidebar border-sidebar-border">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={item.name}>{linkContent}</div>;
              })}
            </nav>
          </TooltipProvider>
        </ScrollArea>

        {/* Footer */}
        <div className="border-sidebar-border p-3 space-y-2 bg-sidebar/50 backdrop-blur-sm">
          {/* Settings */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    'hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground group',
                    sidebarCollapsed && 'justify-center'
                  )}
                >
                  <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  {!sidebarCollapsed && <span>Paramètres</span>}
                </Link>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right" className="bg-sidebar border-sidebar-border">
                  <p>Paramètres</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
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
          {/* Collapse Button (Desktop only) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size={sidebarCollapsed ? 'icon' : 'sm'}
              onClick={toggleSidebarCollapsed}
              className={cn(
                'w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                sidebarCollapsed && 'justify-center'
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Réduire
                </>
              )}
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}