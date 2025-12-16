// features/customers/stores/useCustomerStore.ts
import { create } from "zustand";

interface CustomerStoreState {
  // Drawer states
  isCreateDrawerOpen: boolean;
  isCreateModalOpen: boolean;
  selectedCustomerId: string | null;

  // Actions
  openCreateDrawer: () => void;
  closeCreateDrawer: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  setSelectedCustomer: (id: string | null) => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  isCreateDrawerOpen: false,
  isCreateModalOpen: false,
  selectedCustomerId: null,

  openCreateDrawer: () => set({ isCreateDrawerOpen: true }),
  closeCreateDrawer: () => set({ isCreateDrawerOpen: false }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  setSelectedCustomer: (id) => set({ selectedCustomerId: id }),
}));