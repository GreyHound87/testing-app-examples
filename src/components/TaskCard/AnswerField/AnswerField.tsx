import React from 'react'
import {
  VSpacingContainer,
  FormLabel,
  Cell,
  CellText,
  Radio,
  Checkbox,
} from '@hh.ru/magritte-ui'
import { TaskType } from '../../../types/TaskType'

export const AnswerField: React.FC<{ taskType: TaskType }> = ({ taskType }) => {
    return (
    <>
      {taskType === TaskType.SingleChoice && (
        <form>
          <VSpacingContainer default={12}>
            <FormLabel>Один верный ответ:</FormLabel>
            <Cell left={<Radio name="radio" />}>
              <CellText>Красный</CellText>
            </Cell>
            <Cell left={<Radio name="radio" />}>
              <CellText>Синий</CellText>
            </Cell>
            <Cell left={<Radio name="radio" />}>
              <CellText>Зеленый</CellText>
            </Cell>
          </VSpacingContainer>
        </form>
      )}

      {taskType === TaskType.MultipleChoice && (
        <form>
          <VSpacingContainer default={12}>
            <FormLabel>Один или несколько верных ответов:</FormLabel>
            <Cell left={<Checkbox />}>
              <CellText>Красный</CellText>
            </Cell>
            <Cell left={<Checkbox />}>
              <CellText>Синий</CellText>
            </Cell>
            <Cell left={<Checkbox />}>
              <CellText>Зеленый</CellText>
            </Cell>
          </VSpacingContainer>
        </form>
      )}
    </>
  )
}
