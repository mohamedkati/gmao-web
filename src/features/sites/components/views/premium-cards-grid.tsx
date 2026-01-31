// src/features/sites/components/premium-cards-grid.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Site, SiteListItem, SiteType } from "../../types/site.types";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Building,
  MapPin,
  User,
  Layers,
  Maximize,
  Calendar,
  Wrench,
  Eye,
  Edit,
  MoreVertical,
  Star,
  Copy,
  Trash2,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface PremiumCardsGridProps {
  sites: SiteListItem[];
  onSelect?: (siteIds: string[]) => void;
  selectedIds?: string[];
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

const siteTypeIcons: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "🏢",
  [SiteType.CommercialBuilding]: "🏪",
  [SiteType.MixedUse]: "🏗️",
  [SiteType.IndustrialFacility]: "🏭",
  [SiteType.Office]: "🏢",
  [SiteType.Warehouse]: "📦",
  [SiteType.RetailStore]: "🛒",
  [SiteType.Hotel]: "🏨",
  [SiteType.Hospital]: "🏥",
  [SiteType.School]: "🏫",
  [SiteType.GovernmentBuilding]: "🏛️",
};

const siteTypeGradients: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
  [SiteType.CommercialBuilding]: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
  [SiteType.MixedUse]: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
  [SiteType.IndustrialFacility]: "from-gray-500/20 via-slate-500/20 to-gray-600/20",
  [SiteType.Office]: "from-green-500/20 via-emerald-500/20 to-green-600/20",
  [SiteType.Warehouse]: "from-red-500/20 via-rose-500/20 to-red-600/20",
  [SiteType.RetailStore]: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
  [SiteType.Hotel]: "from-pink-500/20 via-rose-500/20 to-pink-600/20",
  [SiteType.Hospital]: "from-cyan-500/20 via-blue-500/20 to-cyan-600/20",
  [SiteType.School]: "from-violet-500/20 via-purple-500/20 to-violet-600/20",
  [SiteType.GovernmentBuilding]: "from-teal-500/20 via-cyan-500/20 to-teal-600/20",
};

const siteTypeBorders: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "border-blue-500/30",
  [SiteType.CommercialBuilding]: "border-orange-500/30",
  [SiteType.MixedUse]: "border-purple-500/30",
  [SiteType.IndustrialFacility]: "border-gray-500/30",
  [SiteType.Office]: "border-green-500/30",
  [SiteType.Warehouse]: "border-red-500/30",
  [SiteType.RetailStore]: "border-amber-500/30",
  [SiteType.Hotel]: "border-pink-500/30",
  [SiteType.Hospital]: "border-cyan-500/30",
  [SiteType.School]: "border-violet-500/30",
  [SiteType.GovernmentBuilding]: "border-teal-500/30",
};

export function PremiumCardsGrid({
  sites,
  onSelect,
  selectedIds = [],
}: PremiumCardsGridProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (siteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(siteId)) {
        newFavorites.delete(siteId);
      } else {
        newFavorites.add(siteId);
      }
      return newFavorites;
    });
  };

  const toggleSelect = (siteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSelect) return;

    const newSelected = selectedIds.includes(siteId)
      ? selectedIds.filter((id) => id !== siteId)
      : [...selectedIds, siteId];
    onSelect(newSelected);
  };

  if (sites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center border-2 border-primary/20">
            <Building className="h-12 w-12 text-primary/50" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Aucun site trouvé</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Aucun site ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
      {sites.map((site) => {
        const isSelected = selectedIds.includes(site.id);
        const isFavorite = favorites.has(site.id);
        const isHovered = hoveredId === site.id;

        return (
          <div
            key={site.id}
            className="group relative"
            onMouseEnter={() => setHoveredId(site.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Glow Effect */}
            <div
              className={cn(
                "absolute -inset-0.5 rounded-2xl opacity-0 blur-xl transition-all duration-500",
                `bg-gradient-to-br ${siteTypeGradients[site.type]}`,
                isHovered && "opacity-100"
              )}
            />

            {/* Card */}
            <div
              className={cn(
                "relative h-full rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden",
                "bg-gradient-to-br from-card/95 to-card/80",
                siteTypeBorders[site.type],
                isHovered && "scale-[1.02] shadow-2xl",
                isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
              onClick={() => router.push(`/sites/${site.id}`)}
            >
              {/* Header avec gradient */}
              <div
                className={cn(
                  "relative h-32 bg-gradient-to-br",
                  siteTypeGradients[site.type]
                )}
              >
                {/* Overlay pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />

                {/* Top Actions */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isSelected}
                      onClick={(e) => toggleSelect(site.id, e as any)}
                      className="bg-background/80 backdrop-blur-sm"
                    />
                    <button
                      onClick={(e) => toggleFavorite(site.id, e)}
                      className={cn(
                        "p-1.5 rounded-lg backdrop-blur-sm border transition-all",
                        isFavorite
                          ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-500"
                          : "bg-background/50 border-white/10 text-muted-foreground hover:text-yellow-500"
                      )}
                    >
                      <Star className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
                    </button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-background/50 backdrop-blur-sm border border-white/10 hover:bg-background/80"
                      >
                        <MoreVertical className="h-4 w-4" />
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
                </div>

                {/* Icon */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-background rounded-2xl blur-md" />
                    <Avatar className="relative h-16 w-16 rounded-2xl border-2 border-background shadow-xl">
                      <AvatarFallback className="rounded-2xl bg-gradient-to-br from-background to-muted text-2xl">
                        {siteTypeIcons[site.type]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute bottom-3 right-3">
                  <Badge
                    variant="secondary"
                    className="backdrop-blur-xl bg-background/80 border-white/20 text-xs font-medium"
                  >
                    {siteTypeLabels[site.type]}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-10">
                {/* Title */}
                <div className="mb-4 text-center">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {site.reference}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      {site.address.city}, {site.address.postalCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{site.customer?.companyName}</span>
                  </div>
                  {site.commercial && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {site.commercial.firstName} {site.commercial.lastName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/50">
                  {site.unitsCount && (
                    <StatBadge
                      icon={Layers}
                      value={site.unitsCount}
                      label="units"
                    />
                  )}
                  {site.surfaceArea && (
                    <StatBadge
                      icon={Maximize}
                      value={`${(site.surfaceArea / 1000).toFixed(1)}k`}
                      label="m²"
                    />
                  )}
                  {site.buildingYear && (
                    <StatBadge
                      icon={Calendar}
                      value={site.buildingYear}
                      label=""
                    />
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/sites/${site.id}`);
                    }}
                  >
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/sites/${site.id}/edit`);
                    }}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Hover Indicator */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transition-opacity",
                  siteTypeGradients[site.type],
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper Component
function StatBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="text-center">
        <p className="text-xs font-bold">{value}</p>
        {label && <p className="text-[10px] text-muted-foreground">{label}</p>}
      </div>
    </div>
  );
}