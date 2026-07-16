import React from "react";
import { X, FileText, Database } from "lucide-react";
import { ReportButton } from "@/components/reports/ReportButton";

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, unknown> | null;
  title?: string;
}

export function DetailDrawer({ isOpen, onClose, data, title = "Details" }: DetailDrawerProps) {
  if (!isOpen || !data) return null;

  const entries = Object.entries(data);
  const isTalinf = !!data.P_DEVICECODE || !!data["ASSEMBLY LOT NO."];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Record Information</h3>
          </div>
          
          <div className="space-y-0 border-t border-slate-200">
            {entries.map(([key, value], index) => (
              <div 
                key={key} 
                className={`py-3 border-b border-slate-100 flex flex-col gap-1 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <span className="text-xs font-semibold text-slate-500">{key}</span>
                <span className="text-sm font-medium text-slate-900 break-words">
                  {value !== null && value !== undefined && value !== "" 
                    ? String(value) 
                    : <span className="text-slate-300 italic">N/A</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        {isTalinf && (
          <div className="p-4 border-t border-slate-200 bg-white">
            <ReportButton data={data as any} variant="button" className="w-full" />
          </div>
        )}
      </div>
    </>
  );
}
