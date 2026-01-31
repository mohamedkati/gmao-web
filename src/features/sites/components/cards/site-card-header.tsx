// src/features/sites/components/site-card-header.tsx

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
  Layers,
  Maximize,
  Calendar,
} from "lucide-react";

interface SiteCardHeaderProps {
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

const siteTypeColors: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
  [SiteType.CommercialBuilding]: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
  [SiteType.MixedUse]: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
  [SiteType.IndustrialFacility]: "bg-gray-500/10 border-gray-500/20 text-gray-700 dark:text-gray-400",
  [SiteType.Office]: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
  [SiteType.Warehouse]: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
  [SiteType.RetailStore]: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
  [SiteType.Hotel]: "bg-pink-500/10 border-pink-500/20 text-pink-700 dark:text-pink-400",
  [SiteType.Hospital]: "bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-cyan-400",
  [SiteType.School]: "bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-400",
  [SiteType.GovernmentBuilding]: "bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-400",
};

export function SiteCardHeader({ site }: SiteCardHeaderProps) {
  const router = useRouter();

  return (
    <div className="group bg-card border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Header coloré */}
      <div className={`p-4 border-b ${siteTypeColors[site.type]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate mb-1">{site.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono opacity-80">{site.reference}</span>
              <span className="text-xs opacity-60">•</span>
              <span className="text-xs opacity-80">{siteTypeLabels[site.type]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Infos */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">
              {site.address.city}, {site.address.postalCode}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-3.5 w-3.5" />
            <span className="truncate">{site.customer?.companyName}</span>
          </div>
          {site.commercial && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span className="truncate">
                {site.commercial.firstName} {site.commercial.lastName}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t text-xs">
          {site.unitsCount && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{site.unitsCount}</span>
            </div>
          )}
          {site. surfaceArea && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Maximize className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">
                {site. surfaceArea.toLocaleString()} m²
              </span>
            </div>
          )}
          {site.buildingYear && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{site.buildingYear}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => router.push(`/sites/${site.id}`)}
          >
            <Eye className="mr-2 h-3.5 w-3.5" />
            Voir
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/sites/${site.id}/edit`)}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}