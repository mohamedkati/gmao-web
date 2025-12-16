// features/customers/stores/useBudgetStore.ts
import { create } from "zustand";

interface BudgetStoreState {
  isCreateDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedBudgetId: string | null;
  customerId: string | null;

  openCreateDrawer: (customerId: string) => void;
  closeCreateDrawer: () => void;
  openEditDrawer: (budgetId: string) => void;
  closeEditDrawer: () => void;
}

export const useBudgetStore = create<BudgetStoreState>((set) => ({
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  selectedBudgetId: null,
  customerId: null,

  openCreateDrawer: (customerId) => set({ isCreateDrawerOpen: true, customerId }),
  closeCreateDrawer: () => set({ isCreateDrawerOpen: false, customerId: null }),
  openEditDrawer: (budgetId) => set({ isEditDrawerOpen: true, selectedBudgetId: budgetId }),
  closeEditDrawer: () => set({ isEditDrawerOpen: false, selectedBudgetId: null }),
}));