import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { empSchema } from "./emp-data/schema"
import { deleteEmp } from "@/lib/appwrite/api"

interface EmpTableRowActionsProps<TData> {
  row: Row<TData>
}

export function EmpTableRowActions<TData>({
  row,
}: EmpTableRowActionsProps<TData>) {
  const emp = empSchema.parse(row.original)

  const handleDelete = () => {
    try {
      deleteEmp(emp.id);
      console.log(`Deleting the employee "${emp.EmpName}".`);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log("Error deleting employee");
    }
  };

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Mark Task</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {/* <DropdownMenuItem onClick={() => handleUpdateStatus('inProgress')}>Mark as In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('done')}>Mark as Done</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('backlog')}>Mark as Backlog</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('canceled')}>Mark as Canceled</DropdownMenuItem> */}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
              Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}