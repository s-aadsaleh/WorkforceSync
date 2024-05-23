import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { EmpTableToolbar } from "./emp-table-toolbar"
import { EmpTablePagination } from "./emp-table-pagination"
import LoadingSpinner from "../loadingSpinner"

interface EmpTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function EmpTable<TData, TValue>({
  columns,
  data,
}: EmpTableProps<TData, TValue>) {
    
  const [isLoading, setIsLoading] = React.useState(true); // Initialize loading state

    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
            []
        )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
    })

    // Simulate data fetching completion
    React.useEffect(() => {
      // Simulate data fetching delay
      const fetchData = async () => {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay
          setIsLoading(false); // Update loading state when data is fetched
      };

      fetchData();
  }, []); // Run effect only once on component mount

return (
    <div className="space-y-4">
      <EmpTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading || !table.getRowModel().rows ? ( // Show loading spinner if isLoading or data is not available
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8">
                  <LoadingSpinner size={24} className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <EmpTablePagination table={table} />
    </div>
);
}