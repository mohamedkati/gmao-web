'use client';

import { FileText, Image as ImageIcon, File, Download, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface FilePreviewProps {
  file: {
    name: string;
    url: string;
    type: string;
    size?: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Prévisualisation de fichiers (images, PDF, etc.)
 */
export function FilePreview({ file, open, onOpenChange }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {isImage ? (
                <ImageIcon className="h-5 w-5" />
              ) : isPdf ? (
                <FileText className="h-5 w-5" />
              ) : (
                <File className="h-5 w-5" />
              )}
              {file.name}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {isImage ? (
            <div className="flex items-center justify-center bg-muted rounded-lg p-4">
              <img
                src={file.url}
                alt={file.name}
                className="max-h-[600px] w-auto object-contain rounded-lg"
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={file.url}
              className="w-full h-[600px] rounded-lg border"
              title={file.name}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
              <File className="h-20 w-20 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">Aperçu non disponible</p>
                <p className="text-sm text-muted-foreground">
                  Téléchargez le fichier pour le consulter
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}