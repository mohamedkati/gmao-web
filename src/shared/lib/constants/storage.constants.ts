/**
 * Clés pour le localStorage
 */
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: 'auth-token',
  REFRESH_TOKEN: 'refresh-token',
  TOKEN_EXPIRY: 'token-expiry',
  
  // User
  USER_PREFERENCES: 'user-preferences',
  USER_THEME: 'user-theme',
  USER_LOCALE: 'user-locale',
  
  // Tenant
  TENANT_ID: 'tenant-id',
  TENANT_SUBDOMAIN: 'tenant-subdomain',
  
  // UI State
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  TABLE_PAGE_SIZE: 'table-page-size',
  RECENT_SEARCHES: 'recent-searches',
  
  // Filters
  WORK_ORDERS_FILTERS: 'work-orders-filters',
  ASSETS_FILTERS: 'assets-filters',
  
  // Cache
  CACHE_PREFIX: 'gmao-cache-',
} as const;

/**
 * Durées d'expiration (ms)
 */
export const STORAGE_EXPIRY = {
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
  ONE_MONTH: 30 * 24 * 60 * 60 * 1000,
} as const;