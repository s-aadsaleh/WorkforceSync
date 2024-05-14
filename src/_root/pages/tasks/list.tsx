// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

// import { MainNav } from "@/components/dashboard-components/main-nav"
// // import { Search } from "@/components/dashboard-components/search"
// import TeamSwitcher from "@/components/dashboard-components/team-switcher"
// import { UserNav } from "@/components/dashboard-components/user-nav"
// import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
// import KanbanColumn from '@/components/tasks/kanban/column'
// import KanbanItem from '@/components/tasks/kanban/item'

// import { getStages, getTasks } from '@/lib/appwrite/api'
// import LoadingSpinner from '@/components/loadingSpinner'
// import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card'
// import KanbanAddCardButton from '@/components/tasks/kanban/add-card-button'
// import { DragEndEvent } from '@dnd-kit/core'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// import { CircleUser, Menu, Package2, Search } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';

// interface Task {
//   id: string;
//   stageID: string | null;
//   title: string;
//   description: string;
//   dueDate: string; 
//   completed: boolean; 
//   createdAt: string; 
//   updatedAt: string; 
//   users: Array<{ id: string; name: string; avatarUrl: string }>; 
//   // Add any other properties 
// }

// interface TaskStage {
//   id: string;
//   title: string;
//   // Add other properties
// }

// const List = ({ children }: React.PropsWithChildren) => {

//     const navigate = useNavigate();
    
//     //Redirecting if not authenticated 
//     useEffect(() => {
//       if (
//         localStorage.getItem('cookieFallback') === '[]' ||
//         localStorage.getItem('cookieFallback') === null
//       ) {
//         navigate('/login');
//       } else {
//         navigate('/tasks');
//       }
//     }, []);  
    
//     const useAppwriteData = () => {
//       const [tasks, setTasks] = useState<Task[]>([]);
//       const [stages, setStages] = useState<TaskStage[]>([]);
//       const [isLoading, setIsLoading] = useState(true);
    
//       useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const tasks = await getTasks();
//             const stages = await getStages();
//             setTasks(tasks);
//             setStages(stages);
    
//             setIsLoading(false);
//             // console.log(tasks);
//             // console.log(stages);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//             setIsLoading(false);
//           }
//         };
    
//         fetchData();
//       }, []);
    
//       return { tasks, stages, isLoading };
//     };

//     const { tasks, stages, isLoading } = useAppwriteData();

//     // const taskStages = React.useMemo(() => {

//     //   if (!tasks || !stages) {
//     //     return {
//     //       unassignedStage: [],
//     //       stages: []
//     //     };
//     //   }
    
//     //   const unassignedStage = tasks.filter((task) => task.stageID === null);
//     //   console.log(unassignedStage.length);

//     //   const grouped = stages.map((stage) => ({
//     //     ...stage,
//     //     tasks: tasks.filter((task) => task.stageID?.toString() === stage.id)
//     //   }));
    

//     //   return {
//     //     unassignedStage,
//     //     columns: grouped
//     //   };
//     // }, [stages, tasks ]);

//     const taskStages = React.useMemo(() => {
//       if (!tasks || !stages) {
//         return {
//           unassignedStage: [],
//           columns: []
//         };
//       }
    
//       const unassignedStage = tasks.filter((task) => !task.stageID);
    
//       const grouped = stages.map((stage) => {
//         const tasksForStage = tasks.filter((task) => task.stageID === stage.title);
//         return {
//           ...stage,
//           tasks: tasksForStage
//         };
//       });
    
//       return {
//         unassignedStage,
//         columns: grouped
//       };
//     }, [stages, tasks]);
    
//   //   const taskStages = React.useMemo(() => {
//   //     if (!tasks || !stages) {
//   //         return {
//   //             unassignedStage: [],
//   //             todoStage: [],
//   //             inProgressStage: [],
//   //             inReviewStage: [],
//   //             doneStage: []
//   //         };
//   //     }
  
//   //     const unassignedStage = tasks.filter((task) => task.stageID === null);
//   //     const todoStage = tasks.filter((task) => task.stageID === 'TODO');
//   //     const inProgressStage = tasks.filter((task) => task.stageID === 'IN PROGRESS');
//   //     const inReviewStage = tasks.filter((task) => task.stageID === 'IN REVIEW');
//   //     const doneStage = tasks.filter((task) => task.stageID === 'DONE');
  
