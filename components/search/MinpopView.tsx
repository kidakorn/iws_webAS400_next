"use client";

import { useMinpopSearch } from "@/hooks/useMinpopSearch";
import { SearchCard } from "@/components/SearchCard";
import { DataTable } from "@/components/DataTable";
import { DetailDrawer } from "@/components/DetailDrawer";
import { StatusBadge } from "@/components/StatusBadge";

export function MinpopView() {
  const {
    searchTerm,
    setSearchTerm,
    searchState,
    handleSearch,
    selectedRow,
    isDrawerOpen,
    setIsDrawerOpen,
    handleRowSelect,
    validationError,
    loadMockData,
  } = useMinpopSearch();

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Operator Code Search</h1>
        <StatusBadge status={searchState.status} />
      </div>

      <SearchCard
        label="Employee ID (OP Code)"
        placeholder="e.g. 25066"
        maxLength={5}
        inputMode="numeric"
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        onLoadExample={loadMockData}
        isLoading={searchState.status === "loading"}
        error={validationError}
      />

      {searchState.status === "success" && searchState.data.length > 0 && (
        <DataTable
          data={searchState.data}
          onViewDetails={handleRowSelect}
          searchTerm={searchTerm}
        />
      )}

      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={selectedRow}
        title="Operator Details"
      />
    </div>
  );
}
