
"use client";

import { FormStepper } from "@/shared/components/forms";
import { Button } from "@/shared/components/shadcnui/button";
import { ChevronLeft, ChevronRight, Save, Loader2 } from "lucide-react";
import { useCustomerForm } from "../hooks/use-customer-form";
import { Customer } from "../types/customer.types";
import { FormProvider } from "react-hook-form";
import { GeneralInfoStep } from "./steps/general-info-step";
import { AddressesStep } from "./steps/address-step";
import { LegalInfoStep } from "./steps/legal-info-step";
import { BillingStep } from "./steps/billing-step";
// import { PaymentStep } from "./steps/payment-step";
import { ReviewStep } from "./steps/review-step";
import { useRouter } from "next/navigation";

interface CustomerFormProps {
  initialData?: Customer;
  mode: "create" | "edit";
}

export function CustomerForm({ initialData, mode }: CustomerFormProps) {
  const {
    form,
    currentStep,
    steps,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleStepClick,
    onSubmit,
  } = useCustomerForm({ initialData, mode });
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralInfoStep form={form} />;
      case 1:
        return <AddressesStep form={form} />;
      case 2:
        return <LegalInfoStep form={form} />;
      case 3:
        return <BillingStep form={form} />;
      //   case 4:
      //     return <PaymentStep form={form} />;
      case 4:
        return <ReviewStep form={form} onEditStep={handleStepClick} />;
      default:
        return null;
    }
  };

  const router = useRouter();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  return (
    <FormProvider {...form} >
      <form className="space-y-8">
        {/* Stepper */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-2xl" />
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
            <FormStepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        {/* Step Content */}
        <div>{renderStep()}</div>

        {/* Navigation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl blur-xl" />
          <div className="relative backdrop-blur-xl bg-gradient-to-r from-background/80 to-background/60 border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              {/* Previous button */}
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep || isSubmitting}
                className="backdrop-blur-sm"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>

              {/* Step indicator */}
              <div className="text-sm text-muted-foreground font-medium">
                Étape {currentStep + 1} sur {steps.length}
              </div>

              {/* Next/Submit button */}
              {isLastStep ? (
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="shadow-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "create" ? "Création..." : "Mise à jour..."}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {mode === "create" ? "Créer le client" : "Mettre à jour"}
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="shadow-lg"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}



