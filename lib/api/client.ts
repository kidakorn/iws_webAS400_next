import { IWS_CONFIG } from "../constants";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/web/services/SCANNER";

export async function apiRequest<T>(
  endpoint: string,
  params: Record<string, string> = {},
  method = "GET"
): Promise<T[]> {
  let urlStr = BASE_URL + endpoint;

  if (method === "GET" && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    urlStr += `?${searchParams.toString()}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), IWS_CONFIG.TIMEOUT_MS);

  const options: RequestInit = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  };

  try {
    const response = await fetch(urlStr, options);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Original API often returned 0 or empty array for not found
    if (data === 0 || !data || (Array.isArray(data) && data.length === 0)) {
      return [];
    }

    return Array.isArray(data) ? data : [data];
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Server is not responding.");
    }
    throw error;
  }
}
