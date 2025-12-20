"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { useCustomerStore } from "../../stores/customer.store";
import { CustomerContactForm } from "../forms/customer-contact-form";
import {
  useAddCustomerContact,
  useCustomerContact,
  useUpdateCustomerContact,
} from "../../hooks/user-customers.query";
import { ContactFormValues } from "../../schemas/customer.schema";
import { useState } from "react";
import { ApiResponse, ApiValidationResponse } from "@/shared/types/common.types";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { SkeletonLoader } from "@/shared/components";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
import { AlertCircle } from "lucide-react";

export function CustomerContactDrawer() {
  const {
    isContactDrawerOpen,
    selectedCustomerId,
    selectedContactId,
    closeContactDrawer,
  } = useCustomerStore();

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const addContactMutation = useAddCustomerContact();
  const updateContactMutation = useUpdateCustomerContact();
  const toast = useGMAOToast();
  // if (!selectedCustomerId) {
  //   // toast.error("Aucun client séléctionné !");
  //   closeContactDrawer();
  //   return null;
  // }

  // if (!selectedContactId) {
  //   // toast.error("Aucun contact séléctionné !");
  //   closeContactDrawer();
  //   return null;
  // }

  const isEditMode = selectedContactId !== null;
  const { data: contactToEdit, isLoading: isLoadingData, error } = useCustomerContact(selectedCustomerId || '', selectedContactId || '');

  const handleSubmit = (data: ContactFormValues) => {
    setValidationErrors(undefined);
    if (isEditMode && contactToEdit?.id) {
      updateContactMutation.mutate(
        {
          id: selectedCustomerId!,
          contactId: contactToEdit.id,
          contact: data,
        },
        {
          onSuccess: handleOnSuccessResponse,
        }
      );
    } else {
      addContactMutation.mutate(
        {
          id: selectedCustomerId!,
          contact: data,
        },
        {
          onSuccess: handleOnSuccessResponse,
        }
      );
    }
  };

  function handleOnSuccessResponse(response: ApiResponse<boolean> | ApiValidationResponse) {
    if (response.isSucceeded) {
      closeContactDrawer();
      toast.success(`Contact ${isEditMode ? 'modifié' : 'créé'} avec succès`);
    }
    else {
      const errors = (response as ApiValidationResponse).errors;
      setValidationErrors(errors);
      toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR);
    }
  }

  const isLoading = addContactMutation.isPending || updateContactMutation.isPending;

  return (
    <Sheet open={isContactDrawerOpen} onOpenChange={closeContactDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Modifier le contact" : "Ajouter un contact"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Modifiez les informations du contact"
              : "Ajoutez un nouveau contact pour ce client"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {
            isEditMode && isLoadingData ?
              <SkeletonLoader type="form" count={5} /> :
              error && isEditMode ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Erreur lors du chargement du contact. Veuillez réessayer.
                  </AlertDescription>
                </Alert>
              ) :
                (
                  <CustomerContactForm
                    initialData={isEditMode ? contactToEdit : undefined}
                    onSubmit={handleSubmit}
                    onCancel={closeContactDrawer}
                    isLoading={isLoading}
                    validationErrors={validationErrors}
                  />
                )
          }

        </div>
      </SheetContent>
    </Sheet>
  );
}