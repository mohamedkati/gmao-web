"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";

import { UserCheck } from "lucide-react";
import { StaffSelect } from "../dynamic-selects/staff-selec";

export function CommercialStep({ form }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <UserCheck className="h-5 w-5" />
        <p className="text-sm">
          Assignez un commercial responsable de ce client
        </p>
      </div>

      <FormField
        control={form.control}
        name="commercialId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Commercial responsable *</FormLabel>
            <FormControl>
              <StaffSelect
                value={field.value}
                onValueChange={field.onChange}
                allowClear={true}

              />
            </FormControl>
            <FormDescription>
              Le commercial sera notifié et pourra gérer ce client
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Informations</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Le commercial recevra une notification lors de la création</li>
          <li>Il pourra consulter et modifier les informations du client</li>
          <li>Les commissions seront calculées automatiquement</li>
        </ul>
      </div>
    </div>
  );
}