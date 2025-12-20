// src/features/customers/components/modals/contact-form-modal.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcnui/dialog";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    Form,
} from "@/shared/components/shadcnui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcnui/select";
import { Input } from "@/shared/components/shadcnui/input";
import { Button } from "@/shared/components/shadcnui/button";
import { Switch } from "@/shared/components/shadcnui/switch";
import { ContactFormValues, contactFormSchema } from "../../schemas/customer.schema";
import { PersonType, PreferredContactMethod } from "../../types/customer.types";
import { User, Mail, Phone, Briefcase, MessageSquare, Star, LoaderCircleIcon, Save } from "lucide-react";
import { useAddCustomerContact, useUpdateCustomerContact } from "../../hooks/user-customers.query";
import { ApiResponse, ApiValidationResponse } from "@/shared/types/common.types";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { ERROR_MESSAGES } from "@/shared/lib/constants/app.messages.constants";

interface ContactFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: ContactFormValues;
    mode: "create" | "edit";
    id?: string;
    customerId?: string;
}

export function ContactFormModal({
    open,
    onOpenChange,
    initialData,
    mode,
    id,
    customerId
}: ContactFormModalProps) {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        values: initialData || {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            mobile: "",
            position: "",
            type: PersonType.Individual,
            preferredContactMethod: PreferredContactMethod.Email,
            isPrimary: false,
        },
    });
    const addContactMutation = useAddCustomerContact(); 
    const updateContactMutation = useUpdateCustomerContact();
    const toast = useGMAOToast();
    const handleSubmit = (data: ContactFormValues) => {
        if (mode === "edit" && id) {
            updateContactMutation.mutate(
                {
                    id: customerId!,
                    contactId: id,
                    contact: data,
                },
                {
                    onSuccess: handleOnSuccessResponse,
                }
            );
        } else {
            addContactMutation.mutate(
                {
                    id: customerId!,
                    contact: data,
                },
                {
                    onSuccess: handleOnSuccessResponse,
                }
            );
        }

    };
    function handleOnSuccessResponse(response: ApiResponse<boolean> | ApiValidationResponse) {
        if (response.isSucceeded) {
            onOpenChange(false);
            form.reset();
            toast.success(`Contact ${mode === "edit" ? 'modifié' : 'créé'} avec succès`);
        }
        else {
            const errors = (response as ApiValidationResponse).errors;
            Object.entries(errors).forEach(([fieldName, errors]) => {
                form.setError(fieldName as any, { message: errors.join(", ") });
            })
            toast.error(response.errorMessage || ERROR_MESSAGES.VALIDATION_ERROR);
        }
    }

    const isSubmitting = addContactMutation.isPending || updateContactMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        {mode === "create" ? "Ajouter un contact" : "Modifier le contact"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Créez un nouveau contact pour ce client"
                            : "Modifiez les informations du contact"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Identité */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Identité
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Prénom
                                                <span className="text-destructive ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Jean" {...field} />
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
                                            <FormLabel>
                                                Nom
                                                <span className="text-destructive ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Dupont" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                Fonction
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Gestionnaire de copropriété" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(value) => field.onChange(Number(value) as PersonType)}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={String(PersonType.Individual)}>
                                                    Particulier
                                                </SelectItem>
                                                <SelectItem value={String(PersonType.Company)}>
                                                    Entreprise
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Coordonnées
                            </h4>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                Email
                                                <span className="text-destructive">*</span>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Ex: jean.dupont@example.com"
                                                {...field}
                                            />
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
                                            <FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    Téléphone
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: 01 23 45 67 89" {...field} />
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
                                            <FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    Mobile
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: 06 12 34 56 78" {...field} />
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
                                        <FormLabel>
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                Méthode de contact préférée
                                            </div>
                                        </FormLabel>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(value) =>
                                                field.onChange(Number(value) as PreferredContactMethod)
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={String(PreferredContactMethod.Email)}>
                                                    Email
                                                </SelectItem>
                                                <SelectItem value={String(PreferredContactMethod.Phone)}>
                                                    Téléphone
                                                </SelectItem>
                                                <SelectItem value={String(PreferredContactMethod.SMS)}>
                                                    SMS
                                                </SelectItem>
                                                <SelectItem value={String(PreferredContactMethod.WhatsApp)}>
                                                    WhatsApp
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contact principal */}
                        <FormField
                            control={form.control}
                            name="isPrimary"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm bg-primary/5 border border-primary/20">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/20">
                                                <Star className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <FormLabel className="text-base font-medium">
                                                    Contact principal
                                                </FormLabel>
                                                <FormDescription className="mt-0">
                                                    Ce contact sera le référent principal du client
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">
                                {isSubmitting ? <LoaderCircleIcon className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                {mode === "create" ? "Ajouter" : "Mettre à jour"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}