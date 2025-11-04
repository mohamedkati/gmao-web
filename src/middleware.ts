import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes publiques (pas besoin d'authentification)
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password'];

// Routes API à exclure du middleware
const apiRoutes = ['/api'];

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  console.log(request);
  console.log(apiRoutes);
  console.log(publicRoutes);
  
  // // Ignorer les routes API
  // if (apiRoutes.some((route) => pathname.startsWith(route))) {
  //   return NextResponse.next();
  // }

  // // Ignorer les fichiers statiques
  // if (
  //   pathname.startsWith('/_next') ||
  //   pathname.startsWith('/static') ||
  //   pathname.includes('.')
  // ) {
  //   return NextResponse.next();
  // }
  // const isPublicRoute = publicRoutes.includes(pathname);
  // if (isPublicRoute)
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // // Extraction du tenant
  // const tenant = extractTenant(request);

  // // Vérification de l'authentification
  // const token = request.cookies.get('auth-token')?.value;


  // // Redirect vers login si pas authentifié sur route privée
  // if (!isPublicRoute && !token) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Redirect vers dashboard si authentifié sur route publique
  // if (isPublicRoute && token && pathname !== '/') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // // Créer la réponse
  const response = NextResponse.next();

  // // Ajouter les headers custom
  // if (tenant) {
  //   response.headers.set('X-Tenant-Id', tenant.id);
  //   response.headers.set('X-Tenant-Subdomain', tenant.subdomain);
  // }

  // // Ajouter le token dans les headers si présent
  // if (token) {
  //   response.headers.set('X-Auth-Token', token);
  // }

  return response;
}

/**
 * Extrait les informations du tenant depuis la requête
 */
// function extractTenant(request: NextRequest): { id: string; subdomain: string } | null {
//   const tenantMode = process.env.NEXT_PUBLIC_TENANT_MODE || 'subdomain';
//   // const hostname = request.headers.get('host') || '';

//   switch (tenantMode) {
//     // case 'subdomain': {
//     //   // Extraction depuis sous-domaine : tenant1.app.com
//     //   const subdomain = extractSubdomainFromHostname(hostname);
//     //   if (subdomain) {
//     //     return {
//     //       id: subdomain, // Dans un vrai système, faire un lookup en DB
//     //       subdomain,
//     //     };
//     //   }
//     //   break;
//     // }

//     // case 'path': {
//     //   // Extraction depuis path : app.com/tenant1/dashboard
//     //   const pathParts = request.nextUrl.pathname.split('/').filter(Boolean);
//     //   if (pathParts.length > 0) {
//     //     const tenantSlug = pathParts[0];
//     //     return {
//     //       id: tenantSlug!,
//     //       subdomain: tenantSlug!,
//     //     };
//     //   }
//     //   break;
//     // }

//     case 'header': {
//       // Extraction depuis header : X-Tenant-Id
//       const tenantId = request.headers.get('X-Tenant-Id');
//       if (tenantId) {
//         return {
//           id: tenantId,
//           subdomain: tenantId,
//         };
//       }
//       break;
//     }
//   }

//   // Tenant par défaut si non trouvé
//   const defaultTenant = process.env.NEXT_PUBLIC_DEFAULT_TENANT;
//   if (defaultTenant) {
//     return {
//       id: defaultTenant,
//       subdomain: defaultTenant,
//     };
//   }

//   return null;
// }

/**
 * Extrait le sous-domaine depuis le hostname
 */
// function extractSubdomainFromHostname(hostname: string): string | null {
//   // Retirer le port si présent
//   const host = hostname.split(':')[0];
//   if(!host) return null;

//   const parts = host.split('.');

//   // localhost ou IP : pas de sous-domaine
//   if (parts.length < 3 || host.includes('localhost') || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
//     return null;
//   }

//   // Retourner le premier segment (sous-domaine)
//   return parts[0]!;
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};