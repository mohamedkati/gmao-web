'use client';

import { useAuth } from './use-auth';
import { Permission } from '../lib/permissions/permissions.constants';
import { userCan, userCanAll, userCanAny, userHasRole } from '../lib/permissions/permissions-checker';
import { Role } from '../lib/permissions/role-definitions';

/**
 * Hook pour vérifier les permissions
 */
export function usePermissions() {
  const { user } = useAuth();

  const can = (permission: Permission): boolean => {
    return userCan(user, permission);
  };

  const canAll = (permissions: Permission[]): boolean => {
    return userCanAll(user, permissions);
  };

  const canAny = (permissions: Permission[]): boolean => {
    return userCanAny(user, permissions);
  };

  const hasRole = (role: Role): boolean => {
    return userHasRole(user, role);
  };

  return {
    can,
    canAll,
    canAny,
    hasRole,
  };
}