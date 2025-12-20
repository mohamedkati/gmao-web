// src/app/(dashboard)/customers/[id]/page.tsx

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCustomer } from "@/features/customers-v2/hooks/user-customers.query";
import { Button } from "@/shared/components/shadcnui/button";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import {
    ChevronLeft,
    Edit,
    Trash,
    MoreVertical,
    Sparkles,
    Users2,
    CreditCard,
    DollarSign,
    Building,
    User,
    Briefcase,
    Star,
    Calendar,
    Clock,
    AlertCircle,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CustomerOverviewSection } from "@/features/customers-v2/components/details/customer-overview-section";
import { CustomerBillingSection } from "@/features/customers-v2/components/details/customer-billing-section";
import { CustomerType } from "@/features/customers-v2/types/customer.types";
import { cn } from "@/shared/lib/utils/cn";
import { CustomerContactsSection } from "@/features/customers-v2/components/contacts/customer-contact-section";
import { CustomerBudgetsSection } from "@/features/customers-v2/components/budgets/customer-budgets-section";

export default function CustomerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const customerId = params.id as string;

    const [activeTab, setActiveTab] = useState("overview");

    const { data: customer, isLoading, error } = useCustomer(customerId);

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
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

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="border-b p-6">
                    <div className="max-w-7xl mx-auto">
                        <Skeleton className="h-8 w-32 mb-6" />
                        <div className="flex items-start gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-10 w-96" />
                                <Skeleton className="h-6 w-64" />
                            </div>
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto space-y-4">
                        <Skeleton className="h-64 w-full rounded-xl" />
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !customer) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                    <div className="rounded-full bg-destructive/10 p-6 inline-flex mb-4">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Client introuvable</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Le client que vous recherchez n'existe pas ou a été supprimé.
                    </p>
                    <Button onClick={() => router.push("/customers")}>
                        Retour à la liste
                    </Button>
                </div>
            </div>
        );
    }

    const TypeIcon = getCustomerTypeIcon(customer.type);

    return (
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 rounded-xl p-6 hover:scale-[1.00] transition-all duration-300 shadow-lg">
            {/* 🎨 HEADER HERO avec Glass Morphism - Full Width */}
            <div className="relative border-b overflow-hidden">
                {/* Animated gradient blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                {/* Decorative sparkles */}
                <div className="absolute top-8 right-8 animate-pulse">
                    <Sparkles className="h-8 w-8 text-primary/40" />
                </div>
                <div className="absolute top-16 right-24 animate-pulse" style={{ animationDelay: "0.5s" }}>
                    <Sparkles className="h-5 w-5 text-purple-500/40" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/customers-v2")}
                        className="mb-6 -ml-2 backdrop-blur-sm  hover:bg-primary/10 hover:text-primary/70 "
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Retour aux clients
                    </Button>

                    {/* Header content */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-8 flex-1">
                            {/* Avatar avec multiple rings */}
                            <div className="relative group">
                                {/* Outer glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
                                {/* Middle ring */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-xl" />

                                <Avatar className="h-28 w-28 ring-4 ring-background shadow-2xl relative border-4 border-white/20 backdrop-blur-sm">
                                    <AvatarFallback className="bg-gradient-to-br from-primary via-primary to-primary/60 text-primary-foreground font-bold text-4xl">
                                        {getInitials(customer.companyName)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Status indicator */}
                                {customer.active && (
                                    <div className="absolute bottom-1 right-1">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-green-500 rounded-full blur-md animate-pulse" />
                                            <div className="relative h-7 w-7 bg-green-500 border-4 border-background rounded-full flex items-center justify-center">
                                                <div className="h-2.5 w-2.5 bg-white rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 space-y-4">
                                {/* Title */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <h1 className="text-4xl font-bold tracking-tight truncate">
                                            {customer.companyName}
                                        </h1>
                                        {!customer.active && (
                                            <Badge variant="secondary" className="text-sm backdrop-blur-sm">
                                                Inactif
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Badge
                                            variant="outline"
                                            className="text-sm font-medium px-4 py-2 flex items-center gap-2 backdrop-blur-xl bg-white/40 dark:bg-black/40 border-white/30 shadow-lg"
                                        >
                                            <TypeIcon className="h-4 w-4" />
                                            {getCustomerTypeLabel(customer.type)}
                                        </Badge>

                                        <code className="text-sm bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm px-4 py-2 rounded-lg font-mono border border-border/50 shadow-sm">
                                            {customer.reference}
                                        </code>
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    {customer.propertyGroupName && (
                                        <div className="flex items-center gap-2 backdrop-blur-sm bg-white/20 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
                                            <Building className="h-4 w-4" />
                                            <span>
                                                Groupe: <strong className="text-foreground">{customer.propertyGroupName}</strong>
                                            </span>
                                        </div>
                                    )}

                                    {customer.commercialName && (
                                        <div className="flex items-center gap-2 backdrop-blur-sm bg-white/20 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
                                            <User className="h-4 w-4" />
                                            <span>
                                                Commercial: <strong className="text-foreground">{customer.commercialName}</strong>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Quick stats */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                                        <Building className="h-5 w-6 text-blue-600 dark:text-blue-400" />

                                        <div className="flex items-center">
                                            <p className="text-xs font-bold">
                                                {customer.sitesCount || 0}
                                            </p>
                                            <p className="text-xs text-muted-foreground ml-1">
                                                Sites
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
                                        <Users2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        <div className="flex items-center">
                                            <p className="text-xs mr-1 font-bold">{customer.contactsCount || 0}</p>
                                            <p className="text-xs text-muted-foreground">Contacts</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
                                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div className="flex items-center">
                                            <p className="text-xs mr-1 font-bold">{customer.maintenanceBudgets.length || 0}</p>
                                            <p className="text-xs text-muted-foreground">Budgets</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                size="lg"
                                onClick={() => router.push(`/customers-v2/${customer.id}/edit`)}
                                className="shadow-xl backdrop-blur-sm bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="lg" className="backdrop-blur-sm">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="backdrop-blur-xl bg-background/95">
                                    <DropdownMenuItem onClick={() => router.push(`/customers-v2/${customer.id}/edit`)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Star className="mr-2 h-4 w-4" />
                                        Ajouter aux favoris
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🎨 TABS NAVIGATION - Sticky */}
            <Tabs>
                <div className="sticky top-0 z-20 border-b backdrop-blur-xl bg-background/80 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6">
                        <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8">
                            <TabsTrigger
                                value="overview"
                                onClick={() => setActiveTab("overview")}
                                className={cn(
                                    "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                    activeTab === "overview" && "data-[state=active]:text-foreground"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2 font-medium">
                                    <Sparkles className="h-4 w-4" />
                                    Vue d'ensemble
                                </span>
                                {activeTab === "overview" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                                )}
                            </TabsTrigger>

                            <TabsTrigger
                                value="contacts"
                                onClick={() => setActiveTab("contacts")}
                                className={cn(
                                    "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                    activeTab === "contacts" && "data-[state=active]:text-foreground"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2 font-medium">
                                    <Users2 className="h-4 w-4" />
                                    Contacts
                                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                                        {customer.contacts.length || 0}
                                    </Badge>
                                </span>
                                {activeTab === "contacts" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                                )}
                            </TabsTrigger>

                            <TabsTrigger
                                value="billing"
                                onClick={() => setActiveTab("billing")}
                                className={cn(
                                    "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                    activeTab === "billing" && "data-[state=active]:text-foreground"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2 font-medium">
                                    <CreditCard className="h-4 w-4" />
                                    Facturation
                                </span>
                                {activeTab === "billing" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                                )}
                            </TabsTrigger>

                            <TabsTrigger
                                value="budgets"
                                onClick={() => setActiveTab("budgets")}
                                className={cn(
                                    "relative data-[state=active]:bg-transparent rounded-none pb-4 pt-4 px-0 data-[state=active]:shadow-none transition-all duration-200",
                                    activeTab === "budgets" && "data-[state=active]:text-foreground"
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2 font-medium">
                                    <DollarSign className="h-4 w-4" />
                                    Budgets
                                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">
                                        {customer.maintenanceBudgets.length}
                                    </Badge>
                                </span>
                                {activeTab === "budgets" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-purple-500" />
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
            </Tabs>

            {/* 🎨 CONTENT - Full Width avec max-width */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in duration-500">
                            <CustomerOverviewSection customer={customer} />
                        </TabsContent>

                        <TabsContent value="contacts" className="mt-0 space-y-6 animate-in fade-in duration-500">
                            <CustomerContactsSection customer={customer} />
                        </TabsContent>

                        <TabsContent value="billing" className="mt-0 space-y-8 animate-in fade-in duration-500">
                            <CustomerBillingSection customer={customer} />
                        </TabsContent>

                        <TabsContent value="budgets" className="mt-0 space-y-6 animate-in fade-in duration-500">
                            <CustomerBudgetsSection customer={customer} />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* 🎨 FOOTER avec infos */}
                <div className="border-t backdrop-blur-xl bg-muted/30 mt-12">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="p-2 rounded-lg bg-background border border-border/50">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <span>
                                    Créé le{" "}
                                    <strong className="text-foreground">
                                        {new Date(customer.createdAt).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </strong>
                                </span>
                            </div>

                            <div className="h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="p-2 rounded-lg bg-background border border-border/50">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <span>
                                    Modifié le{" "}
                                    <strong className="text-foreground">
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
                </div>
            </div>
        </div>
    );
}