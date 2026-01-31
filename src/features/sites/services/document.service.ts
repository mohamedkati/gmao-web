// src/features/sites/api/documents.api.ts

import { apiClient } from "@/shared/lib/api/api-client";
import { buildQueryParams } from "@/shared/lib/utils/query-builder";
import { ApiResponse, PaginatedResponse } from "@/shared/types/common.types";
import { DocumentUploadFormData } from "../schemas/document.schema";




export interface DocumentsQueryParams {
  siteId?: string;
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export const documentsApi = {
  // GET /api/documents - Liste des documents
  getAll: async (params: DocumentsQueryParams = {}): Promise<PaginatedResponse<Document>> => {
    const queryString = buildQueryParams(params);
    const response = await apiClient.get<PaginatedResponse<Document>>(
      `/documents${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // GET /api/sites/:siteId/documents - Liste des documents d'un site
  getBySite: async (
    siteId: string,
    params: Omit<DocumentsQueryParams, "siteId"> = {}
  ): Promise<PaginatedResponse<Document>> => {
    const queryString = buildQueryParams(params);
    const response = await apiClient.get<PaginatedResponse<Document>>(
      `/sites/${siteId}/documents${queryString ? `?${queryString}` : ""}`
    );
    return response.data;
  },

  // POST /api/documents/upload - Upload un document
  upload: async (siteId: string, data: DocumentUploadFormData): Promise<Document> => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("siteId", siteId);
    if (data.expirationDate) {
      formData.append("expirationDate", data.expirationDate.toISOString());
    }

    const response = await apiClient.post<ApiResponse<Document>>(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // DELETE /api/documents/:id - Supprimer un document
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/documents/${id}`);
  },

  // GET /api/documents/:id/download - Télécharger un document
  download: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/documents/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },
};