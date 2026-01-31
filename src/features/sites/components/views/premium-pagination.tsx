// src/features/sites/components/premium-pagination.tsx

"use client";

import { Button } from "@/shared/components/shadcnui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcnui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PremiumPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function PremiumPagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PremiumPaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      // Si moins de 7 pages, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (showEllipsisStart) {
        pages.push("...");
      }

      // Pages autour de la page actuelle
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (showEllipsisEnd) {
        pages.push("...");
      }

      // Toujours afficher la dernière page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Info */}
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground">
          Affichage de{" "}
          <span className="font-medium text-foreground">
            {startItem}-{endItem}
          </span>{" "}
          sur{" "}
          <span className="font-medium text-foreground">{totalItems}</span>{" "}
          sites
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Lignes par page:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}