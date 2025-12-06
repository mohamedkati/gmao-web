// src/features/customers/hooks/use-customers.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { customerMockService as customerService } from '../services/customer-mock.service';
import { customerService } from '../services/customer.service';
import { CustomerFormData, CustomerContact, MaintenanceBudget } from '../types/customer.types';
// import { toast } from 'sonner';

// const toast = useGMAOToast();



const QUERY_KEYS = {
  all: ['customers'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  contacts: (id: string) => [...QUERY_KEYS.detail(id), 'contacts'] as const,
  contactById: (customerId: string, contactId: string) => [...QUERY_KEYS.detail(customerId), 'contacts', contactId] as const,
  budgets: (id: string) => [...QUERY_KEYS.detail(id), 'budgets'] as const,
  budgetById: (customerId: string, budgetId: string) => [...QUERY_KEYS.detail(customerId), 'budgets', budgetId] as const,

  statistics: ['customers', 'statistics'] as const,
};

// Get all customers
export const useCustomers = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => customerService.getAll(params),
    staleTime: 30000,
  });
};

// Get customer by ID
export const useCustomer = (id?: string) => {

  return useQuery({
    queryKey: QUERY_KEYS.detail(id || ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Customer ID is required');
      }
      return customerService.getById(id);
    },
    enabled: !!id,
    staleTime: 30000,
  });
};

// Get customer contacts
export const useCustomerContacts = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts(id || ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Customer ID is required');
      }
      return customerService.getContacts(id);
    },
    enabled: !!id,
    staleTime: 30000,
  });
};

// Get customer budgets
export const useCustomerBudgets = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.budgets(id || ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Customer ID is required');
      }
      return customerService.getBudgets(id);
    },
    enabled: !!id,
    staleTime: 30000,
  });
};


export const useCustomerContact = (customerId: string, contactId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.contactById(customerId, contactId),
    queryFn: () => {
      if(!customerId || !contactId)
        throw new Error("Customer Id et Contact Id sont requis");

      return customerService.getContact(customerId,contactId);
    },
    enabled: !!contactId || !!customerId,
    staleTime: 30000
  });
}

export const useCustomerBudget = (customerId: string, budgetId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.budgetById(customerId, budgetId),
    queryFn: () => {
      if(!customerId || !budgetId)
        throw new Error("Customer Id et Budget Id sont requis");

      return customerService.getBudget(customerId,budgetId);
    },
    enabled: !!budgetId || !!customerId,
    staleTime: 30000
  });
}
// Get statistics
// export const useCustomerStatistics = () => {
//   return useQuery({
//     queryKey: QUERY_KEYS.statistics,
//     queryFn: () => customerService.getStatistics(),
//     staleTime: 60000,
//   });
// };

// Create customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerFormData) => customerService.create(data),
    onSuccess: (response) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statistics });
      }
    },
    onError: (error: any) => {
      console.log(error);
      // toast.error(error?.response?.data?.message || 'Erreur lors de la création');
    },
  });
};

// Update customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerFormData> }) =>
      customerService.update(id, data),
    onSuccess: (response, variables) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statistics });
      }

    },
    onError: (error: any) => {
      console.log(error);
      
      // toast.error(error?.response?.data?.message || 'Erreur lors de la modification');
    },
  });
};

// Delete customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statistics });
      // toast.success('Client supprimé avec succès');
    },
    onError: (error: any) => {
      console.log(error);

      // toast.error(error?.response?.data?.message || 'Erreur lors de la suppression');
    },
  });
};

// Add contact
export const useAddCustomerContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contact }: { id: string; contact: Omit<CustomerContact, 'id'> }) =>
      customerService.addContact(id, contact),
    onSuccess: (response, variables) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
        console.log("called")
      }
    },
    onError: (error: any) => {
      console.log(error);

      // toast.error(error?.response?.data?.message || "Erreur lors de l'ajout du contact");
    },
  });
};

// Update contact
export const useUpdateCustomerContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      contactId,
      contact
    }: {
      id: string;
      contactId: string;
      contact: Partial<CustomerContact>
    }) => customerService.updateContact(id, contactId, contact),
    onSuccess: (response, variables) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      }
    },
    onError: (error: any) => {
      console.log(error);

    },
  });
};

// Delete contact
export const useDeleteCustomerContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contactId }: { id: string; contactId: string }) =>
      customerService.deleteContact(id, contactId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });

    },
    onError: (error: any) => {
       console.log(error);
    },
  });
};

// Add budget
export const useAddCustomerBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, budget }: { id: string; budget: Omit<MaintenanceBudget, 'id'> }) =>
      customerService.addBudget(id, budget),
    onSuccess: (response, variables) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets(variables.id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
        // toast.success('Budget ajouté avec succès');
      }
    },
    onError: (error: any) => {
       console.log(error);
      // toast.error(error?.response?.data?.message || "Erreur lors de l'ajout du budget");
    },
  });
};

// Update budget
export const useUpdateCustomerBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      budgetId,
      budget
    }: {
      id: string;
      budgetId: string;
      budget: Partial<MaintenanceBudget>
    }) => customerService.updateBudget(id, budgetId, budget),
    onSuccess: (response, variables) => {
      if (response.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets(variables.id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      }
    },
    onError: (error: any) => {
       console.log(error);
      // toast.error(error?.response?.data?.message || 'Erreur lors de la modification du budget');
    },
  });
};

// Delete budget
export const useDeleteCustomerBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, budgetId }: { id: string; budgetId: string }) =>
      customerService.deleteBudget(id, budgetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });

    },
    onError: (error: any) => {
       console.log(error);
      // toast.error(error?.response?.data?.message || 'Erreur lors de la suppression du budget');
    },
  });
};