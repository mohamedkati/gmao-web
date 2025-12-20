// src/features/customers/components/contact-list-compact.tsx

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Mail, Phone, ChevronDown, ChevronRight, Star, Copy, MessageSquare } from "lucide-react";
import { CustomerContact, PersonType, PreferredContactMethod } from "../types/customer.types";
import { cn } from "@/shared/lib/utils/cn";

interface ContactListCompactProps {
  contact: CustomerContact;
  index: number;
}

export function ContactListCompact({ contact, index }: ContactListCompactProps) {
  const [isExpanded, setIsExpanded] = useState(contact.isPrimary); // Principal ouvert par défaut

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const fullName = contact.fullName || `${contact.firstName} ${contact.lastName}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  return (
    <div 
      className={cn(
        "border rounded-xl overflow-hidden transition-all duration-300",
        isExpanded ? "shadow-lg" : "hover:shadow-md",
        contact.isPrimary && "border-primary/30 bg-primary/5"
      )}
    >
      {/* Header cliquable */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Expand icon */}
        <div className="shrink-0">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        {/* Avatar */}
        <div className="relative shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarFallback 
              className={cn(
                "font-semibold",
                contact.isPrimary 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted"
              )}
            >
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          {contact.isPrimary && (
            <div className="absolute -top-1 -right-1 p-1 bg-primary rounded-full">
              <Star className="h-3 w-3 text-primary-foreground fill-primary-foreground" />
            </div>
          )}
        </div>

        {/* Info compacte */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold truncate">{fullName}</span>
            {contact.isPrimary && (
              <Badge variant="default" className="text-xs shrink-0">Principal</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {contact.email}
            </span>
            {contact.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {contact.phone}
              </span>
            )}
          </div>
        </div>

        {/* Quick badges */}
        <div className="shrink-0 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {contact.type === PersonType.Company ? "Entreprise" : "Particulier"}
          </Badge>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t bg-muted/20 p-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {/* Position */}
          {contact.position && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Position:</span>
              <span className="font-medium">{contact.position}</span>
            </div>
          )}

          {/* Email avec copy */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <a href={`mailto:${contact.email}`} className="flex-1 text-sm hover:underline">
              {contact.email}
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(contact.email, "email");
              }}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Phones */}
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
              <a href={`tel:${contact.phone}`} className="flex-1 text-sm hover:underline">
                {contact.phone}
              </a>
              <Badge variant="secondary" className="text-xs">Tél</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(contact.phone!, "phone");
                }}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {contact.mobile && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <a href={`tel:${contact.mobile}`} className="flex-1 text-sm hover:underline">
                {contact.mobile}
              </a>
              <Badge variant="secondary" className="text-xs">Mobile</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(contact.mobile!, "mobile");
                }}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {/* Preferred method */}
          <div className="pt-3 border-t flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Contact préféré: <strong className="text-foreground">
              {contact.preferredContactMethod === PreferredContactMethod.Email ? "Email" : 
               contact.preferredContactMethod === PreferredContactMethod.Phone ? "Téléphone" : "SMS"}
            </strong></span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
              <Mail className="mr-2 h-3.5 w-3.5" />
              Envoyer email
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
              <Phone className="mr-2 h-3.5 w-3.5" />
              Appeler
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}