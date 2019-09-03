import React from 'react'
import * as PIXI from 'pixi.js'
import g from 'uikit/uikit.module.css'
import displacementSource from 'assets/pixi/displacement_map_0.png'

let count = .25
const intervalDelay = 30
const initIntevalCount = 30
let intervalCount = initIntevalCount
const padding = 200

const createUid = name => `${name}${Math.floor(Math.random() * 100000000)}`

let displacementSprite
let displacementFilter

const setScene = (url, playground, uid) => {

  let renderer = PIXI.autoDetectRenderer(playground.offsetWidth, playground.offsetHeight, {transparent:true})
  renderer.interactive = true
  renderer.autoResize = true
  playground.appendChild(renderer.view)

  const stage = new PIXI.Container()

  const tp = PIXI.Texture.fromImage(url)
  let preview = new PIXI.Sprite(tp)
  preview.position.y = - padding / 2
  preview.position.x = - padding / 2
  preview.width = playground.offsetWidth + padding
  preview.anchor.x = 0
  preview.interactive = true

  let displacementTexture = PIXI.Texture.fromImage(displacementSource)
  displacementTexture.baseTexture.isPowerOfTwo = true
  displacementTexture.baseTexture.mipmap = false
  displacementTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

  displacementSprite = new PIXI.extras.TilingSprite(displacementTexture, renderer.width, renderer.height)
  displacementSprite.scale.x = initIntevalCount / 10
  displacementSprite.scale.y = initIntevalCount / 10

  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

  stage.addChild(displacementSprite)

  stage.addChild(preview)

  // setEvents(preview)

  animate(renderer, stage, preview, tp, playground, uid)
}

const setEvents = preview => {
  preview.mouseout = () => {
    console.log('mouseout')
    if(displacementSprite.scale.x > 0) {
      decrementScale()
    }
  }

  preview.mouseover = (data) => {
    console.log('mouseover')
    if(displacementSprite.scale.x < 2) {
      incrementScale()
    }
  }
}

const decrementScale = () => {
  const interval = setInterval(() => {

    FilterScale(intervalCount/10)

    intervalCount --
    if(intervalCount < 0) {
      clearInterval(interval)
      resetIntevalCount()
    }
  }, intervalDelay)
}

const incrementScale = () => {
  const interval = setInterval(() => {

    const inverted = initIntevalCount - intervalCount
    FilterScale(inverted / 10)

    intervalCount--
    if(intervalCount < 0) {
      clearInterval(interval)
      resetIntevalCount()
    }
  }, intervalDelay)
}

const resetIntevalCount = () => {
  intervalCount = initIntevalCount
}

const FilterScale = n => {
  displacementSprite.scale.x = n
  displacementSprite.scale.y = n
}

const animate = (renderer, stage, sprite, texture, playground, uid) => {
  requestAnimationFrame(() => animate(renderer, stage, sprite, texture, playground, uid))
  displacementSprite.x += count
  displacementSprite.y += count
  preserveAspectRatio(sprite, texture, uid, playground)
  resizeRenderer(renderer, playground)

  stage.filters = [displacementFilter]

  renderer.render(stage)
}

const resizeRenderer = (renderer, playground) => {
  if(renderer.height !== playground.offsetHeight || renderer.width !== playground.offsetWidth) {
    renderer.resize(playground.offsetWidth, playground.offsetHeight)
  }
}

const preserveAspectRatio = (sprite, texture, uid, playground) => {
  //get original w and h
  const { offsetWidth, offsetHeight } = getPlaygroundDimensions(uid, playground)
  const { width, height } = texture

  //get aspect ratio
  const apspectRatio = width / height

  //get new w and h
  let newWidth = offsetWidth + padding
  let newHeight = newWidth / apspectRatio

  //ckeck if height < window height
  if(newHeight - padding < offsetHeight) {
    newHeight = offsetHeight + padding
    newWidth = newHeight * apspectRatio
  }
  //set new width according to aspect ratio
  sprite.width = newWidth
  sprite.height = newHeight
}



const getPlaygroundDimensions = (uid, playground) => {
  const hot = document.getElementById(uid)
  let h, w
  if(hot) {
    const { offsetHeight, offsetWidth } = hot
    h = offsetHeight
    w = offsetWidth
  } else {
    const { offsetHeight, offsetWidth } = playground
    h = offsetHeight
    w = offsetWidth
  }
  return { offsetHeight: h, offsetWidth: w }
}

const uidSingle = createUid('px-render')

const AnimatedImg = ({ src, className, index, alt, ...props }) => {
  const [state, setState] = React.useState(false)
  let uid
  if(index) {
    uid = `px-render${index}`
  } else {
    uid = uidSingle
  }

  React.useEffect(() => {
    if(!state) {
      let playground = document.getElementById(uid)
      setScene(src, playground, uid)
      setState(true)
    }
  }, [ state, setState, uid, src ] )
  return <div title={alt} className={`${g.animatedImgWrapper} ${className ? className : ''}`} {...props} id={uid}></div>
}

export default AnimatedImg