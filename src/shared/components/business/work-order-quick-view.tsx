import { Calendar, User, Package, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate, formatDuration } from '@/shared/lib/utils/date';

interface WorkOrderQuickViewProps {
  workOrder: {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    assetName?: string;
    technicianName?: string;
    location?: string;
    scheduledDate?: Date | string;
    estimatedDuration?: number;
  };
  onView?: () => void;
  onEdit?: () => void;
  className?: string;
}

/**
 * Vue rapide d'un bon d'intervention (pour popover/modal)
 */
export function WorkOrderQuickView({
  workOrder,
  onView,
  onEdit,
  className,
}: WorkOrderQuickViewProps) {
  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-base leading-tight">{workOrder.title}</h3>
          {workOrder.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {workOrder.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="outline">{workOrder.status}</Badge>
            <Badge>{workOrder.priority}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <Separator />

        {/* Asset */}
        {workOrder.assetName && (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{workOrder.assetName}</span>
          </div>
        )}

        {/* Technician */}
        {workOrder.technicianName && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{workOrder.technicianName}</span>
          </div>
        )}

        {/* Location */}
        {workOrder.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{workOrder.location}</span>
          </div>
        )}

        {/* Scheduled Date */}
        {workOrder.scheduledDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{formatDate(workOrder.scheduledDate, 'PPp')}</span>
          </div>
        )}

        {/* Duration */}
        {workOrder.estimatedDuration && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>Durée estimée : {formatDuration(workOrder.estimatedDuration)}</span>
          </div>
        )}
      </CardContent>

      {(onView || onEdit) && (
        <CardFooter className="border-t pt-4 gap-2">
          {onView && (
            <Button variant="outline" className="flex-1" onClick={onView}>
              Voir détails
            </Button>
          )}
          {onEdit && (
            <Button className="flex-1" onClick={onEdit}>
              Modifier
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}