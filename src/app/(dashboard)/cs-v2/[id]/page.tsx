// app/(protected)/customers/[id]/page.tsx
import { Suspense } from "react";
import { CustomerDetailContent } from "@/features/customers-v2/components/customer-detail-content";

interface CustomerDetailPageProps {
  params: {
    id: string;
  };
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerDetailContent customerId={params.id} />
    </Suspense>
  );
}