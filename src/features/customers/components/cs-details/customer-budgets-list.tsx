"use client";

import { useState } from "react";
import {  MaintenanceBudget } from "../../../customers-v2/types/customer.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Progress } from "@/shared/components/shadcnui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
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
import {
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Wallet,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useCustomerStore } from "../../stores/customer.store";
import { useCustomerBudgets, useDeleteCustomerBudget } from "../../hooks/user-customers.query";
import { formatCurrency, formatPercent, getBudgetAlertColor } from "../../utils/customer.utils";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { SkeletonLoader } from "@/shared/components";

interface CustomerBudgetsListProps {
  // customer: Customer;
}

export function CustomerBudgetsList({ }: CustomerBudgetsListProps) {
  const { openBudgetDrawer, selectedCustomerId } = useCustomerStore();
  const deleteBudgetMutation = useDeleteCustomerBudget();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState<MaintenanceBudget | null>(null);
  const toast = useGMAOToast();

  const handleAddBudget = () => {
    openBudgetDrawer();
  };

  const handleEditBudget = (budgetId: string) => {
    openBudgetDrawer(budgetId);
  };

  const handleDeleteBudget = (budget: MaintenanceBudget) => {
    setBudgetToDelete(budget);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (budgetToDelete && budgetToDelete.id) {
      deleteBudgetMutation.mutate(
        { id: selectedCustomerId!, budgetId: budgetToDelete.id },
        {
          onSuccess: () => {
            setDeleteDialogOpen(false);
            setBudgetToDelete(null);
            toast.success('Budget supprimé avec succès');
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_DELETE);
          }
        }
      );
    }
  };

  const { data: budgets, isLoading } = useCustomerBudgets(selectedCustomerId || '');

  if (isLoading)
    return <SkeletonLoader type="card" count={3} />

  if (!budgets)
    return <NoBudgetFound handleAddBudget={handleAddBudget} />


  const sortedBudgets = [...budgets].sort((a, b) => b.year - a.year);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Budgets de maintenance</h3>
          <Button onClick={handleAddBudget} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un budget
          </Button>
        </div>

        {sortedBudgets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Aucun budget enregistré</p>
              <p className="text-sm text-muted-foreground mb-4">
                Ajoutez des budgets pour suivre les dépenses de maintenance
              </p>
              <Button onClick={handleAddBudget} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter le premier budget
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sortedBudgets.map((budget, index) => (
              <Card key={budget.id || index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">Budget {budget.year}</CardTitle>
                        <Badge className={getBudgetAlertColor(budget.consumptionPercent, budget.alertThreshold)}>
                          {formatPercent(budget.consumptionPercent || 0)}
                        </Badge>
                        {(budget.consumptionPercent || 0) >= budget.alertThreshold && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Alerte
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBudget(budget.id!)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteBudget(budget)}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Budget Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Budget alloué</p>
                      <p className="text-lg font-bold flex items-center gap-1">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        {formatCurrency(budget.budgetedAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Budget restant</p>
                      <p className="text-lg font-bold flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        {formatCurrency(budget.remainingBudget || 0)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Consommation</span>
                      <span className="font-medium">{formatPercent(budget.consumptionPercent || 0)}</span>
                    </div>
                    <Progress
                      value={budget.consumptionPercent}
                      className="h-2"
                    />
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Engagé:</span>
                      <span className="font-medium">{formatCurrency(budget.committedAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Facturé:</span>
                      <span className="font-medium">{formatCurrency(budget.invoicedAmount)}</span>
                    </div>
                  </div>

                  {/* Alert Info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Seuil d'alerte: {budget.alertThreshold}%</span>
                    {budget.alertSent && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Alerte envoyée</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le budget{" "}
              <strong>{budgetToDelete?.year}</strong> ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function NoBudgetFound({ handleAddBudget }) {
  return <Card>
    <CardContent className="flex flex-col items-center justify-center py-12">
      <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground mb-2">Aucun budget enregistré</p>
      <p className="text-sm text-muted-foreground mb-4">
        Ajoutez des budgets pour suivre les dépenses de maintenance
      </p>
      <Button onClick={handleAddBudget} size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Ajouter le premier budget
      </Button>
    </CardContent>
  </Card>
}