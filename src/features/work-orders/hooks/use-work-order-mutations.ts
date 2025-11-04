import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QUERY_KEYS } from '@/shared/lib/api/query-client';
import { workOrdersService } from '../services/work-orders.service';
import { useToast } from '@/shared/hooks/use-toast';
import type { CreateWorkOrderDto, UpdateWorkOrderDto, WorkOrder } from '../types/work-order.types';

/**
 * Hook pour les mutations de work orders
 */
export function useWorkOrderMutations() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {success,error: showError} = useToast();

  // Créer
  const createMutation = useMutation({
    mutationFn: (dto: CreateWorkOrderDto) => workOrdersService.create(dto),
    onSuccess: (newWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
      success({
        title: 'Succès',
        description: 'Bon d\'intervention créé avec succès',
      });
      router.push(`/work-orders/${newWorkOrder.id}`);
    },
    onError: (err: any) => {
      showError({
        title: 'Erreur',
        description: err.message || 'Impossible de créer le bon d\'intervention',
      });
    },
  });

  // Mettre à jour
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateWorkOrderDto }) =>
      workOrdersService.update(id, dto),
    onSuccess: (updatedWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDER(updatedWorkOrder.id) });
      success({
        title: 'Succès',
        description: 'Bon d\'intervention mis à jour',
      });
    },
    onError: (err: any) => {
      showError({
        title: 'Erreur',
        description: err.message || 'Impossible de mettre à jour',
      });
    },
  });

  // Supprimer
  const deleteMutation = useMutation({
    mutationFn: (id: string) => workOrdersService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });

      const previousWorkOrders = queryClient.getQueryData<WorkOrder[]>(QUERY_KEYS.WORK_ORDERS);

      queryClient.setQueryData<WorkOrder[]>(QUERY_KEYS.WORK_ORDERS, (old = []) =>
        old.filter((wo) => wo.id !== id)
      );

      return { previousWorkOrders };
    },
    onError: (err, id, context) => {
        console.log(err,id);
        
      queryClient.setQueryData(QUERY_KEYS.WORK_ORDERS, context?.previousWorkOrders);
      showError({
        title: 'Erreur',
        description: 'Impossible de supprimer le bon d\'intervention',
      });
    },
    onSuccess: () => {
      success({
        title: 'Succès',
        description: 'Bon d\'intervention supprimé',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
    },
  });

  // Assigner
  const assignMutation = useMutation({
    mutationFn: ({ id, technicianId }: { id: string; technicianId: string }) =>
      workOrdersService.assign(id, technicianId),
    onSuccess: (updatedWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDER(updatedWorkOrder.id) });
      success({
        title: 'Succès',
        description: 'Technicien assigné',
      });
    },
  });

  // Compléter
  const completeMutation = useMutation({
    mutationFn: (id: string) => workOrdersService.complete(id),
    onSuccess: (updatedWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDER(updatedWorkOrder.id) });
      success({
        title: 'Succès',
        description: 'Intervention terminée',
      });
    },
  });

  // Annuler
  const cancelMutation = useMutation({
    mutationFn: (id: string) => workOrdersService.cancel(id),
    onSuccess: (updatedWorkOrder) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDERS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORK_ORDER(updatedWorkOrder.id) });
      success({
        title: 'Succès',
        description: 'Intervention annulée',
      });
    },
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    assign: assignMutation.mutate,
    complete: completeMutation.mutate,
    cancel: cancelMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}