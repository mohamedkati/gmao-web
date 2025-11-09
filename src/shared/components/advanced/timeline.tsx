import { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate } from '@/shared/lib/utils/date';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: Date | string;
  icon?: LucideIcon;
  color?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

/**
 * Timeline verticale pour afficher une chronologie
 */
export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {events.map((event, index) => {
        const Icon = event.icon;
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="relative flex gap-6">
            {/* Vertical Line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-px bg-border"></div>
            )}

            {/* Icon */}
            <div
              className={cn(
                'relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 bg-background',
                event.color || 'border-primary text-primary'
              )}
            >
              {Icon ? <Icon className="h-6 w-6" /> : <div className="h-3 w-3 rounded-full bg-current"></div>}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1 pt-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-semibold">{event.title}</h4>
                <time className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(event.date, 'PP')}
                </time>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}