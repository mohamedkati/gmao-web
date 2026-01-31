// src/app/(dashboard)/sites/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSite } from "@/features/sites/hooks";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
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
    MoreVertical,
    Star,
    Copy,
    Trash2,
    Download,
    Share2,
    AlertCircle,
    MapPin,
    Building,
    Calendar,
    Maximize,
    Users,
    Wrench,
    FileText,
    Activity,
    Settings,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import { SiteType } from "@/features/sites/types/site.types";
import { SiteOverviewTab } from "@/features/sites/components";
import { SiteUnitsTab } from "@/features/sites/components";
import { SiteAssetsTab } from "@/features/sites/components";
import { SiteDocumentsTab } from "@/features/sites/components";
import { SiteTeamTab } from "@/features/sites/components";
import { SiteActivityTab } from "@/features/sites/components";
import { cn } from "@/shared/lib/utils/cn";
import { mockSites } from "@/features/sites/data/mock-data";
import { SiteAssetsTabWrapper } from "@/features/sites/components/details/tabs/site-assets-tab-wrapper";

const siteTypeLabels: Record<SiteType, string> = {
    [SiteType.ResidentialBuilding]: "Résidentiel",
    [SiteType.CommercialBuilding]: "Commercial",
    [SiteType.MixedUse]: "Mixte",
    [SiteType.IndustrialFacility]: "Industriel",
    [SiteType.Office]: "Bureau",
    [SiteType.Warehouse]: "Entrepôt",
    [SiteType.RetailStore]: "Magasin",
    [SiteType.Hotel]: "Hôtel",
    [SiteType.Hospital]: "Hôpital",
    [SiteType.School]: "École",
    [SiteType.GovernmentBuilding]: "Gouvernement",
};

const siteTypeIcons: Record<SiteType, string> = {
    [SiteType.ResidentialBuilding]: "🏢",
    [SiteType.CommercialBuilding]: "🏪",
    [SiteType.MixedUse]: "🏗️",
    [SiteType.IndustrialFacility]: "🏭",
    [SiteType.Office]: "🏢",
    [SiteType.Warehouse]: "📦",
    [SiteType.RetailStore]: "🛒",
    [SiteType.Hotel]: "🏨",
    [SiteType.Hospital]: "🏥",
    [SiteType.School]: "🏫",
    [SiteType.GovernmentBuilding]: "🏛️",
};

const siteTypeGradients: Record<SiteType, string> = {
    [SiteType.ResidentialBuilding]: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    [SiteType.CommercialBuilding]: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    [SiteType.MixedUse]: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
    [SiteType.IndustrialFacility]: "from-gray-500/20 via-slate-500/20 to-gray-600/20",
    [SiteType.Office]: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    [SiteType.Warehouse]: "from-red-500/20 via-rose-500/20 to-red-600/20",
    [SiteType.RetailStore]: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
    [SiteType.Hotel]: "from-pink-500/20 via-rose-500/20 to-pink-600/20",
    [SiteType.Hospital]: "from-cyan-500/20 via-blue-500/20 to-cyan-600/20",
    [SiteType.School]: "from-violet-500/20 via-purple-500/20 to-violet-600/20",
    [SiteType.GovernmentBuilding]: "from-teal-500/20 via-cyan-500/20 to-teal-600/20",
};

