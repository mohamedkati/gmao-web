"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, CustomerFormValues } from "../../schemas/customer.schema";
import { Form } from "@/shared/components/shadcnui/form";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Separator } from "@/shared/components/shadcnui/separator";
import { ChevronLeft, ChevronRight, Check, Save, X, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { CustomerListItem, CustomerType, BillingMode, InvoiceFrequency } from "../../../customers-v2/types/customer.types";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";

// Import steps
import { BasicInfoStep } from "../form-steps/customer-basic-info-step";
import { AddressesStep } from "../form-steps/customer-address-step";
import { PricingStep } from "../form-steps/customer-pricing-step";
import { BillingStep } from "../form-steps/customer-billing-step";
import { CommercialStep } from "../form-steps/customer-commercial-step";

const STEPS = [
  { id: 1, name: "Informations de base", description: "Référence, nom et type", component: BasicInfoStep },
  { id: 2, name: "Adresses", description: "Facturation et postale", component: AddressesStep },
  { id: 3, name: "Tarification", description: "Coefficients", component: PricingStep },
  { id: 4, name: "Facturation", description: "Paramètres et modes", component: BillingStep },
  { id: 5, name: "Commercial", description: "Responsable", component: CommercialStep },
];

interface CustomerFormPageProps {
  mode: "create" | "edit";
  initialData?: CustomerListItem;
  onSubmit: (data: CustomerFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  validationErrors: Record<string, string[]> | undefined;
}

export function CustomerFormPage({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors
}: CustomerFormPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    reValidateMode: "onBlur",
    values:
    {
      reference: initialData?.reference || "",
      companyName: initialData?.companyName || '',
      type: initialData?.type || CustomerType.PropertyManager,
      propertyGroupId: initialData?.propertyGroupId || "",
      siren: initialData?.siren || '',
      comment: initialData?.comment || "",
      invoiceAddress: initialData?.invoiceAddress || {
        street: "",
        city: "",
        postalCode: "",
        country: "France",
      },
      mailingAddress: initialData?.mailingAddress || {
        street: "",
        city: "",
        postalCode: "",
        country: "France",
      },
      pricingCoefficients: initialData?.pricingCoefficients || {
        laborCoefficient: 1.30,
        materialCoefficient: 1.25,
        equipmentCoefficient: 1.20,
        subcontractorCoefficient: 1.15,
      },
      billingSettings: initialData?.billingSettings || {
        mode: BillingMode.Centralized,
        paymentTermsDays: 30,
        autoGenerateInvoices: true,
        invoiceFrequency: InvoiceFrequency.Monthly,
        sendEmailNotifications: true,
        applyLatePaymentFees: false,
        latePaymentFeePercent: 0
      },
      paymentMethodId: initialData?.paymentMethodId || '',
      commercialId: initialData?.commercialId || '',
    }

  });

  useEffect(() => {
    if (validationErrors) {
      let minStep = STEPS.length;
      Object.entries(validationErrors).forEach(([key, value]) => {
        const step = getStepOfFieldByFieldName(key);
        if (step < minStep)
          minStep = step;
        form.setError(key as any, { message: value.join(", ") });
      });
      setCurrentStep(minStep);
    }
  }, [validationErrors])

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep - 1]!.component;

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);

    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepClick = async (stepId: number) => {
    if (stepId < currentStep || completedSteps.includes(stepId - 1)) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFormSubmit = form.handleSubmit((data) => {
    data.paymentMethodId = undefined;
    onSubmit(data);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {mode === "create" ? "Créer un nouveau client" : "Modifier le client"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {mode === "create"
                  ? "Remplissez les informations pour créer un nouveau client"
                  : `Modification du client ${initialData?.companyName}`}
              </p>
            </div>
            {mode === "edit" && initialData && (
              <div className="text-right text-sm text-muted-foreground">
                <p>Réf: {initialData.reference}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Steps Navigator */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="space-y-1">
                  <h3 className="font-semibold mb-4">Progression</h3>
                  <div className="relative">
                    {/* Progress Bar */}
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-muted" />
                    <div
                      className="absolute left-[15px] top-0 w-0.5 bg-primary transition-all duration-500"
                      style={{ height: `${progress}%` }}
                    />

                    {/* Steps */}
                    <div className="relative space-y-6">
                      {STEPS.map((step) => {
                        const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;
                        const isCurrent = currentStep === step.id;
                        const isAccessible = step.id <= currentStep || completedSteps.includes(step.id - 1);

                        return (
                          <button
                            key={step.id}
                            type="button"
                            onClick={() => isAccessible && handleStepClick(step.id)}
                            disabled={!isAccessible}
                            className={cn(
                              "flex items-start gap-3 text-left w-full transition-all",
                              isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                            )}
                          >
                            {/* Step indicator */}
                            <div
                              className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all shrink-0",
                                isCurrent &&
                                "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                                isCompleted &&
                                !isCurrent &&
                                "border-primary bg-primary/10 text-primary",
                                !isCurrent &&
                                !isCompleted &&
                                "border-muted-foreground/30 text-muted-foreground"
                              )}
                            >
                              {isCompleted && !isCurrent ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span className="text-sm font-medium">{step.id}</span>
                              )}
                            </div>

                            {/* Step info */}
                            <div className="flex-1 pt-0.5">
                              <p
                                className={cn(
                                  "text-sm font-medium transition-colors",
                                  isCurrent && "text-foreground",
                                  !isCurrent && "text-muted-foreground"
                                )}
                              >
                                {step.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {step.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <Card>
              <CardContent className="p-8">
                {/* Step Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>Étape {currentStep} sur {STEPS.length}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>{Math.round(progress)}% complété</span>
                  </div>
                  <h2 className="text-2xl font-bold">{STEPS[currentStep - 1]!.name}</h2>
                  <p className="text-muted-foreground mt-1">
                    {STEPS[currentStep - 1]!.description}
                  </p>
                </div>

                {/* Form Content */}
                <Form {...form}>
                  <div>
                    <div className="animate-fade-in-up">
                      <CurrentStepComponent form={form} />
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevious}
                          disabled={currentStep === 1}
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Précédent
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            disabled={isLoading}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Annuler
                          </Button>

                          {currentStep < STEPS.length ? (
                            <Button type="button" onClick={handleNext}>
                              Suivant
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              onClick={handleFormSubmit}
                              disabled={isLoading}
                              className="min-w-[140px]"
                            >
                              {isLoading ? (
                                <>
                                  <span className="spinner mr-2 h-4 w-4" />
                                  Enregistrement...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-2 h-4 w-4" />
                                  {mode === "create" ? "Créer le client" : "Enregistrer"}
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>

                {/* Help Text */}
                {currentStep === STEPS.length && (
                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Vérifiez toutes les informations avant de {mode === "create" ? "créer" : "enregistrer"} le client.
                      Vous pourrez toujours modifier ces informations ultérieurement.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get fields to validate for each step
function getFieldsForStep(step: number): string[] {
  switch (step) {
    case 1:
      return ["reference", "companyName", "type"];
    case 2:
      return [
        "invoiceAddress.street",
        "invoiceAddress.city",
        "invoiceAddress.postalCode",
        "invoiceAddress.country",
        "mailingAddress.street",
        "mailingAddress.city",
        "mailingAddress.postalCode",
        "mailingAddress.country",
      ];
    case 3:
      return [
        "pricingCoefficients.laborCoefficient",
        "pricingCoefficients.materialCoefficient",
        "pricingCoefficients.equipmentCoefficient",
        "pricingCoefficients.subcontractorCoefficient",
      ];
    case 4:
      return ["billingSettings.mode", "billingSettings.paymentTermsDays", "billingSettings.invoiceFrequency"];
    case 5:
      return ["commercialId"];
    default:
      return [];
  }
}

function getStepOfFieldByFieldName(fieldName: string): number {
  if (fieldName in ["reference", "companyName", "type"]) return 1;

  if (fieldName in ["invoiceAddress.street",
    "invoiceAddress.city",
    "invoiceAddress.postalCode",
    "invoiceAddress.country",
    "mailingAddress.street",
    "mailingAddress.city",
    "mailingAddress.postalCode",
    "mailingAddress.country",]) return 2;

  if (fieldName in ["pricingCoefficients.laborCoefficient",
    "pricingCoefficients.materialCoefficient",
    "pricingCoefficients.equipmentCoefficient",
    "pricingCoefficients.subcontractorCoefficient",]) return 3;

  if (fieldName in ["billingSettings.mode", "billingSettings.paymentTermsDays", "billingSettings.invoiceFrequency"]) return 4;

  if (fieldName in ["commercialId"]) return 5;

  return 1;
}