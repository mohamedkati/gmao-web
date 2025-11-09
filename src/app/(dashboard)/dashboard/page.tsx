import { Wrench, Package, Calendar, CheckCircle, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Section } from '@/shared/components/layout/section';
import { SplitView } from '@/shared/components/layout/split-view';
import { KPIWidget } from '@/shared/components/business/kpi-widget';
import { AreaChart } from '@/shared/components/charts/area-chart';
import { BarChart } from '@/shared/components/charts/bar-chart';
import { PieChart } from '@/shared/components/charts/pie-chart';
import { ActivityLog } from '@/shared/components/business/activity-log';
import { EquipmentStatus } from '@/shared/components/business/equipment-status';
import { InventoryAlert } from '@/shared/components/business/inventory-alert';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

// 📊 Données Mock
const kpiData = {
  totalWorkOrders: 156,
  pendingWorkOrders: 23,
  completedWorkOrders: 98,
  totalAssets: 234,
  activeContracts: 45,
  availableTechnicians: 12,
};

const monthlyWorkOrders = [
  { month: 'Jan', value: 45 },
  { month: 'Fév', value: 52 },
  { month: 'Mar', value: 48 },
  { month: 'Avr', value: 61 },
  { month: 'Mai', value: 55 },
  { month: 'Juin', value: 67 },
];

const workOrdersByType = [
  { name: 'Préventive', value: 65 },
  { name: 'Corrective', value: 45 },
  { name: 'Urgence', value: 20 },
  { name: 'Inspection', value: 26 },
];

const priorityComparison = [
  { month: 'Jan', critique: 5, haute: 12, moyenne: 18, basse: 10 },
  { month: 'Fév', critique: 8, haute: 15, moyenne: 19, basse: 10 },
  { month: 'Mar', critique: 4, haute: 14, moyenne: 20, basse: 10 },
  { month: 'Avr', critique: 10, haute: 18, moyenne: 23, basse: 10 },
  { month: 'Mai', critique: 6, haute: 16, moyenne: 23, basse: 10 },
  { month: 'Juin', critique: 9, haute: 20, moyenne: 28, basse: 10 },
];

const recentActivities = [
  {
    id: '1',
    type: 'created' as const,
    title: 'Nouvelle intervention créée',
    description: 'Réparation chaudière - Bâtiment A',
    user: { name: 'Marie Dubois', avatar: undefined },
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    type: 'completed' as const,
    title: 'Intervention terminée',
    description: 'Maintenance ascenseur - Tour B',
    user: { name: 'Jean Martin', avatar: undefined },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '3',
    type: 'assigned' as const,
    title: 'Technicien assigné',
    description: 'Pierre Bernard assigné à Climatisation Étage 3',
    user: { name: 'Sophie Laurent', avatar: undefined },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '4',
    type: 'updated' as const,
    title: 'Intervention mise à jour',
    description: 'Changement de priorité : Haute → Critique',
    user: { name: 'Luc Petit', avatar: undefined },
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: '5',
    type: 'commented' as const,
    title: 'Nouveau commentaire',
    description: 'Pièce de rechange commandée',
    user: { name: 'Marie Dubois', avatar: undefined },
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
];

const criticalEquipment = [
  {
    name: 'Chaudière Principale',
    status: 'operational' as const,
    health: 92,
    uptime: '99.8%',
    lastCheck: new Date(Date.now() - 1000 * 60 * 60 * 2),
    metrics: [
      { label: 'Température', value: '65°C', status: 'good' as const },
      { label: 'Pression', value: '2.3 bar', status: 'good' as const },
    ],
  },
  {
    name: 'Ascenseur Tour A',
    status: 'warning' as const,
    health: 68,
    uptime: '98.2%',
    lastCheck: new Date(Date.now() - 1000 * 60 * 30),
    metrics: [
      { label: 'Cycles', value: '1240/j', status: 'warning' as const },
      { label: 'Vitesse', value: '1.5 m/s', status: 'good' as const },
    ],
  },
];

const lowStockItems = [
  { id: '1', name: 'Filtre à air', currentStock: 0, minStock: 5, unit: 'unités' },
  { id: '2', name: 'Joint étanchéité', currentStock: 3, minStock: 10, unit: 'unités' },
  { id: '3', name: 'Huile hydraulique', currentStock: 8, minStock: 15, unit: 'litres' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Vue d'ensemble de votre activité de maintenance"
      >
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Exporter le rapport
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIWidget
            title="Interventions totales"
            value={kpiData.totalWorkOrders}
            icon={Wrench}
            trend={{ value: 12, direction: 'up', label: 'vs. mois dernier' }}
            color="default"
          />
          <KPIWidget
            title="En attente"
            value={kpiData.pendingWorkOrders}
            icon={Calendar}
            description="À planifier"
            color="warning"
          />
          <KPIWidget
            title="Terminées ce mois"
            value={kpiData.completedWorkOrders}
            icon={CheckCircle}
            trend={{ value: 8, direction: 'up', label: 'vs. mois dernier' }}
            color="success"
          />
          <KPIWidget
            title="Techniciens disponibles"
            value={kpiData.availableTechnicians}
            icon={Users}
            description={`Sur ${kpiData.availableTechnicians + 3} total`}
            color="info"
          />
        </div>
      </Section>

      {/* Alerts */}
      <Section>
        <InventoryAlert items={lowStockItems} />
      </Section>

      {/* Main Content */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tendance des interventions */}
          <AreaChart
            data={monthlyWorkOrders}
            dataKey="value"
            xAxisKey="month"
            title="Interventions mensuelles"
            description="Évolution sur les 6 derniers mois"
            gradient={true}
          />

          {/* Répartition par type */}
          <PieChart
            data={workOrdersByType}
            title="Répartition par type"
            description="Distribution des interventions"
            innerRadius={60}
          />
        </div>
      </Section>

      {/* Priority Breakdown */}
      <Section>
        <BarChart
          data={priorityComparison}
          dataKeys={[
            { key: 'critique', label: 'Critique', color: '#ef4444' },
            { key: 'haute', label: 'Haute', color: '#f97316' },
            { key: 'moyenne', label: 'Moyenne', color: '#eab308' },
            { key: 'basse', label: 'Basse', color: '#3b82f6' },
          ]}
          xAxisKey="month"
          title="Interventions par priorité"
          description="Répartition mensuelle selon la priorité"
          showLegend={true}
        />
      </Section>

      {/* Bottom Section */}
      <Section>
        <SplitView
          ratio="2:1"
          sticky="right"
          left={
            <div className="space-y-6">
              {/* Recent Activity */}
              <ActivityLog activities={recentActivities} maxHeight="600px" />
            </div>
          }
          right={
            <div className="space-y-6">
              {/* Critical Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Équipements à surveiller
                  </CardTitle>
                  <CardDescription>État des équipements critiques</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalEquipment.map((equipment, index) => (
                    <EquipmentStatus key={index} {...equipment} />
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Statistiques rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Équipements actifs</span>
                      <span className="font-semibold">{kpiData.totalAssets}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Contrats en cours</span>
                      <span className="font-semibold">{kpiData.activeContracts}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Taux de résolution</span>
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Temps de réponse moyen</span>
                      <span className="font-semibold">2.3h</span>
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