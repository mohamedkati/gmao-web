"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/shadcnui/sheet";
import { usePropertyGroupStore } from "../store/property-group.store";
import { PropertyGroupContactForm } from "./property-group-contact-form";
import {
  useAddPropertyGroupContact,
  useUpdatePropertyGroupContact,
} from "../hooks/index";
import { ContactFormValues } from "../schemas/property-groups.schema";
import { PropertyGroupContact } from "../types/property-group.types";

interface PropertyGroupContactDrawerProps {
  propertyGroupId: string;
  contacts: PropertyGroupContact[];
}

export function PropertyGroupContactDrawer({
  propertyGroupId,
  contacts,
}: PropertyGroupContactDrawerProps) {
  const { isContactDrawerOpen, selectedContactIndex, closeContactDrawer } =
    usePropertyGroupStore();

  const addMutation = useAddPropertyGroupContact();
  const updateMutation = useUpdatePropertyGroupContact();

  const isEditMode = selectedContactIndex !== null;
  const selectedContact = isEditMode ? contacts[selectedContactIndex] : undefined;

  const handleSubmit = (data: ContactFormValues) => {
    if (isEditMode && selectedContact?.id) {
      updateMutation.mutate(
        {
          id: propertyGroupId,
          contactId: selectedContact.id,
          contact: data,
        },
        {
          onSuccess: () => {
            closeContactDrawer();
          },
        }
      );
    } else {
      addMutation.mutate(
        {
          id: propertyGroupId,
          contact: data,
        },
        {
          onSuccess: () => {
            closeContactDrawer();
          },
        }
      );
    }
  };

  const isLoading = addMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={isContactDrawerOpen} onOpenChange={closeContactDrawer}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Modifier le contact" : "Ajouter un contact"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Modifiez les informations du contact"
              : "Ajoutez un nouveau contact pour ce groupe"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <PropertyGroupContactForm
            initialData={selectedContact}
            onSubmit={handleSubmit}
            onCancel={closeContactDrawer}
            isLoading={isLoading}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}