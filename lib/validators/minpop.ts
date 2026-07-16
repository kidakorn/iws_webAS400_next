import { z } from "zod";
import { ValidationResult } from "@/types/api";

export const EmployeeIdSchema = z.string()
  .trim()
  .min(1, "Operator Code is required.")
  .regex(/^\d+$/, "Please enter numbers only.")
  .max(5, "Operator Code must not exceed 5 digits.");

export function validateEmployeeId(value: string): ValidationResult {
  const result = EmployeeIdSchema.safeParse(value);
  if (result.success) {
    return { valid: true, message: "" };
  } else {
    return { valid: false, message: result.error.issues[0].message };
  }
}
