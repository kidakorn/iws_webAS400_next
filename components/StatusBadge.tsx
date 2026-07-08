import { ApiStatus } from "@/types/api";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: ApiStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "idle") {
    return <Badge variant="outline" className="text-slate-500 border-slate-200">Ready</Badge>;
  }

  if (status === "loading") {
    return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Loading...</Badge>;
  }

  if (status === "success") {
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Success</Badge>;
  }

  if (status === "error" || status === "not-found") {
    return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
  }

  return null;
}
