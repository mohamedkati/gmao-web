// src/features/customers/components/customer-details.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Separator } from "@/shared/components/shadcnui/separator";
import {
  MapPin,
  Edit,
  CreditCard,
  Calculator,
  Users,
} from "lucide-react";
import {
  customerTypeLabels,
  billingModeLabels,
  invoiceFrequencyLabels,
  getCustomerTypeColor,
} from "../../utils/customer.utils";
import { useCustomerStore } from "../../stores/customer.store";
import { CustomerContactsList } from "./customer-contacts-list";
import { CustomerBudgetsList } from "./customer-budgets-list";
import { useCustomer } from "../../hooks/user-customers.query";

interface CustomerDetailsProps {
  // customer: Customer;
}

export function CustomerDetails({ }: CustomerDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { openDrawer, selectedCustomerId } = useCustomerStore();

  const { data: customer, isLoading } = useCustomer(selectedCustomerId || '');

  if (isLoading)
    return <DrawerSkeleton />

  if (!isLoading && !customer) {
    return <CustomerNotFound />
  }

  if (!customer) {
    return <CustomerNotFound />
  }


  const handleEdit = () => {
    openDrawer("edit", customer.id);
  };


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold">{customer.companyName}</h2>
              <Badge className={getCustomerTypeColor(customer.type)}>
                {customerTypeLabels[customer.type]}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Réf: {customer.reference}</span>
              {customer.siren && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span>SIREN: {customer.siren}</span>
                </>
              )}
            </div>
          </div>
          <Button size="sm" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="contacts">
              Contacts ({customer.contacts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="budgets">
              Budgets ({customer.maintenanceBudgets?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Adresse de facturation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic space-y-1 text-sm">
                    {customer.invoiceAddress.firstAddressLine && (
                      <p className="text-muted-foreground">
                        {customer.invoiceAddress.firstAddressLine}
                      </p>
                    )}
                    {customer.invoiceAddress.secondAddressLine && (
                      <p className="text-muted-foreground">
                        {customer.invoiceAddress.secondAddressLine}
                      </p>
                    )}
                    <p className="font-medium">{customer.invoiceAddress.street}</p>
                    <p>
                      {customer.invoiceAddress.postalCode} {customer.invoiceAddress.city}
                    </p>
                    <p className="text-muted-foreground">
                      {customer.invoiceAddress.country}
                    </p>
                  </address>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Adresse postale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic space-y-1 text-sm">
                    {customer.mailingAddress.firstAddressLine && (
                      <p className="text-muted-foreground">
                        {customer.mailingAddress.firstAddressLine}
                      </p>
                    )}
                    {customer.mailingAddress.secondAddressLine && (
                      <p className="text-muted-foreground">
                        {customer.mailingAddress.secondAddressLine}
                      </p>
                    )}
                    <p className="font-medium">{customer.mailingAddress.street}</p>
                    <p>
                      {customer.mailingAddress.postalCode} {customer.mailingAddress.city}
                    </p>
                    <p className="text-muted-foreground">
                      {customer.mailingAddress.country}
                    </p>
                  </address>
                </CardContent>
              </Card>
            </div>

            {/* Commercial Info */}
            {customer.commercialName && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Commercial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{customer.commercialName}</p>
                </CardContent>
              </Card>
            )}

            {/* Pricing Coefficients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Coefficients de tarification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Main d'œuvre</span>
                    <span className="font-mono font-medium">
                      {customer.pricingCoefficients.laborCoefficient}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Matériaux</span>
                    <span className="font-mono font-medium">
                      {customer.pricingCoefficients.materialCoefficient}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Équipement</span>
                    <span className="font-mono font-medium">
                      {customer.pricingCoefficients.equipmentCoefficient}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sous-traitance</span>
                    <span className="font-mono font-medium">
                      {customer.pricingCoefficients.subcontractorCoefficient}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Paramètres de facturation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mode</span>
                  <span className="font-medium">
                    {billingModeLabels[customer.billingSettings.mode]}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fréquence</span>
                  <span className="font-medium">
                    {invoiceFrequencyLabels[customer.billingSettings.invoiceFrequency]}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Délai de paiement</span>
                  <span className="font-medium">
                    {customer.billingSettings.paymentTermsDays} jours
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Génération auto</span>
                  <Badge variant={customer.billingSettings.autoGenerateInvoices ? "default" : "outline"}>
                    {customer.billingSettings.autoGenerateInvoices ? "Oui" : "Non"}
                  </Badge>
                </div>
                {customer.billingSettings.applyLatePaymentFees && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pénalités de retard</span>
                      <span className="font-medium">
                        {customer.billingSettings.latePaymentFeePercent}%
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Comment */}
            {customer.comment && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Commentaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{customer.comment}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="mt-6">
            <CustomerContactsList />
          </TabsContent>

          {/* Budgets Tab */}
          <TabsContent value="budgets" className="mt-6">
            <CustomerBudgetsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function DrawerSkeleton() {
  return (
    <div className="space-y-4 p-6 animate-pulse">
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
    </div>
  );

}

function CustomerNotFound() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">Echech de récupération des informations du client !!</p>
        <p className="text-sm text-muted-foreground">
          Veuillez fermer et reouvrir cette fenetre
        </p>
      </CardContent>
    </Card>
  )
}