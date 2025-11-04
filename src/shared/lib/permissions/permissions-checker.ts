import { Permission } from './permissions.constants';
import { Role, roleHasPermission } from './role-definitions';

/**
 * Interface utilisateur pour la vérification des permissions
 */
export interface User {
  id: string;
  role: Role;
  permissions?: Permission[];
}

/**
 * Vérifie si un utilisateur a une permission
 */
export function userCan(user: User | null, permission: Permission): boolean {
  if (!user) {
    return false;
  }

  // Vérifier les permissions custom de l'utilisateur
  if (user.permissions?.includes(permission)) {
    return true;
  }

  // Vérifier les permissions du rôle
  return roleHasPermission(user.role, permission);
}

/**
 * Vérifie si un utilisateur a toutes les permissions
 */
export function userCanAll(user: User | null, permissions: Permission[]): boolean {
  return permissions.every((permission) => userCan(user, permission));
}

/**
 * Vérifie si un utilisateur a au moins une des permissions
 */
export function userCanAny(user: User | null, permissions: Permission[]): boolean {
  return permissions.some((permission) => userCan(user, permission));
}

/**
 * Vérifie si un utilisateur a un rôle spécifique
 */
export function userHasRole(user: User | null, role: Role): boolean {
  return user?.role === role;
}

/**
 * Vérifie si un utilisateur a un des rôles
 */
export function userHasAnyRole(user: User | null, roles: Role[]): boolean {
  return roles.some((role) => userHasRole(user, role));
}

/**
 * Filtre une liste d'éléments basé sur les permissions
 */
export function filterByPermission<T>(
  items: T[],
  user: User | null,
  getPermission: (item: T) => Permission
): T[] {
  return items.filter((item) => userCan(user, getPermission(item)));
}