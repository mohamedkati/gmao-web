"use client";

import { useState } from "react";
import { DataTable } from "@/shared/components/data-table/data-table";
import { createPropertyGroupColumns } from "./property-groups-columns";
import { PropertyGroup } from "../types/property-group.types";
import { usePropertyGroupStore } from "../store/property-group.store";
import { useDeletePropertyGroup, useUpdatePropertyGroupStatistics } from "../hooks/index";
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

interface PropertyGroupsTableProps {
  data: PropertyGroup[];
  isLoading?: boolean;
}

export function PropertyGroupsTable({ data, isLoading }: PropertyGroupsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PropertyGroup | null>(null);

  const { openDrawer } = usePropertyGroupStore();
  const deleteMutation = useDeletePropertyGroup();
  const updateStatsMutation = useUpdatePropertyGroupStatistics();

  const handleView = (group: PropertyGroup) => {
    openDrawer("view", group);
  };

  const handleEdit = (group: PropertyGroup) => {
    openDrawer("edit", group);
  };

  const handleDelete = (group: PropertyGroup) => {
    setSelectedGroup(group);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedGroup) {
      deleteMutation.mutate(selectedGroup.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedGroup(null);
        },
      });
    }
  };

  const handleManageContacts = (group: PropertyGroup) => {
    // Open contacts view in drawer
    openDrawer("view", group);
    // You can add specific logic to open the contacts tab
  };

  const handleUpdateStatistics = (group: PropertyGroup) => {
    updateStatsMutation.mutate(group.id);
  };

  const columns = createPropertyGroupColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onManageContacts: handleManageContacts,
    onUpdateStatistics: handleUpdateStatistics,
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        searchPlaceholder="Rechercher par nom, référence..."
        searchKey="name"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le groupe <strong>{selectedGroup?.name}</strong> ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}