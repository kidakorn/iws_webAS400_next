"use client";

import { useTalinfSearch } from "@/hooks/useTalinfSearch";
import { SearchCard } from "@/components/SearchCard";
import { DataTable } from "@/components/DataTable";
import { DetailDrawer } from "@/components/DetailDrawer";
import { StatusBadge } from "@/components/StatusBadge";

export function TalinfView() {
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
  } = useTalinfSearch();

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Lot Information Search</h1>
        <StatusBadge status={searchState.status} />
      </div>

      <SearchCard
        label="Search ID (Lot Information)"
        placeholder="e.g. 05245-0001-421-001"
        maxLength={18}
        inputMode="text"
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
        />
      )}

      <DetailDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        data={selectedRow as Record<string, unknown> | null}
        title="Record Details"
      />
    </div>
  );
}
