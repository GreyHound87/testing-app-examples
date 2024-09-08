import { Cell, CellText } from '@hh.ru/magritte-ui'
import { Task } from '../types'

type TaskItemProps = {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Cell>
      <CellText>{task.title}</CellText>
    </Cell>
  )
}

export default TaskItem
