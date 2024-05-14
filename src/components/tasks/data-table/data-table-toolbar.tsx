import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from "sonner"


import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Label } from "@/components/ui/label"
import { addTask } from "@/lib/appwrite/api"
import { useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}


export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Provide a default value
  const [selectedPriority, setSelectedPriority] = useState<string>(''); // Provide a default value



  const handleAddTask = async () => {
    const newTaskId = parseInt((document.getElementById('newTaskId') as HTMLInputElement)?.value, 10);
    const title = (document.getElementById('title') as HTMLInputElement)?.value;

    // const [selectedStatus] = useState<string>(''); // Provide a default value
    // const [selectedPriority ] = useState<string>(''); // Provide a default value


    const taskData = {
        Title: title,
        Status: selectedStatus,
        Priority: selectedPriority,
        Description: '', // Assuming you want to set a default description
        'Task-ID': newTaskId,
    };
  
    console.log(taskData);
    try {
        const response = await addTask(taskData); // Call the addTask function with the task data
        if (response) {
          // Task added successfully
          console.log('Task added successfully:', response);
          toast("Task added successfully."); // Display the success toast message
          setTimeout(() => {
            window.location.assign(window.location.href); // Reload the page after a short delay
          }, 500); // Delay of 500 milliseconds (0.5 seconds)
        } else {
          // Handle the case where the task was not added successfully
          console.error('Error adding task: Task not added');
          toast("Uh oh! Something went wrong. Task not added.");
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding task:', error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
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
      <div className="flex px-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">New Task</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Task</SheetTitle>
              <SheetDescription>
                  Use the form below to add a new task to the list.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Task ID
                </Label>
                <Input id="newTaskId" placeholder="Type ID Here" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Title
                </Label>
                <Input id="title" placeholder="Type Title Here" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Backlog">Backlog</SelectItem>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
                {/* <button onClick={() => console.log(selectedStatus)}>
                  Log Selected Status
                </button> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Priority
                </Label>
                <Select
                value={selectedPriority}
                onValueChange={(value) => setSelectedPriority(value)}
                >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleAddTask}>Save task</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <DataTableViewOptions table={table} />
      <Toaster />
    </div>
  )
}