import { z } from 'zod';
import {
  PropertyGroupType,
  PropertyGroupStatus,
  LegalForm,
  ContactRole,
  PersonType,
  PreferredContactMethod,
} from '../types/property-group.types';
import { nullableNumber } from '@/shared/lib/utils/zod-helper';

const addressSchema = z.object({
  firstAddressLine: z.string().optional(),
  secondAddressLine: z.string().optional(),
  street: z.string().min(1, 'La rue est requise'),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(1, 'Le code postal est requis'),
  country: z.string().min(1, 'Le pays est requis'),

});

const groupPricingCoefficientsSchema = z.object({
  laborCoefficient: nullableNumber({min : 1, max:5}),
  materialCoefficient: nullableNumber({min : 1, max:5}),
  equipmentCoefficient: nullableNumber({min : 1, max:5}),
  subcontractorCoefficient: nullableNumber({min : 1, max:5}),
  volumeDiscountPercent: nullableNumber({min : 0, max:50}),
  minimumAnnualRevenue:nullableNumber({min : 0}),
  emergencyCalloutFee: nullableNumber({min : 0}),
  monthlyMaintenanceFee: nullableNumber({min : 0})
});

export const propertyGroupFormSchema = z.object({
  id: z.string().optional(),
  // Basic Info
  reference: z.string().min(1, 'La référence est requise'),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  type: z.nativeEnum(PropertyGroupType),
  status: z.nativeEnum(PropertyGroupStatus),

  // Legal Info
  legalName: z.string().optional(),
  siren: z.string().regex(/^\d{9}$/, 'Le SIREN doit contenir 9 chiffres').optional().or(z.literal('')),
  companyRegistrationNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  legalForm: z.nativeEnum(LegalForm).optional(),

  // Address
  headquartersAddress: addressSchema.optional(),

  // Main Contact
  mainContactName: z.string().optional(),
  mainContactPosition: z.string().optional(),
  mainContactEmail: z.string().email('Email invalide').optional().or(z.literal('')),
  mainContactPhone: z.string().optional(),
  mainContactMobile: z.string().optional(),

  // Accounting Contact
  accountingContactName: z.string().optional(),
  accountingContactEmail: z.string().email('Email invalide').optional().or(z.literal('')),
  accountingContactPhone: z.string().optional(),

  // Billing
  consolidatedBilling: z.boolean().default(false),
  paymentTermsDays: nullableNumber({min :1}),
  volumeDiscountPercent:nullableNumber({min : 0}),
  preferredPaymentMethod: z.string().optional(),

  // Pricing
  groupPricingCoefficients: groupPricingCoefficientsSchema.optional(),

  // Contract
  frameworkContractStartDate: z.string().optional(),
  frameworkContractEndDate: z.string().optional(),
  frameworkContractReference: z.string().optional(),
  autoRenewalFrameworkContract: z.boolean().default(false),

  // Notes
  internalNotes: z.string().optional(),
  commercialNotes: z.string().optional(),
});

export const contactFormSchema = z.object({
  role: z.nativeEnum(ContactRole),
  personType: z.nativeEnum(PersonType),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  position: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email('Email invalide').min(1, 'L\'email est requis'),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  fax: z.string().optional(),
  isPrimary: z.boolean().default(false),
  receivesInvoices: z.boolean().default(false),
  receivesReports: z.boolean().default(false),
  receivesAlerts: z.boolean().default(false),
  preferredContactMethod: z.nativeEnum(PreferredContactMethod),
  notes: z.string().optional(),
});

export type PropertyGroupFormValues = z.infer<typeof propertyGroupFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;