//   //     const grouped = stages.map((stage) => ({
//   //         ...stage,
//   //         tasks: tasks.filter((task) => task.stageID?.toString() === stage.id)
//   //     }));
  
//   //     return {
//   //         unassignedStage,
//   //         todoStage,
//   //         inProgressStage,
//   //         inReviewStage,
//   //         doneStage,
//   //         columns: grouped
//   //     };
//   // }, [stages, tasks]);
  
//     console.log(taskStages)
    
//     const handleAddCard = (args: { stageID: string}) => {
//       const path = args.stageID === 'unassigned' 
//         ? '/tasks/new'
//         : `/tasks/new?stageId=${args.stageID}` 
    
//       window.history.pushState({}, '', path);
//     }
  

//     return (
//       <>
//         <div className="flex min-h-screen w-full flex-col">
//           <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
//             <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//               <Link 
//                 to="#"
//                 className="flex items-center gap-2 text-lg font-semibold md:text-base"
//               >
//                 <Package2 className="h-6 w-6" />
//                 <span className="sr-only">Acme Inc</span>
//               </Link>
//               <Link 
//                 to="/dashboard"
//                 className="text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Overview
//               </Link>
//               <Link 
//                 to="/tasks"
//                 className="text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Tasks
//               </Link>
//               <Link 
//                 to="/chat"
//                 className="text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Chats
//               </Link>
//               <Link 
//                 to="/settings"
//                 className="text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Settings
//               </Link>
//             </nav>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="shrink-0 md:hidden"
//                 >
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left">
//                 <nav className="grid gap-6 text-lg font-medium">
//                   <Link
//                     to="#"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <Package2 className="h-6 w-6" />
//                     <span className="sr-only">Acme Inc</span>
//                   </Link>
//                   <Link to="#" className="hover:text-foreground">
//                     Dashboard
//                   </Link>
//                   <Link
//                     to="#"
//                     className="text-muted-foreground hover:text-foreground"
//                   >
//                     Orders
//                   </Link>
//                   <Link
//                     to="#"
//                     className="text-muted-foreground hover:text-foreground"
//                   >
//                     Products
//                   </Link>
//                   <Link
//                     to="#"
//                     className="text-muted-foreground hover:text-foreground"
//                   >
//                     Customers
//                   </Link>
//                   <Link
//                     to="#"
//                     className="text-muted-foreground hover:text-foreground"
//                   >
//                     Analytics
//                   </Link>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//             <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
//               <form className="ml-auto flex-1 sm:flex-initial">
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     type="search"
//                     placeholder="Search..."
//                     className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//                   />
//                 </div>
//               </form>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="secondary" size="icon" className="rounded-full">
//                     <CircleUser className="h-5 w-5" />
//                     <span className="sr-only">Toggle user menu</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>Settings</DropdownMenuItem>
//                   <DropdownMenuItem>Support</DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>Logout</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </header>
//           <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//             <div >
//               {isLoading ? (
//                 // Display loading spinner while data is loading
//                 <div className="flex items-center justify-center py-4">
//                 <LoadingSpinner className="mr-2 h-4 w-4" />
//                 <span>Loading...</span>
//                 </div>
//               ) : (
//                 // Rendering component when data is loaded
//                 <KanbanBoardContainer>
//                     <KanbanBoard>
//                         <KanbanColumn
//                             id="unassigned"
//                             title={"UNASSIGNED"}
//                             count={taskStages.unassignedStage.length || 0}
//                             onAddClick={() => handleAddCard({ stageID: 'unassigned' })}
//                         >
//                           {taskStages.unassignedStage.map((task) => (
//                             <KanbanItem key={task.id} id={task.id}
//                               data={{ ...task, stageID: 'unassigned' }}
//                             >
//                               <ProjectCardMemo 
//                                 {...task}
//                                 dueDate={task.dueDate || undefined}
//                               />
//                             </KanbanItem>
//                           ))}

