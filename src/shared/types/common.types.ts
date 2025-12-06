/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Type générique pour les réponses API paginées
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Type pour les réponses API standard
 */
export interface ApiResponse<T = any> {
  isSucceeded: boolean;
  data: T;
  message?: string;
  errorMessage?: string;
}

export interface ApiValidationResponse extends ApiResponse<string> {
  isValidationError: boolean;
  errors: Record<string, string[]>;
}

/**
 * Type pour les timestamps
 */
export interface Timestamps {
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
}

/**
 * Type de base pour les entités
 */
export interface BaseEntity extends Timestamps {
  id: string;
}

/**
 * Type pour les entités avec tenant
 */
export interface TenantEntity extends BaseEntity {
  tenantId: string;
}

/**
 * Type pour les options de select
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Type pour les résultats de recherche
 */
export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
}

/**
 * Type pour les erreurs
 */
export interface ErrorDetails {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

/**
 * Type pour les metadata
 */
export interface Metadata {
  [key: string]: any;
}

/**
 * Type pour les ID
 */
export type ID = string | number;

/**
 * Type pour les callbacks
 */
export type Callback<T = void> = (data: T) => void;

/**
 * Type pour les fonctions async
 */
export type AsyncFunction<T = void> = () => Promise<T>;