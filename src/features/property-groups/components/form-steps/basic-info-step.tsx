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
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
// import { PropertyGroupType, PropertyGroupStatus } from "../types/property-group.types";
import {
  propertyGroupTypeLabels,
  propertyGroupStatusLabels,
} from "../../utils/property-groups.utils";

interface BasicInfoStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Informations de base</h3>
        <p className="text-sm text-muted-foreground">
          Renseignez les informations principales du groupe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Référence *</FormLabel>
              <FormControl>
                <Input placeholder="GRP-001" {...field} />
              </FormControl>
              <FormDescription>
                Référence unique du groupe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut *</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(propertyGroupStatusLabels).map(([value, label]) => (
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
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du groupe *</FormLabel>
            <FormControl>
              <Input placeholder="Groupe Immobilier ABC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de groupe *</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(propertyGroupTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Type d'activité principal du groupe
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Description détaillée du groupe..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Description optionnelle du groupe et de ses activités
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}