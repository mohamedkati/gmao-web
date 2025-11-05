/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '../lib/permissions/role-definitions';
import { Permission } from '../lib/permissions/permissions.constants';
import { User } from './user.types';



/**
 * Credentials de connexion
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Données d'inscription
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
  phone?: string;
}

/**
 * Réponse de l'authentification
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Session utilisateur
 */
export interface Session {
  user: User;
  expiresAt: Date | string;
}

/**
 * Token JWT décodé
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: Role;
  permissions: Permission[];
  tenantId: string;
  iat: number; // Issued at
  exp: number; // Expiration
}