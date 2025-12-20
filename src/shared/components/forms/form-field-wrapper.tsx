// src/shared/components/forms/form-field-wrapper.tsx

"use client";

import { ReactNode } from "react";
import { Label } from "@/shared/components/shadcnui/label";
import { cn } from "@/shared/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface FormFieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function FormFieldWrapper({
  label,
  required,
  error,
  hint,
  icon: Icon,
  children,
  className,
}: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <Label className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}