import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getEmpData } from "@/lib/appwrite/api";

type Employee = {
    EmpID: string;
    EmpName: string;
    JoinDate: string;
    Status: string;
    EmpPNumber: string;
    EmpEmail: string;
};

const EmployeeCards: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmpData() as Employee[] | null;
            if (data) {
                setEmployees(data);
            }
        };

        fetchData();
    }, []);

    const statusCounts = employees.reduce((acc, emp) => {
        acc[emp.Status] = (acc[emp.Status] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //         <Card>
    //             <CardHeader className="pb-2">
    //                 <CardDescription>Total Employees</CardDescription>
    //                 <CardTitle className="text-4xl">{employees.length}</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="text-xs text-muted-foreground">
    //                     Total number of employees in the company
    //                 </div>
    //             </CardContent>
    //         </Card>
    //         {Object.keys(statusCounts).map(status => (
    //             <Card key={status}>
    //                 <CardHeader className="pb-2">
    //                     <CardDescription>{status} Employees</CardDescription>
    //                     <CardTitle className="text-4xl">{statusCounts[status]}</CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="text-xs text-muted-foreground">
    //                         Number of employees with status: {status}
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //         ))}
    //     </div>
    // );
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Employees</CardDescription>
              <CardTitle className="text-4xl">{employees.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total number of employees   currently in the organization
              </div>
            </CardContent>
          </Card>
          {Object.keys(statusCounts).map(status => (
            <Card key={status}>
              <CardHeader className="pb-2">
                <CardDescription>{status} Employees</CardDescription>
                <CardTitle className="text-4xl">{statusCounts[status]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Employees with status: {status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
      
};

export default EmployeeCards;
