// src/features/sites/components/premium-stats.tsx

"use client";

import { useMemo } from "react";
import { Site, SiteListItem } from "../../types/site.types";
import {
  Building,
  Home,
  Wrench,
  TrendingUp,
  MapPin,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/shared/components/shadcnui/badge";

interface PremiumStatsProps {
  sites: SiteListItem[];
}

export function PremiumStats({ sites }: PremiumStatsProps) {
  const stats = useMemo(() => {
    const totalSites = sites.length;
    const totalUnits = sites.reduce((acc, site) => acc + (site.unitsCount || 0), 0);
    // const totalAssets = sites.reduce(
    //   (acc, site) => acc + (site.assets?.length || 0),
    //   0
    // );
    const totalAssets = 0;
    const withGPS = sites.filter((site) => site.coordinates).length;
    const avgUnitsPerSite = totalSites > 0 ? Math.round(totalUnits / totalSites) : 0;
    const totalArea = sites.reduce((acc, site) => acc + (site.surfaceArea || 0), 0);

    // Calcul des tendances (simulé)
    const sitesGrowth = 8.5;
    const unitsGrowth = 12.3;
    const assetsGrowth = -2.1;
    const gpsGrowth = 15.7;

    return {
      totalSites,
      totalUnits,
      totalAssets,
      withGPS,
      avgUnitsPerSite,
      totalArea,
      sitesGrowth,
      unitsGrowth,
      assetsGrowth,
      gpsGrowth,
    };
  }, [sites]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <StatCard
        icon={Building}
        label="Total Sites"
        value={stats.totalSites}
        trend={stats.sitesGrowth}
        trendLabel="vs mois dernier"
        color="blue"
      />
      <StatCard
        icon={Home}
        label="Total Units"
        value={stats.totalUnits}
        trend={stats.unitsGrowth}
        trendLabel="vs mois dernier"
        color="green"
        secondary={`${stats.avgUnitsPerSite} moy/site`}
      />
      <StatCard
        icon={Wrench}
        label="Équipements"
        value={stats.totalAssets}
        trend={stats.assetsGrowth}
        trendLabel="vs mois dernier"
        color="orange"
      />
      <StatCard
        icon={MapPin}
        label="Avec GPS"
        value={stats.withGPS}
        trend={stats.gpsGrowth}
        trendLabel="vs mois dernier"
        color="purple"
        secondary={`${Math.round((stats.withGPS / stats.totalSites) * 100)}% total`}
      />
      <StatCard
        icon={TrendingUp}
        label="Surface Totale"
        value={`${(stats.totalArea / 1000).toFixed(0)}k`}
        unit="m²"
        color="cyan"
        secondary={`${Math.round(stats.totalArea / stats.totalSites).toLocaleString()} moy/site`}
      />
      <StatCard
        icon={Users}
        label="Occupation"
        value="87"
        unit="%"
        trend={2.3}
        trendLabel="vs mois dernier"
        color="pink"
      />
    </div>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  secondary?: string;
  color: "blue" | "green" | "orange" | "purple" | "cyan" | "pink";
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendLabel,
  secondary,
  color,
}: StatCardProps) {
  const colorMap = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
    cyan: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20",
    pink: "from-pink-500/10 to-rose-500/10 border-pink-500/20",
  };

  const iconColorMap = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    orange: "text-orange-600 dark:text-orange-400",
    purple: "text-purple-600 dark:text-purple-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
    pink: "text-pink-600 dark:text-pink-400",
  };

  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className={`relative p-4 rounded-xl backdrop-blur-xl bg-gradient-to-br border ${colorMap[color]} transition-all duration-300 hover:scale-[1.02]`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg bg-background/50 ${iconColorMap[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
          {trend !== undefined && (
            <Badge
              variant={isPositive ? "default" : "secondary"}
              className={`text-xs gap-1 ${
                isPositive
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                  : isNegative
                  ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                  : ""
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(trend)}%
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold">{value}</p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          <p className="text-xs text-muted-foreground">{label}</p>
          {secondary && (
            <p className="text-xs text-muted-foreground/80 mt-1">{secondary}</p>
          )}
          {trend !== undefined && trendLabel && (
            <p className="text-xs text-muted-foreground/60 mt-1">{trendLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}