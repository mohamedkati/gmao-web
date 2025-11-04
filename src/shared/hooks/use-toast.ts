'use client';

import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Hook pour afficher des toasts
 */
export function useToast() {
  const toast = useCallback((variant: ToastVariant, options: ToastOptions) => {
    const { title, description, duration = 5000, action } = options;

    const message = title ? (
      `<div>
        <div className="font-semibold">${title}</div>
        ${(description && `<div className="text-sm">${description}</div>`)}
      </div>`
    ) : (
      description
    );

    switch (variant) {
      case 'success':
        sonnerToast.success(message, { duration, action });
        break;
      case 'error':
        sonnerToast.error(message, { duration, action });
        break;
      case 'warning':
        sonnerToast.warning(message, { duration, action });
        break;
      case 'info':
        sonnerToast.info(message, { duration, action });
        break;
      default:
        sonnerToast(message, { duration, action });
    }
  }, []);

  const success = useCallback(
    (options: ToastOptions) => toast('success', options),
    [toast]
  );

  const error = useCallback(
    (options: ToastOptions) => toast('error', options),
    [toast]
  );

  const warning = useCallback(
    (options: ToastOptions) => toast('warning', options),
    [toast]
  );

  const info = useCallback(
    (options: ToastOptions) => toast('info', options),
    [toast]
  );

  const dismiss = useCallback((toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  }, []);

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
  };
}