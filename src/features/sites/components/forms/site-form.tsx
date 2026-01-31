// src/features/sites/components/site-form.tsx

"use client";

import { FormProvider } from "react-hook-form";
import { Button } from "@/shared/components/shadcnui/button";
import { FormStepper } from "@/shared/components/forms";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteForm } from "../../hooks/sites/use-site-form";
import { Site } from "../../types/site.types";
import {
  GeneralInfoStep,
  AddressesStep,
  BuildingInfoStep,
  TeamAssignmentStep,
  AccessInfoStep,
  ReviewStep,
} from "./steps";

interface SiteFormProps {
  initialData?: Site;
  mode: "create" | "edit";
}

export function SiteForm({ initialData, mode }: SiteFormProps) {
  const {
    form,
    steps,
    currentStep,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleStepClick,
    onSubmit,
  } = useSiteForm({ initialData, mode });

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralInfoStep form={form} />;
      case 1:
        return <AddressesStep form={form} />;
      case 2:
        return <BuildingInfoStep form={form} />;
      case 3:
        return <TeamAssignmentStep form={form} />;
      case 4:
        return <AccessInfoStep form={form} />;
      case 5:
        return <ReviewStep form={form} onEditStep={handleStepClick} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Stepper */}
        <div className="relative" data-stepper>
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

        {/* Navigation Footer */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-2xl" />
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              {/* Bouton Précédent */}
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>

              {/* Indicateur */}
              <div className="text-sm text-muted-foreground">
                Étape {currentStep + 1} sur {steps.length}
              </div>

              {/* Bouton Suivant ou Soumettre */}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mode === "create" ? "Créer le site" : "Mettre à jour"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}