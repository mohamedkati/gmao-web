// src/features/sites/components/details/site-overview-tab.tsx

"use client";

import { Site } from "../../../types/site.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Separator } from "@/shared/components/shadcnui/separator";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import {
  MapPin,
  Building,
  Mail,
  Phone,
  Calendar,
  Maximize,
  Users,
  Key,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Map,
  Navigation,
} from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/shared/lib/utils/cn";

const MapView = dynamic(
  () => import("@/shared/components/maps/map-view").then((mod) => mod.MapView),
  { ssr: false }
);

interface SiteOverviewTabProps {
  site: Site;
}

export function SiteOverviewTab({ site }: SiteOverviewTabProps) {
  const currentYear = new Date().getFullYear();
  const buildingAge = site.buildingYear ? currentYear - site.buildingYear : null;

  return (
    <div className="space-y-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <InfoCard
            title="Informations générales"
            icon={Building}
            description="Détails du site"
          >
            <div className="space-y-4">
              <InfoRow label="Référence" value={site.reference} />
              <InfoRow label="Nom" value={site.name} />
              <InfoRow
                label="Type"
                value={
                  <Badge variant="secondary">
                    {site.type === 1 ? "Résidentiel" : "Commercial"}
                  </Badge>
                }
              />
              <InfoRow
                label="Client"
                value={site.customer?.companyName || "Non assigné"}
              />
              {site.comment && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-2">Commentaire</p>
                    <p className="text-sm text-muted-foreground">{site.comment}</p>
                  </div>
                </>
              )}
            </div>
          </InfoCard>

          {/* Adresses */}
          <InfoCard
            title="Adresses"
            icon={MapPin}
            description="Adresse principale et facturation"
          >
            <div className="space-y-6">
              {/* Adresse principale */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold">Adresse principale</h4>
                </div>
                <div className="pl-10 space-y-1 text-sm">
                  {site.address.firstAddressLine && (
                    <p className="text-muted-foreground">{site.address.firstAddressLine}</p>
                  )}
                  {site.address.secondAddressLine && (
                    <p className="text-muted-foreground">{site.address.secondAddressLine}</p>
                  )}
                  <p className="font-medium">{site.address.street}</p>
                  <p className="text-muted-foreground">
                    {site.address.postalCode} {site.address.city}
                  </p>
                  <p className="text-muted-foreground">{site.address.country}</p>
                </div>
              </div>

              <Separator />

              {/* Adresse de facturation */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="font-semibold">Adresse de facturation</h4>
                </div>
                <div className="pl-10 space-y-1 text-sm">
                  {site.billingAddress.firstAddressLine && (
                    <p className="text-muted-foreground">
                      {site.billingAddress.firstAddressLine}
                    </p>
                  )}
                  {site.billingAddress.secondAddressLine && (
                    <p className="text-muted-foreground">
                      {site.billingAddress.secondAddressLine}
                    </p>
                  )}
                  <p className="font-medium">{site.billingAddress.street}</p>
                  <p className="text-muted-foreground">
                    {site.billingAddress.postalCode} {site.billingAddress.city}
                  </p>
                  <p className="text-muted-foreground">{site.billingAddress.country}</p>
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Informations du bâtiment */}
          {(site.buildingYear || site. surfaceArea || site.floorsCount || site.unitsCount) && (
            <InfoCard
              title="Informations du bâtiment"
              icon={Building}
              description="Caractéristiques techniques"
            >
              <div className="grid grid-cols-2 gap-4">
                {site.buildingYear && (
                  <MetricCard
                    icon={Calendar}
                    label="Année de construction"
                    value={site.buildingYear}
                    secondary={buildingAge ? `${buildingAge} ans` : undefined}
                  />
                )}
                {site. surfaceArea && (
                  <MetricCard
                    icon={Maximize}
                    label="Surface totale"
                    value={`${site. surfaceArea.toLocaleString()} m²`}
                  />
                )}
                {site.floorsCount && (
                  <MetricCard
                    icon={Building}
                    label="Nombre d'étages"
                    value={site.floorsCount}
                  />
                )}
                {site.unitsCount && (
                  <MetricCard
                    icon={Building}
                    label="Nombre d'unités"
                    value={site.unitsCount}
                  />
                )}
              </div>

              {(site.siren || site.siret) && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Informations légales</h4>
                    {site.siren && (
                      <InfoRow label="SIREN" value={site.siren} mono />
                    )}
                    {site.siret && (
                      <InfoRow label="SIRET" value={site.siret} mono />
                    )}
                  </div>
                </>
              )}
            </InfoCard>
          )}

          {/* Contact */}
          {(site.mainMailAddress || site.invoiceMailAddress) && (
            <InfoCard
              title="Contact"
              icon={Mail}
              description="Coordonnées de contact"
            >
              <div className="space-y-3">
                {site.mainMailAddress && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email principal</p>
                      <a
                        href={`mailto:${site.mainMailAddress}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {site.mainMailAddress}
                      </a>
                    </div>
                  </div>
                )}
                {site.invoiceMailAddress && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email facturation</p>
                       <a
                        href={`mailto:${site.invoiceMailAddress}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {site.invoiceMailAddress}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          )}
        </div>

        {/* Right Column - Secondary Info */}
        <div className="space-y-6">
          {/* Carte GPS */}
          {site.coordinates && (
            <InfoCard title="Localisation" icon={Map} description="Position GPS">
              <div className="space-y-4">
                <div className="h-[250px] rounded-lg overflow-hidden border">
                  <MapView
                    center={site.coordinates}
                    marker={site.coordinates}
                    onMapClick={() => {}}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    <span>Lat: {site.coordinates.latitude.toFixed(6)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    <span>Lng: {site.coordinates.longitude.toFixed(6)}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  <Map className="mr-2 h-4 w-4" />
                  Ouvrir dans Maps
                </Button>
              </div>
            </InfoCard>
          )}

          {/* Équipe assignée */}
          <InfoCard title="Équipe assignée" icon={Users} description="Membres de l'équipe">
            <div className="space-y-3">
              {site.commercial && (
                <TeamMember
                  name={`${site.commercial.firstName} ${site.commercial.lastName}`}
                  role="Commercial"
                  email={site.commercial.email}
                />
              )}
              {site.operationsManager && (
                <TeamMember
                  name={`${site.operationsManager.firstName} ${site.operationsManager.lastName}`}
                  role="Responsable opérations"
                  email={site.operationsManager.email}
                />
              )}
              {site.sectorManager && (
                <TeamMember
                  name={`${site.sectorManager.firstName} ${site.sectorManager.lastName}`}
                  role="Responsable secteur"
                  email={site.sectorManager.email}
                />
              )}
              {site.technician1 && (
                <TeamMember
                  name={`${site.technician1.firstName} ${site.technician1.lastName}`}
                  role="Technicien"
                  email={site.technician1.email}
                />
              )}
              {!site.commercial &&
                !site.operationsManager &&
                !site.sectorManager &&
                !site.technician1 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucune équipe assignée
                  </p>
                )}
            </div>
          </InfoCard>

          {/* Accès */}
          {site.siteAccessInfo && (
            <InfoCard title="Informations d'accès" icon={Key} description="Codes et horaires">
              <div className="space-y-4">
                {site.siteAccessInfo.accessCode1 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Code d'accès 1</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 rounded-lg bg-muted font-mono text-sm">
                        ••••
                      </code>
                      <Button variant="outline" size="sm">
                        Révéler
                      </Button>
                    </div>
                  </div>
                )}
                {site.siteAccessInfo.workingHours && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Horaires</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{site.siteAccessInfo.workingHours}</span>
                    </div>
                  </div>
                )}
                {site.siteAccessInfo.keyBoxSite && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Boîte à clés</p>
                    <p className="text-sm px-3 py-2 rounded-lg bg-muted">
                      {site.siteAccessInfo.keyBoxSite}
                    </p>
                  </div>
                )}
                {site.siteAccessInfo.accessComment && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Commentaire</p>
                    <p className="text-sm px-3 py-2 rounded-lg bg-muted">
                      {site.siteAccessInfo.accessComment}
                    </p>
                  </div>
                )}
              </div>
            </InfoCard>
          )}

          {/* Quick Stats */}
          <InfoCard title="Statistiques" icon={TrendingUp} description="Résumé rapide">
            <div className="space-y-3">
              <QuickStat
                label="Taux d'occupation"
                value="87%"
                trend={2.3}
                status="success"
              />
              <QuickStat
                label="Tâches en cours"
                value="5"
                status="warning"
              />
              <QuickStat
                label="Dernière intervention"
                value="Il y a 3 jours"
                status="info"
              />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function InfoCard({
  title,
  icon: Icon,
  description,
  children,
}: {
  title: string;
  icon: any;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-card/50 border-border/50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className={cn("text-sm font-medium text-right", mono && "font-mono")}>
        {value}
      </span>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  secondary,
}: {
  icon: any;
  label: string;
  value: string | number;
  secondary?: string;
}) {
  return (
    <div className="p-4 rounded-lg border bg-muted/30">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {secondary && <p className="text-xs text-muted-foreground mt-1">{secondary}</p>}
    </div>
  );
}

function TeamMember({
  name,
  role,
  email,
}: {
  name: string;
  role: string;
  email: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="text-xs">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <a href={`mailto:${email}`}>
          <Mail className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}

function QuickStat({
  label,
  value,
  trend,
  status = "info",
}: {
  label: string;
  value: string;
  trend?: number;
  status?: "success" | "warning" | "info";
}) {
  const statusColors = {
    success: "text-green-600 dark:text-green-400",
    warning: "text-orange-600 dark:text-orange-400",
    info: "text-blue-600 dark:text-blue-400",
  };

  const StatusIcon =
    status === "success"
      ? CheckCircle2
      : status === "warning"
      ? AlertCircle
      : TrendingUp;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        <StatusIcon className={cn("h-4 w-4", statusColors[status])} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{value}</p>
        {trend !== undefined && (
          <p
            className={cn(
              "text-xs",
              trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </p>
        )}
      </div>
    </div>
  );
}