//                           {!taskStages.unassignedStage.length && (
//                             <KanbanAddCardButton 
//                             onClick={() => handleAddCard({ stageID: 'unassigned' })}
//                             />
//                           )}
//                         </KanbanColumn>

//                         {taskStages.columns?.map((column) => (
//                           <KanbanColumn
//                             key={column.id}
//                             id={column.id}
//                             title={column.title}
//                             count={column.tasks.length}
//                             onAddClick={() => handleAddCard({ stageID: column.id })}
//                           >
//                             {!isLoading && column.tasks.map((task) => (
//                               <KanbanItem key={task.id} id={task.id} data={task}>
//                                 <ProjectCardMemo 
//                                   {...task}
//                                   dueDate={task.dueDate || undefined}
//                                 />
//                               </KanbanItem>
//                             ))}
//                             {!column.tasks.length && (
//                               <KanbanAddCardButton 
//                               onClick={() => handleAddCard({ stageID: column.id })}
//                             />
//                             )}
//                           </KanbanColumn>
//                         ))}
//                     </KanbanBoard>
//                 </KanbanBoardContainer>
//               )}
//             </div>
//           </main>
//         </div>
//       </>
//         // <>
//         //     <div className="hidden w-119/200 md:flex flex-col">
//         //         <div className="w-full border-b">
//         //             <div className="flex h-16 items-center px-4">
//         //             <TeamSwitcher />
//         //             <MainNav className="mx-6" />
//         //             <div className="ml-auto flex items-center space-x-4">
//         //                 <Search />
//         //                 <UserNav />
//         //             </div>
//         //             </div>
//         //         </div>
//         //         <div >
//         //             {isLoading ? (
//         //                 // Display loading spinner while data is loading
//         //                 <div className="flex items-center justify-center py-4">
//         //                 <LoadingSpinner className="mr-2 h-4 w-4" />
//         //                 <span>Loading...</span>
//         //                 </div>
//         //             ) : (
//         //                 // Rendering component when data is loaded
//         //                 <KanbanBoardContainer>
//         //                     <KanbanBoard>
//         //                         <KanbanColumn
//         //                             id="unassigned"
//         //                             title={"UNASSIGNED"}
//         //                             count={taskStages.unassignedStage.length || 0}
//         //                             onAddClick={() => handleAddCard({ stageID: 'unassigned' })}
//         //                         >
//         //                           {taskStages.unassignedStage.map((task) => (
//         //                             <KanbanItem key={task.id} id={task.id}
//         //                              data={{ ...task, stageID: 'unassigned' }}
//         //                             >
//         //                               <ProjectCardMemo 
//         //                                 {...task}
//         //                                 dueDate={task.dueDate || undefined}
//         //                               />
//         //                             </KanbanItem>
//         //                           ))}

//         //                           {!taskStages.unassignedStage.length && (
//         //                             <KanbanAddCardButton 
//         //                             onClick={() => handleAddCard({ stageID: 'unassigned' })}
//         //                             />
//         //                           )}
//         //                         </KanbanColumn>

//         //                         {taskStages.columns?.map((column) => (
//         //                           <KanbanColumn
//         //                             key={column.id}
//         //                             id={column.id}
//         //                             title={column.title}
//         //                             count={column.tasks.length}
//         //                             onAddClick={() => handleAddCard({ stageID: column.id })}
//         //                           >
//         //                             {!isLoading && column.tasks.map((task) => (
//         //                               <KanbanItem key={task.id} id={task.id} data={task}>
//         //                                 <ProjectCardMemo 
//         //                                   {...task}
//         //                                   dueDate={task.dueDate || undefined}
//         //                                 />
//         //                               </KanbanItem>
//         //                             ))}
//         //                             {!column.tasks.length && (
//         //                               <KanbanAddCardButton 
//         //                               onClick={() => handleAddCard({ stageID: column.id })}
//         //                             />
//         //                             )}
//         //                           </KanbanColumn>
//         //                         ))}
//         //                     </KanbanBoard>
//         //                 </KanbanBoardContainer>
//         //             )}
//         //         </div>
//         //     </div>
//         //     {children}
//         // </>
//     )
// }

// export default List
