import MainHeaderFrame from "@/components/main-header-frame"
import { columns } from "@/components/tasks/column"
import { DataTable } from "@/components/tasks/data-table"
import { Task } from "@/components/tasks/data/schema"
import { getTasks } from "@/lib/appwrite/api"
import React from "react"

// const fetchTasks = async () => { 
//     try {
//         const tasksData = await getTasks();
//         if (tasksData) {
//             const mappedTasks = tasksData.map(task => {
//                 return {
//                     id: task.$id, // Use document ID here
//                     taskId: task["Task-ID"].toString(), // Use task ID for consistency
//                     title: task["Title"].trim(),
//                     status: task["Status"].toLowerCase(),
//                     label: task["Task-ID"].toString(), // You can modify this as needed
//                     priority: task["Priority"].toLowerCase()
//                 };
//             });
//             console.log(mappedTasks);
//         } else {
//             console.error('No tasks data found.');
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

export default function TasksPage() {
    const [data, setData] = React.useState<Task[]>([]);

    React.useEffect(() => {
        const fetchAndMapData = async () => {
            try {
                const tasksData = await getTasks();
                if (tasksData) {
                    const mappedTasks = tasksData.map(task => {
                        return {
                            id: task.$id, // Use document ID here
                            taskId: task["Task-ID"].toString(), // Use task ID for consistency
                            title: task["Title"].trim(),
                            status: task["Status"].toLowerCase(),
                            label: task["Task-ID"].toString(), // You can modify this as needed
                            priority: task["Priority"].toLowerCase()
                        };
                    });
                    setData(mappedTasks);
                } else {
                    console.error('No tasks data found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAndMapData();
    }, []);
    

    return (
        <MainHeaderFrame>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here's a list of your tasks for this month!
                        </p>
                        {/* <Button variant="ghost" size="icon" onClick={fetchTasks}>
                            Next
                        </Button> */}
                    </div>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </MainHeaderFrame>
    );
}