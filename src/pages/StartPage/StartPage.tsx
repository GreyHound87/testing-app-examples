import React from 'react'
/* import { Link } from '@hh.ru/magritte-ui' */
import { Link } from 'react-router-dom'

export const StartPage = () => (
  <div>
    StartPage Content
    <Link to="/testing">
      Link to test
    </Link>{' '}
    <Link to="/result">
      Link to result
    </Link>
  </div>
)
