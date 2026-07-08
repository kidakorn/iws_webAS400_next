"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { QrCode, FileText } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { showQRDialog } from "./QrCodeDialog";

interface DataTableProps<T> {
  data: T[];
  onViewDetails: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  onViewDetails,
}: DataTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500 italic">
        Data not found
      </div>
    );
  }

  // Auto-generate columns from the first object's keys
  const columns = Object.keys(data[0]);

  const getBadgeText = (row: Record<string, unknown>) => {
    if (row.OPERATOR_CODE) return `OP Code: ${row.OPERATOR_CODE}`;
    if (row["ASSEMBLY LOT NO."]) return `Lot: ${row["ASSEMBLY LOT NO."]}`;
    return "QR Code";
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="font-semibold text-slate-700">
                  {col}
                </TableHead>
              ))}
              <TableHead className="text-center font-semibold text-slate-700 w-24">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-blue-50/50 transition-colors">
                {columns.map((col) => (
                  <TableCell key={col} className="text-slate-600">
                    {String(row[col])}
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 border-blue-200"
                      onClick={() => showQRDialog(row as Record<string, unknown>, "Generate QR Code", getBadgeText(row as Record<string, unknown>), () => onViewDetails(row))}
                      title="Generate QR Code"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100 border-slate-200"
                      onClick={() => onViewDetails(row)}
                      title="View Details"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
