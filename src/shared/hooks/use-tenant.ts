'use client';

import { useContext } from 'react';
import { TenantContext } from '../lib/tenant/tenant-context';

/**
 * Hook pour accéder au contexte du tenant
 */
export function useTenant() {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }

  return context;
}