import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ArrowsDiagonalOutOutlinedSize16 } from '@hh.ru/magritte-ui/icon'

import { AppLayout } from './layouts'
import {
  VSpacingContainer,
  FormLabel,
  Radio,
  Cell,
  CellText,
  Card,
  Button,
  Badge,
  Divider,
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
      <VSpacingContainer default={12}>
        <div style={{ aspectRatio: '3 / 1' }}>
          {' '}
          {/* необходима логика или валидация пропорции изобрадений */}
          <img
            src="https://random.imagecdn.app/500/150"
            alt="Description of image"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>

        <form>
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
        <Button size="small" mode="primary" style="accent" type="submit">
          Ответить
        </Button>
      </VSpacingContainer>
    </Card>
  )
}

const QuestionWithDragAndDrop: React.FC = () => {
  const [answers, setAnswers] = useState([
    { id: 'answer1', text: 'Красный' },
    { id: 'answer2', text: 'Синий' },
    { id: 'answer3', text: 'Зеленый' },
  ])

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    event.preventDefault()
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10)
    const newAnswers = [...answers]
    const [removed] = newAnswers.splice(sourceIndex, 1)
    newAnswers.splice(targetIndex, 0, removed)
    setAnswers(newAnswers)
  }

  return (
    <Card
      padding={16}
      borderRadius={16}
      showBorder
      showShadow
      stretched
      verticalStretched
    >
      <VSpacingContainer default={12}>
        <div style={{ aspectRatio: '3 / 1' }}>
          <img
            src="https://random.imagecdn.app/500/150"
            alt="Description of image"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>

        <form>
          <VSpacingContainer default={12}>
            <FormLabel>Укажите правильный порядок:</FormLabel>
            {answers.map((answer, index) => (
              <div
                key={answer.id}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
              >
                <Cell
                  left={
                    <Badge size={'small'} style={'accent'}>
                      {`${index + 1}`}
                    </Badge>
                  }
                >
                  <CellText>{answer.text}{' '}{<ArrowsDiagonalOutOutlinedSize16 initial='positive-secondary'/>}</CellText>
                </Cell>
              </div>
            ))}
          </VSpacingContainer>
        </form>

        <Button size="small" mode="primary" style="accent" type="submit">
          Ответить
        </Button>
      </VSpacingContainer>
    </Card>
  )
}

// Заглушка для StartPage
const StartPage = () => (
  <div>
    StartPage Content <Link to="/testing">Link to test</Link>{' '}
    <Link to="/result">Link to result</Link>
  </div>
)

// Заглушка для ResultPage
const ResultPage = () => (
  <div>
    ResultPage Content <Link to="/">Link to start</Link>{' '}
    <Link to="/testing">Link to test</Link>
  </div>
)

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route
                  path="/testing"
                  element={
                    <VSpacingContainer default={48}>
                      <QuestionWithDragAndDrop />
                      <Divider marginTop={16} marginBottom={16} />
                      <QuestionWithRadio />
                    </VSpacingContainer>
                  } /* element={<TestingPage />} */
                />
                <Route path="/result" element={<ResultPage />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  )
}
