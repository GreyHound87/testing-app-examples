import React from 'react'
import Box from '@mui/material/Box'
import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Text, HSpacingContainer } from '@hh.ru/magritte-ui'
import { Task } from '../types'
import TaskItem from './TaskItem'
import SortableTaskItem from './SortableTaskItem'

type BoardSectionProps = {
  id: string
  title: string
  tasks: Task[]
}

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <HSpacingContainer default={20}>
      <Text typography="custom-1-semibold">{title}</Text>
      <SortableContext
        id={id}
        items={tasks}
        strategy={horizontalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 2 }}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </Box>
          ))}
        </div>
      </SortableContext>
    </HSpacingContainer>
  )
}

export default BoardSection
