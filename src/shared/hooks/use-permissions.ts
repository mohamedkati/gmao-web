'use client';

import { useQuery } from '@tanstack/react-query';
import { permissionsPublicService } from '../services/permissions-public.service';
import { QUERY_KEYS } from '../lib/api/query-client';
import { useMemo } from 'react';

/**
 * Hook pour vérifier les permissions
 */
export function useUserPermissions() {
  return useQuery({
    queryKey: QUERY_KEYS.PERMISSIONS,
    queryFn: () => permissionsPublicService.getMyPermissions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook pour récupérer la configuration des permissions
 */
export function usePermissionsConfig() {
  return useQuery({
    queryKey: QUERY_KEYS.CONFIG,
    queryFn: () => permissionsPublicService.getConfig(),
    staleTime: 1000 * 60 * 60, // 1 heure (change rarement)
    gcTime: 1000 * 60 * 60 * 24, // 24 heures
  });
}

// ===== PERMISSION CHECKS =====

/**
 * Hook pour vérifier UNE permission
 */
// src/shared/hooks/use-auth.ts (optimisé)


export function usePermission(resource: string, action: string): boolean {
  const { data: permissions } = useUserPermissions();

  // Mémoiser le Set pour éviter de le recréer à chaque render
  const permSet = useMemo(() => {
    return new Set(permissions?.permissions || []);
  }, [permissions?.permissions]);

  // Mémoiser le résultat
  return useMemo(() => {
    if (!permissions) return false;

    const code = `${resource.toLowerCase()}:${action.toLowerCase()}`;

    return (
      permSet.has(code) ||
      permSet.has(`${resource.toLowerCase()}:*`) ||
      permSet.has(`*:${action.toLowerCase()}`) ||
      permSet.has("*:*")
    );
  }, [permissions, resource, action, permSet]);
}

/**
 * Hook pour vérifier PLUSIEURS permissions (au moins une)
 */
export function useAnyPermission(
  checks: Array<{ resource: string; action: string }>
): boolean {
  const { data: permissions } = useUserPermissions();

  if (!permissions || checks.length === 0) return false;

  const permSet = new Set(permissions.permissions);

  const hasPermission = (resource: string, action: string) => {
    const code = `${resource.toLowerCase()}:${action.toLowerCase()}`;
    return (
      permSet.has(code) ||
      permSet.has(`${resource.toLowerCase()}:*`) ||
      permSet.has(`*:${action.toLowerCase()}`) ||
      permSet.has("*:*")
    );
  };

  return checks.some((check) => hasPermission(check.resource, check.action));
}

/**
 * Hook pour vérifier TOUTES les permissions
 */
export function useAllPermissions(
  checks: Array<{ resource: string; action: string }>
): boolean {
  const { data: permissions } = useUserPermissions();

  if (!permissions || checks.length === 0) return false;

  const permSet = new Set(permissions.permissions);

  const hasPermission = (resource: string, action: string) => {
    const code = `${resource.toLowerCase()}:${action.toLowerCase()}`;
    return (
      permSet.has(code) ||
      permSet.has(`${resource.toLowerCase()}:*`) ||
      permSet.has(`*:${action.toLowerCase()}`) ||
      permSet.has("*:*")
    );
  };

  return checks.every((check) => hasPermission(check.resource, check.action));
}

/**
 * Hook pour obtenir toutes les actions disponibles pour une ressource
 */
export function useResourceActions(resource: string): string[] {
  const { data: permissions } = useUserPermissions();

  if (!permissions) return [];

  return permissions.permissionsByResource[resource.toLowerCase()] || [];
}

/**
 * Hook pour vérifier si une ressource existe
 */
export function useHasResource(resource: string): boolean {
  const { data: config } = usePermissionsConfig();

  if (!config) return false;

  return config.resources.map((r) => r.toLowerCase()).includes(resource.toLowerCase());
}
