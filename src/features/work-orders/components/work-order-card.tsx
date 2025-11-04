import Link from 'next/link';
import { Calendar, Clock, User, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { WorkOrderPriorityBadge } from './work-order-priority-badge';
import { StatusBadge } from '@/shared/components/feedback/status-badge';
import { formatDate, formatDuration } from '@/shared/lib/utils/date';
import type { WorkOrder } from '../types/work-order.types';
import { WORK_ORDER_STATUS_LABELS } from '../constants/work-order.constants';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
}

export function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{workOrder.title}</CardTitle>
          <WorkOrderPriorityBadge priority={workOrder.priority} />
        </div>
        {workOrder.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {workOrder.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Statut */}
        <div className="flex items-center gap-2">
          <StatusBadge
            status={workOrder.status === 'completed' ? 'success' : 'info'}
            label={WORK_ORDER_STATUS_LABELS[workOrder.status]}
          />
        </div>

        {/* Équipement */}
        {workOrder.assetName && (
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{workOrder.assetName}</span>
          </div>
        )}

        {/* Technicien */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className={!workOrder.technicianName ? 'italic text-muted-foreground' : ''}>
            {workOrder.technicianName || 'Non assigné'}
          </span>
        </div>

        {/* Date planifiée */}
        {workOrder.scheduledDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(workOrder.scheduledDate, 'PPP')}</span>
          </div>
        )}

        {/* Durée estimée */}
        {workOrder.estimatedDuration && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDuration(workOrder.estimatedDuration)}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/work-orders/${workOrder.id}`}>
            Voir les détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}