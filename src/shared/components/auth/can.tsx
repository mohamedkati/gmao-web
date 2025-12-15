import { usePermission } from "@/shared/hooks/use-permissions";

interface CanProps {
    resource: string;
    action: string;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export function Can({ resource, action, fallback = null, children }: CanProps) {

    const hasPermission = usePermission(resource, action);

    if (!hasPermission)
        return fallback;

    return <>{children}</>

}