import React from 'react'
import s from './Img.module.css'
import g from './uikit.module.css'

const Img = ({ className, src, alt, landscape, ...props }) => {
  return (
      <div className={`${g.pWrapper} pWrapper ${className} ${landscape ? s.landscape : s.portrait}`}>
        <div className={g.frame1}>
          <img src={src} alt={alt}/> 
        </div>
        <div className={g.frame2}>
          <img src={src} alt=''/>   
        </div>
        <div className={g.frame3}></div>
      </div>
  )
}

export default Img