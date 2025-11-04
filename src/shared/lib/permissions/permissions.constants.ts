/**
 * Énumération de toutes les permissions disponibles
 */
export enum Permission {
  // Work Orders
  WORK_ORDERS_VIEW = 'work-orders:view',
  WORK_ORDERS_CREATE = 'work-orders:create',
  WORK_ORDERS_EDIT = 'work-orders:edit',
  WORK_ORDERS_DELETE = 'work-orders:delete',
  WORK_ORDERS_ASSIGN = 'work-orders:assign',
  WORK_ORDERS_EXPORT = 'work-orders:export',

  // Assets
  ASSETS_VIEW = 'assets:view',
  ASSETS_CREATE = 'assets:create',
  ASSETS_EDIT = 'assets:edit',
  ASSETS_DELETE = 'assets:delete',
  ASSETS_EXPORT = 'assets:export',

  // Maintenance
  MAINTENANCE_VIEW = 'maintenance:view',
  MAINTENANCE_CREATE = 'maintenance:create',
  MAINTENANCE_EDIT = 'maintenance:edit',
  MAINTENANCE_DELETE = 'maintenance:delete',

  // Contracts
  CONTRACTS_VIEW = 'contracts:view',
  CONTRACTS_CREATE = 'contracts:create',
  CONTRACTS_EDIT = 'contracts:edit',
  CONTRACTS_DELETE = 'contracts:delete',

  // Inventory
  INVENTORY_VIEW = 'inventory:view',
  INVENTORY_CREATE = 'inventory:create',
  INVENTORY_EDIT = 'inventory:edit',
  INVENTORY_DELETE = 'inventory:delete',

  // Scheduling
  SCHEDULING_VIEW = 'scheduling:view',
  SCHEDULING_EDIT = 'scheduling:edit',

  // Customers
  CUSTOMERS_VIEW = 'customers:view',
  CUSTOMERS_CREATE = 'customers:create',
  CUSTOMERS_EDIT = 'customers:edit',
  CUSTOMERS_DELETE = 'customers:delete',

  // Technicians
  TECHNICIANS_VIEW = 'technicians:view',
  TECHNICIANS_CREATE = 'technicians:create',
  TECHNICIANS_EDIT = 'technicians:edit',
  TECHNICIANS_DELETE = 'technicians:delete',

  // Reports
  REPORTS_VIEW = 'reports:view',
  REPORTS_CREATE = 'reports:create',
  REPORTS_EXPORT = 'reports:export',

  // Settings
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_EDIT = 'settings:edit',
  
  // Users Management
  USERS_VIEW = 'users:view',
  USERS_CREATE = 'users:create',
  USERS_EDIT = 'users:edit',
  USERS_DELETE = 'users:delete',
  
  // Roles Management
  ROLES_VIEW = 'roles:view',
  ROLES_CREATE = 'roles:create',
  ROLES_EDIT = 'roles:edit',
  ROLES_DELETE = 'roles:delete',
}

/**
 * Groupes de permissions par module
 */
export const PermissionGroups = {
  WORK_ORDERS: [
    Permission.WORK_ORDERS_VIEW,
    Permission.WORK_ORDERS_CREATE,
    Permission.WORK_ORDERS_EDIT,
    Permission.WORK_ORDERS_DELETE,
    Permission.WORK_ORDERS_ASSIGN,
    Permission.WORK_ORDERS_EXPORT,
  ],
  ASSETS: [
    Permission.ASSETS_VIEW,
    Permission.ASSETS_CREATE,
    Permission.ASSETS_EDIT,
    Permission.ASSETS_DELETE,
    Permission.ASSETS_EXPORT,
  ],
  MAINTENANCE: [
    Permission.MAINTENANCE_VIEW,
    Permission.MAINTENANCE_CREATE,
    Permission.MAINTENANCE_EDIT,
    Permission.MAINTENANCE_DELETE,
  ],
  CONTRACTS: [
    Permission.CONTRACTS_VIEW,
    Permission.CONTRACTS_CREATE,
    Permission.CONTRACTS_EDIT,
    Permission.CONTRACTS_DELETE,
  ],
  INVENTORY: [
    Permission.INVENTORY_VIEW,
    Permission.INVENTORY_CREATE,
    Permission.INVENTORY_EDIT,
    Permission.INVENTORY_DELETE,
  ],
  SCHEDULING: [
    Permission.SCHEDULING_VIEW,
    Permission.SCHEDULING_EDIT,
  ],
  CUSTOMERS: [
    Permission.CUSTOMERS_VIEW,
    Permission.CUSTOMERS_CREATE,
    Permission.CUSTOMERS_EDIT,
    Permission.CUSTOMERS_DELETE,
  ],
  TECHNICIANS: [
    Permission.TECHNICIANS_VIEW,
    Permission.TECHNICIANS_CREATE,
    Permission.TECHNICIANS_EDIT,
    Permission.TECHNICIANS_DELETE,
  ],
  REPORTS: [
    Permission.REPORTS_VIEW,
    Permission.REPORTS_CREATE,
    Permission.REPORTS_EXPORT,
  ],
  SETTINGS: [
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_EDIT,
  ],
  USERS: [
    Permission.USERS_VIEW,
    Permission.USERS_CREATE,
    Permission.USERS_EDIT,
    Permission.USERS_DELETE,
  ],
  ROLES: [
    Permission.ROLES_VIEW,
    Permission.ROLES_CREATE,
    Permission.ROLES_EDIT,
    Permission.ROLES_DELETE,
  ],
} as const;

