// src/features/customers/components/modals/budget-form-modal.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcnui/dialog";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    Form,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Button } from "@/shared/components/shadcnui/button";
import { Slider } from "@/shared/components/shadcnui/slider";
import { MaintenanceBudgetFormValues, maintenanceBudgetFormSchema } from "../../schemas/customer.schema";
import { Calendar, DollarSign, Percent, AlertCircle, Save } from "lucide-react";
import { useAddCustomerBudget, useUpdateCustomerBudget } from "../../hooks/user-customers.query";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ApiValidationResponse } from "@/shared/types/common.types";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";

interface BudgetFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: MaintenanceBudgetFormValues;
    mode: "create" | "edit";
    customerId: string;
    id?: string;
}

export function BudgetFormModal({
    open,
    onOpenChange,
    initialData,
    mode,
    customerId,
    id
}: BudgetFormModalProps) {
    const currentYear = new Date().getFullYear();

    const form = useForm<MaintenanceBudgetFormValues>({
        resolver: zodResolver(maintenanceBudgetFormSchema),
        values: initialData || {
            year: currentYear,
            budgetedAmount: 0,
            committedAmount: 0,
            invoicedAmount: 0,
            alertThreshold: 80,
            alertSent: false,
        },
    });
    const addBudgetMutation = useAddCustomerBudget();
    const updateBudgetMutation = useUpdateCustomerBudget();
    const toast = useGMAOToast();
    const handleSubmit = (data: MaintenanceBudgetFormValues) => {
        if (mode === "edit" && initialData) {
            updateBudgetMutation.mutate(
                {
                    id: customerId!,
                    budgetId: id!,
                    budget: data,
                },
                {
                    onSuccess: (response) => {
                        if (response.isSucceeded) {
                            onOpenChange(false);
                            form?.reset();
                            toast.success('Budget ajouté avec succès');
                        }
                        else {
                            const errors = (response as ApiValidationResponse).errors;
                            setValidationErrors(errors);
                            toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
                        }
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_CREATION);
                    }
                }
            );
        } else {
            addBudgetMutation.mutate(
                {
                    id: customerId!,
                    budget: data,
                },
                {
                    onSuccess: (response) => {
                        if (response.isSucceeded) {
                            onOpenChange(false);
                            toast.success('Budget modifié avec succès');
                            form?.reset();
                        }
                        else {
                            const errors = (response as ApiValidationResponse).errors;
                            setValidationErrors(errors);
                            toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
                        }
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_UPDATE);
                    }
                }
            );
        }
    };

    const alertThreshold = form.watch("alertThreshold");

    const isSubmitting = addBudgetMutation.isPending || updateBudgetMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        {mode === "create" ? "Ajouter un budget" : "Modifier le budget"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Définissez un nouveau budget de maintenance"
                            : "Modifiez les paramètres du budget"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Année et montant */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Informations générales
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    Année
                                                    <span className="text-destructive">*</span>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={2000}
                                                    max={2100}
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="budgetedAmount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                    Montant budgété
                                                    <span className="text-destructive">*</span>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        step={0.01}
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                        className="pr-8"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                        €
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormDescription>Budget total alloué pour l'année</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Seuil d'alerte */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Seuil d'alerte
                            </h4>

                            <FormField
                                control={form.control}
                                name="alertThreshold"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Percent className="h-4 w-4 text-muted-foreground" />
                                                Pourcentage d'alerte : {field.value}%
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="pt-2">
                                                <Slider
                                                    value={[field.value]}
                                                    onValueChange={([value]) => field.onChange(value)}
                                                    min={0}
                                                    max={100}
                                                    step={5}
                                                    className="w-full"
                                                />
                                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                                    <span>0%</span>
                                                    <span>50%</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Une alerte sera envoyée lorsque la consommation atteint ce seuil
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Preview de l'alerte */}
                            <div className="p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    <div>
                                        <p className="font-semibold text-sm">Seuil d'alerte configuré</p>
                                        <p className="text-xs text-muted-foreground">
                                            Vous serez alerté à {alertThreshold}% de consommation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Montants actuels (mode edit) */}
                        {mode === "edit" && (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-sm text-muted-foreground">
                                    Montants actuels
                                </h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="committedAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Montant engagé</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            step={0.01}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                            className="pr-8"
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                            €
                                                        </span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="invoicedAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Montant facturé</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            step={0.01}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                            className="pr-8"
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                                            €
                                                        </span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <AlertCircle className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                {mode === "create" ? "Ajouter" : "Mettre à jour"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function setValidationErrors(errors: any) {
    throw new Error("Function not implemented.");
}
