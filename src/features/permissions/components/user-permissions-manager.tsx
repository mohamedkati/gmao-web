// src/features/permissions/components/user-permissions-manager.tsx

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Input } from "@/shared/components/shadcnui/input";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Search, Plus, Minus } from "lucide-react";
import { Permission } from "../types/permission.types";
import {
  useGrantPermissionToUser,
  useRevokePermissionFromUser,
} from "../hooks/use-permissions";

interface UserPermissionsManagerProps {
  userId: string;
  currentPermissions: string[];
  allPermissions: Permission[];
}

export function UserPermissionsManager({
  userId,
  currentPermissions,
  allPermissions,
}: UserPermissionsManagerProps) {
  const [search, setSearch] = useState("");

  const grantMutation = useGrantPermissionToUser();
  const revokeMutation = useRevokePermissionFromUser();

  const currentSet = useMemo(() => new Set(currentPermissions), [currentPermissions]);

  const filteredPermissions = useMemo(() => {
    if (!search) return allPermissions;

    const query = search.toLowerCase();
    return allPermissions.filter(
      (p) =>
        p.displayName.toLowerCase().includes(query) ||
        p.resource.toLowerCase().includes(query) ||
        p.action.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query)
    );
  }, [allPermissions, search]);

  const handleGrant = (permissionId: string) => {
    grantMutation.mutate({ userId, permissionId });
  };

  const handleRevoke = (permissionId: string) => {
    revokeMutation.mutate({ userId, permissionId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gérer les permissions</CardTitle>
        <CardDescription>
          Ajouter ou retirer des permissions pour cet utilisateur spécifiquement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Permissions List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredPermissions.map((permission) => {
            const hasPermission = currentSet.has(permission.code);

            return (
              <div
                key={permission.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{permission.displayName}</span>
                    <Badge
                      variant={permission.category === "standard" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {permission.category === "standard" ? "Standard" : "Spécifique"}
                    </Badge>
                    {permission.isDangerous && (
                      <Badge variant="destructive" className="text-xs">
                        Dangereuse
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {permission.description}
                  </div>
                  <code className="text-xs text-muted-foreground">{permission.code}</code>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {hasPermission ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevoke(permission.id)}
                      disabled={revokeMutation.isPending}
                      className="gap-1"
                    >
                      <Minus className="h-4 w-4" />
                      Retirer
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGrant(permission.id)}
                      disabled={grantMutation.isPending}
                      className="gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPermissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucune permission trouvée
          </div>
        )}
      </CardContent>
    </Card>
  );
}