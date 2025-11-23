"use client";

import { lazy, memo, startTransition, Suspense, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { usePropertyGroupStore } from "../store/property-group.store";
// import { PropertyGroupForm } from "./property-group-form";
// import { PropertyGroupDetails } from "./property-group-details";
import {
  useCreatePropertyGroup,
  useUpdatePropertyGroup,
} from "../hooks/use-property-groups";
import { PropertyGroupFormValues } from "../schemas/property-groups.schema";
import { usePropertyGroup } from "../hooks/use-property-groups";
import { ValidationApiResponse } from "@/shared/types/common.types";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";

// Lazy load
const PropertyGroupForm = lazy(() =>
  import("./property-group-form").then((m) => ({ default: m.PropertyGroupForm }))
);

const PropertyGroupDetails = lazy(() =>
  import("./property-group-details").then((m) => ({
    default: m.PropertyGroupDetails,
  }
  )))

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


export const PropertyGroupDrawer = memo(function PropertyGroupDrawer() {
  const {
    isDrawerOpen,
    drawerMode,
    selectedPropertyGroup,
    closeDrawer,
  } = usePropertyGroupStore();

  const toast = useGMAOToast();

  // const [group, setGroup] = useState<PropertyGroup | undefined>(undefined);
  const createMutation = useCreatePropertyGroup();// mutation de creation
  const updateMutation = useUpdatePropertyGroup();// mutaition de mise ajour
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | undefined>(undefined);

  const { data: group, isLoading: loadingDetail } = usePropertyGroup(selectedPropertyGroup?.id || ''); // C'est une requette useQuery

  const handleSubmit = (data: PropertyGroupFormValues) => {
    setValidationErrors(undefined)
    if (data.frameworkContractStartDate === "")
      data.frameworkContractStartDate = undefined;
    if (data.frameworkContractEndDate === "")
      data.frameworkContractEndDate = undefined;

    if (selectedPropertyGroup)
      data.id = selectedPropertyGroup.id;
    try {
      if (drawerMode === "edit" && selectedPropertyGroup) {
        updateMutation.mutate(
          { id: selectedPropertyGroup.id, data },
          {
            onSuccess: (data) => {
              if (data.isSucceeded) {
                toast.success("Success", "Property group edited successfully");
                handleCloseDrawer();
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
      } else if (drawerMode === "create") {
        createMutation.mutate(data, {
          onSuccess: (data) => {
            if (data.isSucceeded) {
              toast.success("Success", "Property group successfully created");
              handleCloseDrawer();
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
      }
    }
    catch (error) {

    }
  }


  function handleCloseDrawer() {
    startTransition(() => {
      closeDrawer();
    });
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>
            {drawerMode === "create" && "Créer un nouveau groupe"}
            {drawerMode === "edit" && "Modifier le groupe"}
            {drawerMode === "view" && "Détails du groupe"}
          </SheetTitle>
          <SheetDescription>
            {drawerMode === "create" &&
              "Remplissez les informations pour créer un nouveau groupe immobilier"}
            {drawerMode === "edit" &&
              "Modifiez les informations du groupe immobilier"}
            {drawerMode === "view" &&
              "Consultez et gérez les informations du groupe"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden" >
          {isDrawerOpen && (
            <Suspense fallback={<DrawerSkeleton />}>
              {drawerMode === "view" && group ? (
                <PropertyGroupDetails propertyGroup={group!} />
              ) : (
                <PropertyGroupForm
                  initialData={group || undefined}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  validationErrors={validationErrors}
                />
              )}
            </Suspense>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
});

