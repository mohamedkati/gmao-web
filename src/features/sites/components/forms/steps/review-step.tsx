"use client";

import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "../../../schemas/site-form.schema";
import { FormCard } from "@/shared/components/forms";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
  Building,
  MapPin,
  Building2,
  Users,
  Key,
  CheckCircle2,
  Edit,
  Mail,
  Hash,
  Navigation,
} from "lucide-react";
import { SiteType } from "../../../types/site.types";

interface ReviewStepProps {
  form: UseFormReturn<SiteFormData>;
  onEditStep: (stepIndex: number) => void;
}

const siteTypeLabels: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "Immeuble résidentiel",
  [SiteType.CommercialBuilding]: "Bâtiment commercial",
  [SiteType.MixedUse]: "Usage mixte",
  [SiteType.IndustrialFacility]: "Installation industrielle",
  [SiteType.Office]: "Bureau",
  [SiteType.Warehouse]: "Entrepôt",
  [SiteType.RetailStore]: "Magasin",
  [SiteType.Hotel]: "Hôtel",
  [SiteType.Hospital]: "Hôpital",
  [SiteType.School]: "École",
  [SiteType.GovernmentBuilding]: "Bâtiment gouvernemental",
};

export function ReviewStep({ form, onEditStep }: ReviewStepProps) {
  const data = form.watch();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Révision finale</h3>
              <p className="text-sm text-muted-foreground">
                Vérifiez les informations avant de valider
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Informations générales */}
      <ReviewSection
        title="Informations générales"
        icon={Building}
        onEdit={() => onEditStep(0)}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold">{data.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {data.reference}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {siteTypeLabels[data.type]}
                  </Badge>
                </div>
              </div>
            </div>

            {data.comment && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
                <p className="text-sm text-muted-foreground">{data.comment}</p>
              </div>
            )}
          </div>
        </div>
      </ReviewSection>

      {/* Section 2: Adresses */}
      <ReviewSection title="Adresses" icon={MapPin} onEdit={() => onEditStep(1)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Adresse principale */}
          <AddressCard
            title="Adresse principale"
            address={data.address}
            color="blue"
            icon={Home}
          />

          {/* Adresse facturation */}
          <AddressCard
            title="Adresse de facturation"
            address={data.billingAddress}
            color="orange"
            icon={FileText}
          />
        </div>

        {/* Coordonnées GPS */}
        {data.coordinates && (
          <div className="mt-4 p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <Navigation className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-sm">Position GPS définie</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {data.coordinates.latitude.toFixed(6)},{" "}
                  {data.coordinates.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </ReviewSection>

      {/* Section 3: Bâtiment */}
      <ReviewSection
        title="Informations bâtiment"
        icon={Building2}
        onEdit={() => onEditStep(2)}
      >
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.buildingYear && (
              <InfoCard
                label="Année"
                value={data.buildingYear.toString()}
                icon={Calendar}
                color="indigo"
              />
            )}
            {data.totalArea && (
              <InfoCard
                label="Surface"
                value={`${data.totalArea.toLocaleString()} m²`}
                icon={Maximize}
                color="purple"
              />
            )}
            {data.floorsCount && (
              <InfoCard
                label="Étages"
                value={data.floorsCount.toString()}
                icon={Layers}
                color="blue"
              />
            )}
            {data.unitsCount && (
              <InfoCard
                label="Unités"
                value={data.unitsCount.toString()}
                icon={Home}
                color="green"
              />
            )}
          </div>

          {/* Infos légales */}
          {(data.siren || data.siret) && (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-muted/30 border">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <p className="font-semibold text-sm">Informations légales</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {data.siren && (
                  <div>
                    <p className="text-muted-foreground">SIREN</p>
                    <p className="font-mono font-medium">{data.siren}</p>
                  </div>
                )}
                {data.siret && (
                  <div>
                    <p className="text-muted-foreground">SIRET</p>
                    <p className="font-mono font-medium">{data.siret}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Emails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg backdrop-blur-sm bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <p className="font-semibold text-sm">Email principal</p>
              </div>
              <p className="text-sm font-mono">{data.mainMailAddress}</p>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-sm bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <p className="font-semibold text-sm">Email facturation</p>
              </div>
              <p className="text-sm font-mono">{data.invoiceMailAddress}</p>
            </div>
          </div>
        </div>
      </ReviewSection>

      {/* Section 4: Équipe */}
      <ReviewSection
        title="Équipe assignée"
        icon={Users}
        onEdit={() => onEditStep(3)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.commercialId && (
            <TeamMemberRow label="Commercial" icon={Briefcase} />
          )}
          {data.operationsManagerId && (
            <TeamMemberRow label="Resp. d'exploitation" icon={UserCheck} />
          )}
          {data.sectorManagerId && (
            <TeamMemberRow label="Resp. de secteur" icon={Users} />
          )}
          {data.technician1Id && (
            <TeamMemberRow label="Technicien principal" icon={Wrench} />
          )}
          {data.technician2Id && (
            <TeamMemberRow label="Technicien secondaire" icon={Wrench} />
          )}
        </div>

        {!data.commercialId &&
          !data.operationsManagerId &&
          !data.sectorManagerId &&
          !data.technician1Id &&
          !data.technician2Id && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucun membre d'équipe assigné</p>
            </div>
          )}
      </ReviewSection>

      {/* Section 5: Accès */}
      <ReviewSection
        title="Informations d'accès"
        icon={Key}
        onEdit={() => onEditStep(4)}
      >
        <div className="space-y-3">
          {data.siteAccessInfo.accessCode1 && (
            <AccessRow
              label="Code d'accès principal"
              value="Configuré"
              icon={Lock}
            />
          )}
          {data.siteAccessInfo.accessCode2 && (
            <AccessRow
              label="Code d'accès secondaire"
              value="Configuré"
              icon={Lock}
            />
          )}
          {data.siteAccessInfo.keyBoxSite && (
            <AccessRow
              label="Boîte à clés"
              value={data.siteAccessInfo.keyBoxSite}
              icon={Key}
            />
          )}
          {data.siteAccessInfo.workingHours && (
            <AccessRow
              label="Horaires"
              value={data.siteAccessInfo.workingHours}
              icon={Clock}
            />
          )}
          {data.siteAccessInfo.accessComment && (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-muted/30 border">
              <p className="font-semibold text-sm mb-2">Commentaire d'accès</p>
              <p className="text-sm text-muted-foreground">
                {data.siteAccessInfo.accessComment}
              </p>
            </div>
          )}

          {!data.siteAccessInfo.accessCode1 &&
            !data.siteAccessInfo.accessCode2 &&
            !data.siteAccessInfo.keyBoxSite &&
            !data.siteAccessInfo.workingHours &&
            !data.siteAccessInfo.accessComment && (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune information d'accès définie</p>
              </div>
            )}
        </div>
      </ReviewSection>
    </div>
  );
}

// Composants helpers
function ReviewSection({
  title,
  icon: Icon,
  onEdit,
  children,
}: {
  title: string;
  icon: any;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <FormCard>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>
      {children}
    </FormCard>
  );
}

function AddressCard({
  title,
  address,
  color,
  icon: Icon,
}: {
  title: string;
  address: any;
  color: string;
  icon: any;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20",
  };

  return (
    <div
      className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4" />
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <div className="text-sm space-y-1 text-muted-foreground">
        {address.firstAddressLine && <p>{address.firstAddressLine}</p>}
        {address.secondAddressLine && <p>{address.secondAddressLine}</p>}
        {address.street && <p>{address.street}</p>}
        {(address.postalCode || address.city) && (
          <p className="font-medium text-foreground">
            {address.postalCode} {address.city}
          </p>
        )}
        {address.country && <p>{address.country}</p>}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: any;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: "from-indigo-500/10 to-transparent border-indigo-500/20",
    purple: "from-purple-500/10 to-transparent border-purple-500/20",
    blue: "from-blue-500/10 to-transparent border-blue-500/20",
    green: "from-green-500/10 to-transparent border-green-500/20",
  };

  return (
    <div
      className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function TeamMemberRow({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">Assigné</p>
      </div>
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
    </div>
  );
}

function AccessRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}

// Imports nécessaires pour les icons
import { Home, FileText, Calendar, Maximize, Layers, ShieldCheck, Briefcase, UserCheck, Wrench, Lock, Clock } from "lucide-react";