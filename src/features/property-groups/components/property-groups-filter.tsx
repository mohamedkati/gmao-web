"use client";

import { Button } from "@/shared/components/shadcnui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Input } from "@/shared/components/shadcnui/input";
import { X, Search } from "lucide-react";
import { PropertyGroupType, PropertyGroupStatus, LegalForm } from "../types/property-group.types";
import {
  propertyGroupTypeLabels,
  propertyGroupStatusLabels,
  legalFormLabels,
} from "../utils/property-groups.utils";
import { usePropertyGroupStore } from "../store/property-group.store";
import { Badge } from "@/shared/components/shadcnui/badge";

export function PropertyGroupsFilters() {
  const { filters, setFilters, resetFilters } = usePropertyGroupStore();

  const hasActiveFilters =
    filters.search ||
    (filters.type && filters.type.length > 0) ||
    (filters.status && filters.status.length > 0) ||
    (filters.legalForm && filters.legalForm.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Type Filter */}
        <Select
          value={filters.type?.[0]?.toString() || "all"}
          onValueChange={(value) => {
            if (value === "all") {
              setFilters({ ...filters, type: undefined });
            } else {
              setFilters({ ...filters, type: [Number(value) as PropertyGroupType] });
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {Object.entries(propertyGroupTypeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status?.[0]?.toString() || "all"}
          onValueChange={(value) => {
            if (value === "all") {
              setFilters({ ...filters, status: undefined });
            } else {
              setFilters({ ...filters, status: [Number(value) as PropertyGroupStatus] });
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {Object.entries(propertyGroupStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Legal Form Filter */}
        <Select
          value={filters.legalForm?.[0]?.toString() || "all"}
          onValueChange={(value) => {
            if (value === "all") {
              setFilters({ ...filters, legalForm: undefined });
            } else {
              setFilters({ ...filters, legalForm: [Number(value) as LegalForm] });
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Forme juridique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les formes</SelectItem>
            {Object.entries(legalFormLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          {filters.search && (
            <Badge variant="secondary">
              Recherche: {filters.search}
              <button
                onClick={() => setFilters({ ...filters, search: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.type && filters.type.length > 0 && (
            <Badge variant="secondary">
              Type: {propertyGroupTypeLabels[filters.type[0]!]}
              <button
                onClick={() => setFilters({ ...filters, type: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.status && filters.status.length > 0 && (
            <Badge variant="secondary">
              Statut: {propertyGroupStatusLabels[filters.status[0]!]}
              <button
                onClick={() => setFilters({ ...filters, status: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.legalForm && filters.legalForm.length > 0 && (
            <Badge variant="secondary">
              Forme: {legalFormLabels[filters.legalForm[0]!]}
              <button
                onClick={() => setFilters({ ...filters, legalForm: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}