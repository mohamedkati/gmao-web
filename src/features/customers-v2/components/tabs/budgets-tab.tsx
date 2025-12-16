// features/customers/components/tabs/BudgetsTab.tsx
import React from "react";
import { Plus, MoreVertical } from "lucide-react";
import { StripeProgress } from "@/shared/components/stripe/stripe-progress";
import { Button } from "@/shared/components/ui/button";
import { useBudgetStore } from "../../stores/useBudgetStore";
import { useCustomerBudgets } from "../../hooks/user-customers.query";

interface BudgetsTabProps {
  customerId: string;
}

export const BudgetsTab: React.FC<BudgetsTabProps> = ({ customerId }) => {
  const { data: budgets, isLoading } = useCustomerBudgets(customerId);
  const { openCreateDrawer } = useBudgetStore();

  if (isLoading) return <div>Loading budgets...</div>;

  // Calculate totals
  const totalBudget = budgets?.reduce((sum, b) => sum + (b.budgetedAmount || 0), 0) || 0;
  const totalSpent = budgets?.reduce((sum, b) => sum + (b.invoicedAmount || 0), 0) || 0;
  const remaining = totalBudget - totalSpent;
  const avgPerProperty = budgets && budgets.length > 0 ? totalBudget / budgets.length : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Maintenance Budgets</h2>
            <p className="text-sm text-gray-500">Track and manage maintenance budgets across all properties</p>
          </div>
          <Button
            onClick={() => openCreateDrawer(customerId)}
            className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add budget
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-6 grid grid-cols-4 gap-4 border-b border-gray-100">
        <div className="bg-[#e0d9ff] rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">TOTAL BUDGET</p>
          <p className="text-3xl font-bold text-[#635bff]">€{(totalBudget / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">SPENT TO DATE</p>
          <p className="text-3xl font-bold text-green-600">€{(totalSpent / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500 mt-1">({((totalSpent / totalBudget) * 100).toFixed(0)}%)</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">REMAINING</p>
          <p className="text-3xl font-bold text-orange-500">€{(remaining / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500 mt-1">({((remaining / totalBudget) * 100).toFixed(0)}%)</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">AVG PER PROPERTY</p>
          <p className="text-3xl font-bold text-blue-600">€{(avgPerProperty / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_0.5fr] gap-4">
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">PROPERTY / SITE</div>
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">BUDGET TYPE</div>
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">ALLOCATED</div>
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">SPENT</div>
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">PROGRESS</div>
          <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">ACTIONS</div>
        </div>
      </div>

      {/* Budget Rows */}
      <div className="divide-y divide-gray-100">
        {budgets?.map((budget, index) => {
          const percentage = budget.budgetedAmount ? (budget.invoicedAmount! / budget.budgetedAmount) * 100 : 0;
          
          return (
            <div
              key={budget.id}
              className={`px-6 py-5 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_0.5fr] gap-4 items-center">
                {/* Property */}
                <div>
                  <p className="text-base font-semibold text-gray-900">{ "Property Name"}</p>
                  <p className="text-xs text-gray-400">Annual maintenance budget</p>
                </div>

                {/* Budget Type */}
                <div>
                  <span className="inline-flex px-3 py-1 bg-[#e0d9ff] text-[#635bff] text-xs font-semibold rounded-full">
                    {budget.year || "Annual"}
                  </span>
                </div>

                {/* Allocated */}
                <div>
                  <p className="text-base font-semibold text-gray-900">€{budget.budgetedAmount?.toLocaleString()}</p>
                </div>

                {/* Spent */}
                <div>
                  <p className="text-base font-semibold text-green-600">€{budget.invoicedAmount?.toLocaleString()}</p>
                </div>

                {/* Progress */}
                <div>
                  <StripeProgress value={budget.budgetedAmount || 0} max={budget.invoicedAmount || 1} />
                </div>

                {/* Actions */}
                <div className="flex justify-center">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};