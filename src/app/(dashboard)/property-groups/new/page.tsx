"use client";

import { useRouter } from "next/navigation";
import { PropertyGroupFormPage } from "@/features/property-groups/components/property-group-form-page";
import { useCreatePropertyGroup } from "@/features/property-groups/hooks/use-property-groups";
import { PropertyGroupFormValues } from "@/features/property-groups/schemas/property-groups.schema";
import { useState } from "react";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ValidationApiResponse } from "@/shared/types/common.types";

export default function NewPropertyGroupPage() {
  const router = useRouter();
  const createMutation = useCreatePropertyGroup();
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);

  const toast = useGMAOToast();

  const handleSubmit = (data: PropertyGroupFormValues) => {
    setValidationErrors(undefined)
    if (data.frameworkContractStartDate === "")
      data.frameworkContractStartDate = undefined;
    if (data.frameworkContractEndDate === "")
      data.frameworkContractEndDate = undefined;

    createMutation.mutate(data, {
      onSuccess: (data) => {
        if (data.isSucceeded) {
          toast.success("Success", "Group crée avec succès");
          router.push("/property-groups");
        }
        else {
          setValidationErrors((data as ValidationApiResponse).errors);
          toast.warning("Erreurs Validations", data.errorMessage);
        }
      },
      onError: (error) => {
        console.log("from error,", error);
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <PropertyGroupFormPage
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createMutation.isPending}
      validationErrors={validationErrors}
    />
  );
}