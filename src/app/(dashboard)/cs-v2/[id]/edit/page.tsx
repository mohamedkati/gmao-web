// app/(protected)/customers/[id]/edit/page.tsx
import { Suspense } from "react";
import { CustomerEditContent } from "@/features/customers-v2/components/CustomerEditContent";

interface CustomerEditPageProps {
  params: {
    id: string;
  };
}

export default function CustomerEditPage({ params }: CustomerEditPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerEditContent customerId={params.id} />
    </Suspense>
  );
}