// src/shared/services/auth.service.ts

import { apiClient } from "@/shared/lib/api/api-client";
import { LoginCredentials, AuthUserTenant } from "@/shared/types/auth.types";
import { ApiResponse, ApiValidationResponse } from "../types/common.types";
import authConfig from "../lib/auth/auth-config";

export const authService = {
    // Récupérer l'utilisateur connecté
    getCurrentUser: async (): Promise<AuthUserTenant> => {
        console.log("get current");
        const result: ApiResponse<AuthUserTenant> = await apiClient.get(authConfig.pages.me);
        return result.data;
    },

    // Login
    login: async (credentials: LoginCredentials): Promise<ApiResponse<any> | ApiValidationResponse> => {
        const response: ApiResponse<any> | ApiValidationResponse = await apiClient.post(authConfig.pages.signIn, { email: credentials.email, password: credentials.password });
        return response;
    },

    // Logout
    logout: async (): Promise<void> => {
        try {
            await apiClient.post("/api/auth/logout");
        } finally {
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth_token");
            }
        }
    },

    // Refresh token
    refreshToken: async (): Promise<string> => {
        const response = await apiClient.post<{ token: string }>("/api/auth/refresh");

        if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", response.data.token);
        }

        return response.data.token;
    },
};