import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Breadcrumb } from '@/shared/components/layout/breadcrumb';
import { WorkOrdersList } from '@/features/work-orders/components/work-order-list';

export const metadata = {
  title: 'Bons d\'intervention',
  description: 'Gérez vos interventions de maintenance',
};

export default function WorkOrdersPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Page Header */}
      <PageHeader
        title="Bons d'intervention"
        description="Gérez et suivez toutes vos interventions de maintenance"
      >
        <Button variant={'default'} asChild>
          <Link href="/work-orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle intervention
          </Link>
        </Button>
      </PageHeader>

      {/* Content */}
      <WorkOrdersList />
    </div>
  );
}