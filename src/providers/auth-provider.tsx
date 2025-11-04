'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { getUserFromToken, isTokenExpired } from '@/shared/lib/auth/token-manager';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider pour gérer l'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification au montage
    const checkAuth = async () => {
      try {
        // Vérifier si le token existe et n'est pas expiré
        if (isTokenExpired()) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Récupérer l'utilisateur depuis le token
        const user = getUserFromToken();
        
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('[Auth Provider] Error checking auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading, router]);

  return <>{children}</>;
}