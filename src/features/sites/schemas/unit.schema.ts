import { z } from "zod";
import { UnitStatus, UnitType } from "../types/unit.types";

// ============================================
// UNIT FORM SCHEMA
// ============================================

export const unitFormSchema = z.object({
  reference: z.string().min(1, "Référence requise"),
  type: z.nativeEnum(UnitType),
  status: z.nativeEnum(UnitStatus),
  floor: z.string().optional(),
  doorNumber: z.string().optional(),
  surfaceArea: z.number().min(0).optional(),
  rooms: z.number().min(0).optional(),
  ownershipSharesCount: z.number().min(0, "Tantièmes requis"),
});

export type UnitFormData = z.infer<typeof unitFormSchema>;