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

import { taskSchema } from "../data/schema"
import { deleteTask,  updateTaskStatus } from "@/lib/appwrite/api"
import { toast } from "sonner"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  const handleUpdateStatus = async (status: string) => {
    let updatedStatus = '';
  
    switch (status) {
      case 'done':
        updatedStatus = 'Done';
        break;
      case 'canceled':
        updatedStatus = 'Canceled';
        break;
      case 'inProgress':
        updatedStatus = 'In Progress';
        break;
      case 'backlog':
        updatedStatus = 'Backlog';
        break;
      default:
        updatedStatus = ''; // Handle any other cases or errors
    }
  
    if (updatedStatus) {
      // Call the updateTaskStatus function passing the task ID and updated status
      const response = await updateTaskStatus(task.id, { 'Status': updatedStatus });
  
      if (response) {
        console.log("Updated status");
        window.location.reload();
        // Handle success, maybe show a message or update the UI
      } else {
        // Handle error, show an error message or handle accordingly
      }
    } else {
      console.error("Invalid status provided");
      // Handle invalid status input
    }
  };

  const handleDelete = () => {
    try {
      deleteTask(task.id);
      console.log(`Deleting the task "${task.title}".`);
      toast(`Deleting the task "${task.title}".`);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log("Error deleting task");
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
                  <DropdownMenuItem onClick={() => handleUpdateStatus('inProgress')}>Mark as In Progress</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('done')}>Mark as Done</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('backlog')}>Mark as Backlog</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus('canceled')}>Mark as Canceled</DropdownMenuItem>
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