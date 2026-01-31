// src/features/sites/components/advanced-filters-sidebar.tsx

"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Separator } from "@/shared/components/shadcnui/separator";
import { ScrollArea } from "@/shared/components/shadcnui/scroll-area";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Label } from "@/shared/components/shadcnui/label";
import { Slider } from "@/shared/components/shadcnui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/shadcnui/collapsible";
import {
  Building,
  MapPin,
  Users,
  Calendar,
  Maximize,
  ChevronDown,
  Star,
  Clock,
  Filter,
  X,
  Save,
  TrendingUp,
} from "lucide-react";

export interface AdvancedFilters {
  types: string[];
  cities: string[];
  customers: string[];
  commercials: string[];
  yearRange: [number, number];
  areaRange: [number, number];
  unitsRange: [number, number];
  hasGPS: boolean | null;
  favorites: boolean;
}

interface AdvancedFiltersSidebarProps {
  filters: AdvancedFilters;
  onChange: (filters: AdvancedFilters) => void;
  availableOptions: {
    types: Array<{ value: string; label: string; count: number }>;
    cities: Array<{ value: string; label: string; count: number }>;
    customers: Array<{ value: string; label: string; count: number }>;
    commercials: Array<{ value: string; label: string; count: number }>;
  };
}

export function AdvancedFiltersSidebar({
  filters,
  onChange,
  availableOptions,
}: AdvancedFiltersSidebarProps) {
  const [savedViews, setSavedViews] = useState([
    { id: "1", name: "Mes favoris", icon: Star, count: 12 },
    { id: "2", name: "Récemment modifiés", icon: Clock, count: 8 },
    { id: "3", name: "Forte occupation", icon: TrendingUp, count: 23 },
  ]);

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

  const handleReset = () => {
    onChange({
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
  };

  const toggleFilter = (key: keyof AdvancedFilters, value: string) => {
    const currentValues = filters[key] as string[];
    onChange({
      ...filters,
      [key]: currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value],
    });
  };

  return (
    <div className="w-80 border-r bg-muted/30 backdrop-blur-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Filtres</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="default" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Effacer
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Save className="h-3.5 w-3.5 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Vues sauvegardées */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Vues rapides
            </h3>
            <div className="space-y-1">
              {savedViews.map((view) => (
                <button
                  key={view.id}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  <div className="flex items-center gap-2">
                    <view.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{view.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {view.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Type de site */}
          <FilterSection
            title="Type de site"
            icon={Building}
            defaultOpen={filters.types.length > 0}
          >
            <div className="space-y-2">
              {availableOptions.types.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${option.value}`}
                      checked={filters.types.includes(option.value)}
                      onCheckedChange={() => toggleFilter("types", option.value)}
                    />
                    <Label
                      htmlFor={`type-${option.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Ville */}
          <FilterSection
            title="Ville"
            icon={MapPin}
            defaultOpen={filters.cities.length > 0}
          >
            <div className="space-y-2">
              {availableOptions.cities.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`city-${option.value}`}
                      checked={filters.cities.includes(option.value)}
                      onCheckedChange={() => toggleFilter("cities", option.value)}
                    />
                    <Label
                      htmlFor={`city-${option.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Clients */}
          <FilterSection
            title="Clients"
            icon={Users}
            defaultOpen={filters.customers.length > 0}
          >
            <div className="space-y-2">
              {availableOptions.customers.slice(0, 10).map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`customer-${option.value}`}
                      checked={filters.customers.includes(option.value)}
                      onCheckedChange={() => toggleFilter("customers", option.value)}
                    />
                    <Label
                      htmlFor={`customer-${option.value}`}
                      className="text-sm font-normal cursor-pointer truncate"
                    >
                      {option.label}
                    </Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Année de construction */}
          <FilterSection
            title="Année de construction"
            icon={Calendar}
            defaultOpen={
              filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2100
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">De</span>
                <span className="font-medium">{filters.yearRange[0]}</span>
              </div>
              <Slider
                min={1900}
                max={2100}
                step={1}
                value={filters.yearRange}
                onValueChange={(value) =>
                  onChange({ ...filters, yearRange: value as [number, number] })
                }
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">À</span>
                <span className="font-medium">{filters.yearRange[1]}</span>
              </div>
            </div>
          </FilterSection>

          {/* Surface */}
          <FilterSection
            title="Surface (m²)"
            icon={Maximize}
            defaultOpen={
              filters.areaRange[0] !== 0 || filters.areaRange[1] !== 100000
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Min</span>
                <span className="font-medium">
                  {filters.areaRange[0].toLocaleString()} m²
                </span>
              </div>
              <Slider
                min={0}
                max={100000}
                step={1000}
                value={filters.areaRange}
                onValueChange={(value) =>
                  onChange({ ...filters, areaRange: value as [number, number] })
                }
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Max</span>
                <span className="font-medium">
                  {filters.areaRange[1].toLocaleString()} m²
                </span>
              </div>
            </div>
          </FilterSection>
        </div>
      </ScrollArea>
    </div>
  );
}

// Helper component
function FilterSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full group">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">{children}</CollapsibleContent>
    </Collapsible>
  );
}