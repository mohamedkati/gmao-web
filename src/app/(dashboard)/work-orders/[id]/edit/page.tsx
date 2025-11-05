'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Breadcrumb } from '@/shared/components/layout/breadcrumb';
import { LoadingOverlay } from '@/shared/components/feedback/loading-overlay';
import { ErrorState } from '@/shared/components/feedback/error-state';
import { WorkOrderForm } from '@/features/work-orders/components/work-order-form';
import { useWorkOrder } from '@/features/work-orders/hooks/use-work-order';
import { useWorkOrderMutations } from '@/features/work-orders/hooks/use-work-order-mutations';
import type { CreateWorkOrderFormData } from '@/features/work-orders/schemas/work-order.schema';

interface EditWorkOrderPageProps {
    params: {
        id: string;
    };
}

export default async function EditWorkOrderPage(params: Promise<EditWorkOrderPageProps>) {
    const id = (await params).params.id;
    const { data: workOrder, isLoading, error, refetch } = useWorkOrder(id);
    const { update, isUpdating } = useWorkOrderMutations();

    const handleSubmit = (data: CreateWorkOrderFormData) => {
        update({ id: id, dto: data });
    };

    if (isLoading) {
        return <LoadingOverlay message="Chargement..." />;
    }

    if (error || !workOrder) {
        return (
            <ErrorState
                message="Impossible de charger l'intervention"
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Interventions', href: '/work-orders' },
                    { label: workOrder.title, href: `/work-orders/${id}` },
                    { label: 'Modifier', href: `/work-orders/${id}/edit` },
                ]}
            />

            {/* Page Header */}
            <PageHeader
                title="Modifier l'intervention"
                description={workOrder.title}
            >
                <Button variant="outline" asChild>
                    <Link href={`/work-orders/${id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Annuler
                    </Link>
                </Button>
            </PageHeader>

            {/* Form */}
            <WorkOrderForm
                defaultValues={{
                    title: workOrder.title,
                    description: workOrder.description,
                    priority: workOrder.priority,
                    assetId: workOrder.assetId,
                    technicianId: workOrder.technicianId,
                    customerId: workOrder.customerId,
                    scheduledDate: workOrder.scheduledDate
                        ? new Date(workOrder.scheduledDate)
                        : undefined,
                    estimatedDuration: workOrder.estimatedDuration,
                    notes: workOrder.notes,
                }}
                onSubmit={handleSubmit}
                isSubmitting={isUpdating}
                submitLabel="Enregistrer les modifications"
            />
        </div>
    );
}