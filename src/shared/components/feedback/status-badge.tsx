import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils/cn';
import { LucideIcon } from 'lucide-react';

type Status = 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
  status: Status;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

const statusConfig: Record<Status, { variant: string; className: string }> = {
  success: {
    variant: 'default',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-400',
  },
  warning: {
    variant: 'default',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400',
  },
  error: {
    variant: 'destructive',
    className: '',
  },
  info: {
    variant: 'default',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400',
  },
  pending: {
    variant: 'secondary',
    className: '',
  },
};

/**
 * Badge de statut coloré
 */
export function StatusBadge({ status, label, icon: Icon, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, 'gap-1', className)}>
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </Badge>
  );
}