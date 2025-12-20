
"use client";

import { useParams, useRouter } from "next/navigation";
import { useCustomer } from "@/features/customers-v2/hooks/user-customers.query";
import { Button } from "@/shared/components/shadcnui/button";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";
import {
    AlertCircle,
} from "lucide-react";
import { CustomerDetailsPage } from "@/features/customers-v2/components/detail/customer-details-page";

export default function CustomerPage() {
    const params = useParams();
    const router = useRouter();
    const customerId = params.id as string;
    const { data: customer, isLoading, error } = useCustomer(customerId);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="border-b p-6">
                    <div className="max-w-7xl mx-auto">
                        <Skeleton className="h-8 w-32 mb-6" />
                        <div className="flex items-start gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-10 w-96" />
                                <Skeleton className="h-6 w-64" />
                            </div>
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto space-y-4">
                        <Skeleton className="h-64 w-full rounded-xl" />
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !customer) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                    <div className="rounded-full bg-destructive/10 p-6 inline-flex mb-4">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Client introuvable</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Le client que vous recherchez n'existe pas ou a été supprimé.
                    </p>
                    <Button onClick={() => router.push("/customers")}>
                        Retour à la liste
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <CustomerDetailsPage customer={customer} />
    );
}