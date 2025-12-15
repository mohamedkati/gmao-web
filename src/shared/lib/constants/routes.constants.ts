/**
 * Routes de l'application
 */
export const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password', '/reset-password'];
export const ROUTES = {
  // Public
  HOME: '/',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Work Orders
  WORK_ORDERS: '/work-orders',
  WORK_ORDERS_NEW: '/work-orders/new',
  WORK_ORDER_DETAIL: (id: string) => `/work-orders/${id}`,
  WORK_ORDER_EDIT: (id: string) => `/work-orders/${id}/edit`,
  WORK_ORDER_HISTORY: (id: string) => `/work-orders/${id}/history`,

  // Assets
  ASSETS: '/assets',
  ASSETS_NEW: '/assets/new',
  ASSET_DETAIL: (id: string) => `/assets/${id}`,
  ASSET_EDIT: (id: string) => `/assets/${id}/edit`,
  ASSET_MAINTENANCE: (id: string) => `/assets/${id}/maintenance-history`,
  ASSET_DOCUMENTS: (id: string) => `/assets/${id}/documents`,
  
  // Maintenance
  MAINTENANCE: '/maintenance',
  MAINTENANCE_PREVENTIVE: '/maintenance/preventive',
  MAINTENANCE_CORRECTIVE: '/maintenance/corrective',
  MAINTENANCE_NEW: '/maintenance/new',
  MAINTENANCE_DETAIL: (id: string) => `/maintenance/${id}`,
  
  // Contracts
  CONTRACTS: '/contracts',
  CONTRACTS_NEW: '/contracts/new',
  CONTRACT_DETAIL: (id: string) => `/contracts/${id}`,
  CONTRACT_EDIT: (id: string) => `/contracts/${id}/edit`,
  CONTRACT_RENEWALS: (id: string) => `/contracts/${id}/renewals`,
  
  // Inventory
  INVENTORY: '/inventory',
  INVENTORY_PARTS: '/inventory/parts',
  INVENTORY_SUPPLIERS: '/inventory/suppliers',
  INVENTORY_ORDERS: '/inventory/orders',
  
  // Scheduling
  SCHEDULING: '/scheduling',
  SCHEDULING_CALENDAR: '/scheduling/calendar',
  SCHEDULING_GANTT: '/scheduling/gantt',
  
  // Customers
  CUSTOMERS: '/customers',
  CUSTOMERS_NEW: '/customers/new',
  CUSTOMER_DETAIL: (id: string) => `/customers/${id}`,
  CUSTOMER_SITES: (id: string) => `/customers/${id}/sites`,
  CUSTOMER_CONTACTS: (id: string) => `/customers/${id}/contacts`,
  
  // Technicians
  TECHNICIANS: '/technicians',
  TECHNICIANS_NEW: '/technicians/new',
  TECHNICIAN_DETAIL: (id: string) => `/technicians/${id}`,
  TECHNICIAN_SCHEDULE: (id: string) => `/technicians/${id}/schedule`,
  TECHNICIAN_PERFORMANCE: (id: string) => `/technicians/${id}/performance`,
  
  // Reports
  REPORTS: '/reports',
  REPORTS_PERFORMANCE: '/reports/performance',
  REPORTS_MAINTENANCE: '/reports/maintenance',
  REPORTS_FINANCIAL: '/reports/financial',
  REPORTS_CUSTOM: '/reports/custom',
  
  // Settings
  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_ORGANIZATION: '/settings/organization',
  SETTINGS_USERS: '/settings/users',
  SETTINGS_ROLES: '/settings/roles',
  SETTINGS_INTEGRATIONS: '/settings/integrations',
} as const;

/**
 * Navigation items
 */
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    name: 'Interventions',
    href: ROUTES.WORK_ORDERS,
    icon: 'Wrench',
  },
  {
    name: 'Équipements',
    href: ROUTES.ASSETS,
    icon: 'Package',
  },
  {
    name: 'Maintenances',
    href: ROUTES.MAINTENANCE,
    icon: 'Calendar',
  },
  {
    name: 'Contrats',
    href: ROUTES.CONTRACTS,
    icon: 'FileText',
  },
  {
    name: 'Stock',
    href: ROUTES.INVENTORY,
    icon: 'Package',
  },
  {
    name: 'Planning',
    href: ROUTES.SCHEDULING,
    icon: 'Calendar',
  },
  {
    name: 'Clients',
    href: ROUTES.CUSTOMERS,
    icon: 'Building2',
  },
  {
    name: 'Techniciens',
    href: ROUTES.TECHNICIANS,
    icon: 'Users',
  },
  {
    name: 'Rapports',
    href: ROUTES.REPORTS,
    icon: 'BarChart3',
  },
  {
    name: 'Paramètres',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
] as const;