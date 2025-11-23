"use client";

import { lazy, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyGroup } from "../types/property-group.types";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Separator } from "@/shared/components/shadcnui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
    FileText,
    TrendingUp,
    Mail,
    Phone,
    Calendar,
    Smartphone,
    Clock,
    CheckCircle2,
    AlertCircle,
    Download,
    Share2,
    Briefcase,
    Target,
    Percent,
    DollarSign,
} from "lucide-react";
import {
    propertyGroupTypeLabels,
    propertyGroupStatusLabels,
    legalFormLabels,
    getStatusColor,
    formatCurrency,
    formatDate,
    isContractExpiringSoon,
    contactRoleLabels,
    preferredContactMethodLabels,
} from "../utils/property-groups.utils";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
import { usePropertyGroupStore } from "../store/property-group.store";
import { useDeletePropertyGroup, useUpdatePropertyGroupStatistics } from "../hooks/use-property-groups";
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
import Link from "next/link";

interface PropertyGroupDetailsPageProps {
    propertyGroup: PropertyGroup;
}

const GroupContactComponent = lazy(() =>
    (import("@/features/property-groups/components/property-group-contacts-list").then((m) => ({ default: m.PropertyGroupContactsList }))));

export function PropertyGroupDetailsPage({ propertyGroup }: PropertyGroupDetailsPageProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { openDrawer } = usePropertyGroupStore();
    const deleteMutation = useDeletePropertyGroup();
    const updateStatsMutation = useUpdatePropertyGroupStatistics();

    const contractExpiring = isContractExpiringSoon(propertyGroup.frameworkContractEndDate);

    const handleEdit = () => {
        router.push(`/property-groups/${propertyGroup.id}/edit`);
    };

    const handleEditDrawer = () => {
        openDrawer("edit", propertyGroup);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteMutation.mutate(propertyGroup.id, {
            onSuccess: () => {
                router.push("/property-groups");
            },
        });
    };

    const handleUpdateStats = () => {
        updateStatsMutation.mutate(propertyGroup.id);
    };

    const handleExport = () => {
        console.log("Export group data");
    };

    const handleShare = () => {
        console.log("Share group");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="container max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/property-groups")}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Button>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {propertyGroup.name}
                                </h1>
                                <Badge className={getStatusColor(propertyGroup.status)}>
                                    {propertyGroupStatusLabels[propertyGroup.status]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Building2 className="h-4 w-4" />
                                    Réf: {propertyGroup.reference}
                                </span>
                                <Separator orientation="vertical" className="h-4" />
                                <span className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {propertyGroupTypeLabels[propertyGroup.type]}
                                </span>
                                {propertyGroup.legalName && (
                                    <>
                                        <Separator orientation="vertical" className="h-4" />
                                        <span>{propertyGroup.legalName}</span>
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
                                    <DropdownMenuItem onClick={handleUpdateStats}>
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Actualiser les statistiques
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Contract Expiring Alert */}
                {contractExpiring && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Attention :</strong> Le contrat cadre expire le{" "}
                            {formatDate(propertyGroup.frameworkContractEndDate)}. Pensez à le renouveler.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Clients</p>
                                    <p className="text-2xl font-bold">{propertyGroup.totalCustomers}</p>
                                </div>
                                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Sites</p>
                                    <p className="text-2xl font-bold">{propertyGroup.totalSites}</p>
                                </div>
                                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Unités</p>
                                    <p className="text-2xl font-bold">{propertyGroup.totalUnits}</p>
                                </div>
                                <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                                    <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">CA Annuel</p>
                                    <p className="text-2xl font-bold">
                                        {formatCurrency(propertyGroup.totalAnnualRevenue)}
                                    </p>
                                </div>
                                <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3">
                                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                        <TabsTrigger value="legal">Informations légales</TabsTrigger>
                        <TabsTrigger value="contacts">Contacts</TabsTrigger>
                        <TabsTrigger value="billing">Facturation</TabsTrigger>
                        <TabsTrigger value="contract">Contrat</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-12 gap-6">
                            {/* Main Info */}
                            <div className="col-span-12 lg:col-span-8 space-y-6">
                                {/* Description */}
                                {propertyGroup.description && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Description</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {propertyGroup.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Address */}
                                {propertyGroup.headquartersAddress && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5" />
                                                Siège social
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <address className="not-italic space-y-1 text-sm">
                                                {propertyGroup.headquartersAddress.firstAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {propertyGroup.headquartersAddress.firstAddressLine}
                                                    </p>
                                                )}
                                                {propertyGroup.headquartersAddress.secondAddressLine && (
                                                    <p className="text-muted-foreground">
                                                        {propertyGroup.headquartersAddress.secondAddressLine}
                                                    </p>
                                                )}
                                                <p className="font-medium">{propertyGroup.headquartersAddress.street}</p>
                                                <p>
                                                    {propertyGroup.headquartersAddress.postalCode}{" "}
                                                    {propertyGroup.headquartersAddress.city}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {propertyGroup.headquartersAddress.country}
                                                </p>
                                            </address>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Main Contacts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Main Contact */}
                                    {propertyGroup.mainContactName && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Contact principal</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <div>
                                                    <p className="font-medium">{propertyGroup.mainContactName}</p>
                                                    {propertyGroup.mainContactPosition && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {propertyGroup.mainContactPosition}
                                                        </p>
                                                    )}
                                                </div>
                                                {propertyGroup.mainContactEmail && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`mailto:${propertyGroup.mainContactEmail}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {propertyGroup.mainContactEmail}
                                                        </Link>
                                                    </div>
                                                )}
                                                {propertyGroup.mainContactPhone && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`tel:${propertyGroup.mainContactPhone}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {propertyGroup.mainContactPhone}
                                                        </Link>
                                                    </div>
                                                )}
                                                {propertyGroup.mainContactMobile && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`tel:${propertyGroup.mainContactMobile}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {propertyGroup.mainContactMobile}
                                                        </Link>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Accounting Contact */}
                                    {propertyGroup.accountingContactName && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">Contact comptabilité</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <div>
                                                    <p className="font-medium">{propertyGroup.accountingContactName}</p>
                                                </div>
                                                {propertyGroup.accountingContactEmail && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`mailto:${propertyGroup.accountingContactEmail}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {propertyGroup.accountingContactEmail}
                                                        </Link>
                                                    </div>
                                                )}
                                                {propertyGroup.accountingContactPhone && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`tel:${propertyGroup.accountingContactPhone}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {propertyGroup.accountingContactPhone}
                                                        </Link>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="col-span-12 lg:col-span-4 space-y-6">
                                {/* Statistics */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5" />
                                                Statistiques
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleUpdateStats}
                                                disabled={updateStatsMutation.isPending}
                                            >
                                                {updateStatsMutation.isPending ? (
                                                    <span className="spinner h-4 w-4" />
                                                ) : (
                                                    <TrendingUp className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </CardTitle>
                                        {propertyGroup.lastStatisticsUpdateDate && (
                                            <CardDescription className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Mis à jour le {formatDate(propertyGroup.lastStatisticsUpdateDate)}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Clients</span>
                                                <span className="text-lg font-semibold">
                                                    {propertyGroup.totalCustomers}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Sites</span>
                                                <span className="text-lg font-semibold">
                                                    {propertyGroup.totalSites}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Unités</span>
                                                <span className="text-lg font-semibold">
                                                    {propertyGroup.totalUnits}
                                                </span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">CA Annuel</span>
                                                <span className="text-lg font-semibold">
                                                    {formatCurrency(propertyGroup.totalAnnualRevenue)}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Informations rapides</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start justify-between text-sm">
                                            <span className="text-muted-foreground">Type</span>
                                            <Badge variant="outline">
                                                {propertyGroupTypeLabels[propertyGroup.type]}
                                            </Badge>
                                        </div>
                                        {propertyGroup.legalForm && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Forme juridique</span>
                                                    <span className="font-medium">
                                                        {legalFormLabels[propertyGroup.legalForm]}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        {propertyGroup.siren && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">SIREN</span>
                                                    <span className="font-mono font-medium">{propertyGroup.siren}</span>
                                                </div>
                                            </>
                                        )}
                                        {propertyGroup.vatNumber && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">N° TVA</span>
                                                    <span className="font-mono font-medium">{propertyGroup.vatNumber}</span>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Audit Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Historique</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Créé le</p>
                                            <p className="font-medium">{formatDate(propertyGroup.created)}</p>
                                            {propertyGroup.createdBy && (
                                                <p className="text-xs text-muted-foreground">Par {propertyGroup.createdBy}</p>
                                            )}
                                        </div>
                                        <Separator />
                                        <div>
                                            <p className="text-muted-foreground mb-1">Dernière modification</p>
                                            <p className="font-medium">{formatDate(propertyGroup.lastModified)}</p>
                                            {propertyGroup.lastModifiedBy && (
                                                <p className="text-xs text-muted-foreground">
                                                    Par {propertyGroup.lastModifiedBy}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Legal Tab */}
                    <TabsContent value="legal" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Informations légales
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Raison sociale
                                        </p>
                                        <p className="text-base">
                                            {propertyGroup.legalName || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Forme juridique
                                        </p>
                                        <p className="text-base">
                                            {propertyGroup.legalForm
                                                ? legalFormLabels[propertyGroup.legalForm]
                                                : "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">SIREN</p>
                                        <p className="text-base font-mono">
                                            {propertyGroup.siren || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Numéro RCS
                                        </p>
                                        <p className="text-base">
                                            {propertyGroup.companyRegistrationNumber || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Numéro de TVA
                                        </p>
                                        <p className="text-base font-mono">
                                            {propertyGroup.vatNumber || "-"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contacts Tab */}
                    <TabsContent value="contacts" className="space-y-6">
                        {/* {propertyGroup.contacts && propertyGroup.contacts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {
                                    propertyGroup.contacts.map((contact) => (
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
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {contactRoleLabels[contact.role]}
                                                    </Badge>
                                                    {contact.department && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {contact.department}
                                                        </span>
                                                    )}
                                                </div>
                                                <Separator />
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        <Link
                                                            href={`mailto:${contact.email}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {contact.email}
                                                        </Link>
                                                    </div>
                                                    {contact.phone && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                                            <Link
                                                                href={`tel:${contact.phone}`}
                                                                className="text-primary hover:underline"
                                                            >
                                                                {contact.phone}
                                                            </Link>
                                                        </div>
                                                    )}
                                                    {contact.mobile && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                                                            <Link
                                                                href={`tel:${contact.mobile}`}
                                                                className="text-primary hover:underline"
                                                            >
                                                                {contact.mobile}
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {contact.receivesInvoices && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Factures
                                                        </Badge>
                                                    )}
                                                    {contact.receivesReports && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Rapports
                                                        </Badge>
                                                    )}
                                                    {contact.receivesAlerts && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Alertes
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Préfère: {preferredContactMethodLabels[contact.preferredContactMethod]}
                                                </div>
                                                {contact.notes && (
                                                    <>
                                                        <Separator />
                                                        <p className="text-xs text-muted-foreground">{contact.notes}</p>
                                                    </>
                                                )}
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
                        )} */}

                        <GroupContactComponent propertyGroupId={propertyGroup.id} />
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Paramètres de facturation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Facturation consolidée
                                        </span>
                                        <Badge variant={propertyGroup.consolidatedBilling ? "default" : "outline"}>
                                            {propertyGroup.consolidatedBilling ? "Oui" : "Non"}
                                        </Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Délai de paiement</span>
                                        <span className="font-medium">{propertyGroup.paymentTermsDays} jours</span>
                                    </div>
                                    {propertyGroup.volumeDiscountPercent && (
                                        <>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Remise volume</span>
                                                <div className="flex items-center gap-1">
                                                    <Percent className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">
                                                        {propertyGroup.volumeDiscountPercent}%
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {propertyGroup.preferredPaymentMethod && (
                                        <>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Mode de paiement</span>
                                                <span className="font-medium">
                                                    {propertyGroup.preferredPaymentMethod}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {propertyGroup.groupPricingCoefficients && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-5 w-5" />
                                            Coefficients de tarification
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Main d'œuvre</span>
                                            <span className="font-medium font-mono">
                                                {propertyGroup.groupPricingCoefficients.laborCoefficient}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Matériaux</span>
                                            <span className="font-medium font-mono">
                                                {propertyGroup.groupPricingCoefficients.materialCoefficient}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Équipement</span>
                                            <span className="font-medium font-mono">
                                                {propertyGroup.groupPricingCoefficients.equipmentCoefficient}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Sous-traitance</span>
                                            <span className="font-medium font-mono">
                                                {propertyGroup.groupPricingCoefficients.subcontractorCoefficient}
                                            </span>
                                        </div>
                                        {propertyGroup.groupPricingCoefficients.emergencyCalloutFee && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Frais d'urgence</span>
                                                    <span className="font-medium">
                                                        {formatCurrency(
                                                            propertyGroup.groupPricingCoefficients.emergencyCalloutFee
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        {propertyGroup.groupPricingCoefficients.monthlyMaintenanceFee && (
                                            <>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Forfait mensuel</span>
                                                    <span className="font-medium">
                                                        {formatCurrency(
                                                            propertyGroup.groupPricingCoefficients.monthlyMaintenanceFee
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    {/* Contract Tab */}
                    <TabsContent value="contract" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Contrat cadre
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {propertyGroup.frameworkContractReference ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Référence du contrat
                                                </p>
                                                <p className="text-base font-mono">
                                                    {propertyGroup.frameworkContractReference}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    Reconduction automatique
                                                </p>
                                                <Badge
                                                    variant={
                                                        propertyGroup.autoRenewalFrameworkContract ? "default" : "outline"
                                                    }
                                                >
                                                    {propertyGroup.autoRenewalFrameworkContract ? "Oui" : "Non"}
                                                </Badge>
                                            </div>
                                            {propertyGroup.frameworkContractStartDate && (
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground mb-1">
                                                        Date de début
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <p className="text-base">
                                                            {formatDate(propertyGroup.frameworkContractStartDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {propertyGroup.frameworkContractEndDate && (
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground mb-1">
                                                        Date de fin
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <p className="text-base">
                                                            {formatDate(propertyGroup.frameworkContractEndDate)}
                                                        </p>
                                                        {contractExpiring && (
                                                            <Badge variant="destructive" className="ml-2">
                                                                Expire bientôt
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Aucun contrat cadre n'est configuré pour ce groupe
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notes Tab */}
                    <TabsContent value="notes" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {propertyGroup.commercialNotes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Notes commerciales</CardTitle>
                                        <CardDescription>
                                            Visibles par l'équipe commerciale
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                            {propertyGroup.commercialNotes}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {propertyGroup.internalNotes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            Notes internes
                                        </CardTitle>
                                        <CardDescription>
                                            Confidentielles - Usage interne uniquement
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                            {propertyGroup.internalNotes}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {!propertyGroup.commercialNotes && !propertyGroup.internalNotes && (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">Aucune note enregistrée</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le groupe{" "}
                            <strong>{propertyGroup.name}</strong> ? Cette action est irréversible et
                            supprimera également tous les contacts associés.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer définitivement
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}