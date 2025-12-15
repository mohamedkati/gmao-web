"use client";

import { useState } from "react";
import { Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { usePermissions, useSyncPermissions } from "@/features/permissions/hooks/use-permissions";
import { PermissionsTable } from "@/features/permissions/components/listing/permission-table";
import { CreatePermissionDialog } from "@/features/permissions/components/listing/permission-create-dialog"

export default function PermissionsPage() {
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: permissions, isLoading } = usePermissions();
  const syncMutation = useSyncPermissions();

  const filteredPermissions = permissions?.filter(
    (p) =>
      p.displayName.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.resource.toLowerCase().includes(search.toLowerCase())
  );

  const handleSync = () => {
    syncMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground">
            Gérez toutes les permissions du système
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={syncMutation.isPending}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${syncMutation.isPending ? "animate-spin" : ""}`} />
            Synchroniser
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle permission
          </Button>
        </div>
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

      {/* Table */}
      <PermissionsTable
        permissions={filteredPermissions || []}
        isLoading={isLoading}
      />

      {/* Dialogs */}
      <CreatePermissionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}