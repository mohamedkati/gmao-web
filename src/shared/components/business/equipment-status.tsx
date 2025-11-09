import { Activity, AlertTriangle, CheckCircle2, Power, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/shadcnui/progress';
import { cn } from '@/shared/lib/utils/cn';

interface EquipmentStatusProps {
  name: string;
  status: 'operational' | 'warning' | 'critical' | 'offline';
  health: number; // 0-100
  uptime: string;
  lastCheck?: Date | string;
  metrics?: {
    label: string;
    value: string;
    status?: 'good' | 'warning' | 'critical';
  }[];
  className?: string;
}

const statusConfig = {
  operational: {
    icon: CheckCircle2,
    label: 'Opérationnel',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-950',
    borderColor: 'border-green-300 dark:border-green-800',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Attention',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
    borderColor: 'border-yellow-300 dark:border-yellow-800',
  },
  critical: {
    icon: XCircle,
    label: 'Critique',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-950',
    borderColor: 'border-red-300 dark:border-red-800',
  },
  offline: {
    icon: Power,
    label: 'Hors ligne',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-950',
    borderColor: 'border-gray-300 dark:border-gray-800',
  },
};

/**
 * Widget d'état d'équipement en temps réel
 */
export function EquipmentStatus({
  name,
  status,
  health,
  uptime,
  lastCheck,
  metrics,
  className,
}: EquipmentStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const getHealthColor = () => {
    if (health >= 80) return 'bg-green-500';
    if (health >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMetricColor = (metricStatus?: string) => {
    if (!metricStatus) return 'text-foreground';
    if (metricStatus === 'good') return 'text-green-600 dark:text-green-400';
    if (metricStatus === 'warning') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{name}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>Uptime: {uptime}</span>
            </div>
          </div>
          <div className={cn('p-2 rounded-lg', config.bgColor)}>
            <Icon className={cn('h-5 w-5', config.color)} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Badge */}
        <Badge className={cn(config.bgColor, config.color, 'font-medium')}>
          {config.label}
        </Badge>

        {/* Health Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Santé globale</span>
            <span className="font-medium">{health}%</span>
          </div>
          <Progress value={health} className="h-2"  />
        </div>

        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className={cn('text-sm font-semibold', getMetricColor(metric.status))}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Last Check */}
        {lastCheck && (
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Dernière vérification: {new Date(lastCheck).toLocaleString('fr-FR')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}