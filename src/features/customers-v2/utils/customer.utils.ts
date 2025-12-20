
import {
  CustomerType,
  BillingMode,
  InvoiceFrequency,
  PersonType,
  PreferredContactMethod,
} from '../types/customer.types';

export const customerTypeLabels: Record<CustomerType, string> = {
  [CustomerType.PropertyManager]: 'Gestionnaire immobilier',
  [CustomerType.Syndic]: 'Syndic',
  [CustomerType.Corporate]: 'Entreprise',
  [CustomerType.Individual]: 'Particulier',
  [CustomerType.Government]: 'Collectivité',
};

export const billingModeLabels: Record<BillingMode, string> = {
  [BillingMode.Centralized]: 'Centralisée',//Une seule facture pour tous les sites
  [BillingMode.PerSite]: 'Par site',//Une facture par site
  [BillingMode.DistributedByTantièmes]: 'Répartie par tantièmes',
};

export const invoiceFrequencyLabels: Record<InvoiceFrequency, string> = {
  [InvoiceFrequency.PerWorkOrder]: 'Par bon de travail',
  [InvoiceFrequency.Weekly]: 'Hebdomadaire',
  [InvoiceFrequency.Monthly]: 'Mensuelle',
  [InvoiceFrequency.Quarterly]: 'Trimestrielle',
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

export const getCustomerTypeColor = (type: CustomerType) => {
  switch (type) {
    case CustomerType.PropertyManager:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case CustomerType.Syndic:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case CustomerType.Corporate:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case CustomerType.Individual:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case CustomerType.Government:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const getBudgetAlertColor = (consumptionPercent?: number, threshold?: number) => {
  if(!consumptionPercent || !threshold){
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  }
  if (consumptionPercent >= threshold) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  } else if (consumptionPercent >= threshold * 0.8) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
  } else {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
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

export const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};