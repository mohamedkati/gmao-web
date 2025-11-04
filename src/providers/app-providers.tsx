'use client';

import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/shared/lib/api/query-client';
// import { ThemeProvider } from './theme-provider';
import { TenantProvider } from './tenant-provider';
import { AuthProvider } from './auth-provider';
import { ToastProvider } from './toast-provider';
import type { Tenant } from '@/shared/types/tenant.types';
// import { SignalRProvider } from '@/shared/lib/realtime/signalr-context';

interface AppProvidersProps {
  children: ReactNode;
  initialTenant?: Tenant;
}

/**
 * Provider racine qui combine tous les providers de l'application
 */
export function AppProviders({ children, initialTenant }: AppProvidersProps) {
  return (

    <QueryClientProvider client={queryClient}>
      <TenantProvider initialTenant={initialTenant}>
        <AuthProvider>
          {/* <SignalRProvider autoConnect={true}> */}
            <ToastProvider />
            {children}
          {/* </SignalRProvider> */}
        </AuthProvider>
      </TenantProvider>

      {/* DevTools uniquement en développement */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}