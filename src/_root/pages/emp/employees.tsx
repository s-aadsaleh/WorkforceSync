import MainHeaderFrame from '@/components/main-header-frame'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import { cn } from "@/lib/utils"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const EmpPage = () => {
    const [date, setDate] = React.useState<Date>()
    const test = () => {
        console.log(date)
    }

  return (
    <MainHeaderFrame>
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <Link to="/employees/overview">
                        <Button>Go to Overview</Button>
                    </Link>
                    <Link to="/employees/directory">
                        <Button>Go to Directory</Button>
                    </Link>
                    <Link to="/employees/directory/add">
                        <Button>Go to Add Employees</Button>
                    </Link>
                    <Link to="/employees/directory/details">
                        <Button>Go to Employee Details</Button>
                    </Link>
                    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <Button onClick={test}>Test</Button>
                </div>
            </div>
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
    </div>
</MainHeaderFrame>
  )
}

export default EmpPage