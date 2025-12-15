'use client';

import { ReactNode, useEffect } from 'react';
import { LoadingOverlay } from '@/shared/components';
import { useRequireAuth } from '@/shared/hooks/use-auth';
import { Skeleton } from '@/shared/components/shadcnui/skeleton';
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider pour gérer l'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  //  Protection automatique : redirige vers /login si non authentifié
  const { user, isLoading } = useRequireAuth("/login");
  // Skeleton pendant le chargement
  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Skeleton className="w-64 h-full" />
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-16 w-full" />
          <div className="flex-1 p-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading)
    return <LoadingOverlay message='Loading ...' />

  // Si pas de user après loading, null (redirection en cours)
  if (!user) {
    return null;
  }

  return <>
    {children}
  </>;
}

