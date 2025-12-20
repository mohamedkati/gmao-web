
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/shadcnui/button";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Progress } from "@/shared/components/shadcnui/progress";
import {
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  DollarSign,
  Edit,
  TrendingUp,
  Clock,
  User,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Home,
  Briefcase,
  Users2,
  Sparkles,
  ExternalLink,
  Star,
  Percent,
  Zap,
} from "lucide-react";
import { CustomerType, BillingMode, InvoiceFrequency, PreferredContactMethod } from "../../types/customer.types";
import { useCustomer } from "@/features/customers-v2/hooks/user-customers.query";
import { ContactCardGlassCompact } from "../contacts/contact-card-glass-compact";
import { cn } from "@/shared/lib/utils/cn";

interface CustomerDetailsPanelProps {
  customerId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (customerId: string) => void;
}

export function CustomerDetailsPanel({
  customerId,
  isOpen,
  onClose,
  onEdit,
}: CustomerDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: customer, isLoading, error } = useCustomer(customerId || "");

  useEffect(() => {
    if (customerId) {
      setActiveTab("overview");
    }
  }, [customerId]);

  if (!customerId) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomerTypeLabel = (type: CustomerType) => {
    const labels = {
      [CustomerType.PropertyManager]: "Gestionnaire immobilier",
      [CustomerType.Syndic]: "Syndic de copropriété",
      [CustomerType.Corporate]: "Entreprise",
      [CustomerType.Individual]: "Particulier",
      [CustomerType.Government]: "Administration publique",
    };
    return labels[type] || "Client";
  };

  const getCustomerTypeIcon = (type: CustomerType) => {
    const icons = {
      [CustomerType.PropertyManager]: Building,
      [CustomerType.Syndic]: Users2,
      [CustomerType.Corporate]: Briefcase,
      [CustomerType.Individual]: User,
      [CustomerType.Government]: Building,
    };
    return icons[type] || Building;
  };

  const getBillingModeLabel = (mode: BillingMode) => {
    const labels = {
      [BillingMode.Centralized]: "Centralisée",
      [BillingMode.PerSite]: "Par site",
      [BillingMode.DistributedByTantièmes]: "Répartition par tantièmes",
    };
    return labels[mode] || "Centralisée";
  };

  const getInvoiceFrequencyLabel = (freq: InvoiceFrequency) => {
    const labels = {
      [InvoiceFrequency.PerWorkOrder]: "Par bon de travail",
      [InvoiceFrequency.Weekly]: "Hebdomadaire",
      [InvoiceFrequency.Monthly]: "Mensuelle",
      [InvoiceFrequency.Quarterly]: "Trimestrielle",
    };
    return labels[freq] || "Par bon de travail";
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

  return (
    <>
      {/* Overlay avec animation */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel avec animation slide */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-full md:w-[650px] lg:w-[800px] bg-background z-50 transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* 🎨 HEADER MODERNE avec Glass Morphism */}
          {isLoading ? (
            <div className="relative p-8 border-b overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-5 flex-1">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ) : customer ? (
            <div className="relative p-8 border-b overflow-hidden backdrop-blur-xl bg-gradient-to-br from-primary/5 via-background to-background">
              {/* Animated gradient blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Decorative corner sparkles */}
              <div className="absolute top-6 right-6 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary/40" />
              </div>
              <div className="absolute top-10 right-12 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="h-4 w-4 text-purple-500/40" />
              </div>
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-6 flex-1">
                  {/* Avatar avec multiple rings et glow */}
                  <div className="relative group">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
                    
                    {/* Middle ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-xl" />
                    
                    <Avatar className="h-24 w-24 ring-4 ring-background shadow-2xl relative border-4 border-white/20 backdrop-blur-sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary via-primary to-primary/60 text-primary-foreground font-bold text-3xl">
                        {getInitials(customer.companyName)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Status indicator avec pulse */}
                    {customer.active && (
                      <div className="absolute bottom-1 right-1">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-500 rounded-full blur-md animate-pulse" />
                          <div className="relative h-6 w-6 bg-green-500 border-4 border-background rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-4">
                    {/* Company name avec typing effect feel */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold tracking-tight truncate bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                          {customer.companyName}
                        </h2>
                        {!customer.active && (
                          <Badge variant="secondary" className="text-sm backdrop-blur-sm">
                            Inactif
                          </Badge>
                        )}
                      </div>
                      
                      {/* Type badge avec glass effect et icône */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge 
                          variant="outline" 
                          className="text-sm font-medium px-4 py-1.5 flex items-center gap-2 backdrop-blur-xl bg-white/40 dark:bg-black/40 border-white/30 shadow-lg"
                        >
                          {(() => {
                            const Icon = getCustomerTypeIcon(customer.type);
                            return <Icon className="h-4 w-4" />;
                          })()}
                          {getCustomerTypeLabel(customer.type)}
                        </Badge>
                        
                        <code className="text-sm bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm px-4 py-1.5 rounded-lg font-mono border border-border/50 shadow-sm">
                          {customer.reference}
                        </code>
                      </div>
                    </div>

                    {/* Property group avec icône animée */}
                    {customer.propertyGroupName && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground backdrop-blur-sm bg-white/20 dark:bg-black/20 px-4 py-2 rounded-lg w-fit border border-white/20">
                        <Building className="h-4 w-4 animate-pulse" />
                        <span>Groupe: <strong className="text-foreground">{customer.propertyGroupName}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions avec glass effect */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => onEdit?.(customer.id)}
                    className="shadow-xl backdrop-blur-sm bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="hover:bg-background/80 backdrop-blur-sm hover:rotate-90 transition-all duration-300"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="rounded-full bg-destructive/10 p-6 inline-flex mb-4 backdrop-blur-sm">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Erreur de chargement</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Impossible de charger les détails du client
                  </p>
                  <Button onClick={onClose} variant="outline" className="backdrop-blur-sm">
                    Fermer
                  </Button>
                </div>
              </div>
            ) : customer ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* 🎨 TABS MODERNES avec glass effect */}
                <div className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 shadow-sm">
                  <div className="px-8">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8">
                      <TabsTrigger
                        value="overview"
                        className="relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Vue d'ensemble
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500 scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
                      </TabsTrigger>
                      
                      <TabsTrigger
                        value="contacts"
                        className="relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Users2 className="h-4 w-4" />
                          Contacts
                          <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                            {customer.contactsCount}
                          </Badge>
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500 scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
                      </TabsTrigger>
                      
                      <TabsTrigger
                        value="billing"
                        className="relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Facturation
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500 scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
                      </TabsTrigger>
                      
                      <TabsTrigger
                        value="budgets"
                        className="relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Budgets
                          <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                            {customer.maintenanceBudgets.length}
                          </Badge>
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500 scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {/* 🎨 OVERVIEW TAB avec Glass Cards */}
                  <TabsContent value="overview" className="mt-0 space-y-6 animate-in fade-in duration-500">
                    {/* Quick Stats avec gradients et glass */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm">
                              <Building className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                {customer.sitesCount}
                              </p>
                              <p className="text-sm text-muted-foreground font-medium">Sites</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-purple-500/20 backdrop-blur-sm">
                              <Users2 className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                {customer.contactsCount}
                              </p>
                              <p className="text-sm text-muted-foreground font-medium">Contacts</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact principal avec glass effect */}
                    {(() => {
                      const primaryContact = customer.contacts.find((c) => c.isPrimary) || customer.contacts[0];
                      return primaryContact ? (
                        <div className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                          <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-white/20 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-1 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                              <h3 className="text-lg font-bold">Contact principal</h3>
                              <Star className="h-5 w-5 text-primary fill-primary animate-pulse" />
                            </div>
                            
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
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {primaryContact.position}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />
                            
                            <div className="space-y-3">
                              <a 
                                href={`mailto:${primaryContact.email}`}
                                className="group/item flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border border-white/20 transition-all duration-200"
                              >
                                <div className="p-2.5 rounded-xl bg-blue-500/20 group-hover/item:bg-blue-500/30 group-hover/item:scale-110 transition-all">
                                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="flex-1 font-medium">{primaryContact.email}</span>
                                <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              </a>
                              
                              {primaryContact.phone && (
                                <a 
                                  href={`tel:${primaryContact.phone}`}
                                  className="group/item flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border border-white/20 transition-all duration-200"
                                >
                                  <div className="p-2.5 rounded-xl bg-green-500/20 group-hover/item:bg-green-500/30 group-hover/item:scale-110 transition-all">
                                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  </div>
                                  <span className="flex-1 font-medium">{primaryContact.phone}</span>
                                  <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </a>
                              )}
                              
                              <div className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                                <Badge variant="outline" className="backdrop-blur-sm bg-white/50">
                                  Préfère: {getContactMethodLabel(primaryContact.preferredContactMethod)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Adresses avec glass effect */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-orange-500/20">
                              <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h4 className="font-bold">Adresse de facturation</h4>
                          </div>
                          <div className="space-y-1.5 text-sm leading-relaxed">
                            {customer.invoiceAddress.firstAddressLine && (
                              <p className="font-medium">{customer.invoiceAddress.firstAddressLine}</p>
                            )}
                            {customer.invoiceAddress.secondAddressLine && (
                              <p>{customer.invoiceAddress.secondAddressLine}</p>
                            )}
                            <p>{customer.invoiceAddress.street}</p>
                            <p className="font-medium">
                              {customer.invoiceAddress.postalCode} {customer.invoiceAddress.city}
                            </p>
                            <p className="text-muted-foreground">{customer.invoiceAddress.country}</p>
                          </div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-blue-500/20">
                              <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold">Adresse postale</h4>
                          </div>
                          <div className="space-y-1.5 text-sm leading-relaxed">
                            {customer.mailingAddress.firstAddressLine && (
                              <p className="font-medium">{customer.mailingAddress.firstAddressLine}</p>
                            )}
                            {customer.mailingAddress.secondAddressLine && (
                              <p>{customer.mailingAddress.secondAddressLine}</p>
                            )}
                            <p>{customer.mailingAddress.street}</p>
                            <p className="font-medium">
                              {customer.mailingAddress.postalCode} {customer.mailingAddress.city}
                            </p>
                            <p className="text-muted-foreground">{customer.mailingAddress.country}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informations légales avec glass */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="p-2 rounded-xl bg-indigo-500/20">
                            <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h4 className="font-bold">Informations légales</h4>
                        </div>
                        <div className="space-y-3">
                          {customer.siren && (
                            <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
                              <span className="text-sm text-muted-foreground font-medium">SIREN</span>
                              <code className="font-mono font-bold text-lg">{customer.siren}</code>
                            </div>
                          )}
                          <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
                            <span className="text-sm text-muted-foreground font-medium">Type de client</span>
                            <span className="font-bold">{getCustomerTypeLabel(customer.type)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Commercial avec glass et animation */}
                    {customer.commercialName && (
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-white/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg">
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-green-500/20">
                              <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold">Commercial assigné</h4>
                            <Badge className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                              Actif
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse" />
                              <Avatar className="h-14 w-14 ring-4 ring-background shadow-xl relative">
                                <AvatarFallback className="bg-gradient-to-br from-green-500/30 to-emerald-500/10 text-green-700 dark:text-green-400 font-bold text-lg">
                                  {getInitials(customer.commercialName)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className="font-bold text-lg">{customer.commercialName}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Briefcase className="h-3.5 w-3.5" />
                                Responsable commercial
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Commentaire avec style note */}
                    {customer.comment && (
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-l-4 border-l-primary rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <FileText className="h-5 w-5 text-primary" />
                            <h4 className="font-bold">Commentaire</h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed italic pl-4 border-l-2 border-primary/30">
                            "{customer.comment}"
                          </p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* 🎨 CONTACTS TAB - Utilise ContactCardGlassCompact */}
                  <TabsContent value="contacts" className="mt-0 space-y-4 animate-in fade-in duration-500">
                    {customer.contacts.map((contact, index) => (
                      <ContactCardGlassCompact 
                        key={contact.id} 
                        contact={contact} 
                        index={index} 
                      />
                    ))}

                    {customer.contacts.length === 0 && (
                      <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                          <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
                          <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
                            <Users2 className="h-16 w-16 text-muted-foreground" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Aucun contact enregistré</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Ajoutez des contacts pour ce client
                        </p>
                        <Button variant="outline" className="backdrop-blur-sm">
                          <User className="mr-2 h-4 w-4" />
                          Ajouter un contact
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  {/* 🎨 BILLING TAB avec Glass Cards */}
                  <TabsContent value="billing" className="mt-0 space-y-6 animate-in fade-in duration-500">
                    {/* Paramètres de facturation */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-white/20 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-primary/20">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Paramètres de facturation</h3>
                            <p className="text-xs text-muted-foreground">Configuration des factures et paiements</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="group/item flex justify-between items-center p-5 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-white/20 hover:border-blue-500/30 transition-all">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-blue-500/20">
                                <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              Mode de facturation
                            </span>
                            <Badge variant="outline" className="font-semibold backdrop-blur-sm bg-white/50">
                              {getBillingModeLabel(customer.billingSettings.mode)}
                            </Badge>
                          </div>

                          <div className="group/item flex justify-between items-center p-5 rounded-xl backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-white/20 hover:border-purple-500/30 transition-all">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-purple-500/20">
                                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              Fréquence
                            </span>
                            <Badge variant="outline" className="font-semibold backdrop-blur-sm bg-white/50">
                              {getInvoiceFrequencyLabel(customer.billingSettings.invoiceFrequency)}
                            </Badge>
                          </div>

                          <div className="group/item flex justify-between items-center p-5 rounded-xl backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-white/20 hover:border-green-500/30 transition-all">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-green-500/20">
                                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              Délai de paiement
                            </span>
                            <Badge variant="outline" className="font-semibold backdrop-blur-sm bg-white/50">
                              {customer.billingSettings.paymentTermsDays} jours
                            </Badge>
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                        {/* Options avec checkmarks animés */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 transition-all group/option">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                customer.billingSettings.autoGenerateInvoices 
                                  ? "bg-green-500/20 group-hover/option:scale-110" 
                                  : "bg-muted"
                              )}>
                                {customer.billingSettings.autoGenerateInvoices ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              Génération automatique
                            </span>
                            {customer.billingSettings.autoGenerateInvoices && (
                              <Zap className="h-4 w-4 text-green-600 dark:text-green-400 animate-pulse" />
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 transition-all group/option">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                customer.billingSettings.sendEmailNotifications 
                                  ? "bg-green-500/20 group-hover/option:scale-110" 
                                  : "bg-muted"
                              )}>
                                {customer.billingSettings.sendEmailNotifications ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              Notifications par email
                            </span>
                            {customer.billingSettings.sendEmailNotifications && (
                              <Mail className="h-4 w-4 text-green-600 dark:text-green-400 animate-pulse" />
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 transition-all group/option">
                            <span className="text-sm font-medium flex items-center gap-3">
                              <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                customer.billingSettings.applyLatePaymentFees 
                                  ? "bg-orange-500/20 group-hover/option:scale-110" 
                                  : "bg-muted"
                              )}>
                                {customer.billingSettings.applyLatePaymentFees ? (
                                  <CheckCircle2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              Frais de retard
                            </span>
                            {customer.billingSettings.applyLatePaymentFees && (
                              <Badge variant="outline" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 font-bold">
                                {customer.billingSettings.latePaymentFeePercent}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Coefficients de tarification */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-indigo-500/20">
                            <Percent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Coefficients de tarification</h3>
                            <p className="text-xs text-muted-foreground">Multiplicateurs appliqués aux prix de base</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {customer.pricingCoefficients.laborCoefficient !== undefined && (
                            <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all">
                              <span className="text-sm font-medium text-muted-foreground">Main d'œuvre</span>
                              <Badge variant="outline" className="font-mono text-lg font-bold bg-background/80 backdrop-blur-sm">
                                ×{customer.pricingCoefficients.laborCoefficient}
                              </Badge>
                            </div>
                          )}
                          {customer.pricingCoefficients.materialCoefficient !== undefined && (
                            <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all">
                              <span className="text-sm font-medium text-muted-foreground">Matériaux</span>
                              <Badge variant="outline" className="font-mono text-lg font-bold bg-background/80 backdrop-blur-sm">
                                ×{customer.pricingCoefficients.materialCoefficient}
                              </Badge>
                            </div>
                          )}
                          {customer.pricingCoefficients.equipmentCoefficient !== undefined && (
                            <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all">
                              <span className="text-sm font-medium text-muted-foreground">Équipement</span>
                              <Badge variant="outline" className="font-mono text-lg font-bold bg-background/80 backdrop-blur-sm">
                                ×{customer.pricingCoefficients.equipmentCoefficient}
                              </Badge>
                            </div>
                          )}
                          {customer.pricingCoefficients.subcontractorCoefficient !== undefined && (
                            <div className="flex justify-between items-center p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-all">
                              <span className="text-sm font-medium text-muted-foreground">Sous-traitance</span>
                              <Badge variant="outline" className="font-mono text-lg font-bold bg-background/80 backdrop-blur-sm">
                                ×{customer.pricingCoefficients.subcontractorCoefficient}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Moyen de paiement */}
                    {customer.paymentMethod && (
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-primary/30 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-xl">
                          <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 rounded-xl bg-primary/20">
                              <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg">Moyen de paiement</h3>
                          </div>
                          <div className="flex items-center gap-5 p-5 rounded-xl backdrop-blur-sm bg-gradient-to-br from-primary/10 to-purple-500/5 border border-primary/20">
                            <div className="p-4 rounded-2xl bg-primary/20 backdrop-blur-sm">
                              <CreditCard className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-xl mb-1">{customer.paymentMethod.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {customer.paymentMethod.terms}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* 🎨 BUDGETS TAB avec Progress animés */}
                  <TabsContent value="budgets" className="mt-0 space-y-4 animate-in fade-in duration-500">
                    {customer.maintenanceBudgets.length > 0 ? (
                      customer.maintenanceBudgets.map((budget) => {
                        const consumptionPercent = ((budget.invoicedAmount / budget.budgetedAmount) * 100);
                        const isOverBudget = consumptionPercent > 100;
                        const isNearThreshold = consumptionPercent >= budget.alertThreshold && !isOverBudget;

                        return (
                          <div key={budget.id} className="group relative">
                            {/* Glow effect selon statut */}
                            <div className={cn(
                              "absolute inset-0 rounded-2xl blur-xl transition-all duration-500",
                              isOverBudget && "bg-gradient-to-br from-red-500/20 to-destructive/20 opacity-0 group-hover:opacity-60",
                              isNearThreshold && "bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-60",
                              !isOverBudget && !isNearThreshold && "bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-60"
                            )} />

                            <div 
                              className={cn(
                                "relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-xl",
                                isOverBudget && "border-destructive/50",
                                isNearThreshold && "border-orange-500/50",
                                !isOverBudget && !isNearThreshold && "border-green-500/30"
                              )}
                            >
                              {/* Header */}
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                  <div className={cn(
                                    "p-4 rounded-2xl backdrop-blur-sm transition-all duration-300",
                                    isOverBudget && "bg-destructive/20",
                                    isNearThreshold && "bg-orange-500/20",
                                    !isOverBudget && !isNearThreshold && "bg-green-500/20"
                                  )}>
                                    <Calendar className={cn(
                                      "h-6 w-6",
                                      isOverBudget && "text-destructive",
                                      isNearThreshold && "text-orange-600 dark:text-orange-400",
                                      !isOverBudget && !isNearThreshold && "text-green-600 dark:text-green-400"
                                    )} />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold">Budget {budget.year}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {budget.budgetedAmount.toLocaleString()}€ budgétés
                                    </p>
                                  </div>
                                </div>
                                {isOverBudget ? (
                                  <Badge variant="destructive" className="gap-2 text-sm px-4 py-2 shadow-lg">
                                    <AlertCircle className="h-4 w-4" />
                                    Dépassé
                                  </Badge>
                                ) : isNearThreshold ? (
                                  <Badge className="gap-2 text-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg">
                                    <AlertCircle className="h-4 w-4" />
                                    Alerte
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="gap-2 text-sm px-4 py-2 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30 shadow-lg">
                                    <CheckCircle2 className="h-4 w-4" />
                                    OK
                                  </Badge>
                                )}
                              </div>

                              {/* Progress section */}
                              <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Consommation
                                  </span>
                                  <span className={cn(
                                    "text-3xl font-bold",
                                    isOverBudget && "text-destructive",
                                    isNearThreshold && "text-orange-600 dark:text-orange-400",
                                    !isOverBudget && !isNearThreshold && "text-green-600 dark:text-green-400"
                                  )}>
                                    {consumptionPercent.toFixed(1)}%
                                  </span>
                                </div>
                                
                                {/* Progress bar avec gradient animé */}
                                <div className="relative">
                                  <Progress 
                                    value={Math.min(consumptionPercent, 100)} 
                                    className={cn(
                                      "h-4 rounded-full shadow-inner",
                                      isOverBudget && "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:via-destructive [&>div]:to-red-600",
                                      isNearThreshold && "[&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:via-yellow-500 [&>div]:to-orange-500",
                                      !isOverBudget && !isNearThreshold && "[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:via-emerald-500 [&>div]:to-green-500"
                                    )}
                                  />
                                  {/* Threshold marker */}
                                  <div 
                                    className="absolute top-0 bottom-0 w-0.5 bg-primary/50"
                                    style={{ left: `${budget.alertThreshold}%` }}
                                  >
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                                  </div>
                                </div>
                              </div>

                              {/* Stats grid avec glass effect */}
                              <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                                  <p className="text-xs text-muted-foreground mb-1 font-medium">Engagé</p>
                                  <p className="text-2xl font-bold">{budget.committedAmount.toLocaleString()}€</p>
                                </div>
                                <div className="p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                                  <p className="text-xs text-muted-foreground mb-1 font-medium">Facturé</p>
                                  <p className="text-2xl font-bold">{budget.invoicedAmount.toLocaleString()}€</p>
                                </div>
                                <div className="p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                                  <p className="text-xs text-muted-foreground mb-1 font-medium">Restant</p>
                                  <p className={cn(
                                    "text-2xl font-bold",
                                    (budget.budgetedAmount - budget.invoicedAmount) < 0 && "text-destructive"
                                  )}>
                                    {(budget.budgetedAmount - budget.invoicedAmount).toLocaleString()}€
                                  </p>
                                </div>
                                <div className="p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                                  <p className="text-xs text-muted-foreground mb-1 font-medium">Seuil d'alerte</p>
                                  <p className="text-2xl font-bold">{budget.alertThreshold}%</p>
                                </div>
                              </div>

                              {/* Alert indicator */}
                              {budget.alertSent && (
                                <div className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-orange-500/10 border border-orange-500/20">
                                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 animate-pulse" />
                                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                    Alerte de dépassement envoyée
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-16">
                        <div className="relative inline-block mb-6">
                          <div className="absolute inset-0 bg-muted/50 rounded-full blur-2xl" />
                          <div className="relative rounded-full bg-muted p-8 backdrop-blur-sm border border-border">
                            <DollarSign className="h-16 w-16 text-muted-foreground" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Aucun budget défini</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Ajoutez des budgets de maintenance pour ce client
                        </p>
                        <Button variant="outline" className="backdrop-blur-sm">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Ajouter un budget
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            ) : null}
          </div>

          {/* 🎨 FOOTER MODERNE avec Glass Effect */}
          {customer && (
            <div className="relative border-t backdrop-blur-xl bg-gradient-to-r from-muted/40 via-background/60 to-muted/40 p-4 overflow-hidden">
              {/* Subtle gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 animate-pulse" />
              
              <div className="flex items-center justify-between text-xs relative z-10">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span>
                    Créé le{" "}
                    <strong className="text-foreground font-semibold">
                      {new Date(customer.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </span>
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span>
                    Modifié le{" "}
                    <strong className="text-foreground font-semibold">
                      {new Date(customer.lastModifiedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}