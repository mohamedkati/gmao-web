// src/features/sites/components/sites-filters.tsx

"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Label } from "@/shared/components/shadcnui/label";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/shared/components/shadcnui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Slider } from "@/shared/components/shadcnui/slider";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { SiteType } from "../../types/site.types";

export interface SiteFilters {
  search: string;
  types: string[];
  cities: string[];
  customerIds: string[];
  commercialIds: string[];
  yearRange: [number, number];
  areaRange: [number, number];
}

interface SitesFiltersProps {
  filters: SiteFilters;
  onChange: (filters: SiteFilters) => void;
  availableCities?: string[];
}

const siteTypeOptions = [
  { value: "1", label: "🏢 Résidentiel" },
  { value: "2", label: "🏪 Commercial" },
  { value: "3", label: "🏗️ Mixte" },
  { value: "4", label: "🏭 Industriel" },
  { value: "5", label: "🏢 Bureau" },
  { value: "6", label: "📦 Entrepôt" },
  { value: "7", label: "🛒 Magasin" },
  { value: "8", label: "🏨 Hôtel" },
  { value: "9", label: "🏥 Hôpital" },
  { value: "10", label: "🏫 École" },
  { value: "11", label: "🏛️ Gouvernement" },
];

export function SitesFilters({
  filters,
  onChange,
  availableCities = [],
}: SitesFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [open, setOpen] = useState(false);

  const activeFiltersCount =
    localFilters.types.length +
    localFilters.cities.length +
    localFilters.customerIds.length +
    localFilters.commercialIds.length +
    (localFilters.yearRange[0] !== 1900 || localFilters.yearRange[1] !== 2100 ? 1 : 0) +
    (localFilters.areaRange[0] !== 0 || localFilters.areaRange[1] !== 100000 ? 1 : 0);

  const handleApply = () => {
    onChange(localFilters);
    setOpen(false);
  };

  const handleReset = () => {
    const resetFilters: SiteFilters = {
      search: "",
      types: [],
      cities: [],
      customerIds: [],
      commercialIds: [],
      yearRange: [1900, 2100],
      areaRange: [0, 100000],
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };

  const toggleType = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const removeFilter = (key: keyof SiteFilters, value?: string) => {
    if (key === "types" || key === "cities" || key === "customerIds" || key === "commercialIds") {
      setLocalFilters((prev) => ({
        ...prev,
        [key]: value ? prev[key].filter((v) => v !== value) : [],
      }));
      onChange({
        ...filters,
        [key]: value ? filters[key].filter((v: string) => v !== value) : [],
      });
    }
  };

  return (
    <div className="space-y-3">
      {/* Barre de filtres rapides */}
      <div className="flex items-center gap-2">
        {/* Filtres avancés button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtres avancés
              {activeFiltersCount > 0 && (
                <Badge
                  variant="default"
                  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtres avancés</SheetTitle>
              <SheetDescription>
                Affinez votre recherche avec les filtres ci-dessous
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Types de site */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Type de site</Label>
                <div className="flex flex-wrap gap-2">
                  {siteTypeOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant={
                        localFilters.types.includes(option.value)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => toggleType(option.value)}
                    >
                      {option.label}
                      {localFilters.types.includes(option.value) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Ville */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Ville</Label>
                <Select
                  value={localFilters.cities[0] || ""}
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      cities: value ? [value] : [],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Année de construction */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    Année de construction
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {localFilters.yearRange[0]} - {localFilters.yearRange[1]}
                  </span>
                </div>
                <Slider
                  min={1900}
                  max={2100}
                  step={1}
                  value={localFilters.yearRange}
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      yearRange: value as [number, number],
                    }))
                  }
                  className="w-full"
                />
              </div>

              {/* Surface */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    Surface (m²)
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {localFilters.areaRange[0].toLocaleString()} -{" "}
                    {localFilters.areaRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100000}
                  step={1000}
                  value={localFilters.areaRange}
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      areaRange: value as [number, number],
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>

            <SheetFooter className="gap-2">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Réinitialiser
              </Button>
              <Button onClick={handleApply} className="flex-1">
                Appliquer
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Reset all filters if any active */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Effacer tout
          </Button>
        )}
      </div>

      {/* Active filters badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {localFilters.types.map((type) => {
            const option = siteTypeOptions.find((o) => o.value === type);
            return (
              <Badge key={type} variant="secondary" className="gap-1">
                {option?.label}
                <button
                  onClick={() => removeFilter("types", type)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {localFilters.cities.map((city) => (
            <Badge key={city} variant="secondary" className="gap-1">
              📍 {city}
              <button
                onClick={() => removeFilter("cities", city)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}