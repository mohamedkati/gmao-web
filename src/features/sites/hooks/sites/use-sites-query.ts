// src/features/sites/hooks/use-sites-query.ts

import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { siteQueryKeys } from "../../config/site-queries-key";
import { sitesApi, SitesQueryParams, SitesResponse } from "../../services/site.service";
import React from "react";

export function useSites(
  params: SitesQueryParams = {},
  options?: Omit<UseQueryOptions<SitesResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.sites.list(params),
    queryFn: () => sitesApi.getAll(params),
    // Stale time plus court pour les listes (données changent souvent)
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
}

// Hook avec prefetching pour pagination
export function useSitesWithPrefetch(params: SitesQueryParams = {}) {
  const query = useSites(params);

  // Prefetch de la page suivante si on n'est pas sur la dernière
  const { data } = query;
  const currentPage = params.page || 1;
  const hasNextPage = data && currentPage < data.totalPages;

  // Utiliser React Query pour prefetch
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: siteQueryKeys.sites.list({ ...params, page: currentPage + 1 }),
        queryFn: () => sitesApi.getAll({ ...params, page: currentPage + 1 }),
      });
    }
  }, [hasNextPage, currentPage, params, queryClient]);

  return query;
}