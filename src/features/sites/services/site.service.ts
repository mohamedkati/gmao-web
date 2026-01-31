// src/features/sites/api/sites.api.ts

import  {apiClient } from "@/shared/lib/api/api-client";
import {  SiteFormData } from "../schemas/site-form.schema";
import { ApiResponse, PaginatedResponse } from "@/shared/types/common.types";
import { Site, SiteListItem, SiteTeamDto } from "../types/site.types";
import { buildQueryParams } from "@/shared/lib/utils/query-builder";

export interface SitesQueryParams {
  search?: string;
  customerId?: string;
  type?: string;
  city?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SitesResponse extends PaginatedResponse<SiteListItem[]> {}

export const sitesApi = {
  // GET /api/sites - Liste avec pagination et filtres
  getAll: async (params: SitesQueryParams = {}): Promise<SitesResponse> => {
    const queryString = buildQueryParams(params);
    const response : SitesResponse = await apiClient.get(
      `/sites/all${queryString ? `?${queryString}` : ""}`
    );
    return response;
  },

  // GET /api/sites/:id - Détails d'un site
  getById: async (id: string): Promise<Site> => {
    const response:ApiResponse<Site> = await apiClient.get(`/sites/${id}`);
    return response.data;
  },

  // POST /api/sites - Créer un site
  create: async (data: SiteFormData): Promise<Site> => {
    const response = await apiClient.post<ApiResponse<Site>>("/sites", data);
    return response.data.data;
  },

  // PUT /api/sites/:id - Modifier un site
  update: async (id: string, data: Partial<SiteFormData>): Promise<Site> => {
    const response = await apiClient.put<ApiResponse<Site>>(`/sites/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/sites/:id - Supprimer un site
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/sites/${id}`);
  },

  // GET /api/sites/:id/stats - Statistiques d'un site
  getStats: async (id: string): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>(`/sites/${id}/stats`);
    return response.data.data;
  },

  // POST /api/sites/bulk-delete - Suppression en masse
  bulkDelete: async (ids: string[]): Promise<void> => {
    await apiClient.post("/sites/bulk-delete", { ids });
  },

  // GET /api/sites/export - Export Excel/CSV
  export: async (params: SitesQueryParams, format: "xlsx" | "csv" = "xlsx"): Promise<Blob> => {
    const queryString = buildQueryParams({ ...params, format });
    const response = await apiClient.get(`/sites/export?${queryString}`, {
      responseType: "blob",
    });
    return response.data;
  },

  // GET /api/sites/:siteId/team-members - Membres de l'équipe d'un site
  getTeamMembers: async (siteId: string): Promise<SiteTeamDto> => {
    const response : ApiResponse<SiteTeamDto> = await apiClient.get(
      `/sites/${siteId}/team-members`
    );
    console.log("Site Team Members Response:", response);
    return response.data;
  },
};