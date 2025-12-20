"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomerListItem } from "../../../customers-v2/types/customer.types";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash,
  Users,
  Wallet,
  Building2,
} from "lucide-react";
import { customerTypeLabels, getCustomerTypeColor, formatCurrency } from "../../utils/customer.utils";
import Link from "next/link";
import { formatNumber } from "@/shared/lib/utils/currency";
import { Can } from "@/shared/components/auth/can";
import { CanAll, CanAny } from "@/shared/components/auth";

interface ColumnActions {
  onView: (customerId: string) => void;
  onViewOnPage: (customerId: string) => void;
  onEdit: (customerId: string) => void;
  onEditPage: (customerId: string) => void;
  onDelete: (customer: CustomerListItem) => void;
  onManageContacts: (customerId: string) => void;
  onManageBudgets: (customerId: string) => void;
}

export const createCustomerColumns = (actions: ColumnActions): ColumnDef<CustomerListItem>[] => [
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
    cell: ({ row }) => {
      const reference = row.getValue("reference") as string;
      return <div className="font-mono text-sm">{reference}</div>;
    },
  },
  {
    accessorKey: "companyName",
    header: "Nom",
    cell: ({ row }) => {
      const companyName = row.getValue("companyName") as string;
      const propertyGroupName = row.original.propertyGroupName;
      const id = row.original.id;

      return (
        <div className="flex flex-col">
          <Link href={`/customers/${id}`} className="font-medium hover:underline">
            {companyName}
          </Link>
          {propertyGroupName && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              {propertyGroupName}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as number;
      return (
        <Badge variant="outline" className={getCustomerTypeColor(type)}>
          {customerTypeLabels[type]}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "commercialName",
    header: "Commercial",
    cell: ({ row }) => {
      const commercialName = row.getValue("commercialName") as string;
      return commercialName ? (
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          {commercialName}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    id: "budget",
    header: "Budget 2024",
    cell: ({ row }) => {
      const budgets = row.original.maintenanceBudgets;
      const currentBudget = budgets?.find(b => b.year === 2024);

      if (!currentBudget) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            {formatCurrency(currentBudget.budgetedAmount)}
          </div>
          <div className="text-xs text-muted-foreground">
            Consommé: {currentBudget.consumptionPercent?.toFixed(0)}%
          </div>
        </div>
      );
    },
  },
  {
    id: "contacts",
    header: "Contacts",
    cell: ({ row }) => {
      const contactsCount = row.original.contactsCount || 0;
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{contactsCount}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sitesCount",
    header: "Nbr sites.",
    cell: ({ row }) => {
      const sitesCount = row.getValue("sitesCount") as number;
      return <div className="text-sm text-muted-foreground">{formatNumber(sitesCount)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

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
            <Can resource='customers' action='viewdetails'>
              <DropdownMenuItem onClick={() => actions.onView(customer.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onViewOnPage(customer.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir les détails on page
              </DropdownMenuItem>
              <DropdownMenuSeparator />

            </Can>
            <Can resource="customers" action="edit">
              {/* <DropdownMenuLabel className="text-xs text-muted-foreground">
                Modifier
              </DropdownMenuLabel> */}
              <DropdownMenuItem onClick={() => actions.onEdit(customer.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier (Drawer)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.onEditPage(customer.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier (Page)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </Can>
            <Can resource="customercontacts" action="view" >
              <DropdownMenuItem onClick={() => actions.onManageContacts(customer.id)}>
                <Users className="mr-2 h-4 w-4" />
                Gérer les contacts
              </DropdownMenuItem>
            </Can>
            <Can resource="customerbudgets" action="view" >
              <DropdownMenuItem onClick={() => actions.onManageBudgets(customer.id)}>
                <Wallet className="mr-2 h-4 w-4" />
                Gérer les budgets
              </DropdownMenuItem>
            </Can>
            <CanAny checks={[{ resource: "customerbudgets", action: "view" }, { resource: "customercontacts", action: "view" }]}>
              <DropdownMenuSeparator />
            </CanAny>
            <Can resource="customers" action="delete">
              <DropdownMenuItem
                onClick={() => actions.onDelete(customer)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </Can>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];