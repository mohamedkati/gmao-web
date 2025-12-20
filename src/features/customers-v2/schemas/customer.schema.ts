// src/features/customers/lib/customer.schema.ts

import { z } from 'zod';
import {
  CustomerType,
  BillingMode,
  InvoiceFrequency,
  PersonType,
  PreferredContactMethod,
} from '../../customers-v2/types/customer.types';
import { nullableNumber } from '@/shared/lib/utils/zod-helper';

const addressSchema = z.object({
  firstAddressLine: z.string().optional(),
  secondAddressLine: z.string().optional(),
  street: z.string().min(1, 'La rue est requise'),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(1, 'Le code postal est requis'),
  country: z.string().min(1, 'Le pays est requis'),
});

const pricingCoefficientsSchema = z.object({
  laborCoefficient: nullableNumber({ min: 1 }).default(1.30),
  materialCoefficient: nullableNumber({ min: 1 }).default(1.25),
  equipmentCoefficient: nullableNumber({ min: 1 }).default(1.20),
  subcontractorCoefficient: nullableNumber({ min: 1 }).default(1.15),
});

const billingSettingsSchema = z.object({
  mode: z.nativeEnum(BillingMode),
  paymentTermsDays: z.number().min(0, 'Doit être >= 0').default(30),
  autoGenerateInvoices: z.boolean().default(true),
  invoiceFrequency: z.nativeEnum(InvoiceFrequency),
  sendEmailNotifications: z.boolean().default(true),
  applyLatePaymentFees: z.boolean().default(false),
  latePaymentFeePercent: z.number().min(0).max(100).optional(),
});

export const customerFormSchema = z.object({
  // Basic Info
  reference: z.string().min(1, 'La référence est requise'),
  companyName: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  type: z.nativeEnum(CustomerType),
  propertyGroupId: z.string().optional(),
  siren: z.string().regex(/^\d{9}$/, 'Le SIREN doit contenir 9 chiffres').optional().or(z.literal('')),
  comment: z.string().optional(),

  // Addresses
  invoiceAddress: addressSchema,
  mailingAddress: addressSchema,
  sameAsInvoiceAddress: z.boolean().optional(),

  // Pricing
  pricingCoefficients: pricingCoefficientsSchema,

  // Billing
  billingSettings: billingSettingsSchema,
  paymentMethodId: z.string().optional(),

  // Commercial
  commercialId: z.string().min(1, 'Le commercial est requis'),
});

export const contactFormSchema = z.object({
  type: z.nativeEnum(PersonType),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide').min(1, 'L\'email est requis'),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  position: z.string().optional(),
  isPrimary: z.boolean().default(false),
  preferredContactMethod: z.nativeEnum(PreferredContactMethod),
});

export const maintenanceBudgetFormSchema = z.object({
  year: z.number().min(2025).max(2100),
  budgetedAmount: z.number().min(0, 'Le montant doit être positif'),
  committedAmount: z.number().min(0, 'Le montant doit être positif').default(0),
  invoicedAmount: z.number().min(0, 'Le montant doit être positif').default(0),
  alertThreshold: z.number().min(0).max(100).default(80),
  alertSent: z.boolean().default(false),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type MaintenanceBudgetFormValues = z.infer<typeof maintenanceBudgetFormSchema>;