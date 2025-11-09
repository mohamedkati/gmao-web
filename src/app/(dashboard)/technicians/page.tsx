"use client"
import { Plus, Users, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Section } from '@/shared/components/layout/section';
import { SplitView } from '@/shared/components/layout/split-view';
import { TechnicianCard } from '@/shared/components/business/technician-card';
import { KPIWidget } from '@/shared/components/business/kpi-widget';
import { BarChart } from '@/shared/components/charts/bar-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';

// 📊 Données Mock
const technicians = [
  {
    id: '1',
    name: 'Jean Martin',
    email: 'jean.martin@gmao.fr',
    phone: '+33 6 12 34 56 78',
    status: 'available' as const,
    specialties: ['Électricité', 'Plomberie'],
    location: 'Paris 15ème',
    activeWorkOrders: 2,
  },
  {
    id: '2',
    name: 'Marie Dubois',
    email: 'marie.dubois@gmao.fr',
    phone: '+33 6 98 76 54 32',
    status: 'busy' as const,
    specialties: ['Climatisation', 'Ventilation'],
    location: 'Paris 16ème',
    activeWorkOrders: 5,
  },
  {
    id: '3',
    name: 'Pierre Bernard',
    email: 'pierre.bernard@gmao.fr',
    phone: '+33 6 45 67 89 01',
    status: 'available' as const,
    specialties: ['Chauffage', 'Chaudières'],
    location: 'Boulogne',
    activeWorkOrders: 1,
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@gmao.fr',
    phone: '+33 6 23 45 67 89',
    status: 'busy' as const,
    specialties: ['Ascenseurs', 'Électromécanique'],
    location: 'Paris 17ème',
    activeWorkOrders: 4,
  },
  {
    id: '5',
    name: 'Luc Petit',
    email: 'luc.petit@gmao.fr',
    phone: '+33 6 34 56 78 90',
    status: 'unavailable' as const,
    specialties: ['Toiture', 'Étanchéité'],
    location: 'Issy-les-Moulineaux',
    activeWorkOrders: 0,
  },
  {
    id: '6',
    name: 'Claire Moreau',
    email: 'claire.moreau@gmao.fr',
    phone: '+33 6 56 78 90 12',
    status: 'available' as const,
    specialties: ['Plomberie', 'Sanitaires'],
    location: 'Neuilly',
    activeWorkOrders: 2,
  },
];

const performanceData = [
  { name: 'Jean Martin', completed: 45, planned: 48 },
  { name: 'Marie Dubois', completed: 52, planned: 55 },
  { name: 'Pierre Bernard', completed: 38, planned: 42 },
  { name: 'Sophie Laurent', completed: 48, planned: 50 },
  { name: 'Claire Moreau', completed: 41, planned: 44 },
];

const upcomingSchedule = [
  {
    id: '1',
    technician: 'Jean Martin',
    workOrder: 'Réparation chaudière',
    location: 'Bâtiment A',
    time: '09:00 - 11:00',
    date: 'Aujourd\'hui',
  },
  {
    id: '2',
    technician: 'Marie Dubois',
    workOrder: 'Maintenance climatisation',
    location: 'Tour B - Étage 5',
    time: '10:30 - 12:30',
    date: 'Aujourd\'hui',
  },
  {
    id: '3',
    technician: 'Pierre Bernard',
    workOrder: 'Inspection chaufferie',
    location: 'Sous-sol',
    time: '14:00 - 16:00',
    date: 'Aujourd\'hui',
  },
  {
    id: '4',
    technician: 'Sophie Laurent',
    workOrder: 'Dépannage ascenseur',
    location: 'Tour C',
    time: '15:00 - 17:00',
    date: 'Aujourd\'hui',
  },
];

export default function TechniciansPage() {
  const availableCount = technicians.filter((t) => t.status === 'available').length;
  const busyCount = technicians.filter((t) => t.status === 'busy').length;
  const totalActiveWorkOrders = technicians.reduce((sum, t) => sum + t.activeWorkOrders, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Techniciens"
        description="Gérez votre équipe et leurs interventions"
      >
        <Button asChild>
          <Link href="/technicians/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau technicien
          </Link>
        </Button>
      </PageHeader>

      {/* KPIs */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIWidget
            title="Total techniciens"
            value={technicians.length}
            icon={Users}
            color="default"
          />
          <KPIWidget
            title="Disponibles"
            value={availableCount}
            icon={Users}
            color="success"
            description={`${busyCount} occupés`}
          />
          <KPIWidget
            title="Interventions actives"
            value={totalActiveWorkOrders}
            icon={Calendar}
            color="info"
          />
          <KPIWidget
            title="Taux de complétion"
            value="94.2%"
            icon={TrendingUp}
            trend={{ value: 2.4, direction: 'up' }}
            color="success"
          />
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <SplitView
          ratio="2:1"
          sticky="right"
          left={
            <div className="space-y-6">
              {/* Technicians Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Équipe</CardTitle>
                  <CardDescription>
                    Liste de tous les techniciens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {technicians.map((technician) => (
                      <TechnicianCard
                        key={technician.id}
                        technician={technician}
                        onView={() => {}}
                        onAssign={() => {}}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <BarChart
                data={performanceData}
                dataKeys={[
                  { key: 'completed', label: 'Terminées', color: '#22c55e' },
                  { key: 'planned', label: 'Planifiées', color: '#3b82f6' },
                ]}
                xAxisKey="name"
                title="Performance de l'équipe"
                description="Interventions ce mois-ci"
                showLegend={true}
              />
            </div>
          }
          right={
            <div className="space-y-6">
              {/* Upcoming Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Planning du jour</CardTitle>
                  <CardDescription>Interventions à venir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSchedule.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {schedule.technician
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm font-medium">{schedule.technician}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {schedule.workOrder}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{schedule.location}</span>
                          <span>•</span>
                          <span>{schedule.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        {schedule.date}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Temps de réponse moyen
                      </span>
                      <span className="text-sm font-semibold">2.3h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Interventions/jour
                      </span>
                      <span className="text-sm font-semibold">3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Satisfaction client
                      </span>
                      <span className="text-sm font-semibold text-green-600">4.8/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Taux de première résolution
                      </span>
                      <span className="text-sm font-semibold text-green-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          }
        />
      </Section>
    </div>
  );
}