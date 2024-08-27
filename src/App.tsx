import React from 'react'
import {
  VSpacingContainer,
  FormLabel,
  Radio,
  Cell,
  CellText,
  Card,
  Button,
} from '@hh.ru/magritte-ui'

const QuestionWithRadio: React.FC = () => {
  return (
    <Card
      padding={16}
      borderRadius={16}
      showBorder
      showShadow
      stretched
      verticalStretched
    >
      <img
        src="https://random.imagecdn.app/500/150"
        alt="Description of image"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <form
        style={{
          minWidth: '500px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      >
        <VSpacingContainer default={12}>
          <FormLabel>Варианты ответов:</FormLabel>
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
      <Button size="small" mode="secondary" style="positive" type="submit">
        Кнопка
      </Button>
    </Card>
  )
}

const App: React.FC = () => {
  return (
    <>
      <QuestionWithRadio />
    </>
  )
}

export default App
