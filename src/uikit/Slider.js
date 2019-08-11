import React from 'react'
import { formatNumber } from 'helpers/formatNumber'

import g from 'uikit/uikit.module.css'

export const InfoSlider = ({ array, className, numbers }) => {
  const [ startX, setStartX ] = React.useState(0)
  const [ scrollLeft, setScrollLeft ] = React.useState(0)

  React.useEffect(() => {
    addEvents(getSlider(className), startX, setStartX, scrollLeft, setScrollLeft)

    return () => removeEvents(getSlider(className), startX, setStartX, scrollLeft, setScrollLeft)
  }, [ className, startX, setStartX, scrollLeft, setScrollLeft ])

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

const getSlider = (className) => {
  let slider = document.querySelectorAll(`.${g.slider}`)[0]
  if(className) {
    slider = document.querySelector(`.${className}`)
  }
  return slider
}
let isDown = false

const addEvents = (slider, startX, setStartX, scrollLeft, setScrollLeft) => {
  slider.addEventListener('mousedown', e => allowDrag(e, slider, setStartX, setScrollLeft))
  slider.addEventListener('mouseleave', e => eventLeave(slider))
  slider.addEventListener('mouseup', e => eventLeave(slider))
  slider.addEventListener('mousemove', e => scrollOnDrag(e, slider, startX, scrollLeft))
}

const removeEvents = (slider, startX, setStartX, scrollLeft, setScrollLeft) => {
  slider.removeEventListener('mousedown', e => allowDrag(e, slider, setStartX, setScrollLeft))
  slider.removeEventListener('mouseleave', e => eventLeave(slider))
  slider.removeEventListener('mouseup', e => eventLeave(slider))
  slider.removeEventListener('mousemove', e => scrollOnDrag(e, slider, startX, scrollLeft))
}

const eventLeave = (slider) => {
  isDown = false
}

const allowDrag = (e, slider, setStartX, setScrollLeft) => {
  if(!isDown) {
    isDown = true
    setStartX(e.pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }
}

const scrollOnDrag = (e, slider, startX, scrollLeft) => {
  if(isDown) {
    e.preventDefault()
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 2.5 //scroll-fast
    slider.scrollLeft = scrollLeft - walk
    return false
  } else {
    return false
  }
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