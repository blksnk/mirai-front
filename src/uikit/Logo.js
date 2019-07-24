import React from 'react'

import g from 'uikit/uikit.module.css'

import v from 'assets/exp_vertical.svg'
import h from 'assets/exp_horizontal.svg'

const Logo = ({ vertical, onClick, history, className }) =>
  <img
    onClick={() => triggerAction(onClick, history)}
    className={`${vertical ? g.logoVertical : g.logoHorizontal} ${className ? className : ''}`}
    src={vertical ? v : h}
    alt='logo'
    title='Go to home.'
  />

const triggerAction = (onClick, history) => {
  if(onClick) {
    onClick()
  } else {
    history.push('/')
  }
}

export default Logo