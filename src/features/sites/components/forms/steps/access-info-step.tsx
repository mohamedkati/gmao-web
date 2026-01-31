// src/features/sites/components/steps/access-info-step.tsx

"use client";

import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "../../../schemas/site-form.schema";
import { FormCard, FormSection } from "@/shared/components/forms";
import { Input } from "@/shared/components/shadcnui/input";
import { Textarea } from "@/shared/components/shadcnui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Key, Lock, MapPin, Clock, CreditCard, Info } from "lucide-react";
import { DynamicSelect } from "@/shared/components/ui/dynamic-select-gen";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";

interface AccessInfoStepProps {
  form: UseFormReturn<SiteFormData>;
}

export function AccessInfoStep({ form }: AccessInfoStepProps) {
  const accessCode1 = form.watch("siteAccessInfo.accessCode1");
  const accessCode2 = form.watch("siteAccessInfo.accessCode2");
  const keyBoxSite = form.watch("siteAccessInfo.keyBoxSite");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Info */}
      <Alert className="backdrop-blur-xl bg-blue-500/10 border-blue-500/20">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm">
          Les informations d'accès sont optionnelles mais recommandées pour faciliter
          les interventions sur site. Elles seront accessibles uniquement aux membres de
          l'équipe assignée.
        </AlertDescription>
      </Alert>

      {/* Codes d'accès */}
      <FormCard
        title="Codes d'accès"
        description="Codes et digicode d'accès au site"
        icon={Lock}
        glowColor="primary"
      >
        <FormSection title="Codes d'accès" icon={Key}>
          <div className="space-y-4">
            {/* Code 1 */}
            <FormField
              control={form.control}
              name="siteAccessInfo.accessCode1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Code d'accès principal
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      {...field}
                      className="backdrop-blur-sm font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Code principal (digicode, badge...)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code 2 */}
            <FormField
              control={form.control}
              name="siteAccessInfo.accessCode2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Code d'accès secondaire
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      {...field}
                      className="backdrop-blur-sm font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Code secondaire ou d'urgence
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview codes (sans révéler) */}
            {(accessCode1 || accessCode2) && (
              <div className="p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Codes configurés</p>
                    <p className="text-xs text-muted-foreground">
                      {accessCode1 ? "Code principal ✓" : ""}
                      {accessCode1 && accessCode2 ? " • " : ""}
                      {accessCode2 ? "Code secondaire ✓" : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormSection>
      </FormCard>

      {/* Boîte à clés */}
      <FormCard
        title="Boîte à clés"
        description="Emplacement et accès aux clés"
        icon={Key}
        glowColor="orange"
      >
        <FormSection title="Localisation" icon={MapPin}>
          <FormField
            control={form.control}
            name="siteAccessInfo.keyBoxSite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Emplacement de la boîte à clés
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: À gauche de l'entrée principale, sous l'escalier..."
                    rows={3}
                    {...field}
                    className="backdrop-blur-sm resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Description précise de l'emplacement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {keyBoxSite && (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="font-semibold text-sm">Emplacement défini</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {keyBoxSite}
                  </p>
                </div>
              </div>
            </div>
          )}
        </FormSection>
      </FormCard>

      {/* Horaires et commentaires */}
      <FormCard
        title="Horaires et instructions"
        description="Horaires de travail et commentaires d'accès"
        icon={Clock}
        glowColor="green"
      >
        <FormSection title="Informations complémentaires">
          <div className="space-y-4">
            {/* Horaires de travail */}
            <FormField
              control={form.control}
              name="siteAccessInfo.workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Horaires de travail autorisés
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Lun-Ven 8h-18h, Sam 9h-12h"
                      {...field}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Plages horaires pour les interventions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commentaire d'accès */}
            <FormField
              control={form.control}
              name="siteAccessInfo.accessComment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      Commentaire d'accès
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Sonner chez le gardien si absence de réponse, parking accessible par la gauche..."
                      rows={4}
                      {...field}
                      className="backdrop-blur-sm resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    Instructions supplémentaires pour accéder au site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
      </FormCard>

      {/* Moyen de paiement */}
      <FormCard
        title="Moyen de paiement"
        description="Moyen de paiement privilégié (optionnel)"
        icon={CreditCard}
        glowColor="blue"
      >
        <FormSection title="">
          <FormField
            control={form.control}
            name="paymentMethodId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moyen de paiement</FormLabel>
                <FormControl>
                  <DynamicSelect
                    apiEndpoint="/api/payment-methods"
                    placeholder="Sélectionner un moyen de paiement"
                    value={field.value}
                    onChange={field.onChange}
                    searchPlaceholder="Rechercher..."
                    emptyMessage="Aucun moyen trouvé"
                    labelKey="name"
                    valueKey="id"
                  />
                </FormControl>
                <FormDescription>
                  Moyen de paiement préféré pour ce site
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
      </FormCard>
    </div>
  );
}