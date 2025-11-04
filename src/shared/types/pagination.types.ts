/**
 * Paramètres de pagination
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Metadata de pagination
 */
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Résultat paginé
 */
export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Options de pagination pour les tables
 */
export interface TablePaginationState {
  pageIndex: number;
  pageSize: number;
}