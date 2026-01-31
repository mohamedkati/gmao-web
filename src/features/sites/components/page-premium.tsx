// src/app/(dashboard)/sites/page-ultra-premium.tsx

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSites } from "@/features/sites/hooks";
import { Button } from "@/shared/components/shadcnui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/shadcnui/sheet";
import {
  Building,
  Plus,
  SlidersHorizontal,
  X,
  Download,
  Share2,
  Sparkles,
} from "lucide-react";
import { ViewMode, ViewModeToggle } from "./views/view-mode-toggle";
import { AdvancedFilters, AdvancedFiltersSidebar } from "./search/advanced-filters-sidebar";
import { PremiumStats } from "./views/stats-premium";
import { AdvancedSearchBar } from "./search/advanced-search-bar";
import { PremiumCardsGrid } from "./views/premium-cards-grid";
import { PremiumSitesTable } from "./views/premium-sites-table";
import { PremiumPagination } from "./views/premium-pagination";
import { SkeletonLoader } from "@/shared/components";

export default function SitesPageUltraPremium() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Filtres avancés
  const [filters, setFilters] = useState<AdvancedFilters>({
    types: [],
    cities: [],
    customers: [],
    commercials: [],
    yearRange: [1900, 2100],
    areaRange: [0, 100000],
    unitsRange: [0, 1000],
    hasGPS: null,
    favorites: false,
  });

  //  Appel API avec React Query
  const { data, isLoading, error } = useSites({
    search: searchQuery,
    page: currentPage,
    pageSize: pageSize,
    // Convertir les filtres en paramètres API
    type: filters.types.length > 0 ? filters.types[0] : undefined,
    city: filters.cities.length > 0 ? filters.cities[0] : undefined,
    customerId: filters.customers.length > 0 ? filters.customers[0] : undefined,
  });
  const sites = data?.data || [];
  const totalItems = data?.totalRecords || 0;
  const totalPages = data?.totalPages || 1;

  // Responsive: Hide sidebar on MD screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowFilters(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Options disponibles pour les filtres (calculés côté client pour l'instant)
  const availableOptions = useMemo(() => {
    const typeCounts = new Map<string, number>();
    const cityCounts = new Map<string, number>();
    const customerCounts = new Map<string, number>();
    const commercialCounts = new Map<string, number>();

    sites.forEach((site) => {
      const type = String(site.type);
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);

      const city = site.address.city;
      cityCounts.set(city, (cityCounts.get(city) || 0) + 1);

      if (site.customer) {
        const customer = site.customer.companyName;
        customerCounts.set(customer, (customerCounts.get(customer) || 0) + 1);
      }

      if (site.commercial) {
        const commercial = `${site.commercial.firstName} ${site.commercial.lastName}`;
        commercialCounts.set(commercial, (commercialCounts.get(commercial) || 0) + 1);
      }
    });

    return {
      types: [
        { value: "1", label: "🏢 Résidentiel", count: typeCounts.get("1") || 0 },
        { value: "2", label: "🏪 Commercial", count: typeCounts.get("2") || 0 },
        { value: "3", label: "🏗️ Mixte", count: typeCounts.get("3") || 0 },
        { value: "5", label: "🏢 Bureau", count: typeCounts.get("5") || 0 },
        { value: "8", label: "🏨 Hôtel", count: typeCounts.get("8") || 0 },
      ].filter((t) => t.count > 0),
      cities: Array.from(cityCounts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count),
      customers: Array.from(customerCounts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count),
      commercials: Array.from(commercialCounts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count),
    };
  }, [sites]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  }, [recentSearches]);

  const activeFiltersCount =
    filters.types.length +
    filters.cities.length +
    filters.customers.length +
    filters.commercials.length +
    (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2100 ? 1 : 0) +
    (filters.areaRange[0] !== 0 || filters.areaRange[1] !== 100000 ? 1 : 0) +
    (filters.unitsRange[0] !== 0 || filters.unitsRange[1] !== 1000 ? 1 : 0) +
    (filters.hasGPS !== null ? 1 : 0) +
    (filters.favorites ? 1 : 0);

  // 🔥 Gestion des erreurs
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <Building className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
        <p className="text-muted-foreground mb-4">
          Impossible de charger les sites. Veuillez réessayer.
        </p>
        <Button onClick={() => window.location.reload()}>
          Recharger la page
        </Button>
      </div>
    );
  }

  return (
    //h-screen
    <div className="flex  overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Sidebar Desktop */}
      {showFilters && (
        <div className="hidden lg:block">
          <AdvancedFiltersSidebar
            filters={filters}
            onChange={setFilters}
            availableOptions={availableOptions}
          />
        </div>
      )}

      {/* Sidebar Mobile/Tablet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden fixed bottom-6 left-6 z-50 shadow-2xl backdrop-blur-xl bg-background/80 border-primary/20"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtres
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <AdvancedFiltersSidebar
            filters={filters}
            onChange={setFilters}
            availableOptions={availableOptions}
          />
        </SheetContent>
      </Sheet>

      {/* Contenu Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header avec effet glassmorphism */}
        <div className="border-b bg-background/60 backdrop-blur-2xl sticky top-0 z-40">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />

          <div className="relative p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Animated Icon */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity" />
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <Building className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
                    Sites
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
                    {totalItems} site{totalItems > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden lg:flex gap-2 backdrop-blur-sm bg-background/50"
                >
                  {showFilters ? (
                    <>
                      <X className="h-4 w-4" />
                      <span className="hidden xl:inline">Masquer</span>
                    </>
                  ) : (
                    <>
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden xl:inline">Filtres</span>
                      {activeFiltersCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-primary text-primary-foreground rounded text-xs">
                          {activeFiltersCount}
                        </span>
                      )}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="backdrop-blur-sm bg-background/50"
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="backdrop-blur-sm bg-background/50"
                >
                  <Share2 className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Partager</span>
                </Button>
                <Button onClick={() => router.push("/sites/new")} size="sm" className="shadow-lg">
                  <Plus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Nouveau</span>
                </Button>
              </div>
            </div>

            {/* Stats - Responsive */}
            <div className="hidden md:block">
              <PremiumStats sites={sites} />
            </div>

            {/* Search + View Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex-1">
                <AdvancedSearchBar
                  onSearch={handleSearch}
                  onSelectSite={(site) => router.push(`/sites/${site.id}`)}
                  sites={sites}
                  recentSearches={recentSearches}
                />
              </div>
              <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            {viewMode === "cards" ? (
              isLoading ? (
                <SkeletonLoader type="card" count={8} />
              ) :
                <PremiumCardsGrid
                  sites={sites}
                  selectedIds={selectedSites}
                  onSelect={setSelectedSites}
                />
            ) : (
              <PremiumSitesTable sites={sites} isLoading={isLoading} />
            )}

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="mt-6">
                <PremiumPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={totalItems}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button Mobile */}
      <Button
        size="lg"
        className="lg:hidden fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl"
        onClick={() => router.push("/sites/new")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}