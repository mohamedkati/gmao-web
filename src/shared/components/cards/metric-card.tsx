// src/shared/components/cards/metric-card.tsx

"use client";

import { cn } from "@/shared/lib/utils/cn";
import { ReactNode } from "react";
import { GlassCard } from "./glass-card";
import { LucideIcon, AlertCircle, CheckCircle2, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Button } from "../shadcnui/button";

interface MetricCardProps {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    status: "success" | "warning" | "error" | "mainTheme";
    statusLabel: string;
    children: ReactNode;
    className?: string;
    bordered?: "default" | "thick";
    onEdit?: () => void;
    onDelete?: () => void;
}

const statusConfig = {
    success: {
        glow: "green",
        border: " border-2 border-green-500/30",
        thickBorder: " border-2 border-green-500/50",
        icon: "bg-green-500/20",
        iconColor: "text-green-600 dark:text-green-400",
        badge: CheckCircle2,
        badgeClass: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
        variant: 'outline'
    },
    warning: {
        glow: "orange",
        border: "border-2 border-orange-500/50",
        thickBorder: "border-2  border-orange-500/50",
        icon: "bg-orange-500/20",
        iconColor: "text-orange-600 dark:text-orange-400",
        badge: AlertCircle,
        badgeClass: "bg-gradient-to-r from-orange-500 to-yellow-500",
        variant: 'warning'
    },
    error: {
        glow: "red",
        border: "border-2 border-destructive/50",
        thickBorder: "border-2 border-destructive/50",
        icon: "bg-destructive/20",
        iconColor: "text-destructive",
        badge: AlertCircle,
        badgeClass: "bg-destructive",
        variant: 'destructive'
    },
    mainTheme: {
        glow: "primary",
        border: "ring-2 ring-primary/50",
        thickBorder: "ring-2 ring-primary/50",
        icon: "bg-primary/20",
        iconColor: "text-primary/90 dark:text-primary/90",
        badge: CheckCircle2,
        badgeClass: "bg-primary/90 text-primary-foreground dark:text-primary-foreground ring-3 ring-primary/50",
        variant: 'outline'
    },
} as const;

export function MetricCard({
    title,
    subtitle,
    icon: Icon,
    status,
    statusLabel,
    children,
    className,
    bordered = "default",
    onDelete,
    onEdit
}: MetricCardProps) {
    const config = statusConfig[status];
    const BadgeIcon = config.badge;

    return (
        <GlassCard
            glowColor={config.glow as any}
            bordered={false}
            className={cn(
                "p-6 ",
                bordered === "thick" ? config.thickBorder : config.border,
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-xl backdrop-blur-sm transition-all duration-300", config.icon)}>
                        <Icon className={cn("h-6 w-6", config.iconColor)} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
                    </div>
                </div>
                <Badge variant={config.variant as any} className={cn("gap-2 text-sm px-4 py-2 shadow-lg", config.badgeClass)}>
                    <BadgeIcon className="h-4 w-4" />
                    {statusLabel}
                </Badge>
                {(onEdit || onDelete) && (
                    <div className="flex items-center gap-1 ml-2 border-0 border-border/50 pl-2">
                        {onEdit && (
                            <Button
                                variant={'ghost'}
                                size={'sm'}

                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="p-1.5 rounded-md hover:bg-primary/10 transition-colors group/btn"
                                title="Modifier"
                            >
                                <Edit className="h-3.5 w-3.5 text-primary group-hover/btn:text-primary/80 transition-colors" />
                            </Button>

                        )}
                        {onDelete && (
                            <Button
                                variant={'ghost'}
                                size={'sm'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Supprimer"
                            >
                                <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            {children}
        </GlassCard>
    );
}