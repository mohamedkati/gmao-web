import { useAnyPermission } from "@/shared/hooks/use-permissions";

interface CanProps {
    checks: Array<{ resource: string, action: string }>;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export function CanAny({ checks, fallback = null, children }: CanProps) {

    const hasPermission = useAnyPermission(checks);

    if (!hasPermission)
        return fallback;

    return <>{children}</>

}