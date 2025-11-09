import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  noPadding?: boolean;
  className?: string;
}

/**
 * Section de page avec titre et description
 */
export function Section({
  title,
  description,
  children,
  actions,
  noPadding = false,
  className,
}: SectionProps) {
  return (
    <section className={cn(!noPadding && 'py-6', className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="space-y-1">
            {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}