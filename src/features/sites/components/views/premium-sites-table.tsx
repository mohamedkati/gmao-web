// src/features/sites/components/premium-sites-table.tsx

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcnui/table";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/shared/components/ui/dropdown-menu";
import { Site, SiteListItem, SiteType } from "../../types/site.types";
import {
  ArrowUpDown,
  Eye,
  Edit,
  MoreHorizontal,
  Download,
  Trash2,
  Copy,
  Star,
  MapPin,
  Building,
  User,
  Calendar,
  Maximize,
  Layers,
  Settings2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";

interface PremiumSitesTableProps {
  sites: SiteListItem[];
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
  [SiteType.ResidentialBuilding]: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  [SiteType.CommercialBuilding]: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  [SiteType.MixedUse]: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  [SiteType.IndustrialFacility]: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
  [SiteType.Office]: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  [SiteType.Warehouse]: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  [SiteType.RetailStore]: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  [SiteType.Hotel]: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
  [SiteType.Hospital]: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  [SiteType.School]: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
  [SiteType.GovernmentBuilding]: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
};

export function PremiumSitesTable({ sites, isLoading }: PremiumSitesTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({
    reference: true,
    name: true,
    type: true,
    city: true,
    customer: true,
    commercial: true,
    units: true,
    area: true,
    year: true,
  });

  const columns = useMemo<ColumnDef<SiteListItem>[]>(
    () => [
      // Checkbox selection
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Tout sélectionner"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Sélectionner la ligne"
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      // Favoris
      {
        id: "favorite",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorite
            }}
            className="text-muted-foreground hover:text-yellow-500 transition-colors"
          >
            <Star className="h-4 w-4" />
          </button>
        ),
        enableSorting: false,
        size: 40,
      },
      // Référence
      {
        id: "reference",
        accessorKey: "reference",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            Référence
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-mono text-sm font-medium">
            {row.getValue("reference")}
          </div>
        ),
        size: 120,
      },
      // Nom du site
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            Site
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const site = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-8 w-8 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  {site.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{site.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {site.address.street}
                </div>
              </div>
            </div>
          );
        },
        size: 300,
      },
      // Type
      {
        id: "type",
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.getValue("type") as SiteType;
          return (
            <Badge variant="outline" className={`${siteTypeColors[type]} text-xs font-medium`}>
              {siteTypeLabels[type]}
            </Badge>
          );
        },
        size: 140,
      },
      // Ville
      {
        id: "city",
        accessorFn: (row) => row.address.city,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <MapPin className="mr-2 h-3.5 w-3.5" />
            Ville
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.address.city}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.address.postalCode}
            </div>
          </div>
        ),
        size: 140,
      },
      // Client
      {
        id: "customer",
        accessorFn: (row) => row.customer?.companyName,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <Building className="mr-2 h-3.5 w-3.5" />
            Client
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="truncate max-w-[200px]">
            {row.original.customer?.companyName || (
              <span className="text-muted-foreground text-sm">Non assigné</span>
            )}
          </div>
        ),
        size: 200,
      },
      // Commercial
      {
        id: "commercial",
        accessorFn: (row) =>
          row.commercial
            ? `${row.commercial.firstName} ${row.commercial.lastName}`
            : null,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <User className="mr-2 h-3.5 w-3.5" />
            Commercial
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const commercial = row.original.commercial;
          return commercial ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {commercial.firstName[0]}
                  {commercial.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm truncate max-w-[150px]">
                {commercial.firstName} {commercial.lastName}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          );
        },
        size: 180,
      },
      // Units
      {
        id: "units",
        accessorKey: "unitsCount",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <Layers className="mr-2 h-3.5 w-3.5" />
            Units
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const count = row.getValue("units") as number;
          return count ? (
            <div className="text-center">
              <div className="font-semibold">{count}</div>
              <div className="text-xs text-muted-foreground">units</div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">-</div>
          );
        },
        size: 100,
      },
      // Surface
      {
        id: "area",
        accessorKey: "totalArea",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <Maximize className="mr-2 h-3.5 w-3.5" />
            Surface
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const area = row.getValue("area") as number;
          return area ? (
            <div className="text-right">
              <div className="font-semibold">{area.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">m²</div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">-</div>
          );
        },
        size: 120,
      },
      // Année
      {
        id: "year",
        accessorKey: "buildingYear",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 hover:bg-transparent"
          >
            <Calendar className="mr-2 h-3.5 w-3.5" />
            Année
            <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => {
          const year = row.getValue("year") as number;
          return year ? (
            <div className="text-center font-medium">{year}</div>
          ) : (
            <div className="text-center text-muted-foreground">-</div>
          );
        },
        size: 100,
      },
      // Actions
      {
        id: "actions",
        cell: ({ row }) => {
          const site = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/sites/${site.id}`);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/sites/${site.id}/edit`);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                  <Copy className="mr-2 h-4 w-4" />
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => e.stopPropagation()}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 60,
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
    onRowSelectionChange: setRowSelection,
    // onColumnVisibilityChange: setColumnVisibility,
    // state: {
    //   sorting,
    //   rowSelection,
    //   columnVisibility,
    // },
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-primary/10 backdrop-blur-xl border rounded-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {selectedCount} site{selectedCount > 1 ? "s" : ""} sélectionné{selectedCount > 1 ? "s" : ""}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.toggleAllPageRowsSelected(false)}
          >
            Annuler
          </Button>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="font-semibold"
                    >
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
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-8 bg-muted rounded animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="text-muted-foreground">
                      <Building className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Aucun site trouvé</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group cursor-pointer"
                    onClick={() => router.push(`/sites/${row.original.id}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Column Visibility Toggle */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {table.getFilteredRowModel().rows.length} site{table.getFilteredRowModel().rows.length > 1 ? "s" : ""}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 h-4 w-4" />
              Colonnes
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}