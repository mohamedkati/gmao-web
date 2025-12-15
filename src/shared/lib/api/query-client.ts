/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, DefaultOptions, QueryCache, MutationCache } from '@tanstack/react-query';
import { extractErrorMessage } from './api-error-handler';

/**
 * Configuration par défaut pour React Query
 */
const queryConfig: DefaultOptions = {
  queries: {
    // Temps avant que les données soient considérées comme "stale"
    staleTime: 5 * 60 * 1000, // 5 minutes
    
    // Temps avant que les données soient supprimées du cache
    gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
    
    // Nombre de tentatives en cas d'erreur
    retry: (failureCount, error: any) => {
      // Ne pas retry sur les erreurs 4xx (client errors)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    
    // Délai entre les tentatives (exponential backoff)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Refetch options
    refetchOnWindowFocus: false, // Ne pas refetch automatiquement au focus
    refetchOnReconnect: true, // Refetch à la reconnexion
    refetchOnMount: true, // Refetch au montage du composant
    
    // Network mode
    networkMode: 'online', // Seulement quand en ligne
  },
  
  mutations: {
    // Retry pour les mutations
    retry: 1, // Une seule tentative pour les mutations
    
    // Network mode
    networkMode: 'online',
  },
};

/**
 * Query Cache avec gestion globale des erreurs
 */
const queryCache = new QueryCache({
  onError: (error, query) => {
    console.error('[React Query] Query Error:', {
      queryKey: query.queryKey,
      error: extractErrorMessage(error),
    });

    // Vous pouvez ajouter ici une notification toast globale
    // toast.error(extractErrorMessage(error));
  },
  
  onSuccess: (data, query) => {
    if (process.env.NODE_ENV === 'development') {
      // console.log('[React Query] Query Success:', {
      //   queryKey: query.queryKey,
      //   data,
      // });
    }
  },
});

/**
 * Mutation Cache avec gestion globale des erreurs
 */
const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    console.error('[React Query] Mutation Error:', {
      mutationKey: mutation.options.mutationKey,
      error: extractErrorMessage(error),
    });

    // Notification toast globale pour les erreurs de mutation
    // toast.error(extractErrorMessage(error));
  },
  
  onSuccess: (data, _variables, _context, mutation) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[React Query] Mutation Success:', {
        mutationKey: mutation.options.mutationKey,
        data,
      });
    }
  },
});

/**
 * Instance du Query Client
 */
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache,
  mutationCache,
});

/**
 * Préfixe pour les query keys pour éviter les collisions
 */
export const QUERY_KEYS = {
  // Auth
  AUTH: ['auth'],
  CURRENT_USER: ['auth', 'current-user'],
  PERMISSIONS: ["auth", "permissions"] as const,
  CONFIG: ["permissions", "config"] as const,
  // Work Orders
  WORK_ORDERS: ['work-orders'],
  WORK_ORDER: (id: string) => ['work-orders', id],
  WORK_ORDERS_BY_STATUS: (status: string) => ['work-orders', 'status', status],
  
  // Assets
  ASSETS: ['assets'],
  ASSET: (id: string) => ['assets', id],
  ASSET_HISTORY: (id: string) => ['assets', id, 'history'],
  
  // Maintenance
  MAINTENANCE_PLANS: ['maintenance-plans'],
  MAINTENANCE_PLAN: (id: string) => ['maintenance-plans', id],
  
  // Contracts
  CONTRACTS: ['contracts'],
  CONTRACT: (id: string) => ['contracts', id],
  
  // Inventory
  INVENTORY_ITEMS: ['inventory-items'],
  INVENTORY_ITEM: (id: string) => ['inventory-items', id],
  
  // Scheduling
  SCHEDULES: ['schedules'],
  TECHNICIAN_SCHEDULE: (technicianId: string) => ['schedules', 'technician', technicianId],
  
  // Customers
  CUSTOMERS: ['customers'],
  CUSTOMER: (id: string) => ['customers', id],
  CUSTOMER_SITES: (customerId: string) => ['customers', customerId, 'sites'],
  
  // Technicians
  TECHNICIANS: ['technicians'],
  TECHNICIAN: (id: string) => ['technicians', id],
  
  // Reports
  REPORTS: ['reports'],
  REPORT: (id: string) => ['reports', id],
  
  // Settings
  SETTINGS: ['settings'],
  ORGANIZATION: ['settings', 'organization'],
  USERS: ['settings', 'users'],
  ROLES: ['settings', 'roles'],
} as const;

/**
 * Helper pour invalider plusieurs queries en même temps
 */
export async function invalidateMultipleQueries(queryKeys: unknown[][]) {
  await Promise.all(
    queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
  );
}

/**
 * Helper pour préfetch une query
 */
export async function prefetchQuery<T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  options?: { staleTime?: number }
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime,
  });
}

/**
 * Helper pour définir des données dans le cache sans fetch
 */
export function setQueryData<T>(queryKey: unknown[], data: T) {
  queryClient.setQueryData(queryKey, data);
}

/**
 * Helper pour récupérer des données du cache
 */
export function getQueryData<T>(queryKey: unknown[]): T | undefined {
  return queryClient.getQueryData<T>(queryKey);
}