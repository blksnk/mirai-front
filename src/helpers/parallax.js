const selectElements = g => {
  const el = document.querySelectorAll(`.${g.pWrapper}`)
  return el
}

const createEvent = (els, g) => {
  document.querySelector('.contentContainer').onmousemove = e => {
    const d = getViewportDimensions()
    animate(e, d, els, g)
  }
}

const getViewportDimensions = () => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return { w, h }
}

const animate = (e, d, els, g) => {
  const mX = e.clientX //mouse X
  const mY = e.clientY //mouse Y
  const { w, h } = d //vp width, vp height
  
  //calculate coef
  let coefX = 0
  let coefY = 0
  // calc coef X
  coefX = Math.round(((mX / w + .5) * 10 - 10) * 100) / 100
  coefY = Math.round(((mY / h + .5) * 10 - 10) * 100) / 100

  //limit to max values
  if(coefY > 9) {
    coefY = 9
  }
  if(coefX > 8) {
    coefX = 8
  }
  
  //apply to each element
  els.forEach(el => {
    applyEffect(el, coefX, coefY, g)
  })

}

const applyEffect = (el, coefX, coefY, g) => {
  const frame2 = el.querySelector(`.${g.frame2}`)
  const frame3 = el.querySelector(`.${g.frame3}`)
  const basisX = 8
  const basisY = 9
  const offsetXf2 = - basisX + coefX * 1.5
  const offsetYf2 = basisY - coefY * 1.5
  const offsetXf3 = - 2 * basisX + coefX * 3
  const offsetYf3 = 2 * basisY - coefY * 3
  if(frame2) {
    frame2.style.right = `${offsetXf2}px`
    frame2.style.top = `calc(${offsetYf2}px - 100%)`
  }
  if(frame3) {
    frame3.style.right = `${offsetXf3}px`
    frame3.style.top = `calc(${offsetYf3}px - 200%)`
  }
}

export {
  selectElements,
  createEvent
}