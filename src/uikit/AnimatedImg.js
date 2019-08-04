import React from 'react'
import * as PIXI from 'pixi.js'
import g from 'uikit/uikit.module.css'
import displacementSource from 'assets/pixi/displacement_map_0.png'

let count = .5
const intervalDelay = 30
const initIntevalCount = 20
let intervalCount = initIntevalCount
const padding = 200

const createUid = name => `name${Math.floor(Math.random() * 100000000)}`

let displacementSprite
let displacementFilter

const setScene = (url, playground) => {
  let renderer = PIXI.autoDetectRenderer(playground.offsetWidth, playground.offsetHeight, {transparent:true})
  renderer.interactive = true
  renderer.autoResize = true
  playground.appendChild(renderer.view)

  const stage = new PIXI.Container()

  const tp = PIXI.Texture.fromImage(url)
  let preview = new PIXI.Sprite(tp)
  preview.position.y = - padding / 2
  preview.position.x = - padding / 2
  preview.height = playground.offsetHeight + padding
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

  animate(renderer, stage, preview, tp, playground)
}

const setEvents = preview => {
  preview.mouseout = () => {
    console.log('mouseout')
    if(displacementSprite.scale.x > 0) {
      decrementScale()
    }
    console.log(displacementSprite.scale)

  }

  preview.mouseover = (data) => {
    console.log('mouseover')
    if(displacementSprite.scale.x < 2) {
      incrementScale()
    }
    console.log(displacementSprite.scale)
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

const animate = (renderer, stage, sprite, texture, playground) => {
  requestAnimationFrame(() => animate(renderer, stage, sprite, texture, playground))
  displacementSprite.x += count
  displacementSprite.y += count
  preserveAspectRatio(sprite, texture, playground.offsetHeight)
  resizeRenderer(renderer, playground)

  stage.filters = [displacementFilter]

  renderer.render(stage)
}

const resizeRenderer = (renderer, playground) => {
  if(renderer.height !== playground.offsetHeight || renderer.width !== playground.offsetWidth) {
    renderer.resize(playground.offsetWidth, playground.offsetHeight)
  }

}

const preserveAspectRatio = (sprite, texture, windowHeight) => {
  //get original w and h
  const { width, height } = texture

  //get aspect ratio
  const apspectRatio = width / height

  //get new w and h
  const newHeight = windowHeight + padding
  const newWidth = newHeight * apspectRatio

  //set new width according to aspect ratio
  if(sprite.width !== newWidth) {
    sprite.width = newWidth
  }
  if(sprite.height !== newHeight) {
    sprite.height = newHeight
  }
}


const AnimatedImg = ({ src, className, alt, ...props }) => {
  const [state, setState] = React.useState(false)
  const uid = createUid('px-render')
  React.useEffect(() => {
    if(!state) {
      let playground = document.getElementById(uid)
      setScene(src, playground)
      setState(true)
    }
  }, [ state, setState, uid, src ] )
  return <div title={alt} className={`${g.animatedImgWrapper} ${className ? className : ''}`} {...props} id={uid}></div>
}

export default AnimatedImg