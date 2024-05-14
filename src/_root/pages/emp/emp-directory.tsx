import MainHeaderFrame from '@/components/main-header-frame'
import { columns } from '@/components/emp-components/emp-column';
import { EmpTable } from '@/components/emp-components/emp-table';
import React from "react"
import { Employee } from '@/components/emp-components/emp-data/schema';
// import { Button } from '@/components/ui/button';
import { getEmpData } from '@/lib/appwrite/api';

// const getEmp = async () => { 
//     try {
//         const empData = await getEmpData();
//             console.log(empData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }


export default function EmpDirectoryPage() {

    const [data, setData] = React.useState<Employee[]>([]);

    React.useEffect(() => {
        const fetchAndMapEmployeeData = async () => {
            try {
                const employeesData = await getEmpData();
                console.log(employeesData);
                if (employeesData) {
                    const mappedEmployees = employeesData.map(employee => {
                        return {
                            id: employee.$id, // Use the employee ID field
                            EmpID: employee.EmpID.toString(), // Convert to string if needed
                            EmpName: employee.EmpName.trim(),
                            JoinDate: new Date(employee.JoinDate), // Convert to Date object
                            Status: employee.Status.toString(),
                            EmpPNumber: employee.EmpPNumber,
                            EmpEmail: employee.EmpEmail,
                            label: employee.label // Adjust as necessary
                        };
                    });
                    setData(mappedEmployees);
                } else {
                    console.error('No employee data found.');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchAndMapEmployeeData();
    }, []);

    return (
        <MainHeaderFrame>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Employee Directory</h2>
                        {/* <p className="text-muted-foreground">
                            Here's a list of your tasks for this month!
                        </p> */}
                        {/* <Button variant="ghost" size="icon" onClick={getEmp}>
                            Next
                        </Button> */}
                    </div>
                </div>
                <EmpTable columns={columns} data={data} />
            </div>
        </MainHeaderFrame>
    );
}

