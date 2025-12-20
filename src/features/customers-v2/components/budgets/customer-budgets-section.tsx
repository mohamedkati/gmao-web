
"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Progress } from "@/shared/components/shadcnui/progress";
import { Plus, DollarSign, Calendar, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { Customer } from "../../types/customer.types";
import { MetricCard } from "@/shared/components/cards";
import { BudgetFormModal } from "../modals/budget-form-modal";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils/cn";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/shadcnui/alert-dialog";
import { useDeleteCustomerBudget } from "../../hooks/user-customers.query";

interface CustomerBudgetsSectionProps {
    customer: Customer;
}

export function CustomerBudgetsSection({ customer }: CustomerBudgetsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState<any | null>(null);
    const [deletingBudgetId, setDeletingBudgetId] = useState<string | null>(null);

    const deleteBudgetMutation = useDeleteCustomerBudget();
    const handleDeleteBudget = async (budgetId: string) => {
        try {
            await deleteBudgetMutation.mutateAsync({ id: customer.id, budgetId }, {
                onSuccess: () => {
                    toast.success("Budget supprimé avec succès");
                    setDeletingBudgetId(null);
                },
                onError: () => {
                    toast.error("Erreur lors de la suppression du budget");
                }
            });
        } catch (error) {
            toast.error("Erreur lors de la suppression du budget");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Budgets de maintenance</h2>
                    <p className="text-muted-foreground">
                        {customer.maintenanceBudgets.length} budget{customer.maintenanceBudgets.length > 1 ? "s" : ""} configuré
                        {customer.maintenanceBudgets.length > 1 ? "s" : ""}
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="shadow-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un budget
                </Button>
            </div>

            {/* Liste des budgets */}
            {customer.maintenanceBudgets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {customer.maintenanceBudgets.map((budget) => {
                        const consumptionPercent = (budget.invoicedAmount / budget.budgetedAmount) * 100;
                        const isOverBudget = consumptionPercent > 100;
                        const isNearThreshold = consumptionPercent >= budget.alertThreshold && !isOverBudget;

                        const status = isOverBudget ? "error" : isNearThreshold ? "warning" : "mainTheme";
                        const statusLabel = isOverBudget ? "Dépassé" : isNearThreshold ? "Alerte" : "OK";

                        return (
                            <div key={budget.id} className="relative group">
                                <MetricCard
                                    title={`Budget ${budget.year}`}
                                    subtitle={`${budget.budgetedAmount.toLocaleString()}€ budgétés`}
                                    icon={Calendar}
                                    status={status}
                                    statusLabel={statusLabel}
                                    bordered="thick"
                                    onEdit={() => {
                                        setEditingBudget(budget);
                                        setIsModalOpen(true);
                                    }}
                                    onDelete={() => setDeletingBudgetId(budget.id!)}
                                >
                                    {/* Content (same as before) */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" />
                                                Consommation
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-3xl font-bold",
                                                    isOverBudget && "text-destructive",
                                                    isNearThreshold && "text-orange-600 dark:text-orange-400",
                                                    !isOverBudget && !isNearThreshold && "text-primary/90 dark:text-primary"
                                                )}
                                            >
                                                {consumptionPercent.toFixed(1)}%
                                            </span>
                                        </div>

                                        <div className="relative">
                                            <Progress
                                                value={Math.min(consumptionPercent, 100)}
                                                className={cn(
                                                    "h-5 rounded-full shadow-inner",
                                                    isOverBudget &&
                                                    "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:via-destructive [&>div]:to-red-600",
                                                    isNearThreshold &&
                                                    "[&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:via-yellow-500 [&>div]:to-orange-500",
                                                    !isOverBudget &&
                                                    !isNearThreshold &&
                                                    "[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:via-emerald-500 [&>div]:to-green-500"
                                                )}
                                            />
                                            <div
                                                className="absolute top-0 bottom-0 w-0.5 bg-primary/50"
                                                style={{ left: `${budget.alertThreshold}%` }}
                                            >
                                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>0€</span>
                                            <span className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                Seuil: {budget.alertThreshold}%
                                            </span>
                                            <span>{budget.budgetedAmount.toLocaleString()}€</span>
                                        </div>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <BudgetStatCard label="Engagé" value={`${budget.committedAmount.toLocaleString()}€`} color="blue" />
                                        <BudgetStatCard label="Facturé" value={`${budget.invoicedAmount.toLocaleString()}€`} color="purple" />
                                        <BudgetStatCard
                                            label="Restant"
                                            value={`${(budget.budgetedAmount - budget.invoicedAmount).toLocaleString()}€`}
                                            color="green"
                                            isNegative={(budget.budgetedAmount - budget.invoicedAmount) < 0}
                                        />
                                        <BudgetStatCard
                                            label="Disponible"
                                            value={`${(budget.budgetedAmount - budget.committedAmount).toLocaleString()}€`}
                                            color="orange"
                                        />
                                    </div>

                                    {budget.alertSent && (
                                        <div className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-orange-500/10 border border-orange-500/20">
                                            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 animate-pulse" />
                                            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                                Alerte de dépassement envoyée
                                            </span>
                                        </div>
                                    )}
                                </MetricCard>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <EmptyBudgetsState onAdd={() => setIsModalOpen(true)} />
            )}

            {/* Modal d'ajout/édition */}
            <BudgetFormModal
                open={isModalOpen}
                onOpenChange={(open) => {
                    setIsModalOpen(open);
                    if (!open) setEditingBudget(null);
                }}
                initialData={editingBudget || undefined}
                mode={editingBudget ? "edit" : "create"}
                customerId={customer.id}
                id={editingBudget?.id || undefined}
            />

            {/* Dialog de confirmation de suppression */}
            <AlertDialog
                open={!!deletingBudgetId}
                onOpenChange={(open) => !open && setDeletingBudgetId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce budget ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletingBudgetId && handleDeleteBudget(deletingBudgetId)}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {deleteBudgetMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// Helper component
function BudgetStatCard({
    label,
    value,
    color,
    isNegative = false,
}: {
    label: string;
    value: string;
    color: string;
    isNegative?: boolean;
}) {
    const colorMap: Record<string, string> = {
        blue: "from-blue-500/10 to-transparent border-blue-500/20",
        purple: "from-purple-500/10 to-transparent border-purple-500/20",
        green: "from-green-500/10 to-transparent border-green-500/20",
        orange: "from-orange-500/10 to-transparent border-orange-500/20",
    };

    return (
        <div className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}>
            <p className="text-xs text-muted-foreground mb-1 font-medium">{label}</p>
            <p className={cn("text-xl font-bold", isNegative && "text-destructive")}>{value}</p>
        </div>
    );
}

// Empty state
function EmptyBudgetsState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="text-center py-20">
            <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
                <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
                    <DollarSign className="h-16 w-16 text-muted-foreground" />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Aucun budget défini</h3>
            <p className="text-muted-foreground mb-6">Ajoutez des budgets de maintenance pour ce client</p>
            <Button size="lg" onClick={onAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un budget
            </Button>
        </div>
    );
}