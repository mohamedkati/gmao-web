"use client";

import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { SiteFormData } from "../../../schemas/site-form.schema";
import { FormCard, FormSection } from "@/shared/components/forms";
import { Input } from "@/shared/components/shadcnui/input";
import { Switch } from "@/shared/components/shadcnui/switch";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/shared/components/shadcnui/form";
import { Home, FileText, MapPin, Copy, Navigation } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { LocationPicker } from "@/shared/components/maps/location-picker";

interface AddressesStepProps {
    form: UseFormReturn<SiteFormData>;
}

export function AddressesStep({ form }: AddressesStepProps) {
    const sameAsBilling = form.watch("sameAsBillingAddress");
    const address = form.watch("address");
    const coordinates = form.watch("coordinates");
    const [mapKey, setMapKey] = useState(0);

    // Construire l'adresse complète pour le géocodage
    const fullAddress = address
        ? `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`
        : undefined;

    // Synchroniser les adresses si sameAsBilling est activé
    useEffect(() => {
        if (sameAsBilling) {
            form.setValue("billingAddress", address);
        }
    }, [sameAsBilling, address, form]);

    //Forcer le remontage de la carte à chaque fois qu'on arrive sur ce step
    useEffect(() => {
        // Générer une nouvelle key à chaque montage du composant
        setMapKey(Date.now());
    }, []);
    const copyToBilling = () => {
        form.setValue("billingAddress", address);
    };


    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Adresse principale */}
            <FormCard
                title="Adresse principale"
                description="Adresse physique du site"
                icon={Home}
                glowColor="blue"
            >
                <FormSection required title="">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Première ligne */}
                            <FormField
                                control={form.control}
                                name="address.firstAddressLine"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Home className="h-4 w-4 text-muted-foreground" />
                                                Première ligne d'adresse
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Résidence Les Jardins"
                                                {...field}
                                                className="backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Nom du bâtiment, résidence...
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Seconde ligne */}
                            <FormField
                                control={form.control}
                                name="address.secondAddressLine"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seconde ligne d'adresse</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Bâtiment A"
                                                {...field}
                                                className="backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormDescription>Complément d'adresse</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Rue */}
                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            Rue
                                            <span className="text-destructive">*</span>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: 123 Avenue des Champs-Élysées"
                                            {...field}
                                            className="backdrop-blur-sm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Code postal */}
                            <FormField
                                control={form.control}
                                name="address.postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Code postal
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: 75008"
                                                {...field}
                                                className="backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Ville */}
                            <FormField
                                control={form.control}
                                name="address.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Ville
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Paris"
                                                {...field}
                                                className="backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Pays */}
                            <FormField
                                control={form.control}
                                name="address.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Pays
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: France"
                                                {...field}
                                                className="backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </FormSection>

                {/* Coordonnées GPS */}
                <FormSection
                    title="Coordonnées GPS"
                    description="Position géographique du site"
                    icon={Navigation}
                    className="mt-7"
                >
                    <FormField
                        control={form.control}
                        name="coordinates"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <LocationPicker
                                        key={`location-picker-${mapKey}`} // Key unique
                                        value={field.value}
                                        onChange={field.onChange}
                                        address={fullAddress}
                                        height="400px"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Cliquez sur la carte ou utilisez les boutons pour définir la
                                    position
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormSection>
            </FormCard>

            {/* Séparateur */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="backdrop-blur-xl bg-background px-4 py-2 rounded-full border border-white/20 shadow-lg">
                        <FormField
                            control={form.control}
                            name="sameAsBillingAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-3">
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-medium !mt-0 cursor-pointer">
                                            Identique à l'adresse principale
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Adresse de facturation */}
            <FormCard
                title="Adresse de facturation"
                description="Adresse pour l'envoi des factures"
                icon={FileText}
                glowColor="orange"
                className=""
            >
                {!sameAsBilling && (
                    <div className="mb-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={copyToBilling}
                            className="backdrop-blur-sm"
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copier l'adresse principale
                        </Button>
                    </div>
                )}

                <FormSection required title="">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="billingAddress.firstAddressLine"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Première ligne d'adresse</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Résidence Les Jardins"
                                                {...field}
                                                className="backdrop-blur-sm"
                                                disabled={sameAsBilling}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingAddress.secondAddressLine"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seconde ligne d'adresse</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Bâtiment A"
                                                {...field}
                                                className="backdrop-blur-sm"
                                                disabled={sameAsBilling}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="billingAddress.street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Rue
                                        <span className="text-destructive ml-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: 123 Avenue des Champs-Élysées"
                                            {...field}
                                            className="backdrop-blur-sm"
                                            disabled={sameAsBilling}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="billingAddress.postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Code postal
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: 75008"
                                                {...field}
                                                className="backdrop-blur-sm"
                                                disabled={sameAsBilling}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingAddress.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Ville
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Paris"
                                                {...field}
                                                className="backdrop-blur-sm"
                                                disabled={sameAsBilling}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingAddress.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Pays
                                            <span className="text-destructive ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: France"
                                                {...field}
                                                className="backdrop-blur-sm"
                                                disabled={sameAsBilling}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </FormSection>
            </FormCard>
        </div>
    );
}