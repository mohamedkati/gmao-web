import { useAllPermissions } from "@/shared/hooks/use-permissions";

interface CanProps {
    checks: Array<{ resource: string, action: string }>;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export function CanAll({ checks, fallback = null, children }: CanProps) {

    const hasPermission = useAllPermissions(checks);

    if (!hasPermission)
        return fallback;

    return <>{children}</>

}