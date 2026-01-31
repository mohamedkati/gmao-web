// src/features/sites/components/details/site-units-tab.tsx

"use client";

import { useState } from "react";
import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import {
  Building,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  LayoutList,
  Users,
  Maximize,
  DoorOpen,
  MapPin,
  Edit,
  Eye,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useUnits } from "@/features/sites/hooks/units/use-units-query";
import { UnitStatus } from "@/features/sites/types/unit.types";
import { LoadingData } from "./laoding";

interface SiteUnitsTabProps {
  site: Site;
}


export function SiteUnitsTab({ site }: SiteUnitsTabProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: units, isLoading, isFetching } = useUnits(site.id);
  const filteredUnits = units?.filter((unit) => {
    const matchesSearch =
      searchQuery === "" ||
      unit.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.activeOccupant?.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      || unit.activeOccupant?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      || unit.activeOccupant?.companyName?.toLowerCase().includes(searchQuery.toLowerCase());


    return matchesSearch;
  });

  const stats = {
    total: units?.length || 0,
    occupied: units?.filter((u) => u.status === UnitStatus.Occupied).length || 0,
    vacant: units?.filter((u) => u.status === UnitStatus.Vacant).length || 0,
    occupancyRate: Math.round(
      (units?.filter((u) => u.status === UnitStatus.Occupied)?.length || 0 / (units?.length || 1)) * 100
    ),
  };

  if (isLoading || isFetching) {
    return <LoadingData />;
  }

  if (filteredUnits === undefined || filteredUnits.length === 0)
    return <EmptyState />;

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} icon={Building} color="blue" />
        <StatCard
          label="Occupés"
          value={stats.occupied}
          icon={Users}
          color="green"
        />
        <StatCard
          label="Vacants"
          value={stats.vacant}
          icon={DoorOpen}
          color="orange"
        />
        <StatCard
          label="Taux d'occupation"
          value={`${stats.occupancyRate}%`}
          icon={Building}
          color="purple"
        />
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Unités</CardTitle>
              <CardDescription>
                {filteredUnits?.length || 0} unité{filteredUnits?.length || 0 > 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une unité
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par référence, occupant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-1 p-1 rounded-lg border bg-muted/50">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Units Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUnits.map((unit) => (
                <UnitListItem key={unit.id} unit={unit} />
              ))}
            </div>
          )}

          {filteredUnits.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucune unité trouvée</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  };

  return (
    <div
      className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-background/50">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function UnitCard({ unit }: { unit: any }) {
  const statusColors = {
    occupied: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    vacant: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{unit.reference}</CardTitle>
              <CardDescription className="text-xs">{unit.type}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={statusColors[unit.status]}>
            {unit.status === "occupied" ? "Occupé" : "Vacant"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>Étage {unit.floor}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Maximize className="h-3.5 w-3.5" />
              <span>{unit.surfaceArea} m²</span>
            </div>
            {unit.rooms && (
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                <DoorOpen className="h-3.5 w-3.5" />
                <span>{unit.rooms} pièces</span>
              </div>
            )}
          </div>

          {unit.occupant && (
            <>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium truncate">{unit.occupant}</span>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-2 h-3.5 w-3.5" />
              Voir
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="mr-2 h-3.5 w-3.5" />
              Modifier
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UnitListItem({ unit }: { unit: any }) {
  const statusColors = {
    occupied: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    vacant: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold">{unit.reference}</p>
            <Badge variant="outline" className={statusColors[unit.status]}>
              {unit.status === "occupied" ? "Occupé" : "Vacant"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {unit.type} • Étage {unit.floor} • {unit.surfaceArea} m²
            {unit.rooms && ` • ${unit.rooms} pièces`}
          </p>
        </div>
        {unit.occupant && (
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{unit.occupant}</span>
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Voir détails
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
        <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
          <Building className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">Aucun unit enregistré</h3>
      <p className="text-muted-foreground mb-6">
        Ajoutez des unités pour ce site
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Ajouter une unité
      </Button>
    </div>
  );
}