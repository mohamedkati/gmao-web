// src/features/sites/components/steps/team-assignment-step.tsx

"use client";

import { UseFormReturn } from "react-hook-form";
import { SiteFormData } from "../../../schemas/site-form.schema";
import { FormCard, FormSection } from "@/shared/components/forms";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Users, Briefcase, Wrench, UserCheck } from "lucide-react";
import { DynamicSelect } from "@/shared/components/ui/dynamic-select-gen";
import { useMemo } from "react";

interface TeamAssignmentStepProps {
  form: UseFormReturn<SiteFormData>;
}
const staffUrl = "/staffs/select-as-key-value";
export function TeamAssignmentStep({ form }: TeamAssignmentStepProps) {
  const commercialId = form.watch("commercialId");
  const operationsManagerId = form.watch("operationsManagerId");
  const sectorManagerId = form.watch("sectorManagerId");
  const technician1Id = form.watch("technician1Id");
  const technician2Id = form.watch("technician2Id");

  const assignedCount = useMemo(() => {
    let count = 0;
    if (commercialId) count++;
    if (operationsManagerId) count++;
    if (sectorManagerId) count++;
    if (technician1Id) count++;
    if (technician2Id) count++;
    return count;
  }, [commercialId, operationsManagerId, sectorManagerId, technician1Id, technician2Id]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header avec stats */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-2xl" />
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Équipe du site</h3>
                <p className="text-sm text-muted-foreground">
                  {assignedCount} membre{assignedCount > 1 ? "s" : ""} assigné
                  {assignedCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{assignedCount}/5</p>
              <p className="text-xs text-muted-foreground">Postes assignés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management */}
      <FormCard
        title="Direction et gestion"
        description="Responsables du site"
        icon={Briefcase}
        glowColor="primary"
      >
        <FormSection title="Équipe de direction" icon={UserCheck}>
          <div className="space-y-4">
            {/* Commercial */}
            <FormField
              control={form.control}
              name="commercialId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Commercial
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DynamicSelect
                      apiEndpoint={staffUrl + "?role=commercial"}
                      placeholder="Sélectionner un commercial"
                      value={field.value}
                      onChange={field.onChange}
                      searchPlaceholder="Rechercher un commercial..."
                      emptyMessage="Aucun commercial trouvé"
                      labelKey="fullName"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormDescription>
                    Responsable commercial du site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Responsable d'exploitation */}
            <FormField
              control={form.control}
              name="operationsManagerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      Responsable d'exploitation
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DynamicSelect
                      apiEndpoint={staffUrl + "?role=ResponsableExploitation"}
                      placeholder="Sélectionner un responsable d'exploitation"
                      value={field.value}
                      onChange={field.onChange}
                      searchPlaceholder="Rechercher..."
                      emptyMessage="Aucun responsable trouvé"
                      labelKey="fullName"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormDescription>
                    Responsable des opérations sur le site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Responsable de secteur */}
            <FormField
              control={form.control}
              name="sectorManagerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Chef de secteur
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DynamicSelect
                      apiEndpoint={staffUrl + "?role=ChefSecteur"}
                      placeholder="Sélectionner un chef de secteur"
                      value={field.value}
                      onChange={field.onChange}
                      searchPlaceholder="Rechercher..."
                      emptyMessage="Aucun Chef secteur trouvé"
                      labelKey="fullName"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormDescription>
                    Responsable du secteur géographique
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
      </FormCard>

      {/* Techniciens */}
      <FormCard
        title="Équipe technique"
        description="Techniciens assignés au site"
        icon={Wrench}
        glowColor="orange"
      >
        <FormSection title="Techniciens" icon={Wrench}>
          <div className="space-y-4">
            {/* Technicien 1 */}
            <FormField
              control={form.control}
              name="technician1Id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      Technicien principal
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DynamicSelect
                      apiEndpoint={staffUrl + "?role=Technicien"}
                      placeholder="Sélectionner un technicien"
                      value={field.value}
                      onChange={field.onChange}
                      searchPlaceholder="Rechercher un technicien..."
                      emptyMessage="Aucun technicien trouvé"
                      labelKey="fullName"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormDescription>
                    Technicien principal pour ce site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technicien 2 */}
            <FormField
              control={form.control}
              name="technician2Id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      Technicien secondaire
                    </div>
                  </FormLabel>
                  <FormControl>
                    <DynamicSelect
                      apiEndpoint={staffUrl + "?role=Technicien"}
                      placeholder="Sélectionner un technicien"
                      value={field.value}
                      onChange={field.onChange}
                      searchPlaceholder="Rechercher un technicien..."
                      emptyMessage="Aucun technicien trouvé"
                      labelKey="fullName"
                      valueKey="id"
                    />
                  </FormControl>
                  <FormDescription>
                    Technicien de support pour ce site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormSection>
      </FormCard>
    </div>
  );
}