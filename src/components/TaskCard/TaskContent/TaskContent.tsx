import React from 'react'
import { Card, Text } from '@hh.ru/magritte-ui'
import { ITaskData } from '../../../types/TaskType'

interface ITaskContentProps
  extends Pick<
    ITaskData,
    | 'title'
    | 'description'
    | 'imageSrc'
    | 'imageWidth'
    | 'imageHeight'
    | 'imageAlt'
  > {}

export const TaskContent: React.FC<ITaskContentProps> = ({
  title,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
}) => {
  const aspectRatio =
    imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : 'auto'

  return (
    <Card
      style="blank"
      padding={16}
      borderRadius={12}
      showBorder={true}
      showShadow={true}
      stretched={true}
    >
      {title && <Text typography="subtitle-1-semibold">{title}</Text>}
      {imageSrc && (
        <div
          style={{
            aspectRatio: aspectRatio,
            maxHeight: window.innerHeight * 0.3,
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt || 'Image'}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
      )}
      {description && (
        <Text typography="paragraph-1-regular">{description}</Text>
      )}
    </Card>
  )
}
