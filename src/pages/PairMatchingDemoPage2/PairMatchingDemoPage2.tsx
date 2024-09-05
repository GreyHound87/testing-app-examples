import React, { useState } from 'react'
import { Link as MagritteLink } from '@hh.ru/magritte-ui'
import { Link } from 'react-router-dom'

import {
  Divider,
  VSpacingContainer,
  LoadingContextProvider,
  Text,
} from '@hh.ru/magritte-ui'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const ItemType = 'ANSWER'

interface DragItem {
  id: string
  content: string
}

const DraggableAnswer: React.FC<{
  id: string
  content: string
}> = ({ id, content }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id, content },
  })

  return (
    <div
      ref={drag}
      style={{
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        minWidth: 100,
        maxWidth: 200,
        textAlign: 'center',
        width: '100%',
      }}
    >
      {content}
    </div>
  )
}

const Category: React.FC<{
  id: string
  category: string
  answer: DragItem | null
  onDrop: (item: DragItem) => void
  onRemove: () => void
}> = ({ id, category, answer, onDrop, onRemove }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: DragItem) => onDrop(item),
  })

  return (
    <div
      ref={drop}
      style={{
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        width: 200,
        textAlign: 'center',
      }}
    >
      <strong>{category}</strong>
      <div style={{ marginTop: 8 }}>
        {answer ? (
          <div
            style={{
              padding: 8,
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
              position: 'relative',
            }}
          >
            {answer.content}
            <button
              onClick={onRemove}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
              }}
            >
              ✖
            </button>
          </div>
        ) : (
          <div style={{ padding: 8, color: '#999' }}>Перетащите ответ сюда</div>
        )}
      </div>
    </div>
  )
}

export const PairMatchingDemoPage2: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: '1', category: 'Фронтенд', answer: null },
    { id: '2', category: 'Бэкенд', answer: null },
    { id: '3', category: 'Дизайн', answer: null },
    { id: '4', category: 'Тестирование', answer: null },
  ])

  const [answers, setAnswers] = useState([
    { id: '5', content: 'React' },
    { id: '6', content: 'Node.js' },
    { id: '7', content: 'Figma' },
    { id: '8', content: 'Jest' },
  ])

  const handleDrop = (categoryId: string, item: DragItem) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, answer: item } : category
      )
    )
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== item.id)
    )
  }

  const handleRemove = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, answer: null } : category
      )
    )
    const removedAnswer = categories.find(
      (category) => category.id === categoryId
    )?.answer
    if (removedAnswer) {
      setAnswers((prevAnswers) => [...prevAnswers, removedAnswer])
    }
  }

  const flexDirection = isTouchDevice() ? 'column' : 'row'

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <VSpacingContainer default={24}>
        <LoadingContextProvider loading={true}>
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              border: '1px solid #ccc',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'stretch',
            }}
          >
            <div
              style={{
                borderRadius: 16,
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: 16,
              }}
            >
              <Text>
                Эта демоверсия позволяет сопоставить категории с правильными
                ответами. Перетащите ответ в соответствующую категорию.
              </Text>
            </div>
            <Divider marginTop={20} marginBottom={20} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection, gap: '16px' }}>
                {categories.map((category) => (
                  <Category
                    key={category.id}
                    id={category.id}
                    category={category.category}
                    answer={category.answer}
                    onDrop={(item) => handleDrop(category.id, item)}
                    onRemove={() => handleRemove(category.id)}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection, gap: '16px' }}>
                {answers.map((answer) => (
                  <DraggableAnswer
                    key={answer.id}
                    id={answer.id}
                    content={answer.content}
                  />
                ))}
              </div>
            </div>
          </div>
        </LoadingContextProvider>
      </VSpacingContainer>
      <Link to="/">
        <MagritteLink style="positive" typography="label-2-regular">
          HOME
        </MagritteLink>
      </Link>
    </DndProvider>
  )
}
