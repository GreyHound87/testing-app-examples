import React from 'react'
import {
  GridLayout,
  GridRow,
  GridColumn,
  VSpacingContainer,
} from '@hh.ru/magritte-ui'
import { Header } from './components'

interface AppLayoutProps {
  // заглушка пропсов для AppLayout
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <GridLayout>
        <GridRow>
          <GridColumn xs={4} s={8} m={12} l={12} xl={12} xxl={12}>
            <Header />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn xs={4} s={8} m={12} l={12} xl={12} xxl={12}>
            <VSpacingContainer default={20}>{children}</VSpacingContainer>
          </GridColumn>
        </GridRow>
      </GridLayout>
    </>
  )
}
