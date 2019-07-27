import React from 'react'

import g from './uikit.module.css'

const Button = ({ children, className, submit, formId, disabled, title, onClick, ...props }) => {
  return (
    <div className={`${className ? className : ''} btn ${g.btn} ${g.pWrapper} ${disabled ? g.disabled : ''}`}>
      <button title={title || ''} type='submit' className={g.frame1} onClick={() => {if(!disabled) onClick()}}>
        <span>{children}</span>
      </button>
      <div className={g.frame2}></div>
    </div>
    )
}

export default Button