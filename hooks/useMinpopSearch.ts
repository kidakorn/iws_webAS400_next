import { useState } from "react";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { MinpopRecord } from "@/types/minpop";
import { SearchState } from "@/types/api";
import { validateEmployeeId } from "@/lib/validators/minpop";
import { fetchOperatorByEmpId } from "@/lib/api/minpop";
import { MOCK_MINPOP_DATA } from "@/lib/constants";

export function useMinpopSearch() {
  const [searchTerm, setSearchTerm] = useQueryState("q", { defaultValue: "" });
  const [searchState, setSearchState] = useState<SearchState<MinpopRecord>>({
    data: [],
    status: "idle",
    error: null,
  });
  const [selectedRow, setSelectedRow] = useState<MinpopRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSearch = async (overrideTerm?: string | React.MouseEvent | React.KeyboardEvent) => {
    const term = typeof overrideTerm === "string" ? overrideTerm : searchTerm;
    setValidationError("");
    
    if (!term) return;

    const validation = validateEmployeeId(term);
    if (!validation.valid) {
      setValidationError(validation.message);
      setSearchState((prev) => ({ ...prev, status: "error", error: validation.message }));
      toast.error("Validation Error", { description: validation.message });
      return;
    }

    setSearchState({ data: [], status: "loading", error: null });

    try {
      const data = await fetchOperatorByEmpId(term);
      
      if (data.length === 0) {
        setSearchState({ data: [], status: "not-found", error: "Data not found" });
        toast.warning("Not Found", { description: `No data found for Operator Code: ${term}` });
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
    setSearchTerm("25066");
    setSearchState({ data: MOCK_MINPOP_DATA, status: "success", error: null });
  };

  const handleRowSelect = (row: MinpopRecord) => {
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
