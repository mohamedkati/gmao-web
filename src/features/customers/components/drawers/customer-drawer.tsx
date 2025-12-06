"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { useCustomerStore } from "../../stores/customer.store";
// import { CustomerForm } from "../forms/customer-form";
// import { CustomerDetails } from "../cs-details/customer-details";
import {
  useCreateCustomer,
  useCustomer,
  useUpdateCustomer,
} from "../../hooks/user-customers.query";
import { CustomerFormValues } from "../../schemas/customer.schema";
import { lazy, memo, Suspense, useState } from "react";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ApiValidationResponse } from "@/shared/types/common.types";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/shared/lib/constants/app.messages.constants";


const CustomerForm = lazy(() => {
  return import("../forms/customer-form").then(m => ({ default: m.CustomerForm }));
})

const CustomerDetails = lazy(() => {
  return import("../cs-details/customer-details").then(m => ({ default: m.CustomerDetails }));
})

export const CustomerDrawer = memo(function CustomerDrawer() {
  const {
    isDrawerOpen,
    drawerMode,
    selectedCustomerId,
    closeDrawer,
  } = useCustomerStore();

  const toast = useGMAOToast();

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  const { data: customer } = useCustomer(selectedCustomerId || ''); // load customer from db or from cache

  const handleSubmit = (data: CustomerFormValues) => {
    setValidationErrors(undefined);
    if (drawerMode === "edit" && selectedCustomerId) {
      updateMutation.mutate(
        { id: selectedCustomerId, data },
        {
          onSuccess: (response) => {
            if (response.isSucceeded) {
              closeDrawer();
              toast.success('Client modifié avec succès');
              return;
            }
            else {
              const errors = (response as ApiValidationResponse).errors;
              setValidationErrors(errors);
              toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
            }
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_UPDATE);
          }
        }
      );
    } else if (drawerMode === "create") {
      createMutation.mutate(data, {
        onError: (error) => {
          toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_CREATION);
        },
        onSuccess: (response) => {
          if (response.isSucceeded && response.data === true) {
            toast.success(response.message || SUCCESS_MESSAGES.Suceeded);
            closeDrawer();
            return;
          }
          else if (!response.isSucceeded) {
            const errors = (response as ApiValidationResponse).errors;
            setValidationErrors(errors);
            toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
          }
        },
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={closeDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>
            {drawerMode === "create" && "Créer un nouveau client"}
            {drawerMode === "edit" && "Modifier le client"}
            {drawerMode === "view" && "Détails du client"}
          </SheetTitle>
          <SheetDescription>
            {drawerMode === "create" &&
              "Remplissez les informations pour créer un nouveau client"}
            {drawerMode === "edit" &&
              "Modifiez les informations du client"}
            {drawerMode === "view" &&
              "Consultez et gérez les informations du client"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <Suspense fallback={<DrawerSkeleton />} >
            {drawerMode === "view" && selectedCustomerId &&
              <CustomerDetails />
            }
            {(drawerMode === 'create' || drawerMode === 'edit') && (
              <CustomerForm
                initialData={customer || undefined}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                validationErrors={validationErrors}
              />
            )}
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
})

function DrawerSkeleton() {
  return (
    <div className="space-y-4 p-6 animate-pulse">
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
    </div>
  );

}
