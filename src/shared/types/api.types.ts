/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Types pour les requêtes API
 */

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

export interface SearchParams {
  query?: string;
}

export type QueryParams = PaginationParams & SortParams & FilterParams & SearchParams;

/**
 * Types pour les réponses d'erreur
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}

/**
 * Types pour les métadonnées de réponse
 */
export interface ResponseMetadata {
  timestamp: string;
  requestId?: string;
  version?: string;
}