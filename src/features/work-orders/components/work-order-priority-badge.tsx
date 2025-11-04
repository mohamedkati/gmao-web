import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils/cn';
import { WorkOrderPriority } from '../types/work-order.types';
import {
  WORK_ORDER_PRIORITY_LABELS,
  WORK_ORDER_PRIORITY_COLORS,
} from '../constants/work-order.constants';

interface WorkOrderPriorityBadgeProps {
  priority: WorkOrderPriority;
  className?: string;
}

export function WorkOrderPriorityBadge({
  priority,
  className,
}: WorkOrderPriorityBadgeProps) {
  return (
    <Badge
      className={cn(
        WORK_ORDER_PRIORITY_COLORS[priority],
        'font-medium',
        className
      )}
    >
      {WORK_ORDER_PRIORITY_LABELS[priority]}
    </Badge>
  );
}