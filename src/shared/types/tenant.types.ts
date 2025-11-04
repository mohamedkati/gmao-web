/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Tenant (Organisation)
 */
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: Address;
  settings: TenantSettings;
  features: TenantFeatures;
  subscription?: TenantSubscription;
  metadata?: Record<string, any>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Paramètres du tenant
 */
export interface TenantSettings {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  currency?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Dimanche, 1 = Lundi
}

/**
 * Features activées pour le tenant
 */
export interface TenantFeatures {
  notifications?: boolean;
  analytics?: boolean;
  realtime?: boolean;
  mobileApp?: boolean;
  apiAccess?: boolean;
  customBranding?: boolean;
  advancedReports?: boolean;
}

/**
 * Abonnement du tenant
 */
export interface TenantSubscription {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date | string;
  endDate?: Date | string;
  limits: {
    users?: number;
    workOrders?: number;
    storage?: number; // en GB
  };
}

/**
 * Adresse
 */
export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}