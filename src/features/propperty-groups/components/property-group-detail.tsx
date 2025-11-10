'use client';

import {
  Building2,
  FileText,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
  Wallet,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/shadcnui/tabs';
import { ScrollArea } from '@/shared/components/shadcnui/scroll-area';
import {
  CONTACT_ROLE_LABELS,
  PERSON_TYPE_LABELS,
  PROPERTY_GROUP_STATUS_METADATA,
  PROPERTY_GROUP_TYPE_METADATA,
  PREFERRED_CONTACT_METHOD_LABELS,
} from '../constants/property-group-metadata';
import { PropertyGroup } from '../types/property-group';
import {
  formatCurrency,
  formatDate,
  formatLegalForm,
} from '../utils/property-group-formatters';

interface PropertyGroupDetailProps {
  group?: PropertyGroup;
  onEdit?: (group: PropertyGroup) => void;
}

export function PropertyGroupDetail({ group, onEdit }: PropertyGroupDetailProps) {
  if (!group) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-muted bg-background/60 p-10 text-center text-sm text-muted-foreground">
        Sélectionnez un groupe dans la liste pour afficher sa fiche détaillée.
      </div>
    );
  }

  const statusMeta = PROPERTY_GROUP_STATUS_METADATA[group.status];
  const typeMeta = PROPERTY_GROUP_TYPE_METADATA[group.type];

  const heroStats = [
    {
      label: 'Sites gérés',
      value: group.totalSites.toLocaleString('fr-FR'),
    },
    {
      label: 'Unités',
      value: group.totalUnits.toLocaleString('fr-FR'),
    },
    {
      label: 'CA annuel',
      value: formatCurrency(group.totalAnnualRevenue),
    },
  ];

  const legalItems = [
    { label: 'Dénomination légale', value: group.legalName ?? '—' },
    { label: 'Forme juridique', value: formatLegalForm(group.legalForm) },
    { label: 'SIREN', value: group.siren ?? '—' },
    { label: 'N° immatriculation', value: group.companyRegistrationNumber ?? '—' },
    { label: 'N° TVA', value: group.vatNumber ?? '—' },
  ];

  const billingItems = [
    {
      label: 'Mode de facturation',
      value: group.consolidatedBilling ? 'Consolidée' : 'Par site',
    },
    {
      label: 'Conditions de paiement',
      value: `${group.paymentTermsDays} jours`,
    },
    {
      label: 'Remise volume',
      value:
        group.volumeDiscountPercent !== undefined
          ? `${group.volumeDiscountPercent}%`
          : '—',
    },
    {
      label: 'Mode de paiement privilégié',
      value: group.preferredPaymentMethod ?? '—',
    },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/60 backdrop-blur">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
      <div className="space-y-6 p-6 pb-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={`${statusMeta.badgeClass} border text-xs font-medium`}
              >
                {statusMeta.label}
              </Badge>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                {typeMeta.label}
              </Badge>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {group.reference}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground lg:text-3xl">
              {group.name}
            </h2>
            {group.description && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {group.description}
              </p>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                className="border-primary/40 text-primary"
                onClick={() => onEdit(group)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Modifier le groupe
              </Button>
            )}
          </div>
          <div className="grid w-full max-w-sm grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-background/50 p-3 text-center shadow-inner">
            {heroStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-xs uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            {group.mainContactName ?? 'Contact principal à définir'}
          </span>
          {group.mainContactEmail && (
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {group.mainContactEmail}
            </span>
          )}
          {group.mainContactPhone && (
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {group.mainContactPhone}
            </span>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6 flex flex-1 flex-col">
        <TabsList className="mx-6 w-fit bg-background/60 backdrop-blur">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="overview" className="p-6 pt-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-primary" />
                    Informations générales
                  </CardTitle>
                  <CardDescription>Vue synthétique du groupe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      Siège social
                    </p>
                    <p className="mt-1 text-foreground">
                      {group.headquartersAddress ? (
                        <>
                          {group.headquartersAddress.street}
                          <br />
                          {group.headquartersAddress.postalCode} {group.headquartersAddress.city}
                          <br />
                          {group.headquartersAddress.country}
                        </>
                      ) : (
                        'Non renseigné'
                      )}
                    </p>
                  </div>
                  <Separator className="bg-muted" />
                  <div className="space-y-2">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <span className="font-medium text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Informations légales
                  </CardTitle>
                  <CardDescription>Identité juridique et conformité</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {legalItems.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <p className="text-xs uppercase text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Wallet className="h-4 w-4 text-primary" />
                    Paramètres financiers
                  </CardTitle>
                  <CardDescription>Facturation et préférences commerciales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {billingItems.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <p className="text-xs uppercase text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  ))}
                  <Separator className="bg-muted" />
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Contrat cadre : {group.frameworkContractReference ?? '—'}</p>
                    <p>
                      {formatDate(group.frameworkContractStartDate)} →{' '}
                      {formatDate(group.frameworkContractEndDate)}
                    </p>
                    <p>
                      Renouvellement automatique :{' '}
                      <span className="font-medium text-foreground">
                        {group.autoRenewalFrameworkContract ? 'Oui' : 'Non'}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="p-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {group.contacts.map((contact) => (
                <Card key={contact.id} className="border border-primary/10 bg-background/70 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">
                        {contact.fullName ?? `${contact.firstName} ${contact.lastName}`}
                      </span>
                      {contact.isPrimary && (
                        <Badge className="bg-primary/90 text-primary-foreground">Principal</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant="outline" className="border-transparent bg-primary/10 text-primary">
                        {CONTACT_ROLE_LABELS[contact.role]}
                      </Badge>
                      <span>{PERSON_TYPE_LABELS[contact.personType]}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {contact.email && (
                        <p className="flex items-center gap-2 text-foreground">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {contact.email}
                        </p>
                      )}
                      {contact.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {contact.phone}
                        </p>
                      )}
                      {contact.mobile && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {contact.mobile}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {contact.receivesInvoices && <Badge variant="outline">Factures</Badge>}
                      {contact.receivesReports && <Badge variant="outline">Reporting</Badge>}
                      {contact.receivesAlerts && <Badge variant="outline">Alertes</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Préférence : {PREFERRED_CONTACT_METHOD_LABELS[contact.preferredContactMethod]}
                    </p>
                    {contact.notes && (
                      <p className="rounded-lg bg-muted/60 p-2 text-xs leading-relaxed text-muted-foreground">
                        {contact.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="p-6 pt-4">
            <Card className="border border-primary/10 bg-background/70 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  Coefficients de tarification
                </CardTitle>
                <CardDescription>
                  Ajustements spécifiques négociés pour ce groupe
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {group.groupPricingCoefficients ? (
                  Object.entries(group.groupPricingCoefficients).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-xs uppercase text-muted-foreground">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {typeof value === 'number' ? value : value === null ? 'Non défini' : value}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucun coefficient spécifique n’a encore été défini.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="p-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border border-primary/10 bg-background/70 shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Notes internes
                  </CardTitle>
                  <CardDescription>Visibilité équipes operations & qualité</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="rounded-lg bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
                    {group.internalNotes ?? 'Aucune note interne renseignée.'}
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-primary/10 bg-background/70 shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Notes commerciales
                  </CardTitle>
                  <CardDescription>Suivi relation client et upsell</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="rounded-lg bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
                    {group.commercialNotes ?? 'Aucune note commerciale renseignée.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}