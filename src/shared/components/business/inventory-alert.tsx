import { Package, AlertTriangle, TrendingDown, ShoppingCart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcnui/alert';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/utils/cn';

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  unit: string;
}

interface InventoryAlertProps {
  items: InventoryItem[];
  onOrder?: (itemId: string) => void;
  className?: string;
}

/**
 * Alerte pour le stock bas
 */
export function InventoryAlert({ items, onOrder, className }: InventoryAlertProps) {
  if (items.length === 0) return null;

  const criticalItems = items.filter((item) => item.currentStock === 0);
  const lowItems = items.filter(
    (item) => item.currentStock > 0 && item.currentStock <= item.minStock
  );

  return (
    <div className={cn('space-y-3', className)}>
      {/* Critical Alert */}
      {criticalItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Stock épuisé ({criticalItems.length})</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {criticalItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-destructive/10 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {onOrder && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onOrder(item.id)}
                      className="h-7"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Commander
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Low Stock Warning */}
      {lowItems.length > 0 && (
        <Alert>
          <TrendingDown className="h-4 w-4" />
          <AlertTitle>Stock faible ({lowItems.length})</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {lowItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-muted p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs">
                          {item.currentStock} {item.unit}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          (Min: {item.minStock} {item.unit})
                        </span>
                      </div>
                    </div>
                  </div>
                  {onOrder && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onOrder(item.id)}
                      className="h-7"
                    >
                      Commander
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}