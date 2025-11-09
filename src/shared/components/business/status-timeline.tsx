import { Check, Clock, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate, formatRelativeDate } from '@/shared/lib/utils/date';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  timestamp: Date | string;
  user?: string;
}

interface StatusTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const statusConfig = {
  completed: {
    icon: Check,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-950',
    borderColor: 'border-green-300 dark:border-green-800',
  },
  in_progress: {
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
    borderColor: 'border-blue-300 dark:border-blue-800',
  },
  pending: {
    icon: AlertCircle,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
    borderColor: 'border-yellow-300 dark:border-yellow-800',
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-950',
    borderColor: 'border-red-300 dark:border-red-800',
  },
};

/**
 * Timeline de statut pour suivre l'évolution des interventions
 */
export function StatusTimeline({ events, className }: StatusTimelineProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {events.map((event, index) => {
        const config = statusConfig[event.status];
        const Icon = config.icon;
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border"></div>
            )}

            <div className="flex gap-4">
              {/* Icon */}
              <div
                className={cn(
                  'relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2',
                  config.bgColor,
                  config.borderColor
                )}
              >
                <Icon className={cn('h-6 w-6', config.color)} />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1 pb-8">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold">{event.title}</h4>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatRelativeDate(event.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(event.timestamp, 'PPp')}</span>
                  {event.user && (
                    <>
                      <span>•</span>
                      <span>{event.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}