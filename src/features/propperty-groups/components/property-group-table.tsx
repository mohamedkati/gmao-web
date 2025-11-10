'use client';

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Building2, CreditCard, Layers, MapPin, Pencil } from 'lucide-react';
import { DataTable } from '@/shared/components/data-table/data-table';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { PropertyGroup } from '../types/property-group';
import {
  PROPERTY_GROUP_STATUS_METADATA,
  PROPERTY_GROUP_TYPE_METADATA,
} from '../constants/property-group-metadata';
import { PropertyGroupTableToolbar } from './property-group-table-toolbar';
import { formatCurrency, formatDate } from '../utils/property-group-formatters';

interface PropertyGroupTableProps {
  data: PropertyGroup[];
  onSelect: (group: PropertyGroup) => void;
  onCreateGroup?: () => void;
  onEditGroup?: (group: PropertyGroup) => void;
  selectedGroupId?: string;
}

export function PropertyGroupTable({
  data,
  onSelect,
  onCreateGroup,
  onEditGroup,
  selectedGroupId,
}: PropertyGroupTableProps) {
  const columns = useMemo<ColumnDef<PropertyGroup>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Groupe',
        cell: ({ row }) => {
          const group = row.original;
          const statusMeta = PROPERTY_GROUP_STATUS_METADATA[group.status];
          const typeMeta = PROPERTY_GROUP_TYPE_METADATA[group.type];

          return (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">
                  {group.name}
                </p>
                <Badge
                  variant="outline"
                  className={`${statusMeta.badgeClass} border text-xs font-medium`}
                >
                  {statusMeta.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" /> {group.reference}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> {typeMeta.label}
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" />
                  {group.paymentTermsDays} jours
                </span>
              </div>
            </div>
          );
        },
        sortingFn: 'alphanumeric',
      },
      {
        accessorKey: 'totalSites',
        header: 'Sites',
        cell: ({ row }) => (
          <div className="flex items-center gap-1 text-sm font-medium text-foreground">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {row.original.totalSites.toLocaleString('fr-FR')}
          </div>
        ),
      },
      {
        accessorKey: 'totalUnits',
        header: 'Unités',
        cell: ({ row }) => (
          <span className="text-sm font-medium text-foreground">
            {row.original.totalUnits.toLocaleString('fr-FR')}
          </span>
        ),
      },
      {
        accessorKey: 'totalAnnualRevenue',
        header: 'CA annuel',
        cell: ({ row }) => (
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(row.original.totalAnnualRevenue)}
          </span>
        ),
      },
      {
        accessorKey: 'lastStatisticsUpdateDate',
        header: 'Mise à jour',
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.lastStatisticsUpdateDate)}
          </span>
        ),
      },
      {
        accessorKey: 'consolidatedBilling',
        header: 'Facturation',
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={`border-transparent ${
              row.original.consolidatedBilling
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-slate-500/10 text-slate-600'
            }`}
          >
            {row.original.consolidatedBilling
              ? 'Consolidée'
              : 'Par site'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={(event) => {
                event.stopPropagation();
                onEditGroup?.(row.original);
              }}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Modifier</span>
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onEditGroup],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={onSelect}
      getRowClassName={(row) =>
        row.original.id === selectedGroupId
          ? 'bg-primary/5 ring-1 ring-primary/40'
          : ''
      }
      toolbar={
        <PropertyGroupTableToolbar
          totalCount={data.length}
          onCreateGroup={onCreateGroup}
        />
      }
    />
  );
}