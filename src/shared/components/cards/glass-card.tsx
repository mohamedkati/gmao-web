"use client";

import { cn } from "@/shared/lib/utils/cn";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "blue" | "purple" | "green" | "orange" | "indigo" | "red" | "yellow";
  bordered?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const glowColorMap = {
  primary: "from-primary/10 to-purple-500/10",
  blue: "from-blue-500/10 to-cyan-500/10",
  purple: "from-purple-500/10 to-pink-500/10",
  green: "from-green-500/10 to-emerald-500/10",
  orange: "from-orange-500/10 to-red-500/10",
  indigo: "from-indigo-500/10 to-violet-500/10",
  red: "from-red-500/10 to-destructive/10",
  yellow: "from-yellow-500/10 to-orange-500/10",
};

export function GlassCard({
  children,
  className,
  glowColor = "primary",
  bordered = true,
  hoverable = true,
  onClick,
}: GlassCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br rounded-2xl blur-xl transition-all duration-500",
          glowColorMap[glowColor],
          hoverable && "opacity-0 group-hover:opacity-60"
        )}
      />

      {/* Card content */}
      <div
        className={cn(
          "relative bg-gradient-to-br from-background/80 to-background/40 rounded-2xl shadow-xl",
          bordered && "border border-white/20",
          hoverable && "hover:scale-[1.00] transition-all duration-300",
          onClick && "cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}