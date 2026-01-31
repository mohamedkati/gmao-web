// src/features/sites/hooks/use-unit-mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { unitsApi } from "../../services/unit.service";
import { UnitFormData } from "../../schemas/unit.schema";
import { siteQueryKeys } from "../../config/site-queries-key";
import { Unit } from "../../types/unit.types";

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UnitFormData) => unitsApi.create(data),
    
    onSuccess: (newUnit) => {
      // Invalider les listes d'unités pour ce site
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.units.lists(),
      });

      // Invalider les stats du site parent
      queryClient.invalidateQueries({
        queryKey: siteQueryKeys.sites.detail(newUnit.siteId),
      });

      toast.success("Unité créée avec succès");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la création",
      });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnitFormData> }) =>
      unitsApi.update(id, data),
    
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: siteQueryKeys.units.detail(id) });
      const previousUnit = queryClient.getQueryData<Unit>(siteQueryKeys.units.detail(id));

      if (previousUnit) {
        queryClient.setQueryData<Unit>(siteQueryKeys.units.detail(id), {
          ...previousUnit,
          ...data,
        });
      }

      return { previousUnit };
    },
    
    onSuccess: (updatedUnit, { id }) => {
      queryClient.setQueryData(siteQueryKeys.units.detail(id), updatedUnit);
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.units.lists() });

      toast.success("Unité modifiée");
    },
    
    onError: (error: any, { id }, context) => {
      if (context?.previousUnit) {
        queryClient.setQueryData(siteQueryKeys.units.detail(id), context.previousUnit);
      }
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la modification",
      });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unitsApi.delete(id),
    
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: siteQueryKeys.units.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.units.lists() });

      toast.success("Unité supprimée");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de la suppression",
      });
    },
  });
}

export function useAssignOccupant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ unitId, occupantId }: { unitId: string; occupantId: string }) =>
      unitsApi.assignOccupant(unitId, occupantId),
    
    onSuccess: (updatedUnit, { unitId }) => {
      queryClient.setQueryData(siteQueryKeys.units.detail(unitId), updatedUnit);
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.units.lists() });

      toast.success("Occupant assigné");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur lors de l'assignation",
      });
    },
  });
}

export function useRemoveOccupant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (unitId: string) => unitsApi.removeOccupant(unitId),
    
    onSuccess: (updatedUnit, unitId) => {
      queryClient.setQueryData(siteQueryKeys.units.detail(unitId), updatedUnit);
      queryClient.invalidateQueries({ queryKey: siteQueryKeys.units.lists() });

      toast.success("Occupant retiré");
    },
    
    onError: (error: any) => {
      toast.error("Erreur", {
        description: error?.response?.data?.message || "Erreur",
      });
    },
  });
}