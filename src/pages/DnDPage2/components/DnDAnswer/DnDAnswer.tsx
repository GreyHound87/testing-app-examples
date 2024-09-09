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
    0: ['def', 'for', 'lambda', 'try', 'import'],
    'Оператор для создания анонимной функции': [],
    'Оператор для обработки исключений': [],
    'Оператор для создания функции': [],
    'Оператор для цикла': [],
    'Оператор для подключения модулей': [],
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
        {Object.keys(itemGroups)
          .filter((group) => group !== '0') // Исключаем группу 0
          .map((group) => (
            <Droppable
              id={group}
              items={itemGroups[group]}
              activeId={activeId}
              key={group}
            />
          ))}
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
