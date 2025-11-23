"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PropertyGroup, PropertyGroupStatus, PropertyGroupType } from "../types/property-group.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash, TrendingUp, Users } from "lucide-react";
import {
  propertyGroupTypeLabels,
  propertyGroupStatusLabels,
  formatCurrency,
  formatDate,
  getStatusColor
} from "../utils/property-groups.utils";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import Link from "next/link";

interface ColumnActions {
  onView: (group: PropertyGroup) => void;
  onEdit: (group: PropertyGroup) => void;
  onPageEdit: (group: PropertyGroup) => void;
  onDelete: (group: PropertyGroup) => void;
  onManageContacts: (group: PropertyGroup) => void;
  onUpdateStatistics: (group: PropertyGroup) => void;
}

export const createPropertyGroupColumns = (
  actions: ColumnActions
): ColumnDef<PropertyGroup>[] => [
    {
      id: "select",
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
      accessorKey: "reference",
      header: "Référence",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("reference")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        const id = row.original.id;
        const legalName = row.original.legalName;
        return (
          <div className="flex flex-col">
            <Link href={`/property-groups/${id}`} className="font-medium hover:underline">
              <span className="font-medium">{name}</span>
            </Link>

            {legalName && (
              <span className="text-xs text-muted-foreground">{legalName}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as PropertyGroupType;
        return (
          <Badge variant="outline">
            {propertyGroupTypeLabels[type]}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as PropertyGroupStatus;
        return (
          <Badge className={getStatusColor(status)} variant="secondary">
            {propertyGroupStatusLabels[status]}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "totalCustomers",
      header: "Clients",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("totalCustomers") || 0}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalSites",
      header: "Sites",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("totalSites") || 0}</div>
      ),
    },
    {
      accessorKey: "totalAnnualRevenue",
      header: "CA Annuel",
      cell: ({ row }) => {
        const revenue = row.getValue("totalAnnualRevenue") as number;
        return (
          <div className="font-medium">
            {revenue ? formatCurrency(revenue) : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "lastModified",
      header: "Dernière modification",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {formatDate(row.getValue("lastModified"))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const group = row.original;

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
              <DropdownMenuItem onClick={() => actions.onView(group)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onEdit(group)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onPageEdit(group)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier sur page
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onManageContacts(group)}>
                <Users className="mr-2 h-4 w-4" />
                Gérer les contacts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onUpdateStatistics(group)}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Actualiser les stats
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => actions.onDelete(group)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];