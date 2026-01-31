// src/features/sites/components/sites-table-view.tsx

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcnui/table";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Site, SiteType } from "../../types/site.types";
import {
  ArrowUpDown,
  Eye,
  Edit,
  MoreVertical,
  FileText,
  Users,
  Wrench,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface SitesTableViewProps {
  sites: Site[];
  isLoading?: boolean;
}

const siteTypeLabels: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "Résidentiel",
  [SiteType.CommercialBuilding]: "Commercial",
  [SiteType.MixedUse]: "Mixte",
  [SiteType.IndustrialFacility]: "Industriel",
  [SiteType.Office]: "Bureau",
  [SiteType.Warehouse]: "Entrepôt",
  [SiteType.RetailStore]: "Magasin",
  [SiteType.Hotel]: "Hôtel",
  [SiteType.Hospital]: "Hôpital",
  [SiteType.School]: "École",
  [SiteType.GovernmentBuilding]: "Gouvernement",
};

const siteTypeColors: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "blue",
  [SiteType.CommercialBuilding]: "orange",
  [SiteType.MixedUse]: "purple",
  [SiteType.IndustrialFacility]: "gray",
  [SiteType.Office]: "green",
  [SiteType.Warehouse]: "red",
  [SiteType.RetailStore]: "amber",
  [SiteType.Hotel]: "pink",
  [SiteType.Hospital]: "cyan",
  [SiteType.School]: "violet",
  [SiteType.GovernmentBuilding]: "teal",
};

export function SitesTableView({ sites, isLoading }: SitesTableViewProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Site>[]>(
    () => [
      {
        accessorKey: "reference",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 -ml-3"
            >
              Référence
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-mono text-sm">{row.getValue("reference")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 -ml-3"
            >
              Nom du site
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div>
            <div className="font-semibold">{row.getValue("name")}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.customer?.companyName}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.getValue("type") as SiteType;
          return (
            <Badge variant="secondary" className="text-xs">
              {siteTypeLabels[type]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "address.city",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 -ml-3"
            >
              Ville
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div>
            <div>{row.original.address.city}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.address.postalCode}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "unitsCount",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 -ml-3"
            >
              Units
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const count = row.getValue("unitsCount") as number;
          return count ? (
            <div className="text-center font-medium">{count}</div>
          ) : (
            <div className="text-center text-muted-foreground">-</div>
          );
        },
      },
      {
        accessorKey: "totalArea",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 -ml-3"
            >
              Surface
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const area = row.getValue("totalArea") as number;
          return area ? (
            <div className="text-right font-medium">
              {area.toLocaleString()} m²
            </div>
          ) : (
            <div className="text-center text-muted-foreground">-</div>
          );
        },
      },
      {
        accessorKey: "commercial",
        header: "Commercial",
        cell: ({ row }) => {
          const commercial = row.original.commercial;
          return commercial ? (
            <div className="text-sm">
              {commercial.firstName} {commercial.lastName}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Non assigné</div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const site = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/sites/${site.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/sites/${site.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Équipe
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Wrench className="mr-2 h-4 w-4" />
                  Équipements
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router]
  );

  const table = useReactTable({
    data: sites,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border backdrop-blur-xl bg-background/50">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, i) => (
                <TableHead key={i}>
                  <div className="h-4 bg-muted rounded w-20 animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="rounded-lg border backdrop-blur-xl bg-background/50 p-20 text-center">
        <p className="text-muted-foreground">Aucun site trouvé</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border backdrop-blur-xl bg-background/50 overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/sites/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}