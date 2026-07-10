export interface MinpopRecord extends Record<string, unknown> {
  P_ISFOUND?: string | number;
  P_EMPNAME?: string;
  // Keep original properties as optional for backwards compatibility
  OPERATOR_CODE?: string;
  OPERATOR_NAME?: string;
  SHIFT?: string;
}
