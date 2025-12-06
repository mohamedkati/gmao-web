// src/app/(dashboard)/customers/new/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { CustomerFormPage } from "@/features/customers/components/forms/customer-form-page";
import { useCreateCustomer } from "@/features/customers/hooks/user-customers.query";
import { CustomerFormValues } from "@/features/customers/schemas/customer.schema";
import { useState } from "react";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { ApiValidationResponse } from "@/shared/types/common.types";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";

export default function NewCustomerPage() {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const createMutation = useCreateCustomer();
  const toast = useGMAOToast();
  const handleSubmit = (data: CustomerFormValues) => {
    createMutation.mutate(data, {
      onError: (error) => {
        toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_CREATION);
      },
      onSuccess: (response) => {
        if (response.isSucceeded && response.data === true) {
          toast.success(response.message || SUCCESS_MESSAGES.Suceeded);
          router.push("/customers");
          return;
        }
        else if (!response.isSucceeded) {
          const errors = (response as ApiValidationResponse).errors;
          setValidationErrors(errors);
          toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
        }
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <CustomerFormPage
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createMutation.isPending}
      validationErrors={validationErrors}
    />
  );
}