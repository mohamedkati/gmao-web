"use client";

import { UseFormReturn } from "react-hook-form";
import { FormCard } from "@/shared/components/forms";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  CheckCircle2,
  Building,
  MapPin,
  ShieldCheck,
  CreditCard,
  Percent,
  Edit,
  Users2,
  Briefcase,
  User,
  Home,
  FileText,
  Clock,
  Calendar,
  Mail,
  Zap,
  AlertCircle,
} from "lucide-react";
import { CustomerType, BillingMode, InvoiceFrequency, CustomerFormData } from "../../types/customer.types";
import { getPaymentMethodByIdQuery } from "@/shared/queries/global-business/global.queries";

interface ReviewStepProps {
  form: UseFormReturn<CustomerFormData>;
  onEditStep: (step: number) => void;
}

export function ReviewStep({ form, onEditStep }: ReviewStepProps) {
  const data = form.watch();

  const{data:payment,isFetching} = getPaymentMethodByIdQuery(data.paymentMethodId);
  
  const getTypeIcon = (type: CustomerType) => {
    const icons = {
      [CustomerType.PropertyManager]: Building,
      [CustomerType.Syndic]: Users2,
      [CustomerType.Corporate]: Briefcase,
      [CustomerType.Individual]: User,
      [CustomerType.Government]: Building,
    };
    return icons[type] || Building;
  };

  const getTypeLabel = (type: CustomerType) => {
    const labels = {
      [CustomerType.PropertyManager]: "Gestionnaire immobilier",
      [CustomerType.Syndic]: "Syndic de copropriété",
      [CustomerType.Corporate]: "Entreprise",
      [CustomerType.Individual]: "Particulier",
      [CustomerType.Government]: "Administration publique",
    };
    return labels[type];
  };

  const getBillingModeLabel = (mode: BillingMode) => {
    const labels = {
      [BillingMode.Centralized]: "Centralisée",
      [BillingMode.PerSite]: "Par site",
      [BillingMode.DistributedByTantièmes]: "Répartition par tantièmes",
    };
    return labels[mode];
  };

  const getInvoiceFrequencyLabel = (freq: InvoiceFrequency) => {
    const labels = {
      [InvoiceFrequency.PerWorkOrder]: "Par bon de travail",
      [InvoiceFrequency.Weekly]: "Hebdomadaire",
      [InvoiceFrequency.Monthly]: "Mensuelle",
      [InvoiceFrequency.Quarterly]: "Trimestrielle",
    };
    return labels[freq];
  };

  const TypeIcon = getTypeIcon(data.type);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header de révision */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">Révision finale</h3>
              <p className="text-sm text-muted-foreground">
                Vérifiez toutes les informations avant de créer le client
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Informations générales */}
      <ReviewSection
        title="Informations générales"
        icon={Building}
        onEdit={() => onEditStep(0)}
      >
        <div className="space-y-4">
          {/* Preview card du client */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-xl" />
            <div className="relative backdrop-blur-sm bg-background/60 border border-border/50 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <TypeIcon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-xl">{data.companyName}</h4>
                    <Badge variant={data.active ? "default" : "secondary"}>
                      {data.active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      {getTypeLabel(data.type)}
                    </span>
                    <code className="px-2 py-1 rounded bg-muted text-xs">
                      {data.reference}
                    </code>
                  </div>
                  {data.comment && (
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      "{data.comment}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReviewSection>

      {/* 2. Adresses */}
      <ReviewSection
        title="Adresses"
        icon={MapPin}
        onEdit={() => onEditStep(1)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddressCard
            title="Facturation"
            icon={FileText}
            address={data.invoiceAddress}
            color="orange"
          />
          <AddressCard
            title="Postale"
            icon={Home}
            address={data.mailingAddress}
            color="blue"
          />
        </div>
      </ReviewSection>

      {/* 3. Informations légales */}
      <ReviewSection
        title="Informations légales"
        icon={ShieldCheck}
        onEdit={() => onEditStep(2)}
      >
        <div className="p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
          {data.siren ? (
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-sm">SIREN</p>
                <code className="text-base font-mono font-bold">{data.siren}</code>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">Aucun SIREN renseigné</p>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* 4. Facturation */}
      <ReviewSection
        title="Facturation"
        icon={CreditCard}
        onEdit={() => onEditStep(3)}
      >
        <div className="space-y-4">
          {/* Paramètres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoCard
              icon={Building}
              label="Mode"
              value={getBillingModeLabel(data.billingSettings.mode)}
              color="blue"
            />
            <InfoCard
              icon={Clock}
              label="Fréquence"
              value={getInvoiceFrequencyLabel(data.billingSettings.invoiceFrequency)}
              color="purple"
            />
            <InfoCard
              icon={Calendar}
              label="Délai"
              value={`${data.billingSettings.paymentTermsDays} jours`}
              color="green"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <OptionRow
              icon={Zap}
              label="Génération automatique"
              checked={data.billingSettings.autoGenerateInvoices}
            />
            <OptionRow
              icon={Mail}
              label="Notifications email"
              checked={data.billingSettings.sendEmailNotifications}
            />
            <OptionRow
              icon={AlertCircle}
              label="Frais de retard"
              checked={data.billingSettings.applyLatePaymentFees}
              extra={
                data.billingSettings.applyLatePaymentFees
                  ? `${data.billingSettings.latePaymentFeePercent}%`
                  : undefined
              }
            />
          </div>

          {/* Coefficients */}
          <div className="p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h5 className="font-semibold text-sm">Coefficients de tarification</h5>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <CoefficientRow
                label="Main d'œuvre"
                value={data.pricingCoefficients.laborCoefficient}
              />
              <CoefficientRow
                label="Matériaux"
                value={data.pricingCoefficients.materialCoefficient}
              />
              <CoefficientRow
                label="Équipement"
                value={data.pricingCoefficients.equipmentCoefficient}
              />
              <CoefficientRow
                label="Sous-traitance"
                value={data.pricingCoefficients.subcontractorCoefficient}
              />
            </div>
          </div>
        </div>
      </ReviewSection>

      {/* 5. Moyen de paiement */}
      <ReviewSection
        title="Moyen de paiement"
        icon={CreditCard}
        onEdit={() => onEditStep(4)}
      >
        {
        payment && payment.name ? (
          <div className="p-5 rounded-lg backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold mb-1">{payment.name}</p>
                {payment.terms && (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {payment.terms}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : 
        (
          <div className="p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">Aucun moyen de paiement renseigné</p>
            </div>
          </div>
        )}
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
    <FormCard glowColor="primary">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h4 className="font-bold text-lg">{title}</h4>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="backdrop-blur-sm"
        >
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>
      {children}
    </FormCard>
  );
}

function AddressCard({
  title,
  icon: Icon,
  address,
  color,
}: {
  title: string;
  icon: any;
  address: any;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    orange: "from-orange-500/10 to-red-500/10 border-orange-500/20",
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  };

  return (
    <div
      className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h5 className="font-semibold text-sm">{title}</h5>
      </div>
      <div className="text-sm space-y-1 text-muted-foreground">
        {address.firstAddressLine && <p>{address.firstAddressLine}</p>}
        {address.secondAddressLine && <p>{address.secondAddressLine}</p>}
        <p>{address.street}</p>
        <p className="font-medium text-foreground">
          {address.postalCode} {address.city}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/10 to-transparent border-blue-500/20",
    purple: "from-purple-500/10 to-transparent border-purple-500/20",
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
      <p className="font-bold text-sm">{value}</p>
    </div>
  );
}

function OptionRow({
  icon: Icon,
  label,
  checked,
  extra,
}: {
  icon: any;
  label: string;
  checked: boolean;
  extra?: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/20">
      <div className="flex items-center gap-3">
        <div
          className={`h-8 w-8 rounded-lg flex items-center justify-center ${
            checked ? "bg-green-500/20" : "bg-muted"
          }`}
        >
          {checked ? (
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <Icon className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {extra && <Badge variant="outline">{extra}</Badge>}
    </div>
  );
}

function CoefficientRow({
  label,
  value,
}: {
  label: string;
  value?: number;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <code className="font-mono font-bold">×{value || 1.0}</code>
    </div>
  );
}