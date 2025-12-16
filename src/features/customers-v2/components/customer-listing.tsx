// features/customers/components/CustomerListContent.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, TrendingUp, FileText, DollarSign, Plus, Search, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/shared/components/data-table/data-table";
import { StatsCard } from "@/shared/components/stripe/stats-card";
import { StatusBadge } from "@/shared/components/stripe/status-badge";
import { StripeAvatar } from "@/shared/components/stripe/stripe-avatar";
import { Button } from "@/shared/components/ui/button";
import { CustomerCreateDrawer } from "./customer-create-drawer";
import { useCustomerStore } from "../stores/useCustomerStore";
import { useCustomers } from "../hooks/user-customers.query";
import { Customer } from "../types/customer.types";

export const CustomerListContent: React.FC = () => {
  const router = useRouter();
  const { openCreateDrawer } = useCustomerStore();
  const { data: customers, isLoading } = useCustomers();

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "companyName",
        header: "CUSTOMER",
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div className="flex items-center gap-3 py-2">
              <StripeAvatar 
                name={customer.companyName || "Unknown"} 
                className="bg-blue-50 text-blue-600"
              />
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {customer.companyName}
                </p>
                <p className="text-xs text-gray-400">
                  ID: {customer.id}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        cell: ({ getValue }) => (
          <p className="text-sm text-gray-600">{getValue() as string || "N/A"}</p>
        ),
      },
      {
        accessorKey: "phoneNumber",
        header: "PHONE",
        cell: ({ getValue }) => (
          <p className="text-sm text-gray-600">{getValue() as string || "N/A"}</p>
        ),
      },
      {
        id: "contract",
        header: "CONTRACT",
        cell: () => (
          <p className="text-sm font-medium text-gray-900">€3,450/mo</p>
        ),
      },
      {
        id: "status",
        header: "STATUS",
        cell: () => <StatusBadge status="active" />,
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              // Actions menu
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Customers</h1>
                <p className="text-sm text-gray-500">Manage your customer database and relationships</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg">
                  ⬇️ Export
                </Button>
                <Button
                  onClick={openCreateDrawer}
                  size="lg"
                  className="bg-gradient-to-r from-[#635bff] to-[#7a73ff] hover:shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add customer
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Filters Bar */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
                />
              </div>
              <Button variant="outline">Status ▼</Button>
              <Button variant="outline">Type ▼</Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={Building2}
              iconBgColor="bg-[#e0d9ff] text-[#635bff]"
              label="TOTAL CUSTOMERS"
              value={customers?.length || 0}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard
              icon={FileText}
              iconBgColor="bg-green-50 text-green-600"
              label="ACTIVE CONTRACTS"
              value="892"
              trend={{ value: 8.2, isPositive: true }}
            />
            <StatsCard
              icon={DollarSign}
              iconBgColor="bg-orange-50 text-orange-500"
              label="REVENUE (MTD)"
              value="€45.2K"
              trend={{ value: 2.1, isPositive: false }}
            />
            <StatsCard
              icon={TrendingUp}
              iconBgColor="bg-blue-50 text-blue-600"
              label="AVG. CONTRACT VALUE"
              value="€2,450"
              trend={{ value: 5.8, isPositive: true }}
            />
          </div>

          {/* Table avec VOTRE DataTable */}
          <DataTable
            columns={columns}
            data={customers || []}
            isLoading={isLoading}
            onRowClick={(row) => router.push(`/customers/${row.id}`)}
          />
        </div>
      </div>

      {/* Drawer */}
      <CustomerCreateDrawer />
    </>
  );
};