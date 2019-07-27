import React from 'react'
import { formatNumber } from 'helpers/formatNumber'

import g from 'uikit/uikit.module.css'

export const InfoSlider = ({ array, className, numbers }) => {
  return (
    <div className={`${className ? className : ''} ${g.slider}`}>
      {array.map((slide, i) => 
        <RenderSlide
          key={`${slide}${i}${Math.floor(Math.random() * 12560)}`}
          slide={slide}
          numbers={numbers}
          i={i}
        />
      )}
    </div>
  )
}

const RenderSlide = ({ slide, numbers, i }) => {
  const { img, alt, onClick, title, p, color } = slide
  return (
    <div className={`${g.sliderSlide} ${g.pWrapper} ${color} ${g[color]}`}>
      <RenderFrame1 img={img} alt={alt} onClick={onClick} numbers={numbers} i={i}/>
      <RenderInfo title={title} p={p} color={color} />
    </div>
  )
}

const RenderFrame1 = ({ img, alt, onClick, numbers, i }) => (
  <div
    style={onClick ? {cursor: 'pointer'} : {}}
    className={`${g.frame1} ${g.sliderImgContainer}`}
    onClick={onClick ? onClick : () => console.log('no onclick')}
  >
    <img className={g.sliderImg} src={img} alt={alt}/>
    {numbers
      ? <RenderNumber i={i}/>
      : null}
  </div>
)

const RenderInfo = ({ title, p, color }) => (
  <div className={`${g.frame2} ${g.sliderInfo}`}>
    {title
      ? <h3>{title}</h3>
      : null}
    {p
      ? <p>{p}</p>
      : null}
  </div>
)

const RenderNumber = ({ i }) => <span className={`projectNumber ${g.sliderNumber}`}>{formatNumber(i + 1)}</span>