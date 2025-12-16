// features/customers/components/CustomerDetailContent.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Edit, MoreVertical } from "lucide-react";
import { TabNavigation, Tab } from "@/shared/components/stripe/tab-navigation";
import { StatusBadge } from "@/shared/components/stripe/status-badge";
import { StripeAvatar } from "@/shared/components/stripe/stripe-avatar";
import { Button } from "@/shared/components/ui/button";
import { useCustomer } from "../hooks/user-customers.query";
import { OverviewTab } from "./tabs/overview-tab";
import { ContactsTab } from "./tabs/contacts-tab";
import { BudgetsTab } from "./tabs/budgets-tab";

interface CustomerDetailContentProps {
  customerId: string;
}

export const CustomerDetailContent: React.FC<CustomerDetailContentProps> = ({ customerId }) => {
  const router = useRouter();
  const { data: customer, isLoading } = useCustomer(customerId);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "contacts", label: "Contacts", count: 3, countColor: "bg-green-50 text-green-600" },
    { id: "budgets", label: "Budgets", count: 5, countColor: "bg-[#e0d9ff] text-[#635bff]" },
    { id: "properties", label: "Properties", count: 8, countColor: "bg-[#e0d9ff] text-[#635bff]" },
    { id: "work-orders", label: "Work Orders", count: 12, countColor: "bg-orange-50 text-orange-500" },
    { id: "invoices", label: "Invoices" },
    { id: "documents", label: "Documents" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <button
              onClick={() => router.push("/customers")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              Customers
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{customer.companyName}</span>
          </div>

          {/* Customer Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StripeAvatar 
                name={customer.companyName || "Unknown"} 
                size="lg"
                className="bg-blue-50 text-blue-600"
              />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{customer.companyName}</h1>
                  <StatusBadge status="active" />
                  <div className="px-3 py-1 bg-[#e0d9ff] rounded-full">
                    <span className="text-xs font-semibold text-[#635bff]">💎 Premium</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {customer.companyName} • ID: {customer.id}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button 
                onClick={() => router.push(`/customers/${customerId}/edit`)}
                className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {activeTab === "overview" && <OverviewTab customer={customer} />}
        {activeTab === "contacts" && <ContactsTab customerId={customer.id} />}
        {activeTab === "budgets" && <BudgetsTab customerId={customer.id} />}
        {activeTab === "work-orders" && <div className="text-center py-12 text-gray-500">Work Orders - Coming soon</div>}
        {activeTab === "invoices" && <div className="text-center py-12 text-gray-500">Invoices - Coming soon</div>}
        {activeTab === "documents" && <div className="text-center py-12 text-gray-500">Documents - Coming soon</div>}
        {activeTab === "activity" && <div className="text-center py-12 text-gray-500">Activity - Coming soon</div>}
      </div>
    </div>
  );
};