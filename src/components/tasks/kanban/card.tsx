// import React, { memo, useMemo } from 'react'
// // import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, Tooltip, theme } from 'antd'
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"

// // import { EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons'
// import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'

// import { TextIcon } from 'lucide-react'
// import { getDateColor } from '@/utilities'
// import dayjs from 'dayjs'
// import { Button, Card, ConfigProvider, Dropdown, MenuProps, Tag, theme } from 'antd'

// type ProjectCardProps = {
//   id: string,
//   title: string,
//   description: string,
//   updatedAt: string,
//   dueDate?: string,
//   users?: {
//     id: string,
//     name: string,
//   }[]
// }

// const ProjectCard = ({ id, title, description, dueDate, users }: ProjectCardProps) => {


//   const { token } = theme.useToken();

//   const dueDateOptions = useMemo(() => {
//     if(!dueDate) return null;

//     const date = dayjs(dueDate);

//     return {
//       color: getDateColor({ date: dueDate}) as string,
//       text: date.format('MMM DD')
//     }
//   }, [dueDate]);

//   const dropdownItems = useMemo(() => {
//     const dropdownItems: MenuProps['items'] = [
//       {
//         label: 'View card',
//         key: '1',
//         icon: <EyeOutlined />,
//         onClick: () => {
//           console.log('View card clicked');
//         }
//       },
//       {
//         danger: true,
//         label: 'Delete card',
//         key: '2',
//         icon: <DeleteOutlined />,
//         onClick: () => {
//           console.log('Delete card clicked');
//         }
//       }
//     ]

//     return dropdownItems
//   }, [])

//   return (
//     // <Card>
//     //   <CardHeader className="w-[250px]">
//     //     <CardTitle>{title}</CardTitle>
//     //     <CardDescription>{description}</CardDescription>
//     //     <div
//     //       style={{
//     //         display: 'flex',
//     //         flexWrap: 'wrap',
//     //         alignItems: 'center',
//     //         gap: '8px'
//     //       }}
//     //     >
//     //       <TextIcon style={{marginRight: '4px'}} />
//     //       {dueDateOptions && (
//     //         <Tag
//     //           icon={<ClockCircleOutlined style={{fontSize: '12px'}} />}
//     //           style={{
//     //             padding: '0 4px',
//     //             marginInlineEnd: '0',
//     //             backgroundColor: dueDateOptions.color === 'default' ? '#FFFFFF' : 'unset',
//     //             borderColor: dueDateOptions.color === 'default' ? '#d9d9d9' : 'unset',
//     //           }}
//     //           color={dueDateOptions.color}
//     //           bordered={dueDateOptions.color !== 'default'}
//     //         >
//     //           {dueDateOptions.text}
//     //         </Tag>
//     //       )}
//     //     </div>
//     //   </CardHeader>
//     //   <CardFooter className="flex justify-between">
//     //     <Button variant="secondary">
//     //       <EyeOpenIcon className="mr-2 h-4 w-4" />View</Button>
//     //     <Button variant="destructive">
//     //       <TrashIcon className="mr-2 h-4 w-4" />Delete
//     //     </Button>
//     //   </CardFooter>
//     // </Card>
// <ConfigProvider
//       theme={{
//         components: {
//           Tag: {
//             colorText: token.colorTextSecondary, 
//           },
//           Card: {
//             headerBg: 'transparent',
//           }
//         }
//       }}
//     >
//       <Card
//         size="small"
//         title={title}
//         onClick={() => console.log('Card clicked')}
//         extra={
//           <Dropdown
//             trigger={["click"]}
//             menu={{
//               items: dropdownItems,
//               onPointerDown: (e) => {
//                 e.stopPropagation()
//               },
//               onClick: (e) => {
//                 e.domEvent.stopPropagation()
//               }
//             }}
//             placement='bottom'
//             arrow={{ pointAtCenter: true}}
//           >
//             <Button 
//               type="text"
//               shape="circle"
//               icon={
//                 <MoreOutlined
//                   style={{
//                     transform: 'rotate(90deg)'
//                   }}
//                 />
//               }
//               onPointerDown={(e) => {
//                 e.stopPropagation()
//               }}
//               onClick={(e) => {
//                 e.stopPropagation()
//               }}
//             />
//           </Dropdown>
//         }
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             alignItems: 'center',
//             gap: '8px'
//           }}
//         >
//           <TextIcon style={{marginRight: '4px'}} />
//           {dueDateOptions && (
//             <Tag
//               icon={
//                 <ClockCircleOutlined style={{fontSize: '12px'}} />
//               }
//               style={{
//                 padding: '0 4px',
//                 marginInlineEnd: '0',
//                 backgroundColor: dueDateOptions.color === 'default' ? 'transparent' : 'unset',
//               }}
//               color={dueDateOptions.color}
//               bordered={dueDateOptions.color !== 'default'}
//             >
//               {dueDateOptions.text}
//             </Tag>
//           )}
//           </div>
//       </Card>
//     </ConfigProvider>
//   )
// }

// export default ProjectCard


// export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
//   return (
//     prev.id === next.id &&
//     prev.title === next.title &&
//     prev.dueDate === next.dueDate &&
//     prev.users?.length === next.users?.length &&
//     prev.updatedAt === next.updatedAt
//   )
// })