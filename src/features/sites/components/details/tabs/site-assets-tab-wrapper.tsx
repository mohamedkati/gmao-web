// src/features/sites/components/details/site-assets-tab-wrapper.tsx

"use client";

import { useState } from "react";
import { Site } from "../../../types/site.types";
import { Button } from "@/shared/components/shadcnui/button";
import { LayoutList, Network } from "lucide-react";
import { SiteAssetsTab } from "./site-assets-tab";
import { SiteAssetsTabHierarchical } from "./site-assets-hierarchical-tab";

interface SiteAssetsTabWrapperProps {
  site: Site;
}

export function SiteAssetsTabWrapper({ site }: SiteAssetsTabWrapperProps) {
  const [viewMode, setViewMode] = useState<"list" | "hierarchy">("list");

  return (
    <div className="space-y-4">
      {/* Toggle Vue */}
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 backdrop-blur-sm border">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <LayoutList className="h-4 w-4" />
            Vue Simple
          </Button>
          <Button
            variant={viewMode === "hierarchy" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("hierarchy")}
            className="gap-2"
          >
            <Network className="h-4 w-4" />
            Vue Hiérarchique
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <SiteAssetsTab site={site} />
      ) : (
        <SiteAssetsTabHierarchical site={site} />
      )}
    </div>
  );
}