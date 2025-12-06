"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maintenanceBudgetFormSchema, MaintenanceBudgetFormValues } from "../../schemas/customer.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Button } from "@/shared/components/shadcnui/button";
import { Switch } from "@/shared/components/shadcnui/switch";
import { MaintenanceBudget } from "../../types/customer.types";
import { formatCurrency } from "../../utils/customer.utils";
import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Calculator } from "lucide-react";
import { useEffect } from "react";

interface CustomerBudgetFormProps {
  initialData?: MaintenanceBudget;
  onSubmit: (data: MaintenanceBudgetFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  validationErrors?: Record<string, string[]>;
}

export function CustomerBudgetForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors
}: CustomerBudgetFormProps) {
  const form = useForm<MaintenanceBudgetFormValues>({
    resolver: zodResolver(maintenanceBudgetFormSchema),
    values: initialData
      ? {
        year: initialData.year,
        budgetedAmount: initialData.budgetedAmount,
        committedAmount: initialData.committedAmount,
        invoicedAmount: initialData.invoicedAmount,
        alertThreshold: initialData.alertThreshold,
        alertSent: initialData.alertSent,
      }
      : {
        year: new Date().getFullYear(),
        budgetedAmount: 0,
        committedAmount: 0,
        invoicedAmount: 0,
        alertThreshold: 80,
        alertSent: false,
      },
  });

  useEffect(() => {
    if (validationErrors) {
      Object.entries(validationErrors).forEach(([fieldName, errors]) => {
        form.setError(fieldName as any, { message: errors.join(", ") });
      })
    }
  }, [validationErrors]);

  const handleFormSubmit = form.handleSubmit(onSubmit);

  // Watch values for calculation
  const budgetedAmount = form.watch("budgetedAmount");
  const committedAmount = form.watch("committedAmount");
  const invoicedAmount = form.watch("invoicedAmount");

  const remainingBudget = budgetedAmount - committedAmount - invoicedAmount;
  const consumptionPercent = budgetedAmount > 0
    ? ((committedAmount + invoicedAmount) / budgetedAmount) * 100
    : 0;

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="2000"
                  max="2100"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Année du budget de maintenance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetedAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant budgété (€) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Budget total alloué pour la maintenance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="committedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant engagé (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Montant des devis acceptés
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoicedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant facturé (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Montant déjà facturé
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Budget Summary */}
        {budgetedAmount > 0 && (
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-semibold">Calcul automatique</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget restant:</span>
                  <span className={`font-bold ${remainingBudget < 0 ? 'text-destructive' : 'text-green-600'}`}>
                    {formatCurrency(remainingBudget)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taux de consommation:</span>
                  <span className={`font-bold ${consumptionPercent >= 80 ? 'text-destructive' : 'text-primary'}`}>
                    {consumptionPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <FormField
          control={form.control}
          name="alertThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seuil d'alerte (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Pourcentage de consommation déclenchant une alerte (par défaut: 80%)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alertSent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Alerte envoyée</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Marquer l'alerte comme déjà envoyée
                </div>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner mr-2 h-4 w-4" />
                Enregistrement...
              </>
            ) : initialData ? (
              "Mettre à jour"
            ) : (
              "Ajouter"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}