export interface TalinfRecord extends Record<string, unknown> {
  P_ISFOUND?: string | number;
  // Actual fields from API
  P_DEVICECODE?: string;
  P_WIPCODE?: string;
  // Future fields
  P_STATUS_LOT?: string;
  P_CREATE_DATE?: string;
  P_CREATE_TIME?: string;
  P_UPDATE_DATE?: string;
  P_UPDATE_TIME?: string;
  P_PROCESS_NAME?: string;
  // Keep original properties as optional for backwards compatibility
  "ASSEMBLY LOT NO."?: string;
  "DEVICE CODE"?: string;
  "DEVICE NAME"?: string;
  "PROCESS CODE"?: string;
  QTY?: number;
}
