/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from 'next/headers';

/**
 * Résout le tenant côté serveur
 * (À utiliser dans les Server Components et API Routes)
 */
export async function resolveTenantServer(): Promise<string | null> {
  const headersList = headers();
  const tenantMode = process.env.NEXT_PUBLIC_TENANT_MODE || 'subdomain';

  switch (tenantMode) {
    // case 'subdomain': {
        
    //   const host = (await headersList).get('host') || '';
    //   const subdomain = extractSubdomain(host);
    //   return subdomain;
    // }

    case 'header': {
      return (await headersList).get('X-Tenant-Id');
    }

    case 'path': {
      // Le path sera extrait par le middleware
      return (await headersList).get('X-Tenant-Id');
    }

    default:
      return null;
  }
}

/**
 * Extrait le sous-domaine depuis un hostname
 */
// function extractSubdomain(hostname: string): string | null {
//   // Retirer le port si présent
//   const host = hostname.split(':')[0];
//   const parts = host!.split('.');

//   // localhost ou IP : pas de sous-domaine
//   if (parts.length < 3 || host!.includes('localhost') || /^\d+\.\d+\.\d+\.\d+$/.test(host!)) {
//     return process.env.NEXT_PUBLIC_DEFAULT_TENANT || null;
//   }

//   // Retourner le premier segment
//   return parts[0]!;
// }

/**
 * Charge les informations complètes du tenant
 */
export async function loadTenantInfo(tenantId: string): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}`,
      {
        next: { revalidate: 3600 }, // Cache 1h
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to load tenant: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Tenant Resolver] Failed to load tenant info:', error);
    
    // Retourner un tenant par défaut
    return {
      id: tenantId,
      name: tenantId,
      subdomain: tenantId,
    };
  }
}