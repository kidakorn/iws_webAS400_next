import { ValidationResult } from "@/types/api";

export function validateLotNo(value: string): ValidationResult {
  const val = value.trim();

  if (!val) {
    return { valid: false, message: "Lot No is required." };
  }

  // format XXXXX-XXXX-XXX-XXX
  const pattern = /^\d{5}-\d{4}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;
  if (!pattern.test(val)) {
    return { valid: false, message: "Invalid format. Expected: XXXXX-XXXX-XXX-XXX" };
  }

  return { valid: true, message: "" };
}
