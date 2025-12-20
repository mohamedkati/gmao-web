// src/shared/components/cards/option-toggle-card.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { Switch } from "@/shared/components/shadcnui/switch";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/shared/components/shadcnui/badge";

interface OptionToggleCardProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: "default" | "outline" | "destructive" | "secondary";
    className?: string;
  };
  disabled?: boolean;
}

export function OptionToggleCard({
  label,
  description,
  checked,
  onChange,
  icon: Icon,
  badge,
  disabled = false,
}: OptionToggleCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border transition-all",
        checked 
          ? "bg-primary/10 border-primary/30 shadow-sm" 
          : "bg-white/20 dark:bg-black/20 border-white/20",
        !disabled && "hover:bg-white/30 dark:hover:bg-black/30 cursor-pointer"
      )}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div className="flex items-center gap-3 flex-1">
        {Icon && (
          <div
            className={cn(
              "p-2 rounded-lg transition-all",
              checked ? "bg-primary/20" : "bg-muted"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors",
                checked ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-sm">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {badge && checked && (
          <Badge variant={badge.variant} className={badge.className}>
            {badge.label}
          </Badge>
        )}
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}