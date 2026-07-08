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
    <Card className="p-5 md:p-6 mb-6 shadow-sm border-slate-200">
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="w-full md:w-72 relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label}
          </label>
          <Input
            type="text"
            className={`font-mono ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            disabled={isLoading}
          />
          {error && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {error}
            </span>
          )}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={onSearch}
            disabled={isLoading}
            className="w-full md:w-32 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          >
            {isLoading ? (
              <span className="animate-spin mr-2 border-2 border-white/20 border-t-white rounded-full w-4 h-4" />
            ) : null}
            {isLoading ? "Loading" : "Load Data"}
          </Button>
          {onLoadExample && (
            <Button
              variant="outline"
              onClick={onLoadExample}
              disabled={isLoading}
              className="w-full md:w-32 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium shadow-sm transition-all border-slate-200"
            >
              Mock Data
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
