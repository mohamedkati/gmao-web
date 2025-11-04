import '@/styles/globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/providers/app-providers';
// import { getTenantFromServer } from '@/shared/lib/tenant/tenant-utils';
import { ThemeProvider } from '@/providers/theme-provider';

// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})
// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap',
// });

// const outfit = Outfit({
//   subsets: ['latin'],
//   variable: '--font-outfit',
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: {
    default: 'GMAO Pro',
    template: '%s | GMAO Pro',
  },
  description: 'Gestion de Maintenance Assistée par Ordinateur',
  keywords: ['GMAO', 'maintenance', 'gestion'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupérer le tenant côté serveur
  // const tenant = await getTenantFromServer();

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${manrope.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <AppProviders initialTenant={undefined}>
              {children}
          </AppProviders>
        </ThemeProvider>

      </body>
    </html>
  );
}
