// src/app/(dashboard)/sites/[id]/edit/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useSite } from "@/features/sites/hooks/sites/use-site-query";
import { SiteForm } from "@/features/sites/components";
import { Button } from "@/shared/components/shadcnui/button";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { ArrowLeft, Building, Edit, AlertCircle, Sparkles } from "lucide-react";
import { SiteType } from "@/features/sites/types/site.types";

const siteTypeLabels: Record<SiteType, string> = {
  [SiteType.ResidentialBuilding]: "Immeuble résidentiel",
  [SiteType.CommercialBuilding]: "Bâtiment commercial",
  [SiteType.MixedUse]: "Usage mixte",
  [SiteType.IndustrialFacility]: "Installation industrielle",
  [SiteType.Office]: "Bureau",
  [SiteType.Warehouse]: "Entrepôt",
  [SiteType.RetailStore]: "Magasin",
  [SiteType.Hotel]: "Hôtel",
  [SiteType.Hospital]: "Hôpital",
  [SiteType.School]: "École",
  [SiteType.GovernmentBuilding]: "Bâtiment gouvernemental",
};

export default function EditSitePage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.id as string;

  const { data: site, isLoading, error } = useSite({ siteId });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="relative border-b overflow-hidden">
          <div className="relative px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <Skeleton className="h-10 w-40 mb-6" />
              <div className="flex items-center gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !site) {
    return (
      <div className="flex flex-col h-full">
        <div className="relative border-b overflow-hidden">
          <div className="relative px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/sites")}
                className="mb-6 -ml-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux sites
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
              <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive/20">
                <AlertCircle className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Site introuvable</h2>
              <p className="text-muted-foreground mb-6">
                Le site demandé n'existe pas ou a été supprimé
              </p>
              <Button onClick={() => router.push("/sites")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux sites
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Hero */}
      <div className="relative border-b overflow-hidden">
        {/* Gradient Blobs Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-500" />

        {/* Sparkles decoratives */}
        <div className="absolute top-20 right-40 animate-pulse">
          <Sparkles className="h-6 w-6 text-primary/20" />
        </div>
        <div className="absolute top-40 right-60 animate-pulse delay-300">
          <Sparkles className="h-4 w-4 text-purple-500/20" />
        </div>

        {/* Content */}
        <div className="relative px-6 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/sites")}
              className="mb-6 -ml-2 hover:bg-white/50 dark:hover:bg-black/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux sites
            </Button>

            {/* Hero Header */}
            <div className="flex items-center gap-6">
              {/* Avatar avec glow effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center shadow-xl">
                  <Building className="h-12 w-12 text-primary" />
                </div>
              </div>

              {/* Title */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {site.name}
                  </h1>
                  <Badge variant="secondary" className="text-sm">
                    {siteTypeLabels[site.type]}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground text-lg">
                    Référence: {site.reference}
                  </p>
                  {site.address.city && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-muted-foreground">{site.address.city}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Icon */}
              <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30">
                <Edit className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content avec scroll */}
      <div
        className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20"
        data-form-container
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          <SiteForm mode="edit" initialData={site} />
        </div>
      </div>
    </div>
  );
}