// shared/components/stripe/StripeProgress.tsx
import React from "react";
import { cn } from "@/shared/lib/utils/cn";

interface StripeProgressProps {
  value: number;
  max: number;
  showPercentage?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const StripeProgress: React.FC<StripeProgressProps> = ({ 
  value, 
  max, 
  showPercentage = true,
  size = "md",
  className
}) => {
  const percentage = (value / max) * 100;
  const isWarning = percentage >= 80 && percentage < 90;
  const isDanger = percentage >= 90;

  const barColor = isDanger 
    ? "bg-red-600" 
    : isWarning 
    ? "bg-orange-500" 
    : "bg-green-600";

  const heightClass = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className={className}>
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", heightClass)}>
        <div 
          className={cn(barColor, heightClass, "rounded-full transition-all duration-300")}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showPercentage && (
        <span className={cn(
          "text-xs mt-1 inline-block font-medium",
          isDanger ? "text-red-600" : "text-gray-500"
        )}>
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
};