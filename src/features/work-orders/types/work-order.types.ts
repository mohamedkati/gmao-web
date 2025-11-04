export enum WorkOrderStatus {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum WorkOrderPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface WorkOrder {
  id: string;
  title: string;
  description?: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assetId: string;
  assetName?: string;
  technicianId?: string;
  technicianName?: string;
  customerId: string;
  customerName?: string;
  scheduledDate?: Date | string;
  completedDate?: Date | string;
  estimatedDuration?: number; // en minutes
  actualDuration?: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  tenantId: string;
}

export interface CreateWorkOrderDto {
  title: string;
  description?: string;
  priority: WorkOrderPriority;
  assetId: string;
  technicianId?: string;
  customerId: string;
  scheduledDate?: Date;
  estimatedDuration?: number;
  notes?: string;
}

export interface UpdateWorkOrderDto extends Partial<CreateWorkOrderDto> {
  status?: WorkOrderStatus;
  completedDate?: Date;
  actualDuration?: number;
}