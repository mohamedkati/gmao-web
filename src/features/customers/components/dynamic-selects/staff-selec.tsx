// src/shared/components/dynamic-select/staff-select.tsx

"use client";

import { DynamicSelect, SelectOption } from "@/components/ui/dynamic-select";
import { useStaffSelect } from "../../hooks/use-staff-select";

interface StaffSelectProps {
  value?: string;
  onValueChange: (value: string | undefined) => void;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

export function StaffSelect({
  value,
  onValueChange,
  className,
  disabled,
  allowClear = true,
}: StaffSelectProps) {
  const { fetchStaff, queryKey } = useStaffSelect();

  const mapToOption = (item: any): SelectOption => ({
    value: item.id,
    label: `${item.fullName}`,
    subtitle: item.email,
    disabled: !item.isActive,
  });

  return (
    <DynamicSelect
      fetchFunction={fetchStaff}
      mapToOption={mapToOption}
      queryKey={queryKey}
      value={value}
      onValueChange={onValueChange}
      placeholder="Sélectionner un commercial"
      emptyText="Aucun commercial trouvé"
      searchPlaceholder="Rechercher un commercial..."
      className={className}
      disabled={disabled}
      allowClear={allowClear}
    />
  );
}