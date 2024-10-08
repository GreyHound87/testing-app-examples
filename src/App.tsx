import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
/* import { Link } from '@hh.ru/magritte-ui'
 */
import { AppLayout } from './layouts'
import {
  BoardSectionListPage,
  DragAndDropDemoPage,
  NumberedListDemoPage,
  PairMatchingDemoPage,
  PairMatchingDemoPage2,
  PairMatchingDemoPage3,
  PairMatchingDemoPage4,
  SortableListPage,
  StartPage,
  DnDPage,
  DnDPage2,
  DnDPage3,
} from './pages'

import { TaskCard } from './components/TaskCard/TaskCard'

// Заглушка для ResultPage
const ResultPage = () => (
  <div>
    ResultPage Content
    <Link to="/">Link to start</Link> <Link to="/testing">Link to test</Link>
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
                <Route path="/drag-n-drop" element={<DragAndDropDemoPage />} />
                <Route
                  path="/drag-n-drop-2"
                  element={<NumberedListDemoPage />}
                />
                <Route
                  path="/drag-n-drop-3"
                  element={<PairMatchingDemoPage />}
                />
                <Route
                  path="/drag-n-drop-4"
                  element={<PairMatchingDemoPage2 />}
                />
                <Route
                  path="/drag-n-drop-5"
                  element={<PairMatchingDemoPage3 />}
                />
                <Route
                  path="/drag-n-drop-6"
                  element={<PairMatchingDemoPage4 />}
                />
                <Route path="/drag-n-drop-7" element={<SortableListPage />} />
                <Route
                  path="/drag-n-drop-8"
                  element={<BoardSectionListPage />}
                />
                <Route path="/drag-n-drop-9" element={<DnDPage />} />
                <Route path="/drag-n-drop-10" element={<DnDPage2 />} />
                <Route path="/drag-n-drop-11" element={<DnDPage3 />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  )
}
