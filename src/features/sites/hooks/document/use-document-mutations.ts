// src/features/sites/hooks/use-document-mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DocumentUploadFormData } from "../../schemas/document.schema";
import { documentsApi } from "../../services/document.service";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useUploadDocument(siteId:string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DocumentUploadFormData) => documentsApi.upload(siteId, data),
    
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.documents.lists(),
      });

      toast.success("Document uploadé avec succès");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de l'upload",
      });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentsApi.delete(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.documents.lists() });
      
      toast.success("Document supprimé");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la suppression",
      });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: async ({ id, filename }: { id: string; filename: string }) => {
      const blob = await documentsApi.download(id);
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors du téléchargement",
      });
    },
  });
}