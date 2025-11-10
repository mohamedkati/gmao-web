import { create } from 'zustand';
import { PropertyGroup, PropertyGroupFilters } from '../types/property-group.types';

interface PropertyGroupState {
  // Data
  propertyGroups: PropertyGroup[];
  selectedPropertyGroup: PropertyGroup | null;
  
  // UI State
  isDrawerOpen: boolean;
  drawerMode: 'create' | 'edit' | 'view' | null;
  isContactDrawerOpen: boolean;
  selectedContactIndex: number | null;
  
  // Filters
  filters: PropertyGroupFilters;
  
  // Actions
  setPropertyGroups: (groups: PropertyGroup[]) => void;
  setSelectedPropertyGroup: (group: PropertyGroup | null) => void;
  openDrawer: (mode: 'create' | 'edit' | 'view', group?: PropertyGroup) => void;
  closeDrawer: () => void;
  openContactDrawer: (contactIndex?: number) => void;
  closeContactDrawer: () => void;
  setFilters: (filters: PropertyGroupFilters) => void;
  resetFilters: () => void;
}

export const usePropertyGroupStore = create<PropertyGroupState>((set) => ({
  // Initial state
  propertyGroups: [],
  selectedPropertyGroup: null,
  isDrawerOpen: false,
  drawerMode: null,
  isContactDrawerOpen: false,
  selectedContactIndex: null,
  filters: {},
  
  // Actions
  setPropertyGroups: (groups) => set({ propertyGroups: groups }),
  
  setSelectedPropertyGroup: (group) => set({ selectedPropertyGroup: group }),
  
  openDrawer: (mode, group) => set({ 
    isDrawerOpen: true, 
    drawerMode: mode,
    selectedPropertyGroup: group || null
  }),
  
  closeDrawer: () => set({ 
    isDrawerOpen: false, 
    drawerMode: null,
    selectedPropertyGroup: null
  }),
  
  openContactDrawer: (contactIndex) => set({
    isContactDrawerOpen: true,
    selectedContactIndex: contactIndex ?? null
  }),
  
  closeContactDrawer: () => set({
    isContactDrawerOpen: false,
    selectedContactIndex: null
  }),
  
  setFilters: (filters) => set({ filters }),
  
  resetFilters: () => set({ filters: {} }),
}));