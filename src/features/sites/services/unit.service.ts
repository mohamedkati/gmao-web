// src/features/sites/api/units.api.ts

import { Unit, UnitListItem } from "../types/unit.types";
import { UnitFormData } from "../schemas/unit.schema";
import { ApiResponse, PaginatedResponse } from "@/shared/types/common.types";
import { buildQueryParams } from "@/shared/lib/utils/query-builder";
import { apiClient } from "@/shared/lib/api/api-client";


export interface UnitsQueryParams {
  siteId?: string;
  search?: string;
  status?: string;
  floor?: number;
  page?: number;
  pageSize?: number;
}

export const unitsApi = {
  // GET /api/units - Liste des unités (avec filtres par site)
  getAll: async (params: UnitsQueryParams = {}): Promise<PaginatedResponse<UnitListItem>> => {
    const queryString = buildQueryParams(params);
    const response = await apiClient.get<PaginatedResponse<UnitListItem>>(
      `/units${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // GET /api/sites/:siteId/units - Liste des unités d'un site
  getBySite: async (siteId: string, params: Omit<UnitsQueryParams, "siteId"> = {}): Promise<Unit[]> => {
    const queryString = buildQueryParams(params);
    const response: ApiResponse<Unit[]> = await apiClient.get(
      `/sites/${siteId}/units${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // GET /api/units/:id - Détails d'une unité
  getById: async (id: string): Promise<Unit> => {
    const response = await apiClient.get<ApiResponse<Unit>>(`/units/${id}`);
    return response.data.data;
  },

  // POST /api/units - Créer une unité
  create: async (data: UnitFormData): Promise<Unit> => {
    const response = await apiClient.post<ApiResponse<Unit>>("/units", data);
    return response.data.data;
  },

  // PUT /api/units/:id - Modifier une unité
  update: async (id: string, data: Partial<UnitFormData>): Promise<Unit> => {
    const response = await apiClient.put<ApiResponse<Unit>>(`/units/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/units/:id - Supprimer une unité
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/units/${id}`);
  },

  // PUT /api/units/:id/assign-occupant - Assigner un occupant
  assignOccupant: async (id: string, occupantId: string): Promise<Unit> => {
    const response = await apiClient.put<ApiResponse<Unit>>(`/units/${id}/assign-occupant`, {
      occupantId,
    });
    return response.data.data;
  },

  // PUT /api/units/:id/remove-occupant - Retirer un occupant
  removeOccupant: async (id: string): Promise<Unit> => {
    const response = await apiClient.put<ApiResponse<Unit>>(`/units/${id}/remove-occupant`);
    return response.data.data;
  },
};