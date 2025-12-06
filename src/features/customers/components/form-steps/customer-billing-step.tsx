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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Switch } from "@/shared/components/shadcnui/switch";
import { billingModeLabels, invoiceFrequencyLabels } from "../../utils/customer.utils";

export function BillingStep({ form }: any) {
  const applyLatePaymentFees = form.watch('billingSettings.applyLatePaymentFees');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="billingSettings.mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode de facturation *</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(billingModeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billingSettings.invoiceFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fréquence de facturation *</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une fréquence" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(invoiceFrequencyLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
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
        name="billingSettings.paymentTermsDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Délai de paiement (jours) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            </FormControl>
            <FormDescription>
              Nombre de jours accordés pour le paiement
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paymentMethodId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mode de règlement</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {/* TODO: Charger depuis l'API */}
                <SelectItem value="pm-1">Virement bancaire</SelectItem>
                <SelectItem value="pm-2">Chèque</SelectItem>
                <SelectItem value="pm-3">Prélèvement automatique</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4 pt-4 border-t">
        <FormField
          control={form.control}
          name="billingSettings.autoGenerateInvoices"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Génération automatique des factures
                </FormLabel>
                <FormDescription>
                  Les factures seront créées automatiquement selon la fréquence définie
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

        <FormField
          control={form.control}
          name="billingSettings.sendEmailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Notifications par email
                </FormLabel>
                <FormDescription>
                  Envoyer les factures et rappels par email
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

        <FormField
          control={form.control}
          name="billingSettings.applyLatePaymentFees"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Pénalités de retard
                </FormLabel>
                <FormDescription>
                  Appliquer des frais en cas de retard de paiement
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

        {applyLatePaymentFees && (
          <FormField
            control={form.control}
            name="billingSettings.latePaymentFeePercent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pourcentage de pénalité (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Pourcentage appliqué sur le montant en retard
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}