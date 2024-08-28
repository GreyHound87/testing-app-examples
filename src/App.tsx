import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { AppLayout } from './layouts'
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
        <Button size="small" mode="secondary" style="positive" type="submit">
          Кнопка
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
                    <QuestionWithRadio />
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
