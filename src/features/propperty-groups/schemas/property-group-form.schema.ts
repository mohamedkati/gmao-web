import { z } from 'zod';
import {
  LegalForm,
  PropertyGroupStatus,
  PropertyGroupType,
} from '../types/property-group';

export const propertyGroupFormSchema = z.object({
  id: z.string().optional(),
  reference: z.string().min(2, 'La référence est obligatoire'),
  name: z.string().min(2, 'Le nom du groupe est obligatoire'),
  description: z.string().max(1000).optional(),
  status: z.nativeEnum(PropertyGroupStatus),
  type: z.nativeEnum(PropertyGroupType),
  consolidatedBilling: z.boolean(),
  paymentTermsDays: z
    .preprocess((value) => Number(value), z.number().min(0).max(365))
    .transform((value) => Math.round(value)),
  volumeDiscountPercent: z
    .preprocess((value) => {
      if (value === '' || value === null || typeof value === 'undefined') {
        return undefined;
      }
      return Number(value);
    }, z.number().min(0).max(100).optional()),
  preferredPaymentMethod: z.string().max(120).optional(),
  mainContactName: z.string().max(120).optional(),
  mainContactEmail: z
    .union([z.string().email('Email invalide'), z.literal('')])
    .optional(),
  mainContactPhone: z.string().max(40).optional(),
  legalName: z.string().max(160).optional(),
  siren: z.string().max(20).optional(),
  vatNumber: z.string().max(32).optional(),
  legalForm: z
    .preprocess((value) => {
      if (value === '' || value === null || typeof value === 'undefined') {
        return undefined;
      }
      return Number(value);
    }, z.nativeEnum(LegalForm).optional()),
  totalCustomers: z
    .preprocess((value) => Number(value), z.number().min(0))
    .transform((value) => Math.round(value)),
  totalSites: z
    .preprocess((value) => Number(value), z.number().min(0))
    .transform((value) => Math.round(value)),
  totalUnits: z
    .preprocess((value) => Number(value), z.number().min(0))
    .transform((value) => Math.round(value)),
  totalAnnualRevenue: z
    .preprocess((value) => Number(value), z.number().min(0))
    .transform((value) => Math.round(value)),
});

export type PropertyGroupFormValues = z.infer<typeof propertyGroupFormSchema>;
