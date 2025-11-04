/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const TOKEN_EXPIRY_KEY = 'token-expiry';

/**
 * Récupère le token d'authentification
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return Cookies.get(AUTH_TOKEN_KEY) || null;
}

/**
 * Récupère le refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return Cookies.get(REFRESH_TOKEN_KEY) || null;
}

/**
 * Stocke les tokens
 */
export function setTokens(accessToken: string, refreshToken: string, expiresIn?: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Calculer la date d'expiration
  const expiryDate = expiresIn 
    ? new Date(Date.now() + expiresIn * 1000) 
    : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h par défaut

  // Stocker les tokens dans les cookies (httpOnly serait mieux côté serveur)
  Cookies.set(AUTH_TOKEN_KEY, accessToken, {
    expires: expiryDate,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 30, // 30 jours
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  Cookies.set(TOKEN_EXPIRY_KEY, expiryDate.toISOString(), {
    expires: expiryDate,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

/**
 * Supprime tous les tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(TOKEN_EXPIRY_KEY);
}

/**
 * Vérifie si le token est expiré
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  const expiry = Cookies.get(TOKEN_EXPIRY_KEY);
  
  if (!expiry) {
    return true;
  }

  return new Date(expiry) < new Date();
}

/**
 * Rafraîchit le token d'accès
 */
export async function refreshToken(): Promise<string | null> {
  const refreshTokenValue = getRefreshToken();

  if (!refreshTokenValue) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshTokenValue,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    // Stocker les nouveaux tokens
    setTokens(data.accessToken, data.refreshToken, data.expiresIn);

    return data.accessToken;
  } catch (error) {
    console.error('[Token Manager] Refresh failed:', error);
    clearTokens();
    return null;
  }
}

/**
 * Décode un JWT (sans vérification de signature)
 */
export function decodeToken(token: string): any {
  try {
    if(!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url!.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('[Token Manager] Decode failed:', error);
    return null;
  }
}

/**
 * Récupère les informations utilisateur depuis le token
 */
export function getUserFromToken(): any {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }

  return decodeToken(token);
}