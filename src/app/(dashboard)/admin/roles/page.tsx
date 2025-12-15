// src/app/(dashboard)/admin/roles/page.tsx

"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { useRoles } from "@/features/permissions/hooks/use-permissions";
import { RolesTable } from "@/features/permissions/components/roles/role-table";
import { CreateRoleDialog } from "@/features/permissions/components/roles/create-role-dialog";

export default function RolesPage() {
    const [search, setSearch] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const { data: roles, isLoading } = useRoles();

    const filteredRoles = roles?.filter(
        (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.displayName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Rôles</h1>
                    <p className="text-muted-foreground">
                        Gérez les rôles et leurs permissions
                    </p>
                </div>
                <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau rôle
                </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher un rôle..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <RolesTable roles={filteredRoles || []} isLoading={isLoading} />

            {/* Dialogs */}
            <CreateRoleDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
        </div>
    );
}