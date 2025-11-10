import {Phone, Mail, MapPin, Wrench, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/cn';
import { getInitials } from '@/shared/lib/utils/string';

interface Technician {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status: 'available' | 'busy' | 'unavailable';
  specialties?: string[];
  location?: string;
  activeWorkOrders?: number;
}

interface TechnicianCardProps {
  technician: Technician;
  onAssign?: () => void;
  onView?: () => void;
  showActions?: boolean;
  className?: string;
}

const statusConfig = {
  available: {
    label: 'Disponible',
    color: 'bg-green-500',
    dotColor: 'bg-green-500',
  },
  busy: {
    label: 'Occupé',
    color: 'bg-yellow-500',
    dotColor: 'bg-yellow-500',
  },
  unavailable: {
    label: 'Indisponible',
    color: 'bg-red-500',
    dotColor: 'bg-red-500',
  },
};

/**
 * Carte pour afficher un technicien
 */
export function TechnicianCard({
  technician,
  onAssign,
  onView,
  showActions = true,
  className,
}: TechnicianCardProps) {
  const config = statusConfig[technician.status];

  return (
    <Card className={cn('hover:shadow-lg transition-all duration-300', className)}>
      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Avatar with status indicator */}
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-background">
              <AvatarImage src={technician.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(technician.name)}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background',
                config.dotColor
              )}
            ></div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{technician.name}</h3>
            <Badge variant="outline" className="mt-1">
              {config.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Contact Info */}
        {technician.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{technician.email}</span>
          </div>
        )}

        {technician.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{technician.phone}</span>
          </div>
        )}

        {technician.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{technician.location}</span>
          </div>
        )}

        {/* Active Work Orders */}
        {typeof technician.activeWorkOrders === 'number' && (
          <div className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="font-medium text-primary">
              {technician.activeWorkOrders} intervention(s) en cours
            </span>
          </div>
        )}

        {/* Specialties */}
        {technician.specialties && technician.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {technician.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="border-t pt-4 gap-2">
          {onView && (
            <Button variant="outline" className="flex-1" onClick={onView}>
              Voir profil
            </Button>
          )}
          {onAssign && (
            <Button
              className="flex-1"
              onClick={onAssign}
              disabled={technician.status === 'unavailable'}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Assigner
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}