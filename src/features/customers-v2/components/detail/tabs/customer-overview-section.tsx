"use client";

import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import {
  Mail,
  Phone,
  FileText,
  Home,
  Briefcase,
  User,
  MessageSquare,
  Building,
  Star,
  MapPin,
} from "lucide-react";
import { Customer, PersonType, PreferredContactMethod } from "../../../types/customer.types";
import {
  SectionCard,
  InfoCard,
  ContactInfoRow,
} from "@/shared/components/cards";

interface CustomerOverviewSectionProps {
  customer: Customer;
}

export function CustomerOverviewSection({ customer }: CustomerOverviewSectionProps) {
  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getContactMethodLabel = (method: PreferredContactMethod) => {
    const labels = {
      [PreferredContactMethod.Email]: "Email",
      [PreferredContactMethod.Phone]: "Téléphone",
      [PreferredContactMethod.SMS]: "SMS",
      [PreferredContactMethod.WhatsApp]: "WhatsApp",
    };
    return labels[method] || "Email";
  };

  const primaryContact = customer.contacts.find((c) => c.isPrimary) || customer.contacts[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Colonne principale - 2/3 */}
      <div className="lg:col-span-2 space-y-6">
        {/* Contact principal */}
        {primaryContact && (
          <SectionCard
            title="Contact principal"
            icon={Star}
            iconColor="text-primary"
            iconBgColor="bg-primary/20"
            glowColor="primary"
            bordered={true}
            separator={true}
          >
            {/* Avatar et infos */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse" />
                <Avatar className="h-16 w-16 ring-4 ring-background shadow-xl relative">
                  <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary text-xl font-bold">
                    {getInitials(primaryContact.fullName || `${primaryContact.firstName} ${primaryContact.lastName}`)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="font-bold text-xl mb-1">
                  {primaryContact.fullName || `${primaryContact.firstName} ${primaryContact.lastName}`}
                </p>
                {primaryContact.position && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {primaryContact.position}
                  </p>
                )}
                <Badge variant="outline" className="mt-2 backdrop-blur-sm">
                  {primaryContact.type === PersonType.Company ? "Entreprise" : "Particulier"}
                </Badge>
              </div>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ContactInfoRow
                icon={Mail}
                iconColor="text-blue-600 dark:text-blue-400"
                iconBgColor="bg-blue-500/20"
                label="Email"
                value={primaryContact.email}
                href={`mailto:${primaryContact.email}`}
              />

              {primaryContact.phone && (
                <ContactInfoRow
                  icon={Phone}
                  iconColor="text-green-600 dark:text-green-400"
                  iconBgColor="bg-green-500/20"
                  label="Téléphone"
                  value={primaryContact.phone}
                  href={`tel:${primaryContact.phone}`}
                  badge="Tél"
                />
              )}

              {primaryContact.mobile && (
                <ContactInfoRow
                  icon={Phone}
                  iconColor="text-purple-600 dark:text-purple-400"
                  iconBgColor="bg-purple-500/20"
                  label="Mobile"
                  value={primaryContact.mobile}
                  href={`tel:${primaryContact.mobile}`}
                  badge="Mobile"
                />
              )}

              <div className="flex items-center gap-3 p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contact préféré</p>
                  <p className="font-medium text-sm">{getContactMethodLabel(primaryContact.preferredContactMethod)}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Adresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            title="Adresse de facturation"
            icon={FileText}
            iconColor="text-orange-600 dark:text-orange-400"
            iconBgColor="bg-orange-500/20"
            glowColor="orange"
          >
            {customer.invoiceAddress.firstAddressLine && (
              <p className="font-medium">{customer.invoiceAddress.firstAddressLine}</p>
            )}
            {customer.invoiceAddress.secondAddressLine && <p>{customer.invoiceAddress.secondAddressLine}</p>}
            <p>{customer.invoiceAddress.street}</p>
            <p className="font-medium">
              {customer.invoiceAddress.postalCode} {customer.invoiceAddress.city}
            </p>
            <p className="text-muted-foreground">{customer.invoiceAddress.country}</p>
          </InfoCard>

          <InfoCard
            title="Adresse postale"
            icon={Home}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBgColor="bg-blue-500/20"
            glowColor="blue"
          >
            {customer.mailingAddress.firstAddressLine && (
              <p className="font-medium">{customer.mailingAddress.firstAddressLine}</p>
            )}
            {customer.mailingAddress.secondAddressLine && <p>{customer.mailingAddress.secondAddressLine}</p>}
            <p>{customer.mailingAddress.street}</p>
            <p className="font-medium">
              {customer.mailingAddress.postalCode} {customer.mailingAddress.city}
            </p>
            <p className="text-muted-foreground">{customer.mailingAddress.country}</p>
          </InfoCard>
        </div>

        {/* Commentaire */}
        {customer.comment && (
          <SectionCard
            title="Commentaire"
            icon={FileText}
            iconColor="text-primary"
            iconBgColor="bg-primary/20"
            glowColor="yellow"
            className="border-l-4 border-l-primary"
          >
            <p className="text-sm text-muted-foreground leading-relaxed italic pl-4 border-l-2 border-primary/30">
              "{customer.comment}"
            </p>
          </SectionCard>
        )}
      </div>

      {/* Colonne latérale - 1/3 */}
      <div className="space-y-4">
        {/* Informations légales */}
        <SectionCard
          title="Informations légales"
          icon={FileText}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBgColor="bg-indigo-500/20"
          glowColor="indigo"
        >
          <div className="space-y-3">
            {customer.siren && (
              <div className="flex justify-between items-center p-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
                <span className="text-sm text-muted-foreground font-medium">SIREN</span>
                <code className="font-mono font-bold text-base">{customer.siren}</code>
              </div>
            )}
            <div className="flex justify-between items-center p-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
              <span className="text-sm text-muted-foreground font-medium">Statut</span>
              <Badge variant={customer.active ? "default" : "secondary"} className="backdrop-blur-sm">
                {customer.active ? "Actif" : "Inactif"}
              </Badge>
            </div>
          </div>
        </SectionCard>

        {/* Commercial */}
        {customer.commercialName && (
          <SectionCard
            title="Commercial"
            icon={User}
            iconColor="text-green-600 dark:text-green-400"
            iconBgColor="bg-green-500/20"
            glowColor="green"
            bordered={true}
          >
            <div className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse" />
                <Avatar className="h-10 w-10 ring-4 ring-background shadow-xl relative">
                  <AvatarFallback className="bg-gradient-to-br from-green-500/30 to-emerald-500/10 text-green-700 dark:text-green-400 font-bold text-sm">
                    {getInitials(customer.commercialName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="font-bold text-sm">{customer.commercialName}</p>
                <p className="text-xs text-muted-foreground">Responsable</p>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Sites */}
        <SectionCard
          title="Sites"
          icon={Building}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBgColor="bg-blue-500/20"
          glowColor="blue"
        >
          <div className="text-center py-4">
            <p className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
              {customer.sitesCount}
            </p>
            <p className="text-sm text-muted-foreground mb-3">Sites associés</p>
            <Button variant="outline" size="sm" className="backdrop-blur-sm">
              <MapPin className="mr-2 h-4 w-4" />
              Voir les sites
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}