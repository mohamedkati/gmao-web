import { z } from 'zod';
import { WorkOrderPriority } from '../types/work-order.types';

export const createWorkOrderSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),

  description: z
    .string()
    .max(1000, 'La description ne peut pas dépasser 1000 caractères')
    .optional(),

  priority: z.nativeEnum(WorkOrderPriority, {
    errorMap: () => ({ message: 'Priorité invalide' }),
  }),

  assetId: z.string().min(1, 'L\'équipement est requis'),

  technicianId: z.string().optional(),

  customerId: z.string().min(1, 'Le client est requis'),

  scheduledDate: z.date().optional(),

  estimatedDuration: z
    .number()
    .min(15, 'Durée minimum : 15 minutes')
    .max(480, 'Durée maximum : 8 heures')
    .optional(),

  notes: z.string().max(5000).optional(),
});

export type CreateWorkOrderFormData = z.infer<typeof createWorkOrderSchema>;