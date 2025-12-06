"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";
import { Button } from "@/shared/components/shadcnui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/shadcnui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/shadcnui/popover";
import { useQuery } from "@tanstack/react-query";

export interface SelectOption {
  value: string;
  label: string;
  subtitle?: string;
  disabled?: boolean;
}

interface DynamicSelectProps {
  // Data source
  fetchFunction: (search?: string) => Promise<any[]>;
  mapToOption: (item: any) => SelectOption;
  queryKey: string[];
  
  // Value
  value?: string;
  onValueChange: (value: string | undefined) => void;
  
  // UI
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  
  // Behavior
  debounceMs?: number;
  minSearchLength?: number;
}

export function DynamicSelect({
  fetchFunction,
  mapToOption,
  queryKey,
  value,
  onValueChange,
  placeholder = "Sélectionner...",
  emptyText = "Aucun résultat",
  searchPlaceholder = "Rechercher...",
  className,
  disabled = false,
  allowClear = true,
  debounceMs = 300,
  minSearchLength = 0,
}: DynamicSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  // Fetch data
  const { data: items = [], isLoading } = useQuery({
    queryKey: [...queryKey, debouncedSearch],
    queryFn: () => {
      if (debouncedSearch.length < minSearchLength && minSearchLength > 0) {
        return Promise.resolve([]);
      }
      return fetchFunction(debouncedSearch);
    },
    staleTime: 30000,
  });

  // Map to options
  const options = React.useMemo(() => {
    return items?.map(mapToOption);
  }, [items, mapToOption]);

  // Find selected option
  const selectedOption = options?.find((option) => option.value === value);

  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
      onValueChange(undefined);
    } else {
      onValueChange(currentValue);
    }
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange(undefined);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center gap-1">
            {allowClear && value && !disabled && (
              <X
                className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isLoading && <Loader2 className="h-4 w-4 animate-spin opacity-50" />}
          </div>
          <CommandList>
            {!isLoading && options && options.length === 0 && (
              <CommandEmpty>{emptyText}</CommandEmpty>
            )}
            {options && options.length > 0 && (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    disabled={option.disabled}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.subtitle && (
                        <span className="text-xs text-muted-foreground">
                          {option.subtitle}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}