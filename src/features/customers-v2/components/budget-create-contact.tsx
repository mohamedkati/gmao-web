// features/customers/components/budgets/BudgetCreateDrawer.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useBudgetStore } from "../stores/useBudgetStore";
import { MaintenanceBudget  as MaintenanceBudgetCreateDto } from "../types/customer.types";

export const BudgetCreateDrawer: React.FC = () => {
  const { isCreateDrawerOpen, closeCreateDrawer, customerId } = useBudgetStore();
  
  const [formData, setFormData] = useState<Partial<MaintenanceBudgetCreateDto>>({
    // budgetType: "Annual",
    invoicedAmount: 0,
    alertThreshold: 80,
  });

  if (!isCreateDrawerOpen || !customerId) return null;

  const handleSubmit = async () => {
    // await createMutation.mutateAsync({
    //   ...formData,
    //   customerId,
    // } as MaintenanceBudgetCreateDto);
    // closeCreateDrawer();
    // setFormData({ budgetType: "Annual", spent: 0, alertThreshold: 80 });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-60 z-40"
        onClick={closeCreateDrawer}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[550px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Add maintenance budget</h2>
              <p className="text-sm text-gray-500">Create a new budget for a property</p>
            </div>
            <button
              onClick={closeCreateDrawer}
              className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-sm font-medium text-gray-900 mb-1">💰 Budget Information</p>
              <p className="text-xs text-gray-600">
                This budget will be used to track maintenance expenses for the selected property.
              </p>
            </div>

            {/* Property Selection */}
            <div>
              <Label htmlFor="propertyGroupId" className="text-sm font-semibold text-gray-700 mb-2">
                Property / Site *
              </Label>
              <select
                id="propertyGroupId"
                value={""}
                onChange={(e) => setFormData({ ...formData
                 })}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select a property</option>
                {/* {properties?.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.address?.city}
                  </option>
                ))} */}
              </select>
            </div>

            {/* Budget Type */}
            <div>
              <Label htmlFor="budgetType" className="text-sm font-semibold text-gray-700 mb-2">
                Budget type *
              </Label>
              <select
                id="budgetType"
                value={formData.year || "Annual"}
                onChange={(e) => setFormData({ ...formData
                })}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="Annual">Annual Budget</option>
                <option value="Quarterly">Quarterly Budget</option>
                <option value="Monthly">Monthly Budget</option>
                <option value="Project">Project Budget</option>
              </select>
            </div>

            {/* Budget Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-semibold text-gray-700 mb-2">
                Budget amount (€) *
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.budgetedAmount || ""}
                  onChange={(e) => setFormData({ ...formData, budgetedAmount: parseFloat(e.target.value) })}
                  className="h-12 pl-10 border-2 border-[#635bff]"
                  placeholder="50000.00"
                />
              </div>
            </div>

            {/* Fiscal Year */}
            <div>
              <Label htmlFor="fiscalYear" className="text-sm font-semibold text-gray-700 mb-2">
                Fiscal year *
              </Label>
              <select
                id="fiscalYear"
                value={new Date().getFullYear()}
                onChange={(e) => setFormData({ ...formData
                })}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() + i - 1;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700 mb-2">
                  Start date *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={ ""}
                  onChange={(e) => setFormData({ ...formData
                })}
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700 mb-2">
                  End date *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={ ""}
                  onChange={(e) => setFormData({ ...formData
                 })}
                  className="h-12"
                />
              </div>
            </div>

            {/* Alert Threshold */}
            <div>
              <Label htmlFor="alertThreshold" className="text-sm font-semibold text-gray-700 mb-2">
                Alert threshold (%)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="alertThreshold"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.alertThreshold || 80}
                  onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
                  className="h-12"
                  placeholder="80"
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                You'll be notified when spending reaches this percentage
              </p>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700 mb-2">
                Category
              </Label>
              <select
                id="category"
                value={ ""}
                onChange={(e) => setFormData({ ...formData })}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Preventive">Preventive Maintenance</option>
                <option value="Corrective">Corrective Maintenance</option>
                <option value="Emergency">Emergency Repairs</option>
                <option value="Improvement">Property Improvement</option>
                <option value="Cleaning">Cleaning & Janitorial</option>
                <option value="Security">Security & Safety</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2">
                Description
                <span className="text-xs text-gray-400 ml-2">(optional)</span>
              </Label>
              <textarea
                id="description"
                value={""}
                onChange={(e) => setFormData({ ...formData })}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent resize-none"
                placeholder="Add any notes about this budget..."
              />
            </div>

            {/* Auto-renew checkbox */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="autoRenew"
                checked={false}
                onChange={(e) => setFormData({ ...formData })}
                className="w-4 h-4 text-[#635bff] border-gray-300 rounded focus:ring-[#635bff]"
              />
              <label htmlFor="autoRenew" className="text-sm text-gray-600">
                Automatically renew this budget next year
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <Button
            onClick={closeCreateDrawer}
            variant="outline"
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={false}
            className="px-6 bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
          >
            Create budget
          </Button>
        </div>
      </div>
    </>
  );
};