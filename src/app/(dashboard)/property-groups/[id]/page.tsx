
"use client";

import { useRouter } from "next/navigation";
import { usePropertyGroup } from "@/features/property-groups/hooks/use-property-groups";
import { PropertyGroupDetailsPage } from "@/features/property-groups/components/property-group-details-page";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Button } from "@/shared/components/shadcnui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function PropertyGroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: propertyGroup, isLoading, error } = usePropertyGroup(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-7xl mx-auto p-6">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Skeleton className="h-[400px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !propertyGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-7xl mx-auto p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/property-groups")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-destructive/10 p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Groupe non trouvé</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Le groupe que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => router.push("/property-groups")}>
              Retour à la liste
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <PropertyGroupDetailsPage propertyGroup={propertyGroup} />;
}