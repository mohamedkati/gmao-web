// src/features/sites/components/site-card.tsx

"use client";

import { useRouter } from "next/navigation";
import { Site, SiteType } from "../../types/site.types";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
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
  FileText,
  Users,
  MoreVertical,
  Trash2,
} from "lucide-react";

interface SiteCardProps {
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

const siteTypeColors: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  [SiteType.CommercialBuilding]: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
  [SiteType.MixedUse]: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  [SiteType.IndustrialFacility]: "from-gray-500/10 to-slate-500/10 border-gray-500/20",
  [SiteType.Office]: "from-green-500/10 to-emerald-500/10 border-green-500/20",
  [SiteType.Warehouse]: "from-red-500/10 to-rose-500/10 border-red-500/20",
  [SiteType.RetailStore]: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
  [SiteType.Hotel]: "from-pink-500/10 to-rose-500/10 border-pink-500/20",
  [SiteType.Hospital]: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20",
  [SiteType.School]: "from-violet-500/10 to-purple-500/10 border-violet-500/20",
  [SiteType.GovernmentBuilding]: "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
};

export function SiteCard({ site }: SiteCardProps) {
  const router = useRouter();

  const assetsCount = site.assets?.length || 0;
  const commercialName = site.commercial
    ? `${site.commercial.firstName} ${site.commercial.lastName}`
    : "Non assigné";

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Card */}
      <div
        className={`relative backdrop-blur-xl bg-gradient-to-br ${siteTypeColors[site.type]} border rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
        onClick={() => router.push(`/sites/${site.id}`)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-3xl">{siteTypeIcons[site.type]}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold truncate">{site.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs font-mono">
                  {site.reference}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {siteTypeLabels[site.type]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                router.push(`/sites/${site.id}`);
              }}>
                <Eye className="mr-2 h-4 w-4" />
                Voir détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                router.push(`/sites/${site.id}/edit`);
              }}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Users className="mr-2 h-4 w-4" />
                Équipe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Wrench className="mr-2 h-4 w-4" />
                Équipements
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

        {/* Address & Client */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4 shrink-0" />
            <span className="truncate">{site.customer?.companyName || "Client inconnu"}</span>
          </div>
          {commercialName !== "Non assigné" && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4 shrink-0" />
              <span className="truncate">{commercialName}</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 text-center">
          {site.unitsCount && (
            <StatItem icon={Layers} value={site.unitsCount} label="Units" />
          )}
          {site. surfaceArea && (
            <StatItem
              icon={Maximize}
              value={`${site. surfaceArea.toLocaleString()}`}
              label="m²"
            />
          )}
          {site.buildingYear && (
            <StatItem icon={Calendar} value={site.buildingYear} label="Année" />
          )}
          {assetsCount > 0 && (
            <StatItem icon={Wrench} value={assetsCount} label="Assets" />
          )}
        </div>

        {/* Actions Footer */}
        <div className="mt-4 pt-4 border-t flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/sites/${site.id}`);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            Détails
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/sites/${site.id}/edit`);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper Component
function StatItem({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string | number;
  label: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-center mb-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}