import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import {
  VSpacingContainer,
  FormLabel,
  Cell,
  CellText,
  Radio,
  Checkbox,
  Button,
  Alert,
  Divider,
} from '@hh.ru/magritte-ui'
import { TaskType } from '../../../types/TaskType'

interface AnswerFieldProps {
  taskType: TaskType
  onNextTask: () => void
}

export const AnswerField: React.FC<AnswerFieldProps> = ({
  taskType,
  onNextTask,
}) => {
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertContent, setAlertContent] = useState<string | string[]>('')

  const onSubmit = (values: any, form: any) => {
    let result

    if (taskType === TaskType.SingleChoice) {
      result = values.singleChoice
    } else if (taskType === TaskType.MultipleChoice) {
      result = Object.keys(values).filter((key) => values[key] === true)
    }

    setAlertContent(result)
    setAlertVisible(true)

    form.reset()
  }

  const handleAlertClose = () => {
    setAlertVisible(false)
    onNextTask()
  }

  const isFormEmpty = (values: any) => {
    if (taskType === TaskType.SingleChoice) {
      return !values.singleChoice
    } else if (taskType === TaskType.MultipleChoice) {
      return !Object.keys(values).some((key) => values[key] === true)
    }
    return true
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (!isFormEmpty(values)) {
                handleSubmit(event)?.then(() => {
                  form.reset()
                })
              } else {
                console.log('Форма пуста, отправка данных не производится')
              }
            }}
          >
            {taskType === TaskType.SingleChoice && (
              <VSpacingContainer default={12}>
                <FormLabel>Один верный ответ:</FormLabel>
                <Field name="singleChoice" type="radio" value="Красный">
                  {({ input }) => (
                    <Cell left={<Radio {...input} />}>
                      <CellText>Красный</CellText>
                    </Cell>
                  )}
                </Field>
                <Field name="singleChoice" type="radio" value="Синий">
                  {({ input }) => (
                    <Cell left={<Radio {...input} />}>
                      <CellText>Синий</CellText>
                    </Cell>
                  )}
                </Field>
                <Field name="singleChoice" type="radio" value="Зеленый">
                  {({ input }) => (
                    <Cell left={<Radio {...input} />}>
                      <CellText>Зеленый</CellText>
                    </Cell>
                  )}
                </Field>
              </VSpacingContainer>
            )}

            {taskType === TaskType.MultipleChoice && (
              <VSpacingContainer default={12}>
                <FormLabel>Один или несколько верных ответов:</FormLabel>
                <Field name="Красный" type="checkbox">
                  {({ input }) => (
                    <Cell left={<Checkbox {...input} />}>
                      <CellText>Красный</CellText>
                    </Cell>
                  )}
                </Field>
                <Field name="Синий" type="checkbox">
                  {({ input }) => (
                    <Cell left={<Checkbox {...input} />}>
                      <CellText>Синий</CellText>
                    </Cell>
                  )}
                </Field>
                <Field name="Зеленый" type="checkbox">
                  {({ input }) => (
                    <Cell left={<Checkbox {...input} />}>
                      <CellText>Зеленый</CellText>
                    </Cell>
                  )}
                </Field>
              </VSpacingContainer>
            )}

            <Divider marginTop={20} marginBottom={20} />
            <Button
              size="small"
              mode="primary"
              style="accent"
              type="submit"
              disabled={isFormEmpty(values)}
            >
              Ответить
            </Button>
          </form>
        )}
      />

      <Alert
        visible={alertVisible}
        title="На сервер полетел ответ:"
        description={
          Array.isArray(alertContent) ? alertContent.join(', ') : alertContent
        }
        iconStyle="positive"
        layout="horizontal"
        buttons={
          <Button
            size="small"
            mode="primary"
            style="accent"
            onClick={handleAlertClose}
          >
            Далее
          </Button>
        }
        onClose={handleAlertClose}
      />
    </>
  )
}
