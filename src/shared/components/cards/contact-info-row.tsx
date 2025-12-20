// src/shared/components/cards/contact-info-row.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { LucideIcon, ExternalLink } from "lucide-react";
import { Badge } from "@/shared/components/shadcnui/badge";

interface ContactInfoRowProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  label?: string;
  value: string;
  href?: string;
  badge?: string;
  className?: string;
}

export function ContactInfoRow({
  icon: Icon,
  iconColor = "text-blue-600 dark:text-blue-400",
  iconBgColor = "bg-blue-500/20",
  label,
  value,
  href,
  badge,
  className,
}: ContactInfoRowProps) {
  const content = (
    <div
      className={cn(
        "group/item flex items-center gap-3 p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-white/20 transition-all duration-200",
        href && "hover:bg-white/50 dark:hover:bg-black/50 cursor-pointer",
        className
      )}
    >
      <div className={cn("p-2.5 rounded-lg transition-all", iconBgColor, href && "group-hover/item:scale-110")}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-muted-foreground mb-1">{label}</p>}
        <p className="font-medium text-sm truncate">{value}</p>
      </div>
      {badge && <Badge variant="secondary" className="text-xs backdrop-blur-sm">{badge}</Badge>}
      {href && <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />}
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}