import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { assetsApi, AssetsQueryParams } from "../../services/asset.service";
import { PaginatedResponse } from "@/shared/types/common.types";
import { Asset } from "../../types/asset.types";
import { siteQueryKeys } from "../../config/site-queries-key";


export function useAssets(
  siteId: string,
  params: Omit<AssetsQueryParams, "siteId"> = {},
  options?: Omit<UseQueryOptions<Asset[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.assets.list(siteId, params),
    queryFn: () => assetsApi.getBySite(siteId, params),
    enabled: !!siteId,
    staleTime: 1000 * 60 * 3,
    ...options,
  });
}

export function useAssetsHierarchy(
  siteId: string,
  options?: Omit<UseQueryOptions<Asset[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.assets.hierarchy(siteId),
    queryFn: () => assetsApi.getHierarchy(siteId),
    enabled: !!siteId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

export function useAsset(
  { assetId }: { assetId: string },
  options?: Omit<UseQueryOptions<Asset>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.assets.detail(assetId),
    queryFn: () => assetsApi.getById(assetId),
    enabled: !!assetId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}