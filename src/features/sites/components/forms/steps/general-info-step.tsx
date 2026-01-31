// src/features/sites/components/steps/general-info-step.tsx

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcnui/select";
import { Building, Hash, MapPin, Tag, FileText, Mail, Phone, Home, UserCog2Icon } from "lucide-react";
import { SiteType } from "../../../types/site.types";
import { DynamicSelect } from "@/shared/components/ui/dynamic-select-gen";

interface GeneralInfoStepProps {
    form: UseFormReturn<SiteFormData>;
}

const siteTypeLabels: Record<SiteType, string> = {
    [SiteType.ResidentialBuilding]: "Immeuble résidentiel",
    [SiteType.CommercialBuilding]: "Bâtiment commercial",
    [SiteType.MixedUse]: "Usage mixte",
    [SiteType.IndustrialFacility]: "Installation industrielle",
    [SiteType.Office]: "Bureau",
    [SiteType.Warehouse]: "Entrepôt",
    [SiteType.RetailStore]: "Magasin",
    [SiteType.Hotel]: "Hôtel",
    [SiteType.Hospital]: "Hôpital",
    [SiteType.School]: "École",
    [SiteType.GovernmentBuilding]: "Bâtiment gouvernemental",
};

export function GeneralInfoStep({ form }: GeneralInfoStepProps) {
    const siteType = form.watch("type");
    const siteName = form.watch("name");
    const reference = form.watch("reference");
    const customerId = form.watch("customerId");
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Preview Header */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-2xl" />
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-primary/20">
                            <Building className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">
                                {siteName || "Nouveau site"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {reference || "Aucune référence"} •{" "}
                                {siteTypeLabels[siteType]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informations principales */}
            <FormCard
                title="Informations principales"
                icon={Building}
                glowColor="primary"
            >
                <FormSection title="Identification" icon={Tag} required>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Input
                                            placeholder="Ex: SITE-001"
                                            {...field}
                                            className="backdrop-blur-sm"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Code unique pour identifier le site
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Nom */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground" />
                                            Nom du site
                                            <span className="text-destructive">*</span>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Résidence Les Jardins"
                                            {...field}
                                            className="backdrop-blur-sm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>

                <FormSection title="Type et classification" icon={MapPin} required className="mt-7">
                    <div className="space-y-4">
                        {/* Type de site */}
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type de site  <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <Select
                                        value={String(field.value)}
                                        onValueChange={(value) =>
                                            field.onChange(Number(value) as SiteType)
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger className="backdrop-blur-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(siteTypeLabels).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Client */}
                        <FormField
                            control={form.control}
                            name="customerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client  <span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <DynamicSelect
                                            apiEndpoint="/customers"
                                            placeholder="Sélectionner un client"
                                            value={field.value}
                                            onChange={field.onChange}
                                            searchPlaceholder="Rechercher un client..."
                                            emptyMessage="Aucun client trouvé"
                                            labelKey="companyName"
                                            valueKey="id"
                                            renderOption={(customer) => (
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium">{customer.companyName}</span>
                                                    <span className="text-xs text-muted-foreground hover:text-primary">{customer.reference}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        <Hash className="inline mr-1" /> {customer.propertyGroupName}
                                                        <UserCog2Icon className="inline mr-1 ml-3" /> {customer.commercialName}
                                                        <Home className="inline mr-1 ml-3" /> {customer.invoiceCity}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Client propriétaire du site
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contact client */}
                        <FormField
                            control={form.control}
                            name="clientContactId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact client principal</FormLabel>
                                    <FormControl>
                                        <DynamicSelect
                                            apiEndpoint={`/customers/${customerId}/contacts`}
                                            placeholder="Sélectionner un contact"
                                            value={field.value}
                                            onChange={field.onChange}
                                            searchPlaceholder="Rechercher un contact..."
                                            emptyMessage="Aucun contact trouvé"
                                            labelKey="fullName"
                                            valueKey="id"
                                            disabled={!customerId}
                                            renderOption={(contact) => (
                                                <div className="flex flex-col">
                                                    <span className="font-medium flex">
                                                        {contact.fullName}
                                                        {
                                                            contact.isPrimary && (
                                                                <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">Principal</span>
                                                            )
                                                        }
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        <Mail className="inline mr-1" /> {contact.email} {contact.phone ?
                                                            (<><Phone className="inline mr-1 ml-4" /> {contact.phone}</>) : ""}
                                                    </span>

                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Contact principal pour ce site
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Type de secteur */}
                            <FormField
                                control={form.control}
                                name="sectorTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type de secteur  <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <DynamicSelect
                                                apiEndpoint="/settings/sector-types"
                                                placeholder="Sélectionner"
                                                value={field.value}
                                                onChange={field.onChange}
                                                searchPlaceholder="Rechercher..."
                                                emptyMessage="Aucun type trouvé"
                                                labelKey="description"
                                                valueKey="id"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Type de client site */}
                            <FormField
                                control={form.control}
                                name="clientTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type de client  <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <DynamicSelect
                                                apiEndpoint="/settings/site-client-types"
                                                placeholder="Sélectionner"
                                                value={field.value}
                                                onChange={field.onChange}
                                                searchPlaceholder="Rechercher..."
                                                emptyMessage="Aucun type trouvé"
                                                labelKey="code"
                                                valueKey="id"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* TVA */}
                            <FormField
                                control={form.control}
                                name="vatId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>TVA  <span className="text-destructive">*</span></FormLabel>
                                        <FormControl>
                                            <DynamicSelect
                                                apiEndpoint="/settings/vat-rates"
                                                placeholder="Sélectionner"
                                                value={field.value}
                                                onChange={field.onChange}
                                                searchPlaceholder="Rechercher..."
                                                emptyMessage="Aucun taux trouvé"
                                                labelKey="name"
                                                valueKey="id"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </FormSection>

                <FormSection title="Commentaire" icon={FileText} className="mt-7">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Commentaire</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Notes ou informations importantes..."
                                        rows={4}
                                        {...field}
                                        className="backdrop-blur-sm resize-none"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Notes internes sur le site
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