'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import { cn } from '@/shared/lib/utils/cn';
import { GripVertical } from 'lucide-react';

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  tags?: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  onCardClick?: (card: KanbanCard) => void;
  className?: string;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
  high: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
};

/**
 * Tableau Kanban pour la gestion visuelle des tâches
 */
export function KanbanBoard({
  columns,
  onCardMove,
  onCardClick,
  className,
}: KanbanBoardProps) {
  const [draggedCard, setDraggedCard] = useState<{ cardId: string; columnId: string } | null>(null);

  const handleDragStart = (cardId: string, columnId: string) => {
    setDraggedCard({ cardId, columnId });
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDrop = (toColumnId: string) => {
    if (draggedCard && onCardMove && draggedCard.columnId !== toColumnId) {
      onCardMove(draggedCard.cardId, draggedCard.columnId, toColumnId);
    }
    setDraggedCard(null);
  };

  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {column.color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: column.color }}
                    ></div>
                  )}
                  {column.title}
                </CardTitle>
                <Badge variant="secondary">{column.cards.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea
                className="h-[600px] px-6 pb-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(column.id)}
              >
                <div className="space-y-3">
                  {column.cards.map((card) => (
                    <Card
                      key={card.id}
                      draggable
                      onDragStart={() => handleDragStart(card.id, column.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onCardClick?.(card)}
                      className={cn(
                        'cursor-move hover:shadow-md transition-shadow',
                        draggedCard?.cardId === card.id && 'opacity-50'
                      )}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-medium text-sm leading-tight">{card.title}</h4>
                            {card.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {card.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        {card.tags && card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {card.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          {card.priority && (
                            <Badge className={priorityColors[card.priority]} variant="secondary">
                              {card.priority}
                            </Badge>
                          )}
                          {card.assignee && (
                            <span className="text-xs text-muted-foreground">{card.assignee}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}