import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcnui/alert';
import { cn } from '@/shared/lib/utils/cn';

interface SuccessMessageProps {
  title?: string;
  message: string;
  className?: string;
}

/**
 * Message de succès
 */
export function SuccessMessage({
  title = 'Succès',
  message,
  className,
}: SuccessMessageProps) {
  return (
    <Alert
      variant="default"
      className={cn('border-green-500 bg-green-50 dark:bg-green-950', className)}
    >
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-900 dark:text-green-100">{title}</AlertTitle>
      <AlertDescription className="text-green-800 dark:text-green-200">
        {message}
      </AlertDescription>
    </Alert>
  );
}