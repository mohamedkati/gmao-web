// src/shared/hooks/use-table-selection.ts

import { useState, useMemo } from "react";

export function useTableSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedIds.has(item.id));
  }, [items, selectedIds]);

  const isSelected = (id: string) => selectedIds.has(id);

  const isAllSelected = useMemo(() => {
    return items.length > 0 && selectedIds.size === items.length;
  }, [items.length, selectedIds.size]);

  const isIndeterminate = useMemo(() => {
    return selectedIds.size > 0 && selectedIds.size < items.length;
  }, [selectedIds.size, items.length]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((item) => item.id)));
    }
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  return {
    selectedIds,
    selectedItems,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggleSelection,
    toggleAll,
    clearSelection,
    selectedCount: selectedIds.size,
  };
}