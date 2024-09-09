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
      <ul className="droppable" ref={setNodeRef}>
        {id !== '0' && <Text typography="custom-1-semibold">{`${id}.`}</Text>}
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  )
}

export default Droppable
