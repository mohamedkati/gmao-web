"use client";

import { Button } from "@/shared/components/shadcnui/button";
import { User, Plus } from "lucide-react";
import { Customer } from "../../../types/customer.types";
import { ContactCardGlassCompact } from "../../contacts/contact-card-glass-compact";

interface CustomerContactsSectionProps {
  customer: Customer;
}

export function CustomerContactsSection({ customer }: CustomerContactsSectionProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contacts</h2>
          <p className="text-muted-foreground">
            {customer.contacts.length} contact{customer.contacts.length > 1 ? "s" : ""} enregistré{customer.contacts.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button className="shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un contact
        </Button>
      </div>

      {/* Liste des contacts */}
      {customer.contacts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {customer.contacts.map((contact, index) => (
            <ContactCardGlassCompact key={contact.id} contact={contact} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
            <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Aucun contact enregistré</h3>
          <p className="text-muted-foreground mb-6">
            Ajoutez des contacts pour ce client
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un contact
          </Button>
        </div>
      )}
    </div>
  );
}