import { Skeleton } from "@/shared/components/shadcnui/skeleton";

export function LoadingData(){
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