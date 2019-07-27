import React from 'react'

import g from 'uikit/uikit.module.css'

const TextParallax = ({ children }) => {
  return (
    <div className={`${g.pWrapper} ${g.textPWrapper} textParallax`}>
      <Fill className={`${g.frame1} fill ${g.textP1}`}>{children}</Fill>
      <Stroke i={2}>{children}</Stroke>
    </div>
  )
}

const Fill = ({ children, className }) => <h1 className={`${g.fill} ${className ? className : ''}`}>{children}</h1>

const Stroke = ({ children, className, i })=> <h1 className={`${className} ${g[`frame${i}`]}`}>{children}</h1>

export default TextParallax