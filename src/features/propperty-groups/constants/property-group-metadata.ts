import {
  ContactRole,
  LegalForm,
  PersonType,
  PreferredContactMethod,
  PropertyGroupStatus,
  PropertyGroupType,
} from '../types/property-group';

export const PROPERTY_GROUP_STATUS_METADATA: Record<
  PropertyGroupStatus,
  { label: string; badgeClass: string; description: string }
> = {
  [PropertyGroupStatus.Active]: {
    label: 'Actif',
    badgeClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    description: 'Groupe actif avec contrat cadre en cours',
  },
  [PropertyGroupStatus.Prospect]: {
    label: 'Prospect',
    badgeClass: 'bg-sky-500/10 text-sky-500 border-sky-500/30',
    description: 'Opportunité commerciale en phase de conversion',
  },
  [PropertyGroupStatus.Inactive]: {
    label: 'Inactif',
    badgeClass: 'bg-slate-500/10 text-slate-500 border-slate-500/30',
    description: 'Aucun site ou contrat actif actuellement',
  },
  [PropertyGroupStatus.Suspended]: {
    label: 'Suspendu',
    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    description: 'Collaboration momentanément mise en pause',
  },
  [PropertyGroupStatus.Terminated]: {
    label: 'Résilié',
    badgeClass: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    description: 'Relation commerciale terminée',
  },
};

export const PROPERTY_GROUP_TYPE_METADATA: Record<
  PropertyGroupType,
  { label: string; description: string }
> = {
  [PropertyGroupType.PropertyManagementCompany]: {
    label: 'Société de gestion',
    description: 'Gestion globale de portefeuilles immobiliers',
  },
  [PropertyGroupType.SyndicGroup]: {
    label: 'Groupe de syndics',
    description: 'Gestion de copropriétés et services associés',
  },
  [PropertyGroupType.RealEstateInvestor]: {
    label: 'Investisseur immobilier',
    description: 'Investissements patrimoniaux multi-sites',
  },
  [PropertyGroupType.PublicHousing]: {
    label: 'Bailleur social',
    description: 'Gestion de logements publics ou sociaux',
  },
  [PropertyGroupType.Corporate]: {
    label: 'Entreprise',
    description: 'Gestion du patrimoine immobilier d’entreprise',
  },
  [PropertyGroupType.FamilyOffice]: {
    label: 'Family office',
    description: 'Gestion d’actifs immobiliers familiaux',
  },
};

export const LEGAL_FORM_LABELS: Record<LegalForm, string> = {
  [LegalForm.SAS]: 'SAS',
  [LegalForm.SARL]: 'SARL',
  [LegalForm.SA]: 'SA',
  [LegalForm.SCI]: 'SCI',
  [LegalForm.EURL]: 'EURL',
  [LegalForm.EI]: 'EI',
  [LegalForm.Association]: 'Association',
  [LegalForm.PublicEntity]: 'Entité publique',
};

export const LEGAL_FORM_OPTIONS = Object.entries(LEGAL_FORM_LABELS).map(
  ([value, label]) => ({
    value: Number(value) as LegalForm,
    label,
  }),
);

export const CONTACT_ROLE_LABELS: Record<ContactRole, string> = {
  [ContactRole.GeneralManager]: 'Direction générale',
  [ContactRole.OperationsManager]: 'Direction des opérations',
  [ContactRole.CommercialManager]: 'Direction commerciale',
  [ContactRole.AccountingManager]: 'Responsable comptabilité',
  [ContactRole.TechnicalManager]: 'Responsable technique',
  [ContactRole.CustomerServiceManager]: 'Responsable service client',
  [ContactRole.LegalManager]: 'Responsable juridique',
  [ContactRole.Assistant]: 'Assistant(e)',
};

export const PERSON_TYPE_LABELS: Record<PersonType, string> = {
  [PersonType.Individual]: 'Particulier',
  [PersonType.Company]: 'Entreprise',
};

export const PREFERRED_CONTACT_METHOD_LABELS: Record<
  PreferredContactMethod,
  string
> = {
  [PreferredContactMethod.Email]: 'Email',
  [PreferredContactMethod.Phone]: 'Téléphone',
  [PreferredContactMethod.Mobile]: 'Mobile',
  [PreferredContactMethod.Fax]: 'Fax',
};

export const PROPERTY_GROUP_STATUS_OPTIONS = Object.entries(
  PROPERTY_GROUP_STATUS_METADATA,
).map(([value, meta]) => ({
  value: Number(value) as PropertyGroupStatus,
  label: meta.label,
}));

export const PROPERTY_GROUP_TYPE_OPTIONS = Object.entries(
  PROPERTY_GROUP_TYPE_METADATA,
).map(([value, meta]) => ({
  value: Number(value) as PropertyGroupType,
  label: meta.label,
}));