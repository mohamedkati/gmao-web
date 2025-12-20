"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/shadcnui/popover";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Label } from "@/shared/components/shadcnui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Filter, X } from "lucide-react";
import { Separator } from "@/shared/components/shadcnui/separator";
import { CustomerType } from "../../types/customer.types";

export interface FilterValue {
  id: string;
  label: string;
  value: any;
  displayValue: string;
}

interface AdvancedFiltersProps {
  // Filtres actifs
  types?: CustomerType[];
  active?: boolean;
  propertyGroupId?: string;
  commercialId?: string;
  city?: string;

  // Callbacks
  onFiltersChange: (filters: {
    types?: CustomerType[];
    active?: boolean;
    propertyGroupId?: string;
    commercialId?: string;
    city?: string;
  }) => void;

  // Options pour les selects
  propertyGroups?: Array<{ id: string; name: string }>;
  commercials?: Array<{ id: string; name: string }>;
}

export function AdvancedFilters({
  types = [],
  active,
  propertyGroupId,
  commercialId,
  city,
  onFiltersChange,
  propertyGroups = [],
  commercials = [],
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const customerTypes = [
    { label: "Gestionnaire immobilier", value: CustomerType.PropertyManager },
    { label: "Syndic de copropriété", value: CustomerType.Syndic },
    { label: "Entreprise", value: CustomerType.Corporate },
    { label: "Particulier", value: CustomerType.Individual },
    { label: "Administration publique", value: CustomerType.Government },
  ];

  const statusOptions = [
    { label: "Actif", value: true },
    { label: "Inactif", value: false },
  ];

  // Compter les filtres actifs
  const activeFiltersCount = [
    types.length > 0,
    active !== undefined,
    propertyGroupId,
    commercialId,
    city,
  ].filter(Boolean).length;

  // Obtenir les badges des filtres actifs
  const getActiveFilterBadges = () => {
    const badges: FilterValue[] = [];
    console.log(types);
    // Types
     types
      .forEach((type) => {
        const typeLabel = customerTypes.find((t) => t.value === type)?.label || "";
        badges.push({
          id: `type-${type}`,
          label: "Type",
          value: type,
          displayValue: typeLabel,
        });
      });

    // Statut
    if (active !== undefined) {
      badges.push({
        id: "active",
        label: "Statut",
        value: active,
        displayValue: active ? "Actif" : "Inactif",
      });
    }

    // Groupe immobilier
    if (propertyGroupId) {
      const group = propertyGroups.find((g) => g.id === propertyGroupId);
      if (group) {
        badges.push({
          id: "propertyGroupId",
          label: "Groupe",
          value: propertyGroupId,
          displayValue: group.name,
        });
      }
    }

    // Commercial
    if (commercialId) {
      const commercial = commercials.find((c) => c.id === commercialId);
      if (commercial) {
        badges.push({
          id: "commercialId",
          label: "Commercial",
          value: commercialId,
          displayValue: commercial.name,
        });
      }
    }

    // Ville
    if (city) {
      badges.push({
        id: "city",
        label: "Ville",
        value: city,
        displayValue: city,
      });
    }

    return badges;
  };

  const activeFilterBadges = getActiveFilterBadges();

  // Supprimer un filtre
  const removeFilter = (filterId: string) => {
    if (filterId.startsWith("type-")) {
      const typeValue = parseInt(filterId.replace("type-", ""));
      onFiltersChange({
        types: [...types.filter((t) => t !== typeValue)],
        active,
        propertyGroupId,
        commercialId,
        city,
      });
    } else if (filterId === "active") {
      onFiltersChange({
        types,
        active: undefined,
        propertyGroupId,
        commercialId,
        city,
      });
    } else if (filterId === "propertyGroupId") {
      onFiltersChange({
        types,
        active,
        propertyGroupId: undefined,
        commercialId,
        city,
      });
    } else if (filterId === "commercialId") {
      onFiltersChange({
        types,
        active,
        propertyGroupId,
        commercialId: undefined,
        city,
      });
    } else if (filterId === "city") {
      onFiltersChange({
        types,
        active,
        propertyGroupId,
        commercialId,
        city: undefined,
      });
    }
  };

  // Réinitialiser tous les filtres
  const clearAllFilters = () => {
    onFiltersChange({
      types: [],
      active: undefined,
      propertyGroupId: undefined,
      commercialId: undefined,
      city: undefined,
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Active filters chips */}
      {activeFilterBadges.map((filter) => (
        <Badge key={filter.id} variant="secondary" className="gap-1 pr-1 pl-3">
          <span className="text-xs">
            {filter.label}: <strong>{filter.displayValue}</strong>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 hover:bg-transparent p-0"
            onClick={() => removeFilter(filter.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {/* Clear all button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="h-8 text-xs"
        >
          Tout effacer
        </Button>
      )}

      {/* Add filter popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
            {activeFiltersCount > 0 && (
              <Badge variant="default" className="ml-2 h-5 min-w-5 rounded-full p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Ajouter un filtre</h4>
              <Separator className="mb-4" />
            </div>

            {/* Type de client */}
            <div className="space-y-2">
              <Label>Type de client</Label>
              <Select
                value={types[0]?.toString() || ""}
                onValueChange={(value) => {
                  const typeValue = parseInt(value) as CustomerType;
                  if (!types.includes(typeValue)) {
                    onFiltersChange({
                      types: [...types, typeValue],
                      active,
                      propertyGroupId,
                      commercialId,
                      city,
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {customerTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value.toString()}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Statut */}
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={active?.toString() || ""}
                onValueChange={(value) => {
                  onFiltersChange({
                    types,
                    active: value === "true",
                    propertyGroupId,
                    commercialId,
                    city,
                  });
                  setIsOpen(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value.toString()} value={status.value.toString()}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Groupe immobilier */}
            {propertyGroups.length > 0 && (
              <div className="space-y-2">
                <Label>Groupe immobilier</Label>
                <Select
                  value={propertyGroupId || ""}
                  onValueChange={(value) => {
                    onFiltersChange({
                      types,
                      active,
                      propertyGroupId: value,
                      commercialId,
                      city,
                    });
                    setIsOpen(false);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Commercial */}
            {commercials.length > 0 && (
              <div className="space-y-2">
                <Label>Commercial</Label>
                <Select
                  value={commercialId || ""}
                  onValueChange={(value) => {
                    onFiltersChange({
                      types,
                      active,
                      propertyGroupId,
                      commercialId: value,
                      city,
                    });
                    setIsOpen(false);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un commercial" />
                  </SelectTrigger>
                  <SelectContent>
                    {commercials.map((commercial) => (
                      <SelectItem key={commercial.id} value={commercial.id}>
                        {commercial.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Ville */}
            <div className="space-y-2">
              <Label>Ville</Label>
              <Input
                type="text"
                placeholder="Entrer une ville"
                defaultValue={city}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    onFiltersChange({
                      types,
                      active,
                      propertyGroupId,
                      commercialId,
                      city: e.currentTarget.value,
                    });
                    setIsOpen(false);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Appuyez sur Entrée pour ajouter
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}