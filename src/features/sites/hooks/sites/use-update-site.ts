// src/features/sites/hooks/use-update-site.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteFormData } from "../../schemas/site-form.schema";
import { sitesApi } from "../../services/site.service";
import { siteQueryKeys } from "../../config/site-queries-key";
import { Site } from "../../types/site.types";

export function useUpdateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SiteFormData> }) =>
      sitesApi.update(id, data),
    
    // Optimistic Update
    onMutate: async ({ id, data }) => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({ queryKey: siteQueryKeys.sites.detail(id) });

      // Snapshot de la valeur précédente
      const previousSite = queryClient.getQueryData<Site>(siteQueryKeys.sites.detail(id));

      // Mise à jour optimiste
      if (previousSite) {
        queryClient.setQueryData<Site>(siteQueryKeys.sites.detail(id), {
          ...previousSite,
          ...data,
        });
      }

      return { previousSite };
    },
    
    onSuccess: (updatedSite, { id }) => {
      // Mettre à jour le cache avec les vraies données du serveur
      queryClient.setQueryData(siteQueryKeys.sites.detail(id), updatedSite);

      // Invalider les listes (au cas où le nom ou d'autres champs affichés changent)
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.lists(),
      });

      toast.success("Site modifié", {
        description: "Les modifications ont été enregistrées.",
      });
    },
    
    onError: (error: any, { id }, context) => {
      // Rollback en cas d'erreur
      if (context?.previousSite) {
        queryClient.setQueryData(siteQueryKeys.sites.detail(id), context.previousSite);
      }

      const message = error?.response?.data?.message || "Erreur lors de la modification";
      toast.error("Erreur", {
        description: message,
      });
    },
  });
}