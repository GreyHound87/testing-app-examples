import React from 'react'
import { Link as MagritteLink } from '@hh.ru/magritte-ui'
import { Link } from 'react-router-dom'
/* import { SequenceOrdering } from '../../components/SequenceOrdering'
 */
export const StartPage = () => (
  <div>
    StartPage Content
    <Link to="/testing">
      <MagritteLink style="accent" typography="label-2-regular">
        Link to test
      </MagritteLink>
    </Link>{' '}
    <Link to="/result">
      <MagritteLink style="positive" typography="label-2-regular">
        Link to result
      </MagritteLink>
    </Link>
    {/* <SequenceOrdering /> */}
  </div>
)
