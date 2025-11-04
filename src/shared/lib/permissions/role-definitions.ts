import { Permission, PermissionGroups } from './permissions.constants';

/**
 * Énumération des rôles système
 */
export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  VIEWER = 'viewer',
}

/**
 * Définition des permissions par rôle
 */
export const RolePermissions: Record<Role, Permission[]> = {
  // Super Admin : toutes les permissions
  [Role.SUPER_ADMIN]: Object.values(Permission),

  // Admin : toutes sauf gestion des rôles système
  [Role.ADMIN]: [
    ...PermissionGroups.WORK_ORDERS,
    ...PermissionGroups.ASSETS,
    ...PermissionGroups.MAINTENANCE,
    ...PermissionGroups.CONTRACTS,
    ...PermissionGroups.INVENTORY,
    ...PermissionGroups.SCHEDULING,
    ...PermissionGroups.CUSTOMERS,
    ...PermissionGroups.TECHNICIANS,
    ...PermissionGroups.REPORTS,
    ...PermissionGroups.SETTINGS,
    ...PermissionGroups.USERS,
    Permission.ROLES_VIEW,
  ],

  // Manager : gestion opérationnelle
  [Role.MANAGER]: [
    ...PermissionGroups.WORK_ORDERS,
    ...PermissionGroups.ASSETS,
    ...PermissionGroups.MAINTENANCE,
    ...PermissionGroups.INVENTORY,
    ...PermissionGroups.SCHEDULING,
    Permission.CUSTOMERS_VIEW,
    Permission.CUSTOMERS_EDIT,
    Permission.TECHNICIANS_VIEW,
    ...PermissionGroups.REPORTS,
    Permission.SETTINGS_VIEW,
  ],

  // Technician : exécution des interventions
  [Role.TECHNICIAN]: [
    Permission.WORK_ORDERS_VIEW,
    Permission.WORK_ORDERS_EDIT,
    Permission.ASSETS_VIEW,
    Permission.INVENTORY_VIEW,
    Permission.SCHEDULING_VIEW,
    Permission.CUSTOMERS_VIEW,
  ],

  // Viewer : lecture seule
  [Role.VIEWER]: [
    Permission.WORK_ORDERS_VIEW,
    Permission.ASSETS_VIEW,
    Permission.MAINTENANCE_VIEW,
    Permission.CONTRACTS_VIEW,
    Permission.INVENTORY_VIEW,
    Permission.SCHEDULING_VIEW,
    Permission.CUSTOMERS_VIEW,
    Permission.TECHNICIANS_VIEW,
    Permission.REPORTS_VIEW,
  ],
};

/**
 * Labels des rôles
 */
export const RoleLabels: Record<Role, string> = {
  [Role.SUPER_ADMIN]: 'Super Administrateur',
  [Role.ADMIN]: 'Administrateur',
  [Role.MANAGER]: 'Manager',
  [Role.TECHNICIAN]: 'Technicien',
  [Role.VIEWER]: 'Observateur',
};

/**
 * Descriptions des rôles
 */
export const RoleDescriptions: Record<Role, string> = {
  [Role.SUPER_ADMIN]: 'Accès complet à toutes les fonctionnalités',
  [Role.ADMIN]: 'Gestion complète de l\'organisation',
  [Role.MANAGER]: 'Gestion opérationnelle et planning',
  [Role.TECHNICIAN]: 'Exécution des interventions',
  [Role.VIEWER]: 'Consultation uniquement',
};

/**
 * Vérifie si un rôle a une permission
 */
export function roleHasPermission(role: Role, permission: Permission): boolean {
  return RolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Récupère toutes les permissions d'un rôle
 */
export function getRolePermissions(role: Role): Permission[] {
  return RolePermissions[role] || [];
}