/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Opérateurs de filtre
 */
export enum FilterOperator {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUAL = 'lte',
  IN = 'in',
  NOT_IN = 'notIn',
  BETWEEN = 'between',
  IS_NULL = 'isNull',
  IS_NOT_NULL = 'isNotNull',
}

/**
 * Filtre générique
 */
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: any;
}

/**
 * Groupe de filtres
 */
export interface FilterGroup {
  operator: 'AND' | 'OR';
  filters: (Filter | FilterGroup)[];
}

/**
 * Options de tri
 */
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * État des filtres pour une table
 */
export interface TableFilterState {
  filters: Filter[];
  sorting: SortOption[];
  search?: string;
}