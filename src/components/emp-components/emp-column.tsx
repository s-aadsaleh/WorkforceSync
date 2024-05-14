
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels } from "./emp-data/data"
import { Employee } from "./emp-data/schema"
import { EmpTableColumnHeader } from "./emp-table-column-header"
// import { EmpTableRowActions } from "./emp-table-row-actions"


export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
{
  accessorKey: "EmpID",
  header: ({ column }) => (
    <EmpTableColumnHeader column={column} title="ID" />
  ),
  cell: ({ row }) => <div className="w-[60px]">{row.getValue("EmpID")}</div>, // Adjust width here
  enableSorting: true,
  enableHiding: true,
},
  {
    accessorKey: "EmpName",
    header: ({ column }) => (
      <EmpTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("EmpName")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "JoinDate",
    header: ({ column }) => (
      <EmpTableColumnHeader column={column} title="Join Date" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const fullDate = new Date(row.original.JoinDate);
      const formattedDate = `${fullDate.getFullYear()}-${(fullDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fullDate.getDate().toString().padStart(2, "0")}`;
  
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {formattedDate}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "Status",
  //   header: ({ column }) => (
  //     <EmpTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("Status")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <EmpTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const status: string = row.getValue("Status") as string; // Explicitly define status as string
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
    accessorKey: "EmpPNumber",
    header: ({ column }) => (
      <EmpTableColumnHeader column={column} title="Phone No" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("EmpPNumber")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "EmpEmail",
    header: ({ column }) => (
      <EmpTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("EmpEmail")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
//   {
//     accessorKey: "priority",
//     header: ({ column }) => (
//       <EmpTableColumnHeader column={column} title="Priority" />
//     ),
//     cell: ({ row }) => {
//       const priority = priorities.find(
//         (priority) => priority.value === row.getValue("priority")
//       )

//       if (!priority) {
//         return null
//       }

//       return (
//         <div className="flex items-center">
//           {priority.icon && (
//             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{priority.label}</span>
//         </div>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//     enableSorting: false,
//     enableHiding: true,
//   },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <EmpTableRowActions row={row} />,
  // },
]