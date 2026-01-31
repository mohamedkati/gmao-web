// src/features/sites/hooks/use-delete-site.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sitesApi } from "../../services/site.service";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useDeleteSite() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => sitesApi.delete(id),
    
    onSuccess: (_, deletedId) => {
      // Supprimer du cache
      queryClient.removeQueries({ queryKey: siteQueryKeys.sites.detail(deletedId) });
      // Invalider les listes
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.lists(),
      });

      toast.success("Site supprimé", {
        description: "Le site a été supprimé avec succès.",
      });

      // Redirection vers la liste
      router.push("/sites");
    },
    
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erreur lors de la suppression";
      toast.error("Erreur", {
        description: message,
      });
    },
  });
}