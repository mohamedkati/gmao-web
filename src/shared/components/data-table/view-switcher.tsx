// src/shared/components/data-table/view-switcher.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import { LayoutGrid, List, Table } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

type ViewMode = "cards" | "list" | "table";

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 border rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          view === "cards" && "bg-muted"
        )}
        onClick={() => onViewChange("cards")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          view === "list" && "bg-muted"
        )}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8",
          view === "table" && "bg-muted"
        )}
        onClick={() => onViewChange("table")}
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
}