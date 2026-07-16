"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { KeyboardEvent } from "react";

interface SearchCardProps {
  label: string;
  placeholder: string;
  maxLength?: number;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onLoadExample?: () => void;
  isLoading: boolean;
  error?: string;
}

export function SearchCard({
  label,
  placeholder,
  maxLength,
  inputMode,
  value,
  onChange,
  onSearch,
  onLoadExample,
  isLoading,
  error,
}: SearchCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white p-5 md:p-6 mb-6 shadow-sm border border-slate-200 rounded-sm border-t-4 border-t-blue-600">
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="w-full md:w-72 relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label}
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-sm text-slate-700 ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {error && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {error}
            </span>
          )}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={onSearch}
            disabled={isLoading || !value.trim()}
            className="w-full md:w-32 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-spin mr-2 border-2 border-white/20 border-t-white rounded-full w-4 h-4" />
            ) : null}
            {isLoading ? "Searching..." : "Search"}
          </button>
          {onLoadExample && (
            <button
              onClick={onLoadExample}
              disabled={isLoading}
              className="w-full md:w-32 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium py-2 rounded-sm shadow-sm transition-colors"
            >
              Mock Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
