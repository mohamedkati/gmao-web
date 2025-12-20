// src/features/customers/components/customers-table-view.tsx

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcnui/table";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Button } from "@/shared/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/shadcnui/badge";
import { MoreVertical, Eye, Edit, Trash, Archive, ArrowUpDown } from "lucide-react";
import { CustomerListItem, CustomerType } from "../types/customer.types";
import { cn } from "@/shared/lib/utils/cn";

interface CustomersTableViewProps {
  customers: CustomerListItem[];
  selectedIds?: Set<string>;
  onSelectAll?: () => void;
  onSelect?: (id: string) => void;
  onView?: (customer: CustomerListItem) => void;
  onEdit?: (customer: CustomerListItem) => void;
  onDelete?: (customer: CustomerListItem) => void;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
}

export function CustomersTableView({
  customers,
  selectedIds = new Set(),
  onSelectAll,
  onSelect,
  onView,
  onEdit,
  onDelete,
  isAllSelected = false,
  isIndeterminate = false,
  onSort,
  sortColumn,
  sortDirection,
}: CustomersTableViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomerTypeLabel = (type: CustomerType) => {
    switch (type) {
      case CustomerType.PropertyManager:
        return "Gestionnaire";
      case CustomerType.Syndic:
        return "Syndic";
      case CustomerType.Corporate:
        return "Entreprise";
      case CustomerType.Individual:
        return "Particulier";
      case CustomerType.Government:
        return "Administration";
      default:
        return "Client";
    }
  };

  const getTypeBadgeClass = (type: CustomerType) => {
    switch (type) {
      case CustomerType.PropertyManager:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case CustomerType.Syndic:
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
      case CustomerType.Corporate:
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case CustomerType.Individual:
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
      case CustomerType.Government:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    }
  };

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => onSort?.(column)}
    >
      {children}
      <ArrowUpDown className={cn(
        "ml-2 h-4 w-4",
        sortColumn === column && "text-primary"
      )} />
    </Button>
  );

  return (
    <div className="border rounded-lg bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                aria-label="Sélectionner tout"
                className={cn(isIndeterminate && "data-[state=checked]:bg-primary/50")}
              />
            </TableHead>
            <TableHead>
              <SortableHeader column="reference">Référence</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader column="companyName">Raison sociale</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader column="type">Type</SortableHeader>
            </TableHead>
            <TableHead>Contact principal</TableHead>
            <TableHead>
              <SortableHeader column="city">Ville</SortableHeader>
            </TableHead>
            <TableHead className="text-right">
              <SortableHeader column="sitesCount">Sites</SortableHeader>
            </TableHead>
            <TableHead>Commercial</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className={cn(
                "cursor-pointer transition-colors",
                selectedIds.has(customer.id) && "bg-muted/50"
              )}
              onClick={() => onView?.(customer)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.has(customer.id)}
                  onCheckedChange={() => onSelect?.(customer.id)}
                  aria-label={`Sélectionner ${customer.companyName}`}
                />
              </TableCell>
              <TableCell>
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {customer.reference}
                </code>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {getInitials(customer.companyName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.companyName}</div>
                    {customer.propertyGroupName && (
                      <div className="text-xs text-muted-foreground">
                        {customer.propertyGroupName}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("text-xs", getTypeBadgeClass(customer.type))}>
                  {getCustomerTypeLabel(customer.type)}
                </Badge>
              </TableCell>
              <TableCell>
                {customer.primaryContactName ? (
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">{customer.primaryContactName}</div>
                    <div className="text-xs text-muted-foreground">{customer.primaryContactEmail}</div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">Aucun contact</span>
                )}
              </TableCell>
              <TableCell className="text-sm">{customer.invoiceCity}</TableCell>
              <TableCell className="text-right font-medium">
                {customer.sitesCount}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {customer.commercialName || (
                    <span className="text-muted-foreground">Non assigné</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {/* {customer.active ? ( */}
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                    Actif
                  </Badge>
                {/* ) : (
                  <Badge variant="outline" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20">
                    Inactif
                  </Badge>
                )} */}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(customer)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(customer)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archiver
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(customer)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {customers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucun client trouvé
        </div>
      )}
    </div>
  );
}