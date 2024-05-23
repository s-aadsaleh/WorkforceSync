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
import { addTask, getEmpNamesData } from "@/lib/appwrite/api"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { format } from 'date-fns';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Provide a default value
  const [selectedPriority, setSelectedPriority] = useState<string>(''); // Provide a default value
  
  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const names = await getEmpNamesData();
        if (names) {
          setEmployeeNames(names.map(emp => emp.EmpName));
        }
      } catch (error) {
        console.error('Error fetching employee names:', error);
      }
    };

    fetchEmployeeNames();
  }, []);

  const handleAddTask = async () => {
    const newTaskId = parseInt((document.getElementById('newTaskId') as HTMLInputElement)?.value, 10);
    const title = (document.getElementById('title') as HTMLInputElement)?.value;

    const taskData = {
        Title: title,
        Status: selectedStatus,
        Priority: selectedPriority,
        Description: '', // Assuming you want to set a default description
        'Task-ID': newTaskId,
        DueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : '',  // Convert Date to string
        Assigned: selectedEmployee,
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
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="col-span-3">
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                </Popover>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Assigned to
                </Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={(value) => setSelectedEmployee(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeNames.map((name, index) => (
                      <SelectItem key={index} value={name}>{name}</SelectItem>
                    ))}
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
