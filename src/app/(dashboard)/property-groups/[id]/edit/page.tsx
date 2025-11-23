

"use client";

import { useRouter } from "next/navigation";
import { PropertyGroupFormPage } from "@/features/property-groups/components/property-group-form-page";
import {
  usePropertyGroup,
  useUpdatePropertyGroup,
} from "@/features/property-groups/hooks/use-property-groups";
import { PropertyGroupFormValues } from "@/features/property-groups/schemas/property-groups.schema";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { useState } from "react";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ValidationApiResponse } from "@/shared/types/common.types";

export default function EditPropertyGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: propertyGroup, isLoading } = usePropertyGroup(params.id);
  const updateMutation = useUpdatePropertyGroup();
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const toast = useGMAOToast();
  const handleSubmit = (data: PropertyGroupFormValues) => {
    setValidationErrors(undefined)
    if (data.frameworkContractStartDate === "")
      data.frameworkContractStartDate = undefined;
    if (data.frameworkContractEndDate === "")
      data.frameworkContractEndDate = undefined;

    if (params.id)
      data.id = params.id;

    updateMutation.mutate(
      { id: params.id, data },
      {
        onSuccess: (data) => {
          if (data.isSucceeded) {
            toast.success("Success", "Property group edited successfully");
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

  if (!propertyGroup) {
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Groupe non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            Le groupe que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => router.push("/property-groups")}
            className="text-primary hover:underline"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <PropertyGroupFormPage
      mode="edit"
      initialData={propertyGroup}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={updateMutation.isPending}
      validationErrors={validationErrors}
    />
  );
}