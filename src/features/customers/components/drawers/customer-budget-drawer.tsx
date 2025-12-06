"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { useCustomerStore } from "../../stores/customer.store";
import { CustomerBudgetForm } from "../forms/customer-budget-form";
import {
  useAddCustomerBudget,
  useCustomerBudget,
  useUpdateCustomerBudget,
} from "../../hooks/user-customers.query";
import { MaintenanceBudgetFormValues } from "../../schemas/customer.schema";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { useState } from "react";
import { ApiValidationResponse } from "@/shared/types/common.types";

export function CustomerBudgetDrawer() {
  const {
    isBudgetDrawerOpen,
    selectedCustomerId,
    selectedBudgetId,
    closeBudgetDrawer,
  } = useCustomerStore();
  const toast = useGMAOToast();
  const addBudgetMutation = useAddCustomerBudget();
  const updateBudgetMutation = useUpdateCustomerBudget();
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);


  const isEditMode = selectedBudgetId !== null;
  const { data: budgetToEdit } = useCustomerBudget(selectedCustomerId || '', selectedBudgetId || '');

  const handleSubmit = (data: MaintenanceBudgetFormValues) => {
    if (isEditMode && budgetToEdit?.id) {
      updateBudgetMutation.mutate(
        {
          id: selectedCustomerId!,
          budgetId: budgetToEdit.id,
          budget: data,
        },
        {
          onSuccess: (response) => {
            if (response.isSucceeded) {
              closeBudgetDrawer();
              toast.success('Budget ajouté avec succès');
            }
            else {
              const errors = (response as ApiValidationResponse).errors;
              setValidationErrors(errors);
              toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
            }
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_CREATION);
          }
        }
      );
    } else {
      addBudgetMutation.mutate(
        {
          id: selectedCustomerId!,
          budget: data,
        },
        {
          onSuccess: (response) => {
            if (response.isSucceeded) {
              toast.success('Budget modifié avec succès');
              closeBudgetDrawer();
            }
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_UPDATE);
          }
        }
      );
    }
  };

  const isLoading = addBudgetMutation.isPending || updateBudgetMutation.isPending;

  return (
    <Sheet open={isBudgetDrawerOpen} onOpenChange={closeBudgetDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Modifier le budget" : "Ajouter un budget"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Modifiez les informations du budget de maintenance"
              : "Ajoutez un nouveau budget de maintenance pour ce client"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <CustomerBudgetForm
            initialData={isEditMode ? budgetToEdit : undefined}
            onSubmit={handleSubmit}
            onCancel={closeBudgetDrawer}
            isLoading={isLoading}
            validationErrors={validationErrors}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}