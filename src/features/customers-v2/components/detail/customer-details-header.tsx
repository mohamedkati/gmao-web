"use client"
import { Briefcase, Building, DollarSign, Edit, MoreVertical, Star, Trash, User, Users2 } from "lucide-react";
import { Customer, CustomerType } from "../../types/customer.types";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/shadcnui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";

interface CustomerDetailsHeaderProps {
    customer: Customer;
}
export function CustomerDetailsHeader({ customer }: CustomerDetailsHeaderProps) {
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
    const TypeIcon = getCustomerTypeIcon(customer.type);

    const router = useRouter();

    return (
        <div className="flex justify-between items-top">
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
    )
}