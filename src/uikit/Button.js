import React from 'react'

import g from './uikit.module.css'

const Button = ({ children, className, onClick, ...props }) => {
  return(
    <div className={`${className ? className : ''} ${g.btn} ${g.pWrapper}`}>
      <button className={g.frame1} onClick={() => onClick()}>
        <span>{children}</span>
      </button>
      <div className={g.frame2}></div>
    </div>
    )
}

//parallax effect

const selectElements = className => {
  const el = document.querySelectorAll(`.${className}`)
  return el
}

const createEvent = (els) => {
  document.querySelector('.contentContainer').onmousemove = e => {
    const d = getViewportDimensions()
    animate(e, d, els)
  }
}

const getViewportDimensions = () => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const c = {x: Math.floor(w / 2), y: Math.floor(h / 2)}
  return { w, h, c }
}

const animate = (e, d, els) => {
  const mX = e.clientX //mouse X
  const mY = e.clientY //mouse Y
  const { w, h } = d //vp width, vp height
  
  //calculate coef
  let coefX = 0
  let coefY = 0
  // calc coef X
  coefX = Math.round(((mX / w + .5) * 10 - 10) * 100) / 100
  coefY = Math.round(((mY / h + .5) * 10 - 10) * 100) / 100
  
  console.log('coef x: ', coefX, 'coef y:', coefY)

  //apply to each element
  els.forEach(el => {
    applyEffect(el, coefX, coefY)
  })

}

const applyEffect = (el, coefX, coefY) => {
  const frame2 = el.querySelector(`.${g.frame2}`)
  const frame3 = el.querySelector(`.${g.frame3}`)
  console.log(frame2, frame3)
  if(frame2) {
    frame2.style.right = `${coefX * 2.5}px`
    frame2.style.top = `calc(${- coefY * 2.5}px - 100%)`
  }
  if(frame3) {
    frame3.style.right = `${coefX * 2}px`
    frame3.style.top = `calc(${coefY * 2.5}px - 200%)`
  }
}

export default Button