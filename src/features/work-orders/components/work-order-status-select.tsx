import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';
import { WorkOrderStatus } from '../types/work-order.types';
import { WORK_ORDER_STATUS_LABELS } from '../constants/work-order.constants';

interface WorkOrderStatusSelectProps {
  value: WorkOrderStatus;
  onValueChange: (value: WorkOrderStatus) => void;
  disabled?: boolean;
}

export function WorkOrderStatusSelect({
  value,
  onValueChange,
  disabled = false,
}: WorkOrderStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as WorkOrderStatus)}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(WORK_ORDER_STATUS_LABELS).map(([status, label]) => (
          <SelectItem key={status} value={status}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}