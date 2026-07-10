import { apiRequest } from "./client";
import { TalinfRecord } from "@/types/talinf";
import { IWS_CONFIG } from "../constants";

export async function fetchLotByLotNo(lotNo: string): Promise<TalinfRecord[]> {
  const data = await apiRequest<TalinfRecord>(IWS_CONFIG.ENDPOINTS.TALINF(lotNo));

  if (data.length === 0) {
    return [];
  }
  return data;
}
