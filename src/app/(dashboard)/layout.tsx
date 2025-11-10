'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useUIStore } from '@/store/ui.store';
import { cn } from '@/shared/lib/utils/cn';
import { useIsMobile } from '@/shared/hooks/use-media-query';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { sidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore();
  const isMobile = useIsMobile();
  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={cn(
          'flex-1 flex flex-col overflow-hidden transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative container mx-auto p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}