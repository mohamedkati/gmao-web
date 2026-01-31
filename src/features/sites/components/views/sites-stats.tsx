// src/features/sites/components/sites-stats.tsx

"use client";

import { useMemo } from "react";
import { Site } from "../../types/site.types";
import { Building, Home, Wrench, Users } from "lucide-react";

interface SitesStatsProps {
  sites: Site[];
  total: number;
}

export function SitesStats({ sites, total }: SitesStatsProps) {
  const stats = useMemo(() => {
    const totalUnits = sites.reduce((acc, site) => acc + (site.unitsCount || 0), 0);
    const totalAssets = sites.reduce((acc, site) => acc + (site.assets?.length || 0), 0);
    const totalArea = sites.reduce((acc, site) => acc + (site. surfaceArea || 0), 0);
    
    // Calcul du taux d'occupation (simplifié - à adapter selon votre logique)
    const occupancyRate = totalUnits > 0 ? Math.round((totalUnits * 0.85)) : 0;

    return {
      totalSites: total,
      totalUnits,
      totalAssets,
      occupancyRate: totalUnits > 0 ? Math.round((occupancyRate / totalUnits) * 100) : 0,
    };
  }, [sites, total]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Building}
        label="Sites"
        value={stats.totalSites}
        trend="+12 ce mois"
        color="blue"
      />
      <StatCard
        icon={Home}
        label="Units"
        value={stats.totalUnits}
        trend="+45 ce mois"
        color="green"
      />
      <StatCard
        icon={Wrench}
        label="Assets"
        value={stats.totalAssets}
        trend="+23 ce mois"
        color="orange"
      />
      <StatCard
        icon={Users}
        label="Occupation"
        value={`${stats.occupancyRate}%`}
        trend="+2% ce mois"
        color="purple"
      />
    </div>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  trend?: string;
  color: "blue" | "green" | "orange" | "purple";
}

function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  const colorMap = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className={`relative p-6 rounded-xl backdrop-blur-xl bg-gradient-to-br border ${colorMap[color]} transition-all duration-300 hover:scale-[1.02]`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-background/50">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
            {trend && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {trend}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}