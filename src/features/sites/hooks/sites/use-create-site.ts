// src/features/sites/hooks/use-create-site.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SiteFormData } from "../../schemas/site-form.schema";
import { sitesApi } from "../../services/site.service";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useCreateSite() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SiteFormData) => sitesApi.create(data),
    
    onSuccess: (newSite) => {
      // Invalider toutes les listes de sites
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.lists(),
      });

      // Ajouter le nouveau site au cache
      queryClient.setQueryData(siteQueryKeys.sites.detail(newSite.id), newSite);
      // Notification
      toast.success("Site créé avec succès", {
        description: `Le site ${newSite.name} a été créé.`,
      });

      // Redirection
      router.push(`/sites/${newSite.id}`);
    },
    
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erreur lors de la création du site";
      toast.error("Erreur", {
        description: message,
      });
    },
  });
}