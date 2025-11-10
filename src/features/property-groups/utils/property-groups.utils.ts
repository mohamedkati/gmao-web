import {
  PropertyGroupType,
  PropertyGroupStatus,
  LegalForm,
  ContactRole,
  PersonType,
  PreferredContactMethod,
} from '../types/property-group.types';

export const propertyGroupTypeLabels: Record<PropertyGroupType, string> = {
  [PropertyGroupType.PropertyManagementCompany]: 'Société de gestion immobilière',
  [PropertyGroupType.SyndicGroup]: 'Groupe de syndics',
  [PropertyGroupType.RealEstateInvestor]: 'Investisseur immobilier',
  [PropertyGroupType.PublicHousing]: 'Bailleur social',
  [PropertyGroupType.Corporate]: 'Entreprise',
  [PropertyGroupType.FamilyOffice]: 'Family office',
};

export const propertyGroupStatusLabels: Record<PropertyGroupStatus, string> = {
  [PropertyGroupStatus.Active]: 'Actif',
  [PropertyGroupStatus.Prospect]: 'Prospect',
  [PropertyGroupStatus.Inactive]: 'Inactif',
  [PropertyGroupStatus.Suspended]: 'Suspendu',
  [PropertyGroupStatus.Terminated]: 'Résilié',
};

export const legalFormLabels: Record<LegalForm, string> = {
  [LegalForm.SAS]: 'SAS',
  [LegalForm.SARL]: 'SARL',
  [LegalForm.SA]: 'SA',
  [LegalForm.SCI]: 'SCI',
  [LegalForm.EURL]: 'EURL',
  [LegalForm.EI]: 'EI',
  [LegalForm.Association]: 'Association',
  [LegalForm.PublicEntity]: 'Entité publique',
};

export const contactRoleLabels: Record<ContactRole, string> = {
  [ContactRole.GeneralManager]: 'Directeur Général',
  [ContactRole.OperationsManager]: 'Directeur des Opérations',
  [ContactRole.CommercialManager]: 'Directeur Commercial',
  [ContactRole.AccountingManager]: 'Responsable Comptabilité',
  [ContactRole.TechnicalManager]: 'Responsable Technique',
  [ContactRole.CustomerServiceManager]: 'Responsable Service Client',
  [ContactRole.LegalManager]: 'Responsable Juridique',
  [ContactRole.Assistant]: 'Assistant(e)',
};

export const personTypeLabels: Record<PersonType, string> = {
  [PersonType.Individual]: 'Individuel',
  [PersonType.Company]: 'Entreprise',
};

export const preferredContactMethodLabels: Record<PreferredContactMethod, string> = {
  [PreferredContactMethod.Email]: 'Email',
  [PreferredContactMethod.Phone]: 'Téléphone',
  [PreferredContactMethod.SMS]: 'SMS',
  [PreferredContactMethod.WhatsApp]: 'WhatsApp',
};

export const getStatusColor = (status: PropertyGroupStatus) => {
  switch (status) {
    case PropertyGroupStatus.Active:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case PropertyGroupStatus.Prospect:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case PropertyGroupStatus.Inactive:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    case PropertyGroupStatus.Suspended:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case PropertyGroupStatus.Terminated:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const formatDate = (date: string | undefined) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
};

export const isContractExpiringSoon = (endDate: string | undefined, daysBeforeExpiry = 90) => {
  if (!endDate) return false;
  const daysUntilExpiry = Math.floor(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilExpiry > 0 && daysUntilExpiry <= daysBeforeExpiry;
};