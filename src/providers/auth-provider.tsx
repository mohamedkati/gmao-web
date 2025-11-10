'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/features/auth/services/auth.service';
import { isAuthenticated, logout } from '@/shared/lib/auth/auth-utils';
import { LoadingOverlay } from '@/shared/components';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider pour gérer l'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, isLoading } = useAuthStore();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    // Vérifier l'authentification au montage
    const checkAuth = async () => {
      try {
        // Vérifier si le token existe et n'est pas expiré
        // TODO
        // if (isTokenExpired()) {
        //   setUser(null);
        //   setLoading(false);
        //   return;
        // }

        // Récupérer l'utilisateur depuis le token
        // const user = getUserFromToken();
        if (isAuthenticated()) {
          const user = await AuthService.getCurrentUserByToken();
          if (user.isSucceeded) {
            setUser(user.data.user);

          } else {
            setUser(null);
            logout();
          }
        }

      } catch (error) {
        console.error('[Auth Provider] Error checking auth:', error);
        setUser(null);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading, router]);

   if(isLoading)
    return <LoadingOverlay message='Loading ...' />
  return <>
    {children}
  </>;
}