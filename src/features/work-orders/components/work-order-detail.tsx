'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  Package,
  Building2,
  Edit,
  Trash2,
  Check,
  X,
  UserPlus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { LoadingOverlay } from '@/shared/components/feedback/loading-overlay';
import { ErrorState } from '@/shared/components/feedback/error-state';
import { ConfirmationDialog } from '@/shared/components/feedback/confirmation-dialog';
import { WorkOrderPriorityBadge } from './work-order-priority-badge';
import { StatusBadge } from '@/shared/components/feedback/status-badge';
import { formatDate, formatDuration, formatRelativeDate } from '@/shared/lib/utils/date';
import { useWorkOrder } from '../hooks/use-work-order';
import { useWorkOrderMutations } from '../hooks/use-work-order-mutations';
import { WORK_ORDER_STATUS_LABELS } from '../constants/work-order.constants';
import { WorkOrderStatus } from '../types/work-order.types';

interface WorkOrderDetailProps {
  id: string;
}

export function WorkOrderDetail({ id }: WorkOrderDetailProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: workOrder, isLoading, error, refetch } = useWorkOrder(id);
  const { delete: deleteWorkOrder, complete, cancel } = useWorkOrderMutations();

  if (isLoading) {
    return <LoadingOverlay message="Chargement de l'intervention..." />;
  }

  if (error || !workOrder) {
    return (
      <ErrorState
        message="Impossible de charger l'intervention"
        onRetry={() => refetch()}
      />
    );
  }

  const handleComplete = () => {
    complete(workOrder.id);
  };

  const handleCancel = () => {
    cancel(workOrder.id);
  };

  const handleDelete = () => {
    deleteWorkOrder(workOrder.id);
    router.push('/work-orders');
  };

  const canComplete = workOrder.status === WorkOrderStatus.IN_PROGRESS;
  const canCancel = ![WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELLED].includes(
    workOrder.status
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header avec actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{workOrder.title}</h1>
              <WorkOrderPriorityBadge priority={workOrder.priority} />
            </div>
            {workOrder.description && (
              <p className="text-muted-foreground">{workOrder.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Actions rapides */}
            {canComplete && (
              <Button onClick={handleComplete} className="gap-2">
                <Check className="h-4 w-4" />
                Terminer
              </Button>
            )}

            {/* Menu actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/work-orders/${id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                {canCancel && (
                  <DropdownMenuItem onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Annuler l'intervention
                  </DropdownMenuItem>
                )}
                <Separator className="my-1" />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Statut */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Statut</span>
                  <StatusBadge
                    status={workOrder.status === 'completed' ? 'success' : 'info'}
                    label={WORK_ORDER_STATUS_LABELS[workOrder.status]}
                  />
                </div>

                <Separator />

                {/* Équipement */}
                {workOrder.assetName && (
                  <>
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Équipement</p>
                        <p className="text-sm text-muted-foreground">
                          {workOrder.assetName}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Client */}
                {workOrder.customerName && (
                  <>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Client</p>
                        <p className="text-sm text-muted-foreground">
                          {workOrder.customerName}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Technicien */}
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Technicien</p>
                    <p className="text-sm text-muted-foreground">
                      {workOrder.technicianName || 'Non assigné'}
                    </p>
                  </div>
                  {!workOrder.technicianId && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Assigner
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Planification */}
            <Card>
              <CardHeader>
                <CardTitle>Planification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date planifiée */}
                {workOrder.scheduledDate && (
                  <>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Date planifiée</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(workOrder.scheduledDate, 'PPPp')}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Durée estimée */}
                {workOrder.estimatedDuration && (
                  <>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Durée estimée</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDuration(workOrder.estimatedDuration)}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Date de complétion */}
                {workOrder.completedDate && (
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Terminée le</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(workOrder.completedDate, 'PPPp')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            {workOrder.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{workOrder.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Créée</p>
                  <p className="font-medium">
                    {formatRelativeDate(workOrder.createdAt)}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Dernière mise à jour</p>
                  <p className="font-medium">
                    {formatRelativeDate(workOrder.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Replanifier
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Réassigner
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Historique
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Supprimer l'intervention ?"
        description={`Êtes-vous sûr de vouloir supprimer "${workOrder.title}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  );
}