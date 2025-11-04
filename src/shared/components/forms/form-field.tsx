import { ReactNode } from 'react';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils/cn';

interface FormFieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper pour les champs de formulaire avec label et erreur
 */
export function FormFieldWrapper({
  label,
  required,
  error,
  hint,
  children,
  className,
}: FormFieldWrapperProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="font-medium">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}