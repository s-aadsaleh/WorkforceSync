import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Assets } from "./assets-data/schema"
import { deleteAsset } from "@/lib/appwrite/api"
import { toast } from "sonner"

interface AssetsTableRowActionsProps {
  row: Row<Assets>
}

export function AssetsTableRowActions({
  row,
}: AssetsTableRowActionsProps) {
  const handleDelete = () => {
    try {
      deleteAsset(row.original.id);
      // console.log(`Deleting the asset "${row.original.AssetsName}".`);
      toast(`Deleting the asset "${row.original.AssetsName}" from the record.`);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log("Error deleting asset");
      toast("Error deleting asset");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}