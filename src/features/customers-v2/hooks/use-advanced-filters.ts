// src/shared/hooks/use-advanced-filters.ts

import { useState, useMemo } from "react";

export interface FilterConfig {
  id: string;
  label: string;
  type: "text" | "select" | "multiselect" | "date" | "daterange";
  options?: Array<{ label: string; value: string }>;
}

export interface ActiveFilter {
  id: string;
  value: any;
}

export function useAdvancedFilters<T>(
  items: T[],
  filterConfigs: FilterConfig[],
  filterFn: (item: T, filters: ActiveFilter[]) => boolean
) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    let result = items;

    // Recherche textuelle
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((item: any) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        );
      });
    }

    // Filtres avancés
    if (activeFilters.length > 0) {
      result = result.filter((item) => filterFn(item, activeFilters));
    }

    return result;
  }, [items, search, activeFilters, filterFn]);

  const addFilter = (filter: ActiveFilter) => {
    setActiveFilters((prev) => {
      const existing = prev.find((f) => f.id === filter.id);
      if (existing) {
        return prev.map((f) => (f.id === filter.id ? filter : f));
      }
      return [...prev, filter];
    });
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearch("");
  };

  return {
    filteredItems,
    activeFilters,
    search,
    setSearch,
    addFilter,
    removeFilter,
    clearFilters,
    hasActiveFilters: activeFilters.length > 0 || search !== "",
  };
}