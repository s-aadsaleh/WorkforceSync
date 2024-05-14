import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { EmpTableViewOptions } from "../emp-components/emp-table-view-options"

import { Toaster } from "sonner"
import { Link } from "react-router-dom"
import { EmpTableFacetedFilter } from "./emp-table-faceted-filter"
import { statuses } from "./emp-data/data"

interface EmpTableToolbarProps<TData> {
  table: Table<TData>
}

export function EmpTableToolbar<TData>({
  table,
}: EmpTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("EmpName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("EmpName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Status") && (
          <EmpTableFacetedFilter
            column={table.getColumn("Status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2 px-2">
        <Link to="/employees/directory/details">
          <Button variant="outline">View Details</Button>
        </Link>
        <Link to="/employees/directory/add">
          <Button variant="outline">Add New Employee</Button>
        </Link>
      </div>
      <EmpTableViewOptions table={table} />
      <Toaster />
    </div>
  )
}