import React, { createContext, useContext, useMemo } from 'react'
import type { CSSProperties, PropsWithChildren } from 'react'
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowsCrossOutlinedSize24 } from '@hh.ru/magritte-ui/icon'

import './SortableItem.css'

interface Props {
  id: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div className="SortableItem" ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <ArrowsCrossOutlinedSize24
        initial="positive"
        highlighted="positive-secondary"
        aria-label="Перемещение"
      />
    </button>
  )
}
