// src/features/permissions/components/permission-checkbox-tree.tsx

"use client";

import { useMemo } from "react";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Badge } from "@/shared/components/shadcnui/badge";
import { AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { Permission, PermissionsByResource } from "../types/permission.types";
import { Button } from "@/shared/components/shadcnui/button";
import { useState } from "react";

interface PermissionCheckboxTreeProps {
  permissions: Permission[];
  selectedIds: Set<string>;
  onToggle: (permissionId: string, checked: boolean) => void;
  searchQuery?: string;
}

export function PermissionCheckboxTree({
  permissions,
  selectedIds,
  onToggle,
  searchQuery = "",
}: PermissionCheckboxTreeProps) {
  const [expandedResources, setExpandedResources] = useState<Set<string>>(new Set());

  // Grouper les permissions par ressource
  const groupedPermissions = useMemo(() => {
    const grouped: PermissionsByResource = {};

    permissions.forEach((permission) => {
      if (!grouped[permission.resource]) {
        grouped[permission.resource] = [];
      }
      grouped[permission.resource]!.push(permission);
    });

    // Trier les permissions dans chaque ressource
    Object.keys(grouped).forEach((resource) => {
      grouped[resource]!.sort((a, b) => {
        // Standard avant spécifique
        if (a.category !== b.category) {
          return a.category === "standard" ? -1 : 1;
        }
        // Puis par action
        return a.action.localeCompare(b.action);
      });
    });

    return grouped;
  }, [permissions]);

  // Filtrer par recherche
  const filteredResources = useMemo(() => {
    if (!searchQuery) return Object.keys(groupedPermissions).sort();

    const query = searchQuery.toLowerCase();
    return Object.keys(groupedPermissions)
      .filter((resource) => {
        // Vérifier si la ressource matche
        if (resource.toLowerCase().includes(query)) return true;

        // Vérifier si au moins une permission matche
        return groupedPermissions[resource]!.some(
          (p) =>
            p.displayName.toLowerCase().includes(query) ||
            p.action.toLowerCase().includes(query) ||
            p.code.toLowerCase().includes(query)
        );
      })
      .sort();
  }, [groupedPermissions, searchQuery]);

  const toggleResource = (resource: string) => {
    const newExpanded = new Set(expandedResources);
    if (newExpanded.has(resource)) {
      newExpanded.delete(resource);
    } else {
      newExpanded.add(resource);
    }
    setExpandedResources(newExpanded);
  };

  const toggleAllInResource = (resource: string, checked: boolean) => {
    groupedPermissions[resource]!.forEach((permission) => {
      onToggle(permission.id, checked);
    });
  };

  const isResourceFullySelected = (resource: string) => {
    return groupedPermissions[resource]!.every((p) => selectedIds.has(p.id));
  };

  const isResourcePartiallySelected = (resource: string) => {
    const perms = groupedPermissions[resource];
    const selectedCount = perms!.filter((p) => selectedIds.has(p.id)).length;
    return selectedCount > 0 && selectedCount < perms!.length;
  };

  return (
    <div className="space-y-4">
      {filteredResources.map((resource) => {
        const isExpanded = expandedResources.has(resource);
        const resourcePerms = groupedPermissions[resource];
        const selectedCount = resourcePerms!.filter((p) => selectedIds.has(p.id)).length;
        const fullySelected = isResourceFullySelected(resource);
        const partiallySelected = isResourcePartiallySelected(resource);

        return (
          <div key={resource} className="border rounded-lg">
            {/* Resource Header */}
            <div className="flex items-center gap-3 p-4 bg-muted/50">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleResource(resource)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              <Checkbox
                checked={fullySelected}
                onCheckedChange={(checked) =>
                  toggleAllInResource(resource, checked as boolean)
                }
                className={partiallySelected ? "data-[state=checked]:bg-primary/50" : ""}
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold capitalize">{resource}</span>
                  <Badge variant="outline">
                    {selectedCount}/{resourcePerms!.length}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Permissions List */}
            {isExpanded && (
              <div className="p-4 space-y-2">
                {resourcePerms!.map((permission) => {
                  const isFiltered =
                    searchQuery &&
                    !permission.displayName.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    !permission.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    !permission.code.toLowerCase().includes(searchQuery.toLowerCase());

                  if (isFiltered) return null;

                  return (
                    <div
                      key={permission.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={selectedIds.has(permission.id)}
                        onCheckedChange={(checked) =>
                          onToggle(permission.id, checked as boolean)
                        }
                      />

                      <label
                        htmlFor={permission.id}
                        className="flex-1 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{permission.displayName}</span>
                          <Badge
                            variant={
                              permission.category === "standard" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {permission.category === "standard" ? "Standard" : "Spécifique"}
                          </Badge>
                          {permission.isDangerous && (
                            <Badge variant="destructive" className="gap-1 text-xs">
                              <AlertTriangle className="h-3 w-3" />
                              Dangereuse
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {permission.description}
                        </div>
                        <code className="text-xs text-muted-foreground">{permission.code}</code>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucune permission trouvée
        </div>
      )}
    </div>
  );
}