// src/features/sites/components/details/site-assets-tab.tsx

"use client";

import { useState } from "react";
import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Input } from "@/shared/components/shadcnui/input";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Progress } from "@/shared/components/shadcnui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import {
  Wrench,
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity,
  ChevronRight,
  Edit,
  Eye,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  LucideMicrowave,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils/cn";
import { useAssets } from "@/features/sites/hooks/assets/use-assets-query";
import { Asset, AssetStatus, CriticalityLevel } from "@/features/sites/types/asset.types";
import { LoadingData } from "./laoding";

interface SiteAssetsTabProps {
  site: Site;
}

export function SiteAssetsTab({ site }: SiteAssetsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<AssetStatus | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState("all");
  const { data: assets, isLoading, isFetching } = useAssets(site.id);
  const filteredAssets = assets?.filter((asset) => {
    const matchesSearch =
      searchQuery === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === undefined || asset.status === filterStatus;

    const matchesCategory =
      filterCategory === "all" || asset.category?.name === filterCategory || asset.category?.code === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleFilterStatusChange = (status: string) => {
    setFilterStatus(status === '0' ? undefined : Number(status) as AssetStatus);
  }

  if (isLoading || isFetching) {
    return <LoadingData />;
  }

  const stats = {
    total: filteredAssets?.length || 0,
    operational: filteredAssets?.filter((a) => a.status === AssetStatus.Active).length,
    maintenance: filteredAssets?.filter((a) => a.status === AssetStatus.UnderMaintenance).length,
    critical: filteredAssets?.filter((a) => a.criticalityLevel === CriticalityLevel.High).length,
    healthScore: 78, // Mock
  };

  const categories = ["Chauffage", "Ascenseurs", "Ventilation", "Portes"];

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Total"
          value={stats.total}
          icon={Wrench}
          color="blue"
        />
        <StatCard
          label="Opérationnels"
          value={stats.operational || 0}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          label="En maintenance"
          value={stats.maintenance || 0}
          icon={Clock}
          color="orange"
        />
        <StatCard
          label="Critiques"
          value={stats.critical || 0}
          icon={AlertCircle}
          color="red"
        />
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Santé globale</p>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold">{stats.healthScore}%</p>
            <Progress value={stats.healthScore} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Équipements</CardTitle>
              <CardDescription>
                {filteredAssets?.length || 0} équipement{filteredAssets?.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un équipement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus?.toString() || '0'} onValueChange={handleFilterStatusChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'0'}>Tous</SelectItem>
                <SelectItem value={AssetStatus.Active.toString()}>Opérationnel</SelectItem>
                <SelectItem value={AssetStatus.UnderMaintenance.toString()}>Maintenance</SelectItem>
                <SelectItem value={AssetStatus.Inactive.toString()}>Hors service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assets List */}
          <div className="space-y-3">
            {filteredAssets?.map((asset) => (
              <AssetItem key={asset.id} asset={asset} />
            ))}
          </div>

          {(filteredAssets?.length === 0 || !filteredAssets) && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucun équipement trouvé</p>
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
    red: "from-red-500/10 to-rose-500/10 border-red-500/20",
  };

  return (
    <Card className={`p-4 bg-gradient-to-br ${colorMap[color]}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-background/50">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
}

function AssetItem({ asset }: { asset: Asset }) {
  const statusConfig = {
    operational: {
      label: "Opérationnel",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      icon: CheckCircle2,
    },
    maintenance: {
      label: "Maintenance",
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
      icon: Clock,
    },
    outofservice: {
      label: "Hors service",
      color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      icon: AlertCircle,
    },
  };

  const healthConfig = {
    1: { label: "Excellent", color: "text-green-600 dark:text-green-400", value: 95 },
    2: { label: "Bon", color: "text-blue-600 dark:text-blue-400", value: 75 },
    3: { label: "Moyen", color: "text-orange-600 dark:text-orange-400", value: 50 },
    4: { label: "Mauvais", color: "text-red-600 dark:text-red-400", value: 25 },
    5: { label: "Critique", color: "text-red-600 dark:text-red-400", value: 10 },
  };

  const criticalityConfig = {
    3: {
      label: "Critique",
      color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    },
    2: {
      label: "Moyen",
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    },
    1: {
      label: "Faible",
      color: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    },
    4: {
      label: "Critique",
      color: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
    },
  };
  const status = statusConfig[asset.status === AssetStatus.Active
    ? "operational"
    : asset.status === AssetStatus.UnderMaintenance
      ? "maintenance"
      : "outofservice"];
  const health = healthConfig[Number(asset.healthStatus) as keyof typeof healthConfig];
  const criticality =
    criticalityConfig[Number(asset.criticalityLevel) as keyof typeof criticalityConfig];
  const StatusIcon = status.icon;

  return (
    <div className="group p-4 rounded-lg border hover:shadow-md transition-all duration-200 bg-card">
      <div className="flex items-start gap-4">
        {/* Left: Icon & Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="font-semibold truncate">{asset.name}</h4>
                <Badge variant="outline" className={status.color}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {status.label}
                </Badge>
                <Badge variant="outline" className={criticality.color}>
                  {criticality.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <span className="font-mono">{asset.reference}</span>
                <span>•</span>
                <span>{asset.category?.name}</span>
                <span>•</span>
                <span>{asset.location?.locationDescription}</span>
              </div>
            </div>
          </div>

          {/* Health & Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">État de santé</span>
                <span className={cn("text-xs font-semibold", health.color)}>
                  {health.label}
                </span>
              </div>
              <Progress value={health.value} className="h-2" />
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Dernière maintenance</span>
                <span className="text-xs font-semibold">
                  {asset.reliabilityMetrics && asset.reliabilityMetrics.lastMaintenanceDate && new Date(asset.reliabilityMetrics?.lastMaintenanceDate)?.toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Dernière Failure</span>
                <span className="text-xs font-semibold">
                  {asset.reliabilityMetrics && asset.reliabilityMetrics.lastFailureDate && new Date(asset.reliabilityMetrics.lastFailureDate).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                Historique
              </DropdownMenuItem>
              <DropdownMenuItem>Planifier maintenance</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
        <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
          <LucideMicrowave className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">Aucun équipement enregistré</h3>
      <p className="text-muted-foreground mb-6">
        Ajoutez des Équipements pour ce site
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un équipement
      </Button>
    </div>
  );
}