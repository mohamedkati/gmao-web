export async function register() {
  // S'exécute au démarrage de l'application
  
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Code côté serveur
    
    // Initialiser Sentry (si configuré)
    if (process.env.SENTRY_DSN) {
      const Sentry = await import('@sentry/nextjs');
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
        tracesSampleRate: 1.0,
      });
    }

    // Logger le démarrage
    console.log('[GMAO] Application démarrée');
    console.log('[GMAO] Environment:', process.env.NEXT_PUBLIC_APP_ENV);
    console.log('[GMAO] API URL:', process.env.NEXT_PUBLIC_API_URL);
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Code pour Edge Runtime
  }
}