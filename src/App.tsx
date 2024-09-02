import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from '@hh.ru/magritte-ui'

import { AppLayout } from './layouts'
import { StartPage } from './pages'

import { TaskCard } from './components/TaskCard/TaskCard'

// Заглушка для ResultPage
const ResultPage = () => (
  <div>
    ResultPage Content
    <Link href="/" style="accent" typography="label-2-regular">
      Link to start
    </Link>{' '}
    <Link href="/testing" style="positive">
      Link to test
    </Link>
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
                <Route path="/testing" element={<TaskCard />} />
                <Route path="/result" element={<ResultPage />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  )
}
