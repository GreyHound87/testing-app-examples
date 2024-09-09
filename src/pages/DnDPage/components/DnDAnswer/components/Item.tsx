import React from 'react'
import { Text } from '@hh.ru/magritte-ui'
import './Item.css'

const Item = ({ id, dragOverlay }) => {
  const style = {
    cursor: dragOverlay ? 'grabbing' : 'grab',
  }

  return (
    <div style={style} className="item">
      <Text>{id}</Text>
    </div>
  )
}

export default Item
