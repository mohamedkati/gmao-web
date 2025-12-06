"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerFormSchema, CustomerFormValues } from "../../schemas/customer.schema";
import { Form } from "@/shared/components/shadcnui/form";
import { Button } from "@/shared/components/shadcnui/button";
import { Progress } from "@/shared/components/shadcnui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { Customer, CustomerType, BillingMode, InvoiceFrequency } from "../../types/customer.types";

// Import steps
import { BasicInfoStep } from "../form-steps/customer-basic-info-step";
import { AddressesStep } from "../form-steps/customer-address-step";
import { PricingStep } from "../form-steps/customer-pricing-step";
import { BillingStep } from "../form-steps/customer-billing-step";
import { CommercialStep } from "../form-steps/customer-commercial-step";

const STEPS = [
  { id: 1, name: "Informations de base", component: BasicInfoStep },
  { id: 2, name: "Adresses", component: AddressesStep },
  { id: 3, name: "Tarification", component: PricingStep },
  { id: 4, name: "Facturation", component: BillingStep },
  { id: 5, name: "Commercial", component: CommercialStep },
];

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (data: CustomerFormValues) => void;
  isLoading?: boolean;
  validationErrors: Record<string, string[]> | undefined;
}

export function CustomerForm({ initialData, onSubmit, isLoading, validationErrors }: CustomerFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

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
    // : {
    //   reference: "",
    //   companyName: "",
    //   type: CustomerType.PropertyManager,
    //   siren: "",
    //   comment: "",
    //   invoiceAddress: {
    //     street: "",
    //     city: "",
    //     postalCode: "",
    //     country: "France",
    //   },
    //   mailingAddress: {
    //     street: "",
    //     city: "",
    //     postalCode: "",
    //     country: "France",
    //   },
    //   pricingCoefficients: {
    //     laborCoefficient: 1.30,
    //     materialCoefficient: 1.25,
    //     equipmentCoefficient: 1.20,
    //     subcontractorCoefficient: 1.15,
    //   },
    //   billingSettings: {
    //     mode: BillingMode.Centralized,
    //     paymentTermsDays: 30,
    //     autoGenerateInvoices: true,
    //     invoiceFrequency: InvoiceFrequency.Monthly,
    //     sendEmailNotifications: true,
    //     applyLatePaymentFees: false,
    //   },
    //   commercialId: "",
    // },
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
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = form.handleSubmit((data) => {
    data.paymentMethodId = undefined;
    onSubmit(data);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Étape {currentStep} sur {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complété
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Steps indicators */}
          <div className="flex items-center justify-between mt-4">
            {STEPS.map((step, index) => (
              <button
                key={step.id || index}
                type="button"
                onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                disabled={step.id > currentStep}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs transition-opacity",
                  step.id > currentStep && "opacity-40 cursor-not-allowed",
                  step.id <= currentStep && "cursor-pointer hover:opacity-80"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                    step.id === currentStep &&
                    "border-primary bg-primary text-primary-foreground",
                    step.id < currentStep &&
                    "border-primary bg-primary/10 text-primary",
                    step.id > currentStep &&
                    "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{step.id}</span>
                  )}
                </div>
                <span className="hidden md:block text-center max-w-[80px]">
                  {step.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">
                {STEPS[currentStep - 1]!.name}
              </h2>
            </div>
            <CurrentStepComponent form={form} />
          </form>
        </Form>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 border-t bg-background">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
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
              >
                {isLoading ? (
                  <>
                    <span className="spinner mr-2 h-4 w-4" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {initialData ? "Mettre à jour" : "Créer le client"}
                  </>
                )}
              </Button>
            )}
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