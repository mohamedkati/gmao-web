// src/features/permissions/components/effective-permissions-view.tsx

"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Input } from "@/shared/components/shadcnui/input";
import { Search, CheckCircle2 } from "lucide-react";
import { Permission, PermissionsByResource } from "../types/permission.types";

interface EffectivePermissionsViewProps {
  permissions: Permission[];
  effectiveCodes: string[];
}

export function EffectivePermissionsView({
  permissions,
  effectiveCodes,
}: EffectivePermissionsViewProps) {
  const [search, setSearch] = useState("");

  const effectiveSet = useMemo(() => new Set(effectiveCodes), [effectiveCodes]);

  const effectivePermissions = useMemo(() => {
    return permissions.filter((p) => effectiveSet.has(p.code));
  }, [permissions, effectiveSet]);

  const groupedPermissions = useMemo(() => {
    const grouped: PermissionsByResource = {};

    effectivePermissions.forEach((permission) => {
      if (!grouped[permission.resource]) {
        grouped[permission.resource] = [];
      }
      grouped[permission.resource]!.push(permission);
    });

    return grouped;
  }, [effectivePermissions]);

  const filteredResources = useMemo(() => {
    if (!search) return Object.keys(groupedPermissions).sort();

    const query = search.toLowerCase();
    return Object.keys(groupedPermissions)
      .filter((resource) => {
        if (resource.toLowerCase().includes(query)) return true;
        return groupedPermissions[resource]!.some(
          (p) =>
            p.displayName.toLowerCase().includes(query) ||
            p.action.toLowerCase().includes(query)
        );
      })
      .sort();
  }, [groupedPermissions, search]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grouped Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold capitalize">{resource}</h3>
                <Badge variant="outline">{groupedPermissions[resource]!.length}</Badge>
              </div>

              <div className="space-y-2">
                {groupedPermissions[resource]!.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {permission.displayName}
                      </div>
                      <code className="text-xs text-muted-foreground">
                        {permission.action}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucune permission trouvée
        </div>
      )}
    </div>
  );
}