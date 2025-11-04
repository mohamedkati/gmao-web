/**
 * Base URL de l'API
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Endpoints de l'API
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },

  // Tenants
  TENANTS: {
    BASE: '/tenants',
    BY_ID: (id: string) => `/tenants/${id}`,
    VALIDATE: (id: string) => `/tenants/${id}/validate`,
  },

  // Work Orders
  WORK_ORDERS: {
    BASE: '/work-orders',
    BY_ID: (id: string) => `/work-orders/${id}`,
    BY_STATUS: (status: string) => `/work-orders/status/${status}`,
    ASSIGN: (id: string) => `/work-orders/${id}/assign`,
    COMPLETE: (id: string) => `/work-orders/${id}/complete`,
    CANCEL: (id: string) => `/work-orders/${id}/cancel`,
    EXPORT: '/work-orders/export',
    HISTORY: (id: string) => `/work-orders/${id}/history`,
  },

  // Assets
  ASSETS: {
    BASE: '/assets',
    BY_ID: (id: string) => `/assets/${id}`,
    HISTORY: (id: string) => `/assets/${id}/history`,
    MAINTENANCE: (id: string) => `/assets/${id}/maintenance`,
    DOCUMENTS: (id: string) => `/assets/${id}/documents`,
    QR_CODE: (id: string) => `/assets/${id}/qr-code`,
  },

  // Maintenance
  MAINTENANCE: {
    BASE: '/maintenance-plans',
    BY_ID: (id: string) => `/maintenance-plans/${id}`,
    SCHEDULE: '/maintenance-plans/schedule',
    PREVENTIVE: '/maintenance-plans/preventive',
    CORRECTIVE: '/maintenance-plans/corrective',
  },

  // Contracts
  CONTRACTS: {
    BASE: '/contracts',
    BY_ID: (id: string) => `/contracts/${id}`,
    RENEWALS: (id: string) => `/contracts/${id}/renewals`,
    INVOICES: (id: string) => `/contracts/${id}/invoices`,
  },

  // Inventory
  INVENTORY: {
    BASE: '/inventory',
    BY_ID: (id: string) => `/inventory/${id}`,
    PARTS: '/inventory/parts',
    SUPPLIERS: '/inventory/suppliers',
    ORDERS: '/inventory/orders',
    LOW_STOCK: '/inventory/low-stock',
  },

  // Scheduling
  SCHEDULING: {
    BASE: '/scheduling',
    CALENDAR: '/scheduling/calendar',
    TECHNICIAN: (id: string) => `/scheduling/technician/${id}`,
    AVAILABILITY: '/scheduling/availability',
    CONFLICTS: '/scheduling/conflicts',
  },

  // Customers
  CUSTOMERS: {
    BASE: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
    SITES: (id: string) => `/customers/${id}/sites`,
    CONTACTS: (id: string) => `/customers/${id}/contacts`,
    WORK_ORDERS: (id: string) => `/customers/${id}/work-orders`,
  },

  // Technicians
  TECHNICIANS: {
    BASE: '/technicians',
    BY_ID: (id: string) => `/technicians/${id}`,
    SCHEDULE: (id: string) => `/technicians/${id}/schedule`,
    PERFORMANCE: (id: string) => `/technicians/${id}/performance`,
    AVAILABILITY: (id: string) => `/technicians/${id}/availability`,
  },

  // Reports
  REPORTS: {
    BASE: '/reports',
    BY_ID: (id: string) => `/reports/${id}`,
    PERFORMANCE: '/reports/performance',
    MAINTENANCE: '/reports/maintenance',
    FINANCIAL: '/reports/financial',
    CUSTOM: '/reports/custom',
    EXPORT: '/reports/export',
  },

  // Settings
  SETTINGS: {
    BASE: '/settings',
    ORGANIZATION: '/settings/organization',
    USERS: '/settings/users',
    ROLES: '/settings/roles',
    PERMISSIONS: '/settings/permissions',
    INTEGRATIONS: '/settings/integrations',
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Upload
  UPLOAD: {
    FILE: '/upload/file',
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
  },
} as const;

/**
 * Headers HTTP personnalisés
 */
export const CUSTOM_HEADERS = {
  TENANT_ID: 'X-Tenant-Id',
  REQUEST_ID: 'X-Request-Id',
  API_VERSION: 'X-API-Version',
} as const;

/**
 * Codes d'erreur API
 */
export const API_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
} as const;