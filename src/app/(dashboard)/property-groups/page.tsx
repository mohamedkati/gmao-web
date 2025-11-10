// src/app/(dashboard)/property-groups/page.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import { Plus, Download, Upload, RefreshCw } from "lucide-react";
import { PropertyGroupsTable } from "@/features/property-groups/components/property-groups-table";
import { PropertyGroupsFilters } from "@/features/property-groups/components/property-groups-filter";
import { PropertyGroupStatsCards } from "@/features/property-groups/components/property-group-stats-cards";
import { PropertyGroupDrawer } from "@/features/property-groups/components/property-group-drawer";
import { usePropertyGroups } from "@/features/property-groups/hooks/index";
import { usePropertyGroupStore } from "@/features/property-groups/store/property-group.store";

export default function PropertyGroupsPage() {
  const { openDrawer, filters } = usePropertyGroupStore();
  const { data: propertyGroups, isLoading, refetch } = usePropertyGroups(filters);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export data");
  };

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log("Import data");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groupes Immobiliers</h1>
          <p className="text-muted-foreground">
            Gérez vos groupes de clients et leurs propriétés
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
          <Button onClick={() => openDrawer("create")}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau groupe
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <PropertyGroupStatsCards />

      {/* Filters */}
      <PropertyGroupsFilters />

      {/* Table */}
      <PropertyGroupsTable data={propertyGroups || []} isLoading={isLoading} />

      {/* Drawer */}
      <PropertyGroupDrawer />
    </div>
  );
}