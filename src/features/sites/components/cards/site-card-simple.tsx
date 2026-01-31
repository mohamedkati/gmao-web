// src/features/sites/components/site-card-flat.tsx

"use client";

import { useRouter } from "next/navigation";
import { Site, SiteType } from "../../types/site.types";
import { MapPin, Building, ArrowRight } from "lucide-react";

interface SiteCardFlatProps {
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

export function SiteCardFlat({ site }: SiteCardFlatProps) {
  const router = useRouter();

  return (
    <div
      className="group p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => router.push(`/sites/${site.id}`)}
    >
      <div className="flex items-center justify-between">
        {/* Left: Main info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {site.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
              {siteTypeLabels[site.type]}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{site.address.city}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5" />
              <span className="truncate max-w-[200px]">
                {site.customer?.companyName}
              </span>
            </div>
            {site.unitsCount && (
              <span className="text-xs">
                <span className="font-medium text-foreground">
                  {site.unitsCount}
                </span>{" "}
                units
              </span>
            )}
          </div>
        </div>

        {/* Right: Reference & Arrow */}
        <div className="flex items-center gap-4 ml-4">
          <span className="text-xs font-mono text-muted-foreground">
            {site.reference}
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}