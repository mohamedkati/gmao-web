"use client";

import { useState, useEffect } from "react";
import { useCustomers, useDeleteCustomer } from "@/features/customers-v2/hooks/user-customers.query";
import { CustomerListItem } from "../../types/customer.types";
import { CustomerQueryParams } from "@/features/customers-v2/types/customer.types";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { CustomerCard } from "@/features/customers-v2/components/listing/customer-card";
import { CustomersTableView } from "@/features/customers-v2/components/listing/customers-table-view";
import { CustomerDetailsPanel } from "./customer-details-panel";
import { AdvancedFilters } from "@/features/customers-v2/components/listing/advanced-filters";
import { ExportMenu } from "@/features/customers-v2/components/listing/export-menu";
import { BulkActionsBar } from "@/shared/components/data-table/bulk-actions-bar";
import { ViewSwitcher } from "@/shared/components/data-table/view-switcher";
import { Pagination } from "@/shared/components/data-table/pagination";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { useTableSelection } from "@/shared/hooks/use-table-selection";
import { useQueryParams } from "@/shared/hooks/use-query-params";
import {
  Plus,
  Search,
  Users,
  Building,
  TrendingUp,
  DollarSign,
  Filter,
} from "lucide-react";
import { Can } from "@/shared/components/auth/can";
import { useRouter } from "next/navigation";
import { SkeletonLoader } from "@/shared/components";

type ViewMode = "cards" | "list" | "table";

