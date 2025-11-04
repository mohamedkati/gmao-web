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
} from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import { useUIStore } from '@/store/ui.store';
import { useIsMobile } from '@/shared/hooks/use-media-query';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/shadcnui/tooltip';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Interventions', href: '/work-orders', icon: Wrench },
  { name: 'Équipements', href: '/assets', icon: Package },
  { name: 'Maintenances', href: '/maintenance', icon: Calendar },
  { name: 'Contrats', href: '/contracts', icon: FileText },
  { name: 'Stock', href: '/inventory', icon: BoxIcon },
  { name: 'Clients', href: '/customers', icon: Building2 },
  { name: 'Techniciens', href: '/technicians', icon: Users },
  { name: 'Rapports', href: '/reports', icon: BarChart3 },
];

/**
 * Sidebar de navigation principale
 */
export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore();
  const isMobile = useIsMobile();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-64',
          isMobile && !sidebarOpen && '-translate-x-full',
          isMobile && 'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'h-16 flex items-center border-b px-4',
          sidebarCollapsed ? 'justify-center' : 'justify-between'
        )}>
          {sidebarCollapsed ? (
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold">GMAO Pro</h1>
                <p className="text-xs text-muted-foreground">Maintenance</p>
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
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-accent hover:text-accent-foreground',
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground',
                      sidebarCollapsed && 'justify-center'
                    )}
                  >
                    <Icon className={cn('h-5 w-5 flex-shrink-0', active && 'animate-in')} />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                );

                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
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
        <div className="border-t p-3 space-y-2">
          {/* Settings */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground text-muted-foreground',
                    sidebarCollapsed && 'justify-center'
                  )}
                >
                  <Settings className="h-5 w-5" />
                  {!sidebarCollapsed && <span>Paramètres</span>}
                </Link>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right">
                  <p>Paramètres</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {/* Collapse Button (Desktop only) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size={sidebarCollapsed ? 'icon' : 'sm'}
              onClick={toggleSidebarCollapsed}
              className={cn('w-full', sidebarCollapsed && 'justify-center')}
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