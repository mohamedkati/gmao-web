// src/features/sites/hooks/use-units-query.ts

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { unitsApi, UnitsQueryParams } from "../../services/unit.service";
import { Unit, UnitListItem } from "../../types/unit.types";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useUnits(
  siteId: string,
  params: Omit<UnitsQueryParams, "siteId"> = {},
  options?: Omit<UseQueryOptions<Unit[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.units.list(siteId, params),
    queryFn: () => unitsApi.getBySite(siteId, params),
    enabled: !!siteId,
    staleTime: 1000 * 60 * 3, // 3 minutes
    ...options,
  });
}

export function useUnit(
  { unitId }: { unitId: string },
  options?: Omit<UseQueryOptions<Unit>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.units.detail(unitId),
    queryFn: () => unitsApi.getById(unitId),
    enabled: !!unitId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}