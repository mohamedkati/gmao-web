import { apiClient } from "@/shared/lib/api/api-client";
import authConfig from "@/shared/lib/auth/auth-config";
import { AuthUserTenant, LoginCredentials } from "@/shared/types/auth.types";
import { ApiResponse } from "@/shared/types/common.types";

export const AuthService = {
    login: async (form: LoginCredentials) => {
        return await apiClient.post(authConfig.pages.signIn, { email: form.email, password: form.password });
    },

    getCurrentUser: async () => {
        const result: ApiResponse<AuthUserTenant> = await apiClient.get(authConfig.pages.me);
        return result;
    }
};