'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Breadcrumb } from '@/shared/components/layout/breadcrumb';
import { WorkOrderForm } from '@/features/work-orders/components/work-order-form';
import { useWorkOrderMutations } from '@/features/work-orders/hooks/use-work-order-mutations';
import type { CreateWorkOrderFormData } from '@/features/work-orders/schemas/work-order.schema';

export default function NewWorkOrderPage() {
//   const router = useRouter();
  const { create, isCreating } = useWorkOrderMutations();

  const handleSubmit = (data: CreateWorkOrderFormData) => {
    create(data);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Interventions', href: '/work-orders' },
          { label: 'Nouvelle', href: '/work-orders/new' },
        ]}
      />

      {/* Page Header */}
      <PageHeader
        title="Nouvelle intervention"
        description="Créez un nouveau bon d'intervention"
      >
        <Button variant="outline" asChild>
          <Link href="/work-orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
      </PageHeader>

      {/* Form */}
      <WorkOrderForm
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        submitLabel="Créer l'intervention"
      />
    </div>
  );
}