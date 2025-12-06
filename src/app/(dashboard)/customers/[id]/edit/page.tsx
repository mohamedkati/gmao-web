// src/app/(dashboard)/customers/[id]/edit/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { CustomerFormPage } from "@/features/customers/components/forms/customer-form-page";
import {
  useCustomer,
  useUpdateCustomer,
} from "@/features/customers/hooks/user-customers.query";
import { CustomerFormValues } from "@/features/customers/schemas/customer.schema";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Button } from "@/shared/components/shadcnui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ApiValidationResponse } from "@/shared/types/common.types";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";

export default function EditCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: customer, isLoading } = useCustomer(params.id);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);

  const updateMutation = useUpdateCustomer();
  const toast = useGMAOToast();

  const handleSubmit = (data: CustomerFormValues) => {
    updateMutation.mutate(
      { id: params.id, data },
      {
        onSuccess: (response) => {
          if (response.isSucceeded) {

            toast.success('Client modifié avec succès');
            router.push("/customers/" + params.id);
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
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/customers")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>

        <div className="text-center py-12">
          <div className="rounded-full bg-destructive/10 p-3 inline-block mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Client non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            Le client que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => router.push("/customers")}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CustomerFormPage
      mode="edit"
      initialData={customer}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={updateMutation.isPending}
      validationErrors={validationErrors}
    />
  );
}