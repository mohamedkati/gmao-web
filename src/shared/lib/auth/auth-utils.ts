/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken, getUserFromToken } from './token-manager';

/**
 * Vérifie si l'utilisateur est authentifié
 */
export function isAuthenticated(): boolean {
    return !!getAuthToken();
}

/**
 * Récupère l'utilisateur actuel
 */
export function getCurrentUser(): any | null {
    return getUserFromToken();
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export function hasRole(role: string): boolean {
    const user = getCurrentUser();
    return user?.role === role;
}

/**
 * Vérifie si l'utilisateur a une permission
 */
export function hasPermission(permission: string): boolean {
    const user = getCurrentUser();
    return user?.permissions?.includes(permission) ?? false;
}

/**
 * Vérifie si l'utilisateur a toutes les permissions
 */
export function hasAllPermissions(permissions: string[]): boolean {
    const user = getCurrentUser();
    return permissions.every((permission) =>
        user?.permissions?.includes(permission)
    );
}

/**
 * Vérifie si l'utilisateur a au moins une permission
 */
export function hasAnyPermission(permissions: string[]): boolean {
    const user = getCurrentUser();
    return permissions.some((permission) =>
        user?.permissions?.includes(permission)
    );
}

/**
 * Récupère le tenant ID de l'utilisateur
 */
export function getUserTenantId(): string | null {
    const user = getCurrentUser();
    return user?.tenantId || null;
}

/**
 * Redirige vers la page de login
 */
export function redirectToLogin(returnUrl?: string): void {
    if (typeof window !== 'undefined') {
        const url = returnUrl
            ? `/login?redirect=${encodeURIComponent(returnUrl)}`
            : '/login';

        window.location.href = url;
    }
}

/**
 * Déconnexion
 */
export async function logout(): Promise<void> {
    try {
        // Appeler l'API de logout
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            }
        });
    } catch (error) {
        console.error('[Auth] Logout error:', error);
    } finally {
        // Supprimer les tokens localement
        const { clearTokens } = await import('./token-manager');
        clearTokens();

        // Rediriger vers la page de login
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }
}