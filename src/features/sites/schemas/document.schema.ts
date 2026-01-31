import z from 'zod'
import { DocumentType } from '../types/site-document.types';

// ============================================
// DOCUMENT UPLOAD SCHEMA
// ============================================

export const documentUploadSchema = z.object({
  type: z.nativeEnum(DocumentType),
  description: z.string().optional(),
  isPlan: z.boolean().default(false),
  expirationDate: z.date().optional(),
  sendExpirationAlert: z.boolean().default(false),
  file: z.any(), // File object sera validé côté serveur
});

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;