export interface ValidationResult {
  valid: boolean;
  message: string;
}

export type ApiStatus = "idle" | "loading" | "success" | "error" | "not-found";

export interface SearchState<T> {
  data: T[];
  status: ApiStatus;
  error: string | null;
}
