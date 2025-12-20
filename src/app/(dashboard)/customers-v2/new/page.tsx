// src/app/(dashboard)/customers/new/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/shadcnui/button";
import { ChevronLeft, Sparkles } from "lucide-react";
import { CustomerForm } from "@/features/customers-v2/components/customer-form";
import { cn } from "@/shared/lib/utils/cn";

export default function NewCustomerPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      {/* Header Hero */}
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
            onClick={() => router.back()}
            className={"mb-6 -ml-2 backdrop-blur-sm hover:bg-primary/10 hover:text-primary/70 transition-colors"}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux clients
          </Button>

          {/* Header content */}
          <div className="flex items-center gap-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-full blur-2xl animate-pulse" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary via-primary to-primary/60 flex items-center justify-center shadow-2xl border-4 border-white/20">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Nouveau client
              </h1>
              <p className="text-muted-foreground">
                Créez un nouveau client en remplissant les informations ci-dessous
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/20" data-form-container>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <CustomerForm mode="create" />
        </div>
      </div>
    </div>
  );
}