import React from 'react'
import { Link } from '@hh.ru/magritte-ui'

export const StartPage = () => (
  <div>
    StartPage Content
    <Link href="/testing" style="accent" typography="label-2-regular">
      Link to test
    </Link>{' '}
    <Link href="/result" style="positive">
      Link to result
    </Link>
  </div>
)
