import { Download, TrendingUp, Calendar, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Section } from '@/shared/components/layout/section';
import { AreaChart } from '@/shared/components/charts/area-chart';
import { BarChart } from '@/shared/components/charts/bar-chart';
import { PieChart } from '@/shared/components/charts/pie-chart';
import { KPIWidget } from '@/shared/components/business/kpi-widget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';

// 📊 Données Mock
const yearlyTrend = [
  { month: 'Jan', interventions: 45, preventive: 28, corrective: 17 },
  { month: 'Fév', interventions: 52, preventive: 30, corrective: 22 },
  { month: 'Mar', interventions: 48, preventive: 29, corrective: 19 },
  { month: 'Avr', interventions: 61, preventive: 35, corrective: 26 },
  { month: 'Mai', interventions: 55, preventive: 32, corrective: 23 },
  { month: 'Juin', interventions: 67, preventive: 38, corrective: 29 },
  { month: 'Juil', interventions: 58, preventive: 34, corrective: 24 },
  { month: 'Août', interventions: 42, preventive: 26, corrective: 16 },
  { month: 'Sept', interventions: 64, preventive: 37, corrective: 27 },
  { month: 'Oct', interventions: 70, preventive: 40, corrective: 30 },
  { month: 'Nov', interventions: 65, preventive: 38, corrective: 27 },
  { month: 'Déc', interventions: 50, preventive: 30, corrective: 20 },
];

const interventionsByPriority = [
  { name: 'Basse', value: 156 },
  { name: 'Moyenne', value: 234 },
  { name: 'Haute', value: 178 },
  { name: 'Critique', value: 89 },
];

const interventionsByStatus = [
  { name: 'Terminées', value: 520 },
  { name: 'En cours', value: 45 },
  { name: 'Planifiées', value: 78 },
  { name: 'En attente', value: 23 },
];

const technicianPerformance = [
  { name: 'Jean M.', completed: 85, avgTime: 2.5, satisfaction: 4.8 },
  { name: 'Marie D.', completed: 92, avgTime: 2.8, satisfaction: 4.9 },
  { name: 'Pierre B.', completed: 78, avgTime: 2.3, satisfaction: 4.7 },
  { name: 'Sophie L.', completed: 88, avgTime: 2.6, satisfaction: 4.8 },
  { name: 'Luc P.', completed: 73, avgTime: 2.9, satisfaction: 4.6 },
  { name: 'Claire M.', completed: 81, avgTime: 2.4, satisfaction: 4.9 },
];

const equipmentMaintenance = [
  { type: 'Chaudières', planned: 45, completed: 42, pending: 3 },
  { type: 'Ascenseurs', planned: 38, completed: 35, pending: 3 },
  { type: 'Climatisation', planned: 52, completed: 48, pending: 4 },
  { type: 'Électricité', planned: 61, completed: 58, pending: 3 },
  { type: 'Plomberie', planned: 48, completed: 45, pending: 3 },
];

