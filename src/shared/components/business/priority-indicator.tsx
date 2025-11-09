import { AlertCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';

type Priority = 'low' | 'medium' | 'high' | 'critical';

interface PriorityIndicatorProps {
  priority: Priority;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const priorityConfig = {
  low: {
    icon: Info,
    label: 'Basse',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  medium: {
    icon: AlertCircle,
    label: 'Moyenne',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
  },
  high: {
    icon: AlertTriangle,
    label: 'Haute',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
  },
  critical: {
    icon: Zap,
    label: 'Critique',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-950',
  },
};

const sizeConfig = {
  sm: {
    icon: 'h-3 w-3',
    text: 'text-xs',
    padding: 'px-2 py-1',
  },
  md: {
    icon: 'h-4 w-4',
    text: 'text-sm',
    padding: 'px-2.5 py-1.5',
  },
  lg: {
    icon: 'h-5 w-5',
    text: 'text-base',
    padding: 'px-3 py-2',
  },
};

/**
 * Indicateur de priorité avec icône et label
 */
export function PriorityIndicator({
  priority,
  showLabel = true,
  size = 'md',
  className,
}: PriorityIndicatorProps) {
  const config = priorityConfig[priority];
  const sizeConf = sizeConfig[size];
  const Icon = config.icon;

  if (showLabel) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          config.bgColor,
          config.color,
          sizeConf.padding,
          sizeConf.text,
          className
        )}
      >
        <Icon className={sizeConf.icon} />
        <span>{config.label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        config.bgColor,
        config.color,
        size === 'sm' && 'h-6 w-6',
        size === 'md' && 'h-8 w-8',
        size === 'lg' && 'h-10 w-10',
        className
      )}
    >
      <Icon className={sizeConf.icon} />
    </div>
  );
}