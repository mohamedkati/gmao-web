import { apiClient } from "@/shared/lib/api/api-client";
import { PermissionConfig, UserPermissions } from "@/shared/types/auth.types";
import { ApiResponse } from "../types/common.types";

export const permissionsPublicService = {
    // Récupérer la configuration des permissions (public)
    getConfig: async (): Promise<PermissionConfig> => {
        const response: ApiResponse<PermissionConfig> = await apiClient.get("/permissions/config");
        return response.data;
    },

    // Récupérer les permissions de l'utilisateur connecté
    getMyPermissions: async (): Promise<UserPermissions> => {
        const response: ApiResponse<UserPermissions> = await apiClient.get("/permissions/me");
        return response.data;
    },

    // Vérifier une permission spécifique
    checkPermission: async (resource: string, action: string): Promise<boolean> => {
        const response: ApiResponse<boolean> = await apiClient.post("/permissions/check", {
            resource,
            action,
        });
        return response.data;
    },
};