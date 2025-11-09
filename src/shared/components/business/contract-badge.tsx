import { FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate, formatRelativeDate } from '@/shared/lib/utils/date';

interface ContractBadgeProps {
  name: string;
  type: 'maintenance' | 'support' | 'full_service';
  status: 'active' | 'expiring_soon' | 'expired';
  startDate: Date | string;
  endDate: Date | string;
  value?: string;
  interventionsRemaining?: number;
  onClick?: () => void;
  className?: string;
}

const typeLabels = {
  maintenance: 'Maintenance',
  support: 'Support',
  full_service: 'Service complet',
};

const statusConfig = {
  active: {
    icon: CheckCircle,
    label: 'Actif',
    color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
  },
  expiring_soon: {
    icon: AlertCircle,
    label: 'Expire bientôt',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
  },
  expired: {
    icon: AlertCircle,
    label: 'Expiré',
    color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
  },
};

/**
 * Badge de contrat avec informations clés
 */
export function ContractBadge({
  name,
  type,
  status,
  startDate,
  endDate,
  value,
  interventionsRemaining,
  onClick,
  className,
}: ContractBadgeProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card
      className={cn(
        'hover:shadow-md transition-all duration-300 cursor-pointer group',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{typeLabels[type]}</p>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>

        {/* Status */}
        <Badge className={cn('gap-1', config.color)}>
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>

        {/* Dates */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDate(startDate, 'PP')} - {formatDate(endDate, 'PP')}
            </span>
          </div>
          <p className="text-muted-foreground pl-5">
            Expire {formatRelativeDate(endDate)}
          </p>
        </div>

        {/* Additional Info */}
        {(value || typeof interventionsRemaining === 'number') && (
          <div className="flex items-center justify-between pt-2 border-t text-xs">
            {value && (
              <span className="font-medium text-primary">{value}</span>
            )}
            {typeof interventionsRemaining === 'number' && (
              <span className="text-muted-foreground">
                {interventionsRemaining} intervention(s) restante(s)
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}