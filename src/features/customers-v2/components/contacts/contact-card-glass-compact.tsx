"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import {
  Mail,
  Phone,
  MessageSquare,
  Star,
  Sparkles,
  ChevronRight,
  Copy,
  Briefcase,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
import { CustomerContact, PersonType, PreferredContactMethod } from "../../types/customer.types";
import { cn } from "@/shared/lib/utils/cn";
import { toast } from "sonner";

interface ContactCardGlassCompactProps {
  contact: CustomerContact;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ContactCardGlassCompact({ contact, index, onEdit, onDelete }: ContactCardGlassCompactProps) {
  const [isExpanded, setIsExpanded] = useState(contact.isPrimary);

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const fullName = contact.fullName || `${contact.firstName} ${contact.lastName}`;

  const colors = [
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-orange-500/20 to-red-500/20",
    "from-indigo-500/20 to-violet-500/20",
  ];
  const gradient = colors[index % colors.length];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copié dans le presse-papiers`);
  };

  const getContactMethodLabel = () => {
    switch (contact.preferredContactMethod) {
      case PreferredContactMethod.Email:
        return "Email";
      case PreferredContactMethod.Phone:
        return "Téléphone";
      case PreferredContactMethod.SMS:
        return "SMS";
      case PreferredContactMethod.WhatsApp:
        return "WhatsApp";
      default:
        return "Email";
    }
  };

  return (
    <div className="group relative">
      {/* Animated background blob */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br blur-2xl transition-all duration-500",
          gradient,
          isExpanded ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        )}
      />

      {/* Glass card */}
      <div
        className={cn(
          "relative backdrop-blur-xl bg-background/40 border border-white/20 rounded-xl overflow-hidden",
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          "hover:scale-[1.00]",
          contact.isPrimary && "ring-2 ring-primary/50",
          isExpanded && "bg-background/60"
        )}
      >
        {/* Sparkles for principal */}
        {contact.isPrimary && (
          <div
            className={cn(
              "absolute top-2 right-4 transition-all duration-300",
              isExpanded ? "animate-pulse scale-125" : "animate-pulse"
            )}
          >
            <Sparkles className="h-5 w-5 text-primary drop-shadow-lg" />
          </div>
        )}

        {/* Header - Clickable */}
        <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
          {/* Expand icon */}
          <div
            className="shrink-0 transition-transform duration-300"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Avatar with glowing effect */}
          <div className="relative shrink-0">
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 blur-md transition-all duration-500",
                isExpanded ? "animate-pulse scale-110" : "opacity-0 group-hover:opacity-100"
              )}
            />

            <Avatar className="h-14 w-14 relative border-2 border-white/30 shadow-xl">
              <AvatarFallback
                className={cn(
                  "text-lg font-bold backdrop-blur-sm transition-all duration-300",
                  contact.isPrimary
                    ? "bg-gradient-to-br from-primary/80 to-primary/40 text-primary-foreground"
                    : "bg-gradient-to-br from-muted/80 to-muted/40"
                )}
              >
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>

            {/* Badge numéro */}
            <div
              className={cn(
                "absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg transition-all duration-300",
                isExpanded && "scale-110 shadow-xl"
              )}
            >
              {index + 1}
            </div>

            {/* Star indicator */}
            {contact.isPrimary && (
              <div className={cn("absolute -top-1 -left-1 p-1 bg-primary rounded-full shadow-lg transition-all duration-300", isExpanded && "scale-110")}>
                <Star className="h-3 w-3 text-primary-foreground fill-primary-foreground" />
              </div>
            )}
          </div>

          {/* Info compacte */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-lg truncate">{fullName}</h4>
              {contact.isPrimary && !isExpanded && (
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-xs shrink-0 shadow-lg">Principal</Badge>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 truncate">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {contact.email}
              </span>
              {contact.phone && (
                <span className="flex items-center gap-1.5 hidden sm:flex">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {contact.phone}
                </span>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="shrink-0 relative flex items-center -bottom-0 -right-0 mr-1 mb-1 gap-2">
            {contact.isPrimary && isExpanded && (
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-xs shadow-lg">
                <Star className="mr-1 h-3 w-3 fill-current" />
                Principal
              </Badge>
            )}
            <Badge variant="outline" className="text-xs backdrop-blur-sm bg-white/50">
              {contact.type === PersonType.Company ? "Entreprise" : "Particulier"}
            </Badge>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 ml-2 border-0 border-border/50 pl-2">
              {onEdit && (
                <Button
                  variant={'ghost'}
                  size={'sm'}

                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="p-1.5 rounded-md hover:bg-primary/10 hover:shadow-sm transition-all "
                  title="Modifier"
                >
                  <Edit className="h-3.5 w-3.5  text-primary  opacity-70 hover:opacity-100 transition-opacity " />
                </Button>

              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  disabled={contact.isPrimary}
                  className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Supprimer"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="border-t border-white/20 backdrop-blur-sm bg-white/10 p-4 animate-in slide-in-from-top-4 duration-500">
            {/* Position */}
            {contact.position && (
              <div className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm bg-white/30 border border-white/20">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Briefcase className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Position</p>
                  <p className="font-semibold">{contact.position}</p>
                </div>
              </div>
            )}

            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Email */}
            <div className="group/item grid grid-cols-12">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 p-3 col-span-11 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover/item:bg-blue-500/30 transition-all group-hover/item:scale-110">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{contact.email}</p>
                </div>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 h-8 text-xs opacity-0 group-hover/item:opacity-100 transition-all backdrop-blur-sm bg-white/20 hover:bg-white/40"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(contact.email, "Email");
                }}
              >
                <Copy className="mr-2 h-3 w-3" />
              </Button>
            </div>

            {/* Phones */}
            {contact.phone && (
              <div className="group/item grid grid-cols-12">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 p-3 col-span-11 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-green-500/20 group-hover/item:bg-green-500/30 transition-all group-hover/item:scale-110">
                    <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/50">
                    Tél
                  </Badge>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 h-8 text-xs opacity-0 group-hover/item:opacity-100 transition-all bg-white/20 hover:bg-white/50"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(contact.phone!, "Téléphone");
                  }}
                >
                  <Copy className="mr-2 h-3 w-3" />
                </Button>
              </div>
            )}

            {contact.mobile && (
              <div className="group/item grid grid-cols-12">
                <a
                  href={`tel:${contact.mobile}`}
                  className="flex items-center gap-3 col-span-11 p-3 rounded-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 transition-all"
                >
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover/item:bg-purple-500/30 transition-all group-hover/item:scale-110">
                    <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="font-medium">{contact.mobile}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/50">
                    Mobile
                  </Badge>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 h-8 text-xs opacity-0 group-hover/item:opacity-100 transition-all backdrop-blur-sm bg-white/20 hover:bg-white/40"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(contact.mobile!, "Mobile");
                  }}
                >
                  <Copy className="mr-2 h-3 w-3" />

                </Button>
              </div>
            )}

            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Preferred contact method */}
            <div className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Contact préféré: <strong className="text-foreground">{getContactMethodLabel()}</strong>
              </span>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 backdrop-blur-sm bg-white/30 hover:bg-white/50 border-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `mailto:${contact.email}`;
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 backdrop-blur-sm bg-white/30 hover:bg-white/50 border-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${contact.phone || contact.mobile}`;
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Appeler
              </Button>
            </div>

            {/* Edit button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-9 text-xs backdrop-blur-sm bg-white/20 hover:bg-white/40"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Open edit modal
              }}
            >
              Modifier le contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}