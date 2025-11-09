'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { PriorityIndicator } from '@/shared/components/business/priority-indicator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';
import { cn } from '@/shared/lib/utils/cn';

// 📊 Données Mock
const maintenanceEvents = [
  {
    id: '1',
    title: 'Maintenance chaudière A',
    date: new Date('2024-11-10'),
    time: '09:00',
    duration: 120,
    technician: 'Pierre Bernard',
    priority: 'medium' as const,
    type: 'preventive',
    asset: 'Chaudière Principale',
  },
  {
    id: '2',
    title: 'Inspection ascenseur',
    date: new Date('2024-11-12'),
    time: '14:00',
    duration: 90,
    technician: 'Sophie Laurent',
    priority: 'high' as const,
    type: 'regulatory',
    asset: 'Ascenseur Tour B',
  },
  {
    id: '3',
    title: 'Changement filtres CVC',
    date: new Date('2024-11-15'),
    time: '10:00',
    duration: 60,
    technician: 'Marie Dubois',
    priority: 'low' as const,
    type: 'preventive',
    asset: 'Climatisation Étage 3',
  },
  {
    id: '4',
    title: 'Vérification groupe électrogène',
    date: new Date('2024-11-18'),
    time: '08:00',
    duration: 180,
    technician: 'Jean Martin',
    priority: 'medium' as const,
    type: 'preventive',
    asset: 'Groupe Électrogène',
  },
  {
    id: '5',
    title: 'Contrôle système incendie',
    date: new Date('2024-11-20'),
    time: '09:00',
    duration: 150,
    technician: 'Luc Petit',
    priority: 'high' as const,
    type: 'regulatory',
    asset: 'Système Incendie',
  },
  {
    id: '6',
    title: 'Maintenance pompe eau',
    date: new Date('2024-11-22'),
    time: '13:00',
    duration: 90,
    technician: 'Claire Moreau',
    priority: 'medium' as const,
    type: 'preventive',
    asset: 'Pompe Eau Principale',
  },
  {
    id: '7',
    title: 'Révision ventilation',
    date: new Date('2024-11-25'),
    time: '10:00',
    duration: 120,
    technician: 'Pierre Bernard',
    priority: 'low' as const,
    type: 'preventive',
    asset: 'Ventilation Bureau',
  },
];

const typeColors = {
  preventive: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
  corrective: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400',
  regulatory: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400',
};

const typeLabels = {
  preventive: 'Préventive',
  corrective: 'Corrective',
  regulatory: 'Réglementaire',
};

export default function MaintenanceCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (day: number) => {
    return maintenanceEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Calendrier des Maintenances"
        description="Planifiez et visualisez toutes vos maintenances"
      >
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(v: any) => setView(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Vue jour</SelectItem>
              <SelectItem value="week">Vue semaine</SelectItem>
              <SelectItem value="month">Vue mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Planifier
          </Button>
        </div>
      </PageHeader>

      {/* Calendar Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Aujourd'hui
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map(
              (_, index) => (
                <div key={`empty-${index}`} className="p-2 min-h-[120px]" />
              )
            )}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const events = getEventsForDate(day);
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={cn(
                    'border rounded-lg p-2 min-h-[120px] hover:bg-accent/50 transition-colors',
                    isToday && 'bg-primary/5 border-primary'
                  )}
                >
                  <div
                    className={cn(
                      'text-sm font-semibold mb-2',
                      isToday && 'text-primary'
                    )}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1.5 rounded bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors"
                      >
                        <div className="font-medium truncate">{event.time}</div>
                        <div className="truncate text-muted-foreground">
                          {event.title}
                        </div>
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground pl-1.5">
                        +{events.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Maintenances List */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenances à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceEvents
              .filter((event) => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 10)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col items-center justify-center w-16 h-16 border rounded-lg bg-muted">
                      <div className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          month: 'short',
                        })}
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <PriorityIndicator priority={event.priority} size="sm" />
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {event.time}
                        </span>
                        <span>•</span>
                        <span>{event.duration} min</span>
                        <span>•</span>
                        <span>{event.technician}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.asset}</p>
                    </div>

                    <Badge className={typeColors[event.type as keyof typeof typeColors]}>
                      {typeLabels[event.type as keyof typeof typeLabels]}
                    </Badge>
                  </div>

                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Légende</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-sm">Préventive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500"></div>
              <span className="text-sm">Corrective</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500"></div>
              <span className="text-sm">Réglementaire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary"></div>
              <span className="text-sm">Aujourd'hui</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}