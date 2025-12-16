// shared/components/stripe/StatsCard.tsx
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface StatsCardProps {
    icon: LucideIcon;
    iconBgColor: string;
    label: string;
    value: string | number;
    subtitle?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    icon: Icon,
    iconBgColor,
    label,
    value,
    subtitle,
    trend,
    className,
}) => {
    return (
        <div className={cn("bg-white rounded-xl p-6 shadow-sm border border-gray-100", className)}>
            <div className="flex items-start justify-between">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="mt-4">
                <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {label}
                </p>
                <div className="flex items-baseline mt-2 gap-2">
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {subtitle && <p className="text-base text-gray-400">{subtitle}</p>}
                </div>
                {trend && (
                    <div className={cn(
                        "inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-semibold",
                        trend.isPositive
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                    )}>
                        {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                    </div>
                )}
            </div>
        </div>
    );
};