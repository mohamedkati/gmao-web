// src/features/sites/hooks/use-asset-mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssetFormData } from "../../schemas/asset.schema";
import { assetsApi } from "../../services/asset.service";
import { siteQueryKeys } from "../../config/site-queries-key";
import { Asset } from "../../types/asset.types";

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssetFormData) => assetsApi.create(data),
    
    onSuccess: (newAsset) => {
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.assets.lists() });
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.assets.hierarchy(newAsset.siteId),
      });
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.detail(newAsset.siteId),
      });

      toast.success("Équipement créé avec succès");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la création",
      });
    },
  });
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AssetFormData> }) =>
      assetsApi.update(id, data),
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: siteQueryKeys.assets.detail(id) });
      const previousAsset = queryClient.getQueryData<Asset>(siteQueryKeys.assets.detail(id));

      if (previousAsset) {
        queryClient.setQueryData<Asset>(siteQueryKeys.assets.detail(id), {
          ...previousAsset,
          ...data,
        });
      }

      return { previousAsset };
    },
    
    onSuccess: (updatedAsset, { id }) => {
      queryClient.setQueryData(siteQueryKeys.assets.detail(id), updatedAsset);
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.assets.lists() });
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.assets.hierarchy(updatedAsset.siteId),
      });
      
      toast.success("Équipement modifié");
    },
    
    onError: (error: any, { id }, context) => {
      if (context?.previousAsset) {
        queryClient.setQueryData(siteQueryKeys.assets.detail(id), context.previousAsset);
      }
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la modification",
      });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => assetsApi.delete(id),
    
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: siteQueryKeys.assets.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.assets.lists() });
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.assets.all });

      toast.success("Équipement supprimé");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la suppression",
      });
    },
  });
}

export function useScheduleMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assetId,
      date,
      description,
    }: {
      assetId: string;
      date: string;
      description?: string;
    }) => assetsApi.scheduleMaintenance(assetId, { date, description }),
    
    onSuccess: (updatedAsset, { assetId }) => {
      queryClient.setQueryData(siteQueryKeys.assets.detail(assetId), updatedAsset);
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.assets.lists() });

      toast.success("Maintenance planifiée");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur",
      });
    },
  });
}