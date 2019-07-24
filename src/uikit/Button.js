import React from 'react'

import g from './uikit.module.css'

const Button = ({ children, className, submit, formId, disabled, title, onClick, ...props }) => {
  return (
    <div className={`${className ? className : ''} ${g.btn} ${g.pWrapper} ${disabled ? g.disabled : ''}`}>
      {submit
        ? <input disabled={disabled} type='submit' value={children} title={title || ''} className={g.frame1}>
          </input>
        : <button title={title || ''} type='submit' className={g.frame1} onClick={() => {if(!disabled) onClick()}}>
            <span>{children}</span>
          </button>
        }
      <div className={g.frame2}></div>
    </div>
    )
}

export default Button