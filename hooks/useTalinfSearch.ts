import { useState } from "react";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { TalinfRecord } from "@/types/talinf";
import { SearchState } from "@/types/api";
import { validateLotNo } from "@/lib/validators/talinf";
import { fetchLotByLotNo } from "@/lib/api/talinf";
import { MOCK_TALINF_DATA } from "@/lib/constants";

export function useTalinfSearch() {
  const [searchTerm, setSearchTerm] = useQueryState("q", { defaultValue: "" });
  const [searchState, setSearchState] = useState<SearchState<TalinfRecord>>({
    data: [],
    status: "idle",
    error: null,
  });
  const [selectedRow, setSelectedRow] = useState<TalinfRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSearch = async (overrideTerm?: string | React.MouseEvent | React.KeyboardEvent) => {
    const term = typeof overrideTerm === "string" ? overrideTerm : searchTerm;
    setValidationError("");
    
    if (!term) return;

    const validation = validateLotNo(term);
    if (!validation.valid) {
      setValidationError(validation.message);
      setSearchState((prev) => ({ ...prev, status: "error", error: validation.message }));
      toast.error("Validation Error", { description: validation.message });
      return;
    }

    setSearchState({ data: [], status: "loading", error: null });

    try {
      const data = await fetchLotByLotNo(term);
      
      if (data.length === 0) {
        setSearchState({ data: [], status: "not-found", error: "Data not found" });
        toast.warning("Not Found", { description: `No data found for Lot No: ${term}` });
      } else {
        setSearchState({ data, status: "success", error: null });
        toast.success(`Found ${data.length} records`);
      }
    } catch (err: any) {
      const msg = err.message || "An error occurred";
      setSearchState({ data: [], status: "error", error: msg });
      toast.error("API Error", { description: msg });
    }
  };

  const loadMockData = () => {
    setValidationError("");
    setSearchTerm("05245-0001-421-001");
    setSearchState({ data: MOCK_TALINF_DATA, status: "success", error: null });
  };

  const handleRowSelect = (row: TalinfRecord) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const clearResults = () => {
    setSearchTerm("");
    setValidationError("");
    setSearchState({ data: [], status: "idle", error: null });
  };

  return {
    searchTerm,
    setSearchTerm,
    searchState,
    handleSearch,
    selectedRow,
    isDrawerOpen,
    setIsDrawerOpen,
    handleRowSelect,
    clearResults,
    validationError,
    loadMockData,
  };
}
