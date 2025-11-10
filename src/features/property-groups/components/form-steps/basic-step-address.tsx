// src/features/property-groups/components/form-steps/address-step.tsx

"use client";

import { UseFormReturn } from "react-hook-form";
import { PropertyGroupFormValues } from "../../schemas/property-groups.schema";
import {
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { MapPin } from "lucide-react";

interface AddressStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function AddressStep({ form }: AddressStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Adresse du siège social</h3>
          <p className="text-sm text-muted-foreground">
            Localisation principale du groupe
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="headquartersAddress.firstAddressLine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse ligne 1</FormLabel>
            <FormControl>
              <Input placeholder="Bâtiment, Résidence..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="headquartersAddress.secondAddressLine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse ligne 2</FormLabel>
            <FormControl>
              <Input placeholder="Complément d'adresse..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="headquartersAddress.street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rue *</FormLabel>
            <FormControl>
              <Input placeholder="123 Avenue des Champs-Élysées" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="headquartersAddress.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal *</FormLabel>
              <FormControl>
                <Input placeholder="75008" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headquartersAddress.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville *</FormLabel>
              <FormControl>
                <Input placeholder="Paris" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="headquartersAddress.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pays *</FormLabel>
            <FormControl>
              <Input placeholder="France" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}