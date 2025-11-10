import { apiClient } from '@/shared/lib/api/api-client';
import { PropertyGroup, PropertyGroupFormData, PropertyGroupContact } from '../types/property-group.types';
import { ApiResponse, ValidationApiResponse } from '@/shared/types/common.types';

const BASE_URL = '/property-groups';

export const propertyGroupService = {
  // Get all property groups
  getAll: async (params?: any) => {
    const response: ApiResponse<PropertyGroup[]> = await apiClient.get(BASE_URL, { params });
    return response.data;
  },

  // Get property group by ID
  getById: async (id: string) => {
    const response: ApiResponse<PropertyGroup> = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create property group
  create: async (data: PropertyGroupFormData) => {
    const response : ApiResponse<string>= await apiClient.post(BASE_URL, data);
    return response;
  },

  // Update property group
  update: async (id: string, data: Partial<PropertyGroupFormData>) => {
    const response  : ApiResponse<boolean> | ValidationApiResponse= await apiClient.put(`${BASE_URL}/${id}`, data);
    return response;
  },

  // Delete property group
  delete: async (id: string) => {
    return await apiClient.delete(`${BASE_URL}/${id}`);
  },

  // Get contacts for a property group
  getContacts: async (id: string) => {
    const response : ApiResponse<PropertyGroupContact[]> = await apiClient.get(`${BASE_URL}/${id}/contacts`);
    return response.data;
  },

  // Add contact to property group
  addContact: async (id: string, contact: Omit<PropertyGroupContact, 'id'>) => {
    const response = await apiClient.post<ApiResponse<string>>(`${BASE_URL}/${id}/contacts`, contact);
    return response.data;
  },

  // Update contact
  updateContact: async (id: string, contactId: string, contact: Partial<PropertyGroupContact>) => {
    const response = await apiClient.put<ApiResponse<string>>(
      `${BASE_URL}/${id}/contacts/${contactId}`,
      contact
    );
    return response.data;
  },

  // Delete contact
  deleteContact: async (id: string, contactId: string) => {
    return await apiClient.delete(`${BASE_URL}/${id}/contacts/${contactId}`);
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