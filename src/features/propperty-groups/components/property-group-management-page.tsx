'use client';

import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type { LucideIcon } from 'lucide-react';
import { Building2, Layers, Map, Sparkles, Wallet } from 'lucide-react';
import { StatsCard } from '@/shared/components/ui/stats-card';
import { Button } from '@/shared/components/ui/button';
import { PropertyGroupTable } from './property-group-table';
import { PropertyGroupDetail } from './property-group-detail';
import { PropertyGroupFormDrawer } from './property-group-form-drawer';
import { usePropertyGroupStore } from '../store/property-group.store';
import {
  PropertyGroup,
  PropertyGroupContact,
  PropertyGroupStatus,
  PropertyGroupType,
  PreferredContactMethod,
  ContactRole,
  PersonType,
} from '../types/property-group';
import { formatCurrency } from '../utils/property-group-formatters';

const createEmptyContact = (groupId: string): PropertyGroupContact => ({
  id: nanoid(),
  propertyGroupId: groupId,
  role: ContactRole.Assistant,
  personType: PersonType.Company,
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'contact@example.com',
  isPrimary: true,
  receivesInvoices: true,
  receivesReports: true,
  receivesAlerts: true,
  preferredContactMethod: PreferredContactMethod.Email,
});

const createNewPropertyGroup = (): PropertyGroup => {
  const id = nanoid();
  const reference = `PG-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;

  return {
    id,
    reference,
    name: 'Nouveau groupe immobilier',
    description: "Décrivez la stratégie et le périmètre du groupe immobilier...",
    type: PropertyGroupType.PropertyManagementCompany,
    status: PropertyGroupStatus.Prospect,
    consolidatedBilling: false,
    paymentTermsDays: 45,
    totalCustomers: 0,
    totalSites: 0,
    totalUnits: 0,
    totalAnnualRevenue: 0,
    autoRenewalFrameworkContract: false,
    contacts: [createEmptyContact(id)],
  };
};

export function PropertyGroupManagementPage() {
  const propertyGroups = usePropertyGroupStore((state) => state.propertyGroups);
  const filters = usePropertyGroupStore((state) => state.filters);
  const setSelectedGroup = usePropertyGroupStore((state) => state.setSelectedGroup);
  const selectedGroupId = usePropertyGroupStore((state) => state.selectedGroupId);
  const addPropertyGroup = usePropertyGroupStore((state) => state.addPropertyGroup);
  const updatePropertyGroup = usePropertyGroupStore((state) => state.updatePropertyGroup);

  const [formState, setFormState] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    initialGroup?: PropertyGroup;
  }>({ open: false, mode: 'create' });

  const filteredGroups = useMemo(() => {
    const search = filters.searchTerm.trim().toLowerCase();

    return propertyGroups.filter((group) => {
      const matchesStatus =
        filters.status === 'all' || group.status === filters.status;
      const matchesType = filters.type === 'all' || group.type === filters.type;
      const matchesBilling =
        filters.consolidatedBilling === 'all' ||
        (filters.consolidatedBilling === 'yes' && group.consolidatedBilling) ||
        (filters.consolidatedBilling === 'no' && !group.consolidatedBilling);

      const matchesSearch =
        search.length === 0 ||
        [
          group.name,
          group.reference,
          group.legalName,
          group.mainContactName,
          group.mainContactEmail,
          group.mainContactPhone,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search)) ||
        group.contacts.some((contact) => {
          const values = [
            contact.fullName,
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.phone,
            contact.mobile,
          ].filter(Boolean) as string[];
          return values.some((value) => value.toLowerCase().includes(search));
        });

      return matchesStatus && matchesType && matchesBilling && matchesSearch;
    });
  }, [filters, propertyGroups]);

  const selectedGroup = propertyGroups.find((group) => group.id === selectedGroupId);

  const aggregated = useMemo(() => {
    const totals = filteredGroups.reduce(
      (acc, group) => {
        acc.sites += group.totalSites;
        acc.units += group.totalUnits;
        acc.revenue += group.totalAnnualRevenue;
        acc.paymentTerms += group.paymentTermsDays;
        if (group.status === PropertyGroupStatus.Active) {
          acc.active += 1;
        }
        return acc;
      },
      { sites: 0, units: 0, revenue: 0, paymentTerms: 0, active: 0 },
    );

    const averagePaymentTerms =
      filteredGroups.length > 0
        ? Math.round(totals.paymentTerms / filteredGroups.length)
        : 0;

    return {
      sites: totals.sites,
      units: totals.units,
      revenue: totals.revenue,
      active: totals.active,
      averagePaymentTerms,
    };
  }, [filteredGroups]);

  const activePercentage = filteredGroups.length
    ? Math.round((aggregated.active / filteredGroups.length) * 100)
    : 0;

  type StatsCardConfig = {
    title: string;
    value: string;
    icon: LucideIcon;
    description?: string;
    trend?: { value: number; isPositive: boolean };
  };

  const statsCards: StatsCardConfig[] = [
    {
      title: 'Groupes suivis',
      value: filteredGroups.length.toLocaleString('fr-FR'),
      icon: Building2,
      description: `${aggregated.active.toLocaleString('fr-FR')} actifs (${activePercentage}%)`,
    },
    {
      title: 'Sites couverts',
      value: aggregated.sites.toLocaleString('fr-FR'),
      icon: Map,
      description: 'Portefeuille multi-sites consolidé',
    },
    {
      title: 'Unités gérées',
      value: aggregated.units.toLocaleString('fr-FR'),
      icon: Layers,
      description: 'Logements, bureaux et actifs spécialisés',
    },
    {
      title: 'CA annuel estimé',
      value: formatCurrency(aggregated.revenue),
      icon: Wallet,
      description: 'Potentiel contractuel consolidé',
      trend:
        filteredGroups.length > 0
          ? { value: activePercentage, isPositive: activePercentage >= 50 }
          : undefined,
    },
  ];

  const handleCreateGroup = () => {
    const group = createNewPropertyGroup();
    setFormState({ open: true, mode: 'create', initialGroup: group });
  };

  const handleSelectGroup = (group: PropertyGroup) => {
    setSelectedGroup(group.id);
  };

  const handleEditGroup = (group: PropertyGroup) => {
    setFormState({ open: true, mode: 'edit', initialGroup: group });
  };

  const handleSubmitGroup = (group: PropertyGroup) => {
    if (formState.mode === 'create') {
      addPropertyGroup(group);
    } else {
      updatePropertyGroup(group);
    }
    setFormState((previous) => ({ ...previous, open: false }));
  };

  const handleOpenChange = (open: boolean) => {
    setFormState((previous) => ({ ...previous, open }));
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-primary/15 via-background to-background p-8">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Cockpit Property Groups
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">
                Pilotez vos alliances immobilières
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                Visualisez la santé de votre portefeuille, optimisez la facturation consolidée et
                offrez une expérience premium à vos groupes clients.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="outline" className="border-primary/40 text-primary">
                Exporter la vue
              </Button>
              <Button size="sm" onClick={handleCreateGroup} className="gap-2">
                <Sparkles className="h-4 w-4" /> Nouveau groupe inspirant
              </Button>
            </div>
          </div>
          <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
            {statsCards.map((card) => (
              <StatsCard
                key={card.title}
                title={card.title}
                value={card.value}
                icon={card.icon}
                description={card.description}
                trend={card.trend}
                className="border border-white/10 bg-background/70 backdrop-blur"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <PropertyGroupTable
            data={filteredGroups}
            onSelect={handleSelectGroup}
            onCreateGroup={handleCreateGroup}
            onEditGroup={handleEditGroup}
            selectedGroupId={selectedGroupId}
          />
        </div>
        <div className="min-h-[600px] lg:min-h-full">
          <PropertyGroupDetail group={selectedGroup} onEdit={handleEditGroup} />
        </div>
      </div>

      {formState.initialGroup && (
        <PropertyGroupFormDrawer
          open={formState.open}
          mode={formState.mode}
          initialGroup={formState.initialGroup}
          onOpenChange={handleOpenChange}
          onSubmit={handleSubmitGroup}
        />
      )}
    </div>
  );
}