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
import { Separator } from "@/shared/components/shadcnui/separator";
import { CreditCard, Percent } from "lucide-react";

interface BillingPricingStepProps {
  form: UseFormReturn<PropertyGroupFormValues>;
}

export function BillingPricingStep({ form }: BillingPricingStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold">Facturation et tarification</h3>
          <p className="text-sm text-muted-foreground">
            Paramètres de facturation et coefficients de tarification
          </p>
        </div>
      </div>

      {/* Billing Settings */}
      <div className="space-y-4">
        <h4 className="font-medium">Paramètres de facturation</h4>

        <FormField
          control={form.control}
          name="consolidatedBilling"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Facturation consolidée</FormLabel>
                <FormDescription>
                  Regrouper toutes les factures du groupe en une seule
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="paymentTermsDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Délai de paiement (jours)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Délai de paiement en jours
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volumeDiscountPercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remise volume (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="5.0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Remise basée sur le volume
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferredPaymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode de paiement préféré</FormLabel>
              <FormControl>
                <Input placeholder="Virement bancaire, Chèque..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator />

      {/* Pricing Coefficients */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">Coefficients de tarification</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="groupPricingCoefficients.laborCoefficient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coefficient main d'œuvre</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="1.30"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Par défaut: 1.30
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupPricingCoefficients.materialCoefficient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coefficient matériaux</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="1.25"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Par défaut: 1.25
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupPricingCoefficients.equipmentCoefficient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coefficient équipement</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="1.20"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Par défaut: 1.20
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupPricingCoefficients.subcontractorCoefficient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coefficient sous-traitance</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="1.15"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Par défaut: 1.15
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="groupPricingCoefficients.volumeDiscountPercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remise volume (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupPricingCoefficients.minimumAnnualRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CA minimum annuel (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  CA minimum pour la remise
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="groupPricingCoefficients.emergencyCalloutFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frais d'urgence (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="150.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupPricingCoefficients.monthlyMaintenanceFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forfait mensuel (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="500.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}