import z from 'zod'
import { OccupantType, PersonType } from '../types/occupant.types';
import { PreferredContactMethod } from '../types/site.types';


// ============================================
// OCCUPANT FORM SCHEMA
// ============================================



export const occupantFormSchema = z.object({
  type: z.nativeEnum(OccupantType),
  personType: z.nativeEnum(PersonType),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  companyName: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  preferredContactMethod: z.nativeEnum(PreferredContactMethod).optional(),
  moveInDate: z.date().optional(),
  moveOutDate: z.date().optional(),
  hasPortalAccess: z.boolean().default(false),
}).refine(
  (data) => {
    // Si moveOutDate est défini, il doit être après moveInDate
    if (data.moveInDate && data.moveOutDate) {
      return data.moveOutDate > data.moveInDate;
    }
    return true;
  },
  {
    message: "La date de sortie doit être après la date d'entrée",
    path: ["moveOutDate"],
  }
);

export type OccupantFormData = z.infer<typeof occupantFormSchema>;