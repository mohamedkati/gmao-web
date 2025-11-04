'use client';

import { TenantProvider as TenantContextProvider } from '@/shared/lib/tenant/tenant-context';
import type { Tenant } from '@/shared/types/tenant.types';
import type { ReactNode } from 'react';

interface TenantProviderProps {
  children: ReactNode;
  initialTenant?: Tenant;
}

/**
 * Wrapper pour le TenantProvider
 */
export function TenantProvider({ children, initialTenant }: TenantProviderProps) {
  return (
    <TenantContextProvider initialTenant={initialTenant}>
      {children}
    </TenantContextProvider>
  );
}