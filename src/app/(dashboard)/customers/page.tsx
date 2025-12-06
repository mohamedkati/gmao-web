// src/app/(dashboard)/customers/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/shadcnui/button";
import { Plus, Download, Upload, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { CustomersTable } from "@/features/customers/components/cs-table-listing/cs-table";
import { CustomersFilters } from "@/features/customers/components/cs-table-listing/cs-filter";
import { CustomerStatsCards } from "@/features/customers/components/cs-table-listing/cs-states-card";
import { CustomerDrawer } from "@/features/customers/components//drawers/customer-drawer";
import { CustomerContactDrawer } from "@/features/customers/components/drawers/customer-contact-drawer";
import { CustomerBudgetDrawer } from "@/features/customers/components/drawers/customer-budget-drawer";
import { useCustomers } from "@/features/customers/hooks/user-customers.query";
import { useCustomerStore } from "@/features/customers/stores/customer.store";

export default function CustomersPage() {
  const router = useRouter();
  const { openDrawer, filters } = useCustomerStore();
  const { data: customers, isLoading, refetch } = useCustomers(filters);

  const handleExport = () => {
    console.log("Export data");
  };

  const handleImport = () => {
    console.log("Import data");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Gérez vos clients et leurs informations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>

          {/* Dropdown pour choisir le mode de création */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau client
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openDrawer("create")}>
                <span className="font-medium">Mode Drawer</span>
                <span className="text-xs text-muted-foreground block">
                  Création rapide (panneau latéral)
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/customers/new")}>
                <span className="font-medium">Mode Page</span>
                <span className="text-xs text-muted-foreground block">
                  Création complète (page dédiée)
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <CustomerStatsCards /> */}

      {/* Filters */}
      <CustomersFilters />

      {/* Table */}
      <CustomersTable data={customers || []} isLoading={isLoading} />

      {/* Drawers */}
      <CustomerDrawer />
      <CustomerContactDrawer />
      <CustomerBudgetDrawer />
    </div>
  );
}