const costAnalysis = [
  { month: 'Jan', labor: 12500, materials: 8300, total: 20800 },
  { month: 'Fév', labor: 14200, materials: 9100, total: 23300 },
  { month: 'Mar', labor: 13800, materials: 8800, total: 22600 },
  { month: 'Avr', labor: 15600, materials: 10200, total: 25800 },
  { month: 'Mai', labor: 14900, materials: 9600, total: 24500 },
  { month: 'Juin', labor: 16800, materials: 11200, total: 28000 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Rapports & Analyses"
        description="Visualisez les performances et tendances de votre activité"
      >
        <div className="flex items-center gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Année 2024</SelectItem>
              <SelectItem value="2023">Année 2023</SelectItem>
              <SelectItem value="2022">Année 2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Période personnalisée
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
        </div>
      </PageHeader>

      {/* KPIs */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIWidget
            title="Total interventions"
            value="677"
            icon={FileText}
            trend={{ value: 15, direction: 'up', label: 'vs. année précédente' }}
            color="default"
          />
          <KPIWidget
            title="Taux de complétion"
            value="96.5%"
            icon={TrendingUp}
            trend={{ value: 2.3, direction: 'up', label: 'vs. année précédente' }}
            color="success"
          />
          <KPIWidget
            title="Coût moyen"
            value="24 350 €"
            description="Par mois"
            color="info"
          />
          <KPIWidget
            title="Satisfaction client"
            value="4.8/5"
            trend={{ value: 0.3, direction: 'up', label: 'vs. année précédente' }}
            color="success"
          />
        </div>
      </Section>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="technicians">Techniciens</TabsTrigger>
          <TabsTrigger value="equipment">Équipements</TabsTrigger>
          <TabsTrigger value="costs">Coûts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Section>
            <div className="grid gap-6 lg:grid-cols-2">
              <AreaChart
                data={yearlyTrend}
                dataKey="interventions"
                xAxisKey="month"
                title="Évolution annuelle"
                description="Nombre d'interventions par mois"
                gradient={true}
              />
              <div className="grid gap-6">
                <PieChart
                  data={interventionsByStatus}
                  title="Répartition par statut"
                  description="État des interventions"
                  innerRadius={60}
                  height={200}
                />
              </div>
            </div>
          </Section>

          <Section>
            <BarChart
              data={yearlyTrend}
              dataKeys={[
                { key: 'preventive', label: 'Préventive', color: '#3b82f6' },
                { key: 'corrective', label: 'Corrective', color: '#f97316' },
              ]}
              xAxisKey="month"
              title="Préventive vs Corrective"
              description="Comparaison mensuelle des types d'intervention"
              showLegend={true}
            />
          </Section>
        </TabsContent>

        {/* Interventions Tab */}
        <TabsContent value="interventions" className="space-y-6">
          <Section>
            <div className="grid gap-6 lg:grid-cols-2">
              <PieChart
                data={interventionsByPriority}
                title="Répartition par priorité"
                description="Distribution des niveaux de priorité"
                colors={['#3b82f6', '#eab308', '#f97316', '#ef4444']}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques détaillées</CardTitle>
                  <CardDescription>
                    Analyse approfondie des interventions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Temps de réponse moyen
                      </span>
                      <span className="text-sm font-semibold">2.5h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Durée moyenne d'intervention
                      </span>
                      <span className="text-sm font-semibold">3.2h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Taux de première résolution
                      </span>
                      <span className="text-sm font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Interventions d'urgence
                      </span>
                      <span className="text-sm font-semibold">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Taux de planification
                      </span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Délai moyen de résolution
                      </span>
                      <span className="text-sm font-semibold">1.8 jours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section>
            <BarChart
              data={yearlyTrend}
              dataKeys={[
                { key: 'interventions', label: 'Total', color: '#3b82f6' },
              ]}
              xAxisKey="month"
              title="Volume mensuel"
              description="Nombre total d'interventions par mois"
            />
          </Section>
        </TabsContent>

        {/* Technicians Tab */}
        <TabsContent value="technicians" className="space-y-6">
          <Section>
            <BarChart
              data={technicianPerformance}
              dataKeys={[
                { key: 'completed', label: 'Interventions terminées', color: '#22c55e' },
              ]}
              xAxisKey="name"
              title="Performance des techniciens"
              description="Nombre d'interventions terminées"
            />
          </Section>

          <Section>
            <div className="grid gap-6 lg:grid-cols-3">
              {technicianPerformance.map((tech) => (
                <Card key={tech.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{tech.name}</CardTitle>
                    <CardDescription>Performance détaillée</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Interventions terminées
                        </span>
                        <span className="font-semibold text-green-600">
                          {tech.completed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Temps moyen</span>
                        <span className="font-semibold">{tech.avgTime}h</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Satisfaction</span>
                        <span className="font-semibold text-green-600">
                          {tech.satisfaction}/5
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section>
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de l'équipe</CardTitle>
                <CardDescription>Vue d'ensemble de la performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Productivité moyenne
                    </p>
                    <p className="text-2xl font-bold">83 int/mois</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Taux d'utilisation</p>
                    <p className="text-2xl font-bold text-green-600">89%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Formation (heures)</p>
                    <p className="text-2xl font-bold">24h</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Taux de disponibilité</p>
                    <p className="text-2xl font-bold text-green-600">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>

        {/* Equipment Tab */}
        <TabsContent value="equipment" className="space-y-6">
          <Section>
            <BarChart
              data={equipmentMaintenance}
              dataKeys={[
                { key: 'completed', label: 'Terminées', color: '#22c55e' },
                { key: 'pending', label: 'En attente', color: '#eab308' },
              ]}
              xAxisKey="type"
              title="Maintenances par type d'équipement"
              description="État des maintenances préventives"
              showLegend={true}
            />
          </Section>

          <Section>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Taux de disponibilité</CardTitle>
                  <CardDescription>Par catégorie d'équipement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {equipmentMaintenance.map((eq) => {
                    const availability = (eq.completed / eq.planned) * 100;
                    return (
                      <div key={eq.type} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{eq.type}</span>
                          <span className="text-muted-foreground">
                            {availability.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${availability}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métriques clés</CardTitle>
                  <CardDescription>Indicateurs de maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total équipements
                      </span>
                      <span className="text-sm font-semibold">234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Équipements actifs
                      </span>
                      <span className="text-sm font-semibold text-green-600">228</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        En maintenance
                      </span>
                      <span className="text-sm font-semibold text-yellow-600">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        MTBF (Moyenne)
                      </span>
                      <span className="text-sm font-semibold">2400h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        MTTR (Moyenne)
                      </span>
                      <span className="text-sm font-semibold">3.2h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Taux de panne
                      </span>
                      <span className="text-sm font-semibold text-green-600">2.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>

        {/* Costs Tab */}
        <TabsContent value="costs" className="space-y-6">
          <Section>
            <BarChart
              data={costAnalysis}
              dataKeys={[
                { key: 'labor', label: 'Main d\'œuvre', color: '#3b82f6' },
                { key: 'materials', label: 'Matériaux', color: '#f97316' },
              ]}
              xAxisKey="month"
              title="Analyse des coûts"
              description="Répartition mensuelle des dépenses"
              showLegend={true}
            />
          </Section>

          <Section>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Coûts totaux</CardTitle>
                  <CardDescription>Derniers 6 mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">144 800 €</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Main d'œuvre</span>
                        <span className="font-semibold">87 800 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Matériaux</span>
                        <span className="font-semibold">57 000 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Coût moyen/mois</span>
                        <span className="font-semibold">24 133 €</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Économies réalisées</CardTitle>
                  <CardDescription>Grâce à la maintenance préventive</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-green-600">28 500 €</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Pannes évitées
                        </span>
                        <span className="font-semibold text-green-600">18 000 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Optimisation stocks
                        </span>
                        <span className="font-semibold text-green-600">7 500 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Durée de vie prolongée
                        </span>
                        <span className="font-semibold text-green-600">3 000 €</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget vs Réalisé</CardTitle>
                  <CardDescription>Suivi budgétaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Budget annuel</span>
                        <span className="font-semibold">300 000 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Dépensé (6 mois)</span>
                        <span className="font-semibold">144 800 €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reste disponible</span>
                        <span className="font-semibold text-green-600">155 200 €</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Utilisation</span>
                        <span className="font-medium">48.3%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: '48.3%' }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section>
            <Card>
              <CardHeader>
                <CardTitle>Analyse détaillée des coûts</CardTitle>
                <CardDescription>
                  Répartition par catégorie de dépenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">Salaires techniciens</p>
                    <p className="text-2xl font-bold">72 000 €</p>
                    <p className="text-xs text-green-600">49.7% du total</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">Pièces détachées</p>
                    <p className="text-2xl font-bold">42 500 €</p>
                    <p className="text-xs text-muted-foreground">29.3% du total</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">Sous-traitance</p>
                    <p className="text-2xl font-bold">18 300 €</p>
                    <p className="text-xs text-muted-foreground">12.6% du total</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">Autres frais</p>
                    <p className="text-2xl font-bold">12 000 €</p>
                    <p className="text-xs text-muted-foreground">8.3% du total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}