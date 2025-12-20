"use client";

import { UseFormReturn } from "react-hook-form";
import { FormCard, FormSection } from "@/shared/components/forms";
import { Input } from "@/shared/components/shadcnui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcnui/select";
import {
    CreditCard,
    Building,
    Clock,
    Calendar,
    Percent,
    Zap,
    Mail,
    AlertCircle,
} from "lucide-react";
import { CustomerFormData } from "../../types/customer.types";
import { Slider } from "@/shared/components/shadcnui/slider";
import { billingModeLabels, invoiceFrequencyLabels } from "../../utils/customer.utils";
import { OptionToggleCard } from "@/shared/components/cards/option-toggle-card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/shadcnui/form";

interface BillingStepProps {
    form: UseFormReturn<CustomerFormData>;
}

export function BillingStep({ form }: BillingStepProps) {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = form;

    const billingMode = watch("billingSettings.mode");
    const invoiceFrequency = watch("billingSettings.invoiceFrequency");
    const paymentTermsDays = watch("billingSettings.paymentTermsDays");
    const autoGenerate = watch("billingSettings.autoGenerateInvoices");
    const sendEmail = watch("billingSettings.sendEmailNotifications");
    const applyLateFees = watch("billingSettings.applyLatePaymentFees");
    const lateFeesPercent = watch("billingSettings.latePaymentFeePercent") || 0;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Paramètres de facturation */}
            <FormCard
                title="Paramètres de facturation"
                description="Configuration du mode de facturation"
                icon={CreditCard}
                glowColor="primary"
            >
                <FormSection
                    title="Mode de facturation"
                    description="Définit comment les factures sont générées"
                    icon={Building}
                    required
                >
                    <FormField
                        control={form.control}
                        name="billingSettings.mode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <div className="flex items-center gap-2">
                                        Mode
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez un mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(billingModeLabels).map(([key, value]) => {
                                                return <SelectItem value={key} key={key}>
                                                    {value}
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormSection>

                <FormSection
                    title="Fréquence de facturation"
                    description="Périodicité d'émission des factures"
                    icon={Clock}
                    required
                    className="mt-2"
                >
                    <FormField
                        control={form.control}
                        name="billingSettings.invoiceFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <div className="flex items-center gap-2">
                                        Fréquence
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez une fréquence" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(invoiceFrequencyLabels).map(([key, value]) => {
                                                return <SelectItem value={key} key={key}>
                                                    {value}
                                                </SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormSection>
                
            </FormCard>

            {/* Options de facturation */}
            <FormCard
                title="Options automatiques"
                description="Paramètres de génération et notification"
                icon={Zap}
                glowColor="green"
            >
                <FormSection title="">
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="billingSettings.autoGenerateInvoices"
                            render={({ field }) => (
                                <FormItem>
                                    <OptionToggleCard
                                        label="Génération automatique des factures"
                                        description="Les factures seront créées automatiquement selon la fréquence définie"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        icon={Zap}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billingSettings.invoiceFrequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <OptionToggleCard
                                            label="Notifications par email"
                                            checked={sendEmail}
                                            icon={sendEmail ? Mail : undefined}
                                            onChange={field.onChange}
                                        /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billingSettings.applyLatePaymentFees"
                            render={({ field }) => (
                                <FormItem>
                                    <OptionToggleCard
                                        label="Application des frais de retard"
                                        description="Ajouter automatiquement des pénalités en cas de retard de paiement"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        icon={AlertCircle}
                                        badge={
                                            field.value
                                                ? {
                                                    label: `${lateFeesPercent}%`,
                                                    variant: "outline",
                                                    className:
                                                        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
                                                }
                                                : undefined
                                        }
                                    />
                                </FormItem>
                            )}
                        />

                        {applyLateFees && (
                            <div className="ml-12 animate-in slide-in-from-top-2 duration-300">
                                <FormField
                                    control={form.control}
                                    name="billingSettings.latePaymentFeePercent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pourcentage des frais : {lateFeesPercent}%</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    value={[lateFeesPercent]}
                                                    onValueChange={([value]) => field.onChange(value)}
                                                    min={0}
                                                    max={20}
                                                    step={0.5}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                                <span>0%</span>
                                                <span>5%</span>
                                                <span>10%</span>
                                                <span>20%</span>
                                            </div>
                                            <FormDescription>
                                                Taux appliqué en cas de retard de paiement
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </FormSection>
            </FormCard>

            {/* Coefficients de tarification */}
            <FormCard
                title="Coefficients de tarification"
                description="Multiplicateurs appliqués aux prix de base"
                icon={Percent}
                glowColor="indigo"
            >
                <FormSection
                    title="Coefficients par catégorie"
                    description="Facteurs de multiplication pour chaque type de prestation"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CoefficientInput
                            control={form.control}
                            label="Main d'œuvre"
                            name="pricingCoefficients.laborCoefficient"
                            color="blue"
                        />

                        <CoefficientInput
                            control={form.control}
                            label="Matériaux"
                            name="pricingCoefficients.materialCoefficient"
                            color="green"
                        />

                        <CoefficientInput
                            control={form.control}
                            label="Équipement"
                            name="pricingCoefficients.equipmentCoefficient"
                            color="purple"
                        />

                        <CoefficientInput
                            control={form.control}
                            label="Sous-traitance"
                            name="pricingCoefficients.subcontractorCoefficient"
                            color="orange"
                        />
                    </div>
                </FormSection>
            </FormCard>
        </div >
    );
}

// Composant helper pour les coefficients
function CoefficientInput({
    control,
    name,
    label,
    color,
}: {
    control: any;
    name: any;
    label: string;
    color: string;
}) {
    const colorMap: Record<string, string> = {
        blue: "from-blue-500/10 to-transparent border-blue-500/20",
        green: "from-green-500/10 to-transparent border-green-500/20",
        purple: "from-purple-500/10 to-transparent border-purple-500/20",
        orange: "from-orange-500/10 to-transparent border-orange-500/20",
    };

    return (
        <div className={`p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br border ${colorMap[color]}`}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-muted-foreground">×</span>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder="1.0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    className="backdrop-blur-sm font-mono text-lg"
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}