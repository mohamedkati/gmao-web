"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Calculator } from "lucide-react";

export function PricingStep({ form }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Calculator className="h-5 w-5" />
        <p className="text-sm">
          Définissez les coefficients de tarification pour ce client. Les valeurs par défaut sont déjà renseignées.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="pricingCoefficients.laborCoefficient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coefficient Main d'œuvre</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Doit être ≥ 1.0 (par défaut: 1.30)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricingCoefficients.materialCoefficient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coefficient Matériaux</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Doit être ≥ 1.0 (par défaut: 1.25)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricingCoefficients.equipmentCoefficient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coefficient Équipement</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Doit être ≥ 1.0 (par défaut: 1.20)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricingCoefficients.subcontractorCoefficient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coefficient Sous-traitance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Doit être ≥ 1.0 (par défaut: 1.15)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}