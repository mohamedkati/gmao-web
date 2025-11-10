'use client';

import { useMemo } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';
import { Badge } from '@/shared/components/ui/badge';
import {
  PROPERTY_GROUP_STATUS_METADATA,
  PROPERTY_GROUP_STATUS_OPTIONS,
  PROPERTY_GROUP_TYPE_OPTIONS,
} from '../constants/property-group-metadata';
import { usePropertyGroupStore } from '../store/property-group.store';
import { PropertyGroupStatus, PropertyGroupType } from '../types/property-group';

interface PropertyGroupTableToolbarProps {
  totalCount: number;
  onCreateGroup?: () => void;
}

const consolidatedOptions = [
  { value: 'all', label: 'Tous les modes' },
  { value: 'yes', label: 'Facturation consolidée' },
  { value: 'no', label: 'Facturation site par site' },
] as const;

type ConsolidatedOption = (typeof consolidatedOptions)[number]['value'];

export function PropertyGroupTableToolbar({
  totalCount,
  onCreateGroup,
}: PropertyGroupTableToolbarProps) {
  const { filters, setFilters, resetFilters } = usePropertyGroupStore();

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm.trim().length > 0 ||
      filters.status !== 'all' ||
      filters.type !== 'all' ||
      filters.consolidatedBilling !== 'all'
    );
  }, [filters]);

  const handleStatusChange = (value: string) => {
    setFilters({
      status: value === 'all' ? 'all' : (Number(value) as PropertyGroupStatus),
    });
  };

  const handleTypeChange = (value: string) => {
    setFilters({
      type: value === 'all' ? 'all' : (Number(value) as PropertyGroupType),
    });
  };

  const handleConsolidatedChange = (value: ConsolidatedOption) => {
    setFilters({ consolidatedBilling: value });
  };

  return (
    <div className="space-y-4 rounded-xl border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Module Property Group</p>
          <h2 className="text-lg font-semibold text-foreground">
            {totalCount.toLocaleString('fr-FR')} groupes référencés
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => resetFilters()}
            className="hidden border-dashed border-muted-foreground/40 text-muted-foreground hover:bg-muted lg:inline-flex"
            disabled={!hasActiveFilters}
          >
            Réinitialiser
          </Button>
          <Button onClick={onCreateGroup} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau groupe
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.searchTerm}
            onChange={(event) => setFilters({ searchTerm: event.target.value })}
            placeholder="Rechercher par nom, référence, contact..."
            className="h-10 w-full rounded-lg border-muted/60 bg-background/80 pl-9"
          />
        </div>

        <Select
          value={filters.status === 'all' ? 'all' : String(filters.status)}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="h-10 rounded-lg border-muted/60 bg-background/80">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {PROPERTY_GROUP_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type === 'all' ? 'all' : String(filters.type)}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="h-10 rounded-lg border-muted/60 bg-background/80">
            <SelectValue placeholder="Type de groupe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {PROPERTY_GROUP_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.consolidatedBilling}
          onValueChange={handleConsolidatedChange}
        >
          <SelectTrigger className="h-10 rounded-lg border-muted/60 bg-background/80">
            <SelectValue placeholder="Mode de facturation" />
          </SelectTrigger>
          <SelectContent>
            {consolidatedOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filters.status !== 'all' && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          <span>Filtre actif :</span>
          <Badge
            variant="outline"
            className={`border-transparent bg-background/80 text-foreground`}
          >
            {PROPERTY_GROUP_STATUS_METADATA[filters.status]?.label}
          </Badge>
        </div>
      )}
    </div>
  );
}