import { Wrench, Package, Calendar, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/shared/components/layout/page-header';
import { StatsCard } from '@/shared/components/ui/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function DashboardPage() {
  // Mock data - À remplacer par de vraies données
  const stats = {
    totalWorkOrders: 156,
    pendingWorkOrders: 23,
    completedWorkOrders: 98,
    totalAssets: 234,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Vue d'ensemble de votre activité"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Interventions totales"
          value={stats.totalWorkOrders}
          icon={Wrench}
          trend={{ value: 12, isPositive: true }}
          description="vs. mois dernier"
        />
        <StatsCard
          title="En attente"
          value={stats.pendingWorkOrders}
          icon={Calendar}
          description="À planifier"
        />
        <StatsCard
          title="Terminées"
          value={stats.completedWorkOrders}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          description="Ce mois-ci"
        />
        <StatsCard
          title="Équipements"
          value={stats.totalAssets}
          icon={Package}
          description="Total actifs"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interventions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Liste des interventions récentes à venir...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Équipements nécessitant une attention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Liste des équipements à surveiller...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}