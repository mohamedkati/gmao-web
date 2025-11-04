/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';

const TENANT_ID_KEY = 'tenant-id';
// const TENANT_SUBDOMAIN_KEY = 'tenant-subdomain';

/**
 * Récupère l'ID du tenant
 */
export function getTenantId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Essayer depuis les cookies d'abord
  let tenantId = Cookies.get(TENANT_ID_KEY);

  if (!tenantId) {
    // Essayer depuis le subdomain
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    if (parts.length >= 3 && !hostname.includes('localhost')) {
      tenantId = parts[0];
    }
  }

  return tenantId || process.env.NEXT_PUBLIC_DEFAULT_TENANT || null;
}

/**
 * Définit l'ID du tenant
 */
export function setTenantId(tenantId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.set(TENANT_ID_KEY, tenantId, {
    expires: 365, // 1 an
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

/**
 * Supprime l'ID du tenant
 */
export function clearTenantId(): void {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.remove(TENANT_ID_KEY);
}

/** 
 * Récupère le tenant depuis le serveur
 * (Utilisé dans les Server Components)
 */
export async function getTenantFromServer(): Promise<any> {
  // Cette fonction doit être appelée côté serveur
  // if (typeof window !== 'undefined') {
  //   // throw new Error('getTenantFromServer can only be called server-side'); TODO - GMAO
  // }

  try {
    // Ici, vous devriez récupérer le tenant depuis les headers de la requête
    // ou depuis une base de données
    
    // Pour l'instant, retourner un tenant par défaut
    return {
      id: process.env.NEXT_PUBLIC_DEFAULT_TENANT || 'default',
      name: 'Default Tenant',
      subdomain: 'default',
    };
  } catch (error) {
    console.error('[Tenant] Failed to get tenant from server:', error);
    return null;
  }
}

/**
 * Résout le tenant depuis différentes sources
 */
export function resolveTenant(
  subdomain?: string,
  path?: string,
  header?: string
): string | null {
  const tenantMode = process.env.NEXT_PUBLIC_TENANT_MODE || 'subdomain';

  switch (tenantMode) {
    case 'subdomain':
      return subdomain || null;
    
    case 'path':
      return path || null;
    
    case 'header':
      return header || null;
    
    default:
      return null;
  }
}

/**
 * Construit l'URL pour un tenant spécifique
 */
export function buildTenantUrl(tenantSubdomain: string, path: string = '/'): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const tenantMode = process.env.NEXT_PUBLIC_TENANT_MODE || 'subdomain';

  switch (tenantMode) {
    case 'subdomain': {
      const url = new URL(baseUrl);
      url.hostname = `${tenantSubdomain}.${url.hostname}`;
      url.pathname = path;
      return url.toString();
    }

    case 'path': {
      return `${baseUrl}/${tenantSubdomain}${path}`;
    }

    default:
      return `${baseUrl}${path}`;
  }
}

/**
 * Vérifie si un tenant est valide
 */
export async function validateTenant(tenantId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}/validate`
    );
    return response.ok;
  } catch (error) {
    console.error('[Tenant] Validation error:', error);
    return false;
  }
}