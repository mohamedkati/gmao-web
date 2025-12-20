
"use client";

import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Mail, Phone, MessageSquare, Star, Sparkles } from "lucide-react";
import { CustomerContact, PersonType, PreferredContactMethod } from "../../types/customer.types";
import { cn } from "@/shared/lib/utils/cn";

interface ContactCardGlassProps {
  contact: CustomerContact;
  index: number;
}

export function ContactCardGlass({ contact, index }: ContactCardGlassProps) {
  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const fullName = contact.fullName || `${contact.firstName} ${contact.lastName}`;

  // Couleurs aléatoires pour chaque contact
  const colors = [
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-orange-500/20 to-red-500/20",
  ];
  const gradient = colors[index % colors.length];

  return (
    <div className="group relative">
      {/* Animated background blob */}
      <div 
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-br blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500",
          gradient
        )} 
      />

      {/* Glass card */}
      <div 
        className={cn(
          "relative backdrop-blur-xl bg-background/40 border border-white/20 rounded-3xl p-6",
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          "hover:scale-[1.02] hover:-translate-y-1",
          contact.isPrimary && "ring-2 ring-primary/50"
        )}
      >
        {/* Sparkles effect for principal */}
        {contact.isPrimary && (
          <div className="absolute top-4 right-4 animate-pulse">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 blur-md animate-pulse" />
            
            <Avatar className="h-16 w-16 relative border-2 border-white/30">
              <AvatarFallback 
                className={cn(
                  "text-xl font-bold backdrop-blur-sm",
                  contact.isPrimary 
                    ? "bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground"
                    : "bg-gradient-to-br from-muted/80 to-muted/40"
                )}
              >
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>

            {/* Badge numéro flottant */}
            <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
              {index + 1}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg mb-1 truncate">{fullName}</h4>
            {contact.position && (
              <p className="text-sm text-muted-foreground truncate">{contact.position}</p>
            )}
            <div className="flex gap-2 mt-2">
              {contact.isPrimary && (
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-xs">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Principal
                </Badge>
              )}
              <Badge variant="outline" className="text-xs backdrop-blur-sm bg-white/50">
                {contact.type === PersonType.Company ? "Entreprise" : "Particulier"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact info avec glass effect */}
        <div className="space-y-2">
          <a 
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all group/item"
          >
            <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="flex-1 text-sm font-medium truncate">{contact.email}</span>
          </a>

          {contact.phone && (
            <a 
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all group/item"
            >
              <div className="p-2 rounded-lg bg-green-500/20 backdrop-blur-sm">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="flex-1 text-sm font-medium">{contact.phone}</span>
              <Badge variant="secondary" className="text-xs backdrop-blur-sm">Tél</Badge>
            </a>
          )}

          {contact.mobile && (
            <a 
              href={`tel:${contact.mobile}`}
              className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all group/item"
            >
              <div className="p-2 rounded-lg bg-purple-500/20 backdrop-blur-sm">
                <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="flex-1 text-sm font-medium">{contact.mobile}</span>
              <Badge variant="secondary" className="text-xs backdrop-blur-sm">Mobile</Badge>
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Préfère: <strong className="text-foreground">
              {contact.preferredContactMethod === PreferredContactMethod.Email ? "Email" : "Téléphone"}
            </strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}