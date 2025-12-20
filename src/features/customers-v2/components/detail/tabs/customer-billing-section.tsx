"use client";

import { Button } from "@/shared/components/shadcnui/button";
import {
  FileText,
  Clock,
  Calendar,
  Zap,
  Mail,
  Building,
  CreditCard,
  Percent,
  DollarSign,
} from "lucide-react";
import { Customer, BillingMode, InvoiceFrequency } from "../../../types/customer.types";
import {
  SectionCard,
  StatsCard,
  OptionCheckCard,
} from "@/shared/components/cards";

interface CustomerBillingSectionProps {
  customer: Customer;
}

export function CustomerBillingSection({ customer }: CustomerBillingSectionProps) {
  const getBillingModeLabel = (mode: BillingMode) => {
    const labels = {
      [BillingMode.Centralized]: "Centralisée",
      [BillingMode.PerSite]: "Par site",
      [BillingMode.DistributedByTantièmes]: "Répartition par tantièmes",
    };
    return labels[mode] || "Centralisée";
  };

  const getInvoiceFrequencyLabel = (freq: InvoiceFrequency) => {
    const labels = {
      [InvoiceFrequency.PerWorkOrder]: "Par bon de travail",
      [InvoiceFrequency.Weekly]: "Hebdomadaire",
      [InvoiceFrequency.Monthly]: "Mensuelle",
      [InvoiceFrequency.Quarterly]: "Trimestrielle",
    };
    return labels[freq] || "Par bon de travail";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Configuration de facturation</h2>
        <p className="text-muted-foreground">Paramètres et coefficients de tarification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Paramètres de facturation */}
          <SectionCard
            title="Paramètres de facturation"
            description="Configuration des factures et paiements"
            icon={FileText}
            iconColor="text-primary"
            iconBgColor="bg-primary/20"
            glowColor="primary"
            bordered={true}
          >
            {/* Grid de stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StatsCard
                icon={Building}
                label="Mode"
                value={getBillingModeLabel(customer.billingSettings.mode)}
                color="blue"
              />

              <StatsCard
                icon={Clock}
                label="Fréquence"
                value={getInvoiceFrequencyLabel(customer.billingSettings.invoiceFrequency)}
                color="purple"
              />

              {
                customer.paymentMethod && <StatsCard
                  icon={Calendar}
                  label="Délai de paiement"
                  value={`${customer.paymentMethod.days} jours`}
                  color="green"
                />
              }


              <StatsCard
                icon={Percent}
                label="Frais de retard"
                value={
                  customer.billingSettings.applyLatePaymentFees
                    ? `${customer.billingSettings.latePaymentFeePercent}%`
                    : "Désactivés"
                }
                color="orange"
              />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

            {/* Options avec checkmarks */}
            <div className="space-y-3">
              <OptionCheckCard
                label="Génération automatique des factures"
                checked={customer.billingSettings.autoGenerateInvoices}
                icon={customer.billingSettings.autoGenerateInvoices ? Zap : undefined}
              />

              <OptionCheckCard
                label="Notifications par email"
                checked={customer.billingSettings.sendEmailNotifications}
                icon={customer.billingSettings.sendEmailNotifications ? Mail : undefined}
              />

              <OptionCheckCard
                label="Application des frais de retard"
                checked={customer.billingSettings.applyLatePaymentFees}
                badge={
                  customer.billingSettings.applyLatePaymentFees
                    ? {
                      label: `${customer.billingSettings.latePaymentFeePercent}%`,
                      variant: "outline",
                      className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
                    }
                    : undefined
                }
              />
            </div>
          </SectionCard>

          {/* Coefficients de tarification */}
          <SectionCard
            title="Coefficients de tarification"
            description="Multiplicateurs appliqués aux prix de base"
            icon={Percent}
            iconColor="text-indigo-600 dark:text-indigo-400"
            iconBgColor="bg-indigo-500/20"
            glowColor="indigo"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.pricingCoefficients.laborCoefficient !== undefined && (
                <CoefficientCard
                  label="Main d'œuvre"
                  value={customer.pricingCoefficients.laborCoefficient}
                  color="blue"
                />
              )}
              {customer.pricingCoefficients.materialCoefficient !== undefined && (
                <CoefficientCard
                  label="Matériaux"
                  value={customer.pricingCoefficients.materialCoefficient}
                  color="green"
                />
              )}
              {customer.pricingCoefficients.equipmentCoefficient !== undefined && (
                <CoefficientCard
                  label="Équipement"
                  value={customer.pricingCoefficients.equipmentCoefficient}
                  color="purple"
                />
              )}
              {customer.pricingCoefficients.subcontractorCoefficient !== undefined && (
                <CoefficientCard
                  label="Sous-traitance"
                  value={customer.pricingCoefficients.subcontractorCoefficient}
                  color="orange"
                />
              )}
            </div>
          </SectionCard>
        </div>

        {/* Colonne latérale - 1/3 */}
        <div className="space-y-6">
          {/* Moyen de paiement */}
          {customer.paymentMethod && (
            <SectionCard
              title="Moyen de paiement"
              icon={CreditCard}
              iconColor="text-primary"
              iconBgColor="bg-primary/20"
              glowColor="primary"
              bordered={true}
            >
              <div className="p-5 rounded-xl backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/5 border border-primary/20">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-bold text-xl">{customer.paymentMethod.name}</p>
                </div>
                <p className="text-sm text-muted-foreground pl-14">{customer.paymentMethod.terms}</p>
              </div>
            </SectionCard>
          )}

          {/* Actions rapides */}
          <SectionCard
            title="Actions rapides"
            icon={Zap}
            iconColor="text-green-600 dark:text-green-400"
            iconBgColor="bg-green-500/20"
            glowColor="green"
          >
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start backdrop-blur-sm" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Générer une facture
              </Button>
              <Button variant="outline" className="w-full justify-start backdrop-blur-sm" size="lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Voir l'historique
              </Button>
              <Button variant="outline" className="w-full justify-start backdrop-blur-sm" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Envoyer un rappel
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// Composant helper pour les coefficients
function CoefficientCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, { bg: string; border: string }> = {
    blue: {
      bg: "from-blue-500/10 to-transparent",
      border: "border-blue-500/20 hover:border-blue-500/40",
    },
    green: {
      bg: "from-green-500/10 to-transparent",
      border: "border-green-500/20 hover:border-green-500/40",
    },
    purple: {
      bg: "from-purple-500/10 to-transparent",
      border: "border-purple-500/20 hover:border-purple-500/40",
    },
    orange: {
      bg: "from-orange-500/10 to-transparent",
      border: "border-orange-500/20 hover:border-orange-500/40",
    },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`p-5 rounded-lg backdrop-blur-sm bg-gradient-to-br border transition-all ${colors!.bg} ${colors!.border}`}
    >
      <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
      <p className="text-2xl font-bold font-mono">×{value}</p>
    </div>
  );
}