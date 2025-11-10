import z from "zod";

export const nullableNumber = (options?: {
  min?: number;
  max?: number;
  positive?: boolean;
  integer?: boolean;
  errorMessage?: string;
}) => {
  return z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = typeof val === "string" ? parseFloat(val) : val;
      if (isNaN(num)) return null;
      return num;
    })
    .pipe(z.number().nullable())
    .superRefine((val, ctx) => {
      // Si null, pas de validation
      if (val === null) return;

      // Vérifier minimum
      if (options?.min !== undefined && val < options.min) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: options.min,
          type: "number",
          inclusive: true,
          message: options.errorMessage || `La valeur doit être au minimum ${options.min}`,
        });
      }

      // Vérifier maximum
      if (options?.max !== undefined && val > options.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: options.max,
          type: "number",
          inclusive: true,
          message: options.errorMessage || `La valeur doit être au maximum ${options.max}`,
        });
      }

      // Vérifier positif
      if (options?.positive && val <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: options.errorMessage || "La valeur doit être positive",
        });
      }

      // Vérifier entier
      if (options?.integer && !Number.isInteger(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: options.errorMessage || "La valeur doit être un entier",
        });
      }
    }) as any; 
};