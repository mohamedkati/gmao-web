'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/shared/components/shadcnui/sheet';
import { Button } from '@/shared/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/shadcnui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Checkbox } from '@/shared/components/shadcnui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/shadcnui/select';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import {
    LEGAL_FORM_OPTIONS,
    PROPERTY_GROUP_STATUS_OPTIONS,
    PROPERTY_GROUP_TYPE_OPTIONS,
} from '../constants/property-group-metadata';
import { PropertyGroup } from '../types/property-group';
import {
    PropertyGroupFormValues,
    propertyGroupFormSchema,
} from '../schemas/property-group-form.schema';

type PropertyGroupFormMode = 'create' | 'edit';

interface PropertyGroupFormDrawerProps {
    open: boolean;
    mode: PropertyGroupFormMode;
    initialGroup: PropertyGroup;
    onOpenChange: (open: boolean) => void;
    onSubmit: (group: PropertyGroup) => void;
}

const toFormValues = (group: PropertyGroup): PropertyGroupFormValues => ({
    id: group.id,
    reference: group.reference,
    name: group.name,
    description: group.description ?? '',
    status: group.status,
    type: group.type,
    consolidatedBilling: group.consolidatedBilling,
    paymentTermsDays: group.paymentTermsDays,
    volumeDiscountPercent: group.volumeDiscountPercent,
    preferredPaymentMethod: group.preferredPaymentMethod ?? '',
    mainContactName: group.mainContactName ?? '',
    mainContactEmail: group.mainContactEmail ?? '',
    mainContactPhone: group.mainContactPhone ?? '',
    legalName: group.legalName ?? '',
    siren: group.siren ?? '',
    vatNumber: group.vatNumber ?? '',
    legalForm: group.legalForm,
    totalCustomers: group.totalCustomers,
    totalSites: group.totalSites,
    totalUnits: group.totalUnits,
    totalAnnualRevenue: group.totalAnnualRevenue,
});

const sanitizeText = (value?: string | null) => {
    if (typeof value !== 'string') {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};

export function PropertyGroupFormDrawer({
    open,
    mode,
    initialGroup,
    onOpenChange,
    onSubmit,
}: PropertyGroupFormDrawerProps) {
    const defaultValues = useMemo(() => toFormValues(initialGroup), [initialGroup]);

    const form = useForm<PropertyGroupFormValues>({
        resolver: zodResolver(propertyGroupFormSchema),
        defaultValues,
    });

    useEffect(() => {
        if (open) {
            form.reset(defaultValues);
        }
    }, [open, defaultValues, form]);

    const handleSubmit = (values: PropertyGroupFormValues) => {
        const merged: PropertyGroup = {
            ...initialGroup,
            ...values,
            description: sanitizeText(values.description),
            preferredPaymentMethod: sanitizeText(values.preferredPaymentMethod),
            mainContactName: sanitizeText(values.mainContactName),
            mainContactEmail: sanitizeText(values.mainContactEmail) ?? undefined,
            mainContactPhone: sanitizeText(values.mainContactPhone),
            legalName: sanitizeText(values.legalName),
            siren: sanitizeText(values.siren),
            vatNumber: sanitizeText(values.vatNumber),
            legalForm: values.legalForm,
            volumeDiscountPercent: values.volumeDiscountPercent ?? undefined,
        };

        onSubmit(merged);
        onOpenChange(false);
    };

    const submitLabel = mode === 'create' ? 'Créer le groupe' : 'Mettre à jour';

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full border-l bg-background/95 p-0 sm:max-w-2xl">
                <div className="flex h-full flex-col">
                    <div className="border-b px-6 py-5">
                        <SheetHeader className="space-y-1">
                            <SheetTitle className="text-2xl font-semibold">
                                {mode === 'create' ? 'Nouveau groupe immobilier' : 'Modifier le groupe'}
                            </SheetTitle>
                            <SheetDescription className="text-sm text-muted-foreground">
                                Renseignez les informations clés pour piloter la relation et la facturation de ce groupe.
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col">
                            <ScrollArea className="flex-1 px-6 py-6">
                                <div className="space-y-6 pb-6">
                                    <section className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                Informations générales
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Identité du groupe et statut commercial.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="reference"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Référence</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="PG-2024-123" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nom du groupe</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Nom officiel ou commercial" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Décrivez la stratégie, le périmètre et les actifs clés du groupe"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Statut</FormLabel>
                                                        <Select
                                                            value={String(field.value)}
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Statut" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {PROPERTY_GROUP_STATUS_OPTIONS.map((option) => (
                                                                    <SelectItem key={option.value} value={String(option.value)}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Typologie</FormLabel>
                                                        <Select
                                                            value={String(field.value)}
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Type de groupe" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {PROPERTY_GROUP_TYPE_OPTIONS.map((option) => (
                                                                    <SelectItem key={option.value} value={String(option.value)}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                Légal & conformité
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Cadre juridique et informations réglementaires.
                                            </p>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="legalName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Dénomination légale</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Nom inscrit au registre" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="legalForm"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Forme juridique</FormLabel>
                                                        <Select
                                                            value={field.value ? String(field.value) : ''}
                                                            onValueChange={(value) =>
                                                                field.onChange(value === '' ? undefined : Number(value))
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Sélectionner" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {/* <SelectItem value="">Non renseigné</SelectItem> */}
                                                                {LEGAL_FORM_OPTIONS.map((option) => (
                                                                    <SelectItem key={option.value} value={String(option.value)}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="siren"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>N° SIREN</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="123 456 789" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="vatNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>N° TVA intracommunautaire</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="FRXX999999999" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                Facturation & performance
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Paramètres financiers et indicateurs consolidés.
                                            </p>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="consolidatedBilling"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(checked) => field.onChange(checked === true)}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>Facturation consolidée</FormLabel>
                                                        <FormDescription>
                                                            Active la consolidation des factures multi-sites pour ce groupe.
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="paymentTermsDays"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Conditions de paiement (jours)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                max={365}
                                                                value={field.value}
                                                                onChange={(event) =>
                                                                    field.onChange(Number(event.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="volumeDiscountPercent"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Remise volume (%)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                max={100}
                                                                value={field.value ?? ''}
                                                                onChange={(event) =>
                                                                    field.onChange(
                                                                        event.target.value === ''
                                                                            ? undefined
                                                                            : Number(event.target.value),
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormDescription>Optionnel</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="preferredPaymentMethod"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Moyen de paiement privilégié</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Virement, prélèvement, chèque..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="totalCustomers"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Clients rattachés</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                value={field.value}
                                                                onChange={(event) =>
                                                                    field.onChange(Number(event.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="totalSites"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Sites gérés</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                value={field.value}
                                                                onChange={(event) =>
                                                                    field.onChange(Number(event.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="totalUnits"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Unités</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                value={field.value}
                                                                onChange={(event) =>
                                                                    field.onChange(Number(event.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="totalAnnualRevenue"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>CA annuel estimé (€)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                step={1000}
                                                                value={field.value}
                                                                onChange={(event) =>
                                                                    field.onChange(Number(event.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                Contact principal
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Informations de votre interlocuteur privilégié.
                                            </p>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="mainContactName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nom complet</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Prénom Nom" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="mainContactEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email professionnel</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="contact@exemple.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="mainContactPhone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Téléphone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+33 6 12 34 56 78" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </ScrollArea>
                            <SheetFooter className="flex-col-reverse gap-3 border-t bg-background/90 px-6 py-5 sm:flex-row sm:justify-end sm:gap-2">
                                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {submitLabel}
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
}