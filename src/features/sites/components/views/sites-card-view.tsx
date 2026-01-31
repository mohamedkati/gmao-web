// src/features/sites/components/sites-cards-view.tsx

"use client";

import { Site } from "../../types/site.types";
import { SiteCard } from "../cards/site-card";
import { Building } from "lucide-react";

interface SitesCardsViewProps {
  sites: Site[];
  isLoading?: boolean;
}

export function SitesCardsView({ sites, isLoading }: SitesCardsViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
          <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <Building className="h-12 w-12 text-primary/50" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Aucun site trouvé</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Aucun site ne correspond à vos critères de recherche. Essayez de modifier
          vos filtres ou créez un nouveau site.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}

// Skeleton Card
function SkeletonCard() {
  return (
    <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 rounded-lg bg-muted" />
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-3/4 mb-2" />
            <div className="flex gap-2">
              <div className="h-4 bg-muted rounded w-20" />
              <div className="h-4 bg-muted rounded w-24" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
      
      <div className="h-px bg-muted my-4" />
      
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center">
            <div className="h-8 bg-muted rounded mx-auto mb-1" />
            <div className="h-3 bg-muted rounded w-12 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}