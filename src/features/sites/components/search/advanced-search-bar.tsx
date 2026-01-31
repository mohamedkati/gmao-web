// src/features/sites/components/advanced-search-bar.tsx

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/components/shadcnui/input";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/shared/components/shadcnui/command";
import { Search, Building, MapPin, User, Clock, TrendingUp, ArrowRight, X } from "lucide-react";
import { Site, SiteListItem } from "../../types/site.types";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { cn } from "@/shared/lib/utils/cn";

interface SearchSuggestion {
  type: "site" | "city" | "customer" | "recent";
  data: SiteListItem | string;
  label: string;
  sublabel?: string;
}

interface AdvancedSearchBarProps {
  onSearch: (query: string) => void;
  onSelectSite?: (site: Site) => void;
  sites: SiteListItem[];
  recentSearches?: string[];
}

export function AdvancedSearchBar({
  onSearch,
  onSelectSite,
  sites,
  recentSearches = [],
}: AdvancedSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 200);

  // Générer les suggestions
  const suggestions: SearchSuggestion[] = [];

  if (query.length >= 2) {
    // Sites correspondants
    const matchingSites = sites
      .filter((site) =>
        site.name.toLowerCase().includes(query.toLowerCase()) ||
        site.reference.toLowerCase().includes(query.toLowerCase()) ||
        site.address.city.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map((site) => ({
        type: "site" as const,
        data: site,
        label: site.name,
        sublabel: `${site.reference} • ${site.address.city}`,
      }));

    suggestions.push(...matchingSites);

    // Villes uniques
    const cities = Array.from(new Set(sites.map((s) => s.address.city)))
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((city) => ({
        type: "city" as const,
        data: city,
        label: city,
        sublabel: `Rechercher dans ${city}`,
      }));

    suggestions.push(...cities);

    // Clients
    const customers = Array.from(
      new Set(
        sites
          .filter((s) => s.customer?.companyName.toLowerCase().includes(query.toLowerCase()))
          .map((s) => s.customer?.companyName)
      )
    )
      .filter(Boolean)
      .slice(0, 3)
      .map((customer) => ({
        type: "customer" as const,
        data: customer as string,
        label: customer as string,
        sublabel: "Client",
      }));

    suggestions.push(...customers);
  } else if (query.length === 0 && recentSearches.length > 0) {
    // Recherches récentes
    recentSearches.slice(0, 5).forEach((search) => {
      suggestions.push({
        type: "recent",
        data: search,
        label: search,
        sublabel: "Recherche récente",
      });
    });
  }

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isFocused || suggestions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const suggestion = suggestions[selectedIndex];
        if (suggestion) {
          handleSelectSuggestion(suggestion);
        }
      } else if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    },
    [isFocused, suggestions, selectedIndex]
  );

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === "site" && onSelectSite) {
      const site = suggestion.data as SiteListItem;
      router.push(`/sites/${site.id}`);
    } else if (suggestion.type === "city" || suggestion.type === "customer") {
      setQuery(suggestion.label);
      onSearch(suggestion.label);
    } else if (suggestion.type === "recent") {
      setQuery(suggestion.label);
      onSearch(suggestion.label);
    }
    setIsFocused(false);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "site":
        return Building;
      case "city":
        return MapPin;
      case "customer":
        return User;
      case "recent":
        return Clock;
      default:
        return Search;
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Rechercher par nom, référence, ville, client... (Ctrl+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-10 h-12 text-base backdrop-blur-sm bg-background/50 border-2 focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full z-50 rounded-lg border bg-popover shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Command className="bg-transparent">
            <CommandList className="max-h-[400px]">
              <CommandGroup>
                {suggestions.map((suggestion, index) => {
                  const Icon = getSuggestionIcon(suggestion.type);
                  const isSelected = index === selectedIndex;

                  return (
                    <CommandItem
                      key={`${suggestion.type}-${suggestion.label}-${index}`}
                      value={suggestion.label}
                      onSelect={() => handleSelectSuggestion(suggestion)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 cursor-pointer",
                        isSelected && "bg-accent"
                      )}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{suggestion.label}</p>
                        {suggestion.sublabel && (
                          <p className="text-xs text-muted-foreground truncate">
                            {suggestion.sublabel}
                          </p>
                        )}
                      </div>
                      {suggestion.type === "site" && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          ↵
                        </Badge>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              {query.length >= 2 && (
                <div className="border-t p-3 bg-muted/30">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>↑↓ naviguer • ↵ sélectionner • Esc fermer</span>
                    <span>{suggestions.length} résultat{suggestions.length > 1 ? "s" : ""}</span>
                  </div>
                </div>
              )}
            </CommandList>
          </Command>
        </div>
      )}

      {/* Keyboard Shortcut Hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted rounded border">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
}