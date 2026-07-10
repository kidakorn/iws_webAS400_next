import { apiRequest } from "./client";
import { TalinfRecord } from "@/types/talinf";
import { IWS_CONFIG } from "../constants";

export async function fetchLotByLotNo(lotNo: string): Promise<TalinfRecord[]> {
  const data = await apiRequest<TalinfRecord>(IWS_CONFIG.ENDPOINTS.TALINF(lotNo));

  if (!data || data.length === 0) {
    return [];
  }

  // Handle IWS Schema P_ISFOUND
  if (data[0].P_ISFOUND === "0" || data[0].P_ISFOUND === 0) {
    return [];
  }

  return data;
}
