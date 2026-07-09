import { apiRequest } from "./client";
import { MinpopRecord } from "@/types/minpop";
import { IWS_CONFIG } from "../constants";

export async function fetchOperatorByEmpId(empId: string): Promise<MinpopRecord[]> {
  const data = await apiRequest<MinpopRecord>(IWS_CONFIG.ENDPOINTS.MINPOP(empId));
  
  // Filter out empty ghost records that AS400 sometimes returns
  const validData = data.filter((m) => m.OPERATOR_CODE && String(m.OPERATOR_CODE).trim() !== "");

  if (validData.length === 0) {
    return [];
  }
  return validData;
}
