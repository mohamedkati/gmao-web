// src/features/customers/components/steps/legal-info-step.tsx

"use client";

import { UseFormReturn } from "react-hook-form";
import { FormCard, FormSection } from "@/shared/components/forms";
import { Input } from "@/shared/components/shadcnui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { FileText, ShieldCheck, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
import { CustomerFormData } from "../../types/customer.types";

interface LegalInfoStepProps {
  form: UseFormReturn<CustomerFormData>;
}

export function LegalInfoStep({ form }: LegalInfoStepProps) {
  const siren = form.watch("siren");

  // Validation SIREN simple
  const isValidSiren = (value: string) => {
    return value.length === 9 && /^\d+$/.test(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Info légale */}
      <Alert className="backdrop-blur-xl bg-blue-500/10 border-blue-500/20">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm">
          Les informations légales sont optionnelles mais recommandées pour les clients entreprises.
          Le SIREN permet d'identifier officiellement l'entreprise en France.
        </AlertDescription>
      </Alert>

      <FormCard
        title="Informations légales"
        description="Identifiants officiels de l'entreprise"
        icon={ShieldCheck}
        glowColor="indigo"
      >
        <FormSection
          title="Identification légale"
          description="Numéros d'identification officiels"
          icon={FileText}
        >
          <div className="space-y-4">
            {/* SIREN */}
            <FormField
              control={form.control}
              name="siren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      SIREN
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 123456789"
                      maxLength={9}
                      {...field}
                      className="backdrop-blur-sm font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Numéro d'identification à 9 chiffres (optionnel)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Validation visuelle du SIREN */}
            {siren && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg backdrop-blur-sm border transition-all ${
                  isValidSiren(siren)
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-orange-500/10 border-orange-500/20"
                }`}
              >
                {isValidSiren(siren) ? (
                  <>
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-green-700 dark:text-green-400">
                        SIREN valide
                      </p>
                      <p className="text-xs text-muted-foreground">Format correct : 9 chiffres</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Info className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-orange-700 dark:text-orange-400">
                        Format invalide
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Le SIREN doit contenir exactement 9 chiffres
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </FormSection>

        {/* Informations supplémentaires */}
        <FormSection
          title="Informations complémentaires"
          description="Autres détails légaux (à venir)"
        >
          <div className="p-6 rounded-xl backdrop-blur-sm bg-muted/30 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              D'autres champs légaux pourront être ajoutés ultérieurement
              <br />
              (SIRET, TVA intracommunautaire, etc.)
            </p>
          </div>
        </FormSection>
      </FormCard>
    </div>
  );
}