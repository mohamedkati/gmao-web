// src/app/(dashboard)/sites/page.tsx

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMockSites } from "@/features/sites/data/mock-data";
import { AdvancedSearchBar } from "@/features/sites/components/search/advanced-search-bar";
import { AdvancedFiltersSidebar, type AdvancedFilters } from "@/features/sites/components/search/advanced-filters-sidebar";
import { PremiumSitesTable } from "@/features/sites/components/views/premium-sites-table";
import { PremiumPagination } from "@/features/sites/components/views/premium-pagination";
import { PremiumStats } from "@/features/sites/components/views/stats-premium";
import { QuickActionsToolbar } from "@/features/sites/components/views/quick-actions-toolbar";
import { Button } from "@/shared/components/shadcnui/button";
import {
  Building,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Site } from "@/features/sites/types/site.types";
import SitesPageUltraPremium from "@/features/sites/components/page-premium";

// export default function SitesPagePremium() {
//   const router = useRouter();
//   const { data, isLoading } = useMockSites();

//   const sites = data?.data || [];
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [showFilters, setShowFilters] = useState(true);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(20);

//   // Filtres avancés
//   const [filters, setFilters] = useState<AdvancedFilters>({
//     types: [],
//     cities: [],
//     customers: [],
//     commercials: [],
//     yearRange: [1900, 2100],
//     areaRange: [0, 100000],
//     unitsRange: [0, 1000],
//     hasGPS: null,
//     favorites: false,
//   });

//   // Options disponibles pour les filtres
//   const availableOptions = useMemo(() => {
//     const typeCounts = new Map<string, number>();
//     const cityCounts = new Map<string, number>();
//     const customerCounts = new Map<string, number>();
//     const commercialCounts = new Map<string, number>();

//     sites.forEach((site) => {
//       // Types
//       const type = String(site.type);
//       typeCounts.set(type, (typeCounts.get(type) || 0) + 1);

//       // Villes
//       const city = site.address.city;
//       cityCounts.set(city, (cityCounts.get(city) || 0) + 1);

//       // Clients
//       if (site.customer) {
//         const customer = site.customer.companyName;
//         customerCounts.set(customer, (customerCounts.get(customer) || 0) + 1);
//       }

//       // Commerciaux
//       if (site.commercial) {
//         const commercial = `${site.commercial.firstName} ${site.commercial.lastName}`;
//         commercialCounts.set(commercial, (commercialCounts.get(commercial) || 0) + 1);
//       }
//     });

//     return {
//       types: [
//         { value: "1", label: "🏢 Résidentiel", count: typeCounts.get("1") || 0 },
//         { value: "2", label: "🏪 Commercial", count: typeCounts.get("2") || 0 },
//         { value: "3", label: "🏗️ Mixte", count: typeCounts.get("3") || 0 },
//         { value: "5", label: "🏢 Bureau", count: typeCounts.get("5") || 0 },
//         { value: "8", label: "🏨 Hôtel", count: typeCounts.get("8") || 0 },
//       ].filter((t) => t.count > 0),
//       cities: Array.from(cityCounts.entries())
//         .map(([value, count]) => ({ value, label: value, count }))
//         .sort((a, b) => b.count - a.count),
//       customers: Array.from(customerCounts.entries())
//         .map(([value, count]) => ({ value, label: value, count }))
//         .sort((a, b) => b.count - a.count),
//       commercials: Array.from(commercialCounts.entries())
//         .map(([value, count]) => ({ value, label: value, count }))
//         .sort((a, b) => b.count - a.count),
//     };
//   }, [sites]);

//   // Filtrer les sites
//   const filteredSites = useMemo(() => {
//     return sites.filter((site) => {
//       // Recherche
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase();
//         const matchesSearch =
//           site.name.toLowerCase().includes(query) ||
//           site.reference.toLowerCase().includes(query) ||
//           site.address.city.toLowerCase().includes(query) ||
//           site.address.postalCode.toLowerCase().includes(query) ||
//           site.customer?.companyName.toLowerCase().includes(query);

//         if (!matchesSearch) return false;
//       }

//       // Type
//       if (filters.types.length > 0 && !filters.types.includes(String(site.type))) {
//         return false;
//       }

//       // Ville
//       if (filters.cities.length > 0 && !filters.cities.includes(site.address.city)) {
//         return false;
//       }

//       // Client
//       if (
//         filters.customers.length > 0 &&
//         (!site.customer || !filters.customers.includes(site.customer.companyName))
//       ) {
//         return false;
//       }

//       // Commercial
//       if (filters.commercials.length > 0) {
//         const commercialName = site.commercial
//           ? `${site.commercial.firstName} ${site.commercial.lastName}`
//           : null;
//         if (!commercialName || !filters.commercials.includes(commercialName)) {
//           return false;
//         }
//       }

//       // Année
//       if (
//         site.buildingYear &&
//         (site.buildingYear < filters.yearRange[0] ||
//           site.buildingYear > filters.yearRange[1])
//       ) {
//         return false;
//       }

