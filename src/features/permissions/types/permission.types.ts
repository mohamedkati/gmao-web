export interface Permission {
  id: string;
  resource: string;
  action: string;
  code: string;
  displayName: string;
  description: string;
  category: "standard" | "specific";
  isDangerous: boolean;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isSystem: boolean;
  priority: number;
  permissionCount: number;
  userCount: number;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}

export interface CreatePermissionDto {
  resource: string;
  action: string;
  displayName: string;
  description: string;
  category?: "standard" | "specific";
  isDangerous?: boolean;
}

export interface UpdatePermissionDto {
  displayName: string;
  description: string;
  category: "standard" | "specific";
  isDangerous: boolean;
}

export interface CreateRoleDto {
  name: string;
  displayName: string;
  description: string;
  priority?: number;
}

export interface UpdateRoleDto {
  name: string;
  displayName: string;
  description: string;
  priority: number;
}

export interface AssignPermissionsDto {
  permissionIds: string[];
}

export interface UserPermissionOverride {
  id: string;
  userId: string;
  permissionId: string;
  permission: Permission;
  isGranted: boolean;
}

export interface PermissionAudit {
  id: string;
  userId: string;
  targetUserId?: string;
  targetRoleId?: string;
  action: string;
  permissionCode?: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface PermissionAuditFilter {
  userId?: string;
  targetUserId?: string;
  targetRoleId?: string;
  action?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface PermissionsByResource {
  [resource: string]: Permission[];
}