import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
  ratio?: '1:1' | '2:1' | '1:2' | '3:1' | '1:3';
  sticky?: 'left' | 'right' | 'both' | 'none';
  className?: string;
}

const ratioClasses = {
  '1:1': 'lg:grid-cols-2',
  '2:1': 'lg:grid-cols-[2fr_1fr]',
  '1:2': 'lg:grid-cols-[1fr_2fr]',
  '3:1': 'lg:grid-cols-[3fr_1fr]',
  '1:3': 'lg:grid-cols-[1fr_3fr]',
};

/**
 * Layout en deux colonnes pour pages de détails
 */
export function SplitView({
  left,
  right,
  ratio = '2:1',
  sticky = 'none',
  className,
}: SplitViewProps) {
  return (
    <div className={cn('grid gap-6 lg:gap-8', ratioClasses[ratio], className)}>
      <div
        className={cn(
          (sticky === 'left' || sticky === 'both') && 'lg:sticky lg:top-20 lg:h-fit'
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          (sticky === 'right' || sticky === 'both') && 'lg:sticky lg:top-20 lg:h-fit'
        )}
      >
        {right}
      </div>
    </div>
  );
}