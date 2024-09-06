import React, { useState } from 'react'
import { Card, Divider, Text, VSpacingContainer } from '@hh.ru/magritte-ui'

import { SortableList } from './components/SortableList'
import './SortableListPage.css'

function getMockItems() {
  return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
}
const title = 'Задание: Упорядочить выводы в консоль'
const description =
  'Рассмотрите следующий код. Ваша задача — расположить выводы в консоль в правильной последовательности.'

export function SortableListPage() {
  const [items, setItems] = useState(getMockItems)

  return (
    <Card
      padding={16}
      borderRadius={16}
      showBorder
      showShadow
      stretched
      verticalStretched
    >
      <VSpacingContainer default={12}>
        <Card
          style="blank"
          padding={16}
          borderRadius={12}
          showBorder={true}
          showShadow={true}
          stretched={true}
        >
          <VSpacingContainer default={12}>
            <Text typography="subtitle-1-semibold">{title}</Text>
            <Text typography="paragraph-1-regular">{description}</Text>
            <div
              style={{
                aspectRatio: 1 / 1,

                maxHeight: window.innerHeight * 0.4,
                margin: 'auto',
              }}
            >
              <img
                src="/assets/taskImg/taskImg6.jpg"
                alt="Image"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </VSpacingContainer>
        </Card>
        <Divider marginTop={20} marginBottom={20} />
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              {item.id}
              <SortableList.DragHandle />
            </SortableList.Item>
          )}
        />
      </VSpacingContainer>
    </Card>
  )
}
