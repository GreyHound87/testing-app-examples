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

const ItemType = 'CARD'

interface DragItem {
  id: string
  index: number
}

const DraggableCard: React.FC<{
  id: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  content: string
}> = ({ id, index, moveCard, content }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  })

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveCard(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        minWidth: 100, // Минимальная ширина для элементов
        maxWidth: 200, // Максимальная ширина для элементов
        textAlign: 'center',
        width: '100%', // Элементы занимают всю доступную ширину до maxWidth
      }}
    >
      {content}
    </div>
  )
}

const NumberedDraggableCard: React.FC<{
  id: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  content: string
}> = ({ id, index, moveCard, content }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  })

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveCard(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        minWidth: 100, // Минимальная ширина для элементов
        maxWidth: 200, // Максимальная ширина для элементов
        textAlign: 'center',
        width: '100%', // Элементы занимают всю доступную ширину до maxWidth
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span style={{ marginRight: 8 }}>{index + 1}.</span>
      {content}
    </div>
  )
}

export const DragAndDropDemoPage: React.FC = () => {
  const [verticalItems, setVerticalItems] = useState([
    { id: '1', content: 'Тестирование' },
    { id: '2', content: 'Проектирование' },
    { id: '3', content: 'Разработка' },
    { id: '4', content: 'Анализ требований' },
  ])

  const [horizontalItems, setHorizontalItems] = useState([
    { id: '5', content: 'Дизайн' },
    { id: '6', content: 'Код ревью' },
    { id: '7', content: 'Документация' },
    { id: '8', content: 'Деплой' },
  ])

  const [numberedVerticalItems, setNumberedVerticalItems] = useState([
    { id: '9', content: 'Тестирование' },
    { id: '10', content: 'Проектирование' },
    { id: '11', content: 'Разработка' },
    { id: '12', content: 'Анализ требований' },
  ])

  const [numberedHorizontalItems, setNumberedHorizontalItems] = useState([
    { id: '13', content: 'Дизайн' },
    { id: '14', content: 'Код ревью' },
    { id: '15', content: 'Документация' },
    { id: '16', content: 'Деплой' },
  ])

  const moveVerticalCard = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = verticalItems[dragIndex]
    const updatedItems = [...verticalItems]
    updatedItems.splice(dragIndex, 1)
    updatedItems.splice(hoverIndex, 0, draggedItem)
    setVerticalItems(updatedItems)
  }

  const moveHorizontalCard = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = horizontalItems[dragIndex]
    const updatedItems = [...horizontalItems]
    updatedItems.splice(dragIndex, 1)
    updatedItems.splice(hoverIndex, 0, draggedItem)
    setHorizontalItems(updatedItems)
  }

  const moveNumberedVerticalCard = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = numberedVerticalItems[dragIndex]
    const updatedItems = [...numberedVerticalItems]
    updatedItems.splice(dragIndex, 1)
    updatedItems.splice(hoverIndex, 0, draggedItem)
    setNumberedVerticalItems(updatedItems)
  }

  const moveNumberedHorizontalCard = (
    dragIndex: number,
    hoverIndex: number
  ) => {
    const draggedItem = numberedHorizontalItems[dragIndex]
    const updatedItems = [...numberedHorizontalItems]
    updatedItems.splice(dragIndex, 1)
    updatedItems.splice(hoverIndex, 0, draggedItem)
    setNumberedHorizontalItems(updatedItems)
  }

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <VSpacingContainer default={24}>
        <LoadingContextProvider loading={true}>
          {/* Вертикальная демоверсия */}
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
                Скелетон Card ведет себя аналогично Card (`display:
                inline-flex`) и учитывает пропсы `stretched` и
                `verticalStretched`. При необходимости размер скелетона можно
                задать явно.
              </Text>
            </div>
            <Divider marginTop={20} marginBottom={20} />

            {verticalItems.map((item, index) => (
              <DraggableCard
                key={item.id}
                id={item.id}
                index={index}
                moveCard={moveVerticalCard}
                content={item.content}
              />
            ))}
          </div>

          {/* Горизонтальная демоверсия */}
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
              marginTop: 40, // Отступ между карточками
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
                Эта карточка демонстрирует горизонтальное перетаскивание
                элементов.
              </Text>
            </div>
            <Divider marginTop={20} marginBottom={20} />

            <div
              style={{
                display: 'flex',
                flexDirection: isTouchDevice() ? 'column' : 'row', // Меняем направление в зависимости от устройства
                flexWrap: 'nowrap', // Запрещаем перенос элементов на новую строку
                overflowX: isTouchDevice() ? 'visible' : 'auto', // Убираем горизонтальную прокрутку на тач-устройствах
                gap: '8px', // Отступы между элементами
              }}
            >
              {horizontalItems.map((item, index) => (
                <DraggableCard
                  key={item.id}
                  id={item.id}
                  index={index}
                  moveCard={moveHorizontalCard}
                  content={item.content}
                />
              ))}
            </div>
          </div>

          {/* Вертикальная демоверсия с нумерацией */}
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
                Эта карточка демонстрирует вертикальное перетаскивание элементов
                с нумерацией.
              </Text>
            </div>
            <Divider marginTop={20} marginBottom={20} />

            {numberedVerticalItems.map((item, index) => (
              <NumberedDraggableCard
                key={item.id}
                id={item.id}
                index={index}
                moveCard={moveNumberedVerticalCard}
                content={item.content}
              />
            ))}
          </div>

          {/* Горизонтальная демоверсия с нумерацией */}
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
              marginTop: 40, // Отступ между карточками
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
                Эта карточка демонстрирует горизонтальное перетаскивание
                элементов с нумерацией.
              </Text>
            </div>
            <Divider marginTop={20} marginBottom={20} />

            <div
              style={{
                display: 'flex',
                flexDirection: isTouchDevice() ? 'column' : 'row', // Меняем направление в зависимости от устройства
                flexWrap: 'nowrap', // Запрещаем перенос элементов на новую строку
                overflowX: isTouchDevice() ? 'visible' : 'auto', // Убираем горизонтальную прокрутку на тач-устройствах
                gap: '8px', // Отступы между элементами
              }}
            >
              {numberedHorizontalItems.map((item, index) => (
                <NumberedDraggableCard
                  key={item.id}
                  id={item.id}
                  index={index}
                  moveCard={moveNumberedHorizontalCard}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </LoadingContextProvider>
      </VSpacingContainer>{' '}
      <Link to="/">
        <MagritteLink style="positive" typography="label-2-regular">
          HOME
        </MagritteLink>
      </Link>{' '}
    </DndProvider>
  )
}
