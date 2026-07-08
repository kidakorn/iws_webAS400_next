import { ValidationResult } from "@/types/api";

export function validateEmployeeId(value: string): ValidationResult {
  const val = value.trim();
  
  if (!val) {
    return { valid: false, message: "Operator Code is required." };
  }
  
  if (!/^\d+$/.test(val)) {
    return { valid: false, message: "Please enter numbers only." };
  }

  if (val.length !== 5) {
    return { valid: false, message: "Operator Code must be exactly 5 digits." };
  }

  return { valid: true, message: "" };
}
