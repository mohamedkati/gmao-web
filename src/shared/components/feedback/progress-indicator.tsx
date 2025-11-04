import { Progress } from '@/shared/components/shadcnui/progress';
import { cn } from '@/shared/lib/utils/cn';

interface ProgressIndicatorProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * Indicateur de progression
 */
export function ProgressIndicator({
  value,
  label,
  showPercentage = true,
  size = 'md',
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <Progress value={value} className={sizeClasses[size]} />
    </div>
  );
}