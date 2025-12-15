// src/features/permissions/components/permissions-table.tsx

"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/shadcnui/alert-dialog";
import { MoreVertical, Edit, Trash, AlertTriangle, Shield } from "lucide-react";
import { Permission } from "../../types/permission.types";
import { useDeletePermission } from "../../hooks/use-permissions";
import { EditPermissionDialog } from "../edit-permission-dialog";

interface PermissionsTableProps {
  permissions: Permission[];
  isLoading?: boolean;
}

export function PermissionsTable({ permissions, isLoading }: PermissionsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState<Permission | null>(null);

  const deleteMutation = useDeletePermission();

  const handleEdit = (permission: Permission) => {
    setPermissionToEdit(permission);
    setEditDialogOpen(true);
  };

  const handleDelete = (permission: Permission) => {
    setPermissionToDelete(permission);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (permissionToDelete) {
      deleteMutation.mutate(permissionToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setPermissionToDelete(null);
        },
      });
    }
  };

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
          {row.original.code}
        </code>
      ),
    },
    {
      accessorKey: "resource",
      header: "Ressource",
      cell: ({ row }) => (
        <span className="font-medium capitalize">{row.original.resource}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.action}</span>
      ),
    },
    {
      accessorKey: "displayName",
      header: "Nom affiché",
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => (
        <Badge variant={row.original.category === "standard" ? "default" : "secondary"}>
          {row.original.category === "standard" ? "Standard" : "Spécifique"}
        </Badge>
      ),
    },
    {
      id: "flags",
      header: "Drapeaux",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.isDangerous && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Dangereuse
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              className="text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={permissions}
        isLoading={isLoading}
      />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la permission{" "}
              <strong>{permissionToDelete?.displayName}</strong> ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      {permissionToEdit && (
        <EditPermissionDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          permission={permissionToEdit}
        />
      )}
    </>
  );
}