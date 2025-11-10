"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Separator } from "@/shared/components/shadcnui/separator";
import {
  Building2,
  MapPin,
  Users,
  CreditCard,
  FileText,
  Edit,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { PropertyGroup } from "../types/property-group.types";
import { usePropertyGroupStore } from "../store/property-group.store";
import {
  propertyGroupTypeLabels,
  propertyGroupStatusLabels,
  legalFormLabels,
  getStatusColor,
  formatCurrency,
  formatDate,
  isContractExpiringSoon,
} from "../utils/property-groups.utils";
import { PropertyGroupContactsList } from "./property-group-contacts-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";

interface PropertyGroupDetailsProps {
  propertyGroup: PropertyGroup;
}

export function PropertyGroupDetails({ propertyGroup }: PropertyGroupDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { openDrawer } = usePropertyGroupStore();

  const contractExpiring = isContractExpiringSoon(propertyGroup.frameworkContractEndDate);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{propertyGroup.name}</h2>
              <Badge className={getStatusColor(propertyGroup.status)}>
                {propertyGroupStatusLabels[propertyGroup.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Réf: {propertyGroup.reference}
            </p>
            {propertyGroup.legalName && (
              <p className="text-sm text-muted-foreground">
                {propertyGroup.legalName}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDrawer("edit", propertyGroup)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Clients</p>
            <p className="text-2xl font-bold">{propertyGroup.totalCustomers}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Sites</p>
            <p className="text-2xl font-bold">{propertyGroup.totalSites}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Unités</p>
            <p className="text-2xl font-bold">{propertyGroup.totalUnits}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">CA Annuel</p>
            <p className="text-2xl font-bold">
              {formatCurrency(propertyGroup.totalAnnualRevenue)}
            </p>
          </div>
        </div>

        {contractExpiring && (
          <Alert variant="destructive" className="mt-4">
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Le contrat cadre expire le {formatDate(propertyGroup.frameworkContractEndDate)}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 px-6">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Facturation
            </TabsTrigger>
            <TabsTrigger
              value="contract"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Contrat
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="p-6 space-y-6 mt-0">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="text-sm">{propertyGroupTypeLabels[propertyGroup.type]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Forme juridique</p>
                      <p className="text-sm">
                        {propertyGroup.legalForm
                          ? legalFormLabels[propertyGroup.legalForm]
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">SIREN</p>
                      <p className="text-sm">{propertyGroup.siren || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">N° TVA</p>
                      <p className="text-sm">{propertyGroup.vatNumber || "-"}</p>
                    </div>
                  </div>
                  {propertyGroup.description && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Description
                        </p>
                        <p className="text-sm">{propertyGroup.description}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Address */}
              {propertyGroup.headquartersAddress && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Siège social
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <address className="text-sm not-italic space-y-1">
                      {propertyGroup.headquartersAddress.firstAddressLine && (
                        <p>{propertyGroup.headquartersAddress.firstAddressLine}</p>
                      )}
                      {propertyGroup.headquartersAddress.secondAddressLine && (
                        <p>{propertyGroup.headquartersAddress.secondAddressLine}</p>
                      )}
                      <p>{propertyGroup.headquartersAddress.street}</p>
                      <p>
                        {propertyGroup.headquartersAddress.postalCode}{" "}
                        {propertyGroup.headquartersAddress.city}
                      </p>
                      <p>{propertyGroup.headquartersAddress.country}</p>
                    </address>
                  </CardContent>
                </Card>
              )}

              {/* Main Contact */}
              {propertyGroup.mainContactName && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Contact principal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">{propertyGroup.mainContactName}</p>
                      {propertyGroup.mainContactPosition && (
                        <p className="text-sm text-muted-foreground">
                          {propertyGroup.mainContactPosition}
                        </p>
                      )}
                    </div>
                    {propertyGroup.mainContactEmail && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${propertyGroup.mainContactEmail}`}
                          className="text-primary hover:underline"
                        >
                          {propertyGroup.mainContactEmail}
                        </a>
                      </div>
                    )}
                    {propertyGroup.mainContactPhone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${propertyGroup.mainContactPhone}`}
                          className="text-primary hover:underline"
                        >
                          {propertyGroup.mainContactPhone}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Statistiques
                  </CardTitle>
                  {propertyGroup.lastStatisticsUpdateDate && (
                    <CardDescription>
                      Dernière mise à jour: {formatDate(propertyGroup.lastStatisticsUpdateDate)}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Clients</p>
                      <p className="text-2xl font-bold">{propertyGroup.totalCustomers}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Sites</p>
                      <p className="text-2xl font-bold">{propertyGroup.totalSites}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Unités</p>
                      <p className="text-2xl font-bold">{propertyGroup.totalUnits}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">CA Annuel</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(propertyGroup.totalAnnualRevenue)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {(propertyGroup.commercialNotes || propertyGroup.internalNotes) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {propertyGroup.commercialNotes && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Notes commerciales
                        </p>
                        <p className="text-sm whitespace-pre-wrap">
                          {propertyGroup.commercialNotes}
                        </p>
                      </div>
                    )}
                    {propertyGroup.internalNotes && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Notes internes
                        </p>
                        <p className="text-sm whitespace-pre-wrap">
                          {propertyGroup.internalNotes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="p-6 mt-0">
              <PropertyGroupContactsList propertyGroupId={propertyGroup.id} />
            </TabsContent>

            <TabsContent value="billing" className="p-6 space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Paramètres de facturation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Facturation consolidée
                      </p>
                      <p className="text-sm">
                        {propertyGroup.consolidatedBilling ? "Oui" : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Délai de paiement
                      </p>
                      <p className="text-sm">{propertyGroup.paymentTermsDays} jours</p>
                    </div>
                    {propertyGroup.volumeDiscountPercent && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Remise volume
                        </p>
                        <p className="text-sm">{propertyGroup.volumeDiscountPercent}%</p>
                      </div>
                    )}
                    {propertyGroup.preferredPaymentMethod && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Mode de paiement préféré
                        </p>
                        <p className="text-sm">{propertyGroup.preferredPaymentMethod}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {propertyGroup.groupPricingCoefficients && (
                <Card>
                  <CardHeader>
                    <CardTitle>Coefficients de tarification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Main d'œuvre
                        </p>
                        <p className="text-sm">
                          {propertyGroup.groupPricingCoefficients.laborCoefficient}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Matériaux</p>
                        <p className="text-sm">
                          {propertyGroup.groupPricingCoefficients.materialCoefficient}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Équipement</p>
                        <p className="text-sm">
                          {propertyGroup.groupPricingCoefficients.equipmentCoefficient}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Sous-traitance
                        </p>
                        <p className="text-sm">
                          {propertyGroup.groupPricingCoefficients.subcontractorCoefficient}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contract" className="p-6 space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contrat cadre
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {propertyGroup.frameworkContractReference ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Référence
                          </p>
                          <p className="text-sm">
                            {propertyGroup.frameworkContractReference}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Reconduction auto
                          </p>
                          <p className="text-sm">
                            {propertyGroup.autoRenewalFrameworkContract ? "Oui" : "Non"}
                          </p>
                        </div>
                        {propertyGroup.frameworkContractStartDate && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Date de début
                            </p>
                            <p className="text-sm">
                              {formatDate(propertyGroup.frameworkContractStartDate)}
                            </p>
                          </div>
                        )}
                        {propertyGroup.frameworkContractEndDate && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Date de fin
                            </p>
                            <p className="text-sm">
                              {formatDate(propertyGroup.frameworkContractEndDate)}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Aucun contrat cadre n'est configuré pour ce groupe.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}