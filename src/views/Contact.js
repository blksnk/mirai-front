import React from 'react'

import Button from 'uikit/Button'

import s from './Contact.module.css'
import g from 'uikit/uikit.module.css'
import { selectElements, createEvent } from 'helpers/parallax.js'

const Contact = ({ history, ...props }) => {
  React.useEffect(() => {
    const els = selectElements(g)
    if(els) {
      createEvent(els, g)
    }
  })
  return (
    <React.Fragment>
      <Button className={s.btn}>
        time to check this out
      </Button>
    </React.Fragment>
  )
}

export default Contact