export default function SiteDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const siteId = params.id as string;
    const error = false;

    //   const { data: site, isLoading, error } = useSite({ siteId });
    const site = mockSites.at(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => { setIsLoading(false) }, 1000);

        return () => clearTimeout(timer);
    }, [])
    const [activeTab, setActiveTab] = useState("overview");
    const [isFavorite, setIsFavorite] = useState(false);

    // Loading state
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    // Error state
    if (error || !site) {
        return <ErrorState onBack={() => router.push("/sites")} />;
    }

    return (
        <div className="flex flex-col  overflow-hidden bg-gradient-to-br rounded-xl from-background via-background to-muted/20">
            {/* Hero Header */}
            <div className="relative border-b overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-30",
                        siteTypeGradients[site.type]
                    )}
                />

                {/* Sparkles decoration */}
                <div className="absolute top-10 right-20 animate-pulse">
                    <Sparkles className="h-6 w-6 text-primary/30" />
                </div>
                <div className="absolute top-32 right-40 animate-pulse delay-300">
                    <Sparkles className="h-4 w-4 text-purple-500/30" />
                </div>
                <div className="absolute bottom-10 left-40 animate-pulse delay-700">
                    <Sparkles className="h-5 w-5 text-pink-500/30" />
                </div>

                {/* Content */}
                <div className="relative px-4 md:px-6 py-6 md:py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/sites")}
                            className="mb-4 md:mb-6 -ml-2 hover:bg-white/50 dark:hover:bg-black/50 backdrop-blur-sm"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux sites
                        </Button>

                        {/* Hero Content */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            {/* Left: Main Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-4 md:gap-6">
                                    {/* Avatar */}
                                    <div className="relative group shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity" />
                                        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-2xl border-2 border-white/20 flex items-center justify-center shadow-2xl">
                                            <span className="text-4xl md:text-5xl">
                                                {siteTypeIcons[site.type]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title & Meta */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                                            <h1 className="text-2xl md:text-4xl font-bold truncate">
                                                {site.name}
                                            </h1>
                                            <button
                                                onClick={() => setIsFavorite(!isFavorite)}
                                                className={cn(
                                                    "shrink-0 p-2 rounded-lg backdrop-blur-sm border transition-all",
                                                    isFavorite
                                                        ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-500"
                                                        : "bg-background/50 border-white/10 text-muted-foreground hover:text-yellow-500"
                                                )}
                                            >
                                                <Star
                                                    className={cn("h-4 w-4 md:h-5 md:w-5", isFavorite && "fill-current")}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                            <Badge
                                                variant="outline"
                                                className="backdrop-blur-sm bg-background/50 border-white/20"
                                            >
                                                {site.reference}
                                            </Badge>
                                            <Badge
                                                variant="secondary"
                                                className="backdrop-blur-sm bg-background/50"
                                            >
                                                {siteTypeLabels[site.type]}
                                            </Badge>
                                            {site.coordinates && (
                                                <Badge
                                                    variant="outline"
                                                    className="backdrop-blur-sm bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
                                                >
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    GPS
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Quick Info */}
                                        <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span>
                                                    {site.address.city}, {site.address.postalCode}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Building className="h-4 w-4" />
                                                <span>{site.customer?.companyName}</span>
                                            </div>
                                            {site.buildingYear && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{site.buildingYear}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex flex-wrap lg:flex-col gap-2">
                                <Button
                                    onClick={() => router.push(`/sites/${site.id}/edit`)}
                                    className="flex-1 lg:flex-none"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifier
                                </Button>
                                <Button variant="outline" className="backdrop-blur-sm bg-background/50">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Partager</span>
                                </Button>
                                <Button variant="outline" className="backdrop-blur-sm bg-background/50">
                                    <Download className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Export</span>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="backdrop-blur-sm bg-background/50">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Dupliquer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Download className="mr-2 h-4 w-4" />
                                            Exporter PDF
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Supprimer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                            <StatCard
                                icon={Maximize}
                                label="Surface"
                                value={site. surfaceArea ? `${site. surfaceArea.toLocaleString()} m²` : "N/A"}
                                trend={8.5}
                            />
                            <StatCard
                                icon={Building}
                                label="Units"
                                value={site.unitsCount || 0}
                                trend={12.3}
                            />
                            <StatCard
                                icon={Wrench}
                                label="Équipements"
                                value={site.assets?.length || 0}
                                trend={-2.1}
                            />
                            <StatCard
                                icon={Users}
                                label="Occupation"
                                value="87%"
                                trend={2.3}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b bg-background/60 backdrop-blur-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0 overflow-x-auto">
                            <TabsTrigger
                                value="overview"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Vue d'ensemble</span>
                                <span className="sm:hidden">Overview</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="units"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <Building className="mr-2 h-4 w-4" />
                                Units
                                <Badge variant="secondary" className="ml-2">
                                    {site.unitsCount || 0}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger
                                value="assets"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <Wrench className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Équipements</span>
                                <span className="sm:hidden">Assets</span>
                                <Badge variant="secondary" className="ml-2">
                                    {site.assets?.length || 0}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger
                                value="documents"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Documents
                            </TabsTrigger>
                            <TabsTrigger
                                value="team"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                Équipe
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3"
                            >
                                <Activity className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Activité</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                        <TabsContent value="overview" className="mt-0">
                            <SiteOverviewTab site={site} />
                        </TabsContent>
                        <TabsContent value="units" className="mt-0">
                            <SiteUnitsTab site={site} />
                        </TabsContent>
                        <TabsContent value="assets" className="mt-0">
                           <SiteAssetsTabWrapper site={site} />
                        </TabsContent>
                        <TabsContent value="documents" className="mt-0">
                            <SiteDocumentsTab site={site} />
                        </TabsContent>
                        <TabsContent value="team" className="mt-0">
                            <SiteTeamTab site={site} />
                        </TabsContent>
                        <TabsContent value="activity" className="mt-0">
                            <SiteActivityTab site={site} />
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

// Helper Components
function StatCard({
    icon: Icon,
    label,
    value,
    trend,
}: {
    icon: any;
    label: string;
    value: string | number;
    trend?: number;
}) {
    const isPositive = trend !== undefined && trend > 0;

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-3 md:p-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border border-white/20 transition-all hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-2">
                    <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    {trend !== undefined && (
                        <Badge
                            variant="secondary"
                            className={cn(
                                "text-xs px-1.5",
                                isPositive
                                    ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                    : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                            )}
                        >
                            {isPositive ? "+" : ""}
                            {trend}%
                        </Badge>
                    )}
                </div>
                <p className="text-xl md:text-2xl font-bold mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="flex flex-col h-screen">
            <div className="border-b p-6">
                <div className="max-w-7xl mx-auto">
                    <Skeleton className="h-10 w-32 mb-6" />
                    <div className="flex items-start gap-6">
                        <Skeleton className="w-28 h-28 rounded-3xl" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-10 w-96" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ErrorState({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col h-screen items-center justify-center p-6">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-3xl" />
                <div className="relative w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive/20">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Site introuvable</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
                Le site demandé n'existe pas ou a été supprimé
            </p>
            <Button onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux sites
            </Button>
        </div>
    );
}