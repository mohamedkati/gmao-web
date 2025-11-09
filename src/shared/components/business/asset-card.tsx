import Link from 'next/link';
import { Package, Calendar, AlertTriangle, CheckCircle2, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/cn';
import { formatDate } from '@/shared/lib/utils/date';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive' | 'retired';
  location?: string;
  lastMaintenance?: Date | string;
  nextMaintenance?: Date | string;
  image?: string;
}

interface AssetCardProps {
  asset: Asset;
  onView?: () => void;
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Actif',
    color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
    icon: CheckCircle2,
  },
  maintenance: {
    label: 'En maintenance',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
    icon: AlertTriangle,
  },
  inactive: {
    label: 'Inactif',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-400',
    icon: Package,
  },
  retired: {
    label: 'Retiré',
    color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
    icon: Package,
  },
};

/**
 * Carte pour afficher un équipement
 */
export function AssetCard({ asset, onView, className }: AssetCardProps) {
  const config = statusConfig[asset.status];
  const StatusIcon = config.icon;

  return (
    <Card className={cn('hover:shadow-lg transition-all duration-300 group', className)}>
      <CardHeader className="pb-3">
        {/* Image ou Icon */}
        <div className="relative h-40 -mt-6 -mx-6 mb-4 rounded-t-xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          {asset.image ? (
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-16 w-16 text-primary/30" />
            </div>
          )}
          {/* Status Badge Overlay */}
          <div className="absolute top-3 right-3">
            <Badge className={cn('gap-1', config.color)}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>
        </div>

        {/* Name & Type */}
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {asset.name}
          </h3>
          <p className="text-sm text-muted-foreground">{asset.type}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {/* Location */}
        {asset.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{asset.location}</span>
          </div>
        )}

        {/* Last Maintenance */}
        {asset.lastMaintenance && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Dernière maintenance : {formatDate(asset.lastMaintenance, 'PP')}</span>
          </div>
        )}

        {/* Next Maintenance */}
        {asset.nextMaintenance && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-primary font-medium">
              Prochaine : {formatDate(asset.nextMaintenance, 'PP')}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={onView}
          asChild={!onView}
        >
          {onView ? (
            'Voir les détails'
          ) : (
            <Link href={`/assets/${asset.id}`}>Voir les détails</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}