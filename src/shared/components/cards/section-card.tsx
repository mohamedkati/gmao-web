// src/shared/components/cards/section-card.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { ReactNode } from "react";
import { GlassCard } from "./glass-card";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  children: ReactNode;
  glowColor?: "primary" | "blue" | "purple" | "green" | "orange" | "indigo" | "red" | "yellow";
  headerAction?: ReactNode;
  className?: string;
  contentClassName?: string;
  bordered?: boolean;
  separator?: boolean;
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/20",
  children,
  glowColor = "primary",
  headerAction,
  className,
  contentClassName,
  bordered = true,
  separator = false,
}: SectionCardProps) {
  return (
    <GlassCard glowColor={glowColor} bordered={bordered} className={cn("p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn("p-2 rounded-lg", iconBgColor)}>
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
          )}
          <div>
            <h3 className="font-bold text-base">{title}</h3>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
        </div>
        {headerAction}
      </div>

      {/* Separator */}
      {separator && <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />}

      {/* Content */}
      <div className={contentClassName}>{children}</div>
    </GlassCard>
  );
}