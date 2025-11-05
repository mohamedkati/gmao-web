'use client';

import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { logout as logoutUtil } from '../lib/auth/auth-utils';
import { User } from '../types/user.types';

/**
 * Hook pour gérer l'authentification
 */
export function useAuth() {
    const { user, isAuthenticated, setUser, logout: storeLogout } = useAuthStore();

    const login = useCallback((user: User) => {
        console.log('login - useAuthHook - @shared/hooks ', user);

        setUser(user); // TODO - GMAO
    }, [setUser]);

    const logout = useCallback(async () => {
        storeLogout();
        await logoutUtil();
    }, [storeLogout]);

    const updateUser = useCallback((updates: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    }, [user, setUser]);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
    };
}