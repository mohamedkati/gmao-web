// src/features/customers/components/customer-details-page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Customer } from "../../types/customer.types";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Separator } from "@/shared/components/shadcnui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { Progress } from "@/shared/components/shadcnui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
    ArrowLeft,
    Edit,
    Trash,
    MoreVertical,
    Building2,
    MapPin,
    Users,
    CreditCard,
    Calculator,
    Phone,
    Mail,
    Smartphone,
    Download,
    Share2,
    Wallet,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Target,
    Briefcase,
    DollarSign,
} from "lucide-react";
import {
    customerTypeLabels,
    billingModeLabels,
    invoiceFrequencyLabels,
    getCustomerTypeColor,
    formatCurrency,
    formatDate,
    formatPercent,
    getBudgetAlertColor,
    preferredContactMethodLabels,
} from "../../utils/customer.utils";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
import { useDeleteCustomer } from "../../hooks/user-customers.query";
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

interface CustomerDetailsPageProps {
    customer: Customer;
}

export function CustomerDetailsPage({ customer }: CustomerDetailsPageProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const deleteMutation = useDeleteCustomer();

    const handleEdit = () => {
        router.push(`/customers/${customer.id}/edit`);
    };

    const handleEditDrawer = () => {
        // openDrawer("edit", customer);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteMutation.mutate(customer.id, {
            onSuccess: () => {
                router.push("/customers");
            },
        });
    };

    const handleExport = () => {
        console.log("Export customer data");
    };

    const handleShare = () => {
        console.log("Share customer");
    };

    // Calcul des budgets
    const currentYearBudget = customer.maintenanceBudgets.find(
        b => b.year === new Date().getFullYear()
    );
    const hasOverBudget = currentYearBudget && currentYearBudget.consumptionPercent &&
        currentYearBudget.consumptionPercent >= currentYearBudget.alertThreshold;

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="container max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/customers")}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Button>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {customer.companyName}
                                </h1>
                                <Badge className={getCustomerTypeColor(customer.type)}>
                                    {customerTypeLabels[customer.type]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Building2 className="h-4 w-4" />
                                    Réf: {customer.reference}
                                </span>
                                {customer.siren && (
                                    <>
                                        <Separator orientation="vertical" className="h-4" />
                                        <span>SIREN: {customer.siren}</span>
                                    </>
                                )}
                                {customer.propertyGroupName && (
                                    <>
                                        <Separator orientation="vertical" className="h-4" />
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-4 w-4" />
                                            {customer.propertyGroupName}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Partager
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleExport}>
                                <Download className="mr-2 h-4 w-4" />
                                Exporter
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Modifier
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleEdit}>
                                        Modifier (Page complète)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleEditDrawer}>
                                        Modifier (Drawer rapide)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Budget Alert */}
                {hasOverBudget && currentYearBudget && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Attention :</strong> Le budget {currentYearBudget.year} a dépassé le seuil d'alerte
                            ({currentYearBudget.alertThreshold}%). Consommation actuelle : {currentYearBudget.consumptionPercent && formatPercent(currentYearBudget.consumptionPercent)}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Quick Stats */}
                {currentYearBudget && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Budget {currentYearBudget.year}
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(currentYearBudget.budgetedAmount)}
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                                        <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Engagé</p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(currentYearBudget.committedAmount)}
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3">
                                        <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Facturé</p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(currentYearBudget.invoicedAmount)}
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Restant</p>
                                        <p className="text-2xl font-bold">
                                            {currentYearBudget.remainingBudget && formatCurrency(currentYearBudget.remainingBudget)}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {currentYearBudget.consumptionPercent && formatPercent(currentYearBudget.consumptionPercent)} consommé
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                                        <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Tabs Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                        <TabsTrigger value="contacts">
                            Contacts ({customer.contacts?.length || 0})
                        </TabsTrigger>
                        <TabsTrigger value="budgets">
                            Budgets ({customer.maintenanceBudgets?.length || 0})
                        </TabsTrigger>
                        <TabsTrigger value="pricing">Tarification</TabsTrigger>
                        <TabsTrigger value="billing">Facturation</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-12 gap-6">
                            {/* Main Info */}
                            <div className="col-span-12 lg:col-span-8 space-y-6">
                                {/* Description */}
                                {customer.comment && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Commentaire</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {customer.comment}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Addresses */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Adresse de facturation
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <address className="not-italic space-y-1 text-sm">
                                                {customer.invoiceAddress.firstAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {customer.invoiceAddress.firstAddressLine}
                                                    </p>
                                                )}
                                                {customer.invoiceAddress.secondAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {customer.invoiceAddress.secondAddressLine}
                                                    </p>
                                                )}
                                                <p className="font-medium">{customer.invoiceAddress.street}</p>
                                                <p>
                                                    {customer.invoiceAddress.postalCode} {customer.invoiceAddress.city}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {customer.invoiceAddress.country}
                                                </p>
                                            </address>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Adresse postale
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <address className="not-italic space-y-1 text-sm">
                                                {customer.mailingAddress.firstAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {customer.mailingAddress.firstAddressLine}
                                                    </p>
                                                )}
                                                {customer.mailingAddress.secondAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {customer.mailingAddress.secondAddressLine}
                                                    </p>
                                                )}
                                                <p className="font-medium">{customer.mailingAddress.street}</p>
                                                <p>
                                                    {customer.mailingAddress.postalCode} {customer.mailingAddress.city}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {customer.mailingAddress.country}
                                                </p>
                                            </address>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Commercial Contact */}
                                {customer.commercialName && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Commercial responsable
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="font-medium">{customer.commercialName}</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="col-span-12 lg:col-span-4 space-y-6">
                                {/* Quick Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Informations rapides</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start justify-between text-sm">
                                            <span className="text-muted-foreground">Type</span>
                                            <Badge variant="outline" className={getCustomerTypeColor(customer.type)}>
                                                {customerTypeLabels[customer.type]}
                                            </Badge>
                                        </div>
                                        {customer.siren && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">SIREN</span>
                                                    <span className="font-mono font-medium">{customer.siren}</span>
                                                </div>
                                            </>
                                        )}
                                        {customer.propertyGroupName && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Groupe</span>
                                                    <span className="font-medium">{customer.propertyGroupName}</span>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Current Budget Status */}
                                {currentYearBudget && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center justify-between">
                                                <span className="flex items-center gap-2">
                                                    <Wallet className="h-4 w-4" />
                                                    Budget {currentYearBudget.year}
                                                </span>
                                                <Badge className={getBudgetAlertColor(
                                                    currentYearBudget.consumptionPercent,
                                                    currentYearBudget.alertThreshold
                                                )}>
                                                    {formatPercent(currentYearBudget.consumptionPercent || 0)}
                                                </Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Consommation</span>
                                                    <span className="font-medium">
                                                        {formatPercent(currentYearBudget.consumptionPercent || 0)}
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={currentYearBudget.consumptionPercent}
                                                    className="h-2"
                                                />
                                            </div>
                                            <Separator />
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Budget alloué</span>
                                                    <span className="font-medium">
                                                        {formatCurrency(currentYearBudget.budgetedAmount)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Restant</span>
                                                    <span className={`font-medium ${!currentYearBudget.remainingBudget || currentYearBudget.remainingBudget < 0 ? 'text-destructive' : 'text-green-600'}`}>
                                                        {formatCurrency(currentYearBudget.remainingBudget || 0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Audit Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Historique</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Créé le</p>
                                            <p className="font-medium">{formatDate(customer.created)}</p>
                                            {customer.createdBy && (
                                                <p className="text-xs text-muted-foreground">Par {customer.createdBy}</p>
                                            )}
                                        </div>
                                        <Separator />
                                        <div>
                                            <p className="text-muted-foreground mb-1">Dernière modification</p>
                                            <p className="font-medium">{formatDate(customer.lastModified)}</p>
                                            {customer.lastModifiedBy && (
                                                <p className="text-xs text-muted-foreground">
                                                    Par {customer.lastModifiedBy}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Contacts Tab */}
                    <TabsContent value="contacts" className="space-y-6">
                        {customer.contacts && customer.contacts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {customer.contacts.map((contact) => (
                                    <Card key={contact.id}>
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-base">
                                                        {contact.firstName} {contact.lastName}
                                                    </CardTitle>
                                                    {contact.position && (
                                                        <CardDescription>{contact.position}</CardDescription>
                                                    )}
                                                </div>
                                                {contact.isPrimary && (
                                                    <Badge variant="default" className="gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Principal
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <a
                                                        href={`mailto:${contact.email}`}
                                                        className="text-primary hover:underline"
                                                    >
                                                        {contact.email}
                                                    </a>
                                                </div>
                                                {contact.phone && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        <a
                                                            href={`tel:${contact.phone}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {contact.phone}
                                                        </a>
                                                    </div>
                                                )}
                                                {contact.mobile && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                        <a
                                                            href={`tel:${contact.mobile}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {contact.mobile}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Préfère: {preferredContactMethodLabels[contact.preferredContactMethod]}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-2">Aucun contact enregistré</p>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoutez des contacts pour faciliter la communication
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Budgets Tab */}
                    <TabsContent value="budgets" className="space-y-6">
                        {customer.maintenanceBudgets && customer.maintenanceBudgets.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...customer.maintenanceBudgets]
                                    .sort((a, b) => b.year - a.year)
                                    .map((budget) => (
                                        <Card key={budget.id}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-base">Budget {budget.year}</CardTitle>
                                                    <Badge className={getBudgetAlertColor(
                                                        budget.consumptionPercent,
                                                        budget.alertThreshold
                                                    )}>
                                                        {formatPercent(budget.consumptionPercent || 0)}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-1">Budget alloué</p>
                                                        <p className="text-lg font-bold">
                                                            {formatCurrency(budget.budgetedAmount)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-1">Restant</p>
                                                        <p className="text-lg font-bold">
                                                            {formatCurrency(budget.remainingBudget || 0)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="text-muted-foreground">Consommation</span>
                                                        <span className="font-medium">
                                                            {formatPercent(budget.consumptionPercent || 0)}
                                                        </span>
                                                    </div>
                                                    <Progress value={budget.consumptionPercent} className="h-2" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Engagé:</span>
                                                        <span className="font-medium">
                                                            {formatCurrency(budget.committedAmount)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Facturé:</span>
                                                        <span className="font-medium">
                                                            {formatCurrency(budget.invoicedAmount)}
                                                        </span>
                                                    </div>
                                                </div>
                                                {budget.consumptionPercent && budget.consumptionPercent >= budget.alertThreshold && (
                                                    <Alert variant="destructive">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        <AlertDescription className="text-xs">
                                                            Seuil d'alerte atteint ({budget.alertThreshold}%)
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground mb-2">Aucun budget enregistré</p>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoutez des budgets pour suivre les dépenses
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Pricing Tab */}
                    <TabsContent value="pricing" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5" />
                                    Coefficients de tarification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <span className="text-sm font-medium">Main d'œuvre</span>
                                        <span className="text-xl font-bold font-mono">
                                            {customer.pricingCoefficients.laborCoefficient}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <span className="text-sm font-medium">Matériaux</span>
                                        <span className="text-xl font-bold font-mono">
                                            {customer.pricingCoefficients.materialCoefficient}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <span className="text-sm font-medium">Équipement</span>
                                        <span className="text-xl font-bold font-mono">
                                            {customer.pricingCoefficients.equipmentCoefficient}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border rounded-lg">
                                        <span className="text-sm font-medium">Sous-traitance</span>
                                        <span className="text-xl font-bold font-mono">
                                            {customer.pricingCoefficients.subcontractorCoefficient}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Paramètres de facturation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Mode de facturation
                                        </p>
                                        <p className="text-base font-medium">
                                            {billingModeLabels[customer.billingSettings.mode]}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Fréquence
                                        </p>
                                        <p className="text-base font-medium">
                                            {invoiceFrequencyLabels[customer.billingSettings.invoiceFrequency]}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Délai de paiement
                                        </p>
                                        <p className="text-base font-medium">
                                            {customer.billingSettings.paymentTermsDays} jours
                                        </p>
                                    </div>
                                    {customer.paymentMethod && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">
                                                Mode de règlement
                                            </p>
                                            <p className="text-base font-medium">
                                                {customer.paymentMethod.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Génération automatique
                                        </span>
                                        <Badge variant={customer.billingSettings.autoGenerateInvoices ? "default" : "outline"}>
                                            {customer.billingSettings.autoGenerateInvoices ? "Activée" : "Désactivée"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Notifications email
                                        </span>
                                        <Badge variant={customer.billingSettings.sendEmailNotifications ? "default" : "outline"}>
                                            {customer.billingSettings.sendEmailNotifications ? "Activées" : "Désactivées"}
                                        </Badge>
                                    </div>
                                    {customer.billingSettings.applyLatePaymentFees && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Pénalités de retard
                                            </span>
                                            <span className="font-medium">
                                                {customer.billingSettings.latePaymentFeePercent}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le client{" "}
                            <strong>{customer.companyName}</strong> ? Cette action est irréversible et
                            supprimera également tous les contacts et budgets associés.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? (
                                <>
                                    <span className="spinner mr-2 h-4 w-4" />
                                    Suppression...
                                </>
                            ) : (
                                "Supprimer définitivement"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}