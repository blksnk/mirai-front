import React from 'react'

import g from 'uikit/uikit.module.css'

const TextParallax = ({ children, onClick }) => {
  return (
    <div className={`${g.pWrapper} ${g.textPWrapper} textParallax`}>
      <Fill onClick={onClick} className={`${g.frame1} fill ${g.textP1}`}>{children}</Fill>
      <Stroke i={2}>{children}</Stroke>
    </div>
  )
}

const Fill = ({ children, className, onClick }) =>
<h1
  onClick={onClick ? onClick : null}
  style={onClick ? { cursor: 'pointer' } : { } }
  className={`${g.fill} ${className ? className : ''}`}
>{children}</h1>

const Stroke = ({ children, className, i })=> <h1 className={`${className} ${g[`frame${i}`]}`}>{children}</h1>

export default TextParallax