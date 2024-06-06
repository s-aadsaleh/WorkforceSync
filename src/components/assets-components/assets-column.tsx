
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

import { labels } from "./assets-data/data"
import { Assets } from "./assets-data/schema"
import { AssetsTableColumnHeader } from "./assets-table-column-header"
import { AssetsTableRowActions } from "./assets-table-row-actions"


export const columns: ColumnDef<Assets>[] = [

  {
    id: "spacer",
    cell: ({ }) => <div/>,
  },
  {
    accessorKey: "AssetsID",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[30px]">{row.getValue("AssetsID")}</div>, // Adjust width here
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "AssetsName",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Asset Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2 w-[150px]">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("AssetsName")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "AssetsStatus",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Asset Status" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const status: string = row.getValue("AssetsStatus") as string; // Explicitly define status as string
      const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-normal">
            {capitalizedStatus}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "AssetsType",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Asset Type" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("AssetsType")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "AllocatedTo",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Allocated To" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("AllocatedTo")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "AssetsRemarks",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Remarks" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("AssetsRemarks")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "AssetsValue",
    header: ({ column }) => (
      <AssetsTableColumnHeader column={column} title="Asset Value" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("AssetsValue")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <AssetsTableRowActions row={row} />,
  },
]