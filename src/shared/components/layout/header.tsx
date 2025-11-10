'use client';

import { Menu, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { useUIStore } from '@/store/ui.store';
import { useAuth } from '@/shared/hooks/use-auth';
// import { useNotificationsStore } from '@/store/notification.store';
import { getInitials } from '@/shared/lib/utils/string';
import { ThemeToggle } from './theme-toggle';
import { NotificationsPopover } from './notifications-popover';
import { useIsMobile } from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils/cn';

export function Header() {
  const { setSidebarOpen } = useUIStore();
  const { user, logout } = useAuth();
  // const { unreadCount } = useNotificationsStore();
  const isMobile = useIsMobile();

  return (
    <header className={cn(
      'h-16 border-b sticky top-0 z-40',
      'bg-card/80 backdrop-blur-xl',
      'border-border/50'
    )}>
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left: Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-accent"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Rechercher... (⌘K)"
              className={cn(
                'pl-10 h-9',
                'bg-muted/50 border-border/50',
                'focus:bg-background focus:border-primary/50',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationsPopover />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'relative h-10 gap-2 px-2',
                  'hover:bg-accent transition-colors'
                )}
              >
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.fullName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                    {user ? getInitials(user.fullName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isMobile && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.firstName}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user?.role}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/settings/profile" className="cursor-pointer">
                  Profil
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings" className="cursor-pointer">
                  Paramètres
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}