export default function CustomersListingPage() {
  const router = useRouter();

  // Lire les params depuis l'URL
  const { params, setParams } = useQueryParams<CustomerQueryParams>({ arrayKeys: ["types"], });

  // État depuis URL ou valeurs par défaut
  const queryParams: CustomerQueryParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10,
    search: params.search || "",
    types: params.types || [],
    active: params.active,
    propertyGroupId: params.propertyGroupId,
    commercialId: params.commercialId,
    city: params.city,
    sortBy: params.sortBy || "companyName",
    sortOrder: params.sortOrder || "asc",
  };

  // View mode (pas dans l'URL)
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  // Details panel state
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Data fetching
  const { data: pagedResult, isLoading, isFetching } = useCustomers(queryParams);
  // const { data: stats } = useCustomerStats();
  const deleteMutation = useDeleteCustomer();

  // Selection state
  const {
    selectedIds,
    selectedItems,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggleSelection,
    toggleAll,
    clearSelection,
    selectedCount,
  } = useTableSelection<CustomerListItem>(pagedResult?.data || []);

  // Mettre à jour les params dans l'URL
  const updateParams = (newParams: Partial<CustomerQueryParams>, resetPage = false) => {
    setParams({
      ...newParams,
      page: resetPage ? 1 : newParams.page,
    }, { replace: true });
  };

  // Handlers
  const handleSearch = (value: string) => {
    updateParams({ search: value }, true);
  };

  const handleFiltersChange = (filters: {
    types?: number[];
    active?: boolean;
    propertyGroupId?: string;
    commercialId?: string;
    city?: string;
  }) => {
    updateParams(filters, true);
  };

  const handleClearFilters = () => {
    updateParams({
      search: "",
      types: [],
      active: undefined,
      propertyGroupId: undefined,
      commercialId: undefined,
      city: undefined,
    }, true);
  };

  const handleSort = (column: string) => {
    const newSortOrder =
      queryParams.sortBy === column && queryParams.sortOrder === "asc"
        ? "desc"
        : "asc";

    updateParams({
      sortBy: column,
      sortOrder: newSortOrder,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateParams({ pageSize }, true);
  };

  const handleViewCustomer = (customer: CustomerListItem) => {
    router.push("/customers-v2/" + customer.id);

    return;
    setSelectedCustomerId(customer.id);
    setIsPanelOpen(true);
  };

  const handleEditCustomer = (customer: CustomerListItem) => {
    router.push(`/customers-v2/${customer.id}/edit`);
  };

  const handleDeleteCustomer = (customer: CustomerListItem) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${customer.companyName} ?`)) {
      deleteMutation.mutate(customer.id);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedCount} client(s) ?`)) {
      // TODO: Implement bulk delete
      console.log("Bulk delete:", selectedIds);
      clearSelection();
    }
  };

  const handleBulkExport = () => {
    console.log("Bulk export:", selectedItems);
  };

  // Clear selection when page changes
  useEffect(() => {
    clearSelection();
  }, [queryParams.page]);
  // Loading state
  if (isLoading && !pagedResult) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const customers = pagedResult?.data || [];
  const hasFilters = queryParams.search || queryParams.types && queryParams.types.length > 0 ||
    queryParams.active !== undefined || queryParams.propertyGroupId ||
    queryParams.commercialId || queryParams.city;
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Gérez vos {pagedResult?.totalRecords || 0} clients
          </p>
        </div>
        <Can resource="customers" action="create">
          <Button onClick={() => router.push("/customers-v2/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </Can>
      </div>

      {/* Stats Cards */}
      {(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{15}</div>
              <p className="text-xs text-muted-foreground">
                Tous statuts confondus
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sites</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.reduce((sum, c) => sum + c.sitesCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Sites gérés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Budget total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {1500}€
              </div>
              <p className="text-xs text-muted-foreground">
                Budgets maintenance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Croissance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                vs. année dernière
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par nom, référence, ville..."
              value={queryParams.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* View Switcher */}
          <ViewSwitcher view={viewMode} onViewChange={setViewMode} />

          {/* Export */}
          <Can resource="customers" action="export">
            <ExportMenu data={customers} filename="clients" />
          </Can>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          types={queryParams.types}
          active={queryParams.active}
          propertyGroupId={queryParams.propertyGroupId}
          commercialId={queryParams.commercialId}
          city={queryParams.city}
          onFiltersChange={handleFiltersChange}
          propertyGroups={[]} // TODO: Fetch from API
          commercials={[]} // TODO: Fetch from API
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {pagedResult?.totalRecords || 0} résultat{(pagedResult?.totalRecords || 0) > 1 ? "s" : ""}
          {hasFilters && <> (filtrés)</>}
        </p>
      </div>

      {/* Content */}
      {
        isFetching ? (<SkeletonLoader count={5} type="card" />) :
          customers.length === 0 ? (
            <EmptyState
              icon={hasFilters ? Filter : Users}
              title={hasFilters ? "Aucun résultat" : "Aucun client"}
              description={
                hasFilters
                  ? "Aucun client ne correspond à vos critères de recherche."
                  : "Commencez par créer votre premier client."
              }
              action={{
                label: hasFilters ? "Réinitialiser les filtres" : "Créer un client",
                onClick: hasFilters ? handleClearFilters : () => router.push("/customers/new"),
              }}
            />
          ) : (
            <>
              {/* Cards View */}
              {viewMode === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customers.map((customer) => (
                    <CustomerCard
                      key={customer.id}
                      customer={customer}
                      isSelected={isSelected(customer.id)}
                      onSelect={toggleSelection}
                      onView={handleViewCustomer}
                      onEdit={handleEditCustomer}
                      onDelete={handleDeleteCustomer}
                      showCheckbox={selectedCount > 0}
                    />
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-3">
                  {customers.map((customer) => (
                    <CustomerCard
                      key={customer.id}
                      customer={customer}
                      isSelected={isSelected(customer.id)}
                      onSelect={toggleSelection}
                      onView={handleViewCustomer}
                      onEdit={handleEditCustomer}
                      onDelete={handleDeleteCustomer}
                      showCheckbox={selectedCount > 0}
                    />
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === "table" && (
                <CustomersTableView
                  customers={customers}
                  selectedIds={selectedIds}
                  onSelectAll={toggleAll}
                  onSelect={toggleSelection}
                  onView={handleViewCustomer}
                  onEdit={handleEditCustomer}
                  onDelete={handleDeleteCustomer}
                  isAllSelected={isAllSelected}
                  isIndeterminate={isIndeterminate}
                  onSort={handleSort}
                  sortColumn={queryParams.sortBy}
                  sortDirection={queryParams.sortOrder}
                />
              )}

              {/* Pagination */}
              {pagedResult && pagedResult.totalPages > 1 && (
                <Pagination
                  currentPage={pagedResult.pageNumber}
                  totalPages={pagedResult.totalPages}
                  pageSize={pagedResult.pageSize}
                  totalCount={pagedResult.totalRecords}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              )}
            </>
          )}

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedCount}
        onClear={clearSelection}
        onDelete={handleBulkDelete}
        onExport={handleBulkExport}
      />

      {/* Details Panel */}
      <CustomerDetailsPanel
        customerId={selectedCustomerId}
        isOpen={isPanelOpen}
        onClose={() => {
          setIsPanelOpen(false);
          setSelectedCustomerId(null);
        }}
        onEdit={(id) => router.push(`/customers/${id}/edit`)}
      />
    </div>
  );
}