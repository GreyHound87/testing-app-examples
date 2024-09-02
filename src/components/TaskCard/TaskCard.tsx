import React, { useState } from 'react'
import { Card, Button, Divider } from '@hh.ru/magritte-ui'

import { TaskContent } from './TaskContent'
import { AnswerField } from './AnswerField'
import { TaskType, ITaskData } from '../../types/TaskType'

export const TaskCard: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

  const handleNextTask = () => {
    setCurrentTaskIndex((prevIndex) => (prevIndex + 1) % mockTaskData.length)
  }

  const currentTask = mockTaskData[currentTaskIndex]
  const {
    title,
    description,
    imageSrc,
    imageWidth,
    imageHeight,
    imageAlt,
    taskType,
  } = currentTask

  return (
    <Card
      padding={16}
      borderRadius={16}
      showBorder
      showShadow
      stretched
      verticalStretched
    >
      <TaskContent
        title={title}
        description={description}
        imageSrc={imageSrc}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        imageAlt={imageAlt}
      />
      <Divider marginTop={20} marginBottom={20} />
      <AnswerField taskType={taskType} />
      <Divider marginTop={20} marginBottom={20} />
      <Button
        size="small"
        mode="primary"
        style="accent"
        type="submit"
        onClick={handleNextTask}
      >
        Ответить
      </Button>
    </Card>
  )
}

const mockTaskData: ITaskData[] = [
  {
    title: 'Short Title',
    description: 'This is a short description.',
    imageSrc: 'https://habrastorage.org/r/w1560/webt/ax/cg/id/axcgidsa8fghreeuyvbhfpga6yo.png',
    imageWidth: 842,
    imageHeight: 720,
    imageAlt: 'Nature image',
    taskType: TaskType.SingleChoice,
  },
  {
    title:
      'A Much Longer Title That Spans Multiple Lines to Test Text Wrapping',
    description:
      'This description is a bit longer and is meant to test how the component handles larger amounts of text. It should wrap correctly and not overflow the container.',
    imageSrc: 'https://habrastorage.org/r/w1560/webt/a3/9x/67/a39x67wkxdmcyzj-it5m2jmfxgg.png',
    imageWidth: 856,
    imageHeight: 438,
    imageAlt: 'Cityscape image',
    taskType: TaskType.MultipleChoice,
  },
  {
    title: 'Medium Title',
    description:
      'This is a medium-length description that provides more detail about the content.',
    imageSrc: 'https://habrastorage.org/r/w1560/webt/yd/xe/tn/ydxetnfghjtfuex_p-em8v4emck.png',
    imageWidth: 1070,
    imageHeight: 720,
    imageAlt: 'Forest image',
    taskType: TaskType.SingleChoice,
  },
  {
    title: 'Short Title',
    description:
      'This is a very long description that is intended to test how the component handles a large amount of text. The description should wrap within the container and not cause any layout issues. This is particularly important for ensuring that the UI remains consistent and readable, even when dealing with unexpected or edge-case content.',
    imageSrc: 'https://habrastorage.org/r/w1560/webt/t-/4k/ys/t-4kyszb4grfafbi7lazyyvq6dy.png',
    imageWidth: 1066,
    imageHeight: 570,
    imageAlt: 'Mountain image',
    taskType: TaskType.MultipleChoice,
  },
  {
    title: 'Another Title',
    description: 'A short description.',
    imageSrc: 'https://habrastorage.org/r/w1560/webt/r6/07/q7/r607q7hehfjmuicf0_icntddk2s.png',
    imageWidth: 1038,
    imageHeight: 608,
    imageAlt: 'Ocean image',
    taskType: TaskType.SingleChoice,
  },
]
