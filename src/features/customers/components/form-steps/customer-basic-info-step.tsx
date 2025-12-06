
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Textarea } from "@/shared/components/shadcnui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { customerTypeLabels } from "../../utils/customer.utils";
import { PropertyGroupSelect } from "../dynamic-selects/property-group-select";

export function BasicInfoStep({ form }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Référence *</FormLabel>
              <FormControl>
                <Input placeholder="CLI-001" {...field} />
              </FormControl>
              <FormDescription>
                Identifiant unique du client
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de client *</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(customerTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise *</FormLabel>
            <FormControl>
              <Input placeholder="Résidence Les Jardins" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="siren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SIREN</FormLabel>
              <FormControl>
                <Input placeholder="123456789" maxLength={9} {...field} />
              </FormControl>
              <FormDescription>
                9 chiffres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>
                Rattacher à un groupe existant
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Commentaire</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Informations complémentaires sur le client..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}