import  apiClient from '@/shared/lib/api/api-client';
import { PropertyGroup, PropertyGroupFormData, PropertyGroupContact } from '../types/property-group.types';

const BASE_URL = '/api/property-groups';

export const propertyGroupService = {
  // Get all property groups
  getAll: async (params?: any) => {
    const response = await apiClient.get<PropertyGroup[]>(BASE_URL, { params });
    return response.data;
  },

  // Get property group by ID
  getById: async (id: string) => {
    const response = await apiClient.get<PropertyGroup>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create property group
  create: async (data: PropertyGroupFormData) => {
    const response = await apiClient.post<PropertyGroup>(BASE_URL, data);
    return response.data;
  },

  // Update property group
  update: async (id: string, data: Partial<PropertyGroupFormData>) => {
    const response = await apiClient.put<PropertyGroup>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // Delete property group
  delete: async (id: string) => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  // Get contacts for a property group
  getContacts: async (id: string) => {
    const response = await apiClient.get<PropertyGroupContact[]>(`${BASE_URL}/${id}/contacts`);
    return response.data;
  },

  // Add contact to property group
  addContact: async (id: string, contact: Omit<PropertyGroupContact, 'id'>) => {
    const response = await apiClient.post<PropertyGroupContact>(`${BASE_URL}/${id}/contacts`, contact);
    return response.data;
  },

  // Update contact
  updateContact: async (id: string, contactId: string, contact: Partial<PropertyGroupContact>) => {
    const response = await apiClient.put<PropertyGroupContact>(
      `${BASE_URL}/${id}/contacts/${contactId}`,
      contact
    );
    return response.data;
  },

  // Delete contact
  deleteContact: async (id: string, contactId: string) => {
    await apiClient.delete(`${BASE_URL}/${id}/contacts/${contactId}`);
  },

  // Update statistics
  updateStatistics: async (id: string) => {
    const response = await apiClient.post<PropertyGroup>(`${BASE_URL}/${id}/update-statistics`);
    return response.data;
  },

  // Get statistics
  getStatistics: async () => {
    const response = await apiClient.get(`${BASE_URL}/statistics`);
    return response.data;
  },
};