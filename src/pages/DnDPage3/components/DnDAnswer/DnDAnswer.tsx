import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import Droppable from './components/Droppable'
import Item from './components/Item'
import { arrayMove, insertAtIndex, removeAtIndex } from './utils/array'

import './DnDAnswer.css'

function DnDAnswer() {
  const [itemGroups, setItemGroups] = useState({
    0: [
      'отступы',
      'динамическую',
      'статическую',
      'try-except',
      'функции',
      'классы',
    ],
    1: [],
    2: [],
    3: [],
  })
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragCancel = () => setActiveId(null)

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id

    if (!overId) {
      return
    }

    const activeContainer = active.data.current.sortable.containerId
    const overContainer = over.data.current?.sortable.containerId || over.id

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index

        // Вместо вызова moveBetweenContainers, просто возвращаем текущее состояние
        return itemGroups
      })
    }
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null)
      return
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId
      const overContainer = over.data.current?.sortable.containerId || over.id
      const activeIndex = active.data.current.sortable.index
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index

      setItemGroups((itemGroups) => {
        let newItems
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          }
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          )
        }

        return newItems
      })
    }

    setActiveId(null)
  }

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    const newItems = { ...items }

    // Удаляем элемент из активного контейнера
    newItems[activeContainer] = removeAtIndex(
      newItems[activeContainer],
      activeIndex
    )

    // Если целевой контейнер не 0 и в нем уже есть элемент
    if (overContainer !== '0' && newItems[overContainer].length > 0) {
      // Получаем элемент из целевого контейнера
      const [existingItem] = newItems[overContainer]

      // Перемещаем существующий элемент в контейнер 0
      newItems['0'] = [...newItems['0'], existingItem]

      // Заменяем элемент в целевом контейнере
      newItems[overContainer] = [item]
    } else {
      // Если целевой контейнер пустой или это контейнер 0, просто вставляем элемент
      newItems[overContainer] = insertAtIndex(
        newItems[overContainer],
        overIndex,
        item
      )
    }

    return newItems
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Остальные группы рендерим внутри HSpacingContainer */}
      <div className="container">
        <p>
          В Python{' '}
          <Droppable id="1" items={itemGroups[1]} activeId={activeId} key="1" />
          используются для группировки и организации кода, в отличие от фигурных
          скобок в некоторых других языках программирования. Python поддерживает{' '}
          <Droppable id="2" items={itemGroups[2]} activeId={activeId} key="2" />
          типизацию, что означает, что тип переменной может изменяться во время
          выполнения программы. Для обработки исключений в Python используется
          конструкция{' '}
          <Droppable id="3" items={itemGroups[3]} activeId={activeId} key="3" />
          , которая позволяет элегантно обрабатывать ошибки и исключительные
          ситуации.
        </p>
      </div>
      {/* Отдельно рендерим группу 0 */}

      <Droppable id="0" items={itemGroups[0]} activeId={activeId} key="0" />

      <DragOverlay>
        {activeId ? <Item id={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DnDAnswer
