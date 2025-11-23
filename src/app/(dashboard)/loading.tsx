import { LoadingOverlay } from "@/shared/components";
import { Skeleton } from "@/shared/components/shadcnui/skeleton";

export default function loading() {
    return (
        <div className="container max-w-7xl mx-auto p-6">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-[600px] w-full" />
        </div>
    );
}