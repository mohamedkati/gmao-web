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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
// import { LegalForm } from "../../types/property-group.types";
import { legalFormLabels } from "../../utils/property-groups.utils";
import { Building2 } from "lucide-react";

interface LegalInfoStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function LegalInfoStep({ form }: LegalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Informations légales</h3>
          <p className="text-sm text-muted-foreground">
            Informations juridiques et administratives
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="legalName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Raison sociale</FormLabel>
            <FormControl>
              <Input placeholder="SAS Groupe Immobilier ABC" {...field} />
            </FormControl>
            <FormDescription>
              Nom légal de l'entreprise
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="legalForm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Forme juridique</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === "none" ? undefined : Number(value))}
              value={field.value?.toString() || "none"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une forme juridique" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">Non renseigné</SelectItem>
                {Object.entries(legalFormLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="siren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIREN</FormLabel>
              <FormControl>
                <Input 
                  placeholder="123456789" 
                  maxLength={9}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                9 chiffres (France uniquement)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyRegistrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro RCS</FormLabel>
              <FormControl>
                <Input placeholder="RCS Paris 123 456 789" {...field} />
              </FormControl>
              <FormDescription>
                Numéro d'immatriculation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="vatNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de TVA</FormLabel>
            <FormControl>
              <Input placeholder="FR12345678901" {...field} />
            </FormControl>
            <FormDescription>
              Numéro de TVA intracommunautaire
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}