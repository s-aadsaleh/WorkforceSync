import { DndContext } from '@dnd-kit/core'
import React from 'react'

// type Props = {
//   onDragEnd: (event: DragEndEvent) => void
// }

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: 'calc(100% + 64px)',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'column',
        margin: '-32px'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          // overflow: 'scroll'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  // const mouseSensor = useSensor(MouseSensor, {
  //   activationConstraint: {
  //     distance: 5,
  //   },
  // })

  // const touchSensor = useSensor(TouchSensor, {
  //   activationConstraint: {
  //     distance: 5
  //   }
  // })

  // const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <DndContext>
      {children}
    </DndContext>
  )
}