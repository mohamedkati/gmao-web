"use client";

import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { usePropertyGroupStore } from "../store/property-group.store";
import { PropertyGroupForm } from "./property-group-form";
import { PropertyGroupDetails } from "./property-group-details";
import {
  useCreatePropertyGroup,
  useUpdatePropertyGroup,
} from "../hooks/index";
import { PropertyGroupFormValues } from "../schemas/property-groups.schema";

export function PropertyGroupDrawer() {
  const {
    isDrawerOpen,
    drawerMode,
    selectedPropertyGroup,
    closeDrawer,
  } = usePropertyGroupStore();

  const createMutation = useCreatePropertyGroup();
  const updateMutation = useUpdatePropertyGroup();

  const handleSubmit = (data: PropertyGroupFormValues) => {
    if (drawerMode === "edit" && selectedPropertyGroup) {
      updateMutation.mutate(
        { id: selectedPropertyGroup.id, data },
        {
          onSuccess: () => {
            closeDrawer();
          },
        }
      );
    } else if (drawerMode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          closeDrawer();
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

        <div className="flex-1 overflow-hidden">
          {drawerMode === "view" && selectedPropertyGroup ? (
            <PropertyGroupDetails propertyGroup={selectedPropertyGroup} />
          ) : (
            <PropertyGroupForm
              initialData={selectedPropertyGroup || undefined}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}