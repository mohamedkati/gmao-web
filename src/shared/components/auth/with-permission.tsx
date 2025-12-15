"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/shared/hooks/use-auth";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
import { AlertTriangle } from "lucide-react";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import { usePermission } from "@/shared/hooks/use-permissions";

interface WithPermissionOptions {
  resource: string;
  action: string;
  redirectTo?: string;
  showError?: boolean;
}

/**
 * HOC pour protéger une page avec une permission
 * Usage: export default withPermission(MyPage, { resource: "customers", action: "view" })
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  options: WithPermissionOptions
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const { data: user, isLoading: isLoadingUser } = useCurrentUser();
    const hasPermission = usePermission(options.resource, options.action);

    useEffect(() => {
      if (!isLoadingUser && !user && options.redirectTo) {
        router.push(options.redirectTo);
      }
    }, [isLoadingUser, user, router]);

    // Loading state
    if (isLoadingUser) {
      return (
        <div className="flex flex-col gap-6 p-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      );
    }

    // Not authenticated
    if (!user) {
      return null; // Redirection en cours
    }

    // No permission
    if (!hasPermission) {
      if (options.showError !== false) {
        return (
          <div className="container max-w-2xl mx-auto p-6 mt-12">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                <br />
                <span className="text-xs">
                  Permission requise : {options.resource}:{options.action}
                </span>
              </AlertDescription>
            </Alert>
          </div>
        );
      }
      return null;
    }

    return <Component {...props} />;
  };
}