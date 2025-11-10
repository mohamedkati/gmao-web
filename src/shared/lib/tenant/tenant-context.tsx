/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AuthService } from '@/features/auth/services/auth.service';
import { useAuth } from '@/shared/hooks/use-auth';
import { AuthUserTenant } from '@/shared/types/auth.types';
import { ApiResponse } from '@/shared/types/common.types';
import { Tenant } from '@/shared/types/tenant.types';
import { createContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { isAuthenticated } from '../auth/auth-utils';



interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
  isLoading: boolean;
  refreshTenant: () => Promise<void>;
}

export const TenantContext = createContext<TenantContextType | null>(null);

interface TenantProviderProps {
  children: ReactNode;
  initialTenant?: Tenant;
}

export function TenantProvider({ children, initialTenant }: TenantProviderProps) {
  const [tenant, setTenant] = useState<Tenant | null>(initialTenant || null);
  const [isLoading, setIsLoading] = useState(!initialTenant);
  const { } = useAuth();

  // Charger le tenant au montage si pas de tenant initial
  useEffect(() => {
    if (!initialTenant) {
      fetchTenantInfo();
    }
  }, [initialTenant]);

  /**
   * Récupère les informations du tenant
   */
  const fetchTenantInfo = useCallback(async () => {

    if (!isAuthenticated()) {
      setTenant(null);
      return;
    }
    setIsLoading(true);

    try {
      // Récupérer l'ID du tenant depuis différentes sources
      // const tenantId = getTenantIdFromClient();

      // if (!tenantId) {
      //   console.warn('[Tenant] No tenant ID found');
      //   setIsLoading(false);
      //   return;
      // }

      // // Appeler l'API pour récupérer les infos du tenant
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}`
      // );

      // if (!response.ok) {
      //   throw new Error('Failed to fetch tenant info');
      // }
      var user: ApiResponse<AuthUserTenant> = await AuthService.getCurrentUserByToken();
      // const data = await response.json();
      if (user.isSucceeded)
        setTenant(user.data.tenant);
      else
        setTenant(null);
    } catch (error) {
      console.error('[Tenant] Failed to fetch tenant info:', error);

      // Utiliser un tenant par défaut en cas d'erreur
      setTenant(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Rafraîchir les informations du tenant
   */
  const refreshTenant = useCallback(async () => {
    await fetchTenantInfo();
  }, [fetchTenantInfo]);

  return (
    <TenantContext.Provider
      value={{
        tenant,
        setTenant,
        isLoading,
        refreshTenant
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

/**
 * Récupère l'ID du tenant côté client
 */
// function getTenantIdFromClient(): string | null {
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   const tenantMode = process.env.NEXT_PUBLIC_TENANT_MODE || 'subdomain';

//   switch (tenantMode) {
//     // case 'subdomain': {
//     //   const hostname = window.location.hostname;
//     //   const parts = hostname.split('.');

//     //   // localhost ou pas assez de segments
//     //   if (parts.length < 3 || hostname.includes('localhost')) {
//     //     return process.env.NEXT_PUBLIC_DEFAULT_TENANT || null;
//     //   }

//     //   return parts[0]!; // Retourner le sous-domaine
//     // }

//     // case 'path': {
//     //   const pathParts = window.location.pathname.split('/').filter(Boolean);
//     //   return pathParts[0] || null;
//     // }

//     case 'header': {
//       // Impossible de lire les headers côté client
//       // Doit être récupéré depuis un cookie ou localStorage
//       return localStorage.getItem('tenantId') || null;
//     }

//     default:
//       return null;
//   }
// }