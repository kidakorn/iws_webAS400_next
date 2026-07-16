import { useState } from 'react';
import { FileOutput, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLotReport } from '@/hooks/useLotReport';
import { TalinfRecord } from '@/types/talinf';

interface ReportButtonProps {
  data: TalinfRecord;
  searchTerm?: string;
  variant?: 'icon' | 'button';
  className?: string;
}

export function ReportButton({ data, searchTerm, variant = 'icon', className = '' }: ReportButtonProps) {
  const { generateReport, isGenerating } = useLotReport();

  const handlePrint = async () => {
    try {
      toast.info('Generating PDF Report...', { id: 'report-gen' });
      await generateReport(data, searchTerm);
      toast.success('Report generated successfully!', { id: 'report-gen' });
    } catch (error) {
      toast.error('Failed to generate report', { id: 'report-gen' });
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handlePrint}
        disabled={isGenerating}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 ${className}`}
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileOutput className="mr-2 h-4 w-4" />
        )}
        Print Report
      </button>
    );
  }

  // Icon variant for table actions
  return (
    <button
      onClick={handlePrint}
      disabled={isGenerating}
      title="Print Report"
      className={`p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
      ) : (
        <FileOutput className="w-4 h-4" />
      )}
    </button>
  );
}
