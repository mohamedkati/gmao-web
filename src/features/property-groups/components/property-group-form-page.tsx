"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyGroupFormSchema, PropertyGroupFormValues } from "../schemas/property-groups.schema";
import { Form } from "@/shared/components/shadcnui/form";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent } from "@/shared/components/shadcnui/card";
import { Separator } from "@/shared/components/shadcnui/separator";
import { ChevronLeft, ChevronRight, Check, Save, X, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { PropertyGroup, PropertyGroupStatus, PropertyGroupType } from "../types/property-group.types";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";

// Import des steps
import { BasicInfoStep } from "./form-steps/basic-info-step";
import { LegalInfoStep } from "./form-steps/legal-info-step";
import { AddressStep } from "./form-steps/basic-step-address";
import { ContactsStep } from "./form-steps/form-step-contacts";
// import { BillingPricingStep } from "./form-steps/billing-princing-step";
// import { ContractStep } from "./form-steps/contracts-step";
import { NotesStep } from "./form-steps/notes-step";
import { formatFieldName } from "@/shared/lib/utils/string";

const STEPS = [
  { id: 1, name: "Informations de base", description: "Référence, nom et type", component: BasicInfoStep },
  { id: 2, name: "Informations légales", description: "SIREN, forme juridique", component: LegalInfoStep },
  { id: 3, name: "Adresse", description: "Siège social", component: AddressStep },
  { id: 4, name: "Contacts", description: "Contacts principaux", component: ContactsStep },
  // { id: 5, name: "Facturation & Tarifs", description: "Paramètres commerciaux", component: BillingPricingStep },
  // { id: 6, name: "Contrat cadre", description: "Dates et références", component: ContractStep },
  { id: 5, name: "Notes", description: "Notes internes et commerciales", component: NotesStep }
];

interface PropertyGroupFormPageProps {
  mode: "create" | "edit";
  initialData?: PropertyGroup;
  onSubmit: (data: PropertyGroupFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  validationErrors?: Record<string, string[]>;
}

export function PropertyGroupFormPage({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors
}: PropertyGroupFormPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const form = useForm<PropertyGroupFormValues>({
    resolver: zodResolver(propertyGroupFormSchema),
    defaultValues: initialData
      ? {
        reference: initialData.reference,
        name: initialData.name,
        description: initialData.description || "",
        type: initialData.type,
        status: initialData.status,
        legalName: initialData.legalName || "",
        siren: initialData.siren || "",
        companyRegistrationNumber: initialData.companyRegistrationNumber || "",
        vatNumber: initialData.vatNumber || "",
        legalForm: initialData.legalForm,
        headquartersAddress: initialData.headquartersAddress,
        mainContactName: initialData.mainContactName || "",
        mainContactPosition: initialData.mainContactPosition || "",
        mainContactEmail: initialData.mainContactEmail || "",
        mainContactPhone: initialData.mainContactPhone || "",
        mainContactMobile: initialData.mainContactMobile || "",
        accountingContactName: initialData.accountingContactName || "",
        accountingContactEmail: initialData.accountingContactEmail || "",
        accountingContactPhone: initialData.accountingContactPhone || "",
        consolidatedBilling: initialData.consolidatedBilling,
        paymentTermsDays: initialData.paymentTermsDays,
        volumeDiscountPercent: initialData.volumeDiscountPercent,
        preferredPaymentMethod: initialData.preferredPaymentMethod || "",
        groupPricingCoefficients: initialData.groupPricingCoefficients,
        frameworkContractStartDate: initialData.frameworkContractStartDate || "",
        frameworkContractEndDate: initialData.frameworkContractEndDate || "",
        frameworkContractReference: initialData.frameworkContractReference || "",
        autoRenewalFrameworkContract: initialData.autoRenewalFrameworkContract,
        internalNotes: initialData.internalNotes || "",
        commercialNotes: initialData.commercialNotes || "",
      }
      : {
        reference: "",
        name: "",
        description: "",
        type: PropertyGroupType.PropertyManagementCompany,
        status: PropertyGroupStatus.Prospect,
        consolidatedBilling: false,
        paymentTermsDays: 30,
        autoRenewalFrameworkContract: false,
      },
  });


  useEffect(() => {
    if (validationErrors !== undefined) {
      let formStep = 5;
      Object.entries(validationErrors).forEach(([key, value]) => {
        const fieldName = formatFieldName(key);
        if (getFieldStepByFieldName(fieldName) < formStep)
          formStep = getFieldStepByFieldName(fieldName);

        form.setError(fieldName as any, { message: value.join(", ") }, { shouldFocus: true });
      });
      setCurrentStep(formStep);
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
                {mode === "create" ? "Créer un nouveau groupe" : "Modifier le groupe"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {mode === "create"
                  ? "Remplissez les informations pour créer un nouveau groupe immobilier"
                  : `Modification du groupe ${initialData?.name}`}
              </p>
            </div>
            {mode === "edit" && initialData && (
              <div className="text-right text-sm text-muted-foreground">
                <p>Réf: {initialData.reference}</p>
                <p>Dernière modification: {new Date(initialData.lastModified).toLocaleDateString()}</p>
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
                      {STEPS.map((step, index) => {
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
                  <form onSubmit={handleFormSubmit}>
                    <div className="animate-fade-in-up">
                      <CurrentStepComponent form={form} />
                    </div>

                  </form>
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
                              type="submit"
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
                                  {mode === "create" ? "Créer le groupe" : "Enregistrer"}
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                </Form>

                {/* Help Text */}
                {currentStep === STEPS.length && (
                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Vérifiez toutes les informations avant de {mode === "create" ? "créer" : "enregistrer"} le groupe.
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
      return ["reference", "name", "type", "status"];
    case 2:
      return ["legalName", "siren", "legalForm"];
    case 3:
      return [
        "headquartersAddress.street",
        "headquartersAddress.city",
        "headquartersAddress.postalCode",
        "headquartersAddress.country",
      ];
    case 4:
      return ["mainContactEmail", "accountingContactEmail"];
    case 5:
      return ["paymentTermsDays"];
    case 6:
      return [];
    case 7:
      return [];
    default:
      return [];
  }
}
function getFieldStepByFieldName(fieldName: string): number {
  if (fieldName in ["reference", "name", "type", "status"]) return 1;
  if (fieldName in ["legalName", "siren", "legalForm"]) return 2;
  if (Array.from([
    "headquartersAddress.street",
    "headquartersAddress.city",
    "headquartersAddress.postalCode",
    "headquartersAddress.country",
  ]).includes(fieldName)) return 3;
  if (fieldName in [
    "mainContactEmail",
    "accountingContactEmail",
  ]) return 4;
  if (fieldName in ["paymentTermsDays"]) return 5;
  return 1;
}