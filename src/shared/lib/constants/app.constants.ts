/**
 * Configuration générale de l'application
 */
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'GMAO Pro',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  description: 'Gestion de Maintenance Assistée par Ordinateur',
  version: '1.0.0',
  
  // Pagination
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  
  // Upload
  maxFileSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  allowedFileTypes: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,application/pdf').split(','),
  
  // Dates
  dateFormat: 'dd/MM/yyyy',
  dateTimeFormat: 'dd/MM/yyyy HH:mm',
  timeFormat: 'HH:mm',
  
  // Locale
  locale: 'fr-FR',
  timezone: 'Europe/Paris',
  currency: 'EUR',
  
  // Features
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
    realtime: true,
  },
  
  // Timeouts
  apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  
  // Refresh intervals (ms)
  refreshIntervals: {
    dashboard: 60000, // 1 minute
    notifications: 30000, // 30 secondes
    workOrders: 120000, // 2 minutes
  },
} as const;

/**
 * Environnement de l'application
 */
export const APP_ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

/**
 * Statuts par défaut
 */
export const DEFAULT_STATUSES = {
  workOrder: ['pending', 'scheduled', 'in_progress', 'completed', 'cancelled'],
  asset: ['active', 'inactive', 'maintenance', 'retired'],
  maintenance: ['scheduled', 'in_progress', 'completed', 'cancelled'],
  contract: ['active', 'expired', 'cancelled'],
} as const;

/**
 * Priorités par défaut
 */
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * Couleurs des priorités
 */
export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: 'bg-blue-100 text-blue-800',
  [PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [PRIORITIES.HIGH]: 'bg-orange-100 text-orange-800',
  [PRIORITIES.CRITICAL]: 'bg-red-100 text-red-800',
} as const;

/**
 * Limites de l'application
 */
export const LIMITS = {
  maxTitleLength: 100,
  maxDescriptionLength: 1000,
  maxNotesLength: 5000,
  maxCommentLength: 500,
  maxSearchResults: 100,
} as const;

/**
 * Valeurs par défaut pour les formulaires
 */
export const FORM_DEFAULTS = {
  debounceDelay: 500, // ms
  autoSaveDelay: 3000, // ms
} as const;