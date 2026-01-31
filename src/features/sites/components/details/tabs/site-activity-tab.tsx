// src/features/sites/components/details/site-activity-tab.tsx

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcnui/card";
import { Badge } from "@/shared/components/shadcnui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/shadcnui/avatar";
import { Site } from "../../../types/site.types";
import {
  Activity,
  FileText,
  Edit,
  UserPlus,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
} from "lucide-react";
import { cn } from "@/shared/lib/utils/cn";

interface SiteActivityTabProps {
  site: Site;
}

// Mock data pour l'activité
const mockActivities = [
  {
    id: "1",
    type: "edit",
    user: "Jean Dupont",
    action: "a modifié les informations du site",
    timestamp: "2024-12-23T10:30:00",
    details: "Mise à jour de la surface totale",
  },
  {
    id: "2",
    type: "document",
    user: "Marie Martin",
    action: "a uploadé un document",
    timestamp: "2024-12-22T15:45:00",
    details: "Plan d'architecture.pdf",
  },
  {
    id: "3",
    type: "maintenance",
    user: "Système",
    action: "Maintenance planifiée",
    timestamp: "2024-12-21T09:00:00",
    details: "Chaudière principale - Inspection annuelle",
  },
  {
    id: "4",
    type: "team",
    user: "Pierre Bernard",
    action: "a ajouté un membre à l'équipe",
    timestamp: "2024-12-20T14:20:00",
    details: "Sophie Lefebvre - Technicienne",
  },
  {
    id: "5",
    type: "asset",
    user: "Sophie Lefebvre",
    action: "a marqué un équipement en maintenance",
    timestamp: "2024-12-19T11:10:00",
    details: "Ascenseur A - Révision semestrielle",
  },
];

export function SiteActivityTab({ site }: SiteActivityTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Historique des actions et événements</CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-border" />

            {/* Activities */}
            <div className="space-y-8">
              {mockActivities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  isLast={index === mockActivities.length - 1}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Component
function ActivityItem({
  activity,
  isLast,
}: {
  activity: any;
  isLast: boolean;
}) {
  const getActivityConfig = (type: string) => {
    switch (type) {
      case "edit":
        return {
          icon: Edit,
          color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        };
      case "document":
        return {
          icon: Upload,
          color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        };
      case "maintenance":
        return {
          icon: Wrench,
          color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        };
      case "team":
        return {
          icon: UserPlus,
          color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        };
      case "asset":
        return {
          icon: AlertCircle,
          color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        };
      default:
        return {
          icon: Activity,
          color: "bg-muted text-muted-foreground border-border",
        };
    }
  };

  const config = getActivityConfig(activity.type);
  const Icon = config.icon;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
    return "À l'instant";
  };

  return (
    <div className="relative flex gap-4">
      {/* Icon */}
      <div className="relative z-10">
        <div className={cn("p-2.5 rounded-full border-2 border-background", config.color)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-semibold">{activity.user}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatTime(activity.timestamp)}
            </p>
          </div>
        </div>
        {activity.details && (
          <div className="p-3 rounded-lg bg-muted/50 border">
            <p className="text-sm">{activity.details}</p>
          </div>
        )}
      </div>
    </div>
  );
}