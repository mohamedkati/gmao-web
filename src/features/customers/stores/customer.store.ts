import { create } from 'zustand';
import {  CustomerFilters } from '../types/customer.types';

interface CustomerState {
  // Data
  // customers: Customer[];
  selectedCustomerId: string | null;

  // UI State
  isDrawerOpen: boolean;
  drawerMode: 'create' | 'edit' | 'view' | null;
  isContactDrawerOpen: boolean;
  selectedContactId: string | null;
  isBudgetDrawerOpen: boolean;
  selectedBudgetId: string | null;

  // Filters
  filters: CustomerFilters;

  // Actions
  // setCustomers: (customers: Customer[]) => void;
  setSelectedCustomerId: (customerId: string | null) => void;
  openDrawer: (mode: 'create' | 'edit' | 'view', customerId?: string) => void;
  closeDrawer: () => void;
  openContactDrawer: (contactId?: string) => void;
  closeContactDrawer: () => void;
  openBudgetDrawer: (budgetId?: string) => void;
  closeBudgetDrawer: () => void;
  setFilters: (filters: CustomerFilters) => void;
  resetFilters: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  // Initial state
  // customers: [],
  selectedCustomerId: null,
  isDrawerOpen: false,
  drawerMode: null,
  isContactDrawerOpen: false,
  selectedContactId: null,
  isBudgetDrawerOpen: false,
  selectedBudgetId: null,
  filters: {},

  // Actions
  // setCustomers: (customers) => set({ customers }),

  setSelectedCustomerId: (customerId) => set({ selectedCustomerId: customerId }),

  openDrawer: (mode, customerId) => set({
    isDrawerOpen: true,
    drawerMode: mode,
    selectedCustomerId: customerId || null
  }),

  closeDrawer: () => set({
    isDrawerOpen: false,
    drawerMode: null,
    selectedCustomerId: null
  }),

  openContactDrawer: (contactId) => set({
    isContactDrawerOpen: true,
    selectedContactId: contactId ?? null
  }),

  closeContactDrawer: () => set({
    isContactDrawerOpen: false,
    selectedContactId: null
  }),

  openBudgetDrawer: (budgetId) => set({
    isBudgetDrawerOpen: true,
    selectedBudgetId: budgetId ?? null
  }),

  closeBudgetDrawer: () => set({
    isBudgetDrawerOpen: false,
    selectedBudgetId: null
  }),

  setFilters: (filters) => set({ filters }),

  resetFilters: () => set({ filters: {} }),
}));