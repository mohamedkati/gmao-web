import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  LEGAL_FORM_LABELS,
  PROPERTY_GROUP_STATUS_METADATA,
  PROPERTY_GROUP_TYPE_METADATA,
} from '../constants/property-group-metadata';
import {
  LegalForm,
  PropertyGroupStatus,
  PropertyGroupType,
} from '../types/property-group';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatCurrency = (value?: number | null) => {
  if (value === undefined || value === null) {
    return '—';
  }
  return currencyFormatter.format(value);
};

export const formatDate = (value?: string) => {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return format(date, 'dd MMM yyyy', { locale: fr });
};

export const formatStatus = (status: PropertyGroupStatus) =>
  PROPERTY_GROUP_STATUS_METADATA[status]?.label ?? '—';

export const formatType = (type: PropertyGroupType) =>
  PROPERTY_GROUP_TYPE_METADATA[type]?.label ?? '—';

export const formatLegalForm = (legalForm?: LegalForm) => {
  if (!legalForm) {
    return '—';
  }
  return LEGAL_FORM_LABELS[legalForm];
};