//       // Surface
//       if (
//         site.totalArea &&
//         (site.totalArea < filters.areaRange[0] ||
//           site.totalArea > filters.areaRange[1])
//       ) {
//         return false;
//       }

//       // Units
//       if (
//         site.unitsCount &&
//         (site.unitsCount < filters.unitsRange[0] ||
//           site.unitsCount > filters.unitsRange[1])
//       ) {
//         return false;
//       }

//       // GPS
//       if (filters.hasGPS === true && !site.coordinates) {
//         return false;
//       }
//       if (filters.hasGPS === false && site.coordinates) {
//         return false;
//       }

//       return true;
//     });
//   }, [sites, searchQuery, filters]);

//   // Pagination
//   const totalPages = Math.ceil(filteredSites.length / pageSize);
//   const paginatedSites = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     const end = start + pageSize;
//     return filteredSites.slice(start, end);
//   }, [filteredSites, currentPage, pageSize]);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, filters]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Ctrl/Cmd + K pour focus sur recherche
//       if ((e.ctrlKey || e.metaKey) && e.key === "k") {
//         e.preventDefault();
//         document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
//       }
//       // Ctrl/Cmd + B pour toggle sidebar
//       if ((e.ctrlKey || e.metaKey) && e.key === "b") {
//         e.preventDefault();
//         setShowFilters((prev) => !prev);
//       }
//       // Ctrl/Cmd + N pour nouveau site
//       if ((e.ctrlKey || e.metaKey) && e.key === "n") {
//         e.preventDefault();
//         router.push("/sites/new");
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [router]);

//   const handleSearch = useCallback((query: string) => {
//     setSearchQuery(query);
//     if (query && !recentSearches.includes(query)) {
//       setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
//     }
//   }, [recentSearches]);

//   const activeFiltersCount =
//     filters.types.length +
//     filters.cities.length +
//     filters.customers.length +
//     filters.commercials.length +
//     (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2100 ? 1 : 0) +
//     (filters.areaRange[0] !== 0 || filters.areaRange[1] !== 100000 ? 1 : 0) +
//     (filters.unitsRange[0] !== 0 || filters.unitsRange[1] !== 1000 ? 1 : 0) +
//     (filters.hasGPS !== null ? 1 : 0) +
//     (filters.favorites ? 1 : 0);

//   return (
//     <div className="flex h-screen overflow-hidden bg-background">
//       {/* Sidebar Filtres */}
//       {showFilters && (
//         <AdvancedFiltersSidebar
//           filters={filters}
//           onChange={setFilters}
//           availableOptions={availableOptions}
//         />
//       )}

//       {/* Contenu Principal */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="border-b bg-background/95 backdrop-blur-sm">
//           <div className="p-6 space-y-6">
//             {/* Title Row */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl blur-xl opacity-75 animate-pulse" />
//                   <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl">
//                     <Building className="h-7 w-7 text-primary" />
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold">Sites</h1>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {filteredSites.length} site{filteredSites.length > 1 ? "s" : ""}
//                     {filteredSites.length !== sites.length && ` sur ${sites.length}`}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="gap-2"
//                 >
//                   {showFilters ? (
//                     <>
//                       <X className="h-4 w-4" />
//                       Masquer filtres
//                     </>
//                   ) : (
//                     <>
//                       <SlidersHorizontal className="h-4 w-4" />
//                       Filtres
//                       {activeFiltersCount > 0 && (
//                         <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded text-xs">
//                           {activeFiltersCount}
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Button>
//                 <Button onClick={() => router.push("/sites/new")} size="lg">
//                   <Plus className="mr-2 h-5 w-5" />
//                   Nouveau site
//                 </Button>
//               </div>
//             </div>

//             {/* Stats */}
//             <PremiumStats sites={filteredSites} />

//             {/* Search Bar */}
//             <AdvancedSearchBar
//               onSearch={handleSearch}
//               onSelectSite={(site) => router.push(`/sites/${site.id}`)}
//               sites={sites}
//               recentSearches={recentSearches}
//             />

//             {/* Quick Actions Toolbar */}
//             <QuickActionsToolbar
//               selectedCount={0}
//               totalCount={filteredSites.length}
//               onExport={() => console.log("Export")}
//               onBulkEdit={() => console.log("Bulk edit")}
//               onBulkDelete={() => console.log("Bulk delete")}
//             />
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="p-6">
//             <PremiumSitesTable sites={paginatedSites} isLoading={isLoading} />

//             {/* Pagination */}
//             {filteredSites.length > 0 && (
//               <PremiumPagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 pageSize={pageSize}
//                 totalItems={filteredSites.length}
//                 onPageChange={setCurrentPage}
//                 onPageSizeChange={(size) => {
//                   setPageSize(size);
//                   setCurrentPage(1);
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function SitesPagePremium() {

  return <SitesPageUltraPremium />
}