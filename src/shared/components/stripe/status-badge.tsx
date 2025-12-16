// shared/components/stripe/StatusBadge.tsx
import React from "react";
import { cn } from "@/shared/lib/utils/cn";

type StatusType = "active" | "inactive" | "pending";

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
  className?: string;
}

const statusConfig = {
  active: {
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-600",
    label: "Active",
  },
  inactive: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-600",
    label: "Inactive",
  },
  pending: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-600",
    label: "Pending",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showDot = true,
  className 
}) => {
  const { bg, text, dot, label } = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full", bg, className)}>
      {showDot && <div className={cn("w-1.5 h-1.5 rounded-full", dot)} />}
      <span className={cn("text-xs font-semibold", text)}>{label}</span>
    </div>
  );
};