"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { QrCode, FileText, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { showQRDialog } from "./QrCodeDialog";
import { useAuth } from "@/components/providers/AuthProvider";
import { ReportButton } from "@/components/reports/ReportButton";

interface DataTableProps<T> {
  data: T[];
  onViewDetails: (row: T) => void;
  searchTerm?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  onViewDetails,
  searchTerm,
}: DataTableProps<T>) {
  const { operator } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);

  const getBadgeText = (row: Record<string, unknown>) => {
    if (row.P_EMPNAME || row.OPERATOR_CODE) return `OP Code: ${searchTerm || row.OPERATOR_CODE || "Unknown"}`;
    if (row.P_DEVICECODE || row["ASSEMBLY LOT NO."]) return `Lot: ${searchTerm || row["ASSEMBLY LOT NO."] || "Unknown"}`;
    return "QR Code";
  };

  const buildQRPayload = (row: Record<string, unknown>) => {
    if (row.P_EMPNAME || row.OPERATOR_CODE) {
      return {
        empid: searchTerm || row.OPERATOR_CODE,
        name: row.P_EMPNAME || row.OPERATOR_NAME,
      };
    }
    if (row.P_DEVICECODE || row["ASSEMBLY LOT NO."]) {
      return {
        lotno: searchTerm || row["ASSEMBLY LOT NO."],
        deviceCode: row.P_DEVICECODE || row["DEVICE CODE"],
        wipCode: row.P_WIPCODE || row["PROCESS CODE"],
      };
    }
    return { ...row };
  };

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const columnHelper = createColumnHelper<T>();
    const keys = Object.keys(data[0]);
    
    const dynamicColumns = keys.map((key) => 
      columnHelper.accessor(key as any, {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="px-0 hover:bg-transparent font-semibold text-slate-700 h-auto"
            >
              {key}
              <ArrowUpDown className="ml-2 h-4 w-4 text-slate-400" />
            </Button>
          );
        },
        cell: (info) => String(info.getValue() ?? "-"),
      })
    );

    const actionColumn = columnHelper.display({
      id: "actions",
      header: () => <div className="text-center font-semibold text-slate-700">Actions</div>,
      cell: (info) => {
        const row = info.row.original as Record<string, unknown>;
        const isTalinf = !!row.P_DEVICECODE || !!row["ASSEMBLY LOT NO."];
        
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 border-blue-200"
              onClick={() => {
                const qrData = buildQRPayload(row) as Record<string, unknown>;
                if (operator && !qrData.empid) {
                  qrData["OP_CODE"] = operator.empId;
                }
                showQRDialog(qrData, "Generate QR Code", getBadgeText(row), () => onViewDetails(row as T));
              }}
              title="Generate QR Code"
            >
              <QrCode className="h-4 w-4" />
            </Button>
            
            {isTalinf && (
              <ReportButton data={row as any} searchTerm={searchTerm} />
            )}

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100 border-slate-200"
              onClick={() => onViewDetails(row as T)}
              title="View Details"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      size: 100,
    });

    return [...dynamicColumns, actionColumn];
  }, [data, searchTerm, operator, onViewDetails]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (!data || data.length === 0) {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-8 text-center text-slate-500 italic">
        Data not found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-sm border border-slate-200 bg-white">
        <ScrollArea className="w-full whitespace-nowrap rounded-sm">
          <Table>
            <TableHeader className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap px-4 py-3" style={{ width: header.getSize() !== 150 ? header.getSize() : "auto" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-slate-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of{" "}
          {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex rounded-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex rounded-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
