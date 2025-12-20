// src/shared/components/cards/option-check-card.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { CheckCircle2, X, LucideIcon } from "lucide-react";
import { Badge } from "@/shared/components/shadcnui/badge";

interface OptionCheckCardProps {
  label: string;
  checked: boolean;
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: "default" | "outline" | "destructive" | "secondary";
    className?: string;
  };
  onClick?: () => void;
}

export function OptionCheckCard({ label, checked, icon: Icon, badge, onClick }: OptionCheckCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-5 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-black/20 border border-white/20 transition-all group/option",
        onClick ? "hover:bg-white/30 dark:hover:bg-black/30 cursor-pointer" : ""
      )}
      onClick={onClick}
    >
      <span className="text-sm font-semibold flex items-center gap-4">
        <div
          className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300",
            checked ? "bg-green-500/20 group-hover/option:scale-110" : "bg-muted"
          )}
        >
          {checked ? (
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          ) : (
            <X className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {checked && Icon && <Icon className="h-5 w-5 text-green-600 dark:text-green-400 animate-pulse" />}
        {badge && (
          <Badge variant={badge.variant} className={cn("font-bold text-base px-3 py-1", badge.className)}>
            {badge.label}
          </Badge>
        )}
      </div>
    </div>
  );
}