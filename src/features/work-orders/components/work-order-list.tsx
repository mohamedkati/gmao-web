'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Grid3x3, List } from 'lucide-react';
import { DataTable } from '@/shared/components/data-table/data-table';
import { SkeletonLoader } from '@/shared/components/feedback/skeleton-loader';
import { EmptyState } from '@/shared/components/feedback/empty-state';
import { ErrorState } from '@/shared/components/feedback/error-state';
import { ConfirmationDialog } from '@/shared/components/feedback/confirmation-dialog';
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/shadcnui/toggle-group';
import { useWorkOrders } from '../hooks/use-work-orders';
import { useWorkOrderMutations } from '../hooks/use-work-order-mutations';
import { getWorkOrderColumns } from './work-order-columns';
import { WorkOrderCard } from './work-order-card';
import type { WorkOrder } from '../types/work-order.types';

type ViewMode = 'table' | 'grid';

export function WorkOrdersList() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [workOrderToDelete, setWorkOrderToDelete] = useState<WorkOrder | null>(null);

  const { data: workOrders, isLoading, error, refetch } = useWorkOrders();
  const { delete: deleteWorkOrder } = useWorkOrderMutations();

  const handleView = (workOrder: WorkOrder) => {
    router.push(`/work-orders/${workOrder.id}`);
  };

  const handleEdit = (workOrder: WorkOrder) => {
    router.push(`/work-orders/${workOrder.id}/edit`);
  };

  const handleDelete = (workOrder: WorkOrder) => {
    setWorkOrderToDelete(workOrder);
  };

  const confirmDelete = () => {
    if (workOrderToDelete) {
      deleteWorkOrder(workOrderToDelete.id);
      setWorkOrderToDelete(null);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <SkeletonLoader
        type={viewMode === 'grid' ? 'card' : 'table'}
        count={viewMode === 'grid' ? 6 : 10}
      />
    );
  }

  // Error
  if (error) {
    return (
      <ErrorState
        message="Impossible de charger les interventions"
        onRetry={() => refetch()}
      />
    );
  }

  // Empty
  if (!workOrders || workOrders.length === 0) {
    return (
      <EmptyState
        icon={Plus}
        title="Aucune intervention"
        description="Commencez par créer votre première intervention"
        action={{
          label: 'Créer une intervention',
          onClick: () => router.push('/work-orders/new'),
        }}
      />
    );
  }

  const columns = getWorkOrderColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="space-y-4">
        {/* Header avec vue toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {workOrders.length} intervention(s)
          </div>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value as ViewMode)}
          >
            <ToggleGroupItem value="table" aria-label="Vue tableau">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Vue grille">
              <Grid3x3 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Vue tableau */}
        {viewMode === 'table' && (
          <DataTable
            columns={columns}
            data={workOrders}
            searchKey="title"
            searchPlaceholder="Rechercher une intervention..."
          />
        )}

        {/* Vue grille */}
        {viewMode === 'grid' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workOrders.map((workOrder) => (
              <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={!!workOrderToDelete}
        onOpenChange={(open) => !open && setWorkOrderToDelete(null)}
        title="Supprimer l'intervention ?"
        description={`Êtes-vous sûr de vouloir supprimer "${workOrderToDelete?.title}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  );
}