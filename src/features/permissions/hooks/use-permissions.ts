
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "../services/permission.service";
import { toast } from "sonner";
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  CreateRoleDto,
  UpdateRoleDto,
  AssignPermissionsDto,
  PermissionAuditFilter,
} from "../types/permission.types";

const QUERY_KEYS = {
  all: ["permissions"] as const,
  lists: () => [...QUERY_KEYS.all, "list"] as const,
  list: () => [...QUERY_KEYS.lists()] as const,
  details: () => [...QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...QUERY_KEYS.details(), id] as const,
  
  roles: ["roles"] as const,
  rolesList: () => [...QUERY_KEYS.roles, "list"] as const,
  roleDetail: (id: string) => [...QUERY_KEYS.roles, "detail", id] as const,
  rolePermissions: (id: string) => [...QUERY_KEYS.roles, id, "permissions"] as const,
  
  userPermissions: (userId: string) => ["users", userId, "permissions"] as const,
  effectivePermissions: (userId: string) => ["users", userId, "permissions", "effective"] as const,
  
  audit: (filter: PermissionAuditFilter) => ["audit", "permissions", filter] as const,
};

// ===== PERMISSIONS =====

export const usePermissions = () => {
  return useQuery({
    queryKey: QUERY_KEYS.list(),
    queryFn: () => permissionService.getAllPermissions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePermission = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => permissionService.getPermissionById(id),
    enabled: !!id,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreatePermissionDto) => permissionService.createPermission(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success("Permission créée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la création");
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePermissionDto }) =>
      permissionService.updatePermission(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
      toast.success("Permission mise à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => permissionService.deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success("Permission supprimée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la suppression");
    },
  });
};

export const useSyncPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => permissionService.syncPermissions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
      toast.success("Permissions synchronisées avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la synchronisation");
    },
  });
};

// ===== ROLES =====

export const useRoles = () => {
  return useQuery({
    queryKey: QUERY_KEYS.rolesList(),
    queryFn: () => permissionService.getAllRoles(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.roleDetail(id),
    queryFn: () => permissionService.getRoleById(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateRoleDto) => permissionService.createRole(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rolesList() });
      toast.success("Rôle créé avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la création");
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateRoleDto }) =>
      permissionService.updateRole(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rolesList() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleDetail(variables.id) });
      toast.success("Rôle mis à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => permissionService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rolesList() });
      toast.success("Rôle supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de la suppression");
    },
  });
};

// ===== ROLE PERMISSIONS =====

export const useRolePermissions = (roleId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.rolePermissions(roleId),
    queryFn: () => permissionService.getRolePermissions(roleId),
    enabled: !!roleId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAssignPermissionsToRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, dto }: { roleId: string; dto: AssignPermissionsDto }) =>
      permissionService.assignPermissionsToRole(roleId, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rolePermissions(variables.roleId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleDetail(variables.roleId) });
      toast.success("Permissions assignées avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors de l'assignation");
    },
  });
};

// ===== USER PERMISSIONS =====

export const useUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.userPermissions(userId),
    queryFn: () => permissionService.getUserPermissions(userId),
    enabled: !!userId,
  });
};

export const useEffectiveUserPermissions = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.effectivePermissions(userId),
    queryFn: () => permissionService.getEffectiveUserPermissions(userId),
    enabled: !!userId,
  });
};

export const useGrantPermissionToUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, permissionId }: { userId: string; permissionId: string }) =>
      permissionService.grantPermissionToUser(userId, permissionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userPermissions(variables.userId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.effectivePermissions(variables.userId) });
      toast.success("Permission accordée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur");
    },
  });
};

export const useRevokePermissionFromUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, permissionId }: { userId: string; permissionId: string }) =>
      permissionService.revokePermissionFromUser(userId, permissionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userPermissions(variables.userId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.effectivePermissions(variables.userId) });
      toast.success("Permission révoquée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur");
    },
  });
};

// ===== AUDIT =====

export const usePermissionAudit = (filter: PermissionAuditFilter) => {
  return useQuery({
    queryKey: QUERY_KEYS.audit(filter),
    queryFn: () => permissionService.getPermissionAudit(filter),
  });
};