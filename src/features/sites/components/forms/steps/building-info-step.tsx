// src/features/sites/components/steps/building-info-step.tsx

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
import {
  Building2,
  Calendar,
  Maximize,
  Layers,
  Home,
  ShieldCheck,
  Mail,
  FileText,
} from "lucide-react";
import { useMemo } from "react";

interface BuildingInfoStepProps {
  form: UseFormReturn<SiteFormData>;
}

export function BuildingInfoStep({ form }: BuildingInfoStepProps) {
  const buildingYear = form.watch("buildingYear");
  const totalArea = form.watch("totalArea");
  const floorsCount = form.watch("floorsCount");
  const unitsCount = form.watch("unitsCount");

  const buildingAge = useMemo(() => {
    if (!buildingYear) return null;
    return new Date().getFullYear() - buildingYear;
  }, [buildingYear]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Caractéristiques du bâtiment */}
      <FormCard
        title="Caractéristiques du bâtiment"
        description="Informations techniques sur le bâtiment"
        icon={Building2}
        glowColor="indigo"
      >
        <FormSection
          title="Dimensions et structure"
          icon={Maximize}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Année de construction */}
            <FormField
              control={form.control}
              name="buildingYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Année de construction
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1800}
                      max={2100}
                      placeholder="Ex: 2019"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  {buildingAge !== null && (
                    <FormDescription>
                      Bâtiment de {buildingAge} an{buildingAge > 1 ? "s" : ""}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surface totale */}
            <FormField
              control={form.control}
              name="totalArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-4 w-4 text-muted-foreground" />
                      Surface totale (m²)
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="Ex: 12500"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Surface totale du bâtiment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nombre d'étages */}
            <FormField
              control={form.control}
              name="floorsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      Nombre d'étages
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Ex: 8"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Nombre total d'étages (incluant RDC)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nombre d'unités */}
            <FormField
              control={form.control}
              name="unitsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      Nombre d'unités estimé
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Ex: 45"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Nombre approximatif de lots/unités
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Preview card */}
          {(totalArea || floorsCount || unitsCount) && (
            <div className="mt-4 p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <div className="grid grid-cols-3 gap-4">
                {totalArea && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {totalArea.toLocaleString()} m²
                    </p>
                    <p className="text-xs text-muted-foreground">Surface totale</p>
                  </div>
                )}
                {floorsCount && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {floorsCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Étages</p>
                  </div>
                )}
                {unitsCount && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {unitsCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Unités</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </FormSection>
      </FormCard>

      {/* Informations légales */}
      <FormCard
        title="Informations légales"
        description="Identifiants officiels"
        icon={ShieldCheck}
        glowColor="green"
      >
        <FormSection title="Identification légale" icon={ShieldCheck}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SIREN */}
            <FormField
              control={form.control}
              name="siren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIREN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 123456789"
                      maxLength={9}
                      {...field}
                      className="backdrop-blur-sm font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Numéro d'identification à 9 chiffres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SIRET */}
            <FormField
              control={form.control}
              name="siret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIRET</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 12345678900012"
                      maxLength={14}
                      {...field}
                      className="backdrop-blur-sm font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Numéro d'identification à 14 chiffres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
      </FormCard>

      {/* Communication */}
      <FormCard
        title="Communication"
        description="Emails et correspondance"
        icon={Mail}
        glowColor="blue"
      >
        <FormSection title="Adresses email" icon={Mail} required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email principal */}
            <FormField
              control={form.control}
              name="mainMailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email principal
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contact@example.com"
                      {...field}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Email de contact principal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email facturation */}
            <FormField
              control={form.control}
              name="invoiceMailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email facturation
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="facturation@example.com"
                      {...field}
                      className="backdrop-blur-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Email pour l'envoi des factures
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>

        <FormSection title="Commentaire rapport" icon={FileText}>
          <FormField
            control={form.control}
            name="commentReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentaire pour les rapports</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informations à inclure dans les rapports..."
                    rows={4}
                    {...field}
                    className="backdrop-blur-sm resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Ce texte apparaîtra dans les rapports générés
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