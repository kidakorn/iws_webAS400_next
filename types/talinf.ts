export interface TalinfRecord extends Record<string, unknown> {
  P_ISFOUND?: string | number;
  // Keep original properties as optional for backwards compatibility
  "ASSEMBLY LOT NO."?: string;
  "DEVICE CODE"?: string;
  "DEVICE NAME"?: string;
  "PROCESS CODE"?: string;
  QTY?: number;
}
