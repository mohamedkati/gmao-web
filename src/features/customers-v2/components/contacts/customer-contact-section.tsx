// src/features/customers/components/customer-contacts-section.tsx

"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Plus, Edit, Trash2, MoreVertical, Loader2 } from "lucide-react";
import { Customer, CustomerContact } from "../../types/customer.types";
import { ContactCardGlassCompact } from "../contact-card-glass-compact";
import { ContactFormModal } from "../modals/contact-form-modal";
import { ContactFormValues } from "../../schemas/customer.schema";
import { toast } from "sonner";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { useDeleteCustomerContact } from "../../hooks/user-customers.query";

interface CustomerContactsSectionProps {
    customer: Customer;
}

export function CustomerContactsSection({ customer }: CustomerContactsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<CustomerContact | null>(null);
    const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
    const deleteContactMutation = useDeleteCustomerContact();
    const handleDeleteContact = async (contactId: string) => {
        try {
            await deleteContactMutation.mutateAsync({ id: customer.id, contactId }, {
                onSuccess: () => {
                    toast.success("Contact supprimé avec succès");
                    setDeletingContactId(null);
                },
                onError: () => {
                    toast.error("Erreur lors de la suppression du contact");
                }
            });
        } catch (error) {
            toast.error("Erreur lors de la suppression du contact");
        }
    }


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Contacts</h2>
                    <p className="text-muted-foreground">
                        {customer.contacts.length} contact{customer.contacts.length > 1 ? "s" : ""} enregistré
                        {customer.contacts.length > 1 ? "s" : ""}
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="shadow-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un contact
                </Button>
            </div>

            {/* Liste des contacts */}
            {customer.contacts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {customer.contacts.map((contact, index) => (
                        <div key={contact.id} className="relative group">
                            <ContactCardGlassCompact contact={contact} index={index} onEdit={() => {
                                setEditingContact(contact);
                                setIsModalOpen(true);
                            }} onDelete={() => setDeletingContactId(contact.id!)} />

                        </div>
                    ))}
                </div>
            ) : (
                <EmptyContactsState onAdd={() => setIsModalOpen(true)} />
            )}

            {/* Modal d'ajout/édition */}
            <ContactFormModal
                open={isModalOpen}
                onOpenChange={(open) => {
                    setIsModalOpen(open);
                    if (!open) setEditingContact(null);
                }}
                initialData={editingContact || undefined}
                mode={editingContact ? "edit" : "create"}
                customerId={customer.id}
                id={editingContact?.id || undefined} />

            {/* Dialog de confirmation de suppression */}
            <AlertDialog
                open={!!deletingContactId}
                onOpenChange={(open) => !open && setDeletingContactId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce contact ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deletingContactId && handleDeleteContact(deletingContactId)}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {deleteContactMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// Empty state
function EmptyContactsState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="text-center py-20">
            <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
                <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
                    <Plus className="h-16 w-16 text-muted-foreground" />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Aucun contact</h3>
            <p className="text-muted-foreground mb-6">
                Ajoutez des contacts pour ce client
            </p>
            <Button size="lg" onClick={onAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un contact
            </Button>
        </div>
    );
}