// src/app/(dashboard)/admin/roles/[id]/page.tsx

"use client";

import { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Search } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import {
  useRole,
  useRolePermissions,
  usePermissions,
  useAssignPermissionsToRole,
} from "@/features/permissions/hooks/use-permissions";
import { PermissionCheckboxTree } from "@/features/permissions/components/permission-checkbox-tree";

export default function RolePermissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);
  const { data: role, isLoading: isLoadingRole } = useRole(id);
  const { data: currentPermissions, isLoading: isLoadingCurrent } = useRolePermissions(id);
  const { data: allPermissions, isLoading: isLoadingAll } = usePermissions();
  const assignMutation = useAssignPermissionsToRole();

  // Initialiser les permissions sélectionnées
  useMemo(() => {
    if (currentPermissions && !hasChanges) {
      setSelectedPermissionIds(new Set(currentPermissions.map((p) => p.id)));
    }
  }, [currentPermissions, hasChanges]);

  const handleTogglePermission = (permissionId: string, checked: boolean) => {
    const newSet = new Set(selectedPermissionIds);
    if (checked) {
      newSet.add(permissionId);
    } else {
      newSet.delete(permissionId);
    }
    setSelectedPermissionIds(newSet);
    setHasChanges(true);
  };

  const handleSave = () => {
    assignMutation.mutate(
      {
        roleId: id,
        dto: { permissionIds: Array.from(selectedPermissionIds) },
      },
      {
        onSuccess: () => {
          setHasChanges(false);
        },
      }
    );
  };

  const handleCancel = () => {
    if (currentPermissions) {
      setSelectedPermissionIds(new Set(currentPermissions.map((p) => p.id)));
      setHasChanges(false);
    }
  };

  if (isLoadingRole || isLoadingCurrent || isLoadingAll) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Rôle introuvable</h2>
          <Button onClick={() => router.back()} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Permissions : {role.displayName}
            </h1>
            <p className="text-muted-foreground">{role.description}</p>
          </div>
          {role.isSystem && (
            <Badge variant="outline">Rôle système</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave} disabled={assignMutation.isPending}>
                <Save className="mr-2 h-4 w-4" />
                {assignMutation.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total permissions</CardDescription>
            <CardTitle className="text-3xl">{allPermissions?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions assignées</CardDescription>
            <CardTitle className="text-3xl">{selectedPermissionIds.size}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Utilisateurs avec ce rôle</CardDescription>
            <CardTitle className="text-3xl">{role.userCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Permissions Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner les permissions</CardTitle>
          <CardDescription>
            Cochez les permissions que ce rôle devrait avoir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PermissionCheckboxTree
            permissions={allPermissions || []}
            selectedIds={selectedPermissionIds}
            onToggle={handleTogglePermission}
            searchQuery={search}
          />
        </CardContent>
      </Card>
    </div>
  );
}