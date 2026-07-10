import { apiRequest } from "./client";
import { MinpopRecord } from "@/types/minpop";
import { IWS_CONFIG } from "../constants";

export async function fetchOperatorByEmpId(empId: string): Promise<MinpopRecord[]> {
  const data = await apiRequest<MinpopRecord>(IWS_CONFIG.ENDPOINTS.MINPOP(empId));
  
  if (data.length === 0) {
    return [];
  }
  return data;
}
