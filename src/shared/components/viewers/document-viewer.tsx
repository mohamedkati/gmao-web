// src/shared/components/viewers/document-viewer.tsx

"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/shared/components/shadcnui/button";
import '@/shared/lib/pdf-config/pdf-config';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  X,
  Loader2,
  FileText,
} from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";


interface DocumentViewerProps {
  fileUrl: string;
  fileName: string;
  fileType: "pdf" | "image";
  onClose?: () => void;
  className?: string;
}

export function DocumentViewer({
  fileUrl,
  fileName,
  fileType,
  onClose,
  className,
}: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("PDF load error:", error);
    setError("Erreur lors du chargement du document");
    setIsLoading(false);
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      if (newPageNumber < 1 || newPageNumber > numPages) {
        return prevPageNumber;
      }
      return newPageNumber;
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background rounded-lg border shadow-lg",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b backdrop-blur-sm bg-background/95">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{fileName}</h3>
            <p className="text-xs text-muted-foreground">
              {fileType === "pdf" ? "Document PDF" : "Image"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            title="Télécharger"
          >
            <Download className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Toolbar (PDF only) */}
      {fileType === "pdf" && (
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background border text-sm">
              <span className="font-medium">{pageNumber}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{numPages || "..."}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="px-3 py-1 rounded-md bg-background border text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </div>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4">
        <div className="flex items-center justify-center min-h-full">
          {isLoading && fileType === "pdf" && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Chargement du document...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 p-8 rounded-lg border border-destructive/50 bg-destructive/10">
              <FileText className="h-12 w-12 text-destructive" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {!error && fileType === "pdf" && (
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              className="shadow-2xl"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="rounded-lg overflow-hidden"
              />
            </Document>
          )}

          {!error && fileType === "image" && (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <img
                src={fileUrl}
                alt={fileName}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setError("Erreur lors du chargement de l'image");
                  setIsLoading(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}