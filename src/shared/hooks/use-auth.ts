'use client';

import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { logout as logoutUtil } from '../lib/auth/auth-utils';
import { User } from '../types/user.types';

/**
 * Hook pour gérer l'authentification
 */
export function useAuth() {
    const { user, isAuthenticated, setUser, logout: storeLogout, setToken } = useAuthStore();

    const login = useCallback((user: User) => {
        setUser(user);
    }, [setUser]);

    const authenticate = useCallback((token: string, refreshToken: string) => {
        // setLoading(true);
        setToken(token, refreshToken);
    }, [setToken]);
    // const getCurrentUser = useCallback(() => {
    //     // AuthService.getCurrentUserByToken()
    //     //     .then(res => res.data)
    //     //     .then((res: ApiResponse<AuthUserTenant>) => {
    //     //         setUser(res.data.user);
    //     //         setTenant(res.data.tenant);// TODO just one must be set. because user is not going to be user and tenant at the same time. mohim, to see this after.
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(err, "FROM useAuth(), GetCurrentUser mathod");
    //     //     });
    // }, []);
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
        authenticate,
        // getCurrentUser,
    };
}