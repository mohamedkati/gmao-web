// src/shared/components/forms/form-section.tsx

"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

export function FormSection({
  title,
  description,
  icon: Icon,
  children,
  className,
  required = false,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-start gap-3 pb-3 border-b border-border/50">
        {Icon && (
          <div className="p-2 rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-base font-semibold flex items-center gap-2">
            {title}
            {required && (
              <span className="text-xs text-destructive font-normal">* Requis</span>
            )}
          </h4>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}