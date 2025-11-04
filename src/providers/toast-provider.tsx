'use client';

import { Toaster } from 'sonner';

/**
 * Provider pour les toasts
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
      }}
      closeButton
      richColors
    />
  );
}