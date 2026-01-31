// src/shared/components/dynamic-select/dynamic-select.tsx

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { Button } from "@/shared/components/shadcnui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/shadcnui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/shadcnui/popover";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { apiClient } from "@/shared/lib/api/api-client";
import { ApiResponse } from "@/shared/types/common.types";

interface DynamicSelectProps {
  apiEndpoint: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  labelKey?: string; // Clé pour afficher le label (ex: "name", "fullName")
  valueKey?: string; // Clé pour la valeur (ex: "id")
  disabled?: boolean;
  className?: string;
  renderOption?: (option: any) => React.ReactNode;
  secondaryLabelKey?: string;
  additionalParams?: Record<string, any>;
}

interface FetchResponse<T = any> {
  data: T[];
  total?: number;
}

export function DynamicSelect({
  apiEndpoint,
  value,
  onChange,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  emptyMessage = "Aucun résultat trouvé",
  labelKey = "name",
  valueKey = "id",
  disabled = false,
  className,
  renderOption,
  secondaryLabelKey,
  additionalParams
}: DynamicSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Construire l'URL avec les paramètres de recherche
  const queryUrl = useMemo(() => {
    const url = new URL("/api/v1" + apiEndpoint, process.env.NEXT_PUBLIC_API_URL);
    if (debouncedSearch) {
      url.searchParams.set("search", debouncedSearch);
    }
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }
    url.searchParams.set("pageSize", "50"); // Limite raisonnable
    return url.toString();
  }, [apiEndpoint, debouncedSearch, additionalParams]);

  // Fetch data avec React Query
  const { data, isLoading, error } = useQuery<FetchResponse>({
    queryKey: ["dynamic-select", apiEndpoint, debouncedSearch],
    queryFn: async () => {
      const response: ApiResponse<any> = await apiClient.get(queryUrl);
      if (!response.isSucceeded) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response;
    },
    enabled: open, // Charger uniquement quand le dropdown est ouvert
    staleTime: 5 * 60 * 1000, // Cache 5 minutes
  });

  // Extraire les options
  const options = useMemo(() => {
    if (!data?.data) return [];
    return data.data;
  }, [data]);

  // Trouver l'option sélectionnée
  const selectedOption = useMemo(() => {
    if (!value || !options.length) return null;
    return options.find((option: any) => option[valueKey] === value);
  }, [value, options, valueKey]);

  // Handler pour la sélection
  const handleSelect = useCallback(
    (currentValue: string) => {
      onChange(currentValue === value ? "" : currentValue);
      setOpen(false);
      setSearchTerm(""); // Reset search
    },
    [onChange, value]
  );

  // Label à afficher
  const displayLabel = useMemo(() => {
    if (!selectedOption) return placeholder;
    return selectedOption[labelKey] || placeholder;
  }, [selectedOption, labelKey, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between backdrop-blur-sm",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Chargement...
                </span>
              </div>
            )}

            {error && (
              <div className="py-6 text-center text-sm text-destructive">
                Erreur lors du chargement
              </div>
            )}

            {!isLoading && !error && options.length === 0 && (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}

            {!isLoading && !error && options.length > 0 && (
              <CommandGroup>
                {options.map((option: any) => {
                  const optionValue = option[valueKey];
                  const optionLabel = renderOption ? renderOption(option) : option[labelKey];
                  const secondaryLabel = secondaryLabelKey ? option[secondaryLabelKey] : null;

                  return (
                    <CommandItem
                      key={optionValue}
                      value={optionValue}
                      onSelect={() => handleSelect(optionValue)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === optionValue ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {
                        secondaryLabel ? (<div className="flex flex-col flex-1 truncate">
                          <span className="truncate">{optionLabel}</span>
                          <span className="text-xs text-muted-foreground truncate">
                            {secondaryLabel}
                          </span>
                        </div>
                        ) : (<span className="truncate">{optionLabel}</span>)
                      }
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  );
}