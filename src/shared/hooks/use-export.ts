// src/shared/hooks/use-export.ts

import { useState } from "react";
import { toast } from "sonner";

type ExportFormat = "excel" | "pdf" | "csv";

interface ExportOptions {
  filename?: string;
  columns?: string[];
}

export function useExport<T>() {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async (
    data: T[],
    format: ExportFormat,
    options?: ExportOptions
  ) => {
    setIsExporting(true);
    try {
      switch (format) {
        case "excel":
          await exportToExcel(data, options);
          break;
        case "pdf":
          await exportToPDF(data, options);
          break;
        case "csv":
          await exportToCSV(data, options);
          break;
      }
      toast.success(`Export ${format.toUpperCase()} réussi`);
    } catch (error) {
      toast.error(`Erreur lors de l'export ${format.toUpperCase()}`);
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportData,
    isExporting,
  };
}

// Fonctions d'export (à implémenter selon vos besoins)
async function exportToExcel<T>(data: T[], options?: ExportOptions) {
  // TODO: Implémenter avec xlsx ou exceljs
  console.log("Export Excel", data, options);
}

async function exportToPDF<T>(data: T[], options?: ExportOptions) {
  // TODO: Implémenter avec jsPDF
  console.log("Export PDF", data, options);
}

async function exportToCSV<T>(data: T[], options?: ExportOptions) {
  const filename = options?.filename || "export.csv";
  
  if (data.length === 0) return;

  // Convertir en CSV
  const headers = Object.keys(data[0] as object);
  const csvContent = [
    headers.join(","),
    ...data.map((row: any) => headers.map((h) => `"${row[h] || ""}"`).join(",")),
  ].join("\n");

  // Télécharger
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}