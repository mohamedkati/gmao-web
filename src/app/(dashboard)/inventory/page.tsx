'use client';

import { useState } from 'react';
import { Plus, Download, Search, Package, AlertTriangle, TrendingDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Section } from '@/shared/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/shadcnui/progress';
import { InventoryAlert } from '@/shared/components/business/inventory-alert';
import { KPIWidget } from '@/shared/components/business/kpi-widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/tabs';
import { BarChart } from '@/shared/components/charts/bar-chart';
import { cn } from '@/shared/lib/utils/cn';

// 📊 Données Mock
const inventoryItems = [
  {
    id: '1',
    name: 'Filtre à air',
    category: 'Filtration',
    currentStock: 0,
    minStock: 5,
    maxStock: 20,
    unit: 'unités',
    unitPrice: 15.5,
    supplier: 'Fournisseur A',
    location: 'Entrepôt A - Étagère 3',
  },
  {
    id: '2',
    name: 'Joint étanchéité DN25',
    category: 'Plomberie',
    currentStock: 3,
    minStock: 10,
    maxStock: 30,
    unit: 'unités',
    unitPrice: 8.2,
    supplier: 'Fournisseur B',
    location: 'Entrepôt A - Étagère 5',
  },
  {
    id: '3',
    name: 'Huile hydraulique 5L',
    category: 'Lubrification',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: 'litres',
    unitPrice: 45.0,
    supplier: 'Fournisseur C',
    location: 'Entrepôt B - Zone 2',
  },
  {
    id: '4',
    name: 'Courroie transmission',
    category: 'Mécanique',
    currentStock: 15,
    minStock: 8,
    maxStock: 25,
    unit: 'unités',
    unitPrice: 32.5,
    supplier: 'Fournisseur A',
    location: 'Entrepôt A - Étagère 7',
  },
  {
    id: '5',
    name: 'Ampoule LED E27 12W',
    category: 'Électricité',
    currentStock: 45,
    minStock: 30,
    maxStock: 100,
    unit: 'unités',
    unitPrice: 6.5,
    supplier: 'Fournisseur D',
    location: 'Entrepôt A - Étagère 1',
  },
  {
    id: '6',
    name: 'Contacteur 20A',
    category: 'Électricité',
    currentStock: 12,
    minStock: 10,
    maxStock: 30,
    unit: 'unités',
    unitPrice: 28.0,
    supplier: 'Fournisseur D',
    location: 'Entrepôt A - Étagère 2',
  },
  {
    id: '7',
    name: 'Robinet d\'arrêt 1/2"',
    category: 'Plomberie',
    currentStock: 18,
    minStock: 15,
    maxStock: 40,
    unit: 'unités',
    unitPrice: 12.5,
    supplier: 'Fournisseur B',
    location: 'Entrepôt A - Étagère 4',
  },
  {
    id: '8',
    name: 'Thermostat programmable',
    category: 'Chauffage',
    currentStock: 5,
    minStock: 8,
    maxStock: 20,
    unit: 'unités',
    unitPrice: 85.0,
    supplier: 'Fournisseur E',
    location: 'Entrepôt B - Zone 1',
  },
];

