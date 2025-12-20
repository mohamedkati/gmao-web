import { apiClient } from '@/shared/lib/api/api-client';
import { CustomerListItem, CustomerFormData, CustomerContact, MaintenanceBudget } from '../../customers-v2/types/customer.types';
import { ApiResponse, ApiValidationResponse } from '@/shared/types/common.types';

const BASE_URL = '/customers';

export const customerService = {
  // Get all customers
  getAll: async (params?: any) => {
    const response : ApiResponse<CustomerListItem[]> = await apiClient.get(BASE_URL, { params });
    return response.data;
  },

  // Get customer by ID
  getById: async (id: string) => {
    const response: ApiResponse<CustomerListItem>  = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create customer
  create: async (data: CustomerFormData) => {
    const response : ApiResponse<boolean> | ApiValidationResponse  = await apiClient.post(BASE_URL, data);
    return response;
  },

  // Update customer
  update: async (id: string, data: Partial<CustomerFormData>) => {
    const response: ApiResponse<boolean> | ApiValidationResponse   = await apiClient.put(`${BASE_URL}/${id}`, data);
    return response;
  },

  // Delete customer
  delete: async (id: string) => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  // Get contacts for a customer
  getContacts: async (id: string) => {
    const response: ApiResponse<CustomerContact[]>  = await apiClient.get(`${BASE_URL}/${id}/contacts`);
    return response.data;
  },

  // Get contact for a customer
  getContact: async (customerId: string, contactId: string) => {
    const response: ApiResponse<CustomerContact>  = await apiClient.get(`${BASE_URL}/${customerId}/contacts/${contactId}`);
    return response.data;
  },

  // Add contact to customer
  addContact: async (id: string, contact: Omit<CustomerContact, 'id'>) => {
    const response: ApiResponse<boolean> | ApiValidationResponse  = await apiClient.post(`${BASE_URL}/${id}/contacts`, contact);
    return response;
  },

  // Update contact
  updateContact: async (id: string, contactId: string, contact: Partial<CustomerContact>) => {
    const response: ApiResponse<boolean>  | ApiValidationResponse = await apiClient.put(
      `${BASE_URL}/${id}/contacts/${contactId}`,
      contact
    );
    return response;
  },

  // Delete contact
  deleteContact: async (id: string, contactId: string) => {
    await apiClient.delete(`${BASE_URL}/${id}/contacts/${contactId}`);
  },

  // Get maintenance budgets for a customer
  getBudgets: async (id: string) => {
    const response: ApiResponse<MaintenanceBudget[]> = await apiClient.get(`${BASE_URL}/${id}/budgets`);
    return response.data;
  },

   // Get budget for a customer
  getBudget: async (customerId: string, budgetId: string) => {
    const response: ApiResponse<MaintenanceBudget>  = await apiClient.get(`${BASE_URL}/${customerId}/budgets/${budgetId}`);
    return response.data;
  },

  // Add maintenance budget to customer
  addBudget: async (id: string, budget: Omit<MaintenanceBudget, 'id'>) => {
    const response: ApiResponse<boolean> | ApiValidationResponse  = await apiClient.post(`${BASE_URL}/${id}/budgets`, budget);
    return response;
  },

  // Update maintenance budget
  updateBudget: async (id: string, budgetId: string, budget: Partial<MaintenanceBudget>) => {
    const response:ApiResponse<boolean> | ApiValidationResponse  = await apiClient.put(
      `${BASE_URL}/${id}/budgets/${budgetId}`,
      budget
    );
    return response;
  },

  // Delete maintenance budget
  deleteBudget: async (id: string, budgetId: string) => {
    await apiClient.delete(`${BASE_URL}/${id}/budgets/${budgetId}`);
  },

  // Get statistics
  getStatistics: async () => {
    const response : ApiResponse<any> = await apiClient.get(`${BASE_URL}/statistics`);
    return response.data;
  },
};