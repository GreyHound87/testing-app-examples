import React from 'react'
import {
  GridRow,
  GridColumn,
  Avatar,
  Text,
  Link,
  Divider,
  VSpacing,
} from '@hh.ru/magritte-ui'
import { QuestionCircleOutlinedSize16 } from '@hh.ru/magritte-ui/icon'
import { logoFile } from './assets/logo'

export const Header: React.FC = () => {
  return (
    <>
      <VSpacing default={20} />
      <GridRow>
        <GridColumn flexibleContent xs={1} s={2} m={2} l={2} xl={2} xxl={2}>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Avatar
              image={logoFile}
              mode={'image'}
              aria-label={'logo'}
              size={48}
              fallbackMode="letters"
              letters="HH"
              shapeCircle
            />
          </div>
        </GridColumn>

        <GridColumn flexibleContent xs={2} s={4} m={8} l={8} xl={8} xxl={8}>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <Text typography="subtitle-2-semibold" maxLines={1}>
              Demo Testing App
            </Text>
          </div>
        </GridColumn>

        <GridColumn flexibleContent xs={1} s={2} m={2} l={2} xl={2} xxl={2}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Link
              element="button"
              aria-label="Есть вопросы?"
              iconRight={QuestionCircleOutlinedSize16}
            />
          </div>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn xs={4} s={8} m={12} l={12} xl={12} xxl={12}>
          <Divider marginTop={20} marginBottom={20} />
        </GridColumn>
      </GridRow>
    </>
  )
}
