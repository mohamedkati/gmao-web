// src/features/sites/components/quick-actions-toolbar.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Mail,
  Printer,
  Share2,
  MoreHorizontal,
  Copy,
  Archive,
  Tag,
} from "lucide-react";

interface QuickActionsToolbarProps {
  selectedCount: number;
  totalCount: number;
  onExport: () => void;
  onBulkEdit: () => void;
  onBulkDelete: () => void;
}

export function QuickActionsToolbar({
  selectedCount,
  totalCount,
  onExport,
  onBulkEdit,
  onBulkDelete,
}: QuickActionsToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel (.xlsx)
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Envoyer par email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Print */}
        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>

        {/* Share */}
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Partager
        </Button>

        {/* More Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Dupliquer sélection
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="mr-2 h-4 w-4" />
              Ajouter des tags
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archiver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-sm text-muted-foreground">
        {selectedCount > 0 ? (
          <span>
            {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""} sur {totalCount}
          </span>
        ) : (
          <span>{totalCount} site{totalCount > 1 ? "s" : ""} au total</span>
        )}
      </div>
    </div>
  );
}