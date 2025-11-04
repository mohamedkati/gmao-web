/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '../lib/permissions/role-definitions';
import { Permission } from '../lib/permissions/permissions.constants';

/**
 * Utilisateur de l'application
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  tenantId: string;
  phone?: string;
  title?: string; // Fonction
  department?: string;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: Date | string;
  metadata?: Record<string, any>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Statut utilisateur
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

/**
 * Préférences utilisateur
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard: {
    layout?: string;
    widgets?: string[];
  };
}

/**
 * Profil utilisateur (pour l'édition)
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  title?: string;
  department?: string;
  avatar?: string;
}