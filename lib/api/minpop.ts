import { apiRequest } from "./client";
import { MinpopRecord } from "@/types/minpop";
import { IWS_CONFIG } from "../constants";

export async function fetchOperatorByEmpId(empId: string): Promise<MinpopRecord[]> {
  const data = await apiRequest<MinpopRecord>(IWS_CONFIG.ENDPOINTS.MINPOP(empId));
  
  if (!data || data.length === 0) {
    return [];
  }

  // Handle IWS Schema P_ISFOUND
  if (data[0].P_ISFOUND === "0" || data[0].P_ISFOUND === 0) {
    return [];
  }

  return data;
}
