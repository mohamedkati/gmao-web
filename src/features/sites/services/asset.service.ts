import { apiClient } from "@/shared/lib/api/api-client";
import { buildQueryParams } from "@/shared/lib/utils/query-builder";
import { ApiResponse, PaginatedResponse } from "@/shared/types/common.types";
import { AssetFormData } from "../schemas/asset.schema";
import { Asset } from "../types/asset.types";



export interface AssetsQueryParams {
  siteId?: string;
  search?: string;
  status?: string;
  category?: string;
  isCommonAsset?: boolean;
  page?: number;
  pageSize?: number;
}

export const assetsApi = {
  // GET /api/assets - Liste des équipements
  getAll: async (params: AssetsQueryParams = {}): Promise<PaginatedResponse<Asset>> => {
    const queryString = buildQueryParams(params);
    const response = await apiClient.get<PaginatedResponse<Asset>>(
      `/assets${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // GET /api/sites/:siteId/assets - Liste des équipements d'un site
  getBySite: async (siteId: string, params: Omit<AssetsQueryParams, "siteId"> = {}): Promise<Asset[]> => {
    const queryString = buildQueryParams(params);
    const response :ApiResponse<Asset[]>= await apiClient.get(
      `/sites/${siteId}/assets${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // GET /api/sites/:siteId/assets/hierarchy - Vue hiérarchique
  getHierarchy: async (siteId: string): Promise<Asset[]> => {
    const response = await apiClient.get<ApiResponse<Asset[]>>(
      `/sites/${siteId}/assets/hierarchy`
    );
    return response.data.data;
  },

  // GET /api/assets/:id - Détails d'un équipement
  getById: async (id: string): Promise<Asset> => {
    const response = await apiClient.get<ApiResponse<Asset>>(`/assets/${id}`);
    return response.data.data;
  },

  // POST /api/assets - Créer un équipement
  create: async (data: AssetFormData): Promise<Asset> => {
    const response = await apiClient.post<ApiResponse<Asset>>("/assets", data);
    return response.data.data;
  },

  // PUT /api/assets/:id - Modifier un équipement
  update: async (id: string, data: Partial<AssetFormData>): Promise<Asset> => {
    const response = await apiClient.put<ApiResponse<Asset>>(`/assets/${id}`, data);
    return response.data.data;
  },

  // DELETE /api/assets/:id - Supprimer un équipement
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/assets/${id}`);
  },

  // PUT /api/assets/:id/maintenance - Planifier une maintenance
  scheduleMaintenance: async (
    id: string,
    data: { date: string; description?: string }
  ): Promise<Asset> => {
    const response = await apiClient.put<ApiResponse<Asset>>(
      `/assets/${id}/maintenance`,
      data
    );
    return response.data.data;
  },
};