import { useState } from "react";
import Swal from "sweetalert2";
import { MinpopRecord } from "@/types/minpop";
import { SearchState } from "@/types/api";
import { validateEmployeeId } from "@/lib/validators/minpop";
import { fetchOperatorByEmpId } from "@/lib/api/minpop";
import { MOCK_MINPOP_DATA } from "@/lib/constants";

export function useMinpopSearch() {
  const [searchTerm, setSearchTerm] = useState("");
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
    
    const validation = validateEmployeeId(term);
    if (!validation.valid) {
      setValidationError(validation.message);
      setSearchState((prev) => ({ ...prev, status: "error", error: validation.message }));
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validation.message,
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    setSearchState({ data: [], status: "loading", error: null });

    try {
      const data = await fetchOperatorByEmpId(term);
      
      if (data.length === 0) {
        setSearchState({ data: [], status: "not-found", error: "Data not found" });
        Swal.fire({
          icon: "warning",
          title: "Not Found",
          text: `No data found for Operator Code: ${term}`,
          confirmButtonColor: "#2563EB",
        });
      } else {
        setSearchState({ data, status: "success", error: null });
      }
    } catch (err: any) {
      const msg = err.message || "An error occurred";
      setSearchState({ data: [], status: "error", error: msg });
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: msg,
        confirmButtonColor: "#2563EB",
      });
    }
  };

  const loadMockData = () => {
    setValidationError("");
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
