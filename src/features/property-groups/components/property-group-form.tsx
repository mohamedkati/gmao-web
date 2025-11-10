"use client";

import { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyGroupFormSchema, PropertyGroupFormValues } from "../schemas/property-groups.schema";
import { Form } from "@/shared/components/shadcnui/form";
import { Button } from "@/shared/components/shadcnui/button";
import { Progress } from "@/shared/components/shadcnui/progress";
import { ChevronLeft, ChevronRight, Check, Key } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { PropertyGroup, PropertyGroupStatus, PropertyGroupType } from "../types/property-group.types";
import { formatFieldName } from "@/shared/lib/utils/string";
import { BasicInfoStep } from "./form-steps/basic-info-step";
import { LegalInfoStep } from "./form-steps/legal-info-step";
import { AddressStep } from "./form-steps/basic-step-address";
import { ContactsStep } from "./form-steps/form-step-contacts";
import { NotesStep } from "./form-steps/notes-step";

const STEPS = [
  { id: 1, name: "Informations de base", component: BasicInfoStep },
  { id: 2, name: "Informations légales", component: LegalInfoStep },
  { id: 3, name: "Adresse", component: AddressStep },
  { id: 4, name: "Contacts", component: ContactsStep },
  // { id: 5, name: "Facturation & Tarifs", component: BillingPricingStep },
  // { id: 6, name: "Contrat cadre", component: ContractStep },
  { id: 5, name: "Notes", component: NotesStep },
];

interface PropertyGroupFormProps {
  initialData?: PropertyGroup;
  onSubmit: (data: PropertyGroupFormValues) => void;
  isLoading?: boolean;
  validationErrors?: Record<string, string[]>;
}

export function PropertyGroupForm({
  initialData,
  onSubmit,
  isLoading,
  validationErrors
}: PropertyGroupFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  console.log("initial data", initialData);
  const form = useForm<PropertyGroupFormValues>({
    resolver: zodResolver(propertyGroupFormSchema),
    reValidateMode: "onBlur",
    values: {
      reference: initialData?.reference || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      type: initialData?.type || PropertyGroupType.PropertyManagementCompany,
      status: initialData?.status || PropertyGroupStatus.Active,
      legalName: initialData?.legalName || "",
      siren: initialData?.siren || "",
      companyRegistrationNumber: initialData?.companyRegistrationNumber || "",
      vatNumber: initialData?.vatNumber || "",
      legalForm: initialData?.legalForm,
      headquartersAddress: initialData?.headquartersAddress || { city: "", country: '', postalCode: '', street: '',secondAddressLine:'',firstAddressLine:'' },
      mainContactName: initialData?.mainContactName || "",
      mainContactPosition: initialData?.mainContactPosition || "",
      mainContactEmail: initialData?.mainContactEmail || "",
      mainContactPhone: initialData?.mainContactPhone || "",
      mainContactMobile: initialData?.mainContactMobile || "",
      accountingContactName: initialData?.accountingContactName || "",
      accountingContactEmail: initialData?.accountingContactEmail || "",
      accountingContactPhone: initialData?.accountingContactPhone || "",
      consolidatedBilling: initialData?.consolidatedBilling || false,
      paymentTermsDays: initialData?.paymentTermsDays,
      volumeDiscountPercent: initialData?.volumeDiscountPercent || 0,
      preferredPaymentMethod: initialData?.preferredPaymentMethod,
      groupPricingCoefficients: initialData?.groupPricingCoefficients,
      frameworkContractStartDate: initialData?.frameworkContractStartDate || "",
      frameworkContractEndDate: initialData?.frameworkContractEndDate || "",
      frameworkContractReference: initialData?.frameworkContractReference || "",
      autoRenewalFrameworkContract: initialData?.autoRenewalFrameworkContract || false,
      internalNotes: initialData?.internalNotes || "",
      commercialNotes: initialData?.commercialNotes || "",
    },
  });

  useEffect(() => {
    if (validationErrors !== undefined) {
      let formStep = 7;
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
    // Validate current step fields before moving to next
    const fieldsToValidate = getFieldsForStep(currentStep);

    const results = await Promise.all(fieldsToValidate.map(async field => form.trigger(field as any)));

    if (results.every(x => x))
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));

    // const isValid = await form.trigger("reference");

  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-6 py-4 border-b">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Étape {currentStep} sur {STEPS.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigator */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep > step.id
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="flex items-center justify-center w-5 h-5 rounded-full border-2">
                  {step.id}
                </span>
              )}
              <span className="hidden sm:inline">{step.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
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
                type="submit"
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
                    {initialData ? "Mettre à jour" : "Créer le groupe"}
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
      return [
        "mainContactEmail",
        "accountingContactEmail",
      ];
    case 5:
      // return ["paymentTermsDays"];
      return [];
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