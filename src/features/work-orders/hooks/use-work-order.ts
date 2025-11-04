

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/lib/api/query-client';
import { workOrdersService } from '../services/work-orders.service';

/**
 * Hook pour récupérer un work order spécifique
 */
export function useWorkOrder(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.WORK_ORDER(id),
    queryFn: () => workOrdersService.getById(id),
    enabled: !!id,
  });
}