'use client';

import { Clock } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils/cn';

interface TimePickerProps {
  value?: string; // Format HH:mm
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Time Picker simple
 */
export function TimePicker({
  value,
  onChange,
  disabled = false,
  className,
}: TimePickerProps) {
  return (
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn('pl-10', className)}
      />
    </div>
  );
}