// src/shared/components/ui/status-badge.tsx

import { cn } from "@/shared/lib/utils/cn";
import { Badge } from "@/shared/components/shadcnui/badge";
import { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
  status: "active" | "inactive" | "premium" | "pending" | "expired";
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig = {
  active: {
    label: "Actif",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  },
  inactive: {
    label: "Inactif",
    variant: "secondary" as const,
    className: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
  },
  premium: {
    label: "Premium",
    variant: "default" as const,
    className: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  },
  pending: {
    label: "En attente",
    variant: "secondary" as const,
    className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  },
  expired: {
    label: "Expiré",
    variant: "destructive" as const,
    className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  },
};

export function StatusBadge({ status, icon: Icon, size = "md", className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "font-medium border",
        config.className,
        size === "sm" && "text-xs px-2 py-0.5",
        size === "md" && "text-sm px-2.5 py-0.5",
        size === "lg" && "text-base px-3 py-1",
        className
      )}
    >
      {Icon && <Icon className={cn("mr-1", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />}
      {config.label}
    </Badge>
  );
}