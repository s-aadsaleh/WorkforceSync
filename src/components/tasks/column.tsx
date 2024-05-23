
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "./data/data"
import { Task } from "./data/schema"
import { DataTableColumnHeader } from "./data-table/data-table-column-header"
import { DataTableRowActions } from "./data-table/data-table-row-actions"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"


export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "taskId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("taskId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const title = row.getValue<string>("title");
      const displayTitle = title.length > 70 ? title : undefined;
  
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          {title.length > 70 ? (
            <TooltipProvider delayDuration={250}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="max-w-[500px] truncate font-medium">
                    {`${title.slice(0, 70)}...`}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="max-w-[500px] truncate font-medium" title={displayTitle}>
              {title}
            </span>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      const formattedDate = dueDate ? new Date(dueDate).toLocaleDateString() : "-";
  
      const daysUntilDue = dueDate ? Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;

      const daysToConsiderClose = 3;
      const daysToConsiderMid = 7;
  

      let dueDateClass = "";
      if (dueDate && daysUntilDue !== null) {
        if (daysUntilDue === 0) {
          dueDateClass = "text-green-500 font-bold italic"; 
        } else if (daysUntilDue < 0) {
          dueDateClass = "text-gray-500 font-bold line-through italic"; 
        } else if (daysUntilDue <= daysToConsiderClose) {
          dueDateClass = "text-red-500 font-bold"; 
        } else if (daysUntilDue <= daysToConsiderMid) {
          dueDateClass = "text-yellow-500 font-bold"; 
        }
      }

      return (
        <TooltipProvider delayDuration={250}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`w-[120px] ${dueDateClass}`}>
                        {formattedDate}
                    </div>
                </TooltipTrigger>
                <TooltipContent >
                    {daysUntilDue !== null && daysUntilDue >= 0 ? (
                        <p>
                            {daysUntilDue === 0
                                ? "Due today"
                                : daysUntilDue === 1
                                    ? "1 day until due"
                                    : `${daysUntilDue} days until due`}
                        </p>
                    ) : (
                        <p>Overdue</p>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "assigned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      const assigned = row.original.assigned;
  
      return (
        <div className="flex items-center">
          <span>{assigned}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]