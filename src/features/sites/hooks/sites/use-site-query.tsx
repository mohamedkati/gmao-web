// src/features/sites/hooks/use-site-query.ts

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Site, SiteTeamDto } from "../../types/site.types";
import { siteQueryKeys } from "../../config/site-queries-key";
import { sitesApi } from "../../services/site.service";

export function useSite(
  { siteId }: { siteId: string },
  options?: Omit<UseQueryOptions<Site>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.sites.detail(siteId),
    queryFn: () => sitesApi.getById(siteId),
    enabled: !!siteId,
    // Stale time plus long pour les détails (changent moins souvent)
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

export function useGetSiteTeamMembers(
  siteId: string,
  options?: Omit<UseQueryOptions<SiteTeamDto>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.sites.teamMembers(siteId),
    queryFn: () => sitesApi.getTeamMembers(siteId),
    enabled: !!siteId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}