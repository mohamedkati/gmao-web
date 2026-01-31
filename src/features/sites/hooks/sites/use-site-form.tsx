// src/features/sites/hooks/use-site-form.ts

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { siteFormSchema, type SiteFormData } from "../../schemas/site-form.schema";
import { Site, SiteType } from "../../types/site.types";

interface UseSiteFormProps {
  initialData?: Site;
  mode: "create" | "edit";
}

interface Step {
  id: string;
  title: string;
  description: string;
}

export function useSiteForm({ initialData, mode }: UseSiteFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: Step[] = [
    {
      id: "general",
      title: "Informations générales",
      description: "Nom, type, client, secteur",
    },
    {
      id: "addresses",
      title: "Adresses",
      description: "Adresse principale et facturation",
    },
    {
      id: "building",
      title: "Informations bâtiment",
      description: "Année, surface, étages",
    },
    {
      id: "team",
      title: "Affectation équipe",
      description: "Commercial, techniciens",
    },
    {
      id: "access",
      title: "Informations d'accès",
      description: "Codes, clés, horaires",
    },
    {
      id: "review",
      title: "Révision",
      description: "Vérification finale",
    },
  ];

  const form = useForm<SiteFormData>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: initialData
      ? {
          reference: initialData.reference,
          name: initialData.name,
          type: initialData.type,
          customerId: initialData.customerId,
          clientContactId: initialData.clientContactId,
          sectorTypeId: initialData.sectorTypeId,
          clientTypeId: initialData.clientTypeId,
          vatId: initialData.vatId,
          comment: initialData.comment || "",
          address: initialData.address,
          billingAddress: initialData.billingAddress,
          coordinates: initialData.coordinates,
          sameAsBillingAddress: false,
          buildingYear: initialData.buildingYear,
          totalArea: initialData. surfaceArea,
          floorsCount: initialData.floorsCount,
          unitsCount: initialData.unitsCount,
          siren: initialData.siren || "",
          siret: initialData.siret || "",
          mainMailAddress: initialData.mainMailAddress,
          invoiceMailAddress: initialData.invoiceMailAddress,
          commentReport: initialData.commentReport || "",
          commercialId: initialData.commercialId,
          operationsManagerId: initialData.operationsManagerId,
          sectorManagerId: initialData.sectorManagerId,
          technician1Id: initialData.technician1Id,
          technician2Id: initialData.technician2Id,
          siteAccessInfo: initialData.siteAccessInfo,
          paymentMethodId: initialData.paymentMethodId,
        }
      : {
          reference: "",
          name: "",
          type: SiteType.ResidentialBuilding,
          customerId: "",
          clientContactId: undefined,
          sectorTypeId: "",
          clientTypeId: "",
          vatId: "",
          comment: "",
          address: {
            firstAddressLine: "",
            secondAddressLine: "",
            street: "",
            city: "",
            postalCode: "",
            country: "France",
          },
          billingAddress: {
            firstAddressLine: "",
            secondAddressLine: "",
            street: "",
            city: "",
            postalCode: "",
            country: "France",
          },
          coordinates: undefined,
          sameAsBillingAddress: false,
          buildingYear: undefined,
          totalArea: undefined,
          floorsCount: undefined,
          unitsCount: undefined,
          siren: "",
          siret: "",
          mainMailAddress: "",
          invoiceMailAddress: "",
          commentReport: "",
          commercialId: undefined,
          operationsManagerId: undefined,
          sectorManagerId: undefined,
          technician1Id: undefined,
          technician2Id: undefined,
          siteAccessInfo: {
            accessCode1: "",
            accessCode2: "",
            accessComment: "",
            workingHours: "",
            keyBoxSite: "",
          },
          paymentMethodId: undefined,
        },
  });

  // Scroll automatique au changement de step
  useEffect(() => {
    const mainContent = document.querySelector("[data-form-container]");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    const stepper = document.querySelector("[data-stepper]");
    if (stepper) {
      stepper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const getFieldsForStep = (step: number): (keyof SiteFormData)[] => {
    switch (step) {
      case 0: // General Info
        return [
          "reference",
          "name",
          "type",
          "customerId",
          "sectorTypeId",
          "clientTypeId",
          "vatId",
        ];
      case 1: // Addresses
        return ["address", "billingAddress"];
      case 2: // Building Info
        return ["mainMailAddress", "invoiceMailAddress"];
      case 3: // Team
        return []; // Tous optionnels
      case 4: // Access
        return []; // Tous optionnels
      case 5: // Review
        return []; // Pas de validation
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);

    if (isValid && currentStep < steps.length - 1) {
    //   setCurrentStep((prev) => prev + 1);
    }
     setCurrentStep((prev) => prev + 1);
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

  const onSubmit = async (data: SiteFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: API call to create/update site
      console.log("Site data:", data);

      if (mode === "create") {
        // await createSite(data);
        toast.success("Site créé avec succès");
      } else {
        // await updateSite(initialData!.id, data);
        toast.success("Site mis à jour avec succès");
      }

      router.push("/sites");
    } catch (error) {
      console.error("Error submitting site:", error);
      toast.error(
        mode === "create"
          ? "Erreur lors de la création du site"
          : "Erreur lors de la mise à jour du site"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    steps,
    currentStep,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleStepClick,
    onSubmit: form.handleSubmit(onSubmit),
  };
}