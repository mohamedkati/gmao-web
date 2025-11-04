import { WorkOrderStatus, WorkOrderPriority } from '../types/work-order.types';

export const WORK_ORDER_STATUS_LABELS: Record<WorkOrderStatus, string> = {
  [WorkOrderStatus.PENDING]: 'En attente',
  [WorkOrderStatus.SCHEDULED]: 'Planifiée',
  [WorkOrderStatus.IN_PROGRESS]: 'En cours',
  [WorkOrderStatus.COMPLETED]: 'Terminée',
  [WorkOrderStatus.CANCELLED]: 'Annulée',
};

export const WORK_ORDER_STATUS_COLORS: Record<WorkOrderStatus, string> = {
  [WorkOrderStatus.PENDING]: 'default',
  [WorkOrderStatus.SCHEDULED]: 'secondary',
  [WorkOrderStatus.IN_PROGRESS]: 'default',
  [WorkOrderStatus.COMPLETED]: 'success',
  [WorkOrderStatus.CANCELLED]: 'destructive',
};

export const WORK_ORDER_PRIORITY_LABELS: Record<WorkOrderPriority, string> = {
  [WorkOrderPriority.LOW]: 'Basse',
  [WorkOrderPriority.MEDIUM]: 'Moyenne',
  [WorkOrderPriority.HIGH]: 'Haute',
  [WorkOrderPriority.CRITICAL]: 'Critique',
};

export const WORK_ORDER_PRIORITY_COLORS: Record<WorkOrderPriority, string> = {
  [WorkOrderPriority.LOW]: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
  [WorkOrderPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
  [WorkOrderPriority.HIGH]: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400',
  [WorkOrderPriority.CRITICAL]: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
};