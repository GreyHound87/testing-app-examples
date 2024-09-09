import React from 'react'
import {
  Card,
  Divider,
  Text,
  VSpacingContainer,
  Button,
} from '@hh.ru/magritte-ui'
import { Link as MagritteLink } from '@hh.ru/magritte-ui'
import { Link } from 'react-router-dom'

import DnDAnswer from './components/DnDAnswer/DnDAnswer'

const title = 'Задание: Упорядочить выводы в консоль'
const description =
  'Рассмотрите следующий код. Ваша задача — расположить выводы в консоль в правильной последовательности.'

export function DnDPage() {
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
        <DnDAnswer />
        <Divider marginTop={100} marginBottom={20} />
      </VSpacingContainer>
      <Button mode="primary" style="accent" type="submit" size="large">
        Ответить
      </Button>{' '}
      <Link to="/">
        <MagritteLink style="positive" typography="label-2-regular">
          HOME
        </MagritteLink>
      </Link>{' '}
    </Card>
  )
}
