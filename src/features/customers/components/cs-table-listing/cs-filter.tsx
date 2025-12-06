"use client";

import { Input } from "@/shared/components/shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Button } from "@/shared/components/shadcnui/button";
import { Search, X } from "lucide-react";
import { useCustomerStore } from "../../stores/customer.store";
import { customerTypeLabels } from "../../utils/customer.utils";
import { Badge } from "@/shared/components/shadcnui/badge";

export function CustomersFilters() {
  const { filters, setFilters, resetFilters } = useCustomerStore();

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handleTypeChange = (value: string) => {
    if (value === "all") {
      const { type, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, type: [Number(value)] });
    }
  };

  const handlePropertyGroupChange = (value: string) => {
    if (value === "all") {
      const { propertyGroupId, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, propertyGroupId: value });
    }
  };

  const handleCommercialChange = (value: string) => {
    if (value === "all") {
      const { commercialId, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, commercialId: value });
    }
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key as keyof typeof filters]
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, référence ou SIREN..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Type Filter */}
        <Select
          value={filters.type?.[0]?.toString() || "all"}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Type de client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {Object.entries(customerTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Property Group Filter */}
        <Select
          value={filters.propertyGroupId || "all"}
          onValueChange={handlePropertyGroupChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Groupe immobilier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les groupes</SelectItem>
            {/* TODO: Charger depuis l'API */}
            <SelectItem value="1">Groupe Immobilier Paris</SelectItem>
            <SelectItem value="2">Syndic Lyon Centre</SelectItem>
          </SelectContent>
        </Select>

        {/* Commercial Filter */}
        <Select
          value={filters.commercialId || "all"}
          onValueChange={handleCommercialChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Commercial" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les commerciaux</SelectItem>
            {/* TODO: Charger depuis l'API */}
            <SelectItem value="comm-1">Sophie Bernard</SelectItem>
            <SelectItem value="comm-2">Jean Martin</SelectItem>
            <SelectItem value="comm-3">Luc Dubois</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={resetFilters} size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Recherche: {filters.search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSearchChange("")}
              />
            </Badge>
          )}

          {filters.type && filters.type.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Type: {customerTypeLabels[filters.type[0]!]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTypeChange("all")}
              />
            </Badge>
          )}

          {filters.propertyGroupId && (
            <Badge variant="secondary" className="gap-1">
              Groupe immobilier
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handlePropertyGroupChange("all")}
              />
            </Badge>
          )}

          {filters.commercialId && (
            <Badge variant="secondary" className="gap-1">
              Commercial
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCommercialChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}