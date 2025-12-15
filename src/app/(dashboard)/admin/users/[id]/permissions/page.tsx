// src/app/(dashboard)/admin/users/[id]/permissions/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/shared/components/shadcnui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcnui/tabs";
import {
  useUserPermissions,
  useEffectiveUserPermissions,
  usePermissions,
} from "@/features/permissions/hooks/use-permissions";
import { UserPermissionsManager } from "@/features/permissions/components/user-permissions-manager";
import { EffectivePermissionsView } from "@/features/permissions/components/effective-permissions-view";

export default function UserPermissionsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: userPermissions, isLoading: isLoadingUser } = useUserPermissions(params.id);
  const { data: effectivePermissions, isLoading: isLoadingEffective } =
    useEffectiveUserPermissions(params.id);
  const { data: allPermissions } = usePermissions();

  if (isLoadingUser || isLoadingEffective) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const grantedOverrides = userPermissions?.filter((p) => p.isGranted) || [];
  const revokedOverrides = userPermissions?.filter((p) => !p.isGranted) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Permissions utilisateur
            </h1>
            <p className="text-muted-foreground">
              Gérer les permissions personnalisées de cet utilisateur
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions effectives</CardDescription>
            <CardTitle className="text-3xl">
              {effectivePermissions?.length || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions du rôle</CardDescription>
            <CardTitle className="text-3xl">
              {(effectivePermissions?.length || 0) -
                grantedOverrides.length +
                revokedOverrides.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions ajoutées</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              +{grantedOverrides.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Permissions retirées</CardDescription>
            <CardTitle className="text-3xl text-red-600">
              -{revokedOverrides.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="effective" className="w-full">
        <TabsList>
          <TabsTrigger value="effective">Permissions effectives</TabsTrigger>
          <TabsTrigger value="overrides">
            Personnalisations ({userPermissions?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="manage">Gérer</TabsTrigger>
        </TabsList>

        <TabsContent value="effective" className="mt-6">
          <EffectivePermissionsView
            permissions={allPermissions || []}
            effectiveCodes={effectivePermissions || []}
          />
        </TabsContent>

        <TabsContent value="overrides" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Permissions ajoutées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Permissions ajoutées
                </CardTitle>
                <CardDescription>
                  Permissions accordées en plus du rôle de base
                </CardDescription>
              </CardHeader>
              <CardContent>
                {grantedOverrides.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune permission ajoutée
                  </p>
                ) : (
                  <div className="space-y-2">
                    {grantedOverrides.map((override) => (
                      <div
                        key={override.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <div className="font-medium">
                            {override.permission.displayName}
                          </div>
                          <code className="text-xs text-muted-foreground">
                            {override.permission.code}
                          </code>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Ajoutée
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Permissions retirées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Minus className="h-5 w-5 text-red-600" />
                  Permissions retirées
                </CardTitle>
                <CardDescription>
                  Permissions révoquées malgré le rôle de base
                </CardDescription>
              </CardHeader>
              <CardContent>
                {revokedOverrides.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune permission retirée
                  </p>
                ) : (
                  <div className="space-y-2">
                    {revokedOverrides.map((override) => (
                      <div
                        key={override.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <div className="font-medium">
                            {override.permission.displayName}
                          </div>
                          <code className="text-xs text-muted-foreground">
                            {override.permission.code}
                          </code>
                        </div>
                        <Badge variant="outline" className="text-red-600">
                          Retirée
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <UserPermissionsManager
            userId={params.id}
            currentPermissions={effectivePermissions || []}
            allPermissions={allPermissions || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}