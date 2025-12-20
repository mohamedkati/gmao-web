"use client";

import { cn } from "@/shared/lib/utils/cn";
import { ReactNode } from "react";
import { GlassCard } from "./glass-card";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  glowColor?: "primary" | "blue" | "purple" | "green" | "orange" | "indigo" | "red" | "yellow";
  children: ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  icon: Icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  iconBgColor = "bg-blue-500/20",
  glowColor = "blue",
  children,
  className,
}: InfoCardProps) {
  return (
    <GlassCard glowColor={glowColor} className={cn("p-5 h-full", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2.5 rounded-lg", iconBgColor)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <h3 className="font-bold text-base">{title}</h3>
      </div>
      <div className="space-y-1.5 text-sm leading-relaxed">{children}</div>
    </GlassCard>
  );
}