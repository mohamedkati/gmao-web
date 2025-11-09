import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { formatRelativeDate } from '@/shared/lib/utils/date';
import { getInitials } from '@/shared/lib/utils/string';
import { cn } from '@/shared/lib/utils/cn';

interface Activity {
  id: string;
  type: 'created' | 'updated' | 'deleted' | 'assigned' | 'completed' | 'commented';
  title: string;
  description?: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: Date | string;
  metadata?: Record<string, any>;
}

interface ActivityLogProps {
  activities: Activity[];
  maxHeight?: string;
  showAvatar?: boolean;
  className?: string;
}

const activityColors = {
  created: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
  updated: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
  deleted: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
  assigned: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400',
  completed: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
  commented: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-400',
};

const activityLabels = {
  created: 'Créé',
  updated: 'Modifié',
  deleted: 'Supprimé',
  assigned: 'Assigné',
  completed: 'Terminé',
  commented: 'Commenté',
};

/**
 * Journal d'activité pour suivre les actions
 */
export function ActivityLog({
  activities,
  maxHeight = '500px',
  showAvatar = true,
  className,
}: ActivityLogProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Activité récente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ maxHeight }} className="px-6 pb-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                {showAvatar && (
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(activity.user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn('text-xs flex-shrink-0', activityColors[activity.type])}
                    >
                      {activityLabels[activity.type]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.user.name}</span>
                    <span>•</span>
                    <span>{formatRelativeDate(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Aucune activité récente</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}