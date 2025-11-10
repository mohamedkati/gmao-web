"use client";

import { UseFormReturn } from "react-hook-form";
import { PropertyGroupFormValues } from "../../schemas/property-groups.schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Switch } from "@/shared/components/shadcnui/switch";
import { FileText } from "lucide-react";

interface ContractStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function ContractStep({ form }: ContractStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Contrat cadre</h3>
          <p className="text-sm text-muted-foreground">
            Informations sur le contrat cadre du groupe
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="frameworkContractReference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Référence du contrat</FormLabel>
            <FormControl>
              <Input placeholder="CONT-2024-001" {...field} />
            </FormControl>
            <FormDescription>
              Référence unique du contrat cadre
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="frameworkContractStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frameworkContractEndDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="autoRenewalFrameworkContract"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Reconduction automatique</FormLabel>
              <FormDescription>
                Le contrat se renouvelle automatiquement à l'échéance
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}