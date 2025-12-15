'use client';

import { ReactNode } from 'react';
// import { ThemeProvider } from './theme-provider';
import { TenantProvider } from './tenant-provider';
import { AuthProvider } from './auth-provider';
import type { Tenant } from '@/shared/types/tenant.types';
import { Toaster } from '@/shared/components/shadcnui/toaster';
import { ToastProvider } from './toast-provider';

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
    <AuthProvider>
      <TenantProvider initialTenant={initialTenant}>
        {/* <SignalRProvider autoConnect={true}> */}
        <ToastProvider />
        <Toaster />
        {children}
        {/* </SignalRProvider> */}
      </TenantProvider>
    </AuthProvider>
  )
}