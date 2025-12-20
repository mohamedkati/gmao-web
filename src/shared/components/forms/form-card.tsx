// src/shared/components/forms/form-card.tsx

"use client";

import { ReactNode } from "react";
import { GlassCard } from "@/shared/components/cards";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface FormCardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  glowColor?: "primary" | "blue" | "purple" | "green" | "orange" | "indigo";
  className?: string;
}

export function FormCard({
  title,
  description,
  icon: Icon,
  children,
  glowColor = "primary",
  className,
}: FormCardProps) {
  return (
    <GlassCard glowColor={glowColor} className={cn("p-6", className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <div className="flex items-center gap-3 mb-2">
              {Icon && (
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              )}
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground ml-11">{description}</p>
          )}
        </div>
      )}
      {children}
    </GlassCard>
  );
}