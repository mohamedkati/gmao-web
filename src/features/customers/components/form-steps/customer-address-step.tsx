// src/features/customers/components/form-steps/addresses-step.tsx

"use client";

import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Checkbox } from "@/shared/components/shadcnui/checkbox";
import { Separator } from "@/shared/components/shadcnui/separator";

export function AddressesStep({ form }: any) {
  const [sameAsInvoice, setSameAsInvoice] = useState(false);

  const handleSameAsInvoiceChange = (checked: boolean) => {
    setSameAsInvoice(checked);
    if (checked) {
      const invoiceAddress = form.getValues('invoiceAddress');
      form.setValue('mailingAddress', { ...invoiceAddress });
    }
  };

  return (
    <div className="space-y-8">
      {/* Invoice Address */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Adresse de facturation</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="invoiceAddress.firstAddressLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complément d'adresse 1</FormLabel>
                <FormControl>
                  <Input placeholder="Bâtiment, Étage..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceAddress.secondAddressLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complément d'adresse 2</FormLabel>
                <FormControl>
                  <Input placeholder="Appartement, Bureau..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceAddress.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rue *</FormLabel>
                <FormControl>
                  <Input placeholder="25 Avenue des Champs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="invoiceAddress.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal *</FormLabel>
                  <FormControl>
                    <Input placeholder="75008" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceAddress.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville *</FormLabel>
                  <FormControl>
                    <Input placeholder="Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="invoiceAddress.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays *</FormLabel>
                <FormControl>
                  <Input placeholder="France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Mailing Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Adresse postale</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsInvoice"
              checked={sameAsInvoice}
              onCheckedChange={handleSameAsInvoiceChange}
            />
            <label
              htmlFor="sameAsInvoice"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Identique à l'adresse de facturation
            </label>
          </div>
        </div>

        {!sameAsInvoice && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="mailingAddress.firstAddressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complément d'adresse 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Bâtiment, Étage..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mailingAddress.secondAddressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complément d'adresse 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Appartement, Bureau..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mailingAddress.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rue *</FormLabel>
                  <FormControl>
                    <Input placeholder="25 Avenue des Champs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mailingAddress.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal *</FormLabel>
                    <FormControl>
                      <Input placeholder="75008" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mailingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville *</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mailingAddress.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays *</FormLabel>
                  <FormControl>
                    <Input placeholder="France" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}