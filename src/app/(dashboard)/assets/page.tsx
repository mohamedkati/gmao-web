import { Plus, Download, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Section } from '@/shared/components/layout/section';
import { AssetCard } from '@/shared/components/business/asset-card';
import { EquipmentStatus } from '@/shared/components/business/equipment-status';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcnui/select';

// 📊 Données Mock
const assets = [
  {
    id: '1',
    name: 'Chaudière Principale',
    type: 'Chauffage',
    status: 'active' as const,
    location: 'Bâtiment A - Sous-sol',
    lastMaintenance: new Date('2024-10-15'),
    nextMaintenance: new Date('2024-12-15'),
  },
  {
    id: '2',
    name: 'Ascenseur Tour B',
    type: 'Transport vertical',
    status: 'maintenance' as const,
    location: 'Tour B - Tous étages',
    lastMaintenance: new Date('2024-11-01'),
    nextMaintenance: new Date('2024-11-15'),
  },
  {
    id: '3',
    name: 'Climatisation Étage 3',
    type: 'Climatisation',
    status: 'active' as const,
    location: 'Bâtiment C - Étage 3',
    lastMaintenance: new Date('2024-09-20'),
    nextMaintenance: new Date('2025-01-20'),
  },
  {
    id: '4',
    name: 'Groupe Électrogène',
    type: 'Énergie',
    status: 'active' as const,
    location: 'Extérieur - Local technique',
    lastMaintenance: new Date('2024-10-01'),
    nextMaintenance: new Date('2025-01-01'),
  },
  {
    id: '5',
    name: 'Système d\'arrosage',
    type: 'Eau',
    status: 'inactive' as const,
    location: 'Jardins',
    lastMaintenance: new Date('2024-08-15'),
    nextMaintenance: new Date('2025-03-15'),
  },
  {
    id: '6',
    name: 'Ventilation Bureau',
    type: 'Ventilation',
    status: 'active' as const,
    location: 'Bâtiment B - Étage 2',
    lastMaintenance: new Date('2024-10-10'),
    nextMaintenance: new Date('2024-12-10'),
  },
];

const detailedEquipment = [
  {
    name: 'Chaudière Principale',
    status: 'operational' as const,
    health: 92,
    uptime: '99.8%',
    lastCheck: new Date(Date.now() - 1000 * 60 * 60 * 2),
    metrics: [
      { label: 'Température', value: '65°C', status: 'good' as const },
      { label: 'Pression', value: '2.3 bar', status: 'good' as const },
      { label: 'Débit', value: '450 L/h', status: 'good' as const },
      { label: 'Rendement', value: '94%', status: 'good' as const },
    ],
  },
  {
    name: 'Ascenseur Tour B',
    status: 'warning' as const,
    health: 68,
    uptime: '98.2%',
    lastCheck: new Date(Date.now() - 1000 * 60 * 30),
    metrics: [
      { label: 'Cycles/jour', value: '1240', status: 'warning' as const },
      { label: 'Vitesse', value: '1.5 m/s', status: 'good' as const },
      { label: 'Charge max', value: '850 kg', status: 'good' as const },
      { label: 'Vibrations', value: 'Élevées', status: 'warning' as const },
    ],
  },
  {
    name: 'Climatisation Étage 3',
    status: 'operational' as const,
    health: 88,
    uptime: '99.5%',
    lastCheck: new Date(Date.now() - 1000 * 60 * 60),
    metrics: [
      { label: 'Température', value: '22°C', status: 'good' as const },
      { label: 'Humidité', value: '45%', status: 'good' as const },
      { label: 'Débit d\'air', value: '2800 m³/h', status: 'good' as const },
      { label: 'Filtre', value: 'Propre', status: 'good' as const },
    ],
  },
];

export default function AssetsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Équipements"
        description="Gérez et surveillez tous vos équipements"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button asChild>
            <Link href="/assets/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel équipement
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Tabs */}
      <Tabs defaultValue="grid" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Vue Grille</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenances</TabsTrigger>
          </TabsList>

          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actifs</SelectItem>
              <SelectItem value="maintenance">En maintenance</SelectItem>
              <SelectItem value="inactive">Inactifs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-6">
          <Section>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Monitoring View */}
        <TabsContent value="monitoring" className="space-y-6">
          <Section
            title="Surveillance en temps réel"
            description="État actuel des équipements critiques"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {detailedEquipment.map((equipment, index) => (
                <EquipmentStatus key={index} {...equipment} />
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Maintenance Schedule */}
        <TabsContent value="maintenance" className="space-y-6">
          <Section
            title="Planning des maintenances"
            description="Maintenances préventives à venir"
          >
            <div className="space-y-4">
              {assets
                .filter((a) => a.nextMaintenance)
                .sort((a, b) => 
                  new Date(a.nextMaintenance!).getTime() - 
                  new Date(b.nextMaintenance!).getTime()
                )
                .map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">{asset.name}</h4>
                      <p className="text-sm text-muted-foreground">{asset.location}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">
                        {new Date(asset.nextMaintenance!).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dans{' '}
                        {Math.ceil(
                          (new Date(asset.nextMaintenance!).getTime() - Date.now()) /
                            (1000 * 60 * 60 * 24)
                        )}{' '}
                        jours
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/assets/${asset.id}`}>Voir</Link>
                    </Button>
                  </div>
                ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}