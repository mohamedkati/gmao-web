"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "../../schemas/customer.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/shadcnui/form";
import { Input } from "@/shared/components/shadcnui/input";
import { Button } from "@/shared/components/shadcnui/button";
import { Switch } from "@/shared/components/shadcnui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import { CustomerContact, PersonType, PreferredContactMethod } from "../../../customers-v2/types/customer.types";
import { personTypeLabels, preferredContactMethodLabels } from "../../utils/customer.utils";
import { useEffect } from "react";

interface CustomerContactFormProps {
  initialData?: CustomerContact;
  onSubmit: (data: ContactFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  validationErrors?: Record<string, string[]>;
}

export function CustomerContactForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  validationErrors
}: CustomerContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    values: initialData
      ? {
        type: initialData.type,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone || "",
        mobile: initialData.mobile || "",
        position: initialData.position || "",
        isPrimary: initialData.isPrimary,
        preferredContactMethod: initialData.preferredContactMethod,
      }
      : {
        type: PersonType.Individual,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        mobile: "",
        position: "",
        isPrimary: false,
        preferredContactMethod: PreferredContactMethod.Email,
      },
  });

  useEffect(() => {
    if (validationErrors) {
      Object.entries(validationErrors).forEach(([fieldName, errors]) => {
        form.setError(fieldName as any, { message: errors.join(", ") });
      })
    }
  }, [validationErrors]);

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(personTypeLabels).map(([key, label]) => (
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

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fonction</FormLabel>
                <FormControl>
                  <Input placeholder="Directeur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom *</FormLabel>
                <FormControl>
                  <Input placeholder="Marie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Dubois" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="marie.dubois@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="0145678901" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="0612345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferredContactMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Méthode de contact préférée *</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(preferredContactMethodLabels).map(([key, label]) => (
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

        <FormField
          control={form.control}
          name="isPrimary"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Contact principal</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Définir comme contact principal pour ce client
                </div>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner mr-2 h-4 w-4" />
                Enregistrement...
              </>
            ) : initialData ? (
              "Mettre à jour"
            ) : (
              "Ajouter"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}