const consumptionData = [
  { month: 'Jan', filtres: 12, joints: 25, huile: 18, courroies: 8 },
  { month: 'Fév', filtres: 15, joints: 28, huile: 22, courroies: 10 },
  { month: 'Mar', filtres: 10, joints: 20, huile: 15, courroies: 6 },
  { month: 'Avr', filtres: 18, joints: 32, huile: 25, courroies: 12 },
  { month: 'Mai', filtres: 14, joints: 26, huile: 20, courroies: 9 },
  { month: 'Juin', filtres: 16, joints: 30, huile: 23, courroies: 11 },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const lowStockItems = inventoryItems.filter(
    (item) => item.currentStock <= item.minStock
  );

  const criticalItems = lowStockItems.filter((item) => item.currentStock === 0);

  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.currentStock * item.unitPrice,
    0
  );

  const getStockStatus = (item: typeof inventoryItems[0]) => {
    const percentage = (item.currentStock / item.maxStock) * 100;
    if (item.currentStock === 0) return { label: 'Rupture', color: 'destructive' };
    if (percentage <= (item.minStock / item.maxStock) * 100)
      return { label: 'Stock faible', color: 'warning' };
    if (percentage >= 80) return { label: 'Stock suffisant', color: 'success' };
    return { label: 'Stock normal', color: 'default' };
  };

  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Gestion du Stock"
        description="Suivez et gérez votre inventaire de pièces détachées"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un article
          </Button>
        </div>
      </PageHeader>

      {/* KPIs */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPIWidget
            title="Articles en stock"
            value={inventoryItems.length}
            icon={Package}
            color="default"
          />
          <KPIWidget
            title="Valeur totale"
            value={`${totalValue.toLocaleString('fr-FR')} €`}
            icon={TrendingDown}
            color="info"
          />
          <KPIWidget
            title="Alertes stock faible"
            value={lowStockItems.length}
            icon={AlertTriangle}
            color="warning"
            description={`dont ${criticalItems.length} en rupture`}
          />
          <KPIWidget
            title="Commandes en cours"
            value="5"
            icon={Package}
            color="info"
          />
        </div>
      </Section>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Section>
          <InventoryAlert items={lowStockItems} />
        </Section>
      )}

      {/* Tabs */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="consumption">Consommation</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Items Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const status = getStockStatus(item);
              const stockPercentage = (item.currentStock / item.maxStock) * 100;

              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge
                        variant={
                          status.color === 'destructive'
                            ? 'destructive'
                            : status.color === 'warning'
                            ? 'outline'
                            : 'secondary'
                        }
                        className={cn(
                          status.color === 'warning' &&
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
                          status.color === 'success' &&
                            'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                        )}
                      >
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stock Level */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stock actuel</span>
                        <span className="font-semibold">
                          {item.currentStock} / {item.maxStock} {item.unit}
                        </span>
                      </div>
                      <Progress
                        value={stockPercentage}
                        className="h-2"
                        // indicatorClassName={cn(
                        //   item.currentStock === 0 && 'bg-red-500',
                        //   item.currentStock <= item.minStock &&
                        //     item.currentStock > 0 &&
                        //     'bg-yellow-500',
                        //   item.currentStock > item.minStock && 'bg-green-500'
                        // )}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Stock minimum</span>
                        <span>
                          {item.minStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prix unitaire</span>
                        <span className="font-medium">
                          {item.unitPrice.toFixed(2)} €
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Valeur totale</span>
                        <span className="font-medium text-primary">
                          {(item.currentStock * item.unitPrice).toFixed(2)} €
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">{item.location}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Fournisseur: {item.supplier}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                      {item.currentStock <= item.minStock && (
                        <Button size="sm" className="flex-1">
                          Commander
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Consumption Tab */}
        <TabsContent value="consumption" className="space-y-6">
          <BarChart
            data={consumptionData}
            dataKeys={[
              { key: 'filtres', label: 'Filtres', color: '#3b82f6' },
              { key: 'joints', label: 'Joints', color: '#f97316' },
              { key: 'huile', label: 'Huile', color: '#22c55e' },
              { key: 'courroies', label: 'Courroies', color: '#a855f7' },
            ]}
            xAxisKey="month"
            title="Consommation mensuelle"
            description="Utilisation des pièces les plus courantes"
            showLegend={true}
          />

          <Card>
            <CardHeader>
              <CardTitle>Statistiques de consommation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Consommation moyenne</p>
                  <p className="text-2xl font-bold">45 articles/mois</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Article le plus utilisé</p>
                  <p className="text-2xl font-bold">Joints</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Taux de rotation</p>
                  <p className="text-2xl font-bold">2.3/mois</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Coût moyen/mois</p>
               <p className="text-2xl font-bold">1,850 €</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commandes en cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'CMD-001',
                    supplier: 'Fournisseur A',
                    items: 3,
                    amount: 245.5,
                    status: 'En transit',
                    delivery: '2024-11-12',
                  },
                  {
                    id: 'CMD-002',
                    supplier: 'Fournisseur B',
                    items: 5,
                    amount: 380.0,
                    status: 'En préparation',
                    delivery: '2024-11-15',
                  },
                  {
                    id: 'CMD-003',
                    supplier: 'Fournisseur C',
                    items: 2,
                    amount: 450.0,
                    status: 'En transit',
                    delivery: '2024-11-10',
                  },
                  {
                    id: 'CMD-004',
                    supplier: 'Fournisseur D',
                    items: 8,
                    amount: 195.0,
                    status: 'Confirmée',
                    delivery: '2024-11-18',
                  },
                  {
                    id: 'CMD-005',
                    supplier: 'Fournisseur E',
                    items: 1,
                    amount: 85.0,
                    status: 'En préparation',
                    delivery: '2024-11-14',
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{order.id}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            order.status === 'En transit' &&
                              'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
                            order.status === 'En préparation' &&
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
                            order.status === 'Confirmée' &&
                              'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                          )}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.supplier}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{order.items} articles</span>
                        <span>•</span>
                        <span>Livraison prévue: {new Date(order.delivery).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold">{order.amount.toFixed(2)} €</p>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}