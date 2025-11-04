import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/lib/api/query-client';
import { workOrdersService } from '../services/work-orders.service';

/**
 * Hook pour récupérer tous les work orders
 */
export function useWorkOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.WORK_ORDERS,
    queryFn: workOrdersService.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook pour récupérer les work orders par statut
 */
export function useWorkOrdersByStatus(status: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORK_ORDERS, 'status', status],
    queryFn: () => workOrdersService.getByStatus(status),
    enabled: !!status,
  });
}