
"use client";

import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Mail, Phone, MessageSquare, Star, Briefcase, ExternalLink } from "lucide-react";
import { CustomerContact, PersonType, PreferredContactMethod } from "../types/customer.types";
import { cn } from "@/shared/lib/utils/cn";

interface ContactCardBusinessProps {
  contact: CustomerContact;
  index: number;
}

export function ContactCardBusiness({ contact, index }: ContactCardBusinessProps) {
  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getContactMethodIcon = (method: PreferredContactMethod) => {
    switch (method) {
      case PreferredContactMethod.Email:
        return Mail;
      case PreferredContactMethod.Phone:
        return Phone;
      case PreferredContactMethod.SMS:
      case PreferredContactMethod.WhatsApp:
        return MessageSquare;
      default:
        return Mail;
    }
  };

  const fullName = contact.fullName || `${contact.firstName} ${contact.lastName}`;
  const PreferredIcon = getContactMethodIcon(contact.preferredContactMethod);

  return (
    <div className="group perspective-1000">
      <div 
        className={cn(
          "relative p-6 rounded-2xl border-2 transition-all duration-500",
          "bg-gradient-to-br from-background via-background to-muted/30",
          "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100",
          contact.isPrimary 
            ? "border-primary/50 shadow-lg shadow-primary/5" 
            : "border-border"
        )}
      >
        {/* Decorative corner */}
        {contact.isPrimary && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full rounded-tr-2xl" />
        )}

        {/* Badge numéro */}
        <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg flex items-center justify-center text-primary-foreground font-bold text-sm z-10">
          {index + 1}
        </div>

        {/* Header avec Avatar et Status */}
        <div className="flex items-start gap-4 mb-6 relative z-10">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-background shadow-xl">
              <AvatarFallback 
                className={cn(
                  "text-xl font-bold",
                  contact.isPrimary 
                    ? "bg-gradient-to-br from-primary to-primary/60 text-primary-foreground"
                    : "bg-gradient-to-br from-muted to-muted/50"
                )}
              >
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            
            {/* Indicateur principal */}
            {contact.isPrimary && (
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-primary rounded-full shadow-lg">
                <Star className="h-3 w-3 text-primary-foreground fill-primary-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="font-bold text-lg leading-tight truncate">
                  {fullName}
                </h4>
                {contact.position && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {contact.position}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 items-end">
                {contact.isPrimary && (
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                    Principal
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {contact.type === PersonType.Company ? "Entreprise" : "Particulier"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Divider avec gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

        {/* Contact Info avec actions */}
        <div className="space-y-2 mb-5">
          <a 
            href={`mailto:${contact.email}`}
            className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 group-hover/item:bg-blue-500/20 group-hover/item:scale-110 transition-all">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="flex-1 text-sm font-medium truncate">{contact.email}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
          </a>

          {contact.phone && (
            <a 
              href={`tel:${contact.phone}`}
              className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-green-500/10 group-hover/item:bg-green-500/20 group-hover/item:scale-110 transition-all">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-medium">{contact.phone}</span>
                <Badge variant="secondary" className="text-xs">Tél</Badge>
              </div>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </a>
          )}

          {contact.mobile && (
            <a 
              href={`tel:${contact.mobile}`}
              className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-purple-500/5 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 group-hover/item:bg-purple-500/20 group-hover/item:scale-110 transition-all">
                <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-medium">{contact.mobile}</span>
                <Badge variant="secondary" className="text-xs">Mobile</Badge>
              </div>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </a>
          )}
        </div>

        {/* Footer avec méthode préférée */}
        <div className="flex items-center justify-between pt-4 border-t border-dashed">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <PreferredIcon className="h-3.5 w-3.5" />
            <span>Préfère: <strong className="text-foreground">{contact.preferredContactMethod === PreferredContactMethod.Email ? "Email" : contact.preferredContactMethod === PreferredContactMethod.Phone ? "Téléphone" : "SMS"}</strong></span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
}