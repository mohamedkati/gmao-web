
"use client";

import { useRouter } from "next/navigation";
import { SiteForm } from "@/features/sites/components";
import { Button } from "@/shared/components/shadcnui/button";
import { ArrowLeft, Building, Sparkles } from "lucide-react";

export default function NewSitePage() {
  const router = useRouter();

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
        <div className="absolute bottom-20 left-40 animate-pulse delay-700">
          <Sparkles className="h-5 w-5 text-blue-500/20" />
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
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Nouveau site
                </h1>
                <p className="text-muted-foreground text-lg">
                  Créez un nouveau site de maintenance
                </p>
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
          <SiteForm mode="create" />
        </div>
      </div>
    </div>
  );
}