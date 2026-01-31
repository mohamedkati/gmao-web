import z from 'zod'
import { AssetHealthStatus, AssetStatus, CriticalityLevel } from '../types/asset.types';

// ============================================
// ASSET FORM SCHEMA
// ============================================

export const assetFormSchema = z.object({
  reference: z.string().min(1, "Référence requise"),
  name: z.string().min(1, "Nom requis"),
  categoryId: z.string().min(1, "Catégorie requise"),
  isCommonAsset: z.boolean().default(true),
  unitId: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  installationDate: z.date(),
  status: z.nativeEnum(AssetStatus),
  criticalityLevel: z.nativeEnum(CriticalityLevel),
  healthStatus: z.nativeEnum(AssetHealthStatus),
  parentAssetId: z.string().optional(),
}).refine(
  (data) => {
    // Si c'est un équipement privé, unitId est requis
    if (!data.isCommonAsset && !data.unitId) {
      return false;
    }
    return true;
  },
  {
    message: "L'unité est requise pour un équipement privé",
    path: ["unitId"],
  }
);

export type AssetFormData = z.infer<typeof assetFormSchema>;
