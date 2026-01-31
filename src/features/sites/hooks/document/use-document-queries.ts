// src/features/sites/hooks/use-documents-query.ts

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { documentsApi, DocumentsQueryParams } from "../../services/document.service";
import { PaginatedResponse } from "@/shared/types/common.types";
import { siteQueryKeys } from "../../config/site-queries-key";

export function useDocuments(
  siteId: string,
  params: Omit<DocumentsQueryParams, "siteId"> = {},
  options?: Omit<UseQueryOptions<PaginatedResponse<Document>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: siteQueryKeys.documents.list(siteId, params),
    queryFn: () => documentsApi.getBySite(siteId, params),
    enabled: !!siteId,
    staleTime: 1000 * 60 * 2,
    ...options,
  });
}