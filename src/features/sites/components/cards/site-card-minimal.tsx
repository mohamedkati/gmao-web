// src/features/sites/components/site-card-minimal.tsx

"use client";

import { useRouter } from "next/navigation";
import { Site, SiteType } from "../../types/site.types";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  Building,
  MapPin,
  User,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Maximize,
  Layers,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface SiteCardMinimalProps {
  site: Site;
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

// Couleurs accent par type
const siteTypeAccents: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "#3b82f6",
  [SiteType.CommercialBuilding]: "#f97316",
  [SiteType.MixedUse]: "#a855f7",
  [SiteType.IndustrialFacility]: "#6b7280",
  [SiteType.Office]: "#10b981",
  [SiteType.Warehouse]: "#ef4444",
  [SiteType.RetailStore]: "#f59e0b",
  [SiteType.Hotel]: "#ec4899",
  [SiteType.Hospital]: "#06b6d4",
  [SiteType.School]: "#8b5cf6",
  [SiteType.GovernmentBuilding]: "#14b8a6",
};

export function SiteCardMinimal({ site }: SiteCardMinimalProps) {
  const router = useRouter();
  const accentColor = siteTypeAccents[site.type];

  return (
    <div
      className="group relative bg-card border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => router.push(`/sites/${site.id}`)}
    >
      {/* Accent latéral */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 group-hover:w-1.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                {site.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-muted-foreground">
                {site.reference}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  borderColor: `${accentColor}30`,
                }}
              >
                {siteTypeLabels[site.type]}
              </Badge>
            </div>
          </div>

          {/* Actions */}
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => e.stopPropagation()}
                className="text-destructive"
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Infos principales */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {site.address.city} ({site.address.postalCode})
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{site.customer?.companyName}</span>
          </div>
          {site.commercial && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {site.commercial.firstName} {site.commercial.lastName}
              </span>
            </div>
          )}
        </div>

        {/* Stats inline */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {site.unitsCount && (
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{site.unitsCount}</span>
              <span>units</span>
            </div>
          )}
          {site. surfaceArea && (
            <div className="flex items-center gap-1.5">
              <Maximize className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">
                {site. surfaceArea.toLocaleString()}
              </span>
              <span>m²</span>
            </div>
          )}
          {site.buildingYear && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{site.buildingYear}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover overlay subtil */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors pointer-events-none" />
    </div>
  );
}