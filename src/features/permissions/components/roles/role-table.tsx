"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { MoreVertical, Edit, Trash, Shield, Users, Key } from "lucide-react";
import { Role } from "../../types/permission.types";
import { useDeleteRole } from "../../hooks/use-permissions";
import { EditRoleDialog } from "./edit-role-dialog";

interface RolesTableProps {
  roles: Role[];
  isLoading?: boolean;
}

export function RolesTable({ roles, isLoading }: RolesTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

  const deleteMutation = useDeleteRole();

  const handleView = (role: Role) => {
    router.push(`/admin/roles/${role.id}`);
  };

  const handleEdit = (role: Role) => {
    setRoleToEdit(role);
    setEditDialogOpen(true);
  };

  const handleDelete = (role: Role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      deleteMutation.mutate(roleToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setRoleToDelete(null);
        },
      });
    }
  };

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "displayName",
      header: "Nom du rôle",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.displayName}</span>
          {row.original.isSystem && (
            <Badge variant="outline" className="ml-2">
              Système
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Identifiant",
      cell: ({ row }) => (
        <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
          {row.original.name}
        </code>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground line-clamp-1">
          {row.original.description}
        </span>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priorité",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.priority}</Badge>
      ),
    },
    {
      accessorKey: "permissionCount",
      header: "Permissions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Key className="h-4 w-4 text-muted-foreground" />
          {row.original.permissionCount}
        </div>
      ),
    },
    {
      accessorKey: "userCount",
      header: "Utilisateurs",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          {row.original.userCount}
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
            <DropdownMenuItem onClick={() => handleView(row.original)}>
              <Shield className="mr-2 h-4 w-4" />
              Gérer les permissions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            {!row.original.isSystem && (
              <DropdownMenuItem
                onClick={() => handleDelete(row.original)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={roles} isLoading={isLoading} />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le rôle{" "}
              <strong>{roleToDelete?.displayName}</strong> ?
              {roleToDelete && roleToDelete.userCount > 0 && (
                <span className="block mt-2 text-destructive">
                  Attention : Ce rôle est assigné à {roleToDelete.userCount} utilisateur(s).
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={roleToDelete?.userCount ? roleToDelete.userCount > 0 : false}
            >
              {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      {roleToEdit && (
        <EditRoleDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          role={roleToEdit}
        />
      )}
    </>
  );
}