import React from 'react'
import { withRouter } from 'react-router-dom'

const LogoText = ({ onClick, history }) =>(
  <span onClick={() => triggerAction(onClick, history)} className='logoText'>mirai.</span>
)

const triggerAction = (onClick, history) => {
  if(onClick) {
    onClick()
  } else {
    history.push('/')
  }
}

export default withRouter(LogoText)