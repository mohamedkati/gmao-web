import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/shared/lib/utils/cn';

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

/**
 * Overlay de chargement pleine page ou conteneur
 */
export function LoadingOverlay({ message, className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <LoadingSpinner size="xl" />
      {message && (
        <p className="mt-4 text-sm text-muted-foreground font-medium">{message}</p>
      )}
    </div>
  );
}