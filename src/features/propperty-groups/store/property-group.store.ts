import { create } from 'zustand';
import { mockPropertyGroups } from '../data/mock-property-groups';
import { PropertyGroup, PropertyGroupStatus, PropertyGroupType } from '../types/property-group';

type ConsolidatedBillingFilter = 'all' | 'yes' | 'no';

export interface PropertyGroupFilters {
  searchTerm: string;
  status: PropertyGroupStatus | 'all';
  type: PropertyGroupType | 'all';
  consolidatedBilling: ConsolidatedBillingFilter;
}

interface PropertyGroupState {
  propertyGroups: PropertyGroup[];
  selectedGroupId?: string;
  filters: PropertyGroupFilters;
  setFilters: (filters: Partial<PropertyGroupFilters>) => void;
  setSelectedGroup: (groupId?: string) => void;
  addPropertyGroup: (group: PropertyGroup) => void;
  updatePropertyGroup: (group: PropertyGroup) => void;
  resetFilters: () => void;
}

export const INITIAL_PROPERTY_GROUP_FILTERS: PropertyGroupFilters = {
  searchTerm: '',
  status: 'all',
  type: 'all',
  consolidatedBilling: 'all',
};

export const usePropertyGroupStore = create<PropertyGroupState>((set) => ({
  propertyGroups: mockPropertyGroups,
  selectedGroupId: mockPropertyGroups[0]?.id,
  filters: { ...INITIAL_PROPERTY_GROUP_FILTERS },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { ...INITIAL_PROPERTY_GROUP_FILTERS },
    })),
  setSelectedGroup: (groupId) =>
    set(() => ({
      selectedGroupId: groupId,
    })),
  addPropertyGroup: (group) =>
    set((state) => ({
      propertyGroups: [group, ...state.propertyGroups],
      selectedGroupId: group.id,
    })),
  updatePropertyGroup: (group) =>
    set((state) => ({
      propertyGroups: state.propertyGroups.map((existing) =>
        existing.id === group.id ? group : existing,
      ),
      selectedGroupId: group.id,
    })),
}));