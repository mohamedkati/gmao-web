// shared/components/stripe/QuickAccessCard.tsx
import React from "react";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface QuickAccessCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  className?: string;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon: Icon,
  iconBgColor,
  title,
  subtitle,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 text-left group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", iconBgColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <ChevronRight className="w-5 h-5 text-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </button>
  );
};