"use client";

import { useState } from "react";
import {  CustomerContact } from "../../../customers-v2/types/customer.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/shadcnui/alert-dialog";
import {
    Plus,
    MoreVertical,
    Edit,
    Trash,
    Mail,
    Phone,
    Smartphone,
    CheckCircle2,
    Users,
} from "lucide-react";
import { useCustomerStore } from "../../stores/customer.store";
import { useCustomerContacts, useDeleteCustomerContact } from "../../hooks/user-customers.query";
import { preferredContactMethodLabels } from "../../utils/customer.utils";
import { useGMAOToast } from "@/shared/components/Toaster/toaster";
import { SkeletonLoader } from "@/shared/components";

interface CustomerContactsListProps {
    // customer: Customer;
}

export function CustomerContactsList({ }: CustomerContactsListProps) {
    const { openContactDrawer, selectedCustomerId } = useCustomerStore();
    const deleteContactMutation = useDeleteCustomerContact();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<CustomerContact | null>(null);
    const toast = useGMAOToast();
    const handleAddContact = () => {
        openContactDrawer();
    };

    const handleEditContact = (contactId: string) => {
        openContactDrawer(contactId);
    };

    const handleDeleteContact = (contact: CustomerContact) => {
        setContactToDelete(contact);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (contactToDelete && contactToDelete.id) {
            deleteContactMutation.mutate(
                { id: selectedCustomerId!, contactId: contactToDelete.id },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setContactToDelete(null);
                        toast.success('Contact supprimé avec succès');
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || 'Erreur lors de la suppression du contact');
                    }
                }
            );
        }
    };

    const { data: contacts, isLoading } = useCustomerContacts(selectedCustomerId || '');

    if (isLoading)
        return <SkeletonLoader type="card" count={3} />

    if (contacts === undefined)
        return <NoContactsFound handleAddContact={handleAddContact} />

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Contacts</h3>
                    <Button onClick={handleAddContact} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un contact
                    </Button>
                </div>

                {contacts.length === 0 ? (
                    <NoContactsFound handleAddContact={handleAddContact} />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {contacts.map((contact, index) => (
                            <Card key={contact.id || index}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">
                                                    {contact.firstName} {contact.lastName}
                                                </CardTitle>
                                                {contact.isPrimary && (
                                                    <Badge variant="default" className="gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Principal
                                                    </Badge>
                                                )}
                                            </div>
                                            {contact.position && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {contact.position}
                                                </p>
                                            )}
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditContact(contact.id!)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteContact(contact)}
                                                    className="text-destructive"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-primary hover:underline"
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                        {contact.phone && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={`tel:${contact.phone}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {contact.phone}
                                                </a>
                                            </div>
                                        )}
                                        {contact.mobile && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={`tel:${contact.mobile}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {contact.mobile}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Préfère: {preferredContactMethodLabels[contact.preferredContactMethod]}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le contact{" "}
                            <strong>
                                {contactToDelete?.firstName} {contactToDelete?.lastName}
                            </strong>{" "}
                            ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

function NoContactsFound({ handleAddContact }) {
    return <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Aucun contact enregistré</p>
            <p className="text-sm text-muted-foreground mb-4">
                Ajoutez des contacts pour faciliter la communication
            </p>
            <Button onClick={handleAddContact} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter le premier contact
            </Button>
        </CardContent>
    </Card>;
}