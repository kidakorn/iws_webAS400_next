import { z } from "zod";
import { ValidationResult } from "@/types/api";

export const LotNoSchema = z.string()
  .trim()
  .min(1, "Lot No is required.")
  .regex(/^\d{5}-\d{4}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/, "Invalid format. Expected: XXXXX-XXXX-XXX-XXX");

export function validateLotNo(value: string): ValidationResult {
  const result = LotNoSchema.safeParse(value);
  if (result.success) {
    return { valid: true, message: "" };
  } else {
    return { valid: false, message: result.error.issues[0].message };
  }
}
