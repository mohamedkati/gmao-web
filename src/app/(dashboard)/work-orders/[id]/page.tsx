import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Breadcrumb } from '@/shared/components/layout/breadcrumb';
import { WorkOrderDetail } from '@/features/work-orders/components/work-order-detail';

interface WorkOrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function WorkOrderDetailPage(params: Promise<WorkOrderDetailPageProps>) {
    const id = (await params).params.id;
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Interventions', href: '/work-orders' },
          { label: 'Détails', href: `/work-orders/${id}` },
        ]}
      />

      {/* Back button */}
      <Button variant="outline" asChild size="sm">
        <Link href="/work-orders">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux interventions
        </Link>
      </Button>

      {/* Content */}
      <WorkOrderDetail id={id} />
    </div>
  );
}