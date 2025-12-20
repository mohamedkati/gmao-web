"use client";

import { UseFormReturn } from "react-hook-form";
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
import { Home, FileText, MapPin, Copy } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { useEffect } from "react";
import { CustomerFormData } from "../../types/customer.types";

interface AddressesStepProps {
  form: UseFormReturn<CustomerFormData>;
}

export function AddressesStep({ form }: AddressesStepProps) {
  const sameAsInvoice = form.watch("sameAsInvoiceAddress");
  const invoiceAddress = form.watch("invoiceAddress");

  // Synchroniser les adresses si sameAsInvoice est activé
  useEffect(() => {
    if (sameAsInvoice) {
      form.setValue("mailingAddress", invoiceAddress);
    }
  }, [sameAsInvoice, invoiceAddress, form]);

  const copyInvoiceToMailing = () => {
    form.setValue("mailingAddress", invoiceAddress);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Adresse de facturation */}
      <FormCard
        title="Adresse de facturation"
        description="Adresse utilisée pour l'envoi des factures"
        icon={FileText}
        glowColor="orange"
      >
        <FormSection required title="">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Première ligne d'adresse */}
              <FormField
                control={form.control}
                name="invoiceAddress.firstAddressLine"
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
                        placeholder="Ex: Résidence les Jardins"
                        {...field}
                        className="backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormDescription>Nom du bâtiment, résidence...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seconde ligne d'adresse */}
              <FormField
                control={form.control}
                name="invoiceAddress.secondAddressLine"
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
              name="invoiceAddress.street"
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
                name="invoiceAddress.postalCode"
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
                name="invoiceAddress.city"
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
                name="invoiceAddress.country"
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
      </FormCard>

      {/* Séparateur avec option de copie */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="relative flex justify-center">
          <div className="backdrop-blur-xl bg-background px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <FormField
              control={form.control}
              name="sameAsInvoiceAddress"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium !mt-0 cursor-pointer">
                      Identique à l'adresse de facturation
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Adresse postale */}
      <FormCard
        title="Adresse postale"
        description="Adresse pour le courrier administratif"
        icon={Home}
        glowColor="blue"
      >
        {!sameAsInvoice && (
          <div className="mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyInvoiceToMailing}
              className="backdrop-blur-sm"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copier l'adresse de facturation
            </Button>
          </div>
        )}

        <FormSection required title="">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Première ligne d'adresse postale */}
              <FormField
                control={form.control}
                name="mailingAddress.firstAddressLine"
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
                        placeholder="Ex: Résidence les Jardins"
                        {...field}
                        className="backdrop-blur-sm"
                        disabled={sameAsInvoice}
                      />
                    </FormControl>
                    <FormDescription>Nom du bâtiment, résidence...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seconde ligne d'adresse postale */}
              <FormField
                control={form.control}
                name="mailingAddress.secondAddressLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seconde ligne d'adresse</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Bâtiment A"
                        {...field}
                        className="backdrop-blur-sm"
                        disabled={sameAsInvoice}
                      />
                    </FormControl>
                    <FormDescription>Complément d'adresse</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Rue postale */}
            <FormField
              control={form.control}
              name="mailingAddress.street"
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
                      disabled={sameAsInvoice}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Code postal postale */}
              <FormField
                control={form.control}
                name="mailingAddress.postalCode"
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
                        disabled={sameAsInvoice}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ville postale */}
              <FormField
                control={form.control}
                name="mailingAddress.city"
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
                        disabled={sameAsInvoice}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pays postale */}
              <FormField
                control={form.control}
                name="mailingAddress.country"
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
                        disabled={sameAsInvoice}
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

      {/* Preview des adresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <h4 className="font-semibold text-sm">Aperçu facturation</h4>
            </div>
            <AddressPreview address={invoiceAddress} />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-sm">Aperçu postale</h4>
            </div>
            <AddressPreview address={form.watch("mailingAddress")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressPreview({ address }: { address: any }) {
  return (
    <div className="text-sm space-y-1 text-muted-foreground">
      {address?.firstAddressLine && <p>{address.firstAddressLine}</p>}
      {address?.secondAddressLine && <p>{address.secondAddressLine}</p>}
      {address?.street && <p>{address.street}</p>}
      {(address?.postalCode || address?.city) && (
        <p className="font-medium text-foreground">
          {address.postalCode} {address.city}
        </p>
      )}
      {address?.country && <p>{address.country}</p>}
    </div>
  );
}