/**
 * Labels des permissions pour l'affichage
 */
export const PermissionLabels: Record<Permission, string> = {
  // Work Orders
  [Permission.WORK_ORDERS_VIEW]: 'Voir les bons d\'intervention',
  [Permission.WORK_ORDERS_CREATE]: 'Créer des bons d\'intervention',
  [Permission.WORK_ORDERS_EDIT]: 'Modifier les bons d\'intervention',
  [Permission.WORK_ORDERS_DELETE]: 'Supprimer les bons d\'intervention',
  [Permission.WORK_ORDERS_ASSIGN]: 'Assigner les bons d\'intervention',
  [Permission.WORK_ORDERS_EXPORT]: 'Exporter les bons d\'intervention',

  // Assets
  [Permission.ASSETS_VIEW]: 'Voir les équipements',
  [Permission.ASSETS_CREATE]: 'Créer des équipements',
  [Permission.ASSETS_EDIT]: 'Modifier les équipements',
  [Permission.ASSETS_DELETE]: 'Supprimer les équipements',
  [Permission.ASSETS_EXPORT]: 'Exporter les équipements',

  // Maintenance
  [Permission.MAINTENANCE_VIEW]: 'Voir les maintenances',
  [Permission.MAINTENANCE_CREATE]: 'Créer des maintenances',
  [Permission.MAINTENANCE_EDIT]: 'Modifier les maintenances',
  [Permission.MAINTENANCE_DELETE]: 'Supprimer les maintenances',

  // Contracts
  [Permission.CONTRACTS_VIEW]: 'Voir les contrats',
  [Permission.CONTRACTS_CREATE]: 'Créer des contrats',
  [Permission.CONTRACTS_EDIT]: 'Modifier les contrats',
  [Permission.CONTRACTS_DELETE]: 'Supprimer les contrats',

  // Inventory
  [Permission.INVENTORY_VIEW]: 'Voir le stock',
  [Permission.INVENTORY_CREATE]: 'Ajouter des articles',
  [Permission.INVENTORY_EDIT]: 'Modifier le stock',
  [Permission.INVENTORY_DELETE]: 'Supprimer des articles',

  // Scheduling
  [Permission.SCHEDULING_VIEW]: 'Voir le planning',
  [Permission.SCHEDULING_EDIT]: 'Modifier le planning',

  // Customers
  [Permission.CUSTOMERS_VIEW]: 'Voir les clients',
  [Permission.CUSTOMERS_CREATE]: 'Créer des clients',
  [Permission.CUSTOMERS_EDIT]: 'Modifier les clients',
  [Permission.CUSTOMERS_DELETE]: 'Supprimer les clients',

  // Technicians
  [Permission.TECHNICIANS_VIEW]: 'Voir les techniciens',
  [Permission.TECHNICIANS_CREATE]: 'Créer des techniciens',
  [Permission.TECHNICIANS_EDIT]: 'Modifier les techniciens',
  [Permission.TECHNICIANS_DELETE]: 'Supprimer les techniciens',

  // Reports
  [Permission.REPORTS_VIEW]: 'Voir les rapports',
  [Permission.REPORTS_CREATE]: 'Créer des rapports',
  [Permission.REPORTS_EXPORT]: 'Exporter les rapports',

  // Settings
  [Permission.SETTINGS_VIEW]: 'Voir les paramètres',
  [Permission.SETTINGS_EDIT]: 'Modifier les paramètres',

  // Users
  [Permission.USERS_VIEW]: 'Voir les utilisateurs',
  [Permission.USERS_CREATE]: 'Créer des utilisateurs',
  [Permission.USERS_EDIT]: 'Modifier les utilisateurs',
  [Permission.USERS_DELETE]: 'Supprimer les utilisateurs',

  // Roles
  [Permission.ROLES_VIEW]: 'Voir les rôles',
  [Permission.ROLES_CREATE]: 'Créer des rôles',
  [Permission.ROLES_EDIT]: 'Modifier les rôles',
  [Permission.ROLES_DELETE]: 'Supprimer les rôles',
};