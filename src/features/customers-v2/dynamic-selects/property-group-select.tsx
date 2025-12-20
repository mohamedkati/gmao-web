"use client";

import { DynamicSelect, SelectOption } from "@/components/ui/dynamic-select";
import { usePropertyGroupSelect } from "../hooks/use-property-group-select";

interface PropertyGroupSelectProps {
    value?: string;
    onValueChange: (value: string | undefined) => void;
    className?: string;
    disabled?: boolean;
    allowClear?: boolean;
}

export function PropertyGroupSelect({
    value,
    onValueChange,
    className,
    disabled,
    allowClear = true,
}: PropertyGroupSelectProps) {
    const { fetchPropertyGroups, queryKey } = usePropertyGroupSelect();

    const mapToOption = (item: any): SelectOption => ({
        value: item.id,
        label: item.name,
        subtitle: `${item.reference}`,
    });

    return (
        <DynamicSelect
            fetchFunction={fetchPropertyGroups}
            mapToOption={mapToOption}
            queryKey={queryKey}
            value={value}
            onValueChange={onValueChange}
            placeholder="Sélectionner un groupe immobilier"
            emptyText="Aucun groupe trouvé"
            searchPlaceholder="Rechercher un groupe..."
            className={className}
            disabled={disabled}
            allowClear={allowClear}
        />
    );
}