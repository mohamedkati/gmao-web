'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Checkbox } from '@/shared/components/shadcnui/checkbox';
import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header';
import { WorkOrderPriorityBadge } from './work-order-priority-badge';
import { StatusBadge } from '@/shared/components/feedback/status-badge';
import { formatDate } from '@/shared/lib/utils/date';
import type { WorkOrder } from '../types/work-order.types';
import { WORK_ORDER_STATUS_LABELS } from '../constants/work-order.constants';

interface GetColumnsProps {
  onView: (workOrder: WorkOrder) => void;
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (workOrder: WorkOrder) => void;
}

export function getWorkOrderColumns({
  onView,
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<WorkOrder>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Sélectionner tout"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Titre" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue('title')}</span>
            {row.original.description && (
              <span className="text-xs text-muted-foreground line-clamp-1">
                {row.original.description}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priorité" />
      ),
      cell: ({ row }) => (
        <WorkOrderPriorityBadge priority={row.getValue('priority')} />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Statut" />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <StatusBadge
            status={status === 'completed' ? 'success' : 'info'}
            label={WORK_ORDER_STATUS_LABELS[status as keyof typeof WORK_ORDER_STATUS_LABELS]}
          />
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'assetName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Équipement" />
      ),
    },
    {
      accessorKey: 'technicianName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Technicien" />
      ),
      cell: ({ row }) => {
        const technicianName = row.getValue('technicianName') as string | undefined;
        return (
          <span className={!technicianName ? 'text-muted-foreground italic' : ''}>
            {technicianName || 'Non assigné'}
          </span>
        );
      },
    },
    {
      accessorKey: 'scheduledDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date planifiée" />
      ),
      cell: ({ row }) => {
        const date = row.getValue('scheduledDate') as string | undefined;
        return date ? formatDate(date, 'PP') : '-';
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Créée le" />
      ),
      cell: ({ row }) => {
        return formatDate(row.getValue('createdAt'), 'PP');
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const workOrder = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(workOrder)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(workOrder)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(workOrder)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}