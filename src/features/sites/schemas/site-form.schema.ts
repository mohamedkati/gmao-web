import { z } from "zod";
import {
  SiteType,
} from "@/features/sites/types/site.types";

// ============================================
// VALUE OBJECTS SCHEMAS
// ============================================

export const addressSchema = z.object({
  firstAddressLine: z.string().optional(),
  secondAddressLine: z.string().optional(),
  street: z.string().min(1, "Rue requise"),
  city: z.string().min(1, "Ville requise"),
  postalCode: z.string().min(1, "Code postal requis"),
  country: z.string().min(1, "Pays requis"),
});

export const geoCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const siteAccessSchema = z.object({
  accessCode1: z.string().optional(),
  accessCode2: z.string().optional(),
  accessComment: z.string().optional(),
  workingHours: z.string().optional(),
  keyBoxSite: z.string().optional(),
});

// ============================================
// MAIN SITE FORM SCHEMA
// ============================================

export const siteFormSchema = z.object({
  // Step 1: General Info
  reference: z.string().min(1, "Référence requise"),
  name: z.string().min(1, "Nom requis"),
  type: z.nativeEnum(SiteType),
  customerId: z.string().min(1, "Client requis"),
  clientContactId: z.string().optional(),
  sectorTypeId: z.string().min(1, "Type de secteur requis"),
  clientTypeId: z.string().min(1, "Type de client requis"),
  vatId: z.string().min(1, "TVA requise"),
  comment: z.string().optional(),
  
  // Step 2: Addresses
  address: addressSchema,
  billingAddress: addressSchema,
  coordinates: geoCoordinatesSchema.optional(),
  sameAsBillingAddress: z.boolean().default(false),
  
  // Step 3: Building Info
  buildingYear: z.number().min(1800).max(2100).optional(),
  totalArea: z.number().min(0).optional(),
  floorsCount: z.number().min(0).optional(),
  unitsCount: z.number().min(0).optional(),
  siren: z.string().optional(),
  siret: z.string().optional(),
  mainMailAddress: z.string().email("Email invalide"),
  invoiceMailAddress: z.string().email("Email invalide"),
  commentReport: z.string().optional(),
  
  // Step 4: Team Assignment
  commercialId: z.string().optional(),
  operationsManagerId: z.string().optional(),
  sectorManagerId: z.string().optional(),
  technician1Id: z.string().optional(),
  technician2Id: z.string().optional(),
  
  // Step 5: Access Info
  siteAccessInfo: siteAccessSchema,
  paymentMethodId: z.string().optional(),
});

export type SiteFormData = z.infer<typeof siteFormSchema>;





// ============================================
// SITE CONTACT FORM SCHEMA
// ============================================

export const siteContactFormSchema = z.object({
  firstname: z.string().min(1, "Prénom requis"),
  lastname: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  cellPhone: z.string().optional(),
  fax: z.string().optional(),
  note: z.string().optional(),
  availabilityHours: z.string().optional(),
  isPrimary: z.boolean().default(false),
  siteContactCategoryId: z.string().min(1, "Catégorie requise"),
});

export type SiteContactFormData = z.infer<typeof siteContactFormSchema>;

// ============================================
// SITE KEEPER FORM SCHEMA
// ============================================

export const siteKeeperFormSchema = z.object({
  firstname: z.string().min(1, "Prénom requis"),
  lastname: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  cellPhone: z.string().optional(),
});

export type SiteKeeperFormData = z.infer<typeof siteKeeperFormSchema>;

