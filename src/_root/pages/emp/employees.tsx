import MainHeaderFrame from '@/components/main-header-frame'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'




const EmpPage = () => {

  return (
    <MainHeaderFrame>
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                <div className="flex h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
                </div>
            </div>
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
    </div>
</MainHeaderFrame>
  )
}

export default EmpPage