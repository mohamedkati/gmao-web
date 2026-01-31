// src/features/sites/components/view-mode-toggle.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

export type ViewMode = "cards" | "table";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 backdrop-blur-sm border">
      <Button
        variant={value === "cards" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("cards")}
        className={cn(
          "gap-2 transition-all duration-200",
          value === "cards" && "shadow-lg"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
      <Button
        variant={value === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("table")}
        className={cn(
          "gap-2 transition-all duration-200",
          value === "table" && "shadow-lg"
        )}
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </Button>
    </div>
  );
}