import { apiRequest } from "./client";
import { TalinfRecord } from "@/types/talinf";
import { IWS_CONFIG } from "../constants";

export async function fetchLotByLotNo(lotNo: string): Promise<TalinfRecord[]> {
  const data = await apiRequest<TalinfRecord>(IWS_CONFIG.ENDPOINTS.TALINF(lotNo));
  
  // Filter out empty ghost records that AS400 sometimes returns
  const validData = data.filter((m) => m["ASSEMBLY LOT NO."] && String(m["ASSEMBLY LOT NO."]).trim() !== "");

  if (validData.length === 0) {
    return [];
  }
  return validData;
}
