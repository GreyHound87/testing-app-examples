import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'
import { Text } from '@hh.ru/magritte-ui'

import './Droppable.css'

const Droppable = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <span
        className="droppable"
        ref={setNodeRef}
        style={{
          flexWrap: id === '0' ? 'wrap' : 'nowrap', // Условное применение flex-wrap
        }}
      >
        {id !== '0' && !items.length && (
          <div
            style={{
              display: 'inline-block', // Добавляем display: inline-block
              borderBottom: '1px dotted #999',
              width: '90px',
              height: '30px',
              margin: '0 10px',
            }}
          />
        )}
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
        {/* {id !== '0' && (
          <Text Element="p" typography="paragraph-4-regular">{`— ${id}`}</Text>
        )} */}
      </span>
    </SortableContext>
  )
}

export default Droppable
