// src/features/permissions/services/permission.service.ts

import { apiClient } from "@/shared/lib/api/api-client";
import {
    Permission,
    Role,
    RoleWithPermissions,
    CreatePermissionDto,
    UpdatePermissionDto,
    CreateRoleDto,
    UpdateRoleDto,
    AssignPermissionsDto,
    UserPermissionOverride,
    PermissionAudit,
    PermissionAuditFilter,
} from "../types/permission.types";
import { ApiResponse, ApiValidationResponse } from "@/shared/types/common.types";

const baseRoute: string = "/api/v1"

export const permissionService = {
    // ===== PERMISSIONS =====
    getAllPermissions: async (): Promise<Permission[]> => {
        const response: ApiResponse<Permission[]> = await apiClient.get("/permissions");
        return response.data;
    },

    getPermissionById: async (id: string): Promise<Permission> => {
        const response: ApiResponse<Permission> = await apiClient.get(`/permissions/${id}`);
        return response.data;
    },

    createPermission: async (dto: CreatePermissionDto): Promise<Permission | string> => {
        const response: ApiResponse<Permission> | ApiValidationResponse = await apiClient.post("/permissions", dto);
        return response.data;
    },

    updatePermission: async (id: string, dto: UpdatePermissionDto): Promise<Permission | string> => {
        const response: ApiResponse<Permission> | ApiValidationResponse = await apiClient.put(`/permissions/${id}`, dto);
        return response.data;
    },

    deletePermission: async (id: string): Promise<void> => {
        await apiClient.delete(`/permissions/${id}`);
    },

    syncPermissions: async (): Promise<void> => {
        await apiClient.post("/permissions/sync");
    },

    // ===== ROLES =====
    getAllRoles: async (): Promise<Role[]> => {
        const response: ApiResponse<Role[]> = await apiClient.get("/roles");
        return response.data;
    },

    getRoleById: async (id: string): Promise<Role> => {
        const response: ApiResponse<Role> = await apiClient.get(`/roles/${id}`);
        return response.data;
    },

    createRole: async (dto: CreateRoleDto): Promise<Role> => {
        const response: ApiResponse<Role> = await apiClient.post("/roles", dto);
        return response.data;
    },

    updateRole: async (id: string, dto: UpdateRoleDto): Promise<Role | string> => {
        const response: ApiResponse<Role> | ApiValidationResponse = await apiClient.put(`/roles/${id}`, dto);
        return response.data;
    },

    deleteRole: async (id: string): Promise<void> => {
        await apiClient.delete(`/roles/${id}`);
    },

    // ===== ROLE PERMISSIONS =====
    getRolePermissions: async (roleId: string): Promise<Permission[]> => {
        const response : ApiResponse<Permission[]> = await apiClient.get(`/roles/${roleId}/permissions`);
        return response.data;
    },

    assignPermissionsToRole: async (roleId: string, dto: AssignPermissionsDto): Promise<void> => {
        await apiClient.post(`/roles/${roleId}/permissions`, dto);
    },

    removePermissionFromRole: async (roleId: string, permissionId: string): Promise<void> => {
        await apiClient.delete(`/roles/${roleId}/permissions/${permissionId}`);
    },

    // ===== USER PERMISSIONS =====
    getUserPermissions: async (userId: string): Promise<UserPermissionOverride[]> => {
        const response : ApiResponse<UserPermissionOverride[]> = await apiClient.get(`/users/${userId}/permissions`);
        return response.data;
    },

    getEffectiveUserPermissions: async (userId: string): Promise<string[]> => {
        const response : ApiResponse<string[]> = await apiClient.get(`/users/${userId}/permissions/effective`);
        return response.data;
    },

    grantPermissionToUser: async (userId: string, permissionId: string): Promise<void> => {
        await apiClient.post(`/users/${userId}/permissions/${permissionId}/grant`);
    },

    revokePermissionFromUser: async (userId: string, permissionId: string): Promise<void> => {
        await apiClient.post(`/users/${userId}/permissions/${permissionId}/revoke`);
    },

    // ===== AUDIT =====
    getPermissionAudit: async (filter: PermissionAuditFilter): Promise<PermissionAudit[]> => {
        const response : ApiResponse<PermissionAudit[]> = await apiClient.get("/audit/permissions", {
            params: filter,
        });
        return response.data;
    },
};