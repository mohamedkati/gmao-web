// src/features/sites/components/sites-map-view.tsx

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Site, SiteType } from "../../types/site.types";

const ClusterMap = dynamic(
  () => import("@/shared/components/maps/cluster-map").then((mod) => mod.ClusterMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] border rounded-lg bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

interface SitesMapViewProps {
  sites: Site[];
  height?: string;
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

export function SitesMapView({ sites, height = "600px" }: SitesMapViewProps) {
  const router = useRouter();

  // Convertir les sites en markers
  const markers = useMemo(() => {
    return sites
      .filter((site) => site.coordinates) // Uniquement les sites avec coordonnées
      .map((site) => ({
        id: site.id,
        position: [site.coordinates!.latitude, site.coordinates!.longitude] as [number, number],
        title: site.name,
        type: String(site.type),
        typeLabel: siteTypeLabels[site.type],
        reference: site.reference,
        city: site.address.city,
        address: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
        unitsCount: site.unitsCount,
        totalArea: site. surfaceArea,
        customerName: site.customer?.companyName || "Client inconnu",
        commercialName: site.commercial
          ? `${site.commercial.firstName} ${site.commercial.lastName}`
          : undefined,
      }));
  }, [sites]);

  const handleMarkerClick = (siteId: string) => {
    router.push(`/sites/${siteId}`);
  };

  if (markers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] border rounded-lg bg-muted/30">
        <div className="text-center space-y-2">
          <div className="text-4xl">🗺️</div>
          <p className="text-sm text-muted-foreground">
            Aucun site avec coordonnées GPS à afficher
          </p>
          <p className="text-xs text-muted-foreground">
            Ajoutez des coordonnées GPS aux sites pour les voir sur la carte
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Stats overlay */}
      <div className="absolute top-4 left-4 z-[1000] backdrop-blur-xl bg-background/90 rounded-lg border shadow-lg p-3">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{markers.length}</p>
            <p className="text-xs text-muted-foreground">Sites</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-xs text-muted-foreground">
            Cliquez sur un marker<br />pour voir les détails
          </div>
        </div>
      </div>

      <ClusterMap
        markers={markers}
        height={height}
        onMarkerClick={handleMarkerClick}
      />
    </div>
  );
}