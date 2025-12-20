// src/shared/hooks/use-query-params.ts

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Hook pour gérer les query params dans l'URL
 * Permet de sauvegarder l'état des filtres/pagination
 */
export function useQueryParams<T extends Record<string, any>>(options?: {
  arrayKeys?: string[]; // Clés qui doivent toujours être des arrays
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
const arrayKeys = options?.arrayKeys || [];
  // Lire les params depuis l'URL
  const params = useMemo((): Partial<T> => {
    const result: any = {};
    
    searchParams.forEach((value, key) => {
      // Gérer les arrays (ex: types[]=1&types[]=2 ou types=1,2,3)
      if (result[key]) {
        result[key] = Array.isArray(result[key]) 
          ? [...result[key], parseValue(value)]
          : [result[key], parseValue(value)];
      } else if (value.includes(",")) {
        // Split par virgule pour les arrays
        result[key] = value.split(",").map(parseValue);
      } else if (arrayKeys.includes(key)) {
        result[key] = [parseValue(value)];
      }else {
        result[key] = parseValue(value);
      }
    });
    
    return result;
  }, [searchParams]);

  // Parser une valeur (convertir en nombre/boolean si possible)
 

  // Mettre à jour les params dans l'URL
  const setParams = useCallback((newParams: Partial<T>, options?: { replace?: boolean; scroll?: boolean }) => {
    const current = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        current.delete(key);
      } else if (Array.isArray(value)) {
        // Encoder les arrays comme values séparées par virgule
        current.set(key, value.join(","));
      } else {
        current.set(key, String(value));
      }
    });

    const search = current.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    
    if (options?.replace) {
      router.replace(url, { scroll: options.scroll ?? false });
    } else {
      router.push(url, { scroll: options?.scroll ?? false });
    }
  }, [searchParams, router, pathname]);

  // Réinitialiser tous les params
  const clearParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  // Supprimer des params spécifiques
  const removeParams = useCallback((keys: string[]) => {
    const current = new URLSearchParams(searchParams.toString());
    keys.forEach(key => current.delete(key));
    
    const search = current.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    router.push(url);
  }, [searchParams, router, pathname]);

  return {
    params,
    setParams,
    clearParams,
    removeParams,
  };
}

 const parseValue = (value: string): any => {
    // Boolean
    if (value === "true") return true;
    if (value === "false") return false;
    
    // Number
    const num = Number(value);
    if (!isNaN(num) && value !== "") return num;
    
    // String
    return value;
  };