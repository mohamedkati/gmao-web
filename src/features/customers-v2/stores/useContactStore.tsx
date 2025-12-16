// features/customers/stores/useContactStore.ts
import { create } from "zustand";

interface ContactStoreState {
  isCreateDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedContactId: string | null;
  customerId: string | null;

  openCreateDrawer: (customerId: string) => void;
  closeCreateDrawer: () => void;
  openEditDrawer: (contactId: string) => void;
  closeEditDrawer: () => void;
}

export const useContactStore = create<ContactStoreState>((set) => ({
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  selectedContactId: null,
  customerId: null,

  openCreateDrawer: (customerId) => set({ isCreateDrawerOpen: true, customerId }),
  closeCreateDrawer: () => set({ isCreateDrawerOpen: false, customerId: null }),
  openEditDrawer: (contactId) => set({ isEditDrawerOpen: true, selectedContactId: contactId }),
  closeEditDrawer: () => set({ isEditDrawerOpen: false, selectedContactId: null }),
}));