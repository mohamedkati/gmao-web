import { clearTokens, setTokens } from '@/shared/lib/auth/token-manager';
import { Tenant } from '@/shared/types/tenant.types';
import { User } from '@/shared/types/user.types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tenant: Tenant | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  setTenant: (tenant: Tenant | null) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

/**
 * Store pour l'authentification
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: true,
      tenant: null,
      setToken(token, refreshToken) {
        setTokens(token, refreshToken);
      },
      // Actions
      setUser: (user) => {
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          });
          console.log("FROM SET USER - UseAuthStore", user);
      }
      ,

      setLoading: (loading) =>
        set({ isLoading: loading }),

      setTenant(tenant) {
        set({
          tenant: tenant
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          tenant: null
        });
        clearTokens();
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);