import React from 'react'
import { Link as MagritteLink } from '@hh.ru/magritte-ui'
import { Link } from 'react-router-dom'

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
    </Link>{' '}
    <Link to="/drag-n-drop">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo
      </MagritteLink>
    </Link>
    <Link to="/drag-n-drop-2">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo #2
      </MagritteLink>
    </Link>
    <Link to="/drag-n-drop-3">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo #3
      </MagritteLink>
    </Link>
    <Link to="/drag-n-drop-4">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo #4
      </MagritteLink>
    </Link>
    <Link to="/drag-n-drop-5">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo #5
      </MagritteLink>
    </Link>
    <Link to="/drag-n-drop-6">
      <MagritteLink style="neutral" typography="label-2-regular">
        Link to Drag'n'Drop Demo #6
      </MagritteLink>
    </Link>
  </div>
)
