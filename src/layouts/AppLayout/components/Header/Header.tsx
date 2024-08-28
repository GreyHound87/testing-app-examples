import React from 'react'
import {
  GridLayout,
  GridRow,
  GridColumn,
  Avatar,
  Text,
  Link,
  Divider,
} from '@hh.ru/magritte-ui'
import { QuestionCircleOutlinedSize16 } from '@hh.ru/magritte-ui/icon'

export const Header: React.FC = () => {
  return (
    <GridLayout>
      <GridRow>
        <GridColumn flexibleContent xs={2} s={2} m={2} l={2} xl={2} xxl={2}>
            <Avatar
              fallbackMode="letters"
              letters="AA"
              style="color-9"
              size={48}
              disabled={false}
              online={false}
              mode="placeholder"
              placeholder="city"
              shapeCircle
            />
        </GridColumn>
        <GridColumn flexibleContent xs={2} s={4} m={8} l={8} xl={8} xxl={8}>
            <Text typography="title-1-semibold">Demo Testing App</Text>
        </GridColumn>
        <GridColumn flexibleContent xs={0} s={2} m={2} l={2} xl={2} xxl={2}>
            <Link href="https://hh.ru" iconRight={QuestionCircleOutlinedSize16}>
              Есть вопросы?
            </Link>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn xs={4} s={8} m={12} l={12} xl={12} xxl={12}>
          <Divider marginTop={8} marginBottom={16} />
        </GridColumn>
      </GridRow>
    </GridLayout>
  )
}
