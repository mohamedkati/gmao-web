
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/shared/services/auth.service";
import { AuthUserTenant, LoginCredentials } from "@/shared/types/auth.types";
import { toast } from "sonner";
import { QUERY_KEYS } from "../lib/api/query-client";
import { useUserPermissions } from "./use-permissions";
import { permissionsPublicService } from "../services/permissions-public.service";
import { useEffect } from "react";
import { clearTokens, getAuthToken, setTokens } from "../lib/auth/token-manager";

// ===== QUERY KEYS =====

// ===== USER =====

/**
 * Hook pour récupérer l'utilisateur connecté
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error: any) => {
      //  Ne pas retry si 401 (non authentifié)
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true, //  Vérifier si toujours connecté au retour focus
  });
}

// ===== MUTATIONS =====

/**
 * Hook pour le login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: async (response) => {
      if (response.isSucceeded === true) {
        setTokens(response.data.token, "");
        const user: AuthUserTenant = { user: response.data.user, tenant: response.data.tenant };
        queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, user);

        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.PERMISSIONS,
          queryFn: () => permissionsPublicService.getMyPermissions()
        });
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.CONFIG,
          queryFn: () => permissionsPublicService.getConfig()
        });

        // Rediriger vers le dashboard
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur de connexion");
    },
  });
}

/**
 * Hook pour le logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Nettoyer tout le cache
      clearTokens();
      queryClient.clear();
      toast.success("Déconnexion réussie");

      // Rediriger vers login
      router.push("/login");
    },
    onError: (error: any) => {
      clearTokens();
      queryClient.clear();
      router.push("/login");
      toast.error(error.response?.data?.message || "Erreur de déconnexion");
    },
  });
}

// ===== HELPERS =====

/**
 * Hook pour obtenir les informations complètes d'auth
 */
export function useAuth() {
  const { data: user, isLoading: isLoadingUser, error } = useCurrentUser();
  const { data: permissions, isLoading: isLoadingPermissions } = useUserPermissions();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (error && (error as any).response?.status === 401) {
      console.log("test");
      router.push("/login");
    }
  }, [error, router]);
  return {
    // Données
    user,
    permissions: permissions?.permissions || [],
    permissionsByResource: permissions?.permissionsByResource || {},

    // États
    isLoading: isLoadingUser || isLoadingPermissions,
    isAuthenticated: !!user,

    // Actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}



// ===== Hook : Protéger une route =====
export function useRequireAuth(redirectTo = "/login") {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    //  Si pas loading et pas de user, rediriger
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return { user, isLoading };
}