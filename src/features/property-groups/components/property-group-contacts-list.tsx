"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { Plus, MoreVertical, Mail, Phone, Edit, Trash, Star, Smartphone } from "lucide-react";
import { PropertyGroupContact } from "../types/property-group.types";
import {
    usePropertyGroupContacts,
    useDeletePropertyGroupContact,
} from "../hooks/index";
import { usePropertyGroupStore } from "../store/property-group.store";
import {
    contactRoleLabels,
    preferredContactMethodLabels,
} from "../utils/property-groups.utils";
import { PropertyGroupContactDrawer } from "./property-group-contact-drawer";

interface PropertyGroupContactsListProps {
    propertyGroupId: string;
}

export function PropertyGroupContactsList({ propertyGroupId }: PropertyGroupContactsListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<PropertyGroupContact | null>(null);

    const { data: contacts, isLoading } = usePropertyGroupContacts(propertyGroupId);
    const deleteMutation = useDeletePropertyGroupContact();
    const { openContactDrawer } = usePropertyGroupStore();

    const handleEdit = (contact: PropertyGroupContact, index: number) => {
        console.log(contact);
        openContactDrawer(index);
    };

    const handleDelete = (contact: PropertyGroupContact) => {
        setSelectedContact(contact);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedContact && selectedContact.id) {
            deleteMutation.mutate(
                { id: propertyGroupId, contactId: selectedContact.id },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setSelectedContact(null);
                    },
                }
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="spinner h-8 w-8" />
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Contacts du groupe</h3>
                        <p className="text-sm text-muted-foreground">
                            {contacts?.length || 0} contact(s) enregistré(s)
                        </p>
                    </div>
                    <Button onClick={() => openContactDrawer()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un contact
                    </Button>
                </div>

                {!contacts || contacts.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                            <p className="text-muted-foreground mb-4">
                                Aucun contact enregistré pour ce groupe
                            </p>
                            <Button onClick={() => openContactDrawer()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter le premier contact
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contacts.map((contact, index) => (
                            <Card key={contact.id || index} className="relative">
                                {contact.isPrimary && (
                                    <div className="absolute top-3 right-3">
                                        <Badge variant="default" className="gap-1">
                                            <Star className="h-3 w-3 fill-current" />
                                            Principal
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 pr-8">
                                            <CardTitle className="text-base">
                                                {contact.firstName} {contact.lastName}
                                            </CardTitle>
                                            <CardDescription className="space-y-1 mt-1">
                                                {contact.position && (
                                                    <span className="block">{contact.position}</span>
                                                )}
                                                <Badge variant="outline" className="text-xs">
                                                    {contactRoleLabels[contact.role]}
                                                </Badge>
                                            </CardDescription>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(contact, index)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(contact)}
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
                                    {/* Contact Info */}
                                    <div className="space-y-2">
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                                        >
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            {contact.email}
                                        </a>

                                        {contact.phone && (
                                            <a
                                                href={`tel:${contact.phone}`}
                                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                                            >
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                {contact.phone}
                                            </a>
                                        )}

                                        {contact.mobile && (
                                            <a
                                                href={`tel:${contact.mobile}`}
                                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                                            >
                                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                {contact.mobile}
                                            </a>
                                        )}
                                    </div>

                                    {/* Department */}
                                    {contact.department && (
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Service: </span>
                                            <span>{contact.department}</span>
                                        </div>
                                    )}

                                    {/* Contact Preferences */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {contact.receivesInvoices && (
                                            <Badge variant="secondary" className="text-xs">
                                                Factures
                                            </Badge>
                                        )}
                                        {contact.receivesReports && (
                                            <Badge variant="secondary" className="text-xs">
                                                Rapports
                                            </Badge>
                                        )}
                                        {contact.receivesAlerts && (
                                            <Badge variant="secondary" className="text-xs">
                                                Alertes
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Preferred Contact Method */}
                                    <div className="text-xs text-muted-foreground">
                                        Préfère: {preferredContactMethodLabels[contact.preferredContactMethod]}
                                    </div>

                                    {/* Notes */}
                                    {contact.notes && (
                                        <div className="pt-2 border-t">
                                            <p className="text-xs text-muted-foreground">{contact.notes}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Contact Drawer */}
            <PropertyGroupContactDrawer
                propertyGroupId={propertyGroupId}
                contacts={contacts || []}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le contact{" "}
                            <strong>
                                {selectedContact?.firstName} {selectedContact?.lastName}
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