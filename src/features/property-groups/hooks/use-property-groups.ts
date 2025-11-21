import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyGroupService } from '../services/property-group.service';
import { PropertyGroupFormData, PropertyGroupContact, PropertyGroup } from '../types/property-group.types';
import { toast } from 'sonner';

const QUERY_KEYS = {
  all: ['property-groups'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  contacts: (id: string) => [...QUERY_KEYS.detail(id), 'contacts'] as const,
  statistics: ['property-groups', 'statistics'] as const,
};

// Get all property groups
export const usePropertyGroups = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => propertyGroupService.getAll(params),
  });
};

// Get property group by ID
export const usePropertyGroup = (id: string) => {
  console.log("from id", id);
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => propertyGroupService.getById(id),
    enabled: !!id,
  });
};

// Get property group contacts
export const usePropertyGroupContacts = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts(id),
    queryFn: () => propertyGroupService.getContacts(id),
    enabled: !!id,
  });
};

// Get statistics
export const usePropertyGroupStatistics = () => {
  return useQuery({
    queryKey: QUERY_KEYS.statistics,
    queryFn: () => propertyGroupService.getStatistics(),
  });
};

// Create property group
export const useCreatePropertyGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PropertyGroupFormData) => propertyGroupService.create(data),
    onSuccess: (data) => {
      if (data.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
        toast.success('Groupe créé avec succès');
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de la création');
    },
  });
};

// Update property group
export const useUpdatePropertyGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PropertyGroupFormData> }) =>
      propertyGroupService.update(id, data),
    onSuccess: (res, variables) => {
      if (res.isSucceeded) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
        toast.success('Groupe modifié avec succès');
      }
      else {
        toast.error(res.errorMessage || 'Erreur lors de la modification');
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de la modification');
    },
  });
};

// Delete property group
export const useDeletePropertyGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyGroupService.delete(id),
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: QUERY_KEYS.lists() });

      const previousData = queryClient.getQueryData(QUERY_KEYS.lists()) as PropertyGroup[];
      queryClient.setQueryData(QUERY_KEYS.lists(), (old: PropertyGroup[]) => {
        old.filter(x => x.id !== id);
      });
      return { previousData };
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
    //   toast.success('Groupe supprimé avec succès');
    // },
    onError: (error: any, _id, context) => {
      toast.error(error?.message || 'Erreur lors de la suppression');
      queryClient.setQueriesData({ queryKey: QUERY_KEYS.lists() }, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success('Groupe supprimé avec succès');
    }
  });
};

// Add contact
export const useAddPropertyGroupContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contact }: { id: string; contact: Omit<PropertyGroupContact, 'id'> }) =>
      propertyGroupService.addContact(id, contact),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success('Contact ajouté avec succès');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de l\'ajout du contact');
    },
  });
};

// Update contact
export const useUpdatePropertyGroupContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      contactId,
      contact
    }: {
      id: string;
      contactId: string;
      contact: Partial<PropertyGroupContact>
    }) => propertyGroupService.updateContact(id, contactId, contact),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success('Contact modifié avec succès');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de la modification du contact');
    },
  });
};

// Delete contact
export const useDeletePropertyGroupContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contactId }: { id: string; contactId: string }) =>
      propertyGroupService.deleteContact(id, contactId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success('Contact supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de la suppression du contact');
    },
  });
};

// Update statistics
export const useUpdatePropertyGroupStatistics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyGroupService.updateStatistics(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statistics });
      toast.success('Statistiques mises à jour');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Erreur lors de la mise à jour des statistiques');
    },
  });
};