// src/features/customers/components/customers-table.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/shared/components/data-table/data-table";
import { createCustomerColumns } from "./cs-columns";
import { Customer } from "../../types/customer.types";
import { useCustomerStore } from "../../stores/customer.store";
import { useDeleteCustomer } from "../../hooks/user-customers.query";
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

interface CustomersTableProps {
  data: Customer[];
  isLoading?: boolean;
}

export function CustomersTable({ data, isLoading }: CustomersTableProps) {
  const router = useRouter();
  const { openDrawer } = useCustomerStore();
  const deleteMutation = useDeleteCustomer();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const handleView = (customerId: string) => {
    openDrawer("view", customerId);
  };

  const handleEdit = (customerId: string) => {
    openDrawer("edit", customerId);
  };

  const handleEditPage = (customerId: string) => {
    router.push(`/customers/${customerId}/edit`);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      deleteMutation.mutate(customerToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setCustomerToDelete(null);
        },
      });
    }
  };

  const handleManageContacts = (customerId: string) => {
    openDrawer("view", customerId);
    // Ouvrir directement sur l'onglet contacts si possible
  };

  const handleManageBudgets = (customerId: string) => {
    openDrawer("view", customerId);
    // Ouvrir directement sur l'onglet budgets si possible
  };

  const handleViewOnPage = (customerId: string) => {
    router.push(`/customers/${customerId}`);
  }

  const columns = createCustomerColumns({
    onView: handleView,
    onViewOnPage: handleViewOnPage,
    onEdit: handleEdit,
    onEditPage: handleEditPage,
    onDelete: handleDelete,
    onManageContacts: handleManageContacts,
    onManageBudgets: handleManageBudgets,
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchKey="companyName"
        searchPlaceholder="Rechercher par nom ou référence..."
        isLoading={isLoading}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le client{" "}
              <strong>{customerToDelete?.companyName}</strong> ? Cette action est
              irréversible et supprimera également tous les contacts et budgets associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <span className="spinner mr-2 h-4 w-4" />
                  Suppression...
                </>
              ) : (
                "Supprimer définitivement"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}