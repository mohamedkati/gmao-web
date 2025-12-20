// src/features/customers/components/steps/general-info-step.tsx

"use client";

import { UseFormReturn } from "react-hook-form";
import { FormCard, FormSection } from "@/shared/components/forms";
import { Input } from "@/shared/components/shadcnui/input";
import { Textarea } from "@/shared/components/shadcnui/textarea";
import { Switch } from "@/shared/components/shadcnui/switch";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/shared/components/shadcnui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcnui/select";
import { Building, Hash, Tag, Users2, Briefcase, User, FileText, CheckCircle2 } from "lucide-react";
import { CustomerFormData, CustomerType } from "../../types/customer.types";
import { DynamicSelect } from "@/shared/components/ui/dynamic-select";
import { PropertyGroupSelect } from "../../dynamic-selects/property-group-select";
import { StaffSelect } from "../../dynamic-selects/staff-selec";

interface GeneralInfoStepProps {
    form: UseFormReturn<CustomerFormData>;
}

export function GeneralInfoStep({ form }: GeneralInfoStepProps) {
    const customerType = form.watch("type");
    const isActive = form.watch("active");

    const getTypeIcon = (type: CustomerType) => {
        const icons = {
            [CustomerType.PropertyManager]: Building,
            [CustomerType.Syndic]: Users2,
            [CustomerType.Corporate]: Briefcase,
            [CustomerType.Individual]: User,
            [CustomerType.Government]: Building,
        };
        return icons[type] || Building;
    };

    const TypeIcon = getTypeIcon(customerType);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header avec preview */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-2xl" />
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-xl bg-primary/20">
                                <TypeIcon className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">
                                    {form.watch("companyName") || "Nouveau client"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {form.watch("reference") || "Aucune référence"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{isActive ? "Actif" : "Inactif"}</span>
                            <div className={`h-3 w-3 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-muted"}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Informations principales */}
            <FormCard title="Informations principales" icon={Building} glowColor="primary">
                <FormSection title="Identification" icon={Tag} required>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Raison sociale */}
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground" />
                                            Raison sociale
                                            <span className="text-destructive">*</span>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Résidence Okaya" {...field} className="backdrop-blur-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Référence */}
                        <FormField
                            control={form.control}
                            name="reference"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Hash className="h-4 w-4 text-muted-foreground" />
                                            Référence
                                            <span className="text-destructive">*</span>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: CLI-001" {...field} className="backdrop-blur-sm" />
                                    </FormControl>
                                    <FormDescription>Code unique pour identifier le client</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Type de client" icon={Users2} required>
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type *</FormLabel>
                                <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value) as CustomerType)}>
                                    <FormControl>
                                        <SelectTrigger className="backdrop-blur-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={String(CustomerType.PropertyManager)}>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4" />
                                                Gestionnaire immobilier
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={String(CustomerType.Syndic)}>
                                            <div className="flex items-center gap-2">
                                                <Users2 className="h-4 w-4" />
                                                Syndic de copropriété
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={String(CustomerType.Corporate)}>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" />
                                                Entreprise
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={String(CustomerType.Individual)}>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                Particulier
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={String(CustomerType.Government)}>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4" />
                                                Administration publique
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormSection>
            </FormCard>

            {/* Informations complémentaires */}
            <FormCard title="Informations complémentaires" icon={FileText} glowColor="blue">
                <FormSection title="Statut et commentaires" icon={CheckCircle2}>
                    <div className="space-y-4">
                        {/* Switch Actif/Inactif */}
                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-green-500/20">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <FormLabel className="text-base font-medium">Client actif</FormLabel>
                                                <FormDescription className="mt-0">Autoriser les opérations pour ce client</FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Commentaire */}
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            Commentaire
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Client VIP, contact privilégié..." rows={4} {...field} className="backdrop-blur-sm resize-none" />
                                    </FormControl>
                                    <FormDescription>Notes internes ou informations importantes</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>
            </FormCard>

            {/* Associations avec DynamicSelect */}
            <FormCard title="Associations" icon={Users2} glowColor="purple">
                <FormSection title="Groupe et commercial">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Groupe immobilier avec DynamicSelect */}
                        <FormField
                            control={form.control}
                            name="propertyGroupId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Groupe immobilier</FormLabel>
                                    <FormControl>
                                        <PropertyGroupSelect
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            allowClear={true}
                                        />
                                    </FormControl>
                                    <FormDescription>Groupe de propriétés associé</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Commercial avec DynamicSelect */}
                        <FormField
                            control={form.control}
                            name="commercialId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commercial assigné</FormLabel>
                                    <FormControl>
                                        <StaffSelect
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            allowClear={true}
                                        />
                                    </FormControl>
                                    <FormDescription>Responsable du compte client</FormDescription>
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