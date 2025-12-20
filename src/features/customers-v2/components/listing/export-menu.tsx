"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/shadcnui/button";
import { Download, FileSpreadsheet, FileText, File } from "lucide-react";
import { useExport } from "@/shared/hooks/use-export";

interface ExportMenuProps<T> {
  data: T[];
  filename?: string;
}

export function ExportMenu<T>({ data, filename = "export" }: ExportMenuProps<T>) {
  const { exportData, isExporting } = useExport<T>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Export..." : "Exporter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => exportData(data, "excel", { filename: `${filename}.xlsx` })}
          disabled={isExporting}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
          Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => exportData(data, "pdf", { filename: `${filename}.pdf` })}
          disabled={isExporting}
        >
          <FileText className="mr-2 h-4 w-4 text-red-600" />
          PDF (.pdf)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => exportData(data, "csv", { filename: `${filename}.csv` })}
          disabled={isExporting}
        >
          <File className="mr-2 h-4 w-4 text-blue-600" />
          CSV (.csv)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}