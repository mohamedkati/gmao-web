import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyGroupMockService } from "../services/property-group-mock.service";
import { PropertyGroupFormData, PropertyGroupContact } from "../types/property-group.types";
import { toast } from "sonner";

const QUERY_KEYS = {
  all: ["property-groups"] as const,
  lists: () => [...QUERY_KEYS.all, "list"] as const,
  list: (filters: any) => [...QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  contacts: (id: string) => [...QUERY_KEYS.detail(id), "contacts"] as const,
  statistics: ["property-groups", "statistics"] as const,
};

// Get all property groups
export const usePropertyGroupsMock = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(params),
    queryFn: () => propertyGroupMockService.getAll(params),
  });
};

// Get property group by ID
export const usePropertyGroupMock = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => propertyGroupMockService.getById(id),
    enabled: !!id,
  });
};

// Get property group contacts
export const usePropertyGroupContactsMock = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts(id),
    queryFn: () => propertyGroupMockService.getContacts(id),
    enabled: !!id,
  });
};

// Get statistics
export const usePropertyGroupStatisticsMock = () => {
  return useQuery({
    queryKey: QUERY_KEYS.statistics,
    queryFn: () => propertyGroupMockService.getStatistics(),
  });
};

// Create property group
export const useCreatePropertyGroupMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PropertyGroupFormData) => propertyGroupMockService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success("Groupe créé avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la création");
    },
  });
};

// Update property group
export const useUpdatePropertyGroupMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PropertyGroupFormData> }) =>
      propertyGroupMockService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success("Groupe modifié avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la modification");
    },
  });
};

// Delete property group
export const useDeletePropertyGroupMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyGroupMockService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success("Groupe supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la suppression");
    },
  });
};

// Add contact
export const useAddPropertyGroupContactMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contact }: { id: string; contact: Omit<PropertyGroupContact, "id"> }) =>
      propertyGroupMockService.addContact(id, contact),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success("Contact ajouté avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de l'ajout du contact");
    },
  });
};

// Update contact
export const useUpdatePropertyGroupContactMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      contactId,
      contact,
    }: {
      id: string;
      contactId: string;
      contact: Partial<PropertyGroupContact>;
    }) => propertyGroupMockService.updateContact(id, contactId, contact),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success("Contact modifié avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la modification du contact");
    },
  });
};

// Delete contact
export const useDeletePropertyGroupContactMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contactId }: { id: string; contactId: string }) =>
      propertyGroupMockService.deleteContact(id, contactId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contacts(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success("Contact supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la suppression du contact");
    },
  });
};

// Update statistics
export const useUpdatePropertyGroupStatisticsMock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyGroupMockService.updateStatistics(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statistics });
      toast.success("Statistiques mises à jour");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Erreur lors de la mise à jour des statistiques");
    },
  });
};