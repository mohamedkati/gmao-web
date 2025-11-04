import apiClient from '@/shared/lib/api/api-client';
import { API_ENDPOINTS } from '@/shared/lib/constants/api.constants';
import type {
  WorkOrder,
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
} from '../types/work-order.types';
import type { PaginatedResponse } from '@/shared/types/common.types';

export const workOrdersService = {
  /**
   * Récupère tous les work orders
   */
  getAll: async (): Promise<WorkOrder[]> => {
    const { data } = await apiClient.get<WorkOrder[]>(API_ENDPOINTS.WORK_ORDERS.BASE);
    return data;
  },

  /**
   * Récupère les work orders paginés
   */
  getPaginated: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResponse<WorkOrder>> => {
    const { data } = await apiClient.get<PaginatedResponse<WorkOrder>>(
      API_ENDPOINTS.WORK_ORDERS.BASE,
      {
        params: { page, pageSize },
      }
    );
    return data;
  },

  /**
   * Récupère un work order par ID
   */
  getById: async (id: string): Promise<WorkOrder> => {
    const { data } = await apiClient.get<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.BY_ID(id)
    );
    return data;
  },

  /**
   * Récupère les work orders par statut
   */
  getByStatus: async (status: string): Promise<WorkOrder[]> => {
    const { data } = await apiClient.get<WorkOrder[]>(
      API_ENDPOINTS.WORK_ORDERS.BY_STATUS(status)
    );
    return data;
  },

  /**
   * Crée un work order
   */
  create: async (dto: CreateWorkOrderDto): Promise<WorkOrder> => {
    const { data } = await apiClient.post<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.BASE,
      dto
    );
    return data;
  },

  /**
   * Met à jour un work order
   */
  update: async (id: string, dto: UpdateWorkOrderDto): Promise<WorkOrder> => {
    const { data } = await apiClient.put<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.BY_ID(id),
      dto
    );
    return data;
  },

  /**
   * Supprime un work order
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.WORK_ORDERS.BY_ID(id));
  },

  /**
   * Assigne un technicien
   */
  assign: async (id: string, technicianId: string): Promise<WorkOrder> => {
    const { data } = await apiClient.post<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.ASSIGN(id),
      { technicianId }
    );
    return data;
  },

  /**
   * Marque comme terminé
   */
  complete: async (id: string): Promise<WorkOrder> => {
    const { data } = await apiClient.post<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.COMPLETE(id)
    );
    return data;
  },

  /**
   * Annule un work order
   */
  cancel: async (id: string): Promise<WorkOrder> => {
    const { data } = await apiClient.post<WorkOrder>(
      API_ENDPOINTS.WORK_ORDERS.CANCEL(id)
    );
    return data;
  },

  /**
   * Export en PDF/Excel
   */
  export: async (format: 'pdf' | 'excel'): Promise<Blob> => {
    const { data } = await apiClient.get(API_ENDPOINTS.WORK_ORDERS.EXPORT, {
      params: { format },
      responseType: 'blob',
    });
    return data;
  },
};