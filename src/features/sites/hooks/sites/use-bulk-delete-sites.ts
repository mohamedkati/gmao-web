
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sitesApi } from "../../services/site.service";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useBulkDeleteSites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => sitesApi.bulkDelete(ids),
    
    onSuccess: (_, deletedIds) => {
      // Supprimer chaque site du cache
      deletedIds.forEach((id) => {
        queryClient.removeQueries({ queryKey: siteQueryKeys.sites.detail(id) });
      });

      // Invalider les listes
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.lists(),
      });

      toast.success("Sites supprimés", {
        description: `${deletedIds.length} site(s) supprimé(s) avec succès.`,
      });
    },
    
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erreur lors de la suppression";
      toast.error("Erreur", {
        description: message,
      });
    },
  });
}