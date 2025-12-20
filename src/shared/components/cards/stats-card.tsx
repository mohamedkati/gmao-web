// src/shared/components/cards/stats-card.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  color?: "blue" | "purple" | "green" | "orange" | "red" | "indigo";
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
}

const colorMap = {
  blue: {
    bg: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-500/20 hover:border-blue-500/30",
    icon: "bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    glow: "from-blue-500/20 to-cyan-500/20",
  },
  purple: {
    bg: "from-purple-500/10 to-pink-500/5",
    border: "border-purple-500/20 hover:border-purple-500/30",
    icon: "bg-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    glow: "from-purple-500/20 to-pink-500/20",
  },
  green: {
    bg: "from-green-500/10 to-emerald-500/5",
    border: "border-green-500/20 hover:border-green-500/30",
    icon: "bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    glow: "from-green-500/20 to-emerald-500/20",
  },
  orange: {
    bg: "from-orange-500/10 to-red-500/5",
    border: "border-orange-500/20 hover:border-orange-500/30",
    icon: "bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    glow: "from-orange-500/20 to-red-500/20",
  },
  red: {
    bg: "from-red-500/10 to-destructive/5",
    border: "border-red-500/20 hover:border-red-500/30",
    icon: "bg-red-500/20",
    iconColor: "text-red-600 dark:text-red-400",
    glow: "from-red-500/20 to-destructive/20",
  },
  indigo: {
    bg: "from-indigo-500/10 to-violet-500/5",
    border: "border-indigo-500/20 hover:border-indigo-500/30",
    icon: "bg-indigo-500/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    glow: "from-indigo-500/20 to-violet-500/20",
  },
};

export function StatsCard({ value, label, icon: Icon, color = "blue", trend, onClick }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="group relative">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br rounded-lg blur-xl transition-all duration-500 opacity-0 group-hover:opacity-60",
          colors.glow
        )}
      />
      <div
        className={cn(
          "relative p-5 rounded-lg backdrop-blur-sm bg-gradient-to-br border transition-all",
          colors.bg,
          colors.border,
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={cn("p-2 rounded-lg", colors.icon)}>
            <Icon className={cn("h-5 w-5", colors.iconColor)} />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-end justify-between">
          <p className="font-bold text-base">{value}</p>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}