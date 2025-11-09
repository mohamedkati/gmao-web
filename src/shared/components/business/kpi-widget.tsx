import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils/cn';

interface KPIWidgetProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  description?: string;
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const colorConfig = {
  default: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    trend: 'text-primary',
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-950',
    icon: 'text-green-600 dark:text-green-400',
    trend: 'text-green-600 dark:text-green-400',
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-950',
    icon: 'text-yellow-600 dark:text-yellow-400',
    trend: 'text-yellow-600 dark:text-yellow-400',
  },
  danger: {
    bg: 'bg-red-100 dark:bg-red-950',
    icon: 'text-red-600 dark:text-red-400',
    trend: 'text-red-600 dark:text-red-400',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-950',
    icon: 'text-blue-600 dark:text-blue-400',
    trend: 'text-blue-600 dark:text-blue-400',
  },
};

/**
 * Widget KPI pour afficher des métriques importantes
 */
export function KPIWidget({
  title,
  value,
  icon: Icon,
  trend,
  description,
  color = 'default',
  className,
}: KPIWidgetProps) {
  const config = colorConfig[color];

  const TrendIcon =
    trend?.direction === 'up'
      ? TrendingUp
      : trend?.direction === 'down'
      ? TrendingDown
      : Minus;

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn('p-2 rounded-lg', config.bg)}>
            <Icon className={cn('h-4 w-4', config.icon)} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-3xl font-bold">{value}</div>

          {(trend || description) && (
            <div className="flex items-center gap-2 text-xs">
              {trend && (
                <span
                  className={cn(
                    'flex items-center gap-1 font-medium',
                    trend.direction === 'up' && 'text-green-600 dark:text-green-400',
                    trend.direction === 'down' && 'text-red-600 dark:text-red-400',
                    trend.direction === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  <TrendIcon className="h-3 w-3" />
                  {Math.abs(trend.value)}%
                </span>
              )}
              {(trend?.label || description) && (
                <span className="text-muted-foreground">
                  {trend?.label || description}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}