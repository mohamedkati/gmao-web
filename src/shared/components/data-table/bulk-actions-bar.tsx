// src/shared/components/data-table/bulk-actions-bar.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import { Separator } from "@/shared/components/shadcnui/separator";
import { X, Trash, Archive, Mail, Download } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onEmail?: () => void;
  onExport?: () => void;
  className?: string;
}

export function BulkActionsBar({
  selectedCount,
  onClear,
  onDelete,
  onArchive,
  onEmail,
  onExport,
  className,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "bg-background border rounded-lg shadow-lg",
        "animate-slide-up",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
            <span className="text-sm font-semibold text-primary">{selectedCount}</span>
          </div>
          <span className="text-sm font-medium">
            {selectedCount === 1 ? "1 élément sélectionné" : `${selectedCount} éléments sélectionnés`}
          </span>
        </div>

        <Separator orientation="vertical" className="h-6 mx-2" />

        <div className="flex items-center gap-1">
          {onEmail && (
            <Button variant="ghost" size="sm" onClick={onEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Envoyer email
            </Button>
          )}

          {onExport && (
            <Button variant="ghost" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          )}

          {onArchive && (
            <Button variant="ghost" size="sm" onClick={onArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archiver
            </Button>
          )}

          {onDelete && (
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          )}

          <Separator orientation="vertical" className="h-6 mx-2" />

          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}