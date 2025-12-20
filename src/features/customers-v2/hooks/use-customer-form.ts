"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { customerFormSchema } from "../schemas/customer.schema";
import { Customer, CustomerType, BillingMode, InvoiceFrequency } from "../types/customer.types";
import { CustomerFormData } from "../types/customer.types";
import { useCreateCustomer, useUpdateCustomer } from "./user-customers.query";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/shared/lib/constants/app.messages.constants";
import { ApiValidationResponse } from "@/shared/types/common.types";

interface UseCustomerFormProps {
  initialData?: Customer;
  mode: "create" | "edit";
}

export function useCustomerForm({ initialData, mode }: UseCustomerFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialData
      ? {
        companyName: initialData.companyName,
        reference: initialData.reference,
        type: initialData.type,
        propertyGroupId: initialData.propertyGroupId,
        commercialId: initialData.commercialId,
        active: initialData.active,
        comment: initialData.comment || "",
        invoiceAddress: initialData.invoiceAddress,
        mailingAddress: initialData.mailingAddress,
        sameAsInvoiceAddress: false,
        siren: initialData.siren || "",
        billingSettings: initialData.billingSettings,
        pricingCoefficients: initialData.pricingCoefficients,
        paymentMethodId: initialData.paymentMethodId || "",
      }
      : {
        companyName: "",
        reference: "",
        paymentMethodId: "",
        type: CustomerType.Corporate,
        active: true,
        comment: "",
        invoiceAddress: {
          street: "",
          postalCode: "",
          city: "",
          country: "France",
        },
        mailingAddress: {
          street: "",
          postalCode: "",
          city: "",
          country: "France",
        },
        sameAsInvoiceAddress: false,
        siren: "",
        billingSettings: {
          mode: BillingMode.Centralized,
          invoiceFrequency: InvoiceFrequency.Monthly,
          paymentTermsDays: 30,
          autoGenerateInvoices: false,
          sendEmailNotifications: true,
          applyLatePaymentFees: false,
          latePaymentFeePercent: 0,
        },
        pricingCoefficients: {
          laborCoefficient: 1.0,
          materialCoefficient: 1.0,
          equipmentCoefficient: 1.0,
          subcontractorCoefficient: 1.0,
        },
      },
  });
  console.log(initialData);
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const steps = [
    { id: "general", title: "Informations générales", description: "Nom, type, référence" },
    { id: "addresses", title: "Adresses", description: "Facturation et postale" },
    { id: "legal", title: "Infos légales", description: "SIREN, statut" },
    { id: "billing", title: "Facturation", description: "Mode et coefficients" },
    { id: "payment", title: "Paiement", description: "Moyen de paiement" },
    { id: "review", title: "Révision", description: "Vérification finale" },
  ];
  useEffect(() => {
    // Scroll au changement de step
    const mainContent = document.querySelector('[data-form-container]');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    // Alternative: scroll le stepper en vue
    const stepper = document.querySelector('[data-stepper]');
    if (stepper) {
      stepper.scrollIntoView({ behavior: 'smooth', inline:'start' });
    }
  }, [currentStep]);
  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };
  const onSubmit = async (data: CustomerFormData) => {
    try {
      setIsSubmitting(true);

      if (mode === "create") {
        await createMutation.mutateAsync(data, {
          onError: (error) => {
            toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_CREATION);
          },
          onSuccess: (response) => {
            if (response.isSucceeded && response.data === true) {
              toast.success(response.message || SUCCESS_MESSAGES.Suceeded);
              router.push("/customers-v2");
              return;
            }
            else if (!response.isSucceeded) {
              const errors = (response as ApiValidationResponse).errors;
              let minStep = steps.length;
              Object.entries(errors).forEach(([key, value]) => {
                const step = getStepOfFieldByFieldName(key);
                if (step < minStep)
                  minStep = step;
                form.setError(key as any, { message: value.join(", ") });
              });
              handleStepClick(minStep);
              toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
            }
          },
        });
      } else {
        await updateMutation.mutateAsync(
          { id: initialData!.id, data },
          {
            onSuccess: (response) => {
              if (response.isSucceeded) {

                toast.success('Client modifié avec succès');
                router.back();
                return;
              }
              else {
                const errors = (response as ApiValidationResponse).errors;
                let minStep = steps.length;
                Object.entries(errors).forEach(([key, value]) => {
                  const step = getStepOfFieldByFieldName(key);
                  if (step < minStep)
                    minStep = step;
                  form.setError(key as any, { message: value.join(", ") });
                });
                handleStepClick(minStep);
                toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR)
              }
            },
            onError: (error) => {
              toast.error(error?.response?.data?.message || ERROR_MESSAGES.ERROR_UPDATE);
            }
          }
        );
      }

    } catch (error) {
      toast.error(
        mode === "create"
          ? "Erreur lors de la création du client"
          : "Erreur lors de la mise à jour du client"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentStep,
    steps,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleStepClick,
    onSubmit: form.handleSubmit(onSubmit),
  };
}

function getFieldsForStep(step: number): string[] {
  switch (step) {
    case 0:
      return ["companyName", "reference", "type"];
    case 1:
      return [
        "invoiceAddress.street",
        "invoiceAddress.postalCode",
        "invoiceAddress.city",
        "invoiceAddress.country",
        "mailingAddress.street",
        "mailingAddress.postalCode",
        "mailingAddress.city",
        "mailingAddress.country",
      ];
    case 2:
      return ["siren"];
    case 3:
      return ["billingSettings", "pricingCoefficients"];
    // case 4:
    //   return ["paymentMethod"];
    default:
      return [];
  }
}

function getStepOfFieldByFieldName(fieldName: string): number {
  if (fieldName in ["reference", "companyName", "type", "commercialId"]) return 0;

  if (fieldName in ["invoiceAddress.street",
    "invoiceAddress.city",
    "invoiceAddress.postalCode",
    "invoiceAddress.country",
    "mailingAddress.street",
    "mailingAddress.city",
    "mailingAddress.postalCode",
    "mailingAddress.country",]) return 1;

  if (fieldName in ["pricingCoefficients.laborCoefficient",
    "pricingCoefficients.materialCoefficient",
    "pricingCoefficients.equipmentCoefficient",
    "pricingCoefficients.subcontractorCoefficient",]) return 2;

  if (fieldName in ["billingSettings.mode", "billingSettings.paymentTermsDays", "billingSettings.invoiceFrequency"]) return 3;

  return 0;
}