// import { UseDroppableArguments, useDroppable } from '@dnd-kit/core'
// import { Space } from 'antd'
// import React from 'react'

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { PlusIcon } from "@radix-ui/react-icons"
// import { getStages, getTasks } from '@/lib/appwrite/api'

// type Props = {
//   id: string,
//   title: string,
//   description?: React.ReactNode,
//   count: number,
//   data?: UseDroppableArguments['data'],
//   onAddClick?: (args: { id: string }) => void,
// }

// const KanbanColumn = ({
//   children,
//   id,
//   title,
//   description,
//   count,
//   data,
//   onAddClick
// }: React.PropsWithChildren<Props>) => {
//   const { isOver, setNodeRef, active } = useDroppable({ id, data, })
  
//   const onAddClickHandler = () => {
//     onAddClick?.({ id })
//   }

//   // const handleClick = async () => {
//   //   const tasksData = await getStages();
//   //   // Sort tasks by due date
//   //   // Sort tasks by due date in ascending order
//   //   const sortedTasks = tasksData.slice().sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
//   //   console.log(sortedTasks);
//   // };

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0 16px'
//       }}
//     >
//       <div style={{ padding: '12px' }}>
//         <Space style={{ width: '100%', justifyContent: 'space-between'}}>
//           <Space>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <small className="text-sm font-medium leading-none">
//                     {title}
//                   </small>
//                   <TooltipContent>
//                     <p>{title}</p>
//                   </TooltipContent>
//                 </TooltipTrigger>
//               </Tooltip>
//             </TooltipProvider>
//             {!!count && <Badge>{count}</Badge> }
//             <Button variant="ghost" size="icon" >
//               <PlusIcon className="h-4 w-4" />
//             </Button>
//           </Space>
//         </Space>
//         {description}
//       </div>
//       <div
//         style={{
//           flex: 1,
//           overflowY: active ? 'unset' : 'auto',
//           border: '2px dashed rgba(255, 255, 255, 0.2)', // Adjust the color and opacity for better contrast
//           borderColor: isOver ? '#00040' : 'transparent', // Use a contrasting color for border
//           borderRadius: '8px'
//         }}
//       >
//         <div
//           style={{
//             marginTop: "12px",
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '8px'
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default KanbanColumn