'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/shadcnui/popover';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Checkbox } from '@/shared/components/shadcnui/checkbox';

interface DataTableFacetedFilterProps<TData> {
  columnId: string;
  title: string;
  options: { label: string; value: string }[];
  table: Table<TData>;
}

/**
 * Filtre multi-sélection réutilisable
 */
export function DataTableFacetedFilter<TData>({
  columnId,
  title,
  options,
  table,
}: DataTableFacetedFilterProps<TData>) {
  const column = table.getColumn(columnId);
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {title}
          {selectedValues.size > 0 && (
            <Badge variant="secondary" className="rounded-full px-2">
              {selectedValues.size}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedValues.has(option.value)}
              onCheckedChange={(checked) => {
                const values = new Set(selectedValues);
                if (checked) values.add(option.value);
                else values.delete(option.value);
                column?.setFilterValue(Array.from(values));
              }}
            />
            <label
              htmlFor={option.value}
              className="text-sm text-foreground leading-none cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}

        {selectedValues.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-red-600 mt-2"
            onClick={() => column?.setFilterValue(undefined)}
          >
            <X className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
